# Структура API Duolingo

## 🌐 Обзор

Duolingo использует REST API с версионированием endpoints. Анализ Network запросов выявил несколько доменов и паттернов API.

## 🏠 Домены и серверы

### Основные домены

```javascript
const DUOLINGO_DOMAINS = {
  main: 'https://www.duolingo.com',
  zombie: 'https://zombie.duolingo.com',  // Session tracking
  analytics: 'https://excess.duolingo.com',  // Analytics batch
  goals: 'https://goals-api.duolingo.com',  // Quests & Goals
  leaderboards: 'https://duolingo-leaderboards-prod.duolingo.com',
  contentCDN: 'https://d1btvuu4dwu627.cloudfront.net',  // Lesson content
  staticCDN: 'https://d35aaqx5ub95lt.cloudfront.net'  // Static assets
};
```

## 📋 API Версионирование

Duolingo использует дату-версионирование:

```
/2023-05-23/*  - Современный API
/2017-06-30/*  - Legacy API (friends, social)
/api/1/*       - Старый API v1
```

## 🔐 Аутентификация

### Registration & Login

#### **POST** `/2023-05-23/users`
Регистрация нового пользователя

**Body:**
```json
{
  "username": "AndreyVlas420802",
  "email": "test@example.com",
  "password": "***",
  "age": 25,
  "learningLanguage": "en",
  "fromLanguage": "ru"
}
```

**Response:**
```json
{
  "id": "637621315922159",
  "username": "AndreyVlas420802",
  "email": "test@example.com",
  "creationDate": "2026-01-09T...",
  "gemsConfig": { "gems": 500 },
  "streak": 0
}
```

#### **POST** `/2023-05-23/login`
Вход пользователя

**Query params:**
```
?fields=
```

**Body:**
```json
{
  "login": "username_or_email",
  "password": "***"
}
```

### OAuth Интеграции

```javascript
const OAUTH_PROVIDERS = {
  google: {
    client_id: '450298686065.apps.googleusercontent.com',
    endpoint: 'https://accounts.google.com/gsi/client'
  },
  facebook: {
    endpoint: 'https://connect.facebook.net/en_US/sdk.js'
  }
};
```

## 👤 User API

### **GET** `/2023-05-23/users/{userId}`

Получение данных пользователя

**Query params (fields):**
```
?fields=acquisitionSurveyReason,
        adsConfig,
        animationEnabled,
        betaStatus,
        courses,
        currentCourseId,
        email,
        experiments,
        fromLanguage,
        gemsConfig,
        health,
        id,
        learningLanguage,
        name,
        streak,
        streakData,
        totalXp,
        trackingProperties,
        username,
        xpGains,
        xpGoal,
        currentCourse
```

**Response:**
```json
{
  "id": "637621315922159",
  "username": "Alex705200",
  "name": "",
  "email": "***",
  "fromLanguage": "ru",
  "learningLanguage": "en",
  "currentCourseId": "DUOLINGO_EN_RU",
  "totalXp": 0,
  "xpGoal": 20,
  "streak": 0,
  "streakData": {
    "currentStreak": 0,
    "longestStreak": 0,
    "previousStreak": 0
  },
  "gemsConfig": {
    "gems": 500
  },
  "courses": [
    {
      "id": "DUOLINGO_EN_RU",
      "title": "English from Russian",
      "learningLanguage": "en",
      "fromLanguage": "ru",
      "xp": 0
    }
  ],
  "experiments": {
    "math_on_web": false,
    "web_bingo_ja_xx": false
    // ... другие флаги A/B тестов
  }
}
```

### **PATCH** `/2023-05-23/users/{userId}`

Обновление данных пользователя

**Body примеры:**

**Обновление XP Goal:**
```json
{
  "xpGoal": 20,
  "trackingProperties": { ... }
}
```

**Обновление курса:**
```json
{
  "fromLanguage": "ru",
  "learningLanguage": "en",
  "courses": [ ... ],
  "currentCourse": { ... },
  "trackingProperties": { ... }
}
```

**Обновление мотивации:**
```json
{
  "motivation": "career",
  "trackingProperties": { ... }
}
```

**Обновление survey данных:**
```json
{
  "acquisitionSurveyReason": "google_search",
  "trackingProperties": { ... }
}
```

## 📚 Courses API

### **GET** `/api/1/courses/list`

Получение списка всех доступных курсов

**Response:**
```json
[
  {
    "id": "DUOLINGO_EN_RU",
    "fromLanguage": "ru",
    "learningLanguage": "en",
    "title": "English from Russian",
    "learners": 17000000
  },
  {
    "id": "DUOLINGO_DE_RU",
    "fromLanguage": "ru",
    "learningLanguage": "de",
    "title": "German from Russian",
    "learners": 3000000
  }
  // ... всего 40+ курсов
]
```

## 📖 Sessions & Lessons API

### **POST** `/2023-05-23/sessions`

Создание новой сессии урока

**Body:**
```json
{
  "challengeTypes": [
    "select",
    "translate",
    "speak",
    "listen",
    "match"
  ],
  "fromLanguage": "ru",
  "juicy": true,
  "learningLanguage": "en",
  "skillId": "basic_phrases_1",
  "smartTipsVersion": 2,
  "type": "lesson"
}
```

**Response:** (огромный JSON с challenges)
```json
{
  "id": "session_id_123",
  "challenges": [
    {
      "id": "challenge_1",
      "type": "select",
      "prompt": "Выберите правильный перевод",
      "choices": ["Hello", "Goodbye", "Thank you"],
      "correctIndex": 0,
      "metadata": {
        "learning_language": "en",
        "from_language": "ru"
      }
    }
    // ... 10-20 challenges
  ],
  "smartTips": [
    {
      "id": "tip_1",
      "content": "...",
      "lottie": "..."
    }
  ],
  "trackingProperties": { ... }
}
```

### **GET** Lesson Content

Контент уроков хранится на CDN:

```
https://d1btvuu4dwu627.cloudfront.net/
  {skill_tree_id}/
  {challenge_id}/
  web/
  {version}/
  {difficulty}/
  {variant}.json
```

**Пример:**
```
https://d1btvuu4dwu627.cloudfront.net/
  28ccd782fcc4aa3c420abd72a3422484/
  2daffcb97b4f8353751bc14a8cf2e603/
  web/5/1.json
```

### **PUT** `/2023-05-23/sessions/{sessionId}`

Обновление прогресса сессии (отправка ответов)

**Body:**
```json
{
  "challengeId": "challenge_1",
  "response": "Hello",
  "isCorrect": true,
  "timeSpent": 3500
}
```

## 📊 Progress & Stats API

### **GET** `/2023-05-23/users/{userId}/xp_summaries`

История XP по дням

**Query:**
```
?startDate=2025-01-09
```

**Response:**
```json
{
  "summaries": [
    {
      "date": "2025-01-09",
      "gainedXp": 0,
      "frozen": false,
      "numSessions": 0
    }
  ]
}
```

### **GET** `/2023-05-23/score-info/courses/{courseId}`

Информация о scores раздела

**Query:**
```
?fields=scores
&sectionIndex=0
&skillTreeID=28ccd782fcc4aa3c420abd72a3422484
&unitIndex=0
```

### **GET** `/v2/mistakes/users/{userId}/courses/{courseId}/count`

Количество ошибок

**Query:**
```
?includeListening=true
&includeSpeaking=true
```

## 🎯 Goals & Quests API

### **GET** `/users/{userId}/streak-goal-current`

Текущая цель streak

**Response:**
```json
{
  "currentGoal": 7,
  "progress": 0
}
```

### **GET** `/users/{userId}/streak-goal-next-options`

Доступные опции для следующей цели

**Response:**
```json
{
  "options": [7, 14, 30, 100]
}
```

### **GET** `goals-api.duolingo.com/users/{userId}/quests`

Список активных квестов

**Response:**
```json
{
  "quests": [
    {
      "id": "daily_xp_10",
      "type": "earn_xp",
      "goal": 10,
      "progress": 0,
      "reward": {
        "gems": 5
      },
      "expiresAt": "2025-01-10T00:00:00Z"
    }
  ]
}
```

### **GET** `goals-api.duolingo.com/users/{userId}/progress`

Прогресс по целям

**Query:**
```
?timezone=Europe/Moscow
&ui_language=ru
```

**Response:**
```json
{
  "dailyGoal": {
    "xp": 20,
    "progress": 0,
    "completed": false
  },
  "weeklyGoal": {
    "xp": 100,
    "progress": 0,
    "completed": false
  }
}
```

### **GET** `goals-api.duolingo.com/schema`

Схема квестов и целей

**Query:**
```
?ui_language=ru
```

## 🏆 Leaderboards API

### **GET** `duolingo-leaderboards-prod.duolingo.com/leaderboards/{leagueId}/users/{userId}`

Данные о позиции в рейтинге

**Query:**
```
?get_reactions=true
```

**Response:**
```json
{
  "leagueId": "7d9f5dd1-8423-491a-91f2-2532052038ce",
  "league": "BRONZE",
  "rank": 15,
  "totalUsers": 30,
  "xp": 0,
  "topUsers": [
    {
      "userId": "user1",
      "username": "UserA",
      "xp": 1234,
      "rank": 1
    }
  ],
  "promotionZone": [1, 10],
  "demotionZone": [26, 30]
}
```

### **GET** `duolingo-leaderboards-prod.duolingo.com/reactions/uncohorted/{leagueId}/users/{userId}`

Реакции (kudos) в рейтинге

## 👥 Social API

### **GET** `/2017-06-30/friends/users/{userId}/feed/v2`

Лента активности друзей

**Query:**
```
?uiLanguage=ru
```

**Response:**
```json
{
  "feed": [
    {
      "type": "lesson_completed",
      "userId": "friend_id",
      "username": "Anna",
      "xp": 20,
      "timestamp": "2025-01-09T12:34:56Z"
    }
  ]
}
```

### **GET** `/2017-06-30/friends/users/{userId}/profile`

Профиль пользователя (для друзей)

**Query:**
```
?pageSize=5
```

### **GET** `/2017-06-30/friends/users/{userId}/matches`

Соперники в рейтинге

**Query:**
```
?activityName=friendsStreak
```

### **GET** `/2017-06-30/friends/users/{userId}/recommendations`

Рекомендации друзей

**Query:**
```
?filterUsers=true
&pageSize=50
&uiLanguage=ru
```

### **GET** `/2017-06-30/friends/kudos/assets`

Список доступных kudos (стикеров)

### **GET** `/2017-06-30/friends/kudos/{userId}/drawer/v2`

Kudos пользователя

**Query:**
```
?uiLanguage=ru
```

## 💎 Shop & Monetization API

### **GET** `/2023-05-23/shop-items`

Список товаров в магазине

**Response:**
```json
{
  "items": [
    {
      "id": "streak_freeze",
      "name": "Streak Freeze",
      "price": 200,
      "currency": "gems",
      "icon": "..."
    }
  ]
}
```

### **GET** `/2023-05-23/users/{userId}/subscription-catalog`

Каталог подписок

**Query:**
```
?billingCountryCode=RU
&vendor=VENDOR_STRIPE
&supportedLayouts=STANDARD,NEW_YEARS_2026
```

**Response:**
```json
{
  "subscriptions": [
    {
      "id": "super_annual",
      "name": "Super Duolingo",
      "price": 4999,
      "currency": "RUB",
      "period": "annual",
      "discount": 60
    }
  ]
}
```

### **GET** `/2023-05-23/users/{userId}`

Purchased items

**Query:**
```
?fields=shopItems{...}
```

## 🎨 Avatar & Customization API

### **GET** `/users/{userId}/built-avatar-states`

Состояния аватара пользователя

### **GET** `/users/{userId}/avatar-builder-config`

Конфигурация builder аватара

**Query:**
```
?uiLanguage=ru
```

## 📝 Messaging API

### **POST** `/2017-06-30/messaging/get-messages/`

Получение сообщений

**Response:**
```json
{
  "messages": []
}
```

## 📊 Analytics API

### **POST** `excess.duolingo.com/batch`

Batch отправка аналитических событий

**Body:**
```json
{
  "events": [
    {
      "event": "page_view",
      "properties": {
        "page": "/learn",
        "timestamp": 1704812000000
      }
    },
    {
      "event": "lesson_started",
      "properties": {
        "lessonId": "basic_1",
        "courseId": "DUOLINGO_EN_RU"
      }
    }
  ]
}
```

### **GET** `zombie.duolingo.com/{userId}/web.json`

Session tracking

**Query:**
```
?user={userId}
&ts={timestamp}
&tzoffset=3
```

**Response:**
```json
{
  "active": true,
  "lastSeen": 1704812000000
}
```

## 🔧 Config & Feature Flags API

### **GET** `/2023-05-23/config`

Конфигурация приложения

**Query:**
```
?fields=ageRestrictionLimit,
         clientExperiments,
         featureFlags,
         ipCountry,
         speechHost
```

**Response:**
```json
{
  "ipCountry": "RU",
  "speechHost": "https://speech.duolingo.com",
  "ageRestrictionLimit": 13,
  "clientExperiments": {
    "math_on_web": false,
    "web_bingo_ja_xx": false,
    "path_web_sections_overview": true
  },
  "featureFlags": {
    "super_enabled": true,
    "leaderboards_enabled": true
  }
}
```

### **POST** `/2023-05-23/tracking-status`

Статус tracking (consent)

## 📚 Guidebooks & Attribution API

### **GET** `/2023-05-23/attribution/survey/custom`

Custom survey для attribution

**Query:**
```
?uiLanguage=ru
```

## 🗂️ Words & Vocabulary API

### **GET** `/2017-06-30/words-list/supported-courses`

Список курсов с поддержкой word lists

### **GET** `/api/1/get_language_tokens`

Токены языка для TTS

**Query:**
```
?language=ru
```

## 🌍 Localization API

Строки локализации загружаются статически:

```
https://d35aaqx5ub95lt.cloudfront.net/
  js/strings/
  {language}-{hash}.js
```

Примеры:
- `/js/strings/ru-00606e02.js` - русский
- `/js/strings/en-9ae2a671.js` - английский

## 🔐 Security & Anti-Bot

### reCAPTCHA Enterprise

```javascript
const RECAPTCHA_CONFIG = {
  siteKey: '6LcLOdsjAAAAAFfwGusLLnnn492SOGhsCh-uEAvI',
  endpoint: 'https://www.recaptcha.net/recaptcha/enterprise/...'
};
```

**Endpoints:**
- `POST /recaptcha/enterprise/reload`
- `POST /recaptcha/enterprise/clr`
- `POST /recaptcha/enterprise/bcn`

## 💡 Ключевые наблюдения

### 1. Версионирование
- Использование дат вместо v1, v2, v3
- Поддержка legacy endpoints

### 2. Batch операции
- Analytics отправляется батчами
- Оптимизация network requests

### 3. CDN стратегия
- Статика на CloudFront
- Lesson content отдельно
- Версионирование через хеши

### 4. Поля (fields) query param
- Гибкое получение только нужных данных
- Уменьшение размера ответов

### 5. Tracking
- Множество tracking endpoints
- Session tracking через zombie domain
- Real-time analytics

## 🎯 Применение для bro-learn-web

### API Design Principles:

1. ✅ **Версионирование по дате** `/2026-01-09/*`
2. ✅ **Fields query parameter** для оптимизации
3. ✅ **Batch analytics** endpoint
4. ✅ **CDN для контента** уроков
5. ✅ **Session-based** lessons
6. ✅ **Progress tracking** отдельные endpoints

### Endpoint структура для bro-learn-web:

```
/api/v1/
  /auth/
    POST /register
    POST /login
    POST /logout
  /users/
    GET /:id
    PATCH /:id
    GET /:id/stats
    GET /:id/progress
  /courses/
    GET /
    GET /:id
    GET /:id/sections
  /sessions/
    POST /
    PUT /:id
    GET /:id/results
  /goals/
    GET /daily
    GET /quests
    POST /complete
  /leaderboards/
    GET /:league
    GET /my-position
  /analytics/
    POST /batch
```

---

**Источник**: Chrome DevTools Network Analysis  
**Дата**: 09.01.2026  
**Endpoints**: Production Duolingo API
