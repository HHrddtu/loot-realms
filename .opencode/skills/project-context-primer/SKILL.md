---
name: project-context-primer
description: >
  Run this skill at the very start of any new conversation or agent session
  before writing a single line of code. Loads project architectural decisions,
  conventions, known gotchas, and current task status so the agent operates
  with full context — not as a blank slate.
---

# Project Context Primer Skill

## When to Trigger

**Always run first** when:
- Starting a new conversation about Loot Realms
- A subagent is spawned to work on a module
- Picking up work after a gap of more than a day
- Someone says "помоги с проектом" without context

## Step-by-Step Process

### 1. Load the Knowledge Index

Read `инструкция/14-knowledge/INDEX.md` first.

Scan all rows for entries relevant to today's task. For each relevant row, follow the link and read the full note. Pay special attention to entries of type `decision` and `gotcha` — these prevent the most costly mistakes.

**If INDEX.md has no entries**, output this warning:
```
⚠️ Knowledge base пуста (INDEX.md не содержит записей).
Архитектурные решения, конвенции и ловушки пока не задокументированы.
Действие: Используй скилл `knowledge-base-update` в конце этой сессии.
```

### 2. Load the Project README

Read `README.md` — extract:
- What the project does (one sentence)
- Tech stack
- How to run locally
- How to build

### 3. Load Active Task Context

Check for these files:
```
инструкция/14-knowledge/CURRENT_TASK.md  ← Текущая задача
```

If CURRENT_TASK.md exists, treat it as ground truth.
If it does not exist, ask the user what today's task is.

### 4. Scan Project Structure

Run shallow directory listing (top 2 levels):
```
src/
  scenes/
  systems/
  config/
  zones/
```

### 5. Check for Active Rules

Read `AGENTS.md` for hard constraints.

### 6. Produce Context Summary

Before doing any task work, output:

```
## Context Loaded

**Project:** Loot Realms — PvE Adventure Loot Game
**Stack:** Phaser 3.80, Vite 8.x, Firebase 12.x, PeerJS 1.5.x, Vanilla JS
**Current Task:** <from CURRENT_TASK.md or user>
**Relevant Knowledge:** <list of loaded entries>
**Active Rules:** <from AGENTS.md>
**Ready to proceed:** Yes / No
```

Only after producing this summary should you begin the actual task.

## Rules

- **Never skip this skill** on a new session
- **Don't assume** — if README contradicts a knowledge entry, flag it
- **Update CURRENT_TASK.md** at the end of each session
- **If context is missing**, ask the user minimum questions needed

## Maintaining CURRENT_TASK.md

At the end of every session, update `инструкция/14-knowledge/CURRENT_TASK.md`:

```markdown
# Current Task

## What We're Building
<description>

## Status
<In Progress | Blocked | Review Needed | Done>

## Last Session Summary
<date> — <what was done>

## Next Steps
1. <next action>
2. <next action>

## Blockers
- <anything preventing progress>
```
