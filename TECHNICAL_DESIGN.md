# TECHNICAL DESIGN

## Архитектура

### Обзор

Игра построена на паттерне **Component-Entity-System (ECS)** с использованием Phaser 3 как основного движка.

### Уровни абстракции

```
┌─────────────────────────────────────┐
│           Scenes (UI, Game)          │
├─────────────────────────────────────┤
│         Systems (Combat, Loot)       │
├─────────────────────────────────────┤
│      Entities (Player, Enemy, Boss)  │
├─────────────────────────────────────┤
│    Core (Phaser 3, Physics, Audio)    │
└─────────────────────────────────────┘
```

---

## Системы

### 1. Combat System

**Ответственность:** Управление боевыми взаимодействиями.

**Методы:**
- `calculateDamage(attacker, defender)` — расчёт урона
- `applyDamage(target, damage)` — применение урона
- `checkCrit(attacker)` — проверка критического удара
- `checkDodge(defender)` — проверка уклонения

**Зависимости:** Progression System (для проверки уровней)

### 2. Loot System

**Ответственность:** Генерация и выдача лута.

**Методы:**
- `generateLoot(enemy, difficulty)` — генерация лута
- `rollRarity(luck, difficulty)` — определение редкости
- `rollItem(biome, rarity)` — выбор предмета

**Зависимости:** Данные из JSON (items.json, biomes.json)

### 3. Inventory System

**Ответственность:** Управление инвентарём и экипировкой.

**Методы:**
- `addItem(item)` — добавление предмета
- `removeItem(slot)` — удаление предмета
- `equipItem(item, slot)` — экипировка
- `unequipItem(slot)` — снятие
- `getStats()` — получение текущих статов

**Зависимости:** Save System

### 4. Progression System

**Ответственность:** Управление прогрессией персонажа.

**Методы:**
- `addExperience(amount)` — добавление опыта
- `levelUp()` — повышение уровня
- `getLevel()` — получение текущего уровня
- `getRequiredEXP()` — требуемый опыт

**Зависимости:** Данные из game.js

### 5. Save System

**Ответственность:** Сохранение и загрузка прогресса.

**Методы:**
- `save()` — сохранение
- `load()` — загрузка
- `reset()` — сброс
- `export()` — экспорт в JSON
- `import(data)` — импорт из JSON

**Зависимость:** LocalStorage

---

## Сцены

### Boot Scene
- Загрузка ассетов
- Проверка сохранений
- Переход в Menu

### Menu Scene
- Главное меню
- Кнопки: Новая игра, Продолжить, Настройки

### Game Scene
- Основная игровая сцена
- Управление сущностями
- Боевая система

### UI Scene
- HUD (здоровье, опыт, уровень)
- Инвентарь
- Меню паузы

---

## Сущности (Entities)

### Player
```javascript
{
  id: 'player',
  position: { x: 0, y: 0 },
  stats: {
    level: 1,
    exp: 0,
    hp: 100,
    maxHp: 100,
    mp: 50,
    maxMp: 50,
    str: 10,
    dex: 10,
    int: 10,
    vit: 10,
    lck: 10
  },
  equipment: {
    weapon: null,
    shield: null,
    helmet: null,
    chest: null,
    gloves: null,
    boots: null,
    ring1: null,
    ring2: null,
    amulet: null
  },
  abilities: [],
  inventory: []
}
```

### Enemy
```javascript
{
  id: 'goblin',
  type: 'normal',
  stats: {
    hp: 30,
    maxHp: 30,
    damage: 5,
    defense: 2
  },
  loot: ['goblin_knife', 'gold_coin'],
  exp: 10
}
```

### Boss
```javascript
{
  id: 'ancient_dragon',
  type: 'boss',
  stats: {
    hp: 1500,
    maxHp: 1500,
    damage: 50,
    defense: 20
  },
  abilities: ['fire_breath', 'flight', 'summon_wolves'],
  loot: ['ring_green_valley', 'legendary_weapon'],
  exp: 2000
}
```

---

## Потоки данных

### Боевой поток

```
Player attack
    ↓
CombatSystem.calculateDamage()
    ↓
Check crit / dodge
    ↓
Apply damage to enemy
    ↓
If enemy hp <= 0:
    LootSystem.generateLoot()
    ProgressionSystem.addExperience()
```

### Поток сохранения

```
Save event triggered
    ↓
Gather player state
    ↓
Serialize to JSON
    ↓
Save to LocalStorage
```

---

## Событийная система

```javascript
// События
const EVENTS = {
  ENEMY_KILLED: 'enemy_killed',
  BOSS_KILLED: 'boss_killed',
  LEVEL_UP: 'level_up',
  ITEM_PICKUP: 'item_pickup',
  ITEM_EQUIP: 'item_equip',
  BIOME_COMPLETE: 'biome_complete',
  PLAYER_DEATH: 'player_death',
  SAVE_GAME: 'save_game',
  LOAD_GAME: 'load_game'
};
```

---

## Оптимизации

### Для первого билда:
1. **Object pooling** для снарядов и врагов
2. **Spatial hashing** для коллизий
3. **LOD** не требуется (2D)
4. **Texture atlas** для спрайтов

### Память:
- Максимум 100 врагов на экране
- Максимум 50 снарядов
- Автоматическая очистка неактивных объектов

---

## Тестирование

### Методы тестирования:
1. **Unit-тесты:** отдельные функции ( combat calculations )
2. **Integration-тесты:** взаимодействие систем
3. **Manual-тесты:** геймплей

### Покрытие для v0.1.0:
- Боевая система: 80%
- Система лута: 70%
- Сохранения: 100%
- UI: 50%

---

## Безопасность

1. **Валидация данных:** Все данные из JSON проверяются
2. **Защита от читерства:** Серверная проверка (не для первого билда)
3. **XSS:** Нет пользовательского ввода
4. **Данные:** Локальное хранение, keine sensitive data
