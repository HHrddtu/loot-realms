# PLAN: Snowy Village (v0.11.0)

#plan #zone #boss

> [!INFO] Связанные заметки
> - [[GAME_DESIGN]] — дизайн зон и боссов
> - [[PLAN_ROADMAP]] — дорожная карта (v0.11.0)
> - [[PLAN_BOSS]] — план босса Трент
> - [[README]] — карта содержимого

## Концепт
После убийства Red Demon в Hell → игрок возвращается в Village, но она заморожена. Новый босс Ice Spirit. После победы → предмет "Warmth Core" → костёр в центре деревни → деревня оттаивает навсегда.

## Архитектурное решение
**Изменённая Village** (не новая зона). Добавляем флаг `this.villageFrozen`:
- `true` → зимние текстуры, зимние мобы, Ice Spirit босс, костёр-объект
- `false` → обычная деревня (как сейчас)

## Поток игры
```
Red Demon defeated → hellReturnPortal appears
     ↓
_exitHell() → _setupVillage(frozen=true)
     ↓
Snowy Village: winter textures, 32 snowy mobs, Ice Spirit boss
     ↓
All mobs cleared → Ice Spirit spawns
     ↓
Ice Spirit defeated → Warmth Core drop + portal back to cemetery
     ↓
Player picks up Warmth Core → returns to Village → sees campfire
     ↓
SPACE near campfire → "Use Warmth Core?" → Yes
     ↓
fadeOut(1000) → _setupVillage(frozen=false) → fadeIn(1000)
     ↓
Village restored! Normal mobs, Purple Demon boss available again
```

## Snowy Mobs (5 типов, role-based)
| Роль | Ключ | Имя | HP | DMG | EXP |
|------|------|-----|-----|-----|-----|
| tank | ice_golem | Ice Golem | 400 | 28 | 90 |
| assassin | frost_wraith | Frost Wraith | 170 | 38 | 80 |
| archer | snow_wolf | Snow Wolf | 200 | 24 | 75 |
| healer | ice_elemental | Ice Elemental | 160 | 18 | 85 |
| mage | frost_mage | Frost Mage | 150 | 45 | 90 |

## Ice Spirit Boss
- **Frost Wave** (каждые 5с) — линейная AoE перед боссом, замедляет 2с
- **Blizzard** (каждые 8с) — AoE вокруг босса 120px
- **Summon Ice Shards** (каждые 12с) — 3 миньона (80 HP, быстрые, исчезают через 10с)

## Warmth Core
- Гарантированный дроп с Ice Spirit
- Legendary accessory: { hp: 60, dmg: 25, speed: 12, regenPercent: 3 }
- Используется у костра (SPACE) → деревня восстанавливается

## Костёр
- Позиция: центр деревни (x=350, y=1000)
- Неактивный: серый/ледяной
- Активный: оранжевый, с анимацией
- После восстановления: неинтерактивный

## Порядок реализации

| # | Задача | Файлы |
|---|--------|-------|
| 1 | Конфигурация: SNOWY_ENEMY_TYPES, SNOWY_BOSS_TYPE, WARMTH_CORE, ice_shard | config.js |
| 2 | Текстуры: snow_ground, snow_house, 5 winter mobs, ice_spirit, campfire, warmth_core | textures.js |
| 3 | GameScene: флаг villageFrozen, _setupVillage(frozen) зимние текстуры | GameScene.js |
| 4 | GameScene: _spawnSnowyVillageCamps(), winter mob AI | GameScene.js |
| 5 | GameScene: Ice Spirit boss — spawn, AI, victory → Warmth Core | GameScene.js |
| 6 | GameScene: campfire object, interaction, восстановление | GameScene.js |
| 7 | GameScene: _exitHell() → frozen=true | GameScene.js |
| 8 | Bestiary/Soul Book: 5 зимних + ice_spirit | config.js |
| 9 | i18n: переводы EN/RU/DE | i18n.js |
| 10 | Документация | *.md |
