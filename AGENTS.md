# Loot Realms — Agent Guide

#agents #docs

> [!INFO] Смотри также
> - [[инструкция/RULES|Правила разработки]] — основной документ с правилами
> - [[инструкция/ORIENTATION|ORIENTATION]] — ориентация по проекту
> - [[README]] — карта содержимого
> - [[инструкция/14-knowledge/INDEX|Knowledge Base]] — индекс знаний проекта

## Обязательный старт сессии

**Каждая новая сессия** начинается с загрузки контекста:
1. Прочитать `инструкция/14-knowledge/INDEX.md`
2. Загрузить relevant entries для текущей задачи
3. Проверить `инструкция/14-knowledge/CURRENT_TASK.md`
4. Вывести Context Summary перед началом работы

## Knowledge Base

Хранилище знаний проекта: `инструкция/14-knowledge/`

| Тип | Описание | Когда использовать |
|-----|----------|-------------------|
| `decision` | Архитектурные решения | Выбор технологии, паттерна, подхода |
| `convention` | Паттерны кода | Именование, структура файлов |
| `gotcha` | Ловушки API | Тонкости Phaser, Firebase, PeerJS |
| `bug` | Исправленные баги | Корневая причина + решение |
| `resource` | Внешние ресурсы | Курсы, туториалы, статьи |

**Скиллы для работы с knowledge base:**
- `knowledge-ingest` — добавление внешних ресурсов (URL/текст → заметка)
- `knowledge-base-update` — запись нового знания
- `project-context-primer` — загрузка контекста в начале сессии

Индексы:
- `инструкция/14-knowledge/INDEX.md` — все знания
- `инструкция/13-resources/_resources_index.md` — внешние ресурсы

## Project
**Loot Realms** — браузерная PvE-игра про лут и приключения.

### Технологический стек
- **Phaser 3.80** — игровой движок
- **Vite 8.x** — сборка и dev-сервер
- **Firebase 12.x** — аутентификация, облачные сохранения
- **PeerJS 1.5.x** — P2P мультиплеер
- **Vanilla JavaScript (ES modules)**

### Структура
- `src/main.js` — точка входа
- `src/scenes/` — сцены Phaser
- `src/systems/` — игровые системы
- `src/config/` — конфигурация
- `src/textures/` — ассеты
- `src/*.js` — модули верхнего уровня (auth, save, firebase, multiplayer, talents, bestiary, crafting и т.д.)
- `index.html` — HTML-оболочка и глобальные стили
- `vite.config.js` — Vite (base: './', outDir: 'dist')

### Скрипты
```bash
npm run dev    # запуск dev-сервера
npm run build  # production-сборка в dist/
```

