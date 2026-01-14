# BroLearn API Documentation

Backend API для приложения BroLearn Web на Express + MongoDB.

## Структура

```
stubs/api/
├── index.js              # Главный роутер Express
├── db/
│   └── connection.js     # MongoDB connection
├── routes/
│   ├── modules.js        # Модули обучения
│   ├── lessons.js        # Уроки
│   ├── exercises.js      # Упражнения
│   ├── progress.js       # Прогресс пользователя
│   ├── achievements.js   # Достижения
│   └── stats.js          # Статистика
├── utils/
│   └── helpers.js        # Утилиты (валидация, обработка ошибок)
├── data/
│   ├── modules.json      # Данные модулей
│   ├── lessons.json      # Данные уроков
│   └── exercises.json    # Данные упражнений
└── scripts/
    └── seed.js           # Скрипт для загрузки данных в MongoDB
```

## Запуск

### Разработка

```bash
# Запуск dev сервера (с hot reload)
npm start

# Сервер будет доступен на http://localhost:8099
# API доступен по адресу http://localhost:8099/api
```

### Инициализация базы данных

```bash
# Загрузка данных в MongoDB
npm run seed
```

## API Endpoints

### Modules

#### GET /modules
Получить список всех модулей с прогрессом.

**Response:**
```json
{
  "modules": [
    {
      "id": "prompting-basics",
      "title": "Основы промптинга",
      "description": "...",
      "order": 1,
      "lessonsCount": 6,
      "progress": 50,
      "isCompleted": false,
      "isLocked": false
    }
  ]
}
```

#### GET /modules/:moduleId
Получить детали модуля с уроками.

**Response:**
```json
{
  "module": {
    "id": "prompting-basics",
    "title": "Основы промптинга",
    "lessons": [
      {
        "id": "lesson-gigachat-intro",
        "title": "Знакомство с GigaChat",
        "order": 1,
        "isCompleted": false,
        "isLocked": false
      }
    ]
  }
}
```

### Lessons

#### GET /lessons/:lessonId
Получить содержимое урока.

**Response:**
```json
{
  "lesson": {
    "id": "lesson-gigachat-intro",
    "title": "Знакомство с GigaChat",
    "content": {
      "type": "code-tutorial",
      "sections": [...]
    },
    "exercises": ["ex-gigachat-1", "ex-gigachat-2"],
    "isCompleted": false,
    "exercisesCompleted": 0,
    "exercisesTotal": 3
  }
}
```

### Exercises

#### GET /exercises/:exerciseId
Получить данные упражнения (без правильных ответов).

**Response:**
```json
{
  "exercise": {
    "id": "ex-gigachat-1",
    "type": "multiple-choice",
    "question": "...",
    "options": [
      { "id": "a", "text": "..." }
    ],
    "hints": ["..."],
    "isCompleted": false
  }
}
```

#### POST /exercises/:exerciseId/submit
Проверить ответ на упражнение.

**Request Body (multiple-choice):**
```json
{
  "type": "multiple-choice",
  "selectedOptions": ["a"]
}
```

**Request Body (code-exercise):**
```json
{
  "type": "code-exercise",
  "code": "const server = new Server();"
}
```

**Request Body (prompt-fix):**
```json
{
  "type": "prompt-fix",
  "improvedPrompt": "Ты — эксперт по маркетингу..."
}
```

**Request Body (text-input):**
```json
{
  "type": "text-input",
  "answer": "русский язык, контекст, понимание"
}
```

**Request Body (matching):**
```json
{
  "type": "matching",
  "pairs": [
    { "leftId": "task1", "rightId": "model2" }
  ]
}
```

**Response:**
```json
{
  "isCorrect": true,
  "partialCredit": false,
  "xpEarned": 10,
  "explanation": "...",
  "feedback": {
    "correctParts": ["..."],
    "improvements": ["..."]
  },
  "nextExercise": "ex-gigachat-2"
}
```

### Progress

#### GET /progress
Получить прогресс пользователя.

**Response:**
```json
{
  "progress": {
    "userId": "default-user",
    "totalXP": 1250,
    "currentStreak": 5,
    "longestStreak": 12,
    "lastActivityDate": "2026-01-10T10:30:00Z",
    "completedLessons": [...],
    "completedExercises": [...],
    "achievements": [...]
  }
}
```

#### POST /progress/lessons/:lessonId/complete
Отметить урок как завершенный.

**Request Body:**
```json
{
  "score": 100,
  "attempts": 1,
  "timeSpent": 900
}
```

**Response:**
```json
{
  "success": true,
  "xpEarned": 100,
  "totalXP": 1350,
  "newAchievements": [
    {
      "id": "first-steps",
      "title": "First Steps",
      "xpBonus": 25
    }
  ],
  "streakUpdated": {
    "currentStreak": 6,
    "isNewRecord": false
  }
}
```

### Achievements

#### GET /achievements
Получить все достижения с прогрессом.

**Response:**
```json
{
  "achievements": [
    {
      "id": "first-steps",
      "title": "First Steps",
      "description": "Завершите первый урок",
      "icon": "star",
      "category": "progress",
      "xpBonus": 25,
      "isUnlocked": true,
      "unlockedAt": "2026-01-09T15:20:00Z"
    },
    {
      "id": "consistent-learner",
      "title": "Consistent Learner",
      "description": "3 дня подряд обучения",
      "icon": "flame",
      "category": "streak",
      "xpBonus": 50,
      "isUnlocked": false,
      "progress": 2,
      "total": 3
    }
  ]
}
```

### Stats

#### GET /stats
Получить статистику пользователя.

**Response:**
```json
{
  "stats": {
    "totalLessons": 21,
    "completedLessons": 8,
    "completionPercentage": 38,
    "totalExercises": 105,
    "correctExercises": 87,
    "accuracyPercentage": 83,
    "totalTimeSpent": 7200,
    "averageTimePerLesson": 900,
    "moduleProgress": [
      {
        "moduleId": "prompting-basics",
        "moduleTitle": "Основы промптинга",
        "completed": 6,
        "total": 6,
        "percentage": 100
      }
    ],
    "exerciseTypeStats": [...],
    "last7Days": [...],
    "currentStreak": 5,
    "longestStreak": 12,
    "totalXP": 1250,
    "achievementsUnlocked": 3
  }
}
```

## Error Handling

Все ошибки возвращаются в формате:

```json
{
  "error": "Error message",
  "message": "Detailed description (optional)"
}
```

**HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `422` - Unprocessable Entity
- `500` - Internal Server Error

## Best Practices

### Используй asyncHandler
```javascript
const { asyncHandler } = require('../utils/helpers');

router.get('/endpoint', asyncHandler(async (req, res) => {
  // Ошибки автоматически обрабатываются
  const data = await db.collection('data').find({}).toArray();
  res.json({ data });
}));
```

### Валидация входных данных
```javascript
const { validateId, validateNumber } = require('../utils/helpers');

const id = validateId(req.params.id, 'id');
const score = validateNumber(req.body.score, 'score', 0, 100);
```

### Sanitization
```javascript
const { sanitizeInput } = require('../utils/helpers');

const sanitized = sanitizeInput(req.body);
```

### Проверка существования
```javascript
const { ensureExists } = require('../utils/helpers');

const lesson = await db.collection('lessons').findOne({ id: lessonId });
ensureExists(lesson, 'Lesson', lessonId);
```

## MongoDB

### Connection
```javascript
const { getDB } = require('../db/connection');

const db = await getDB();
```

### Collections
- `modules` - Модули обучения
- `lessons` - Уроки
- `exercises` - Упражнения
- `progress` - Прогресс пользователей

### Indexes
```javascript
// Созданы автоматически при seed
modules: { id: 1 (unique), order: 1 }
lessons: { id: 1 (unique), moduleId: 1, order: 1 }
exercises: { id: 1 (unique), lessonId: 1 }
progress: { userId: 1 (unique) }
```

## Hot Reload

Node.js автоматически перезагружает изменения в `stubs/api/` - не перезапускай сервер вручную.

## Testing

### Через браузер
1. Открой DevTools → Network
2. Проверь статус код (должен быть 200)
3. Проверь формат ответа
4. Проверь время ответа

### Через MCP MongoDB
```bash
# Проверить данные
mcp_MCP_DOCKER_find database="brolearn" collection="lessons" limit=10

# Проверить количество
mcp_MCP_DOCKER_count database="brolearn" collection="lessons"
```

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/)
- [PRD.md](../../PRD.md) - Product Requirements
- [MongoDB Best Practices](.claude/reference/mongodb-best-practices.md)
- [Express Best Practices](.claude/reference/express-backend-best-practices.md)
