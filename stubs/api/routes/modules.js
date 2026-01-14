const router = require('express').Router();
const { getDB } = require('../db/connection');
const { asyncHandler, validateId, ensureExists } = require('../utils/helpers');

// GET /modules - получить список всех модулей с прогрессом
router.get('/modules', asyncHandler(async (req, res) => {
  const db = await getDB();
  
  // Получаем модули
  const modules = await db.collection('modules')
    .find({})
    .sort({ order: 1 })
    .toArray();
  
  // Получаем прогресс пользователя
  const progress = await db.collection('progress').findOne({ 
    userId: 'default-user' 
  });
  
  const completedLessons = progress?.completedLessons || [];
  
  // Добавляем информацию о прогрессе к каждому модулю
  const modulesWithProgress = await Promise.all(modules.map(async (module) => {
    // Считаем количество уроков в модуле
    const lessonsCount = await db.collection('lessons')
      .countDocuments({ moduleId: module.id });
    
    // Считаем завершенные уроки в модуле
    const moduleLessons = await db.collection('lessons')
      .find({ moduleId: module.id })
      .project({ id: 1 })
      .toArray();
    
    const moduleLessonIds = moduleLessons.map(l => l.id);
    const completedInModule = completedLessons.filter(cl => 
      moduleLessonIds.includes(cl.lessonId)
    ).length;
    
    const progressPercent = lessonsCount > 0 
      ? Math.round((completedInModule / lessonsCount) * 100) 
      : 0;
    
    const isCompleted = lessonsCount > 0 && completedInModule === lessonsCount;
    
    // Проверяем, заблокирован ли модуль
    const isLocked = module.prerequisites.length > 0 && module.prerequisites.some(prereqId => {
      const prereqModule = modules.find(m => m.id === prereqId);
      if (!prereqModule) return true;
      
      // Проверяем, завершен ли prerequisite модуль
      const prereqLessons = moduleLessons.filter(l => 
        l.moduleId === prereqId
      );
      const prereqCompleted = prereqLessons.every(l =>
        completedLessons.some(cl => cl.lessonId === l.id)
      );
      
      return !prereqCompleted;
    });
    
    return {
      ...module,
      lessonsCount,
      progress: progressPercent,
      isCompleted,
      isLocked: isLocked || false
    };
  }));
  
  res.json({ modules: modulesWithProgress });
}));

// GET /modules/:moduleId - получить детали модуля с уроками
router.get('/modules/:moduleId', asyncHandler(async (req, res) => {
  const db = await getDB();
  const moduleId = validateId(req.params.moduleId, 'moduleId');
  
  const module = await db.collection('modules').findOne({ id: moduleId });
  ensureExists(module, 'Module', moduleId);
  
  // Получаем уроки модуля
  const lessons = await db.collection('lessons')
    .find({ moduleId })
    .sort({ order: 1 })
    .toArray();
  
  // Получаем прогресс пользователя
  const progress = await db.collection('progress').findOne({ 
    userId: 'default-user' 
  });
  
  const completedLessons = progress?.completedLessons || [];
  
  // Добавляем информацию о завершенности к каждому уроку
  const lessonsWithProgress = lessons.map(lesson => {
    const completed = completedLessons.find(cl => cl.lessonId === lesson.id);
    return {
      ...lesson,
      isCompleted: !!completed,
      isLocked: false, // В рамках модуля уроки не блокируются
      completedAt: completed?.completedAt,
      score: completed?.score
    };
  });
  
  res.json({
    module: {
      ...module,
      lessons: lessonsWithProgress
    }
  });
}));

module.exports = router;
