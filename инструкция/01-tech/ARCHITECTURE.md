# Архитектура

#tech #architecture

## Уровни абстракции

```
┌────────────────────────────┐
│   Scenes (UI, Game)        │
├────────────────────────────┤
│   Systems (Combat, Loot)   │
├────────────────────────────┤
│   Entities (Player, Enemy) │
├────────────────────────────┤
│   Core (Phaser, Physics)   │
└────────────────────────────┘
```

## Структура делегирования

**GameScene** — thin delegation skeleton (~1102 строк):
```
GameScene
├── Systems (constructor)
│   ├── CombatSystem    — атака, урон
│   ├── PlayerSystem    — игрок, инвентарь
│   ├── SpellSystem     — заклинания
│   ├── UISystem        — HUD
│   └── NpcSystem       — NPC
├── Zones (create)
│   ├── ForestZone
│   ├── ArenaZone
│   ├── MineZone
│   ├── CaveZone
│   ├── VillageZone
│   ├── HellZone
│   └── CastleZone
└── Оставлено в GameScene
    ├── _handleInput()
    ├── _updateEnemies() + _updateBoss()
    ├── _setupMeadow() / _clearMeadow()
    └── save/load
```

## Компонентная архитектура
- ES modules
- Каждая система — отдельный класс
- Каждая зона — отдельный класс
- Конфиг — отдельные файлы в `src/config/`

## События
```js
const EVENTS = {
  ENEMY_KILLED, BOSS_KILLED, LEVEL_UP,
  ITEM_PICKUP, ITEM_EQUIP, SAVE_GAME
};
```

См. [[01-tech/FILE_TREE|FILE_TREE]] для полной структуры.

---

> См. также: [[07-scenes/GameScene|GameScene]], [[04-systems/_systems_index|Systems]], [[02-zones/_zones_index|Zones]]
