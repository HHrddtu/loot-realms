# Village (Деревня)

#zone #village

Центральная зона. Имеет три состояния: обычная, замороженная ([[02-zones/Snowy|Snowy]]), восстановленная (после Snowy).

## Характеристики
- **Размер:** 800×900+
- **Враги:** bandit_types (обычная), bandits + зимние (frozen)
- **Босс:** [[03-bosses/PurpleDemon|Purple Demon]] (в Cemetery)
- **Сундуки:** 5-8
- **Кристаллы с босса:** 10-16

## Три состояния

### 1. Обычная деревня
- NPC: merchant, child_npc
- Магазин (CONSUMABLES)
- Inn (одноразовое лечение до полного HP + 50 EXP)
- Вход в [[02-zones/Cemetery|Cemetery]]

### 2. Замороженная (после [[02-zones/Hell|Hell]])
- `villageFrozen = true`
- Зимние текстуры, зимние мобы
- [[03-bosses/IceSpirit|Ice Spirit]] босс
- Warmth Core дроп → восстановление

### 3. Восстановленная (после Snowy)
- `villageThriving = true`
- Новый child NPC (диалог про бандитов)
- Cart skip → [[02-zones/Castle|Castle]]

## Связи
- ← [[02-zones/Cave|Cave]]
- → [[02-zones/Cemetery|Cemetery]]
- → [[02-zones/Snowy|Snowy]] (после Hell)
- → [[02-zones/Castle|Castle]] (после восстановления)

## Код
- `src/zones/VillageZone.js` — самый большой файл зоны (~500 строк)
- Покрывает: обычную деревню, cemetery, hell portal, frozen village, shop, inn

---

> См. также: [[02-zones/_zones_index|Все зоны]], [[02-zones/Cemetery|Cemetery]], [[02-zones/Snowy|Snowy]], [[02-zones/Castle|Castle]]
