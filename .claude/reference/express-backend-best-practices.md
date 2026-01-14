# Express Backend Best Practices Reference

Руководство по разработке backend на Express + MongoDB для bro-learn-web.

---

## Table of Contents

1. [Общие принципы](#общие-принципы)
2. [Структура проекта](#структура-проекта)
3. [API Design](#api-design)
4. [TypeScript Standards](#typescript-standards)
5. [Безопасность](#безопасность)
6. [Тестирование](#тестирование)

---

## Общие принципы

- **Hot Reload**: Node.js автоматически перезагружает изменения в `stubs/api/` - не перезапускай сервер вручную
- **Никаких моков в production**: Все данные должны храниться в MongoDB, никаких глобальных переменных или in-memory хранилищ
- **Проксирование**: API работает через прокси на `http://localhost:8099/api`
- **Базовый путь**: Всегда используй `/api` как префикс для всех endpoints. НЕ используй хардкорные пути `/api` - используй значение ключа из `bro.config.js`
- **Статус коды**: Все успешные операции должны возвращать 200/201, проверяй статусы в браузере

## Структура проекта

```
bro-learn-web/
├── stubs/
│   └── api/
│       ├── index.js          # Main router
│       ├── users.js          # Users endpoints
│       ├── lessons.js        # Lessons endpoints
│       └── progress.js       # Progress tracking endpoints
```

### Организация файлов

- Один файл = одна логическая группа endpoints (users, lessons, progress)
- Каждый файл экспортирует Express Router
- `index.js` импортирует и монтирует все роутеры

```javascript
// stubs/api/lessons.js
const router = require('express').Router();

router.get('/lessons', async (req, res) => {
  // implementation
});

router.post('/lessons', async (req, res) => {
  // implementation
});

module.exports = router;
```

```javascript
// stubs/api/index.js
const router = require('express').Router();
const lessonsRouter = require('./lessons');
const usersRouter = require('./users');

router.use(lessonsRouter);
router.use(usersRouter);

module.exports = router;
```

## API Design

### Использование базового пути из конфигурации

```javascript
// bro.config.js содержит настройку API пути
// НЕ используй хардкорные пути типа '/api' напрямую
// Используй значение из конфигурации для построения URL на клиенте

// В роутерах используй относительные пути без префикса /api
// Префикс добавляется автоматически при монтировании роутера
```

### RESTful Conventions

```javascript
// GET /api/lessons - получить список всех уроков
router.get('/lessons', async (req, res) => {
  try {
    const lessons = await db.collection('lessons').find({}).toArray();
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/lessons/:id - получить один урок
router.get('/lessons/:id', async (req, res) => {
  try {
    const lesson = await db.collection('lessons').findOne({ _id: req.params.id });
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/lessons - создать урок
router.post('/lessons', async (req, res) => {
  try {
    const result = await db.collection('lessons').insertOne(req.body);
    res.status(201).json({ id: result.insertedId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/lessons/:id - обновить урок
router.put('/lessons/:id', async (req, res) => {
  try {
    const result = await db.collection('lessons').updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/lessons/:id - удалить урок
router.delete('/lessons/:id', async (req, res) => {
  try {
    const result = await db.collection('lessons').deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Обработка ошибок

```javascript
// Middleware для обработки ошибок
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Использование
router.get('/lessons', asyncHandler(async (req, res) => {
  const lessons = await db.collection('lessons').find({}).toArray();
  res.json(lessons);
}));

// Глобальный обработчик ошибок в index.js
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: err.message 
  });
});
```

### Query Parameters

```javascript
// GET /api/lessons?category=grammar&level=beginner
router.get('/lessons', async (req, res) => {
  const { category, level } = req.query;
  const filter = {};
  
  if (category) filter.category = category;
  if (level) filter.level = level;
  
  const lessons = await db.collection('lessons').find(filter).toArray();
  res.json(lessons);
});
```

### Pagination

```javascript
// GET /api/lessons?page=1&limit=10
router.get('/lessons', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  
  const [lessons, total] = await Promise.all([
    db.collection('lessons').find({}).skip(skip).limit(limit).toArray(),
    db.collection('lessons').countDocuments()
  ]);
  
  res.json({
    data: lessons,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  });
});
```

## TypeScript Standards

Хотя API пишется на JavaScript, клиентский код использует TypeScript.

### Типизация API ответов

```typescript
// src/__data__/types/api.ts
export interface Lesson {
  _id: string;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  exercises: Exercise[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  error: string;
  message?: string;
}
```

## Безопасность

### Input Validation

```javascript
const validateLesson = (req, res, next) => {
  const { title, category, level } = req.body;
  
  if (!title || typeof title !== 'string' || title.length < 3) {
    return res.status(400).json({ error: 'Invalid title' });
  }
  
  if (!category || typeof category !== 'string') {
    return res.status(400).json({ error: 'Invalid category' });
  }
  
  const validLevels = ['beginner', 'intermediate', 'advanced'];
  if (!level || !validLevels.includes(level)) {
    return res.status(400).json({ error: 'Invalid level' });
  }
  
  next();
};

router.post('/lessons', validateLesson, async (req, res) => {
  // implementation
});
```

### Sanitization

```javascript
const sanitizeInput = (obj) => {
  const sanitized = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      // Удаляем потенциально опасные символы
      sanitized[key] = value.trim().replace(/[<>]/g, '');
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
};

router.post('/lessons', async (req, res) => {
  const sanitizedBody = sanitizeInput(req.body);
  // use sanitizedBody
});
```

## Тестирование

### Проверка API через MCP MongoDB

Используй MCP MongoDB для проверки данных:

```bash
# Проверить коллекции
mcp_MCP_DOCKER_list-collections database="bro-learn"

# Проверить данные
mcp_MCP_DOCKER_find database="bro-learn" collection="lessons" limit=10

# Проверить количество
mcp_MCP_DOCKER_count database="bro-learn" collection="lessons"
```

### Ручное тестирование через браузер

- **НЕ используй автотесты для поиска проблем**
- Всегда проверяй API в браузере:
  - Открой DevTools → Network
  - Проверь статус код (должен быть 200)
  - Проверь формат ответа
  - Проверь время ответа

### Debugging

```javascript
// Добавь логирование для отладки
router.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, {
    query: req.query,
    body: req.body
  });
  next();
});
```

## Code Style

- **НЕ используй Python-style** в JavaScript/TypeScript
- Используй async/await вместо callbacks
- Используй const/let вместо var
- Придерживайся camelCase для переменных и функций
- Используй descriptive naming

```javascript
// ❌ Плохо (Python style)
const get_user_by_id = async (user_id) => {
  const user_data = await db.find_one({ '_id': user_id })
  return user_data
}

// ✅ Хорошо (JavaScript style)
const getUserById = async (userId) => {
  const userData = await db.findOne({ _id: userId });
  return userData;
};
```

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
