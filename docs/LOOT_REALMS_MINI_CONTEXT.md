# Loot Realms — Minimal Context

> Для анализа с минимальным расходом контекста. Версия `0.16.0`, срез 2026-11-01.
> Полная версия: `docs/LOOT_REALMS_CONTEXT_PACK.md` (читать только если нужны детали).

## 1. Игра

Loot Realms — браузерная top-down PvE action-RPG про лут.

- Phaser 3.80, vanilla JS, Vite, Firebase Auth, PeerJS P2P.
- Процедурные текстуры, без внешних ассетов.
- Одна сложность: Normal.
- 3 класса: Sage, Alchemist, Angel.
- 15 zone-классов, 14 уникальных боссов.
- 43 квеста, 27 заклинаний (8 на класс, 4 слота Q/W/E/R), 20 NPC, 12 питомцев, 27 сетов.
- 63 unit-теста, сборка проходит.

## 2. Текущий цикл

```
Вход в зону → мобы → сундуки/лут → босс → портал/лестница → следующая зона
```

Прогрессия: level, equipment, account equipment, talents, mastery, sets, enchanting, crafting, pets, books, prestige.

## 3. Ключевые файлы

```
src/scenes/GameScene.js          главный контроллер, зоны, сейв, UI-делегаты
src/systems/BaseZone.js          контракт зон: setup/clear/update/handleSpace
src/systems/CombatCore.js        урон, криты, щит, смерть
src/systems/CombatLoot.js        дроп, сундуки, боссы
src/systems/EnemyAI.js           поведение мобов, роли, статусы
src/systems/SpellSystem.js       каст заклинаний
src/systems/InputSystem.js       ввод, dodge, shadow step, time slow
src/config/balance.js            боевые константы
src/config/enemies.js            статы и пулы врагов
src/config/quests.js             NPC_DB + QUEST_DB
src/config/spells.js             SPELLS
src/config/items.js              предметы, материалы, account equipment
src/config/sets.js               сеты
src/config/pets.js               питомцы
src/config/crafting.js           рецепты
src/config/difficulty.js         одна сложность Normal
src/scenes/TalentScene.js        таланты + mastery
src/systems/PrestigeSystem.js    New Game+
src/systems/SaveLoadSystem.js    сохранение/загрузка
```

## 4. Факты, важные для анализа

- У игроков есть 3-кадровые attack-анимации (`config/animations.js`), у большинства мобов — только walk. Ударный VFX — tween-спрайты (`slash`, `attack_bash` и т.п.).
- Боевой фидбек уже есть: tint, camera shake, particles, floating text. Hit-stop нет.
- У врагов есть роли (tank/archer/healer/mage/assassin/poison/necro/fire/swarm), но на практике зоны ощущаются как один и тот же цикл.
- Квесты в основном kill/collect; есть хуки talk/explore/escort, но ситуаций и выборов мало.
- Общего квест-гейта переходов нет. `_setupZone` проверяет только `chapter.requireItem`; `castle.questDone` влияет на cemetery gate.
- Синергии: combo (`CombatCore.js:601`) и class synergy (`SpellSystem.js:67`) есть только в мультиплеере. Базовые спеллы в соло работают.
- Прогрессия в основном числовая: HP/DMG/SPD и проценты.
- Зоны отличаются декором, размером и боссом, но не core-механикой.
- Мобы и сундуки респавнятся, фарм потенциально бесконечен.
- GameScene — god object (~795 строк, много делегатов).
- `completedZones` не сохраняется; `QuestTracker` не подключён; achievements отсутствуют.
- Документация частично устарела: проверять по коду.

### Ловушки для анализа (проверено по коду)

- `balance.js:113-120` (`LEVEL_UP_XP_*`, `UPGRADE_*`) экспортируются, но нигде не используются. В `PlayerSystem.js:457` захардкожено `300 * L^1.6`; в `:130-134` — апгрейды магазина `*5/*5/*5/*3/*2`.
- `BaseZone._destroyZoneSpecific()` пуст намеренно: это хук, зоны его переопределяют.
- `BaseZone.js:145` спавнит босса, когда `enemies.length === 0`; это не значит, что в зоне нет других целей — их просто нет в коде.
- `EnemyAI.js:418` кап 15 относится только к `_raiseDead`, не ко всем мобам.
- `VillageZone.js:138` и `VillageSpawner.js:294` — это cemetery gate, а не общий квест-гейт.
- 16 файлов `*Zone.js`, но `VillageZone` обслуживает Snowy и Cemetery. Размер файлов 134–1052 строки.
- `DepthsSpawner`, `CursedSpawner`, `DesertSpawner`, `SwampSpawner` — по ~91 строке и похожей структуре, но это не обязательно копипаста.

## 5. Жалоба владельца

Игра ощущается глупой и слабой:

- личный прогресс слабый;
- способности и анимации слабые;
- синергии и квесты не нужны;
- локации проходятся слишком быстро;
- локаций много, но они одинаковые;
- смысла мало, скучно, циклично.

## 6. Ограничения анализа

- Только анализ и планы. Ничего не менять и не писать код.
- Не верить докам на слово.
- Не предлагать новые зоны/классы/PvP до починки core loop.
- Предлагать сокращения так же охотно, как добавления.
- Учитывать стек: Phaser 3, vanilla JS, процедурные текстуры, P2P.

## 7. Что должно быть в ответе

1. Verdict.
2. Scorecard 1-10 по 8-12 аспектам.
3. 5 корневых причин: симптом → причина → доказательство → цена.
4. 3-5 систем на сокращение/объединение.
5. Новый core loop на 30 минут.
6. План 2 недели / 6 недель.
7. 5 метрик успеха.
8. 3 вопроса владельцу.
