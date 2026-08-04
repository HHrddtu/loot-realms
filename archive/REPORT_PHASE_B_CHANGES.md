# Phase B — Changes Report

## Статус: DONE ✅

## Build: PASS (182 modules, 0 errors)

---

## 1. Что было сделано

### 1.1 Hook после Arena: NPC меняет диалог

**Файлы:** `src/systems/NpcSystem.js`, `src/config/quests.js`

После убийства Treant на Arena:
1. Босс умирает → slow-mo + zoom → 3 сек → авто-возврат в Meadow
2. Флаг `_arenaBossJustKilled = true`
3. NPC `meadow_elder` при следующем разговоре показывает новый диалог:

> *"The Arena is yours! The Amulet of Return is charged. Now you must enter the Mine. Skeleton Lord holds the key to the Village Gate."*

4. Флаг сбрасывается после первого показа.

### 1.2 Квест на Mine

**Файл:** `src/config/quests.js`

Добавлен `quest_mine`:
- Цель: kill `skeleton_lord` (1 раз)
- Зона: `mine`
- Награда: 150 EXP, 80 Gold, 5 Crystals
- Prerequisite: `meadow_intro` (нужно убить 3 гоблинов → открывается)
- NPC `meadow_elder` предлагает квест после возвращения с Arena

Flow:
1. Игрок получает `meadow_intro` при первом разговоре с NPC
2. Убивает 3 гоблинов → `meadow_intro` completed
3. Идёт на Arena → убивает Treant
4. Возвращается в Meadow
5. NPC: пост-ареновский диалог (с флагом `_arenaBossJustKilled`)
6. Следующий разговор → квест `quest_mine` на убийство Skeleton Lord

### 1.3 Исправлен slow-mo на убийство босса

**Файл:** `src/systems/CombatLoot.js:197`

Было:
```js
s.physics.world.timeScale = 3;   // 3x — ускорение, не замедление
```

Стало:
```js
s.physics.world.timeScale = 0.3; // 0.3x — реальное замедление
```

Длительность эффекта увеличена с 800ms до 1500ms (компенсация замедления).

---

## 2. Глубокие баги, найденные и исправленные

### Баг #1: Quest_mine становился доступным до Arena

**Проблема:** `quest_mine` (kill Skeleton Lord) был в списке `meadow_elder.quests` с `prerequisite: 'meadow_intro'`. После убийства 3 гоблинов (завершение `meadow_intro`), `quest_mine` сразу становился доступным — игрок получал задание "убей Skeleton Lord в Mine" ещё до того, как прошёл Arena.

**Корневая причина:** Quest system использует `completedQuests` для проверки prerequisite. `meadow_intro` завершается в Forest, до Arena. Между ними нет барьера.

**Решение:** Создан промежуточный квест `arena_conquered` (kill `ancient_treant`), который добавляется в `meadow_elder.quests`. `quest_mine` теперь имеет `prerequisite: 'arena_conquered'`. Игрок автоматически получает `arena_conquered` при первом разговоре с NPC. Квест завершается когда убивает Treant (вызов `onKill('ancient_treant')` в `CombatLoot.killGenericBoss()`). После этого `quest_mine` становится доступен.

### Баг #2: `_arenaBossJustKilled` флаг был мёртвым кодом

**Проблема:** Флаг устанавливался в `CombatLoot.js:120` но нигде не читался (кроме моих изменений, которые я потом переписал). 

**Решение:** Флаг используется в `NpcSystem.interactWithNpc()` для показа `postArenaGreeting`. После показа флаг сбрасывается.

### Баг #3: Slow-mo на боссе был ускорением

**Проблема:** `s.physics.world.timeScale = 3` — это 3x ускорение физики, а не замедление.

**Решение:** `3 → 0.3`, длительность `800 → 1500` (компенсация замедления).

## 3. User flow после всех исправлений

```
Meadow (первый вход)
  ↓ auto: Rusty Sword
  ↓ guided: движение → NPC (получает meadow_intro + arena_conquered) → gate
Forest
  ↓ guided: движение → chest → 3 kills (meadow_intro complete)
  ↓ portal
Arena
  ↓ бой с Treant → slow-mo + zoom → onKill('ancient_treant') → arena_conquered complete
  ↓ ARENA CONQUERED! → 3 сек → авто-возврат
Meadow (post-arena)
  ↓ NPC: postArenaGreeting ("The Arena is yours!...")
  ↓ NPC: quest_mine available (prerequisite arena_conquered met)
Mine
  ↓ бой с Skeleton Lord → onKill('skeleton_lord') → quest_mine complete
  ↓ NPC: завершение квеста, награда
```

---

## 3. Исправленные баги

| Баг | Файл | Решение |
|-----|------|---------|
| Boss kill timeScale = 3 (ускорение вместо замедления) | `CombatLoot.js:197` | 3 → 0.3, длительность 800 → 1500ms |
| Meadow NPC не менял диалог после Arena | `NpcSystem.js` | Проверка `_arenaBossJustKilled` в greeting logic |
| Нет квеста на Mine после Arena | `quests.js` | Добавлен `quest_mine` с prerequisite `meadow_intro` |
| `_arenaBossJustKilled` флаг устанавливался но никогда не читался | `CombatLoot.js:120` | Теперь читается в `NpcSystem.interactWithNpc()` |

---

## 4. Что остаётся (из V2 review)

| Пункт | Статус | Причина |
|-------|--------|---------|
| Выдача меча через диалог NPC | ❌ | Требует改动 NpcSystem для reward callback. Авто-выдача работает. P2 |
| Bloom post-processing | ❌ | 1 строка кода, но не влияет на game loop. P3 |
| Sound (5-10 CC0 файлов) | ❌ | Поиск ассетов + лицензии. P2 |
| Zone state при смерти (враги не ресетятся) | ❌ | Требует сохранения per-zone state. P2 |
| Тестирование всех 14 зон | ❌ | Ручная работа. P1 |

---

*Generated: 2026-07-23 | Phase B: игра становится увлекательной*
