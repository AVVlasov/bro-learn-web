## Project Overview

React приложение для интерактивного обучения работе с Large Language Models (LLM) в профессиональной деятельности и повседневной жизни. Концепция основана на геймификации по принципу Duolingo, но адаптирована для изучения практических навыков применения AI-инструментов.

## Tech Stack

- **Backend**: nodejs 22.21+, express, MongoDB, Docker
- **Frontend**: React 19+, TypeScript, Webpack, @chakra-ui/react, RTK Query, i18next, Lottie, @brojs/cli
- **Testing**: jest, Playwright
- **No authentication** - local single-user application

## Project Structure

```
bro-learn-web/
├── src/
├── stubs/
```
## Commands
```bash
npm start
```
## MCP Servers
Use MCP_DOCKER MCP for:
- работа с mongodb

## Reference Documentation

Read these documents when working on specific areas:

| Document | When to Read |
|----------|--------------|
| `.claude/PRD.md` | Understanding requirements, features, API spec |
| `.claude/reference/react-frontend-best-practices.md` | Components, hooks, state management, forms |
| `.claude/reference/express-backend-best-practices.md` | Express API, routing, error handling, validation |
| `.claude/reference/mongodb-best-practices.md` | MongoDB operations, MCP tools, data modeling |

## Resources

- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Chakra UI v3](https://www.chakra-ui.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Специальные правила
- Не останавливайся если есть ошибки на UI
- Проверяй что все ключи локализации имеют текстовки
- Проверяй что все API выдают статус 200
- Не заканчивай работу если есть любые ошибки, строй план выполнения задач 
- Все API должны данные хранить в базе данных, никаких моков и глобальных переменных
- Текущая база данных MongoDB поднята в Docker
- На изменение автотестов на работающий функционал запрашивай подтверждение
- Не создавай инструкции, summary, report, документацию о внесенных изменениях
- Не делай файлы с примерами
- Запрещено создавать файлы типа: *REPORT*, *SUMMARY*, *DOCS*, *CHECKLIST*, *EXAMPLES*, *README*
- **НЕ создавай никакие файлы в корне проекта**
- При проверке или доработке API используй MCP MongoDB
- Не используй автотесты для поиска проблем, используй браузер
запуск проекта
npm start

после запуска проект будет расположен по адресу http://localhost:8099/bro-learn-web
все API работает и проксируется по адресу http://localhost:8099/api


не исправляй файлы из папки @stubs/ в powershell или в терминале, не надо перезагружать сервер, там есть hot reload

нельзя трогать в bro.config.js .api ключ

не используй в js и typescript стиль кода от языка Python используй mcp context7 для получения code convention и code style проекта согласно тех стеку

не останавливайся если есть ошибки на ui, проверяй что все ключи локализации имеют текстовки

проверяй что все api выдают статус 200

не заканчивай работу если есть любые ошибки, строй план выполнения задач

все api должны данные хранить в базе данных, никаких моков и глобальных переменных, текущая база данных mongoDB которая поднята в doker

тестируй после внесения изменений используя браузер и пиши автотесты на playwright по функционалу который работает

на изменение автотестов на работающий функционал запрашивай подтверждение от пользователя

не создавай инструкции, summary, report

используй в качестве документации по написанию тестов @https://testing-library.com/

при проверке и доработке API используй mcp MongoDB

Node.js не кэширует старые модули, на нем стоит хот релоад папки api

не редактируй файлы проекта в терминале не создавай документацию о внесенных изменениях не используй автотесты для поиска проблем, используй браузер не используй хардкорные пути /api используй значение ключа из bro.config

