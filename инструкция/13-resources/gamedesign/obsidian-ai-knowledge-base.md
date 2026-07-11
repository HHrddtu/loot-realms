# Obsidian как база знаний для ИИ-агента

#resource #gamedesign #javascript

**Источник:** Сборник методологических ресурсов
**Тип:** article, github, guide
**Дата добавления:** 2026-07-10
**Статус:** Изучено по URL

## Ключевые идеи

### 1. Bill Mongan — Три канонических файла (ИЗУЧЕНО)
**billmongan.com/posts/2026/05/obsidian-ai-vault**

**Архитектура:**
```
vault/
├── AGENTS.md           # Инструкции для агентов (authoritative)
├── LLMMEMORIES.md      # Постоянная память для AI
├── SYSTEMPROMPT.md     # Системный промпт и偏好
├── raw/                # READ-ONLY входные документы
│   └── *.md, *.pdf
├── wiki/               # Организованный knowledge base
│   ├── index.md        # Хаб: обзор и активная работа
│   └── */
└── .obsidian/
    └── github-sync-metadata.json
```

**Ключевые принципы:**
- **Три зоны с строгими границами read/write:**
  - `raw/` — только чтение, агенты никогда не модифицируют
  - `wiki/` — агенты пишут и синтезируют
  - `.obsidian/` — только `github-sync-metadata.json`
- **AGENTS.md** — единственный файл, который читает любой AI при встрече с репо
- **LLMMEMORIES.md** — двунаправленная синхронизация: AI пишет обратно то, что узнал
- **SYSTEMPROMPT.md** — 12 секций: идентичность, стиль, доменные инструкции, confirmation gates

**Confirmation Gates (критично для Loot Realms):**
- 6 категорий действий требуют явного подтверждения перед выполнением
- Удаление файлов, внешние коммуникации, git операции, деплой, финансы, пакетные операции (>5 файлов)

**Wiki Linter:**
- 7-шаговый workflow для проверки целостности vault
- Проверка битых ссылок, метаданных, консистентности
- Консервативный: не пишет файлы без diffs

**Для Loot Realms:**
- Наша текущая архитектура уже соответствует: `AGENTS.md` есть
- Добавить `CURRENT_TASK.md` (уже есть)
- raw/ → `13-resources/` (сырые источники)
- wiki/ → `14-knowledge/` (синтезированные знания)

### 2. Ar9av/obsidian-wiki — Фреймворк для агентов (ИЗУЧЕНО)
**github.com/Ar9av/obsidian-wiki**

**Паттерн Karpathy's LLM Wiki:**
- Знание компилируется один раз в связанные заметки
- Не гоняется через RAG каждый раз
- Агент сам ведёт вики: заносит новое, чинит битые связи

**Скиллы:**
| Скилл | Описание |
|-------|----------|
| `wiki-setup` | Настройка нового vault |
| `wiki-ingest` | Парсинг сырого контента → wiki страницы |
| `wiki-query` | Запрос к wiki с цитатами |
| `wiki-lint` | Проверка на противоречия, пробелы, сироты |
| `wiki-colorize` | Раскраска графа по тегам |

**4 стадии обработки:**
1. **Ingest** — агент читает исходный материал
2. **Pull Information** — извлекает концепции, сущности, утверждения, связи
3. **Merge** — новое знание мёрджится с существующим (не дублируется)
4. **Schema** — схема эволюционирует из источников

**Дополнительные фичи:**
- **Delta tracking** — `.manifest.json` отслеживает что уже обработано
- **Provenance tracking** — каждое утверждение помечено: `extracted`, `^[inferred]`, `^[ambiguous]`
- **Graph export** — graph.json, graph.graphml, cypher.txt, graph.html
- **Tiered retrieval** — сначала читает titles/tags/summaries, потом bodies

### 3. mingrath/obsidian-ai-knowledge-agent — 4 подхода (ИЗУЧЕНО)
**github.com/mingrath/obsidian-ai-knowledge-agent**

**4 подхода к AI + Obsidian:**

| # | Подход | Для кого | Сложность |
|---|--------|----------|-----------|
| 1 | **Second Brain Building** | Потребители книг/YouTube | 6/10 |
| 2 | **Personal Search Engine** | Практики с 5-15 блогами | 4/10 |
| 3 | **AI Coding Vault** | Разработчики (экономия токенов) | 6/10 |
| 4 | **Karpathy's LLM Wiki** | Всё что копится без организации | **2/10** |

**Рекомендация:** Начать с подхода 4 (Karpathy's LLM Wiki) — самый быстрый результат.

**Структура:**
```
obsidian-ai-knowledge-agent/
├── skills/
│   ├── wiki-ingest/SKILL.md
│   ├── wiki-query/SKILL.md
│   ├── wiki-lint/SKILL.md
│   ├── vault-setup/SKILL.md
│   ├── vault-compare/SKILL.md
│   └── cross-vault-wire/SKILL.md
├── knowledge/          # Сырые источники (неизменяемые)
├── memory/
│   ├── wiki/           # Организованные wiki страницы
│   │   ├── index.md
│   │   ├── hot.md      # Недавний контекст
│   │   └── sources/
│   ├── log.md          # История операций
│   └── runtime/
│       └── context.md
```

**Реальные цифры:**
- 1 статья → 23 wiki страницы (10 мин обработка)
- 36 YouTube транскриптов → полная knowledge system (14 мин)
- 383 файла + 100 транскриптов → **95% снижение токенов**

**Cross-vault wiring:**
- Можно соединять несколько vault'ов через CLAUDE.md ссылки
- Каждый vault доступен из любого агента

### 4. DataScienceDojo — 9-шаговый гайд (ИЗУЧЕНО)
**datasciencedojo.com/blog/obsidian-ai-knowledge-base**

**Структура:**
- `raw/` — сырые источники
- `wiki/` — организованные страницы
- `Templates/` — шаблоны
- `AGENTS.md` — файл для AI-агента (первое что читает)
- MCP-подключение, автогенерация `.canvas` карт связей

## Практическое применение

### Наша текущая архитектура (соответствует):
```
инструкция/
  00-vision/          ← PARA: Vision
  01-tech/            ← PARA: Tech
  02-zones/           ← PARA: Zones (MOC)
  04-systems/         ← PARA: Systems (MOC)
  13-resources/       ← raw: Сырые источники
  14-knowledge/       ← wiki: Синтезированные знания
```

### Что уже делаем правильно:
- `AGENTS.md` — файл для AI-агента ✅
- `INDEX.md` — MOC (Map of Content) ✅
- Wikilinks `[[...]]` между заметками ✅
- Шаблоны `_templates/` для единообразия ✅
- `CURRENT_TASK.md` — отслеживание текущей задачи ✅

### Что можно улучшить (из изученных ресурсов):
1. **Delta tracking** — добавить `.manifest.json` для отслеживания обработанных источников
2. **Provenance tracking** — помечать каждое утверждение: `extracted`, `inferred`, `ambiguous`
3. **Wiki Linter** — регулярная проверка битых ссылок
4. **Tiered retrieval** — сначала читать titles/tags, потом bodies
5. **Компетентностный подход** — организации знаний как "что должен уметь агент" (из Phaser Game Agent)
6. **Не стремиться к идеальной структуре** — "мало вылизанных страниц лучше кучи фрагментов"

### Методология из Phaser Game Agent:
Организовать знания как **"что должен уметь агент"**:
- "Создаёт объект с физикой" → компонент
- "Стреляет очередью" → компонент
- "Спавнит по волнам" → компонент
- А НЕ: "Phaser спрайты", "Phaser твины" (это реф-мануал)

## Ссылки

| Ресурс | URL | Назначение |
|--------|-----|-----------|
| Bill Mongan | https://billmongan.com/posts/2026/05/obsidian-ai-vault | 3 канонических файла, architecture |
| Ar9av/obsidian-wiki | https://github.com/Ar9av/obsidian-wiki | Фреймворк-скилл для агента |
| mingrath | https://github.com/mingrath/obsidian-ai-knowledge-agent | 4 подхода, Karpathy LLM Wiki |
| DataScienceDojo | https://datasciencedojo.com/blog/obsidian-ai-knowledge-base | 9-шаговый гайд |
| Matt Matheson | ❌ 404 | PARA vs Zettelkasten (недоступен) |
| Karpathy LLM Wiki | https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f | Оригинальный gist |

## Связи

- [[инструкция/14-knowledge/INDEX|Knowledge Base]] — наша текущая система
- [[01-tech/ARCHITECTURE|Architecture]] — структура проекта
- [[04-systems/_systems_index|Systems]] — системы как компоненты-способности
- [[02-zones/_zones_index|Zones]] — зоны как MOC
- [[AGENTS|AGENTS.md]] — наш файл для агентов
