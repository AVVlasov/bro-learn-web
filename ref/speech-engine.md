# Речевой движок Duolingo

## Обзор

Duolingo использует речевые технологии для обучения произношению и понимания на слух. Система включает в себя синтез речи (TTS) и распознавание речи (STT).

## Технологии синтеза речи (TTS)

### Наблюдаемые паттерны

1. **Audio API запросы**
   - Обнаружены запросы к `/tts/` эндпоинтам
   - Аудио файлы кешируются для повторного использования
   - Поддержка разных голосов и языков

2. **Формат аудио**
   - MP3 формат для веб-версии
   - Оптимизированные размеры файлов
   - Предзагрузка аудио для плавного опыта

### Возможные решения для реализации

1. **Web Speech API**
   ```javascript
   const synth = window.speechSynthesis;
   const utterance = new SpeechSynthesisUtterance(text);
   utterance.lang = 'en-US';
   utterance.rate = 0.9;
   synth.speak(utterance);
   ```

2. **Cloud TTS сервисы**
   - Google Cloud Text-to-Speech
   - Amazon Polly
   - Microsoft Azure Speech
   - IBM Watson Text to Speech

3. **Open-source решения**
   - Mozilla TTS
   - Coqui TTS
   - eSpeak NG (базовое качество)

## Технологии распознавания речи (STT)

### Наблюдаемые паттерны

1. **Микрофонные упражнения**
   - Запись аудио через браузер
   - Отправка на сервер для анализа
   - Оценка правильности произношения

2. **Обработка**
   - Асинхронная обработка записи
   - Визуальная индикация записи (анимация)
   - Обратная связь в реальном времени

### Возможные решения для реализации

1. **Web Speech API - Recognition**
   ```javascript
   const recognition = new webkitSpeechRecognition();
   recognition.lang = 'en-US';
   recognition.continuous = false;
   recognition.interimResults = false;
   
   recognition.onresult = (event) => {
     const transcript = event.results[0][0].transcript;
     validatePronunciation(transcript);
   };
   
   recognition.start();
   ```

2. **Cloud STT сервисы**
   - Google Cloud Speech-to-Text
   - Amazon Transcribe
   - Microsoft Azure Speech
   - Rev.ai

3. **Open-source решения**
   - Vosk (offline recognition)
   - Mozilla DeepSpeech
   - Whisper (OpenAI)

## Интеграция в упражнения

### Типы речевых упражнений

1. **Повторение фразы**
   - Прослушивание → Запись → Сравнение
   - Оценка точности произношения

2. **Чтение вслух**
   - Показ текста → Запись пользователя
   - Проверка соответствия тексту

3. **Аудирование**
   - Прослушивание → Выбор правильного варианта
   - Или ввод услышанного текста

## Компоненты UI для речевых функций

### Audio Player Component
```typescript
interface AudioPlayerProps {
  audioUrl: string;
  speed?: number; // 0.5, 1.0, 1.5
  autoPlay?: boolean;
  showControls?: boolean;
}
```

### Microphone Component
```typescript
interface MicrophoneProps {
  onRecordingComplete: (audioBlob: Blob) => void;
  maxDuration?: number;
  visualFeedback?: boolean;
}
```

### Audio Visualizer
- Визуализация звуковой волны при записи
- Индикация уровня громкости
- Анимация при воспроизведении

## Технические требования

### Браузерная поддержка
- MediaRecorder API для записи
- Web Audio API для обработки
- getUserMedia для доступа к микрофону

### Разрешения
- Запрос доступа к микрофону
- Обработка отказа в разрешении
- Fallback для браузеров без поддержки

### Производительность
- Оптимизация размера аудио файлов
- Кеширование TTS результатов
- Сжатие перед отправкой на сервер

## Алгоритм оценки произношения

### Метрики качества
1. **Фонетическое сходство**
   - Сравнение фонем эталона и записи
   - Использование IPA (International Phonetic Alphabet)

2. **Темп речи**
   - Скорость произношения
   - Паузы между словами

3. **Интонация**
   - Мелодика фразы
   - Ударения

### Обратная связь пользователю
- Зеленый: отлично (95-100%)
- Желтый: хорошо (80-94%)
- Красный: попробуйте еще раз (<80%)
- Подсветка неправильных слов

## API структура (предполагаемая)

### TTS endpoint
```
POST /api/tts
{
  "text": "Hello, world!",
  "language": "en-US",
  "speed": 1.0,
  "voice": "neural"
}

Response:
{
  "audioUrl": "https://cdn.duolingo.com/audio/xxx.mp3",
  "duration": 2.5
}
```

### STT endpoint
```
POST /api/stt
Content-Type: multipart/form-data

audio: [binary audio data]
language: en-US
expectedText: "Hello, world!"

Response:
{
  "transcript": "Hello, world!",
  "confidence": 0.95,
  "pronunciation_score": 92,
  "feedback": [
    {
      "word": "Hello",
      "correct": true,
      "score": 95
    },
    {
      "word": "world",
      "correct": true,
      "score": 89
    }
  ]
}
```

## Рекомендации для реализации

### Этап 1: Базовая функциональность
1. Интеграция Web Speech API для быстрого прототипа
2. Простое воспроизведение и запись
3. Базовая валидация через text matching

### Этап 2: Улучшение качества
1. Интеграция cloud TTS/STT для лучшего качества
2. Кеширование аудио файлов
3. Улучшенная оценка произношения

### Этап 3: Продвинутые функции
1. Фонетический анализ
2. Персонализированная обратная связь
3. Адаптивная сложность
4. Офлайн режим с предзагруженными аудио

## Ключевые особенности Duolingo

1. **Качество голосов**
   - Использование нейронных TTS
   - Естественное звучание
   - Разные голоса для разнообразия

2. **Адаптивность**
   - Регулировка скорости воспроизведения
   - Возможность повторного прослушивания
   - Подсказки при неправильном произношении

3. **Игровая механика**
   - Очки за правильное произношение
   - Прогресс-бар для речевых упражнений
   - Поощрение регулярной практики

## Аналитика

### Метрики для отслеживания
- Процент завершения речевых упражнений
- Средний балл произношения
- Количество повторных попыток
- Время выполнения упражнения
- Типы ошибок (по фонемам/словам)

### Использование для адаптации
- Определение проблемных звуков
- Персонализация сложности
- Рекомендации дополнительных упражнений
