# Handoff Next Agent — Loot Realms

> Ветка: `autopilot`
> Версия: `0.16.0`
> Срез: 2026-11-01
> Контекст проекта: `docs/LOOT_REALMS_MINI_CONTEXT.md` (кратко), `docs/LOOT_REALMS_CONTEXT_PACK.md` (полно).

## 1. Что уже сделано в этой сессии

Не переделывать без причины. Сначала проверить `git log`.

| Коммит | Что |
|--------|-----|
| `4d8faec` | Починены vitest-тесты, alias Phaser-мока |
| `2e1afcc` | Порталы/лестницы и прогресс боссов сохраняются |
| `c8b0920` | Release 1: hit-stop, крит-фидбек, config-driven XP/апгрейды, `completedZones` |
| `273ff19` | Соло-статус-комбо, элитники, first-clear награды, zone/quest clear бонусы, авто-квесты |
| `5bcad08` | Тесты на статус-комбо и first-clear |
| `fc7bbdd` | `cheatDeath`, `regenOnLow`, `drOnHit`, `transmuteOnKill` |
| `7ed48d7` | Немедленный пересчёт статов после наград |

Проверки на момент передачи:

```bash
npm run build   # проходит
npm test        # 66/66
```

## 2. Где что находится

- Соло-комбо по статусам: `src/systems/CombatCore.js`, `hitEnemy()` + `_statusBurst()`.
- Элитники: `src/scenes/GameScene.js`, `_promoteZoneElite()`.
- Элитный лут: `src/systems/CombatLoot.js`, `killEnemy()`.
- First-clear награды: `src/systems/CombatLoot.js`, `_grantFirstClear()`.
- Пассивки за зоны/квесты: `src/systems/PlayerSystem.js`, `recalcStats()`.
- Авто-квесты: `src/quests.js`, `ZONE_MAIN_QUESTS` + `autoAcceptZoneQuest()`.
- Вызов авто-квестов: `src/scenes/GameScene.js`, `_setupZone()`.
- Сохранение прогресса: `src/systems/SaveLoadSystem.js`, `firstClearZones` + `completedZones`.
- Конфиг новых чисел: `src/config/balance.js`, `src/config/index.js`.

## 3. Что осталось

### 3.1 Жёсткий квест-гейт порталов

Сейчас квесты автоматически берутся и дают силу, но переходы не блокируют.

Задача:

- Сделать так, чтобы основной квест зоны был обязательным условием перехода дальше.
- Использовать `ZONE_MAIN_QUESTS` в `src/quests.js`.
- Точка входа: `GameScene._setupZone()`.
- Не сломать старые сейвы: если квест не взят/недоступен, не блокировать навсегда.
- Перед блокировкой показать понятное сообщение и подсказку, где взять/сдать квест.

Файлы:

- `src/quests.js`
- `src/scenes/GameScene.js`
- `src/systems/SaveLoadSystem.js` (если нужен флаг миграции)
- `src/config/quests.js` (только если нужно менять условия)

Критерии:

- Без завершённого main-quest переход блокируется.
- Старый сейв не превращается в кирпич.
- `npm run build` и `npm test` проходят.

### 3.2 Уникальная механика для зон

Сейчас зоны отличаются декором, боссом, элитником и цифрами, но не core-механикой.

Начать с двух самых слабых: **Desert** и **Swamp**.

Идеи:

- Desert: периодическая песчаная буря — видимость/скорость, телеграф и HUD-подсказка.
- Swamp: ядовитые лужи/замедление, безопасные островки.

Файлы:

- `src/zones/DesertZone.js`
- `src/zones/SwampZone.js`
- `src/config/zones.js` или новый `src/config/zoneHazards.js`
- `src/config/index.js`

Критерии:

- У Desert и Swamp есть отдельная игровая механика, а не только цифры.
- Механика читается визуально и не требует новых внешних ассетов.
- Build + tests проходят.

### 3.3 Сокращение/объединение зон

Не удалять зоны без данных. Сначала измерить:

- среднее время зоны;
- долю игроков, доходящих до следующей;
- сколько зон проходят повторно.

Если данных нет — не трогать структуру. Вместо удаления можно:

- усилить различия через 3.2;
- убрать дублирующиеся спавнеры;
- объединить общие куски в `BaseZone`/общий spawner.

Файлы:

- `src/zones/*`
- `src/systems/BaseZone.js`
- `src/config/zones.js`

### 3.4 Сжатие деревьев талантов

Проблема: много узлов вида `+3–5%`, из-за чего рост не ощущается.

Задача:

- Убрать часть filler-узлов.
- Оставить качественные эффекты: pierce, splash, echo, cheat death, summons.
- Сохранить общий бюджет силы.

Файлы:

- `src/config/talents.js`
- `src/scenes/TalentScene.js`
- `src/talents.js`
- `src/systems/PlayerSystem.js`

Критерии:

- Меньше узлов, но каждый заметен.
- Нет мёртвых эффектов: если эффект объявлен, он читается в коде.
- Build + tests проходят.

### 3.5 Анимации атак и смерти

Сейчас есть 3-кадровые attack-анимации игроков, у большинства мобов — только walk. Ударный VFX — tween-спрайты.

Задача:

- Добавить attack-анимации хотя бы для 3–5 типов мобов.
- Добавить death-VFX/анимацию для мобов и боссов.
- Не ломать hit-stop и `_impactFeedback`.

Файлы:

- `src/textures/animations.js`
- `src/config/animations.js`
- `src/systems/CombatCore.js`
- `src/systems/CombatLoot.js`

Критерии:

- Новые анимации воспроизводятся в бою.
- Нет визуальных артефактов и утечек.
- Build + tests проходят.

## 4. Известные ловушки

- `getTalentEffects()` в `src/talents.js` мержит только ключи из дефолтного объекта. Новые флаги без добавления в дефолт будут молча теряться.
- `getSetBonuses()` суммирует boolean-флаги как числа. Многие сет-флаги (`dragonBreath`, `divineShield`, `spellEcho` и др.) всё ещё не читаются.
- Hit-stop использует `physics.pause()`; проверять вручную, не конфликтует ли с меню/диалогами/смертью.
- `_promoteZoneElite()` выбирает случайного моба после `setup()`. Если зона спавнит мобов позже, элитник не появится.
- First-clear не выдаётся за Village Boss, потому что у него split-фаза. Если добавлять — обрабатывать split отдельно.
- `completedZones` теперь пишется, но `MapScene` использует сохранение, а не состояние сцены.
- `QuestTracker` и `systemQuests` всё ещё не подключены.
- Achievements отсутствуют, хотя старые доки могут утверждать обратное.

## 5. Правила

- Сначала прочитать `AGENTS.md` и `docs/LOOT_REALMS_MINI_CONTEXT.md`.
- Все числа — в `src/config/*.js`.
- Зоны — через `BaseZone`, `super.clear()`.
- После `destroy()` обнулять ссылки.
- Не добавлять новую зону/класс/PvP до усиления core loop.
- После изменений: `npm run build`, `npm test`.
- Не переписывать уже сделанные механики без причины.

## 6. Ручная проверка

```bash
npm run dev
```

Проверить:

1. Hit-stop и крит-фидбек в Forest.
2. Элитника и его лут.
3. Статус-комбо: поджечь/заморозить → ударить.
4. First-clear награду после босса.
5. Рост HP/DMG после зачистки зоны и сдачи квеста.
6. Повторный вход в Tower/Depths/Cursed/Shadow — порталы на месте.
