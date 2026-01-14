# Product Requirements Document: BroLearn Web

## Executive Summary

**BroLearn Web** — это интерактивное веб-приложение для обучения практическим навыкам работы с современными AI-инструментами и технологиями. Продукт объединяет проверенную методологию геймификации Duolingo с практическими кейсами применения AI в профессиональной деятельности.

Приложение предоставляет структурированный путь обучения через интерактивные уроки, практические задания и систему прогресса, позволяя пользователям освоить:
- Работу с российскими и зарубежными LLM (GigaChat, DeepSeek, Perplexity)
- Использование AI-браузера Comet
- Создание AI-агентов и skills для них
- Разработку MCP (Model Context Protocol) серверов
- Построение RAG (Retrieval-Augmented Generation) систем
- Развертывание локальных LLM
- Продвинутую настройку Cursor.ai для разработки

MVP фокусируется на создании базовой платформы обучения с системой уроков, трекингом прогресса и интерактивными упражнениями, работающей как локальное single-user приложение без необходимости аутентификации.

## Mission

**Миссия продукта:** Сделать освоение современных AI-инструментов доступным каждому разработчику и профессионалу, превращая сложные технологии в увлекательный и практичный опыт обучения.

### Основные принципы

1. **Learning by Doing** — каждая концепция закрепляется практическими упражнениями с реальными инструментами
2. **Gamification First** — обучение должно быть увлекательным и мотивирующим, как в Duolingo
3. **Real-World Focus** — все примеры основаны на реальных задачах разработки и работы с AI
4. **Progressive Complexity** — от базовых концепций (промптинг) к продвинутым (создание MCP серверов)
5. **Local & Private** — обучение происходит локально, работа с собственными инструментами
6. **Hands-On Practice** — акцент на практическое применение, а не теорию

## Target Users

### Основная целевая аудитория

**Разработчики и технические специалисты**, стремящиеся освоить современные AI-инструменты:

- **Frontend/Backend разработчики**, желающие использовать AI в разработке (Cursor.ai, GitHub Copilot)
- **DevOps и системные администраторы**, автоматизирующие задачи с помощью AI
- **Data Scientists и ML-инженеры**, работающие с локальными LLM и RAG
- **Tech Lead и архитекторы**, интегрирующие AI-агенты в продукты
- **Студенты технических специальностей**, изучающие современный AI-стек

### Технический уровень

- **Базовые навыки программирования** (Python, JavaScript)
- **Опыт работы с командной строкой** и Git
- **Понимание концепций API** и веб-технологий
- **Желателен опыт** использования ChatGPT, Claude или аналогов
- **Для продвинутых модулей**: опыт с Docker, Node.js, понимание архитектуры приложений

### Ключевые потребности пользователей

1. **Практические навыки** — конкретные инструменты для работы (GigaChat, Cursor.ai, MCP)
2. **Структурированное обучение** — от базовых промптов до создания AI-агентов
3. **Hands-on опыт** — реальная работа с инструментами, а не только теория
4. **Быстрая обратная связь** — проверка кода, промптов, конфигураций
5. **Применимость в работе** — навыки, которые можно использовать уже завтра
6. **Отслеживание прогресса** — визуализация освоенных технологий

## MVP Scope

### ✅ In Scope - Core Functionality

**Обучающий контент:**
- ✅ Минимум 5 базовых модулей обучения:
  1. **Основы промптинга** — работа с GigaChat, DeepSeek, Perplexity
  2. **AI-браузер Comet** — эффективный поиск и работа с информацией
  3. **Cursor.ai Setup** — настройка и использование AI для разработки
  4. **AI-агенты Basics** — создание простых агентов и skills
  5. **MCP Introduction** — базовые концепции Model Context Protocol
- ✅ 4-6 уроков в каждом модуле
- ✅ Интерактивные упражнения с автоматической проверкой
- ✅ Практические задания с реальными инструментами
- ✅ Код-примеры и конфигурации
- ✅ Система подсказок (hints) для сложных заданий

**Система прогресса:**
- ✅ Трекинг завершенных уроков и упражнений
- ✅ Система очков опыта (XP)
- ✅ Базовые достижения (badges) за прохождение модулей
- ✅ Визуализация прогресса по модулям
- ✅ Streak counter (дни подряд обучения)

**Интерфейс:**
- ✅ Главная страница (dashboard) с обзором прогресса
- ✅ Навигация по модулям и урокам
- ✅ Интерактивная область для выполнения упражнений
- ✅ Адаптивный дизайн (desktop + mobile)
- ✅ Темная/светлая тема

**Типы упражнений:**
- ✅ Multiple choice questions (выбор правильного подхода/инструмента)
- ✅ Оценка качества промптов (rating)
- ✅ Исправление/улучшение промптов для разных LLM
- ✅ Сопоставление концепций (matching инструментов и задач)
- ✅ Код-упражнения (написание конфигураций, MCP серверов)
- ✅ Практические задания (настройка Cursor.ai, создание агента)
- ✅ Короткие текстовые ответы с keyword validation

### ✅ Technical Core

- ✅ React 19+ фронтенд с TypeScript
- ✅ Chakra UI v3 для компонентов
- ✅ Express.js backend для API
- ✅ MongoDB для хранения прогресса и контента
- ✅ Docker контейнеризация для легкого запуска
- ✅ Локальное хранилище данных пользователя
- ✅ Hot module replacement для разработки

### ✅ Data & State Management

- ✅ RTK Query для работы с API
- ✅ Локальное кеширование прогресса
- ✅ Базовая система миграций для обновления схемы данных

### ❌ Out of Scope - Future Features

**Функциональность:**
- ❌ Мультипользовательский режим
- ❌ Система аутентификации и авторизации
- ❌ Социальные функции (friends, leaderboards, comments)
- ❌ Интеграция с реальными LLM API для live testing (в MVP - примеры ответов)
- ❌ Пользовательский контент (создание своих уроков)
- ❌ Система сертификатов и дипломов
- ❌ Видео-контент и интерактивные туториалы
- ❌ Продвинутая аналитика обучения
- ❌ Автоматическая проверка работоспособности созданных MCP серверов
- ❌ Sandbox для запуска локальных LLM

**Технические:**
- ❌ Cloud deployment
- ❌ CI/CD pipeline для автоматического деплоя
- ❌ Интернационализация (i18next интеграция в MVP откладывается)
- ❌ Офлайн режим (PWA)
- ❌ Бэкапы и синхронизация между устройствами
- ❌ Развернутая система логирования и мониторинга
- ❌ Файлы с примерами, инструкции, summary, reports, checklists
- ❌ Создание файлов в корне проекта (кроме конфигурационных)

**Интеграции:**
- ❌ Интеграция с LMS системами
- ❌ OAuth провайдеры
- ❌ Экспорт прогресса в другие платформы
- ❌ Webhook уведомления

**Контент:**
- ❌ Продвинутые модули (Advanced RAG, Fine-tuning, Complex Multi-Agent Systems)
- ❌ Специализированные треки (по языкам программирования/фреймворкам)
- ❌ Интерактивные проекты (capstone projects: полноценный AI-агент с MCP)
- ❌ Глубокое погружение в локальные LLM (Ollama, LM Studio, vLLM)

## User Stories

### Основные пользовательские истории

**US-1: Начать обучение с нуля**
- **Как** разработчик, не знакомый с AI-инструментами
- **Я хочу** увидеть понятный стартовый экран с обзором доступных модулей и рекомендуемым путем обучения
- **Чтобы** быстро понять, какие навыки я получу и с чего начать

*Пример:* Пользователь запускает приложение первый раз, видит welcome screen с описанием 5 модулей (от промптинга до MCP), рекомендацией "Начните с основ промптинга" и кнопкой "Start Learning", которая ведет к первому уроку "Знакомство с GigaChat".

**US-2: Проходить практические уроки**
- **Как** обучающийся
- **Я хочу** не только читать теорию, но и сразу практиковаться с реальными инструментами
- **Чтобы** получить hands-on опыт, который смогу применить в работе

*Пример:* В уроке "Настройка Cursor.ai" пользователь читает о ключевых параметрах, затем выполняет упражнения: выбирает правильную конфигурацию для проекта, исправляет ошибки в settings.json, составляет эффективный промпт для генерации кода.

**US-3: Получать немедленную обратную связь**
- **Как** обучающийся
- **Я хочу** мгновенно видеть правильность своих ответов с объяснениями и примерами
- **Чтобы** понимать свои ошибки и учиться на них

*Пример:* После отправки кода MCP сервера, система проверяет синтаксис и показывает: "✅ Правильно! Вы корректно определили tool schema. Обратите внимание: параметр 'required' должен быть массивом строк." + показывает правильный пример кода.

**US-4: Отслеживать свой прогресс**
- **Как** обучающийся
- **Я хочу** видеть какие навыки освоены, сколько XP заработано и какие инструменты изучены
- **Чтобы** оставаться мотивированным и понимать свой путь развития

*Пример:* На dashboard отображается: "Module 1: Промптинг ✅ (100%)", "Module 2: Comet Browser 🔄 (60%)", "Total XP: 1,250", "5-day streak 🔥", "Badges: GigaChat Master, MCP Beginner".

**US-5: Возвращаться к обучению**
- **Как** вернувшийся пользователь
- **Я хочу** быстро продолжить с того места, где остановился
- **Чтобы** не тратить время на поиск следующего урока

*Пример:* Пользователь открывает приложение через 2 дня, dashboard показывает "Continue where you left off: Module 3 - Lesson 2: Создание первого AI-агента" с кнопкой "Continue Learning" и напоминанием о streak.

**US-6: Использовать подсказки**
- **Как** обучающийся, застрявший на сложном упражнении
- **Я хочу** получить подсказку без полного раскрытия ответа
- **Чтобы** самостоятельно найти решение с небольшой помощью

*Пример:* В упражнении на создание MCP сервера пользователь нажимает "Hint", система показывает: "Проверьте структуру tool definition. Не забудьте указать inputSchema с типами параметров. Посмотрите на пример в документации."

**US-7: Практиковаться с реальными инструментами**
- **Как** разработчик
- **Я хочу** видеть примеры работы с реальными инструментами (GigaChat, Cursor.ai, MCP)
- **Чтобы** понимать, как применять полученные знания в реальных проектах

*Пример:* В уроке "GigaChat API" пользователь видит реальные примеры запросов, ответов, обработки ошибок, и выполняет упражнение на составление правильного API call с нужными параметрами.

**US-8: Навигация по модулям**
- **Как** обучающийся
- **Я хочу** легко перемещаться между модулями, уроками и упражнениями
- **Чтобы** изучать материал в удобном для меня порядке (с учетом unlock requirements)

*Пример:* В sidebar отображается дерево модулей: "1. Промптинг ✓", "2. Comet 🔄", "3. Cursor.ai 🔒", "4. AI-агенты 🔒", "5. MCP 🔒". Текущий урок выделен, locked модули доступны после завершения предыдущих.

**US-9: Адаптация под устройство**
- **Как** пользователь desktop
- **Я хочу** комфортно работать с кодом и конфигурациями на большом экране
- **Чтобы** эффективно выполнять практические задания

*Пример:* На desktop отображается split view: слева теория и задание, справа код-редактор для выполнения упражнения. Есть возможность копировать код, запускать проверку синтаксиса.

## Core Architecture & Patterns

### Высокоуровневая архитектура

**Монолитное приложение с четким разделением слоев:**

```
┌─────────────────────────────────────┐
│     React Frontend (Port 8099)      │
│  - Chakra UI Components             │
│  - RTK Query State Management       │
│  - React Router Navigation          │
└────────────┬────────────────────────┘
             │ HTTP/REST
             │
┌────────────▼────────────────────────┐
│      Express.js Backend API         │
│  - RESTful Endpoints                │
│  - Business Logic                   │
│  - Validation Layer                 │
└────────────┬────────────────────────┘
             │ MongoDB Driver
             │
┌────────────▼────────────────────────┐
│        MongoDB Database             │
│  - User Progress                    │
│  - Learning Content                 │
│  - Achievements & Stats             │
└─────────────────────────────────────┘
```

### Directory Structure

```
bro-learn-web/
├── src/                          # Frontend source
│   ├── __data__/                 # Static data & URLs
│   ├── app.tsx                   # App root component
│   ├── dashboard.tsx             # Main dashboard router
│   ├── index.tsx                 # Entry point
│   ├── theme.tsx                 # Chakra UI theme config
│   ├── components/               # Reusable UI components
│   │   ├── common/               # Generic components (Button, Card, etc.)
│   │   ├── layout/               # Layout components (Header, Sidebar, Footer)
│   │   └── exercises/            # Exercise-specific components
│   ├── pages/                    # Route pages
│   │   ├── main/                 # Main dashboard page
│   │   ├── module/               # Module overview page
│   │   ├── lesson/               # Lesson content page
│   │   └── exercise/             # Exercise interaction page
│   ├── features/                 # Feature-based slices
│   │   ├── progress/             # Progress tracking logic
│   │   ├── lessons/              # Lesson management
│   │   └── achievements/         # Achievements system
│   ├── api/                      # RTK Query API definitions
│   ├── hooks/                    # Custom React hooks
│   ├── utils/                    # Helper functions
│   └── types/                    # TypeScript type definitions
│
├── server/                       # Backend source
│   ├── index.js                  # Server entry point
│   ├── routes/                   # Express routes
│   │   ├── modules.js            # Modules endpoints
│   │   ├── lessons.js            # Lessons endpoints
│   │   ├── progress.js           # User progress endpoints
│   │   └── achievements.js       # Achievements endpoints
│   ├── controllers/              # Request handlers
│   ├── services/                 # Business logic
│   ├── models/                   # MongoDB schema definitions
│   ├── middleware/               # Express middleware
│   ├── utils/                    # Helper utilities
│   └── validation/               # Input validation schemas
│
├── content/                      # Learning content (JSON/MD)
│   ├── modules/                  # Module definitions
│   ├── lessons/                  # Lesson content
│   └── exercises/                # Exercise definitions
│
├── stubs/                        # Development stubs/mocks
│   └── api/                      # Mock API responses
│
├── docker/                       # Docker configuration
│   ├── Dockerfile                # App container
│   └── docker-compose.yml        # Multi-container setup
│
├── scripts/                      # Utility scripts
│   ├── seed-content.js           # Load initial content to DB
│   └── reset-progress.js         # Reset user progress (dev)
│
└── tests/                        # Test files
    ├── unit/                     # Unit tests
    └── e2e/                      # Playwright E2E tests
```

### Key Design Patterns

**Frontend Patterns:**

1. **Feature-Sliced Design** — организация кода по features с изолированной логикой
2. **Container/Presenter Pattern** — разделение логики (containers) и UI (presenters)
3. **Custom Hooks** — переиспользуемая логика (useProgress, useLesson, useExercise)
4. **RTK Query** — автоматический кеш, invalidation, оптимистичные обновления

**Backend Patterns:**

1. **MVC-like Structure** — routes → controllers → services → models
2. **Repository Pattern** — абстракция работы с MongoDB через dedicated слой
3. **Validation Middleware** — централизованная валидация входящих данных
4. **Error Handling Middleware** — единая обработка ошибок с правильными HTTP статусами

**Data Flow:**

```
User Interaction → React Component → RTK Query Hook → API Call
                                          ↓
                                    Express Route → Controller → Service → MongoDB
                                          ↓
                                  Response ← Cache ← RTK Query ← Component Update
```

### Technology-Specific Patterns

**React Patterns:**
- Composition over inheritance для компонентов
- Render props для сложных UI паттернов (drag-and-drop)
- Error boundaries для graceful error handling
- Suspense для lazy loading страниц

**MongoDB Patterns:**
- Embedded documents для lesson content (избегаем joins)
- Indexed fields для быстрого поиска (userId, moduleId, lessonId)
- Atomic operations для прогресса (increment XP, add achievements)
- Denormalization для frequently accessed data

**State Management:**
- **Server State** (RTK Query): все данные с backend (content, progress)
- **UI State** (React State): локальное состояние компонентов (modals, forms)
- **Router State** (React Router): текущая страница, query params
- **Derived State** (selectors): calculated values (percentage complete, next lesson)

## Learning Content System

### Module Structure

**Module** — группа связанных уроков по одной AI-технологии или инструменту:

```typescript
interface Module {
  id: string
  title: string
  description: string
  icon: string
  order: number
  estimatedHours: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tools: string[] // ['gigachat', 'cursor', 'mcp']
  lessons: Lesson[]
  prerequisites: string[] // module IDs
}
```

### MVP Modules

**Module 1: Основы промптинга**
- Работа с GigaChat, DeepSeek, Perplexity
- Структура эффективных промптов
- Сравнение моделей
- Практические кейсы

**Module 2: AI-браузер Comet**
- Установка и настройка
- Эффективный поиск с AI
- Работа с источниками
- Интеграция в workflow

**Module 3: Cursor.ai для разработки**
- Установка и первичная настройка
- Работа с AI-ассистентом
- Продвинутые настройки
- Best practices

**Module 4: Создание AI-агентов**
- Концепция агентов
- Создание простого агента
- Skills для агентов
- Тестирование и отладка

**Module 5: MCP (Model Context Protocol)**
- Что такое MCP
- Структура MCP сервера
- Создание первого MCP сервера
- Интеграция с приложениями

**Lesson** — единица обучающего контента:

```typescript
interface Lesson {
  id: string
  moduleId: string
  title: string
  order: number
  content: LessonContent
  exercises: Exercise[]
  xpReward: number
  estimatedMinutes: number
  practicalTask?: PracticalTask
}

interface LessonContent {
  type: 'markdown' | 'interactive' | 'code-tutorial'
  sections: ContentSection[]
}

interface ContentSection {
  heading: string
  body: string
  codeExamples?: CodeExample[] // примеры кода, конфигураций
  screenshots?: Screenshot[] // скриншоты интерфейсов
  callouts?: Callout[] // tips, warnings, notes, best practices
}

interface CodeExample {
  language: 'javascript' | 'typescript' | 'python' | 'json' | 'bash'
  code: string
  description: string
  filename?: string
}

interface PracticalTask {
  description: string
  steps: string[]
  expectedResult: string
  hints: string[]
}
```

**Exercise** — интерактивное задание:

```typescript
interface Exercise {
  id: string
  lessonId: string
  type: 'multiple-choice' | 'prompt-rating' | 'prompt-fix' | 'matching' | 'text-input' | 'code-exercise' | 'config-fix'
  question: string
  instructions?: string
  hints: string[]
  validation: ValidationRule
  xpReward: number
  explanation: string // показывается после ответа
}
```

### Exercise Types Implementation

**1. Multiple Choice** (выбор инструмента/подхода)
```typescript
interface MultipleChoiceExercise extends Exercise {
  type: 'multiple-choice'
  options: {
    id: string
    text: string
    isCorrect: boolean
    explanation?: string // почему правильно/неправильно
  }[]
  allowMultiple: boolean
  context?: string // контекст задачи
}
```

**2. Prompt Rating** (оценка качества промптов)
```typescript
interface PromptRatingExercise extends Exercise {
  type: 'prompt-rating'
  prompts: {
    id: string
    text: string
    model: 'gigachat' | 'deepseek' | 'perplexity' | 'generic'
    expectedRating: 1 | 2 | 3 | 4 | 5
    issues: string[] // что не так с этим промптом
    improvements: string[] // как можно улучшить
  }[]
  criteria: string[] // по каким критериям оценивать
}
```

**3. Prompt Fix** (исправление промптов)
```typescript
interface PromptFixExercise extends Exercise {
  type: 'prompt-fix'
  originalPrompt: string
  targetModel: 'gigachat' | 'deepseek' | 'perplexity'
  issues: string[] // список проблем (для подсказок)
  keywords: string[] // ключевые слова, которые должны быть в улучшенном варианте
  minimumLength: number
  bestPractices: string[] // какие best practices применить
}
```

**4. Matching** (сопоставление инструментов и задач)
```typescript
interface MatchingExercise extends Exercise {
  type: 'matching'
  leftColumn: { id: string; text: string; icon?: string }[]
  rightColumn: { id: string; text: string }[]
  correctPairs: { leftId: string; rightId: string }[]
  category: 'tools' | 'concepts' | 'use-cases'
}
```

**5. Text Input** (короткие ответы)
```typescript
interface TextInputExercise extends Exercise {
  type: 'text-input'
  expectedKeywords: string[]
  minimumKeywords: number
  caseSensitive: boolean
  placeholder?: string
}
```

**6. Code Exercise** (написание кода)
```typescript
interface CodeExercise extends Exercise {
  type: 'code-exercise'
  language: 'javascript' | 'typescript' | 'python' | 'json'
  starterCode?: string
  expectedPatterns: string[] // regex patterns для проверки
  syntaxCheck: boolean
  testCases?: TestCase[]
}

interface TestCase {
  input: any
  expectedOutput: any
  description: string
}
```

**7. Config Fix** (исправление конфигураций)
```typescript
interface ConfigFixExercise extends Exercise {
  type: 'config-fix'
  configType: 'cursor-settings' | 'mcp-server' | 'agent-config'
  brokenConfig: string
  issues: string[] // что не так
  requiredFields: string[]
  validationSchema: object
}
```

## Progress & Gamification System

### Progress Tracking

**UserProgress Model:**
```typescript
interface UserProgress {
  userId: string // в MVP всегда "default-user"
  completedLessons: {
    lessonId: string
    completedAt: Date
    score: number // 0-100
    attempts: number
  }[]
  completedExercises: {
    exerciseId: string
    completedAt: Date
    isCorrect: boolean
    attempts: number
  }[]
  totalXP: number
  currentStreak: number
  longestStreak: number
  lastActivityDate: Date
  achievements: Achievement[]
}
```

### XP System

**XP Sources:**
- Завершение урока: 50-200 XP (зависит от сложности)
- Правильный ответ на упражнение: 10-30 XP
- Завершение модуля: 300-500 XP (bonus)
- Streak bonus: +5% XP за 3+ дня подряд
- Perfect score (100%): +20% XP к награде за урок

**XP Calculations:**
```typescript
function calculateLessonXP(lesson: Lesson, attempts: number): number {
  const baseXP = lesson.xpReward
  const attemptPenalty = Math.max(0, (attempts - 1) * 0.1) // -10% за каждую дополнительную попытку
  return Math.floor(baseXP * (1 - attemptPenalty))
}
```

### Achievements System

**Achievement Categories:**

1. **Progress Achievements** — за завершение контента
   - "First Steps" — завершить первый урок
   - "Module Master" — завершить любой модуль на 100%
   - "Prompt Ninja" — завершить модуль "Основы промптинга"
   - "Comet Explorer" — завершить модуль "AI-браузер Comet"
   - "Cursor Pro" — завершить модуль "Cursor.ai"
   - "Agent Builder" — завершить модуль "AI-агенты"
   - "MCP Developer" — завершить модуль "MCP"
   - "AI Master" — завершить все 5 MVP модулей

2. **Streak Achievements** — за регулярность
   - "Consistent Learner" — 3 дня подряд
   - "Dedicated Student" — 7 дней подряд
   - "On Fire" — 14 дней подряд
   - "Unstoppable" — 30 дней подряд

3. **Performance Achievements** — за качество
   - "Perfectionist" — 100% score на 5 уроках
   - "Fast Learner" — завершить урок с первой попытки на всех упражнениях
   - "XP Hunter" — набрать 1000 XP
   - "Code Master" — выполнить 10 code exercises идеально

4. **Tool Mastery** — за освоение инструментов
   - "GigaChat Expert" — освоить все уроки по GigaChat
   - "DeepSeek Specialist" — освоить DeepSeek
   - "MCP Creator" — создать первый MCP сервер
   - "Agent Architect" — создать первого AI-агента

**Achievement Definition:**
```typescript
interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: 'progress' | 'streak' | 'performance'
  condition: AchievementCondition
  xpBonus: number
  unlockedAt?: Date
}
```

### Visualization Components

**Progress Dashboard:**
- Circular progress rings для каждого модуля
- XP bar с текущим уровнем и прогрессом до следующего
- Streak counter с flame animation
- Recent achievements carousel
- "Continue Learning" CTA с preview следующего урока

**Module Overview:**
- Lesson list с статусами (completed ✓, in progress, locked 🔒)
- Overall module progress bar
- Estimated time remaining
- Module-specific achievements

## Technology Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19+ | UI framework |
| **TypeScript** | Latest | Type safety |
| **Chakra UI** | 3.2.0+ | Component library |
| **Emotion** | 11.13.5+ | CSS-in-JS (Chakra dependency) |
| **React Router** | 6.23.1+ | Client-side routing |
| **RTK Query** | Latest (@reduxjs/toolkit) | Data fetching & caching |
| **Redux Toolkit** | Latest | State management |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 22.21+ | Runtime |
| **Express** | 4.19.2+ | Web framework |
| **MongoDB** | 7+ | Database |
| **MongoDB Node Driver** | Latest | Database client |

### Build & Development Tools

| Technology | Version | Purpose |
|------------|---------|---------|
| **@brojs/cli** | 2.0.0+ | Build system & dev server |
| **Webpack** | (via brojs) | Module bundler |
| **ESLint** | 9.11.0+ | Linting |
| **TypeScript ESLint** | 8.6.0+ | TypeScript linting |
| **Prettier** | Latest | Code formatting |

### Optional Dependencies (Future)

- **i18next** — интернационализация (post-MVP)
- **Lottie** — анимации для achievements
- **date-fns** — работа с датами (streak calculations)
- **recharts** — визуализация прогресса (charts)

### Development & Testing

| Technology | Version | Purpose |
|------------|---------|---------|
| **Jest** | Latest | Unit testing |
| **Playwright** | Latest | E2E testing |
| **Docker** | Latest | Containerization |
| **Docker Compose** | Latest | Multi-container orchestration |

### Third-Party Integrations

**MVP: None** — все работает локально без внешних зависимостей.

**Post-MVP Considerations:**
- OpenAI API — для live validation промптов
- Analytics tools — для tracking user behavior (optional, privacy-focused)

## Security & Configuration

### Authentication & Authorization

**MVP Approach: No Authentication**

- Single-user локальное приложение
- Данные хранятся для "default-user"
- No password, no login flow
- Access control: N/A (одна роль — user)

**Security Implications:**
- ✅ Подходит для локального использования
- ✅ Не требует защиты персональных данных
- ❌ Не подходит для multi-user deployment
- ❌ Прогресс не защищен от изменений

### Configuration Management

**Environment Variables:**

```bash
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/brolearn
MONGODB_DATABASE=brolearn

# Frontend Dev Server
DEV_PORT=8099
API_BASE_URL=http://localhost:3000/api

# Feature Flags (future)
ENABLE_ADVANCED_MODULES=false
ENABLE_LOTTIE_ANIMATIONS=true
```

**Configuration Loading:**
- `.env` file для локальной разработки
- Environment variables в Docker контейнерах
- `bro.config.js` для @brojs/cli настроек (navigation, features, webpack)

### Security Scope

**✅ In Scope:**
- Input validation для всех API endpoints
- Sanitization пользовательского текста (XSS prevention)
- MongoDB injection protection (parameterized queries)
- CORS configuration для development
- Basic error handling без раскрытия stack traces

**❌ Out of Scope:**
- Rate limiting (одиночный пользователь)
- JWT/session management
- HTTPS enforcement (локальное приложение)
- SQL injection (используем MongoDB)
- CSRF protection (no authentication)
- Password hashing

### Deployment Considerations

**MVP Deployment: Docker Compose**

```yaml
# docker-compose.yml
version: '3.8'
services:
  mongodb:
    image: mongo:7
    volumes:
      - brolearn_data:/data/db
    ports:
      - "27017:27017"
  
  backend:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - mongodb
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/brolearn
  
  frontend:
    build: .
    ports:
      - "8099:8099"
    depends_on:
      - backend
```

**Installation Steps:**
1. Install Docker & Docker Compose
2. Clone repository
3. Run `docker-compose up`
4. Open `http://localhost:8099`

**Data Persistence:**
- MongoDB data в Docker volume `brolearn_data`
- Content loaded при первом запуске (seed script)
- Progress автоматически сохраняется в MongoDB

## API Specification

### Base URL

```
http://localhost:3000/api
```

### Content Endpoints

#### GET /modules

Получить список всех модулей.

**Response:**
```json
{
  "modules": [
    {
      "id": "prompting-basics",
      "title": "Основы промптинга",
      "description": "Работа с GigaChat, DeepSeek, Perplexity",
      "icon": "message-square",
      "order": 1,
      "difficulty": "beginner",
      "estimatedHours": 3,
      "lessonsCount": 6,
      "tools": ["gigachat", "deepseek", "perplexity"],
      "prerequisites": [],
      "isCompleted": false,
      "progress": 0
    },
    {
      "id": "comet-browser",
      "title": "AI-браузер Comet",
      "description": "Эффективный поиск и работа с информацией",
      "icon": "globe",
      "order": 2,
      "difficulty": "beginner",
      "estimatedHours": 2,
      "lessonsCount": 4,
      "tools": ["comet"],
      "prerequisites": ["prompting-basics"],
      "isCompleted": false,
      "progress": 0,
      "isLocked": true
    }
  ]
}
```

#### GET /modules/:moduleId

Получить детальную информацию о модуле с уроками.

**Response:**
```json
{
  "module": {
    "id": "intro-to-llm",
    "title": "Introduction to LLM",
    "description": "...",
    "lessons": [
      {
        "id": "lesson-1",
        "title": "What is an LLM?",
        "order": 1,
        "estimatedMinutes": 15,
        "xpReward": 100,
        "isCompleted": false,
        "isLocked": false
      }
    ]
  }
}
```

#### GET /lessons/:lessonId

Получить содержимое урока.

**Response:**
```json
{
  "lesson": {
    "id": "lesson-gigachat-intro",
    "moduleId": "prompting-basics",
    "title": "Знакомство с GigaChat",
    "estimatedMinutes": 15,
    "content": {
      "type": "code-tutorial",
      "sections": [
        {
          "heading": "Что такое GigaChat",
          "body": "GigaChat — российская языковая модель от Сбера...",
          "codeExamples": [
            {
              "language": "python",
              "code": "from gigachat import GigaChat\n\nclient = GigaChat(credentials='...')",
              "description": "Инициализация клиента GigaChat",
              "filename": "gigachat_init.py"
            }
          ],
          "callouts": [
            {
              "type": "tip",
              "content": "GigaChat поддерживает русский язык лучше западных моделей"
            }
          ]
        }
      ]
    },
    "exercises": ["exercise-1", "exercise-2", "exercise-3"],
    "practicalTask": {
      "description": "Создайте первый запрос к GigaChat",
      "steps": [
        "Получите API ключ",
        "Инициализируйте клиент",
        "Отправьте простой промпт"
      ],
      "expectedResult": "Успешный ответ от модели",
      "hints": ["Проверьте формат API ключа", "Используйте синхронный клиент"]
    }
  }
}
```

#### GET /exercises/:exerciseId

Получить данные упражнения.

**Response (Multiple Choice):**
```json
{
  "exercise": {
    "id": "exercise-gigachat-1",
    "lessonId": "lesson-gigachat-intro",
    "type": "multiple-choice",
    "question": "Какой инструмент лучше использовать для работы с русскоязычным контентом?",
    "instructions": "Выберите наиболее подходящий вариант.",
    "context": "Вам нужно создать маркетинговый текст на русском языке для российской аудитории.",
    "options": [
      { 
        "id": "a", 
        "text": "GigaChat",
        "explanation": "Правильно! GigaChat оптимизирован для русского языка"
      },
      { 
        "id": "b", 
        "text": "GPT-4",
        "explanation": "GPT-4 хорош, но GigaChat лучше понимает русский контекст"
      }
    ],
    "hints": ["Подумайте о языковой специфике", "Какая модель создана для русского языка?"],
    "xpReward": 10
  }
}
```

**Response (Code Exercise):**
```json
{
  "exercise": {
    "id": "exercise-mcp-1",
    "lessonId": "lesson-mcp-basics",
    "type": "code-exercise",
    "question": "Создайте базовую структуру MCP сервера",
    "instructions": "Напишите код, который определяет MCP сервер с одним инструментом.",
    "language": "typescript",
    "starterCode": "import { Server } from '@modelcontextprotocol/sdk';\n\n// Ваш код здесь",
    "expectedPatterns": [
      "new Server",
      "addTool",
      "inputSchema"
    ],
    "syntaxCheck": true,
    "hints": [
      "Используйте метод addTool для добавления инструмента",
      "Не забудьте определить inputSchema"
    ],
    "xpReward": 20
  }
}
```

### Progress Endpoints

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
    "lastActivityDate": "2026-01-09T10:30:00Z",
    "completedLessons": [
      {
        "lessonId": "lesson-1",
        "completedAt": "2026-01-08T15:20:00Z",
        "score": 100,
        "attempts": 1
      }
    ],
    "achievements": [
      {
        "id": "first-steps",
        "unlockedAt": "2026-01-08T15:20:00Z"
      }
    ]
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
      "id": "module-master",
      "title": "Module Master",
      "xpBonus": 50
    }
  ],
  "streakUpdated": {
    "currentStreak": 6,
    "isNewRecord": false
  }
}
```

#### POST /progress/exercises/:exerciseId/submit

Проверить ответ на упражнение.

**Request Body (Multiple Choice):**
```json
{
  "type": "multiple-choice",
  "selectedOptions": ["a"]
}
```

**Request Body (Code Exercise):**
```json
{
  "type": "code-exercise",
  "code": "import { Server } from '@modelcontextprotocol/sdk';\n\nconst server = new Server();\nserver.addTool(...);"
}
```

**Request Body (Prompt Fix):**
```json
{
  "type": "prompt-fix",
  "improvedPrompt": "Ты — эксперт по маркетингу. Создай продающий текст для российской аудитории...",
  "targetModel": "gigachat"
}
```

**Response (Success):**
```json
{
  "isCorrect": true,
  "xpEarned": 10,
  "explanation": "Отлично! Вы правильно выбрали GigaChat для работы с русскоязычным контентом.",
  "feedback": {
    "correctParts": ["выбор модели", "учет языковой специфики"],
    "improvements": [],
    "bestPractices": ["GigaChat лучше понимает русский контекст и культурные особенности"]
  },
  "nextExercise": "exercise-2"
}
```

**Response (Code Exercise - Partial):**
```json
{
  "isCorrect": false,
  "xpEarned": 5,
  "explanation": "Код почти правильный, но есть ошибки в синтаксисе.",
  "feedback": {
    "syntaxErrors": [
      {
        "line": 4,
        "message": "Missing inputSchema definition",
        "hint": "Добавьте inputSchema с описанием параметров"
      }
    ],
    "correctParts": ["инициализация сервера", "вызов addTool"],
    "improvements": ["добавьте inputSchema", "определите тип возвращаемого значения"]
  },
  "allowRetry": true,
  "attemptsLeft": 2
}
```

### Achievements Endpoints

#### GET /achievements

Получить все доступные achievements.

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
      "id": "prompt-ninja",
      "title": "Prompt Ninja",
      "description": "Завершите модуль 'Основы промптинга'",
      "icon": "zap",
      "category": "progress",
      "xpBonus": 100,
      "isUnlocked": false,
      "progress": 3,
      "total": 6
    },
    {
      "id": "gigachat-expert",
      "title": "GigaChat Expert",
      "description": "Освойте все уроки по GigaChat",
      "icon": "message-circle",
      "category": "tool-mastery",
      "xpBonus": 50,
      "tool": "gigachat",
      "isUnlocked": false
    },
    {
      "id": "mcp-creator",
      "title": "MCP Creator",
      "description": "Создайте первый MCP сервер",
      "icon": "code",
      "category": "tool-mastery",
      "xpBonus": 150,
      "tool": "mcp",
      "isUnlocked": false,
      "isLocked": true,
      "unlockRequirement": "Завершите модуль 'MCP Introduction'"
    }
  ]
}
```

### Statistics Endpoints

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
        "moduleId": "intro-to-llm",
        "completed": 7,
        "total": 7,
        "percentage": 100
      }
    ]
  }
}
```

### Error Responses

**Standard Error Format:**
```json
{
  "error": {
    "code": "LESSON_NOT_FOUND",
    "message": "Lesson with id 'invalid-id' not found",
    "statusCode": 404
  }
}
```

**Common Status Codes:**
- `200` — Success
- `400` — Bad Request (validation error)
- `404` — Not Found
- `422` — Unprocessable Entity (exercise validation failed)
- `500` — Internal Server Error

## Success Criteria

### MVP Success Definition

MVP считается успешным, если пользователь может:
1. **Начать обучение** с нуля без технических препятствий
2. **Пройти полный цикл** от первого урока до завершения модуля
3. **Видеть свой прогресс** в реальном времени
4. **Получать удовольствие** от геймифицированного опыта

### Functional Requirements

**✅ Content Delivery:**
- ✅ Все 3 MVP модуля загружены и доступны
- ✅ Уроки отображаются с правильным форматированием
- ✅ Упражнения работают для всех 5 типов
- ✅ Hints показываются корректно

**✅ Exercise Validation:**
- ✅ Multiple choice — валидация правильных ответов
- ✅ Prompt rating — проверка соответствия expectedRating (±1)
- ✅ Prompt fix — keyword matching с минимум 70% совпадений
- ✅ Matching — проверка всех пар
- ✅ Text input — keyword presence validation

**✅ Progress Tracking:**
- ✅ Завершенные уроки помечаются как completed
- ✅ XP начисляется корректно с учетом attempts
- ✅ Streak обновляется при ежедневной активности
- ✅ Achievements unlock при выполнении условий

**✅ User Experience:**
- ✅ Navigation работает плавно без перезагрузок
- ✅ Responsive design на desktop (1920x1080) и mobile (375x667)
- ✅ Loading states для всех async операций
- ✅ Error messages понятны пользователю

**✅ Performance:**
- ✅ Первая загрузка < 3 секунд
- ✅ Переход между уроками < 500ms
- ✅ Проверка упражнения < 200ms

**✅ Data Persistence:**
- ✅ Прогресс сохраняется в MongoDB
- ✅ Прогресс восстанавливается после перезапуска
- ✅ Данные не теряются при ошибках

### Quality Indicators

**Code Quality:**
- TypeScript strict mode без errors
- ESLint passing без warnings
- Consistent code style (Prettier formatted)
- Minimum 50% test coverage для critical paths

**UX Quality:**
- Intuitive navigation (пользователь находит нужное без инструкций)
- Clear feedback на все действия
- No broken states (stuck на странице, невозможно продолжить)
- Accessible (keyboard navigation, ARIA labels)

**Content Quality:**
- Каждый урок имеет clear learning objective
- Examples релевантны и понятны
- Упражнения соответствуют материалу урока
- Explanations помогают понять ошибки

### User Experience Goals

1. **First Session Success:** 90% новых пользователей завершают первый урок
2. **Engagement:** Средний пользователь проходит 3+ урока за session
3. **Retention:** Пользователь возвращается на второй день (streak = 2)
4. **Completion:** 30% пользователей завершают первый модуль полностью
5. **Satisfaction:** Positive feedback на геймификацию (subjective)

## Implementation Phases

### Phase 1: Foundation (Week 1-2)

**Goal:** Создать базовую инфраструктуру и первый working end-to-end flow.

**Deliverables:**
- ✅ Backend: Express сервер с базовыми routes
- ✅ Database: MongoDB схемы для modules, lessons, exercises, progress
- ✅ Frontend: React router setup, основные layouts (Header, Sidebar, Main)
- ✅ Docker: MongoDB в контейнере, MCP tools настроены
- ✅ API: GET modules, GET lessons, GET exercises endpoints
- ✅ UI: Dashboard page с модулями в стиле Duolingo
- ✅ Content: 1 полноценный урок "Знакомство с GigaChat" с 4 упражнениями
- ✅ Code Editor: Базовый компонент для code exercises

**Validation Criteria:**
- `npm start` запускает приложение без ошибок
- Можно открыть dashboard и увидеть 5 модулей (1 unlocked, 4 locked)
- Можно перейти к первому уроку и увидеть контент с примерами кода
- Можно выполнить упражнение и получить feedback
- API возвращает корректные данные из MongoDB

**Estimated Time:** 10-12 дней

---

### Phase 2: Core Learning Flow (Week 3-4)

**Goal:** Реализовать полный цикл прохождения урока с упражнениями и проверкой.

**Deliverables:**
- ✅ Exercise Components: UI для всех 7 типов упражнений (включая code-exercise, config-fix)
- ✅ Code Editor: Monaco Editor интеграция с syntax highlighting
- ✅ Exercise Validation: Backend логика проверки ответов (включая код)
- ✅ Progress API: POST endpoints для сохранения прогресса
- ✅ RTK Query Integration: Настройка state management
- ✅ Lesson Navigation: Next/Previous урок, "Continue Learning"
- ✅ Content: Первый модуль "Основы промптинга" (6 уроков)
  - Урок 1: Знакомство с GigaChat
  - Урок 2: Работа с DeepSeek
  - Урок 3: Perplexity для поиска
  - Урок 4: Структура эффективных промптов
  - Урок 5: Сравнение моделей
  - Урок 6: Практические кейсы
- ✅ Hints System: Отображение подсказок в упражнениях

**Validation Criteria:**
- Пользователь может пройти весь урок от начала до конца
- Правильные ответы дают XP, неправильные — детальный feedback
- Code exercises проверяются на синтаксис и паттерны
- Прогресс сохраняется в MongoDB и восстанавливается при перезагрузке
- "Continue Learning" ведет к следующему незавершенному уроку
- Unlocking следующего модуля работает корректно

**Estimated Time:** 12-14 дней

---

### Phase 3: Gamification & Progress (Week 5-6)

**Goal:** Добавить систему мотивации через XP, achievements и визуализацию прогресса.

**Deliverables:**
- ✅ XP System: Начисление XP с учетом attempts и bonuses
- ✅ Streak Tracking: Daily streak calculation и обновление
- ✅ Achievements: 8-10 базовых achievements с unlock условиями
- ✅ Progress Dashboard: Визуализация XP, streak, achievements
- ✅ Module Progress: Circular progress rings для каждого модуля
- ✅ Animations: Базовые transitions для feedback (без Lottie)
- ✅ Notifications: Toast messages для earned XP и achievements

**Validation Criteria:**
- XP начисляется корректно после завершения урока
- Streak увеличивается при активности в новый день
- Achievements unlock автоматически при выполнении условий
- Dashboard показывает актуальный прогресс в реальном времени

**Estimated Time:** 10-12 дней

---

### Phase 4: Content & Polish (Week 7-8)

**Goal:** Завершить контент для MVP (5 модулей), отполировать UX и провести тестирование.

**Deliverables:**
- ✅ Content: Модуль 2 "AI-браузер Comet" (4 урока)
- ✅ Content: Модуль 3 "Cursor.ai Setup" (5 уроков)
- ✅ Content: Модуль 4 "AI-агенты Basics" (5 уроков)
- ✅ Content: Модуль 5 "MCP Introduction" (6 уроков)
- ✅ Responsive Design: Desktop-first (код-упражнения требуют экран)
- ✅ Theme System: Dark/Light theme toggle (приоритет Dark для разработчиков)
- ✅ Error Handling: User-friendly error messages и recovery
- ✅ Loading States: Skeletons и spinners для всех async операций
- ✅ Code Syntax Highlighting: Поддержка TypeScript, Python, JSON, Bash
- ✅ Accessibility: Keyboard navigation, focus management, ARIA labels
- ✅ E2E Tests: Playwright tests для critical user journeys
- ✅ Content Seed Script: Автоматическая загрузка контента в MongoDB

**Validation Criteria:**
- Все 5 модулей доступны и полностью функциональны
- Приложение работает на desktop без багов
- Code editor работает корректно с syntax highlighting
- E2E тесты проходят для основных сценариев:
  - First-time user completes first lesson
  - User completes code exercise successfully
  - Returning user sees correct progress
  - User unlocks achievement and next module
  - Module unlocking logic работает правильно
- Installation process работает на чистой машине с Docker

**Estimated Time:** 14-16 дней

---

**Total MVP Timeline:** 7-9 недель (49-60 дней)

**Note:** Увеличение timeline связано с:
- Расширением с 3 до 5 модулей
- Добавлением code exercises и code editor
- Более сложным контентом (MCP, агенты, конфигурации)

## Future Considerations

### Post-MVP Enhancements

**Phase 5: Advanced Features (Post-Launch)**

1. **Live Tool Integration**
   - Интеграция с GigaChat API для real-time тестирования промптов
   - Sandbox для экспериментов с локальными LLM (Ollama)
   - Автоматическая проверка работоспособности MCP серверов
   - Тестирование AI-агентов в изолированной среде

2. **Advanced Content**
   - **Module 6: Advanced RAG** — векторные базы, embeddings, chunking strategies
   - **Module 7: Локальные LLM** — Ollama, LM Studio, vLLM, оптимизация
   - **Module 8: Advanced MCP** — сложные серверы, интеграция с API
   - **Module 9: Multi-Agent Systems** — координация агентов, workflows
   - **Module 10: Production AI** — деплой, мониторинг, оптимизация
   - Специализированные треки по языкам (Python AI, TypeScript AI)

3. **Social Features**
   - Leaderboards по компаниям/командам
   - Share achievements в LinkedIn
   - Community-created MCP servers и agents
   - Discussion forums по урокам и инструментам

4. **Personalization**
   - Adaptive difficulty (на основе performance)
   - Recommended next lessons по интересам
   - Custom learning paths (Backend AI, Frontend AI, DevOps AI)
   - Spaced repetition для повторения сложных тем

5. **Developer Tools**
   - VS Code extension для быстрого доступа к урокам
   - CLI tool для практики в терминале
   - Интеграция с GitHub для сохранения созданных проектов
   - Export созданных MCP серверов и агентов

### Integration Opportunities

**Developer Tools:**
- Cursor.ai extension для встроенных уроков
- VS Code extension для quick reference
- GitHub integration для сохранения проектов
- Docker Hub для публикации MCP серверов

**AI Platforms:**
- GigaChat API для live testing
- Ollama integration для локальных моделей
- LangChain/LangGraph examples
- Anthropic MCP registry для публикации серверов

**Productivity Tools:**
- Notion template для tracking прогресса
- Slack bot для team learning
- Discord bot для community support
- Telegram bot для quick tips

**Corporate Learning:**
- SCORM package для корпоративного обучения
- Custom tracks для компаний
- Team analytics dashboard
- Private instance deployment

### Advanced Features for Later Phases

**Content Creation Tools:**
- Visual editor для создания уроков (admin panel)
- Template library для exercises
- Import/export контента в JSON/YAML
- Version control для content updates

**Analytics & Insights:**
- Detailed learning analytics
- Time-on-task tracking
- Difficulty heatmaps (какие упражнения сложнее)
- A/B testing для content effectiveness

**Certification System:**
- Digital certificates за завершение модулей
- Skill verification tests
- Shareable credentials (LinkedIn, etc.)
- Employer verification portal

**Collaboration Features:**
- Study groups
- Peer review упражнений
- Mentorship matching
- Live Q&A sessions

## Risks & Mitigations

### Risk 1: Content Quality & Relevance

**Risk:** LLM технологии быстро развиваются, контент может устареть.

**Mitigation:**
- Фокус на fundamental concepts (не устаревают)
- Модульная структура контента (легко обновлять отдельные уроки)
- Version control для контента (git-based workflow)
- Community feedback loop для выявления outdated материалов
- Quarterly content review process

---

### Risk 2: User Engagement & Retention

**Risk:** Пользователи могут не находить геймификацию мотивирующей или терять интерес.

**Mitigation:**
- A/B testing различных gamification mechanics
- Survey после первых 3 уроков (что работает, что нет)
- Вариативность упражнений (не monotonous)
- Clear value proposition (применимость в работе)
- Social proof (testimonials, use cases)
- Streak reminders (но не spam)

---

### Risk 3: Technical Complexity for Target Users

**Risk:** Некоторые пользователи могут найти setup (Docker) слишком сложным.

**Mitigation:**
- Detailed installation guide с screenshots
- Video tutorial для setup
- Pre-built Docker images на Docker Hub
- One-click installers для Windows/Mac (post-MVP)
- Troubleshooting guide для common issues
- Community support channels (Discord, GitHub Discussions)

---

### Risk 4: Exercise Validation Accuracy

**Risk:** Автоматическая проверка текстовых ответов может быть неточной.

**Mitigation:**
- Conservative validation (лучше false positive, чем negative)
- Multiple validation strategies (keywords + length + patterns)
- "Submit anyway" option если пользователь уверен в ответе
- Manual review mode (admin) для flagged ответов
- Continuous improvement на основе user feedback
- Fallback к multiple-choice для critical concepts

---

### Risk 5: MongoDB Data Loss

**Risk:** Потеря прогресса пользователя при сбое или случайном удалении данных.

**Mitigation:**
- Docker volumes для persistence
- Daily backup script (post-MVP)
- Export progress functionality (JSON download)
- Import progress на случай восстановления
- Warning messages перед деструктивными операциями
- MongoDB replica set для production deployments (post-MVP)

## Appendix

### Related Documents

- `CLAUDE.md` — инструкции для AI assistants по работе с проектом
- `.claude/reference/react-frontend-best-practices.md` — React паттерны
- `.claude/reference/express-backend-best-practices.md` — Backend guidelines
- `.claude/reference/mongodb-best-practices.md` — Database patterns

### Key Dependencies

**Learning Content Sources:**
- [GigaChat Documentation](https://developers.sber.ru/docs/ru/gigachat/overview)
- [DeepSeek Documentation](https://platform.deepseek.com/docs)
- [Perplexity API](https://docs.perplexity.ai/)
- [Anthropic MCP Documentation](https://modelcontextprotocol.io/)
- [Cursor.ai Documentation](https://docs.cursor.com/)
- [LangChain Documentation](https://python.langchain.com/)
- [Ollama Documentation](https://ollama.ai/docs)

**Design References:**
- [Duolingo](https://www.duolingo.com/) — gamification inspiration (основа UX)
- [Khan Academy](https://www.khanacademy.org/) — educational UX patterns
- [Codecademy](https://www.codecademy.com/) — interactive code exercises
- [FreeCodeCamp](https://www.freecodecamp.org/) — code challenges

**Technical Documentation:**
- [React 19 Docs](https://react.dev/)
- [Chakra UI v3](https://www.chakra-ui.com/)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [RTK Query Tutorial](https://redux-toolkit.js.org/tutorials/rtk-query)

**AI Tools References:**
- [Anthropic MCP Servers](https://github.com/anthropics/mcp-servers)
- [LangGraph](https://langchain-ai.github.io/langgraph/)
- [AutoGen](https://microsoft.github.io/autogen/)
- [Semantic Kernel](https://learn.microsoft.com/en-us/semantic-kernel/)

### Repository Structure

```
GitHub Repository: https://github.com/AVVlasov/bro-learn-web

Branches:
- main — stable production-ready code
- develop — active development
- feature/* — feature branches

Issues:
- Labels: bug, enhancement, content, documentation, question
- Milestones aligned with Implementation Phases

Wiki:
- Installation Guide
- Content Creation Guide
- API Documentation
- Troubleshooting
```

### Content Development Guidelines

**Lesson Structure Best Practices:**

1. **Start with a Hook** — реальная проблема или задача из разработки
2. **Clear Learning Objectives** — конкретные навыки после урока
3. **Chunked Information** — разбивка на digestible sections (5-7 минут каждая)
4. **Real Code Examples** — рабочий код, конфигурации, API calls
5. **Progressive Exercises** — от simple choice к code writing
6. **Practical Task** — hands-on задание с реальным инструментом
7. **Recap** — summary + ссылки на документацию

**Exercise Design Principles:**

- **One Concept per Exercise** — не перегружать
- **Immediate Feedback** — показать результат сразу с детальным объяснением
- **Code Quality** — примеры кода должны быть production-ready
- **Meaningful Explanations** — не просто "correct/incorrect", а почему и как улучшить
- **Hints не Spoilers** — подсказка направляет к документации, не дает ответ
- **Realistic Scenarios** — задачи, которые разработчик решает в работе
- **Tool-Specific** — учитывать особенности конкретного инструмента (GigaChat vs GPT)

**Code Exercise Guidelines:**

- Starter code должен быть понятным
- Syntax highlighting обязателен
- Проверка на common mistakes
- Ссылки на документацию в hints
- Возможность копировать код
- Показывать diff при ошибках

## Module-Specific Content Guidelines

### Module 1: Основы промптинга

**Focus:** Практическая работа с российскими и зарубежными LLM

**Key Topics:**
- GigaChat API и особенности работы
- DeepSeek для кода и анализа
- Perplexity для поиска информации
- Структура промптов (system, user, assistant)
- Сравнение моделей по задачам

**Exercise Types:**
- Multiple choice: выбор модели для задачи
- Prompt rating: оценка качества промптов
- Prompt fix: улучшение промптов для конкретной модели
- Matching: сопоставление задач и моделей

### Module 2: AI-браузер Comet

**Focus:** Эффективный поиск и работа с информацией

**Key Topics:**
- Установка и настройка Comet
- AI-powered search vs обычный поиск
- Работа с источниками и цитированием
- Интеграция в research workflow
- Best practices для разработчиков

**Exercise Types:**
- Multiple choice: когда использовать Comet
- Matching: типы запросов и подходы
- Text input: формулирование эффективных запросов

### Module 3: Cursor.ai для разработки

**Focus:** Настройка и использование AI в разработке

**Key Topics:**
- Установка и первичная настройка
- Работа с AI-ассистентом (Ctrl+K, Ctrl+L)
- Настройка rules и context
- Продвинутые settings.json
- Best practices для разных языков

**Exercise Types:**
- Config fix: исправление settings.json
- Multiple choice: выбор правильной настройки
- Code exercise: написание .cursorrules
- Practical task: настройка для проекта

### Module 4: Создание AI-агентов

**Focus:** Разработка простых AI-агентов

**Key Topics:**
- Концепция агентов (ReAct, Chain-of-Thought)
- Структура агента (tools, memory, planning)
- Создание skills для агентов
- Тестирование и отладка
- Примеры на LangChain/LangGraph

**Exercise Types:**
- Code exercise: создание простого агента
- Multiple choice: выбор архитектуры
- Matching: tools и use cases
- Practical task: агент для конкретной задачи

### Module 5: MCP (Model Context Protocol)

**Focus:** Создание MCP серверов для расширения возможностей LLM

**Key Topics:**
- Что такое MCP и зачем он нужен
- Структура MCP сервера
- Tools, Resources, Prompts
- Создание первого MCP сервера
- Интеграция с Claude/Cursor

**Exercise Types:**
- Code exercise: создание MCP сервера
- Config fix: исправление tool schema
- Multiple choice: выбор типа MCP компонента
- Practical task: MCP сервер для API

---

**Document Version:** 2.0  
**Created:** January 9, 2026  
**Updated:** January 9, 2026  
**Status:** Updated for AI Tools Focus  
**Next Review:** Before Phase 1 implementation start

**Major Changes in v2.0:**
- Переориентация с общего LLM обучения на конкретные AI-инструменты
- Добавление модулей: GigaChat, DeepSeek, Perplexity, Comet, Cursor.ai, AI-агенты, MCP
- Расширение типов упражнений: code-exercise, config-fix
- Обновление целевой аудитории: фокус на разработчиков
- Интеграция с Duolingo UX patterns из исследования
- Увеличение timeline с учетом сложности контента