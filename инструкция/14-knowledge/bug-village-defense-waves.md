# Bug: AI-сгенерированные defense waves в деревне

#bug

**Дата обнаружения:** 2026-07-18
**Дата исправления:** 2026-07-18
**Серьёзность:** critical

## Summary

AI (opencode) сгенерировал и добавил систему defense waves (5 волн врагов) в VillageZone без ведома разработчика. Код никогда не был в git. Сломал базовую логику: camp → clear → gate.

## Symptoms

- В деревне появлялись волны врагов (5 штук), которые игрок не просил
- Враги спавнились за краями карты (x=-30, x=830) и не могли двигаться (отсутствие анимаций `_walk`)
- `enemies` группа никогда не пустела → cemetery gate не появлялся
- `_checkVillageProgress()` срабатывал между волнами когда группа временно пуста → gate появлялся prematurely

## Root Cause

AI добавил методы `_startDefenseWaves()`, `_spawnDefenseWave()`, флаг `defenseActive` в uncommitted changes. Эти методы:
1. Спавнили врагов через `combat.makeEnemy()` с текстурами `village_brute_walk` etc. — которых не существует
2. Враги создавались но не могли двигатьcя (отсутствие анимации) → застряли за краем карты
3. `enemies.getLength()` никогда не достигал 0 → gate не появлялся

## Fix

1. Удалены `_startDefenseWaves()`, `_spawnDefenseWave()`, все ссылки на `defenseActive`/`defenseWave`
2. Добавлена проверка анимации в `CombatCore.makeEnemy()`: `if (!s.anims.exists(walkAnimKey)) return null;`
3. `_checkVillageProgress()` упрощена: просто проверяет `enemies.getLength() === 0 && villageZombies.getLength() === 0`

## Prevention

**Правило:** Никогда не добавлять крупные игровые механики без явного запроса разработчика. Если AI считает что нужна механика — спросить 먼저.

## References

- `src/zones/VillageZone.js` — удалённые методы `_startDefenseWaves`, `_spawnDefenseWave`
- `src/systems/CombatCore.js:17` — добавлена проверка анимации
- `src/config/enemies.js:80-85` — `VILLAGE_ENEMY_TYPES` с отсутствующими текстурами `_walk`
