const router = require('express').Router();
const { getDB } = require('../db/connection');
const { asyncHandler } = require('../utils/helpers');

const DEFAULT_USER_ID = 'default-user';

// GET /stats - получить статистику пользователя
router.get('/stats', asyncHandler(async (req, res) => {
  const db = await getDB();
  
  // Получаем прогресс пользователя
  const progress = await db.collection('progress').findOne({ 
    userId: DEFAULT_USER_ID 
  });
  
  if (!progress) {
    return res.json({
      stats: {
        totalLessons: 0,
        completedLessons: 0,
        completionPercentage: 0,
        totalExercises: 0,
        correctExercises: 0,
        accuracyPercentage: 0,
        totalTimeSpent: 0,
        averageTimePerLesson: 0,
        moduleProgress: []
      }
    });
  }
  
  // Общее количество уроков и упражнений
  const totalLessons = await db.collection('lessons').countDocuments();
  const totalExercises = await db.collection('exercises').countDocuments();
  
  const completedLessons = progress.completedLessons.length;
  const completionPercentage = totalLessons > 0 
    ? Math.round((completedLessons / totalLessons) * 100) 
    : 0;
  
  // Статистика по упражнениям
  const correctExercises = progress.completedExercises.filter(ce => ce.isCorrect).length;
  const accuracyPercentage = progress.completedExercises.length > 0
    ? Math.round((correctExercises / progress.completedExercises.length) * 100)
    : 0;
  
  // Время обучения
  const totalTimeSpent = progress.completedLessons.reduce((sum, cl) => 
    sum + (cl.timeSpent || 0), 0
  );
  const averageTimePerLesson = completedLessons > 0 
    ? Math.round(totalTimeSpent / completedLessons) 
    : 0;
  
  // Прогресс по модулям
  const modules = await db.collection('modules')
    .find({})
    .sort({ order: 1 })
    .toArray();
  
  const moduleProgress = await Promise.all(modules.map(async (module) => {
    const moduleLessons = await db.collection('lessons')
      .find({ moduleId: module.id })
      .toArray();
    
    const total = moduleLessons.length;
    const completed = moduleLessons.filter(lesson =>
      progress.completedLessons.some(cl => cl.lessonId === lesson.id)
    ).length;
    
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return {
      moduleId: module.id,
      moduleTitle: module.title,
      completed,
      total,
      percentage
    };
  }));
  
  // Статистика по категориям упражнений
  const exercisesByType = await db.collection('exercises').aggregate([
    {
      $group: {
        _id: '$type',
        count: { $sum: 1 }
      }
    }
  ]).toArray();
  
  const completedByType = {};
  for (const exercise of await db.collection('exercises').find({}).toArray()) {
    const completed = progress.completedExercises.find(ce => ce.exerciseId === exercise.id);
    if (completed && completed.isCorrect) {
      completedByType[exercise.type] = (completedByType[exercise.type] || 0) + 1;
    }
  }
  
  const exerciseTypeStats = exercisesByType.map(et => ({
    type: et._id,
    total: et.count,
    completed: completedByType[et._id] || 0,
    percentage: et.count > 0 
      ? Math.round(((completedByType[et._id] || 0) / et.count) * 100) 
      : 0
  }));
  
  // Статистика по дням
  const last7Days = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    
    const lessonsCompletedOnDay = progress.completedLessons.filter(cl => {
      const completedDate = new Date(cl.completedAt);
      return completedDate >= date && completedDate < nextDate;
    }).length;
    
    const xpEarnedOnDay = progress.completedLessons
      .filter(cl => {
        const completedDate = new Date(cl.completedAt);
        return completedDate >= date && completedDate < nextDate;
      })
      .reduce((sum, cl) => {
        // Приблизительный расчет XP (без учета точных значений)
        return sum + 100; // Среднее значение
      }, 0);
    
    last7Days.push({
      date: date.toISOString().split('T')[0],
      lessonsCompleted: lessonsCompletedOnDay,
      xpEarned: xpEarnedOnDay
    });
  }
  
  res.json({
    stats: {
      totalLessons,
      completedLessons,
      completionPercentage,
      totalExercises,
      correctExercises,
      accuracyPercentage,
      totalTimeSpent,
      averageTimePerLesson,
      moduleProgress,
      exerciseTypeStats,
      last7Days,
      currentStreak: progress.currentStreak,
      longestStreak: progress.longestStreak,
      totalXP: progress.totalXP,
      achievementsUnlocked: progress.achievements.length
    }
  });
}));

module.exports = router;
