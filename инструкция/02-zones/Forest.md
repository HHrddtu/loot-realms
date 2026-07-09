# Forest (Лес)

#zone #forest

Первая боевая зона. Зелёный лес с пеньками, мобами и порталом к [[03-bosses/Treant|Treant]].

## Характеристики
- **Размер:** 800×900
- **Враги:** 8 мобов (goblin, wolf, skeleton, goblin_shaman)
- **Босс:** [[03-bosses/Treant|Treant]] (через портал в [[02-zones/Arena|Arena]])
- **Сундуки:** Нет
- **Пеньки:** 6 штук (источник древесины)
- **Кристаллы с босса:** 4-8

## Связи
- → [[02-zones/Arena|Arena]] — портал-дерево наверху карты
- → [[02-zones/Mine|Mine]] — после победы над Treant
- ← [[02-zones/Meadow|Meadow]]

## Враги
См. [[09-enemies/ForestEnemies|Forest Enemies]]

## Код
- `src/zones/ForestZone.js` — setup, clear, update
- `ForestZone.setup()` создаёт: мобов, пеньки, портал
- AI мобов: стандартный (движение к игроку, атака вблизи)

## Особенности
- Пеньки можно бить (SPACE) — дропают материалы
- Портал в Arena — дерево с дуплом (tree_hole текстура)
- Подсказка "SPACE to enter" при proximity к порталу

---

> См. также: [[02-zones/_zones_index|Все зоны]], [[03-bosses/Treant|Treant]], [[09-enemies/ForestEnemies|Forest Enemies]]
