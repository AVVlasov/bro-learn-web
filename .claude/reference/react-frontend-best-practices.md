# React Frontend Best Practices Reference

A concise reference guide for building modern React applications.

---

## Table of Contents

1. [Project Structure](#1-project-structure)

---

- После запуска проект доступен по адресу [http://localhost:8099/assessment-tools](http://localhost:8099/assessment-tools)
- Все API проксируется через [http://localhost:8099/api](http://localhost:8099/api)
- **Hot Reload**: изменения применяются автоматически, не перезагружай сервер
- **No Authentication**: single-user приложение, не требует авторизации
- **Не используй Python-style** в JavaScript/TypeScript коде
- **MCP Context7**: используй для получения актуальной документации по библиотекам
- **MCP MongoDB**: используй для проверки и отладки API
- **Browser First**: всегда проверяй через браузер, не через автотесты
- **Не останавливайся при ошибках**: строй план и исправляй все проблемы
- **MongoDB Only**: все данные в БД, никаких моков или глобальных переменных
- **Запрещено создавать**: *REPORT*, *SUMMARY*, *DOCS*, *CHECKLIST*, *EXAMPLES*, *README* в корне
- **Testing Library**: используй [@testing-library.com](https://testing-library.com/) для тестов

### ВАЖНО: Работа с API путями

- **НИКОГДА не хардкодь `/api**` в коде!
- Всегда используй `URLs.apiBase` из `src/__data__/urls.ts`
- В API файлах импортируй: `import { URLs } from '../urls'`
- В createApi используй: `baseQuery: fetchBaseQuery({ baseUrl: URLs.apiBase })`
- Значение берется из `bro.config.js` ключ `'assessment-tools.api': '/api'`
- Это позволяет легко менять базовый путь API без правки кода

### Правила контрастности и читаемости

- **НЕ допускай светлых шрифтов на светлом фоне или темных на темном**
- **Всегда следи за высокой контрастностью шрифтов и иконок**
- На темном фоне (#0A0A0A, #1A1A1A, #2A2A2A):
  - Используй белый текст (#FFFFFF, white)
  - Для второстепенного текста: #E0E0E0, #D0D0D0, #B0B0B0 (не темнее!)
  - Для акцентов: #D4FF00 (лайм), #FF4444 (красный для ошибок/удаления)
  - Иконки должны быть яркими: white, #D4FF00, #FF4444, #4CAF50
- На светлом фоне:
  - Используй темный текст (#0A0A0A, #1A1A1A)
  - Для второстепенного текста: #666666, #555555 (не светлее!)
- Проверяй контрастность всех интерактивных элементов:
  - Кнопки должны быть четко видны
  - Иконки (редактирования, удаления, действий) должны иметь яркие цвета
  - При hover состояниях контрастность должна усиливаться
- Избегай серых иконок (#666666 и темнее) на темном фоне
- Для критичных действий (удаление) используй красный (#FF4444) на темном фоне

## Code Standards

### TypeScript

- Строгая типизация во всех слоях (tsconfig strict: true).
- Явная типизация возвращаемых значений.
- Классификация типов: @types/ для глобальных, src/types/ для модульных.
- Не использовать `any` без спец. причины и комментария.

### Redux + RTK Query

- Одна папка **data**/ для данных и Redux-слоев.
- API клиенты в `src/__data__/api/`, slices в `src/__data__/slices/`.
- Использовать tagTypes для кэширования, invalidate для мутаций.
- Все endpoints должны быть типизированы.
- **ВАЖНО**: Не хардкодить `/api`, использовать `URLs.apiBase` из `src/__data__/urls.ts`

### UI/Styling

- Chakra UI как основной компонентный фреймворк.
- Emotion — только для сложных кейсов/анимаций.
- Предпочитать theme-токены и responsive-массивы Chakra.

### Интернационализация

- Локализация хранится в `locales/`
- Подключение через @brojs/i18nextconfig и хуки i18next
- Все тексты и кнопки должны быть ключами перевода

### Соглашения

- components: максимум 200 строк, тесты рядом (Component.tsx, Component.test.tsx)
- pages: соответствуют маршрутам bro.config.js
- assets: только то, что реально нужно в UI/production

# Chakra UI v3 Rules

используй mcp chakra-ui

---