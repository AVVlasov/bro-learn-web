# MongoDB Best Practices Reference

Руководство по работе с MongoDB в проекте bro-learn-web.

---

## Table of Contents

1. [Подключение к базе данных](#подключение-к-базе-данных)
2. [Структура коллекций](#структура-коллекций)
3. [CRUD операции](#crud-операции)
4. [Индексы](#индексы)
5. [Агрегация](#агрегация)
6. [MCP MongoDB Tools](#mcp-mongodb-tools)
7. [Безопасность и производительность](#безопасность-и-производительность)

---

## Подключение к базе данных

MongoDB запущена в Docker и доступна для работы через MCP.

### Connection String

```javascript
// stubs/api/db.js
const { MongoClient } = require('mongodb');

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = 'bro-learn';

let db = null;

async function connectDB() {
  if (db) return db;
  
  const client = await MongoClient.connect(connectionString);
  db = client.db(dbName);
  console.log('Connected to MongoDB');
  return db;
}

module.exports = { connectDB };
```

### Использование в роутерах

```javascript
// stubs/api/lessons.js
const router = require('express').Router();
const { connectDB } = require('./db');

router.get('/lessons', async (req, res) => {
  const db = await connectDB();
  const lessons = await db.collection('lessons').find({}).toArray();
  res.json(lessons);
});
```

## Структура коллекций

### Lessons Collection

```javascript
{
  _id: ObjectId("..."),
  title: "Введение в промпт-инженерию",
  description: "Основы написания эффективных промптов",
  category: "basics",
  level: "beginner", // beginner | intermediate | advanced
  order: 1,
  duration: 15, // минуты
  exercises: [
    {
      id: "ex1",
      type: "multiple-choice",
      question: "Что такое промпт?",
      options: ["A", "B", "C", "D"],
      correctAnswer: "A",
      explanation: "..."
    }
  ],
  rewards: {
    xp: 50,
    streakBonus: 10
  },
  createdAt: ISODate("2025-01-09T00:00:00Z"),
  updatedAt: ISODate("2025-01-09T00:00:00Z")
}
```

### User Progress Collection

```javascript
{
  _id: ObjectId("..."),
  userId: "user123", // В single-user приложении можно использовать константу
  completedLessons: [
    {
      lessonId: ObjectId("..."),
      completedAt: ISODate("2025-01-09T00:00:00Z"),
      score: 85,
      timeSpent: 12 // минуты
    }
  ],
  currentStreak: 5,
  longestStreak: 10,
  totalXP: 500,
  level: 3,
  lastActivityDate: ISODate("2025-01-09T00:00:00Z")
}
```

### Categories Collection

```javascript
{
  _id: ObjectId("..."),
  name: "basics",
  title: "Основы",
  description: "Базовые концепции работы с LLM",
  icon: "🎯",
  order: 1,
  lessonsCount: 10
}
```

## CRUD операции

### Create (Insert)

```javascript
// Одна запись
const result = await db.collection('lessons').insertOne({
  title: "Новый урок",
  category: "basics",
  createdAt: new Date(),
  updatedAt: new Date()
});
console.log(`Inserted ID: ${result.insertedId}`);

// Много записей
const result = await db.collection('lessons').insertMany([
  { title: "Урок 1", category: "basics" },
  { title: "Урок 2", category: "advanced" }
]);
console.log(`Inserted ${result.insertedCount} documents`);
```

### Read (Find)

```javascript
// Найти все
const allLessons = await db.collection('lessons').find({}).toArray();

// Найти по фильтру
const beginnerLessons = await db.collection('lessons')
  .find({ level: "beginner" })
  .toArray();

// Найти один документ
const lesson = await db.collection('lessons')
  .findOne({ _id: new ObjectId(lessonId) });

// С проекцией (выбор полей)
const titles = await db.collection('lessons')
  .find({}, { projection: { title: 1, category: 1 } })
  .toArray();

// С сортировкой
const sortedLessons = await db.collection('lessons')
  .find({})
  .sort({ order: 1 })
  .toArray();

// С лимитом и пропуском (пагинация)
const page = 2;
const limit = 10;
const lessons = await db.collection('lessons')
  .find({})
  .skip((page - 1) * limit)
  .limit(limit)
  .toArray();
```

### Update

```javascript
// Обновить один документ
const result = await db.collection('lessons').updateOne(
  { _id: new ObjectId(lessonId) },
  { 
    $set: { 
      title: "Обновленное название",
      updatedAt: new Date()
    }
  }
);
console.log(`Modified ${result.modifiedCount} document(s)`);

// Обновить много документов
const result = await db.collection('lessons').updateMany(
  { category: "basics" },
  { $set: { level: "beginner" } }
);

// Upsert (создать если не существует)
const result = await db.collection('progress').updateOne(
  { userId: "user123" },
  { 
    $set: { lastActivityDate: new Date() },
    $inc: { totalXP: 50 }
  },
  { upsert: true }
);

// Добавить в массив
await db.collection('progress').updateOne(
  { userId: "user123" },
  {
    $push: {
      completedLessons: {
        lessonId: new ObjectId(lessonId),
        completedAt: new Date(),
        score: 85
      }
    }
  }
);

// Увеличить числовое значение
await db.collection('progress').updateOne(
  { userId: "user123" },
  {
    $inc: { 
      totalXP: 50,
      currentStreak: 1
    }
  }
);
```

### Delete

```javascript
// Удалить один документ
const result = await db.collection('lessons').deleteOne({
  _id: new ObjectId(lessonId)
});
console.log(`Deleted ${result.deletedCount} document(s)`);

// Удалить много документов
const result = await db.collection('lessons').deleteMany({
  category: "deprecated"
});
```

## Индексы

Индексы ускоряют поиск данных.

### Создание индексов

```javascript
// Простой индекс
await db.collection('lessons').createIndex({ category: 1 });

// Составной индекс
await db.collection('lessons').createIndex({ 
  category: 1, 
  level: 1,
  order: 1
});

// Уникальный индекс
await db.collection('users').createIndex(
  { email: 1 },
  { unique: true }
);

// Текстовый индекс для полнотекстового поиска
await db.collection('lessons').createIndex({
  title: "text",
  description: "text"
});
```

### Проверка индексов через MCP

```bash
mcp_MCP_DOCKER_collection-indexes database="bro-learn" collection="lessons"
```

## Агрегация

Агрегация для сложных запросов и аналитики.

### Примеры агрегации

```javascript
// Подсчет уроков по категориям
const stats = await db.collection('lessons').aggregate([
  {
    $group: {
      _id: "$category",
      count: { $sum: 1 },
      avgDuration: { $avg: "$duration" }
    }
  },
  {
    $sort: { count: -1 }
  }
]).toArray();

// Присоединение коллекций (lookup)
const lessonsWithProgress = await db.collection('lessons').aggregate([
  {
    $lookup: {
      from: "progress",
      localField: "_id",
      foreignField: "completedLessons.lessonId",
      as: "userProgress"
    }
  },
  {
    $project: {
      title: 1,
      category: 1,
      isCompleted: { 
        $gt: [{ $size: "$userProgress" }, 0] 
      }
    }
  }
]).toArray();

// Статистика прогресса пользователя
const userStats = await db.collection('progress').aggregate([
  { $match: { userId: "user123" } },
  {
    $project: {
      totalXP: 1,
      completedCount: { $size: "$completedLessons" },
      avgScore: { $avg: "$completedLessons.score" },
      totalTimeSpent: { $sum: "$completedLessons.timeSpent" }
    }
  }
]).toArray();
```

## MCP MongoDB Tools

**ВСЕГДА используй MCP для проверки и отладки API.**

### Основные команды

```bash
# Список баз данных
mcp_MCP_DOCKER_list-databases

# Список коллекций
mcp_MCP_DOCKER_list-collections database="bro-learn"

# Поиск документов
mcp_MCP_DOCKER_find \
  database="bro-learn" \
  collection="lessons" \
  filter='{"category": "basics"}' \
  limit=10

# Подсчет документов
mcp_MCP_DOCKER_count \
  database="bro-learn" \
  collection="lessons" \
  query='{"level": "beginner"}'

# Агрегация
mcp_MCP_DOCKER_aggregate \
  database="bro-learn" \
  collection="lessons" \
  pipeline='[{"$group": {"_id": "$category", "count": {"$sum": 1}}}]'

# Вставка документов
mcp_MCP_DOCKER_insert-many \
  database="bro-learn" \
  collection="lessons" \
  documents='[{"title": "Test", "category": "basics"}]'

# Обновление
mcp_MCP_DOCKER_update-many \
  database="bro-learn" \
  collection="lessons" \
  filter='{"category": "basics"}' \
  update='{"$set": {"level": "beginner"}}'

# Удаление
mcp_MCP_DOCKER_delete-many \
  database="bro-learn" \
  collection="lessons" \
  filter='{"category": "deprecated"}'

# Схема коллекции
mcp_MCP_DOCKER_collection-schema \
  database="bro-learn" \
  collection="lessons"

# Индексы коллекции
mcp_MCP_DOCKER_collection-indexes \
  database="bro-learn" \
  collection="lessons"

# Статистика базы данных
mcp_MCP_DOCKER_db-stats database="bro-learn"

# Размер коллекции
mcp_MCP_DOCKER_collection-storage-size \
  database="bro-learn" \
  collection="lessons"
```

## Безопасность и производительность

### Валидация данных

```javascript
// Всегда валидируй входные данные перед записью
const validateLesson = (lesson) => {
  if (!lesson.title || typeof lesson.title !== 'string') {
    throw new Error('Invalid title');
  }
  if (!['beginner', 'intermediate', 'advanced'].includes(lesson.level)) {
    throw new Error('Invalid level');
  }
  return true;
};

router.post('/lessons', async (req, res) => {
  try {
    validateLesson(req.body);
    const db = await connectDB();
    const result = await db.collection('lessons').insertOne({
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    res.status(201).json({ id: result.insertedId, ...req.body });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

### Избегай N+1 проблемы

```javascript
// ❌ Плохо: N+1 запросов
const lessons = await db.collection('lessons').find({}).toArray();
for (const lesson of lessons) {
  const category = await db.collection('categories').findOne({ 
    name: lesson.category 
  });
  lesson.categoryDetails = category;
}

// ✅ Хорошо: используй агрегацию с $lookup
const lessons = await db.collection('lessons').aggregate([
  {
    $lookup: {
      from: "categories",
      localField: "category",
      foreignField: "name",
      as: "categoryDetails"
    }
  },
  {
    $unwind: {
      path: "$categoryDetails",
      preserveNullAndEmptyArrays: true
    }
  }
]).toArray();
```

### Используй проекцию

```javascript
// ❌ Плохо: загружаем все поля
const lessons = await db.collection('lessons').find({}).toArray();

// ✅ Хорошо: выбираем только нужные поля
const lessons = await db.collection('lessons')
  .find({}, { 
    projection: { 
      title: 1, 
      category: 1, 
      level: 1,
      _id: 1
    } 
  })
  .toArray();
```

### Batch операции

```javascript
// ❌ Плохо: много отдельных операций
for (const lesson of lessons) {
  await db.collection('lessons').updateOne(
    { _id: lesson._id },
    { $set: { updated: true } }
  );
}

// ✅ Хорошо: bulk операция
const bulkOps = lessons.map(lesson => ({
  updateOne: {
    filter: { _id: lesson._id },
    update: { $set: { updated: true } }
  }
}));
await db.collection('lessons').bulkWrite(bulkOps);
```

### Timestamps

```javascript
// Всегда добавляй timestamps
const lesson = {
  ...data,
  createdAt: new Date(),
  updatedAt: new Date()
};

// При обновлении всегда обновляй updatedAt
await db.collection('lessons').updateOne(
  { _id: lessonId },
  { 
    $set: { 
      ...updates,
      updatedAt: new Date()
    }
  }
);
```

## Никаких моков!

**КРИТИЧЕСКИ ВАЖНО**: Все данные должны храниться в MongoDB.

```javascript
// ❌ ЗАПРЕЩЕНО: глобальные переменные и моки
let lessonsCache = [];

router.get('/lessons', (req, res) => {
  res.json(lessonsCache);
});

// ✅ ПРАВИЛЬНО: данные из БД
router.get('/lessons', async (req, res) => {
  const db = await connectDB();
  const lessons = await db.collection('lessons').find({}).toArray();
  res.json(lessons);
});
```

## Resources

- [MongoDB Node.js Driver Documentation](https://mongodb.github.io/node-mongodb-native/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [MongoDB Best Practices](https://www.mongodb.com/docs/manual/administration/production-notes/)
- [MongoDB Aggregation](https://www.mongodb.com/docs/manual/aggregation/)
