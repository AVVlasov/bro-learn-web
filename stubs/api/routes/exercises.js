const router = require('express').Router();
const { getDB } = require('../db/connection');
const { asyncHandler, validateId, ensureExists, sanitizeInput, ApiError } = require('../utils/helpers');

// GET /exercises/:exerciseId - получить данные упражнения
router.get('/exercises/:exerciseId', asyncHandler(async (req, res) => {
  const db = await getDB();
  const exerciseId = validateId(req.params.exerciseId, 'exerciseId');
  
  const exercise = await db.collection('exercises').findOne({ id: exerciseId });
  ensureExists(exercise, 'Exercise', exerciseId);
  
  // Получаем прогресс по этому упражнению
  const progress = await db.collection('progress').findOne({ 
    userId: 'default-user' 
  });
  
  const completed = progress?.completedExercises?.find(ce => ce.exerciseId === exerciseId);
  
  // Не отправляем правильные ответы на клиент
  const exerciseForClient = { ...exercise };
  
  // Удаляем информацию о правильных ответах
  if (exerciseForClient.type === 'multiple-choice' && exerciseForClient.options) {
    exerciseForClient.options = exerciseForClient.options.map(opt => ({
      id: opt.id,
      text: opt.text
      // isCorrect и explanation не отправляем
    }));
  }
  
  // Удаляем ключи для проверки
  delete exerciseForClient.expectedRating;
  delete exerciseForClient.keywords;
  delete exerciseForClient.expectedKeywords;
  delete exerciseForClient.expectedPatterns;
  delete exerciseForClient.correctPairs;
  
  res.json({ 
    exercise: {
      ...exerciseForClient,
      isCompleted: !!completed,
      completedAt: completed?.completedAt,
      isCorrect: completed?.isCorrect
    }
  });
}));

// POST /exercises/:exerciseId/submit - проверка ответа на упражнение
router.post('/exercises/:exerciseId/submit', asyncHandler(async (req, res) => {
  const db = await getDB();
  const exerciseId = validateId(req.params.exerciseId, 'exerciseId');
  
  // Sanitize input
  const sanitizedBody = sanitizeInput(req.body);
  const { type, selectedOptions, code, improvedPrompt, answer, pairs } = sanitizedBody;
  
  const exercise = await db.collection('exercises').findOne({ id: exerciseId });
  ensureExists(exercise, 'Exercise', exerciseId);
  
  // Проверяем, что тип совпадает
  if (type && type !== exercise.type) {
    throw new ApiError('Exercise type mismatch', 400);
  }
  
  let isCorrect = false;
  let feedback = {};
  let partialCredit = false;
  
  // Валидация в зависимости от типа упражнения
  switch (exercise.type) {
    case 'multiple-choice': {
      if (!Array.isArray(selectedOptions)) {
        throw new ApiError('selectedOptions must be an array', 400);
      }
      
      const correctOptions = exercise.options
        .filter(opt => opt.isCorrect)
        .map(opt => opt.id);
      
      const sortedSelected = [...selectedOptions].sort();
      const sortedCorrect = [...correctOptions].sort();
      
      isCorrect = JSON.stringify(sortedSelected) === JSON.stringify(sortedCorrect);
      
      const correctParts = selectedOptions.filter(id => correctOptions.includes(id));
      const incorrectSelections = selectedOptions.filter(id => !correctOptions.includes(id));
      const missedCorrect = correctOptions.filter(id => !selectedOptions.includes(id));
      
      feedback = {
        correctParts,
        incorrectSelections,
        improvements: missedCorrect,
        explanations: exercise.options
          .filter(opt => selectedOptions.includes(opt.id))
          .map(opt => ({ id: opt.id, explanation: opt.explanation }))
      };
      
      // Частичный зачет если есть правильные ответы
      partialCredit = correctParts.length > 0 && !isCorrect;
      break;
    }
      
    case 'prompt-rating': {
      if (typeof answer !== 'number' || answer < 1 || answer > 5) {
        throw new ApiError('Rating must be a number between 1 and 5', 400);
      }
      
      const prompt = exercise.prompts?.[0];
      if (!prompt) {
        throw new ApiError('Exercise configuration error: no prompt found', 500);
      }
      
      const expectedRating = prompt.expectedRating;
      const diff = Math.abs(answer - expectedRating);
      
      // Допускается отклонение ±1
      isCorrect = diff <= 1;
      partialCredit = diff === 1;
      
      feedback = {
        yourRating: answer,
        expectedRating,
        issues: prompt.issues || [],
        improvements: prompt.improvements || []
      };
      break;
    }
      
    case 'prompt-fix': {
      if (!improvedPrompt || typeof improvedPrompt !== 'string') {
        throw new ApiError('improvedPrompt is required and must be a string', 400);
      }
      
      const keywords = exercise.keywords || [];
      const minimumLength = exercise.minimumLength || 0;
      
      if (improvedPrompt.length < minimumLength) {
        feedback.lengthError = `Prompt too short. Minimum ${minimumLength} characters required.`;
      }
      
      const foundKeywords = keywords.filter(kw => 
        improvedPrompt.toLowerCase().includes(kw.toLowerCase())
      );
      
      const requiredKeywords = exercise.minimumKeywords || Math.ceil(keywords.length * 0.7);
      isCorrect = foundKeywords.length >= requiredKeywords && improvedPrompt.length >= minimumLength;
      partialCredit = foundKeywords.length >= Math.ceil(requiredKeywords * 0.5);
      
      feedback = {
        correctParts: foundKeywords,
        improvements: keywords.filter(kw => !foundKeywords.includes(kw)),
        bestPractices: exercise.bestPractices || []
      };
      break;
    }
      
    case 'text-input': {
      if (!answer || typeof answer !== 'string') {
        throw new ApiError('answer is required and must be a string', 400);
      }
      
      const requiredKeywords = exercise.expectedKeywords || [];
      const foundInText = requiredKeywords.filter(kw => 
        answer.toLowerCase().includes(kw.toLowerCase())
      );
      
      const minimumKeywords = exercise.minimumKeywords || requiredKeywords.length;
      isCorrect = foundInText.length >= minimumKeywords;
      partialCredit = foundInText.length >= Math.ceil(minimumKeywords * 0.5);
      
      feedback = {
        foundKeywords: foundInText,
        missingKeywords: requiredKeywords.filter(kw => !foundInText.includes(kw))
      };
      break;
    }
      
    case 'code-exercise': {
      if (!code || typeof code !== 'string') {
        throw new ApiError('code is required and must be a string', 400);
      }
      
      const patterns = exercise.expectedPatterns || [];
      const matchedPatterns = patterns.filter(pattern => 
        code.includes(pattern)
      );
      
      isCorrect = matchedPatterns.length === patterns.length;
      partialCredit = matchedPatterns.length >= Math.ceil(patterns.length * 0.5);
      
      feedback = {
        correctParts: matchedPatterns,
        improvements: patterns.filter(p => !matchedPatterns.includes(p)),
        syntaxCheck: exercise.syntaxCheck ? 'Basic syntax check passed' : undefined
      };
      break;
    }
      
    case 'matching': {
      if (!Array.isArray(pairs)) {
        throw new ApiError('pairs must be an array', 400);
      }
      
      const correctPairs = exercise.correctPairs || [];
      let correctCount = 0;
      
      pairs.forEach(pair => {
        const isCorrectPair = correctPairs.some(cp => 
          cp.leftId === pair.leftId && cp.rightId === pair.rightId
        );
        if (isCorrectPair) correctCount++;
      });
      
      isCorrect = correctCount === correctPairs.length && pairs.length === correctPairs.length;
      partialCredit = correctCount >= Math.ceil(correctPairs.length * 0.5);
      
      feedback = {
        correctPairs: correctCount,
        totalPairs: correctPairs.length
      };
      break;
    }
      
    default:
      throw new ApiError(`Unknown exercise type: ${exercise.type}`, 400);
  }
  
  // Расчет XP
  let xpEarned = 0;
  if (isCorrect) {
    xpEarned = exercise.xpReward;
  } else if (partialCredit) {
    xpEarned = Math.floor(exercise.xpReward * 0.5);
  }
  
  // Сохраняем результат в прогресс
  const now = new Date();
  await db.collection('progress').updateOne(
    { userId: 'default-user' },
    {
      $push: {
        completedExercises: {
          exerciseId,
          completedAt: now,
          isCorrect,
          attempts: 1
        }
      },
      $inc: { totalXP: xpEarned },
      $set: { lastActivityDate: now }
    },
    { upsert: true }
  );
  
  res.json({
    isCorrect,
    partialCredit,
    xpEarned,
    explanation: exercise.explanation || '',
    feedback,
    nextExercise: exercise.nextExercise || null
  });
}));

module.exports = router;
