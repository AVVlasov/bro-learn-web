# Структура курсов Duolingo

## 📚 Иерархия контента

Duolingo использует четкую иерархическую структуру обучения:

```
Course (Курс)
└── Units (Модули)
    └── Sections (Разделы)
        └── Lessons (Уроки)
            └── Challenges (Упражнения)
                └── Questions (Вопросы)
```

## 🎯 Course (Курс)

**Структура:**
```javascript
{
  id: "DUOLINGO_EN_RU",
  title: "English from Russian",
  fromLanguage: "ru",
  learningLanguage: "en",
  learners: 17000000,
  skillTreeId: "28ccd782fcc4aa3c420abd72a3422484",
  units: [ ... ]
}
```

**Примеры курсов:**
- `DUOLINGO_EN_RU` - Английский для русскоязычных
- `DUOLINGO_DE_RU` - Немецкий для русскоязычных
- `DUOLINGO_ES_EN` - Испанский для англоязычных
- `DUOLINGO_JA_EN` - Японский для англоязычных

**Характеристики:**
- 40+ доступных курсов
- Разный контент для разных направлений
- Адаптивная сложность

## 🗂️ Unit (Модуль)

**Что это:**
- Верхний уровень группировки контента
- Обычно 4-8 units в курсе
- Каждый unit = тематический блок

**Пример Unit 1:**
```javascript
{
  unitIndex: 0,
  title: "Модуль 1",
  description: "Выучите простые разговорные слова, фразы и грамматические конструкции",
  sections: [
    {
      sectionIndex: 0,
      title: "Раздел 1",
      subtitle: "Узнайте основные фразы",
      lessons: [ ... ]
    },
    {
      sectionIndex: 1,
      title: "Раздел 2",
      subtitle: "Расскажите откуда вы",
      lessons: [ ... ]
    }
  ]
}
```

**Состояния Unit:**
- ✅ **Активный** - можно проходить
- 🔒 **Заблокирован** - требует завершения предыдущего
- 📍 **Текущий** - пользователь проходит сейчас

## 📦 Section (Раздел)

**Что это:**
- Группа из 4-8 уроков
- Объединены одной темой
- Имеет Guidebook (справочник)

**Структура:**
```javascript
{
  sectionIndex: 0,
  title: "МОДУЛЬ 1, РАЗДЕЛ 1",
  subtitle: "Узнайте основные фразы",
  guidebookUrl: "/guidebook/en/1",
  lessons: [
    { lessonIndex: 0, type: "lesson", title: "Lesson 1 of 4" },
    { lessonIndex: 1, type: "lesson", title: "Lesson 2 of 4" },
    { lessonIndex: 2, type: "lesson", title: "Lesson 3 of 4" },
    { lessonIndex: 3, type: "lesson", title: "Lesson 4 of 4" },
    { type: "chest", locked: true },
    { type: "practice", locked: false },
    { type: "review", locked: true }
  ]
}
```

**Компоненты раздела:**

### 1. Lessons (Основные уроки)
- 4-6 lessons на раздел
- Последовательная разблокировка
- 10-20 XP за урок

### 2. Treasure Chest (Сундук)
- Открывается после всех lessons
- Reward: gems + XP
- Визуально привлекательный

### 3. Practice (Практика)
- Повторение материала раздела
- Spaced Repetition алгоритм
- 5-10 XP

### 4. Section Review (Обзор раздела)
- Тест на знания раздела
- Все типы упражнений
- 10-15 XP

## 📖 Lesson (Урок)

**Что это:**
- Атомарная единица обучения
- 10-20 упражнений (challenges)
- 5-10 минут прохождения
- Одна тема или навык

**Структура урока:**
```javascript
{
  id: "lesson_basic_phrases_1",
  type: "lesson",
  title: "Lesson 1 of 4",
  skillId: "basic_phrases_1",
  challenges: [
    // 10-20 challenges
  ],
  metadata: {
    targetWords: ["hello", "goodbye", "thank you"],
    grammar: ["greetings", "polite_phrases"],
    difficulty: 1,
    estimatedTime: 300 // seconds
  }
}
```

**Типы уроков:**

1. **Regular Lesson** - обычный урок
2. **Story Lesson** - с персонажами и диалогами
3. **Practice Lesson** - повторение слабых навыков
4. **Review Lesson** - обзор раздела
5. **Placement Test** - тест на определение уровня

## 🎮 Challenge (Упражнение)

**Что это:**
- Отдельное задание в уроке
- Разные типы интерактивности
- Немедленная обратная связь

### Типы Challenges:

#### 1. **select** - Выбор из вариантов

```javascript
{
  type: "select",
  prompt: "Выберите правильный перевод:",
  question: "Hello",
  choices: ["Привет", "Спасибо", "До свидания", "Пожалуйста"],
  correctIndex: 0,
  tts: "https://d35aaqx5ub95lt.cloudfront.net/sounds/hello.mp3"
}
```

**Визуализация:**
```
┌─────────────────────────────────────┐
│ Выберите правильный перевод:        │
│         "Hello"                     │
│                                     │
│  ┌────────────┐  ┌────────────┐   │
│  │  Привет    │  │  Спасибо   │   │
│  └────────────┘  └────────────┘   │
│  ┌────────────┐  ┌────────────┐   │
│  │ До свидания│  │ Пожалуйста │   │
│  └────────────┘  └────────────┘   │
└─────────────────────────────────────┘
```

#### 2. **translate** - Перевод предложения

```javascript
{
  type: "translate",
  prompt: "Напишите по-английски:",
  question: "Привет",
  correctSolutions: ["Hello", "Hi"],
  hints: ["H", "e", "l", "l", "o"],
  wordBank: ["Hello", "Goodbye", "Thank", "You"]
}
```

**Визуализация:**
```
┌─────────────────────────────────────┐
│ Напишите по-английски:              │
│         "Привет"                    │
│                                     │
│  Word Bank:                         │
│  [Hello] [Goodbye] [Thank] [You]    │
│                                     │
│  Ваш ответ:                         │
│  [_____________________]            │
└─────────────────────────────────────┘
```

#### 3. **speak** - Произношение

```javascript
{
  type: "speak",
  prompt: "Произнесите это предложение:",
  question: "Hello, how are you?",
  tts: "https://.../hello-how-are-you.mp3",
  transcriptionData: {
    expected: "hello how are you",
    alternatives: ["hi how are you"]
  }
}
```

**Визуализация:**
```
┌─────────────────────────────────────┐
│ Произнесите это предложение:        │
│                                     │
│     [🔊] "Hello, how are you?"      │
│                                     │
│  [🎤 Tap to speak]                  │
│                                     │
│  [Skip]                             │
└─────────────────────────────────────┘
```

#### 4. **listen** - Восприятие на слух

```javascript
{
  type: "listen",
  prompt: "Напишите, что слышите:",
  audio: "https://.../audio-phrase.mp3",
  correctSolutions: ["I am learning English"],
  slowAudio: "https://.../audio-phrase-slow.mp3",
  hints: ["I", "am", "learning", "English"]
}
```

**Визуализация:**
```
┌─────────────────────────────────────┐
│ Напишите, что слышите:              │
│                                     │
│  [🔊 Play] [🐢 Slow]                │
│                                     │
│  Ваш ответ:                         │
│  [_____________________]            │
│                                     │
│  [Can't listen now]                 │
└─────────────────────────────────────┘
```

#### 5. **match** - Сопоставление пар

```javascript
{
  type: "match",
  prompt: "Сопоставьте пары:",
  pairs: [
    { left: "Hello", right: "Привет" },
    { left: "Goodbye", right: "До свидания" },
    { left: "Thank you", right: "Спасибо" },
    { left: "Please", right: "Пожалуйста" }
  ]
}
```

**Визуализация:**
```
┌─────────────────────────────────────┐
│ Сопоставьте пары:                   │
│                                     │
│  Hello      ●─────● Привет          │
│  Goodbye    ●       До свидания     │
│  Thank you  ●       Спасибо         │
│  Please     ●       Пожалуйста      │
└─────────────────────────────────────┘
```

#### 6. **complete** - Заполнить пропуски

```javascript
{
  type: "complete",
  prompt: "Заполните пропуски:",
  question: "I ___ learning English",
  correctSolutions: ["am"],
  choices: ["am", "is", "are", "be"],
  displaySentence: "I {{blank}} learning English"
}
```

#### 7. **form** - Составить предложение

```javascript
{
  type: "form",
  prompt: "Составьте предложение:",
  question: "Я изучаю английский",
  correctSolution: ["I", "am", "learning", "English"],
  wordBank: ["I", "am", "learning", "English", "the", "a", "is"],
  displayTokens: ["I", "am", "learning", "English"]
}
```

**Визуализация:**
```
┌─────────────────────────────────────┐
│ Составьте предложение:              │
│   "Я изучаю английский"             │
│                                     │
│  Word Bank:                         │
│  [I] [am] [learning] [English]      │
│  [the] [a] [is]                     │
│                                     │
│  Ваш ответ:                         │
│  [ ] [ ] [ ] [ ]                    │
└─────────────────────────────────────┘
```

#### 8. **definition** - Определение слова

```javascript
{
  type: "definition",
  prompt: "Выберите значение:",
  word: "cat",
  tts: "https://.../cat.mp3",
  choices: [
    { text: "кошка", image: "cat.jpg" },
    { text: "собака", image: "dog.jpg" },
    { text: "птица", image: "bird.jpg" }
  ],
  correctIndex: 0
}
```

#### 9. **dialogue** - Диалог

```javascript
{
  type: "dialogue",
  prompt: "Выберите правильный ответ:",
  context: {
    speaker: "Eddy",
    avatar: "eddy.svg",
    message: "Hello! How are you?",
    audio: "eddy-greeting.mp3"
  },
  choices: [
    "I'm fine, thank you!",
    "Goodbye!",
    "I don't know"
  ],
  correctIndex: 0
}
```

### Challenge Metadata

Каждое упражнение содержит метаданные:

```javascript
{
  id: "challenge_uuid",
  type: "select",
  // ... challenge data
  metadata: {
    lexemeId: "word_hello",
    specificType: "vocab_intro",
    fromLanguage: "ru",
    learningLanguage: "en",
    difficulty: 1,
    skillId: "basic_phrases_1",
    newWords: ["hello"],
    reviewWords: []
  }
}
```

## 🎓 Skill Tree

**Что это:**
- Граф зависимостей навыков
- Визуальное представление прогресса
- Адаптивное построение пути

**Структура:**
```javascript
{
  skillTreeId: "28ccd782fcc4aa3c420abd72a3422484",
  skills: [
    {
      id: "basic_phrases_1",
      name: "Основные фразы",
      shortName: "Фразы 1",
      dependencies: [],
      level: 0,
      unlocked: true,
      strength: 1.0
    },
    {
      id: "greetings_1",
      name: "Приветствия",
      dependencies: ["basic_phrases_1"],
      level: 1,
      unlocked: false,
      strength: 0
    }
  ]
}
```

## 📝 Smart Tips

**Что это:**
- Контекстные подсказки в уроках
- Грамматические пояснения
- Культурные заметки
- Lottie анимации для визуализации

**Структура:**
```javascript
{
  id: "tip_greetings_formal",
  type: "grammar",
  title: "Formal vs Informal Greetings",
  content: "In English, 'Hello' is more formal...",
  lottie: "https://d1btvuu4dwu627.cloudfront.net/smart_tip_en_ru/.../1.json",
  displayCondition: {
    afterChallenge: 3,
    ifMistake: true
  }
}
```

**Загрузка Smart Tips:**
```
GET https://d1btvuu4dwu627.cloudfront.net/
    smart_tip_en_ru/
    {tip_id}/
    web/
    {version}/
    {variant}/
    {difficulty}.json
```

## 📊 Progress Tracking

### Lesson Progress

```javascript
{
  lessonId: "lesson_123",
  status: "in_progress",
  completedChallenges: 7,
  totalChallenges: 15,
  correctAnswers: 6,
  incorrectAnswers: 1,
  timeSpent: 180, // seconds
  xpEarned: 12,
  startedAt: "2026-01-09T10:00:00Z"
}
```

### Section Progress

```javascript
{
  sectionId: "section_1",
  completedLessons: [0, 1],
  totalLessons: 4,
  chestOpened: false,
  practiceCompleted: 0,
  reviewCompleted: false,
  sectionStrength: 0.5 // 0-1 scale
}
```

### Skill Strength

Duolingo отслеживает "силу" каждого навыка:

```javascript
{
  skillId: "basic_phrases_1",
  strength: 0.85, // 0-1 scale
  lastPracticed: "2026-01-09T10:00:00Z",
  practicesDue: 0,
  wordsStrength: {
    "hello": 1.0,
    "goodbye": 0.7,
    "thank_you": 0.9
  }
}
```

**Визуализация силы:**
- 🟢 Золотой (1.0) - perfect strength
- 🟡 Желтый (0.5-0.9) - needs practice soon
- 🔴 Красный (<0.5) - needs practice now
- ⚫ Серый (0) - not learned yet

## 🎯 Adaptive Learning

Duolingo использует AI для адаптации:

### 1. **Difficulty Adjustment**
```javascript
if (user.correctRate > 0.9) {
  increaseDifficulty();
} else if (user.correctRate < 0.5) {
  decreaseDifficulty();
}
```

### 2. **Spaced Repetition**
```javascript
const nextReviewTime = calculateSRS({
  lastReview: skill.lastPracticed,
  strength: skill.strength,
  correctAnswers: skill.correctAnswers,
  totalAnswers: skill.totalAnswers
});
```

### 3. **Weak Skills Identification**
```javascript
const weakSkills = skills.filter(s => 
  s.strength < 0.5 || 
  daysSince(s.lastPracticed) > 7
);
```

## 💡 Применение для bro-learn-web

### Структура контента:

```
Course: "LLM Mastery"
└── Module 1: "Foundations"
    └── Section 1: "Introduction to LLM"
        ├── Lesson 1: "What is LLM?"
        ├── Lesson 2: "Prompt Basics"
        ├── Lesson 3: "Conversation Flow"
        ├── Practice
        └── Review

└── Module 2: "Professional Use Cases"
    └── Section 1: "Email & Communication"
        ├── Lesson 1: "Email Templates"
        ├── Lesson 2: "Meeting Summaries"
        └── ...
```

### Challenge Types для LLM:

1. **Prompt Completion** - дополнить промпт
2. **Prompt Selection** - выбрать лучший промпт
3. **Response Evaluation** - оценить качество ответа LLM
4. **Prompt Refactoring** - улучшить промпт
5. **Use Case Matching** - сопоставить задачу и промпт
6. **Real Scenario** - решить реальную задачу

### Адаптация:

- ❌ Нет audio challenges (не нужны для LLM)
- ✅ Интерактивные промпты с AI
- ✅ Оценка качества промптов
- ✅ Real-world scenarios

---

**Источник**: Duolingo API & Network Analysis  
**Skill Tree ID**: 28ccd782fcc4aa3c420abd72a3422484  
**Цель**: Построение структуры курсов для bro-learn-web
