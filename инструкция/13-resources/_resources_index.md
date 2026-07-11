# Resources — Индекс внешних ресурсов

> Каталог внешних ресурсов (курсы, туториалы, статьи), адаптированных для Loot Realms.

## Phaser 3

| Ресурс | Тип | Описание |
|--------|-----|----------|
| [Phaser — База и экосистема](phaser3/phaser-ecosystem.md) | docs, hub | Docs, Learn, Labs, Examples, Phaser 4 миграция |
| [Phaser + AI — Агенты и скиллы](phaser3/phaser-ai-agents.md) | github, article | phaser4-gamedev, Game Agent статья, .agents/skills |
| [Курсы по Phaser (RU)](phaser3/phaser-courses-ru.md) | course | TheDev.io (углублённый), CourseHunter (быстрый), Habr (базовый) |
| **[Phaser Examples — Хаб навигации](phaser3/phaser-examples-index.md)** | **local** | **5163 JS-файлов, маппинг на системы проекта** |
| **[Phaser API Docs — Хаб](phaser3/phaser-api-docs-index.md)** | **local** | **1971 файл, 62MB, полный API-справочник** |

### Локальные ресурсы (удалены из проекта для оптимизации)

> **Внимание:** Examples и Docs удалены из проекта чтобы opencode не индексировал 7000+ файлов.
> При необходимости переклонировать:

| Ресурс | Команда для клонирования | Содержимое |
|--------|------------------------|-----------|
| **Examples** | `git clone --depth 1 https://github.com/phaserjs/examples.git <path>` | 5163 JS-файлов |
| **API Docs** | `cd <path> && typedoc ./types/phaser.d.ts --out ./docs` | 1971 файл, 62MB |
| **Phaser Source** | `git clone --depth 1 --filter=blob:none --sparse --branch v3.80.0 https://github.com/phaserjs/phaser.git <path>` | Sparse checkout |

## Game Design

| Ресурс | Тип | Описание |
|--------|-----|----------|
| [Obsidian как база знаний для ИИ](gamedesign/obsidian-ai-knowledge-base.md) | guide, github | Методология PARA vs Zettelkasten, MOC, AI-интеграция |

## JavaScript / ES6

| Ресурс | Тип | Описание |
|--------|-----|----------|
| *Пока нет* | — | Добавляйте через скилл `knowledge-ingest` |

## Firebase / PeerJS

| Ресурс | Тип | Описание |
|--------|-----|----------|
| *Пока нет* | — | Добавляйте через скилл `knowledge-ingest` |

---

> Каждый ресурс связан с конкретными системами проекта через `[[ссылки]]` в своём файле.
