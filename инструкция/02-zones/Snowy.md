# Snowy (Замёрзшая деревня)

#zone #snowy

Замороженная версия [[02-zones/Village|Village]] после победы над [[03-bosses/RedDemon|Red Demon]] в [[02-zones/Hell|Hell]].

## Характеристики
- **Размер:** (Village размер)
- **Враги:** 32 зимних моба (ice_golem, frost_wraith, snow_wolf, ice_elemental, frost_mage)
- **Босс:** [[03-bosses/IceSpirit|Ice Spirit]]
- **Сундуки:** 5-8
- **Кристаллы с босса:** 20-35
- **Особенности:** Warmth Core, campfire, восстановление деревни

## Связи
- ← [[02-zones/Hell|Hell]]
- → [[02-zones/Village|Village]] (восстановленная после использования Warmth Core)

## Код
- Snowy — часть `src/zones/VillageZone.js` (villageFrozen = true)
- Warmth Core: гарантированный дроп с Ice Spirit
- Campfire: SPACE → "Use Warmth Core?" → fadeOut → обычная деревня
- Восстановление: навсегда (флаг `villageRestored`)

## Враги
См. [[09-enemies/SnowyEnemies|Snowy Enemies]]

---

> См. также: [[02-zones/_zones_index|Все зоны]], [[03-bosses/IceSpirit|Ice Spirit]], [[02-zones/Village|Village]], [[09-enemies/SnowyEnemies|Snowy Enemies]]
