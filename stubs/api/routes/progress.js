const router = require('express').Router();
const { getDB } = require('../db/connection');
const { asyncHandler, validateId, validateNumber, ensureExists } = require('../utils/helpers');

const DEFAULT_USER_ID = 'default-user';

/**
 * Инициализация прогресса пользователя
 */
async function ensureProgress(db) {
  let progress = await db.collection('progress').findOne({ 
    userId: DEFAULT_USER_ID 
  });
  
  if (!progress) {
    progress = {
      userId: DEFAULT_USER_ID,
      totalXP: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: new Date(),
      completedLessons: [],
      completedExercises: [],
      achievements: []
    };
    
    await db.collection('progress').insertOne(progress);
  }
  
  return progress;
}

/**
 * Обновление streak
 */
function updateStreak(progress, now) {
  const lastActivity = new Date(progress.lastActivityDate);
  const daysDiff = Math.floor((now - lastActivity) / (1000 * 60 * 60 * 24));
  
  let currentStreak = progress.currentStreak;
  let isNewRecord = false;
  
  if (daysDiff === 1) {
    // Следующий день подряд
    currentStreak = progress.currentStreak + 1;
    isNewRecord = currentStreak > progress.longestStreak;
  } else if (daysDiff > 1) {
    // Пропущены дни, начинаем заново
    currentStreak = 1;
  } else if (daysDiff === 0) {
    // Тот же день, streak не меняется
    currentStreak = progress.currentStreak || 1;
  }
  
  return {
    currentStreak,
    longestStreak: isNewRecord ? currentStreak : progress.longestStreak,
    isNewRecord
  };
}

/**
 * Проверка новых достижений
 */
async function checkAchievements(db, progress) {
  const newAchievements = [];
  const existingAchievementIds = progress.achievements.map(a => a.id);
  
  // First Steps - первый урок
  if (progress.completedLessons.length === 1 && !existingAchievementIds.includes('first-steps')) {
    newAchievements.push({
      id: 'first-steps',
      title: 'First Steps',
      description: 'Завершите первый урок',
      xpBonus: 25,
      unlockedAt: new Date()
    });
  }
  
  // Consistent Learner - 3 дня подряд
  if (progress.currentStreak >= 3 && !existingAchievementIds.includes('consistent-learner')) {
    newAchievements.push({
      id: 'consistent-learner',
      title: 'Consistent Learner',
      description: '3 дня подряд обучения',
      xpBonus: 50,
      unlockedAt: new Date()
    });
  }
  
  // Dedicated Student - 7 дней подряд
  if (progress.currentStreak >= 7 && !existingAchievementIds.includes('dedicated-student')) {
    newAchievements.push({
      id: 'dedicated-student',
      title: 'Dedicated Student',
      description: '7 дней подряд обучения',
      xpBonus: 100,
      unlockedAt: new Date()
    });
  }
  
  // XP Hunter - 1000 XP
  if (progress.totalXP >= 1000 && !existingAchievementIds.includes('xp-hunter')) {
    newAchievements.push({
      id: 'xp-hunter',
      title: 'XP Hunter',
      description: 'Набрать 1000 XP',
      xpBonus: 100,
      unlockedAt: new Date()
    });
  }
  
  // Module Master - завершить любой модуль
  const modules = await db.collection('modules').find({}).toArray();
  for (const module of modules) {
    const moduleLessons = await db.collection('lessons')
      .find({ moduleId: module.id })
      .toArray();
    
    const allCompleted = moduleLessons.every(lesson =>
      progress.completedLessons.some(cl => cl.lessonId === lesson.id)
    );
    
    const achievementId = `module-${module.id}-complete`;
    if (allCompleted && !existingAchievementIds.includes(achievementId)) {
      newAchievements.push({
        id: achievementId,
        title: `${module.title} Master`,
        description: `Завершить модуль "${module.title}"`,
        xpBonus: 200,
        unlockedAt: new Date()
      });
    }
  }
  
  return newAchievements;
}

// GET /progress - получить прогресс пользователя
router.get('/progress', asyncHandler(async (req, res) => {
  const db = await getDB();
  const progress = await ensureProgress(db);
  
  res.json({ progress });
}));

// POST /progress/lessons/:lessonId/complete - отметить урок как завершенный
router.post('/progress/lessons/:lessonId/complete', asyncHandler(async (req, res) => {
  const db = await getDB();
  const lessonId = validateId(req.params.lessonId, 'lessonId');
  
  const score = validateNumber(req.body.score || 100, 'score', 0, 100);
  const attempts = validateNumber(req.body.attempts || 1, 'attempts', 1, 100);
  const timeSpent = validateNumber(req.body.timeSpent || 0, 'timeSpent', 0, 10000);
  
  const lesson = await db.collection('lessons').findOne({ id: lessonId });
  ensureExists(lesson, 'Lesson', lessonId);
  
  const progress = await ensureProgress(db);
  
  // Проверяем, не завершен ли уже этот урок
  const alreadyCompleted = progress.completedLessons.some(cl => cl.lessonId === lessonId);
  if (alreadyCompleted) {
    return res.status(400).json({ 
      error: 'Lesson already completed',
      message: 'This lesson has already been marked as completed'
    });
  }
  
  const now = new Date();
  
  // Расчет XP с учетом попыток
  const attemptPenalty = Math.max(0, (attempts - 1) * 0.1);
  const xpEarned = Math.floor(lesson.xpReward * (1 - attemptPenalty));
  
  // Обновление streak
  const streakUpdate = updateStreak(progress, now);
  
  // Обновляем прогресс в БД
  await db.collection('progress').updateOne(
    { userId: DEFAULT_USER_ID },
    {
      $push: {
        completedLessons: {
          lessonId,
          completedAt: now,
          score,
          attempts,
          timeSpent
        }
      },
      $inc: { totalXP: xpEarned },
      $set: {
        lastActivityDate: now,
        currentStreak: streakUpdate.currentStreak,
        longestStreak: streakUpdate.longestStreak
      }
    }
  );
  
  // Получаем обновленный прогресс
  const updatedProgress = await db.collection('progress').findOne({ 
    userId: DEFAULT_USER_ID 
  });
  
  // Проверяем новые достижения
  const newAchievements = await checkAchievements(db, updatedProgress);
  
  // Добавляем достижения в прогресс
  if (newAchievements.length > 0) {
    const totalAchievementXP = newAchievements.reduce((sum, a) => sum + a.xpBonus, 0);
    
    await db.collection('progress').updateOne(
      { userId: DEFAULT_USER_ID },
      {
        $push: { achievements: { $each: newAchievements } },
        $inc: { totalXP: totalAchievementXP }
      }
    );
  }
  
  res.json({
    success: true,
    xpEarned,
    totalXP: updatedProgress.totalXP + (newAchievements.reduce((sum, a) => sum + a.xpBonus, 0)),
    newAchievements,
    streakUpdated: {
      currentStreak: streakUpdate.currentStreak,
      isNewRecord: streakUpdate.isNewRecord
    }
  });
}));

// POST /progress/exercises/:exerciseId/complete - отметить упражнение как завершенное
// Примечание: это устаревший endpoint, теперь упражнения сохраняются в /exercises/:id/submit
router.post('/progress/exercises/:exerciseId/complete', asyncHandler(async (req, res) => {
  const db = await getDB();
  const exerciseId = validateId(req.params.exerciseId, 'exerciseId');
  
  const isCorrect = req.body.isCorrect !== undefined ? !!req.body.isCorrect : true;
  const attempts = validateNumber(req.body.attempts || 1, 'attempts', 1, 100);
  
  const now = new Date();
  
  await db.collection('progress').updateOne(
    { userId: DEFAULT_USER_ID },
    {
      $push: {
        completedExercises: {
          exerciseId,
          completedAt: now,
          isCorrect,
          attempts
        }
      },
      $set: { lastActivityDate: now }
    },
    { upsert: true }
  );
  
  res.json({ success: true });
}));

module.exports = router;
