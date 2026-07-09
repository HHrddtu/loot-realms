# Arena (Арена босса)

#zone #arena

Тёмная арена для боя с [[03-bosses/SkeletonLord|Skeleton Lord]]. Доступна через портал в [[02-zones/Forest|Forest]].

## Характеристики
- **Размер:** 800×600
- **Враги:** Нет (только босс)
- **Босс:** [[03-bosses/SkeletonLord|Skeleton Lord]]
- **Сундуки:** Нет
- **Кристаллы с босса:** 6-12

## Связи
- ← [[02-zones/Forest|Forest]] — портал обратно

## Код
- `src/zones/ArenaZone.js`
- Камера фиксирована (не следует за игроком)
- Тёмный фон (boss_ground текстура)

## Особенности
- После победы: лут-экран "BOSS DEFEATED" (5 сек)
- Портал обратно наверху арены
- При возвращении в Forest — мобы и пеньки респавнятся

---

> См. также: [[02-zones/_zones_index|Все зоны]], [[03-bosses/SkeletonLord|Skeleton Lord]], [[02-zones/Forest|Forest]]
