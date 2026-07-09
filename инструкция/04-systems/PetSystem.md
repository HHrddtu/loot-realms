# PetSystem

#system #pet

Система питомцев (реализована в v0.16.0).

## Характеристики
- **Питомцев:** 12
- **Редкостей:** 4 (common, uncommon, rare, legendary)
- **Типов:** 4 (companion, attacker, tank, collector)

## Типы питомцев

| Тип | Поведение | Примеры |
|-----|-----------|---------|
| **companion** | Только бафф статов | Slime, Imp, Drake, Phoenix |
| **attacker** | Автоатака врага (1.5s CD) | Bat, Wolf, Wraith, Dragon |
| **tank** | Отводит агро (150px) | Golem, Celestial |
| **collector** | +золото, +шанс дропа | Rat, Spider |

## Кейсы
| Кейс | Цена (кристаллы) | Пул |
|------|-----------------|-----|
| Wooden | 30 | Common питомцы |
| Iron | 80 | Uncommon + Rare |
| Golden | 200 | Rare + Legendary |

## Combat
- Урон: 30% playerDamage × level scaling
- Follow: snap if >100px, lerp 0.12
- Bob: scaleY tween (Sine.easeInOut)
- Звуки: `playPetAttack()`, `playPetPickup()`

## UI
- HUD кнопка с именем питомца
- [[07-scenes/PetScene|PetScene]]: список, детали, магазин, кейсы

## Код
- `src/pets.js` — PET_DB
- PetEntity — класс питомца
- `_createPet()`, `_updatePetCombat()`, `_updatePetFollow()`
- Уровень питомца кэшируется (без per-frame loadAccount)

---

> См. также: [[06-mechanics/Pets|Pets mechanics]], [[07-scenes/PetScene|PetScene]], [[10-economy/Crystals|Crystals]]
