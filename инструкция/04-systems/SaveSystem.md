# SaveSystem

#system #save

Управление сохранением и загрузкой прогресса.

## Методы
| Метод | Описание |
|-------|----------|
| `save()` | Сохранить в localStorage |
| `load()` | Загрузить из localStorage |
| `reset()` | Сброс прогресса |
| `migrate()` | Миграция формата (v2 → v3) |

## Формат данных (v3)
```js
{
  version: 3,
  gold, crystals, exp, level, zone, difficulty,
  equipment: { weapon, armor, accessory },
  materials: [], bag: [],
  accountEquipment: {},
  unlockedTalents: [],
  petLevels: {},       // { pet_id: level }
  ownedPets: [],       // [ 'pet_slime', ... ]
  equippedPet: null,   // pet_id
  unlockedClasses: ['sage'],
  unlockedZones: ['forest'],
  // + kills, chests, bestiary, souls, etc.
}
```

## Firebase sync
- Аккаунт: `saveAccount()` → Firestore (для залогиненных)
- Коллекция: `users/{uid}` → { email, displayName, accountData }
- Автосохранение: каждые 5 мин

## Account Equipment
- 5 слотов: Hat, Mantle, Legs, Weapon, Accessory
- Account-wide: Book, Mantle, Legs, Weapon, Accessory

См. [[01-tech/SAVE_FORMAT|Save Format]] для полной спецификации.

---

> См. также: [[01-tech/SAVE_FORMAT|Save Format]], [[07-scenes/GameScene|GameScene]]
