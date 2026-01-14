const router = require('express').Router();
const { getDB } = require('../db/connection');
const { asyncHandler } = require('../utils/helpers');

const DEFAULT_USER_ID = 'default-user';

// Определение всех доступных достижений
const ALL_ACHIEVEMENTS = [
  // Progress Achievements
  {
    id: 'first-steps',
    title: 'First Steps',
    description: 'Завершите первый урок',
    icon: 'star',
    category: 'progress',
    xpBonus: 25
  },
  {
    id: 'module-master',
    title: 'Module Master',
    description: 'Завершите любой модуль на 100%',
    icon: 'trophy',
    category: 'progress',
    xpBonus: 200
  },
  {
    id: 'prompt-ninja',
    title: 'Prompt Ninja',
    description: 'Завершите модуль "Основы промптинга"',
    icon: 'zap',
    category: 'progress',
    xpBonus: 100
  },
  {
    id: 'comet-explorer',
    title: 'Comet Explorer',
    description: 'Завершите модуль "AI-браузер Comet"',
    icon: 'globe',
    category: 'progress',
    xpBonus: 100
  },
  {
    id: 'cursor-pro',
    title: 'Cursor Pro',
    description: 'Завершите модуль "Cursor.ai"',
    icon: 'code',
    category: 'progress',
    xpBonus: 100
  },
  {
    id: 'agent-builder',
    title: 'Agent Builder',
    description: 'Завершите модуль "AI-агенты"',
    icon: 'bot',
    category: 'progress',
    xpBonus: 100
  },
  {
    id: 'mcp-developer',
    title: 'MCP Developer',
    description: 'Завершите модуль "MCP"',
    icon: 'server',
    category: 'progress',
    xpBonus: 100
  },
  {
    id: 'ai-master',
    title: 'AI Master',
    description: 'Завершите все 5 MVP модулей',
    icon: 'crown',
    category: 'progress',
    xpBonus: 500
  },
  
  // Streak Achievements
  {
    id: 'consistent-learner',
    title: 'Consistent Learner',
    description: '3 дня подряд обучения',
    icon: 'flame',
    category: 'streak',
    xpBonus: 50
  },
  {
    id: 'dedicated-student',
    title: 'Dedicated Student',
    description: '7 дней подряд обучения',
    icon: 'flame',
    category: 'streak',
    xpBonus: 100
  },
  {
    id: 'on-fire',
    title: 'On Fire',
    description: '14 дней подряд обучения',
    icon: 'flame',
    category: 'streak',
    xpBonus: 200
  },
  {
    id: 'unstoppable',
    title: 'Unstoppable',
    description: '30 дней подряд обучения',
    icon: 'flame',
    category: 'streak',
    xpBonus: 500
  },
  
  // Performance Achievements
  {
    id: 'perfectionist',
    title: 'Perfectionist',
    description: '100% score на 5 уроках',
    icon: 'target',
    category: 'performance',
    xpBonus: 150
  },
  {
    id: 'fast-learner',
    title: 'Fast Learner',
    description: 'Завершите урок с первой попытки на всех упражнениях',
    icon: 'zap',
    category: 'performance',
    xpBonus: 100
  },
  {
    id: 'xp-hunter',
    title: 'XP Hunter',
    description: 'Набрать 1000 XP',
    icon: 'star',
    category: 'performance',
    xpBonus: 100
  },
  {
    id: 'code-master',
    title: 'Code Master',
    description: 'Выполните 10 code exercises идеально',
    icon: 'code',
    category: 'performance',
    xpBonus: 200
  },
  
  // Tool Mastery
  {
    id: 'gigachat-expert',
    title: 'GigaChat Expert',
    description: 'Освойте все уроки по GigaChat',
    icon: 'message-circle',
    category: 'tool-mastery',
    xpBonus: 50,
    tool: 'gigachat'
  },
  {
    id: 'deepseek-specialist',
    title: 'DeepSeek Specialist',
    description: 'Освойте DeepSeek',
    icon: 'code',
    category: 'tool-mastery',
    xpBonus: 50,
    tool: 'deepseek'
  },
  {
    id: 'mcp-creator',
    title: 'MCP Creator',
    description: 'Создайте первый MCP сервер',
    icon: 'server',
    category: 'tool-mastery',
    xpBonus: 150,
    tool: 'mcp'
  },
  {
    id: 'agent-architect',
    title: 'Agent Architect',
    description: 'Создайте первого AI-агента',
    icon: 'bot',
    category: 'tool-mastery',
    xpBonus: 150,
    tool: 'agents'
  }
];

// GET /achievements - получить все достижения с прогрессом
router.get('/achievements', asyncHandler(async (req, res) => {
  const db = await getDB();
  
  // Получаем прогресс пользователя
  const progress = await db.collection('progress').findOne({ 
    userId: DEFAULT_USER_ID 
  });
  
  const unlockedAchievements = progress?.achievements || [];
  const unlockedIds = unlockedAchievements.map(a => a.id);
  
  // Добавляем информацию о разблокировке к каждому достижению
  const achievementsWithStatus = ALL_ACHIEVEMENTS.map(achievement => {
    const unlocked = unlockedAchievements.find(ua => ua.id === achievement.id);
    
    // Вычисляем прогресс для незавершенных достижений
    let progressInfo = {};
    
    if (!unlocked && progress) {
      switch (achievement.id) {
        case 'first-steps':
          progressInfo = {
            progress: Math.min(progress.completedLessons.length, 1),
            total: 1
          };
          break;
          
        case 'consistent-learner':
          progressInfo = {
            progress: Math.min(progress.currentStreak, 3),
            total: 3
          };
          break;
          
        case 'dedicated-student':
          progressInfo = {
            progress: Math.min(progress.currentStreak, 7),
            total: 7
          };
          break;
          
        case 'on-fire':
          progressInfo = {
            progress: Math.min(progress.currentStreak, 14),
            total: 14
          };
          break;
          
        case 'unstoppable':
          progressInfo = {
            progress: Math.min(progress.currentStreak, 30),
            total: 30
          };
          break;
          
        case 'xp-hunter':
          progressInfo = {
            progress: Math.min(progress.totalXP, 1000),
            total: 1000
          };
          break;
          
        case 'perfectionist': {
          const perfectScores = progress.completedLessons.filter(cl => cl.score === 100).length;
          progressInfo = {
            progress: Math.min(perfectScores, 5),
            total: 5
          };
          break;
        }
          
        case 'code-master': {
          const codeExercises = progress.completedExercises.filter(ce => ce.isCorrect).length;
          progressInfo = {
            progress: Math.min(codeExercises, 10),
            total: 10
          };
          break;
        }
      }
    }
    
    return {
      ...achievement,
      isUnlocked: !!unlocked,
      unlockedAt: unlocked?.unlockedAt,
      ...progressInfo
    };
  });
  
  res.json({ achievements: achievementsWithStatus });
}));

module.exports = router;
