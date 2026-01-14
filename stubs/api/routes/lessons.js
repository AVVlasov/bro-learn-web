const router = require('express').Router();
const { getDB } = require('../db/connection');
const { asyncHandler, validateId, ensureExists } = require('../utils/helpers');

// GET /lessons/:lessonId - получить содержимое урока
router.get('/lessons/:lessonId', asyncHandler(async (req, res) => {
  const db = await getDB();
  const lessonId = validateId(req.params.lessonId, 'lessonId');
  
  const lesson = await db.collection('lessons').findOne({ id: lessonId });
  ensureExists(lesson, 'Lesson', lessonId);
  
  // Получаем информацию о модуле
  const module = await db.collection('modules').findOne({ id: lesson.moduleId });
  
  // Получаем упражнения урока
  const exercises = await db.collection('exercises')
    .find({ lessonId })
    .toArray();
  
  // Получаем прогресс пользователя
  const progress = await db.collection('progress').findOne({ 
    userId: 'default-user' 
  });
  
  const completedLesson = progress?.completedLessons?.find(cl => cl.lessonId === lessonId);
  const completedExercises = progress?.completedExercises?.filter(ce => 
    exercises.some(ex => ex.id === ce.exerciseId)
  ) || [];
  
  res.json({ 
    lesson: {
      ...lesson,
      module: module ? { id: module.id, title: module.title } : null,
      isCompleted: !!completedLesson,
      completedAt: completedLesson?.completedAt,
      score: completedLesson?.score,
      exercisesCompleted: completedExercises.length,
      exercisesTotal: exercises.length
    }
  });
}));

module.exports = router;
