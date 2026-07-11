---
name: knowledge-ingest
description: >
  Use when the user provides a URL, video link, course text, or external resource.
  Parses the content, extracts key insights, adapts them for Loot Realms,
  and creates a structured note in инструкция/13-resources/ with links to
  existing project knowledge. Also updates _resources_index.md and INDEX.md.
---

# Knowledge Ingest Skill

## When to Trigger

- User shares a URL (YouTube, article, docs)
- User pastes course text or tutorial content
- User says "добавь этот ресурс" / "занеси это"
- User shares a link and asks to extract useful info

## Step-by-Step Process

### 1. Identify the Resource

Determine the category and type:

| Category | Trigger Keywords |
|----------|-----------------|
| `phaser3` | Phaser, game engine, sprites, physics, tweens, arcade |
| `gamedesign` | game design, balance, progression, loot, mechanics |
| `javascript` | JavaScript, ES6, async, modules, Node.js |
| `firebase-peerjs` | Firebase, Firestore, PeerJS, WebRTC, multiplayer |

### 2. Fetch and Parse Content

- For URLs: use `webfetch` tool to get content
- For pasted text: use directly
- Extract: title, key ideas, code examples, applicable patterns

### 3. Create the Resource Note

Write to: `инструкция/13-resources/<category>/<slug>.md`

Use template from `инструкция/14-knowledge/_templates/resource-template.md`:

```markdown
# [Название ресурса]

#resource #<category>

**Источник:** [URL]
**Тип:** video | article | course | docs
**Дата добавления:** YYYY-MM-DD

## Ключевые идеи

- Идея 1 → как применить в Loot Realms
- Идея 2 → связь с [[существующая_заметка]]

## Практическое применение

Как использовать в проекте. Конкретные примеры.

## Код-примеры

Адаптированный под Loot Realms код из ресурса.

## Связи

- Ссылки на 관련ные заметки проекта
```

**Rules:**
- `slug` = kebab-case из названия (e.g., `phaser-object-pooling-tutorial`)
- Каждая идея должна быть связана с конкретной системой проекта через `[[...]]`
- Код-примеры адаптировать под стек проекта (Phaser 3, ES modules, vanilla JS)
- Минимум 3 связи с существующими заметками

### 4. Update Indexes

After creating the note:

1. Add row to `инструкция/13-resources/_resources_index.md`:
   ```
   | YYYY-MM-DD | <тип> | [Название](<category>/<slug>.md) | Краткое описание |
   ```

2. Add row to `инструкция/14-knowledge/INDEX.md`:
   ```
   | YYYY-MM-DD | resource | [Название](../13-resources/<category>/<slug>.md) | Краткое описание |
   ```

### 5. Report to User

After completing, report:
- What was saved and where
- Key insights extracted
- Which project systems are affected
- Links added to knowledge base

## File Naming

- `slug` format: `descriptive-kebab-case`
- Examples:
  - `phaser-object-pooling-guide.md`
  - `game-balance-loot-distribution.md`
  - `es6-module-patterns.md`
  - `firebase-offline-sync.md`

## Constraints

### MUST DO
- Always link to at least 3 existing project notes
- Adapt code examples to project conventions (ES modules, Phaser 3)
- Include practical "how to apply in Loot Realms" section
- Update both indexes after creating note

### MUST NOT DO
- Create notes without linking to existing knowledge
- Copy raw content without adapting for the project
- Skip index updates
- Create duplicate notes for the same resource
