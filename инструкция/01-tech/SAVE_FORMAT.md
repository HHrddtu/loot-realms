# SAVE FORMAT — Формат сохранений

#tech #save

## Версия: 3
Миграция с v2 встроена.

## Структура
```js
{
  version: 3,
  gold: 0,
  crystals: 0,
  exp: 0,
  level: 1,
  zone: 'forest',
  difficulty: 'Normal',
  equipment: {
    weapon: null, armor: null, accessory: null
  },
  materials: [],
  bag: [],
  accountEquipment: {},
  unlockedTalents: [],
  petLevels: {},
  ownedPets: [],
  equippedPet: null,
  unlockedClasses: ['sage'],
  unlockedZones: ['forest'],
  kills: {},
  chests: 0,
  bestiary: {},
  souls: {},
  // ... и другие поля
}
```

## Хранилище
- **LocalStorage:** основной save
- **Firebase Firestore:** облачная копия (для залогиненных)
  - Коллекция: `users/{uid}`
  - Поля: email, displayName, accountData

## Автосохранение
- Каждые 5 минут
- При переходе между зонами
- При закрытии вкладки

## Миграция v2 → v3
- Автоматическая при загрузке старого save
- Сохраняет все данные, добавляет новые поля

---

> См. также: [[04-systems/SaveSystem|SaveSystem]], [[07-scenes/GameScene|GameScene]]
