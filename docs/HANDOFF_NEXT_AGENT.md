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

### 3.1 Жёсткий квест-гейт порталов — СДЕЛАНО

Реализовано в `checkZoneTransitionGate()` (`src/quests.js`) и вызывается из `GameScene._setupZone()`.

- Блокируются только переходы вперёд по `ZONE_ORDER`; возврат назад и side-зоны (`hell`, `snowy`, `castle`, `desert`, `swamp`) не блокируются.
- Гейтит boss-квест зоны из `ZONE_MAIN_QUESTS` (objective complete, turn-in не обязателен).
- Если квест недоступен (не выполнены prerequisite) или босс уже мёртв — переход разрешается, objective кредитуется.
- При блоке показывается баннер с прогрессом и подсказкой NPC.
- Добавлен `onKill()` для боссов Depths/Cursed/Shadow/Tower/Throne/Village, иначе quests не прогрессировали.
- Тесты: `tests/questGate.test.js` (7). Всего 73/73, build проходит.

Исходная задача (для истории):

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

### 3.2 Уникальная механика для зон — СДЕЛАНО (Desert + Swamp)

- `src/config/zoneHazards.js` (+ экспорт из `config/index.js`): `DESERT_SANDSTORM`, `SWAMP_HAZARD`.
- Desert: циклическая песчаная буря с телеграфом, экранным затемнением, частицами и замедлением игрока/мобов. Реализация: `DesertZone.updateSandstorm()`, `ParticleSystem.startSandstorm()`, множители `scene._zoneSpeedMult` / `_zoneEnemySpeedMult`.
- Swamp: токсичные лужи (замедление + периодический урон) и безопасные островки, которые перекрывают лужи. Реализация: `SwampZone.updateSwampHazards()`, `_spawnSwampHazards()`, чистая функция `resolveSwampHazard()` в `src/systems/ZoneHazards.js`, `ParticleSystem.startSwampMiasma()`.
- Тесты: `tests/zoneHazards.test.js` (6). Всего 79/79, build проходит.

Исходная задача (для истории):

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

### 3.3 Сокращение/объединение зон — СДЕЛАНО (без удаления зон)

Данных по времени/доле дохождения нет, поэтому зоны не удалялись. Выполнена безопасная часть:

- Новый `src/systems/CampSpawner.js`: общий `spawnCampMobs()` + `makeCampEnemy()` + `spawnCampChests()`.
- `DepthsSpawner`, `CursedSpawner`, `ShadowSpawner`, `DesertSpawner`, `SwampSpawner`, `HellSpawner` сокращены до конфиг-обёрток (~30–40 строк вместо 77–100), дублирующий код удалён.
- Исправлены попутно: `walkAnimKey` теперь назначается всем camp-мобам (атаки корректно возвращаются в walk), Shadow invisible-мобы больше не падают на несуществующем `hpBg` до его создания.
- Контент не менялся: те же camp counts, роли, текстуры, HP сундуков и шансы дропа.
- Тесты: `tests/campSpawner.test.js` (2). Всего 91/91, build проходит.

Исходная задача (для истории):

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

### 3.4 Сжатие деревьев талантов — СДЕЛАНО

- `src/config/talents.js`: 9 ветвей по 10 узлов (было ~23–24). Суммарный бюджет силы сохранён (суммы эффектов сверены со старыми), каждый узел даёт заметный шаг; filler `+3–5%` убран.
- Capstone-узлы: pierce, splash burn, echo/chain, spread DoT, cheat death, purify shield/regen.
- Закрыты мёртвые эффекты: `spellPierce`, `spellChain`, `spellSplashBurn`, `spellSpreadOnKill`, `shieldAbsorbsCorruption`, `shieldStealPercent`, `healBonusHp`, `purifyHeal/CorReduce/RegenDuration/Shield` теперь читаются в `SpellProjectile`, `SpellEffects`, `SpellSystem`, `CombatCore`, `PlayerSystem`.
- `shieldDuration` теперь трактуется в секундах (`_castShield`), а не как процент.
- Старые сохранения: неизвестные ID узлов игнорируются без краша; ноды 1–10 сохранили прежние ID.
- Тесты: `tests/talents.test.js` (6). Всего 85/85, build проходит.

Исходная задача (для истории):

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

### 3.5 Анимации атак и смерти — СДЕЛАНО

- `src/config/animations.js`: добавлены attack-анимации для goblin/skeleton/skeleton_lord/shadow_child/ancient_evil + быстрые attack-циклы для slime, rat, village_brute, hell_guard, tower_knight; добавлен `ancient_evil_death` и `ancient_evil_walk_anim`.
- `EnemyAI.playAttackAnim()` проигрывает attack-анимацию с кулдауном 700мс и возвращает walk-анимацию после завершения. Вызывается из ranged/mage/poison/fire/swarm/assassin/tank и контактного урона (`BaseZone`).
- `CombatLoot.spawnDeathEcho()`: death-VFX для всех мобов (падение/вращение/фейд), для боссов Depths/Cursed/Shadow/Tower/Throne/Village и generic-boss'ов; у Ancient Evil проигрывается `ancient_evil_death`.
- Hit-stop и `_impactFeedback` не тронуты.
- Тесты: `tests/animations.test.js` (4). Всего 89/89, build проходит.

Исходная задача (для истории):

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
