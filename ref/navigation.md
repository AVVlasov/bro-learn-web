# Навигация и архитектура Duolingo

## 🗺️ Общая структура навигации

Duolingo использует комбинацию SPA (Single Page Application) с client-side routing.

## 🧭 Главное меню (Header Navigation)

### Desktop Header

```
┌──────────────────────────────────────────────────────┐
│ [🦉 Logo] [Уроки] [Персонажи] [Рейтинг] [Задания]   │
│                    [Магазин] [👤 Профиль] [⚙️]       │
│                                                      │
│           [🔥 0] [💎 500] [⚡ Streak]               │
└──────────────────────────────────────────────────────┘
```

### Элементы навигации:

1. **Logo** → `/` (главная) или `/learn` (для залогиненных)
2. **Уроки** → `/learn` (активная страница)
3. **Персонажи** → `/characters`
4. **Рейтинг** → `/leaderboard`
5. **Задания** → `/quests`
6. **Магазин** → `/shop`
7. **Профиль** → `/profile/{username}`
8. **Настройки** → dropdown menu

### Счётчики в header:

```jsx
<HeaderCounters>
  <StreakCounter value={0} icon="🔥" />
  <XPCounter value={0} icon="⭐" />
  <GemsCounter value={500} icon="💎" />
  <StreakFreezeIndicator active={false} icon="🛡️" />
</HeaderCounters>
```

## 📄 Основные страницы

### 1. Landing Page `/`

**Для незалогиненных пользователей:**

```
┌────────────────────────────────────────────┐
│ Header (Logo, Sign Up, Login)              │
├────────────────────────────────────────────┤
│ Hero Section                               │
│ - "Учите языки бесплатно"                  │
│ - [Начать] button                          │
│ - Языковые флаги                           │
├────────────────────────────────────────────┤
│ Features Section                           │
│ - Бесплатно. Весело. Эффективно.         │
│ - Научный подход                          │
│ - Стимул к учёбе                          │
│ - Индивидуальное обучение                 │
├────────────────────────────────────────────┤
│ Products                                   │
│ - Duolingo English Test                   │
│ - Duolingo for Schools                    │
│ - Duolingo ABC                            │
│ - Duolingo Math                           │
├────────────────────────────────────────────┤
│ Footer                                     │
└────────────────────────────────────────────┘
```

### 2. Welcome Flow `/welcome`

Multi-step onboarding:

```javascript
const WELCOME_STEPS = [
  'coursePicker',      // Выбор курса
  'hdyhau',           // Как узнали о Duolingo
  'learningReason',   // Причина изучения
  'proficiency',      // Уровень владения
  'courseOverview',   // Обзор курса
  'dailyGoal',        // Ежедневная цель
  'choosePath'        // Выбор пути обучения
];
```

**URL паттерн:**
```
/welcome?welcomeStep=coursePicker
/welcome?welcomeStep=hdyhau
/welcome?welcomeStep=learningReason
...
```

### 3. Learn Page `/learn` ⭐

**Главная страница обучения** - самая важная!

#### Layout структура:

```
┌─────────────────────────────────────────────────────────┐
│ Header (навигация + счётчики)                          │
├──────────────┬──────────────────────────────────────────┤
│              │ Main Learning Path                       │
│              │                                          │
│  Left        │ ┌──────────────────────────────────┐    │
│  Sidebar     │ │ МОДУЛЬ 1, РАЗДЕЛ 1               │    │
│              │ │ Узнайте основные фразы           │    │
│ [Stats]      │ │ [📖 Справочник]                  │    │
│ [Daily Goal] │ └──────────────────────────────────┘    │
│ [Quests]     │                                          │
│ [Links]      │ [Lesson 1 of 4] ← активный урок         │
│              │       ↓                                  │
│              │ [Lesson 2] ← заблокирован               │
│              │       ↓                                  │
│              │ [🎁 Сундук] ← заблокирован              │
│              │       ↓                                  │
│              │ [Practice] ← доступна                   │
│              │       ↓                                  │
│              │ [Обзор раздела]                         │
│              │                                          │
│              │ ────────────────────────────             │
│              │ Раздел 2: Расскажите откуда вы          │
│              │ [🔒 Placement Test]                     │
│              │ ...                                      │
│              │                                          │
│              │ ────────────────────────────             │
│              │ Модуль 2 [🔒 Заблокирован]              │
└──────────────┴──────────────────────────────────────────┘
```

#### Left Sidebar компоненты:

```jsx
<LeftSidebar>
  <StreakCounter />
  <XPCounter />
  <GemsCounter />
  <StreakFreezeStatus />
  
  <LeaderboardTeaser>
    "Откройте рейтинги! 
    Пройдите ещё 10 уроков"
  </LeaderboardTeaser>
  
  <DailyQuests>
    <Quest progress={0} goal={10} reward="💎 5">
      Получите 10 очков опыта
    </Quest>
  </DailyQuests>
  
  <FooterLinks>
    <Link to="/info">О Duolingo</Link>
    <Link to="/shop">Магазин</Link>
    <Link to="/efficacy">Эффективность</Link>
    ...
  </FooterLinks>
</LeftSidebar>
```

#### Learning Path (центральная колонка):

**Структура:**
- **Unit** (Модуль) - верхний уровень группировки
- **Section** (Раздел) - группа из 4-6 уроков
- **Lesson** (Урок) - отдельное занятие
- **Treasure Chest** (Сундук) - награда за раздел
- **Practice** - повторение материала
- **Unit Review** (Обзор раздела) - тест на знания

**Визуальные состояния:**

```javascript
const LESSON_STATES = {
  ACTIVE: {
    icon: '▶️',
    color: 'green',
    clickable: true,
    label: 'НАЧАТЬ'
  },
  COMPLETED: {
    icon: '✅',
    color: 'gold',
    clickable: true, // можно повторить
    label: 'ПРОЙТИ СНОВА'
  },
  LOCKED: {
    icon: '🔒',
    color: 'gray',
    clickable: false,
    label: null
  },
  IN_PROGRESS: {
    icon: '⏸️',
    color: 'yellow',
    clickable: true,
    label: 'ПРОДОЛЖИТЬ'
  }
};
```

### 4. Lesson Page `/lesson`

Интерфейс урока:

```
┌─────────────────────────────────────────────────┐
│ [←] [Progress Bar ████░░░░░░░] [❌ Exit]       │
├─────────────────────────────────────────────────┤
│                                                 │
│              [Character Animation]              │
│                                                 │
│           Выберите правильный перевод:          │
│                   "Hello"                       │
│                                                 │
│        ┌─────────────┐  ┌─────────────┐       │
│        │   Привет    │  │  Спасибо    │       │
│        └─────────────┘  └─────────────┘       │
│        ┌─────────────┐  ┌─────────────┐       │
│        │  До свидания│  │  Пожалуйста │       │
│        └─────────────┘  └─────────────┘       │
│                                                 │
│                              [ПРОВЕРИТЬ]        │
└─────────────────────────────────────────────────┘
```

**URL:**
```
/lesson
/lesson?type=practice
/lesson?type=test
/lesson/unit/{unitIndex}/level/{levelIndex}
```

### 5. Characters Page `/characters`

Страница персонажей курса:

```
┌───────────────────────────────────────────────┐
│           Знакомьтесь с персонажами           │
├───────────────────────────────────────────────┤
│  [👨 Eddy]   [👦 Oscar]   [🧔 Falstaff]      │
│     🔒           🔒            🔒              │
│                                               │
│  Unlock после завершения Unit 1               │
│                                               │
│  Interactive dialogues                        │
│  Audio + Text                                 │
│  Real-life scenarios                          │
└───────────────────────────────────────────────┘
```

### 6. Leaderboard Page `/leaderboard`

Рейтинговая таблица:

```
┌─────────────────────────────────────────────────┐
│  🏆 Bronze League                Week 1 of 3    │
│  Ваша позиция: 15 / 30                         │
├─────────────────────────────────────────────────┤
│  Promotion Zone (Top 10)                        │
│  1️⃣  UserA         ⭐ 1,234 XP  [💬]           │
│  2️⃣  UserB         ⭐ 1,102 XP  [💬]           │
│  ...                                            │
│  🔹 15  Вы         ⭐ 0 XP                      │
│  ...                                            │
│  Demotion Zone (Bottom 5)                       │
│  26  UserZ         ⭐ 5 XP                      │
│  ...                                            │
├─────────────────────────────────────────────────┤
│  [Bronze] [Silver] [Gold] ... [Diamond]        │
└─────────────────────────────────────────────────┘
```

**Tabs:**
- Current Week (текущая неделя)
- Friends (друзья)
- Following (подписки)

### 7. Quests Page `/quests`

Страница заданий:

```
┌─────────────────────────────────────────────────┐
│               📋 Задания дня                    │
├─────────────────────────────────────────────────┤
│  Получите 10 очков опыта                        │
│  [████████░░] 8/10          Награда: 💎 5      │
│                                                 │
│  Завершите 3 урока                             │
│  [░░░░░░░░░░] 0/3           Награда: 💎 10     │
│                                                 │
│  Пройдите урок без ошибок                      │
│  [░░░░░░░░░░] 0/1           Награда: 💎 15     │
├─────────────────────────────────────────────────┤
│             📅 Еженедельные задания             │
├─────────────────────────────────────────────────┤
│  Заработайте 100 XP за неделю                  │
│  [██░░░░░░░░] 20/100        Награда: 💎 50     │
└─────────────────────────────────────────────────┘
```

### 8. Shop Page `/shop`

Магазин внутриигровых предметов:

```
┌─────────────────────────────────────────────────┐
│  💎 Ваши гемы: 500                              │
├─────────────────────────────────────────────────┤
│  Power-Ups                                      │
│  ┌────────────┐  ┌────────────┐                │
│  │ 🛡️ Streak  │  │ ❤️ Hearts  │                │
│  │   Freeze   │  │   Refill   │                │
│  │            │  │            │                │
│  │  200 💎    │  │  350 💎    │                │
│  └────────────┘  └────────────┘                │
│                                                 │
│  Outfits & Accessories                          │
│  [Character customization items]                │
└─────────────────────────────────────────────────┘
```

### 9. Profile Page `/profile/{username}`

```
┌─────────────────────────────────────────────────┐
│  [Avatar] Username                              │
│  🔥 0 day streak  ⭐ 0 Total XP                │
├─────────────────────────────────────────────────┤
│  📊 Statistics                                  │
│  - Current Streak: 0 days                       │
│  - Longest Streak: 0 days                       │
│  - Total XP: 0                                  │
│  - Lessons Completed: 0                         │
│                                                 │
│  🏆 Achievements                                │
│  [Badges grid]                                  │
│                                                 │
│  📚 Languages                                   │
│  English: 0 XP                                  │
├─────────────────────────────────────────────────┤
│  [Tabs: Overview | Badges | Following]         │
└─────────────────────────────────────────────────┘
```

### 10. Settings Page `/settings/account`

```
┌─────────────────────────────────────────────────┐
│  ⚙️ Settings                                    │
├─────────────────────────────────────────────────┤
│  [Account] [Profile] [Privacy] [Notifications] │
├─────────────────────────────────────────────────┤
│  Account Settings                               │
│  - Email: ***@***                              │
│  - Username: Alex705200                         │
│  - Password: ••••••••                           │
│  - Learning Language: English                   │
│  - Interface Language: Русский                  │
│                                                 │
│  Daily Goal                                     │
│  [Casual] [Regular] [Serious] [Intense]        │
│                                                 │
│  Notifications                                  │
│  [✓] Email reminders                            │
│  [✓] Push notifications                         │
│  [✓] Achievement emails                         │
└─────────────────────────────────────────────────┘
```

## 🧩 Дополнительные страницы

### Guidebook `/guidebook/{language}/{section}`

Справочник раздела с грамматикой и подсказками

### Sections Overview `/sections`

Обзор всех секций курса

### Practice Hub `/practice`

Центр практики:
- Weak Skills
- Spaced Repetition
- Mistakes Review

## 📱 Mobile Navigation

На мобильных устройствах:

```
┌─────────────────────┐
│  Tab Bar (Bottom)   │
├─────────────────────┤
│ [Уроки] - активная  │
│ [Рейтинг]           │
│ [Задания]           │
│ [Магазин]           │
│ [Профиль]           │
└─────────────────────┘
```

## 🔀 Routing & State

### React Router структура

```javascript
<Routes>
  <Route path="/" element={<Landing />} />
  <Route path="/welcome" element={<Welcome />} />
  
  <Route path="/learn" element={<Learn />} />
  <Route path="/lesson" element={<Lesson />} />
  <Route path="/lesson/unit/:unitIndex/level/:levelIndex" />
  
  <Route path="/characters" element={<Characters />} />
  <Route path="/leaderboard" element={<Leaderboard />} />
  <Route path="/quests" element={<Quests />} />
  <Route path="/shop" element={<Shop />} />
  
  <Route path="/profile/:username" element={<Profile />} />
  <Route path="/settings/*" element={<Settings />} />
  
  <Route path="/guidebook/:lang/:section" element={<Guidebook />} />
  <Route path="/sections" element={<SectionsOverview />} />
</Routes>
```

### Deep linking

Duolingo поддерживает deep links:

```
duolingo://lesson/unit/1/level/2
duolingo://profile/username
duolingo://shop/item/streak-freeze
```

## 🎯 Breadcrumbs

На некоторых страницах есть breadcrumbs:

```
Learn > Unit 1 > Section 1 > Lesson 1
```

## 💡 Ключевые принципы навигации

1. **Главная страница = /learn** для залогиненных
2. **Minimal clicks** - всё доступно за 1-2 клика
3. **Persistent header** - навигация всегда видна
4. **Progress indicators** - показывают где находишься
5. **Smart back button** - контекстное возвращение
6. **Deep links** - можно делиться прогрессом

## 🎯 Применение для bro-learn-web

### Структура навигации:

```
/
  /welcome (onboarding)
  /learn (главная после логина)
  /lesson/:id
  /practice
  /leaderboard
  /quests
  /profile/:username
  /settings
```

### Отличия от Duolingo:

1. Нет магазина (shop) - не монетизация
2. Вместо "Characters" → "Case Studies"
3. Добавить "/resources" - справочные материалы по LLM
4. Добавить "/playground" - интерактивная песочница

---

**Источник**: Duolingo Web App Navigation  
**Цель**: Проектирование навигации для bro-learn-web
