# Castle (Замок)

#zone #castle

Финальная зона. 7 комнат + чердак, бандиты, [[03-bosses/BanditLeader|Bandit Leader]].

## Характеристики
- **Размер:** 7 комнат (400×350) + чердак (room 8)
- **Враги:** bandit_melee, bandit_ranger, bandit_elite
- **Босс:** [[03-bosses/BanditLeader|Bandit Leader]]
- **Сундуки:** breakable barrels с лутом
- **Кристаллы с босса:** 25-50
- **Особенности:** Room transitions, rescue пленников, time skip

## Связи
- ← [[02-zones/Village|Village]] (cart skip после восстановления)

## Код
- `src/zones/CastleZone.js` — ~1020 строк
- 7 комнат (0-6) + attic (room 8)
- Boss в room 6, ключ от attic в луте босса
- AI бандитов: melee (ближний), ranger (дальний), elite (сильный)

## Механики

### Room transitions
- Stairs up/down → fade in/out
- Boss door → attic (после ключа)

### Rescue
- Спасение пленников в attic
- Cutscene (как cart ride)

### Time skip
- После спасения: fade to black → "20 years later..." → fade in
- Village процветает (villageThriving flag)

## Враги
См. [[09-enemies/CastleEnemies|Castle Enemies]]

---

> См. также: [[02-zones/_zones_index|Все зоны]], [[03-bosses/BanditLeader|Bandit Leader]], [[09-enemies/CastleEnemies|Castle Enemies]]
