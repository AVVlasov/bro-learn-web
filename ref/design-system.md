# Дизайн-система Duolingo

## 🎨 Цветовая палитра

### Primary Colors

```css
/* Основные цвета бренда */
--duolingo-green: #58CC02;
--duolingo-blue: #1CB0F6;
--duolingo-yellow: #FFC800;
--duolingo-red: #FF4B4B;
--duolingo-orange: #FF9600;
```

### Semantic Colors

```css
/* Семантические цвета */
--color-success: #58CC02;
--color-warning: #FF9600;
--color-error: #FF4B4B;
--color-info: #1CB0F6;
```

### Neutral Colors

```css
/* Нейтральные цвета */
--color-background: #FFFFFF;
--color-surface: #F7F7F7;
--color-border: #E5E5E5;
--color-text-primary: #4B4B4B;
--color-text-secondary: #777777;
--color-text-disabled: #AFAFAF;
```

### Gradient Colors

```css
/* Градиенты для buttons и decorations */
--gradient-green: linear-gradient(180deg, #58CC02 0%, #58A700 100%);
--gradient-blue: linear-gradient(180deg, #1CB0F6 0%, #1899D6 100%);
--gradient-super: linear-gradient(135deg, #FF9600 0%, #FFC800 100%);
```

## 📐 Spacing System

```css
/* 8-point grid system */
--space-xxs: 4px;   /* 0.5 unit */
--space-xs: 8px;    /* 1 unit */
--space-sm: 12px;   /* 1.5 units */
--space-md: 16px;   /* 2 units */
--space-lg: 24px;   /* 3 units */
--space-xl: 32px;   /* 4 units */
--space-xxl: 48px;  /* 6 units */
--space-xxxl: 64px; /* 8 units */
```

## 🔤 Typography

### Font Family

```css
--font-family-primary: 'din-round', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
--font-family-display: 'feather-bold', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
```

### Font Sizes

```css
--font-size-xs: 12px;
--font-size-sm: 14px;
--font-size-base: 16px;
--font-size-md: 18px;
--font-size-lg: 20px;
--font-size-xl: 24px;
--font-size-xxl: 32px;
--font-size-xxxl: 48px;
```

### Font Weights

```css
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-bold: 700;
--font-weight-extra-bold: 800;
```

### Line Heights

```css
--line-height-tight: 1.2;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
```

## 🧩 UI Components

### Buttons

#### Primary Button
```jsx
<button className="button-primary">
  НАЧАТЬ
</button>
```

**Стили:**
```css
.button-primary {
  background: linear-gradient(180deg, #58CC02 0%, #58A700 100%);
  border: 2px solid transparent;
  border-bottom-color: #58A700;
  border-radius: 16px;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 700;
  padding: 16px 32px;
  text-transform: uppercase;
  transition: transform 0.1s, filter 0.1s;
  cursor: pointer;
}

.button-primary:hover {
  filter: brightness(1.1);
  transform: scale(1.02);
}

.button-primary:active {
  transform: scale(0.98);
}

.button-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

#### Secondary Button
```css
.button-secondary {
  background: #FFFFFF;
  border: 2px solid #E5E5E5;
  border-bottom-width: 4px;
  border-radius: 12px;
  color: #1CB0F6;
  font-weight: 700;
  padding: 12px 24px;
}
```

#### Danger Button (для удаления, важных действий)
```css
.button-danger {
  background: linear-gradient(180deg, #FF4B4B 0%, #EA2B2B 100%);
  border-bottom-color: #EA2B2B;
  color: #FFFFFF;
}
```

### Cards

#### Lesson Card
```css
.lesson-card {
  background: #FFFFFF;
  border: 2px solid #E5E5E5;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  padding: 24px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.lesson-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}
```

#### Section Card (для больших блоков)
```css
.section-card {
  background: #FFFFFF;
  border: 2px solid #E5E5E5;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 24px;
}

.section-card-header {
  background: linear-gradient(135deg, #1CB0F6 0%, #58CC02 100%);
  color: #FFFFFF;
  padding: 16px 24px;
}
```

### Progress Bars

```css
.progress-bar {
  background: #E5E5E5;
  border-radius: 999px;
  height: 12px;
  overflow: hidden;
  position: relative;
}

.progress-bar-fill {
  background: linear-gradient(90deg, #58CC02 0%, #78E002 100%);
  border-radius: 999px;
  height: 100%;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-bar-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 100%
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

### Badges & Tags

```css
.badge {
  background: #FFC800;
  border-radius: 8px;
  color: #000000;
  display: inline-flex;
  font-size: 14px;
  font-weight: 700;
  padding: 4px 12px;
  align-items: center;
  gap: 4px;
}

.badge--xp {
  background: #FFC800;
}

.badge--gem {
  background: #1CB0F6;
  color: #FFFFFF;
}

.badge--streak {
  background: #FF9600;
  color: #FFFFFF;
}
```

### Icons

Duolingo использует SVG иконки с:
- Размеры: 16px, 20px, 24px, 32px, 48px
- Stroke width: 2px
- Rounded caps и joins
- Яркие цвета с outline

### Avatars

```css
.avatar {
  background: linear-gradient(135deg, #1CB0F6 0%, #58CC02 100%);
  border-radius: 50%;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.avatar--sm { width: 32px; height: 32px; font-size: 14px; }
.avatar--md { width: 48px; height: 48px; font-size: 20px; }
.avatar--lg { width: 64px; height: 64px; font-size: 28px; }
```

## 🎬 Animations & Transitions

### Duration

```css
--duration-instant: 100ms;
--duration-fast: 200ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
--duration-slower: 800ms;
```

### Easing Functions

```css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Common Animations

```css
/* Fade In */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scale Pop */
@keyframes scalePop {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

/* Shake (для ошибок) */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

/* Success Pulse */
@keyframes successPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
```

## 📦 Border Radius

```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;
--radius-full: 999px;
```

## 🌑 Shadows

```css
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.12);
--shadow-xl: 0 12px 24px rgba(0, 0, 0, 0.15);
```

## 🎯 Layout

### Container

```css
.container {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 24px;
}
```

### Grid System

```css
.grid {
  display: grid;
  gap: 24px;
}

.grid--2 { grid-template-columns: repeat(2, 1fr); }
.grid--3 { grid-template-columns: repeat(3, 1fr); }
.grid--4 { grid-template-columns: repeat(4, 1fr); }

/* Responsive */
@media (max-width: 768px) {
  .grid--2, .grid--3, .grid--4 {
    grid-template-columns: 1fr;
  }
}
```

## 🎨 Illustrations & Characters

### Duo (талисман - сова)

**Использование:**
- Приветствие и мотивация
- Анимации успеха/ошибки
- Empty states
- Loading states

**Эмоции:**
- Happy (✓ успех)
- Sad (✗ ошибка)
- Thinking (? подсказка)
- Celebrating (🎉 достижение)
- Angry (💢 пропущен streak)

### SVG + Lottie

Duolingo активно использует:
1. **SVG** для статичных иллюстраций
2. **Lottie** (JSON) для анимаций
   - Легковесные
   - Векторные
   - Плавные анимации

## 📱 Responsive Design

### Breakpoints

```css
--breakpoint-xs: 375px;  /* Mobile small */
--breakpoint-sm: 640px;  /* Mobile */
--breakpoint-md: 768px;  /* Tablet */
--breakpoint-lg: 1024px; /* Desktop */
--breakpoint-xl: 1280px; /* Desktop large */
```

### Mobile-First Approach

```css
/* Base styles (mobile) */
.component {
  padding: 16px;
  font-size: 14px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .component {
    padding: 24px;
    font-size: 16px;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .component {
    padding: 32px;
    font-size: 18px;
  }
}
```

## 🎨 Figma Design Tokens

Duolingo публикует официальное руководство по дизайну:
**https://design.duolingo.com**

## 💡 Ключевые принципы дизайна

1. **Playful** - игривый, не серьёзный
2. **Colorful** - яркие цвета, позитив
3. **Friendly** - дружелюбный, не пугающий
4. **Clear** - понятный, не запутанный
5. **Rewarding** - вознаграждающий прогресс

## 🔄 Состояния компонентов

### Button States

```css
.button {
  /* Normal */
  opacity: 1;
  transform: scale(1);
  
  /* Hover */
  &:hover {
    filter: brightness(1.1);
    transform: scale(1.02);
  }
  
  /* Active/Pressed */
  &:active {
    transform: scale(0.98);
  }
  
  /* Disabled */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
  
  /* Loading */
  &.is-loading {
    color: transparent;
    position: relative;
  }
  
  &.is-loading::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border: 2px solid currentColor;
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 0.6s linear infinite;
  }
}
```

## 🎯 Применение для bro-learn-web

### Что взять:

1. ✅ Яркую цветовую палитру с зелёным акцентом
2. ✅ Rounded дизайн (16px+ border-radius)
3. ✅ Анимированные progress bars
4. ✅ SVG + Lottie для персонажей
5. ✅ Крупные, удобные кнопки
6. ✅ Семантическую цветовую систему

### Что адаптировать:

1. 🔄 Менее "детский" стиль (professional feel)
2. 🔄 Более консервативные цвета для бизнеса
3. 🔄 Меньше decorative элементов
4. 🔄 Более строгая типографика

---

**Источник**: https://www.duolingo.com + https://design.duolingo.com  
**Цель**: Адаптация для bro-learn-web
