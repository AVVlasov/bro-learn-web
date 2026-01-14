# Персонажи и анимации Duolingo

## 🦉 Duo - Главный талисман

**Duo** - зеленая сова, символ Duolingo.

### Характеристики:
- **Цвет**: Яркий зелёный (#58CC02)
- **Стиль**: Мультяшный, дружелюбный
- **Формат**: SVG + Lottie анимации
- **Использование**: Везде в приложении

### Эмоции Duo:

```javascript
const DUO_EMOTIONS = {
  HAPPY: {
    description: 'Радостный, улыбающийся',
    use: 'Правильные ответы, достижения',
    animation: 'duo-happy.json'
  },
  SAD: {
    description: 'Грустный, расстроенный',
    use: 'Неправильные ответы, потеря streak',
    animation: 'duo-sad.json'
  },
  ANGRY: {
    description: 'Сердитый, недовольный',
    use: '3+ дня без практики',
    animation: 'duo-angry.json'
  },
  CELEBRATING: {
    description: 'Празднующий с конфетти',
    use: 'Завершение урока, level up',
    animation: 'duo-celebrating.json'
  },
  THINKING: {
    description: 'Задумчивый, с вопросом',
    use: 'Подсказки, советы',
    animation: 'duo-thinking.json'
  },
  SLEEPING: {
    description: 'Спящий',
    use: 'Напоминания перед сном',
    animation: 'duo-sleeping.json'
  },
  CRYING: {
    description: 'Плачущий',
    use: 'Streak потерян',
    animation: 'duo-crying.json'
  },
  EXCITED: {
    description: 'Возбужденный, взволнованный',
    use: 'Новые features, события',
    animation: 'duo-excited.json'
  }
};
```

### Примеры использования Duo:

1. **Loading States**
```jsx
<DuoAnimation type="thinking" loop={true}>
  <Text>Загружаем урок...</Text>
</DuoAnimation>
```

2. **Success Feedback**
```jsx
<DuoAnimation type="celebrating" autoPlay={true}>
  <Text>Отличная работа!</Text>
</DuoAnimation>
```

3. **Error Feedback**
```jsx
<DuoAnimation type="sad" autoPlay={true}>
  <Text>Попробуйте еще раз!</Text>
</DuoAnimation>
```

4. **Notification Prompts**
```jsx
<DuoAnimation type="angry">
  <Text>Вы не занимались 3 дня! 😠</Text>
</DuoAnimation>
```

## 👥 Character Cast (Персонажи историй)

Duolingo имеет набор персонажей для Story Lessons:

### Основные персонажи:

#### 1. **Eddy** 
```javascript
{
  name: "Eddy",
  description: "Молодой парень, энтузиаст",
  personality: "Дружелюбный, оптимистичный",
  avatar: "eddy.svg",
  voiceId: "eddy_voice",
  appearances: ["greeting", "cafe", "travel"]
}
```

#### 2. **Oscar**
```javascript
{
  name: "Oscar",
  description: "Мальчик, ученик",
  personality: "Любопытный, энергичный",
  avatar: "oscar.svg"
}
```

#### 3. **Falstaff**
```javascript
{
  name: "Falstaff",
  description: "Пожилой мужчина",
  personality: "Мудрый, спокойный",
  avatar: "falstaff.svg"
}
```

#### 4. **Lin**
```javascript
{
  name: "Lin",
  description: "Молодая женщина",
  personality: "Активная, целеустремленная",
  avatar: "lin.svg"
}
```

#### 5. **Vikram**
```javascript
{
  name: "Vikram",
  description: "Мужчина средних лет",
  personality: "Профессиональный, серьезный",
  avatar: "vikram.svg"
}
```

### Использование персонажей:

#### Story Lessons:
```jsx
<StoryLesson>
  <Character name="Eddy" emotion="happy" position="left">
    <Dialog audio="eddy-hello.mp3">
      Hello! How are you?
    </Dialog>
  </Character>
  
  <Character name="Oscar" emotion="excited" position="right">
    <Dialog audio="oscar-fine.mp3">
      I'm fine, thank you!
    </Dialog>
  </Character>
  
  <Question>
    Как Оскар ответил на вопрос?
  </Question>
</StoryLesson>
```

### Character Customization:

Пользователи могут кастомизировать своего аватара:
- Цвет кожи
- Прическа
- Одежда
- Аксессуары
- Фон

**API:**
```
GET /users/{userId}/built-avatar-states
GET /users/{userId}/avatar-builder-config
```

## 🎨 Lottie Animations

Duolingo активно использует Lottie (JSON-based animations) вместо GIF или видео.

### Преимущества Lottie:

✅ **Малый размер** - JSON вместо видео  
✅ **Векторная графика** - масштабируется без потери качества  
✅ **Программное управление** - можно контролировать через JS  
✅ **Плавная анимация** - 60 FPS  

### Структура Lottie файла:

```json
{
  "v": "5.5.7",
  "fr": 60,
  "ip": 0,
  "op": 120,
  "w": 500,
  "h": 500,
  "nm": "Duo Celebration",
  "ddd": 0,
  "assets": [...],
  "layers": [...]
}
```

### Примеры Lottie в Duolingo:

#### 1. **Splash Screen Animations**
```
https://d35aaqx5ub95lt.cloudfront.net/
  lottie/splash/
  50bda50231c0bce1584e982cebfe8f33.json
```

**Используется для:**
- Загрузка приложения
- Переходы между страницами
- Анимированные фоны

#### 2. **Funboarding (Onboarding) Animations**
```
https://d35aaqx5ub95lt.cloudfront.net/
  lottie/funboarding/
  4e5c13bf6b0be65006ae027f066362fc.json
```

**Используется для:**
- Welcome flow
- Объяснение features
- Мотивационные сообщения

#### 3. **Smart Tips Animations**
```
https://d1btvuu4dwu627.cloudfront.net/
  smart_tip_en_ru/
  {tip_id}/
  web/
  {version}/
  {variant}/
  {difficulty}.json
```

**Используется для:**
- Грамматические правила
- Визуализация концепций
- Примеры использования

#### 4. **Feedback Animations**
```javascript
const FEEDBACK_ANIMATIONS = {
  correct: 'lottie/681e3b6084394d09df2af15f9d12d51c.json',
  incorrect: 'lottie/7f1370b3f1d802951f0cab013ecb05c2.json',
  perfect: 'lottie/6f4525b361ab4ef04c92af8f42cdcec6.json'
};
```

### Интеграция Lottie в React:

```jsx
import Lottie from 'lottie-react';
import celebrationAnimation from './animations/celebration.json';

function SuccessAnimation() {
  return (
    <Lottie
      animationData={celebrationAnimation}
      loop={false}
      autoplay={true}
      style={{ width: 300, height: 300 }}
      onComplete={() => console.log('Animation finished!')}
    />
  );
}
```

## 🎬 Animation Categories

### 1. **UI Transitions**

**Fade In/Out:**
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

**Slide In:**
```css
@keyframes slideInFromRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
```

**Scale Pop:**
```css
@keyframes scalePop {
  0% { transform: scale(0); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
```

### 2. **Feedback Animations**

**Correct Answer:**
- ✅ Зеленая галочка с анимацией
- 🎉 Конфетти (на perfect streak)
- 💚 Пульсация зеленым
- 🔊 Звук "ding!"

**Incorrect Answer:**
- ❌ Красный крестик
- 📳 Вибрация (shake)
- ❤️ Потеря heart (mobile)
- 🔊 Звук "buzz"

**Perfect Lesson:**
- 🎊 Большое конфетти
- ⭐ Звезды
- 🎵 Фанфары
- 💎 +5 bonus gems

### 3. **Progress Animations**

**XP Gain:**
```jsx
<XPAnimation from={0} to={20} duration={1000}>
  {(value) => <span>+{Math.round(value)} XP</span>}
</XPAnimation>
```

**Level Up:**
```jsx
<LevelUpAnimation>
  <Confetti />
  <RaysBurst />
  <Text>Level 2!</Text>
</LevelUpAnimation>
```

**Streak Save:**
```jsx
<StreakAnimation>
  <FireIcon animated />
  <Text>🔥 {streakCount} день подряд!</Text>
</StreakAnimation>
```

### 4. **Character Animations**

**Idle States:**
- Моргание
- Дыхание
- Небольшие движения

**Action States:**
- Talking (синхронизация с audio)
- Thinking (поворот головы)
- Celebrating (прыжки, махи)
- Sad (опущенные плечи)

### 5. **Loading Animations**

**Spinner:**
```jsx
<Spinner>
  <DuoIcon rotating />
  <Text>Загружаем...</Text>
</Spinner>
```

**Skeleton Loaders:**
```jsx
<SkeletonLoader>
  <SkeletonRect width="100%" height="60px" />
  <SkeletonCircle size="40px" />
  <SkeletonText lines={3} />
</SkeletonLoader>
```

**Progress Bars:**
```jsx
<ProgressBar
  value={progress}
  animated
  striped
  color="green"
/>
```

## 🎵 Sound Effects

Duolingo использует аудио для обратной связи:

```javascript
const SOUNDS = {
  // Feedback sounds
  correct: 'sounds/7abe057dc8446ad325229edd6d8fd250.mp3',
  incorrect: 'sounds/37d8f0b39dcfe63872192c89653a93f6.mp3',
  
  // Progress sounds
  xpGained: 'sounds/421d48c53ad6d52618dba715722278e0.mp3',
  levelUp: 'sounds/f0b6ab4396d5891241ef4ca73b4de13a.mp3',
  
  // UI sounds
  buttonClick: 'sounds/2aae0ea735c8e9ed884107d6f0a09e35.mp3',
  pageTransition: 'sounds/a28ff0a501ef5f33ca78c0afc45ee53e.mp3',
  
  // Achievement sounds
  gemEarned: 'sounds/2e4669d8cf839272f0731f8afa488caf.mp3',
  achievement: 'sounds/0a27c1ee63dd220647e8410a0029aed2.mp3'
};
```

### Audio Management:

```jsx
function useAudio(soundName) {
  const audio = useMemo(
    () => new Audio(SOUNDS[soundName]),
    [soundName]
  );
  
  const play = useCallback(() => {
    audio.currentTime = 0;
    audio.play();
  }, [audio]);
  
  return { play };
}

// Usage
const { play: playCorrect } = useAudio('correct');

function handleCorrectAnswer() {
  playCorrect();
  showFeedback('correct');
}
```

## 🖼️ SVG Illustrations

Duolingo использует SVG для:

### 1. **Icons**
- Navigation icons (home, leaderboard, profile)
- Status icons (streak fire, gems, hearts)
- Action icons (microphone, speaker, flag)

### 2. **Illustrations**
- Character avatars
- Decorative elements
- Empty states
- Error states

### 3. **Flags**
- Языковые флаги для выбора курса
- Иконки стран

**Примеры SVG:**
```
https://d35aaqx5ub95lt.cloudfront.net/vendor/
  73837fa39dbf1bcc4c95a17a58ed0ffb.svg (icon)
  
https://d35aaqx5ub95lt.cloudfront.net/images/
  84481e2507d0fd72f121db57ad029fc7.svg (illustration)
```

## 🎨 Animation Libraries

Duolingo использует:

### 1. **Lottie-web / lottie-react**
```bash
npm install lottie-react
```

### 2. **Framer Motion** (предположительно)
```jsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>
  {content}
</motion.div>
```

### 3. **CSS Animations**
Для простых transitions и animations

## 💡 Создание собственных персонажей

### Рекомендуемые инструменты:

1. **Adobe After Effects + Bodymovin**
   - Создание Lottie анимаций
   - Export в JSON

2. **Figma + Lottie Plugin**
   - Векторная графика
   - Simple animations

3. **LottieFiles**
   - Онлайн редактор
   - Библиотека готовых анимаций
   - https://lottiefiles.com

4. **Blender** (для 3D)
   - 3D модели персонажей
   - Export в SVG/JSON

### Workflow для персонажей:

```
1. Concept Art (Sketch/Figma)
   ↓
2. Vector Design (Illustrator/Figma)
   ↓
3. Rigging & Animation (After Effects)
   ↓
4. Export Lottie (Bodymovin)
   ↓
5. Integration (React/JS)
```

### Оптимизация Lottie:

```javascript
// Оптимизированная загрузка
import dynamic from 'next/dynamic';

const LottieAnimation = dynamic(
  () => import('./LottieAnimation'),
  { ssr: false }
);

// Lazy loading
const animation = lazy(() => 
  import('./animations/celebration.json')
);
```

## 🎯 Применение для bro-learn-web

### Персонаж для LLM курса:

**Варианты:**
1. **AI Robot** - дружелюбный робот-помощник
2. **Professional Avatar** - деловой персонаж
3. **Abstract Icon** - минималистичная иконка

### Рекомендуемый подход:

```javascript
const BRO_CHARACTER = {
  name: "BroBot",
  description: "AI-ассистент для обучения LLM",
  style: "Modern, Professional, Friendly",
  emotions: [
    'neutral',    // обычное состояние
    'thinking',   // анализ промпта
    'success',    // правильное решение
    'hint',       // подсказка
    'celebrate'   // достижение
  ]
};
```

### Анимации для bro-learn-web:

1. ✅ **Feedback animations** (correct/incorrect)
2. ✅ **Progress animations** (XP, level up)
3. ✅ **Loading states** (thinking, processing)
4. ✅ **Empty states** (no data, start learning)
5. ❌ **Минимум decorative** (не перегружать)

### Упрощенный подход:

- Использовать готовые Lottie из LottieFiles
- SVG иконки от Heroicons / Feather Icons
- CSS animations для transitions
- Sound effects минимальные (можно опционально)

---

**Источники**:
- Duolingo CDN Analysis
- Lottie файлы из CloudFront
- SVG assets исследование
- https://lottiefiles.com/featured

**Цель**: Создание приятного визуального опыта для bro-learn-web
