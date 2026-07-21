# Loot Realms — Agent Guide

#agents #docs

> [!INFO] Смотри также
> - [[инструкция/RULES|Правила разработки]] — основной документ с правилами
> - [[инструкция/ORIENTATION|ORIENTATION]] — ориентация по проекту
> - [[README]] — карта содержимого
> - [[инструкция/14-knowledge/INDEX|Knowledge Base]] — индекс знаний проекта

## Обязательный старт сессии

**Каждая новая сессия** начинается с загрузки контекста:
1. Прочитать `инструкция/01-tech/QUICK_START.md` (если первый вход в проект)
2. Прочитать `инструкция/14-knowledge/INDEX.md`
3. Загрузить relevant entries для текущей задачи
4. Проверить `инструкция/14-knowledge/CURRENT_TASK.md`
5. Вывести Context Summary перед началом работы

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

### КРИТИЧЕСКОЕ ПРАВИЛО: AI-generated code

> [!DANGER]
> **НИКОГДА** не добавляй крупные игровые механики без явного запроса разработчика.
> В 2026-07-18 AI сгенерировал систему defense waves (5 волн врагов в деревне)
> и добавил в uncommitted changes без ведома разработчика. Это сломало базовую
> логику зоны. Код был удалён.
>
> **Если ты считаешь что нужна новая механика — СПРОСИ СНАЧАЛА.**

### Anti-Patterns (не повторять)

| Паттерн | Почему плохо | Решение |
|---------|-------------|---------|
| **Buff without consumption** | Бафф сеттится, но никогда не читается в формуле → косметика, вводит в заблуждение | Если сеттится `_someBuff`, должен быть код его чтения в `CombatCore`, `SpellCast`, `PlayerSystem` |
| **Orphaned scene refs** | `s.someObject` не обнулён после destroy → краш при следующей зоне | После `obj.destroy()` всегда `s.obj = null` |
| **removeAllEvents()** | Убивает ВСЕ таймеры сцены, включая чужие | Не полагаться на таймеры для критических флагов. См. `convention-zone-cleanup` |
| **Magic numbers in code** | Баланс невозможно найти/изменить в одном месте | Все параметры в `src/config/*.js`. См. `convention-config-driven` |
| **Zone code in GameScene** | GameScene растёт, зоны не изолированы | Выносить логику зон в `src/zones/`. См. `convention-zone-file-structure` |
| **Zone cleanup without BaseZone** | Дублирование кода, пропущенные шаги | Наследовать `BaseZone`, вызывать `super.clear()`. См. `convention-zone-cleanup` |

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

