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

**GameScene** — thin delegation skeleton (~727 строк):
```
GameScene
├── Systems (constructor)
│   ├── CombatSystem / CombatCore / CombatFacade / CombatLoot
│   ├── PlayerSystem    — игрок, инвентарь, статы
│   ├── SpellSystem / SpellCast / SpellEffects / SpellProjectile
│   ├── UISystem / HUD / InventoryUI / PauseMenu
│   ├── NpcSystem       — NPC, диалоги, квесты
│   ├── PetSystem       — питомцы
│   ├── EnemyAI / BossAI / BaseBossAI
│   ├── ParticleSystem  — частицы
│   ├── TutorialManager — обучение
│   ├── MultiplayerManager — мультиплеер
│   ├── QuestTracker    — квесты
│   ├── SaveLoadSystem  — сохранения
│   └── InputSystem     — ввод
├── Zones (create)
│   ├── MeadowZone, ForestZone, ArenaZone, MineZone
│   ├── CaveZone, VillageZone, CemeteryZone*, HellZone
│   ├── SnowyZone, CastleZone, DepthsZone, CursedZone
│   ├── ShadowZone, TowerZone, ThroneZone
│   └── *Cemetery нет отдельного файла — часть VillageZone
└── Оставлено в GameScene
    ├── _handleInput()
    ├── _updateEnemies() + _updateBoss()
    └── save/load
```

## Масштаб кодовой базы

| Категория | Файлов | Строк (крупные) |
|-----------|--------|-----------------|
| Scenes | 15 | GameScene 727, TalentScene 622, CraftScene 467 |
| Systems | 33 | EnemyAI 584, SpellProjectile 615, SpellEffects 576, ParticleSystem 566 |
| Zones | 14 | VillageZone 1014, MineZone 590, TowerZone 541 |
| Boss AI | 11 | CastleBoss 330, ForestBossAI 285, TowerBoss 233 |
| Spawners | 8 | VillageSpawner 438, CastleSpawner 277, CaveSpawner 218 |
| Config | 21 | enemies.js 1086, quests.js 898, crafting.js 657, items.js 551 |

## Компонентная архитектура
- ES modules
- Каждая система — отдельный класс
- Каждая зона — отдельный класс (Zone + Spawner + Boss + опционально Projectiles)
- Конфиг — отдельные файлы в `src/config/` (21 файл)
- Мультиплеер: host-authoritative, snapshot 20Hz, PeerJS P2P

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
