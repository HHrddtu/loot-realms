# ПЛАН: Новые зоны (Зона 3-5)

> Последнее обновление: 2026-07-10

---

## Общая структура

```
Village (thriving)
    ↓ Depths ✅ (готово)
    ↓ Cursed Lands ✅ (готово)
    ↓ Shadow District ✅ (код готов, не хватает 7 текстур)
    ↓ Tower of the Fallen King ❌ (не начата)
    ↓ Throne of Eternity ❌ (не начата)
    ↓ Prestige система ❌ (не начата)
```

---

## ЗОНА 3: «Теневой Район» ( Shadow District )

**Статус:** Код готов. Нужно 7 текстур врагов.

### Локация
Параллельное измерение, открывается после босса Cursed Lands.

### Тематика
Искажение реальности, тени, зеркала, порталы-ловушки.

### Размер
800 x 3500 (5 этажей по 700)

### Вход
Портал в Cursed Lands после убийства босса → portal в Shadow District.

### Что уже сделано
- ✅ `src/config/zones.js` — SHADOW_* константы
- ✅ `src/config/enemies.js` — 12 типов врагов + босс + миньон
- ✅ `src/config/items.js` — SHADOW_MATERIALS (12 шт)
- ✅ `src/config/crafting.js` — 4 рецепта
- ✅ `src/config/quests.js` — 6 квестов, 3 NPC
- ✅ `src/zones/ShadowZone.js` — зона
- ✅ `src/zones/ShadowSpawner.js` — спавнер
- ✅ `src/zones/ShadowBoss.js` — босс (3 фазы)
- ✅ `src/scenes/GameScene.js` — регистрация
- ✅ `src/systems/SaveLoadSystem.js` — save/load
- ✅ `src/sound.js` — музыка
- ✅ NPC текстуры: `fallen_angel`, `trapped_soul`, `rift_scout`
- ✅ Портал Cursed → Shadow
- ✅ Портал Shadow → Cursed (возврат)

### Задачи для визуалиста

| # | Текстура | Описание |
|---|----------|----------|
| **SD-V1** | `mirror_image` | Зеркальное отражение игрока. Полупрозрачное, серебристое. 16x24 |
| **SD-V2** | `doppelganger` | Тёмная копия. Как player, но чёрный с красными глазами. 18x36 |
| **SD-V3** | `void_elemental` | Сфера из пустоты. Чёрный с фиолетовым свечением. 22x22 |
| **SD-V4** | `nightmare_beast` | Искажённое создание. Неправильная форма, щупальца. 24x30 |
| **SD-V5** | `twisted_copy` | Искажённый NPC. Как обычный NPC, но с деформацией. 16x28 |
| **SD-V6** | `dimension_tear` | Разрыв в ткани пространства. Не враг, а объект. 20x30 |
| **SD-V7** | `shadow_spawn` | Миньон босса. Маленькая тень. 14x14 |

Для каждой текстуры нужен `_walk` спрайт и `_walk_anim` анимация.

---

## ЗОНА 4: «Башня Павшего Короля» ( Tower of the Fallen King )

**Статус:** Не начата.

### Локация
Открывается после босса Shadow District. Древняя башня, возвышающаяся над теневым миром.

### Тематика
Древняя башня, ловушки, элитные враги, комната за комнатой. Лор: Король, правивший 200 лет назад, был проклят и превращён в тень. Его башня до сих пор хранит его воинов.

### Размер
800 x 4200 (7 комнат по 600)

### Вход
Портал в Shadow District после убийства босса → portal в Tower.

### Квестовая линия
```
Падший Ангел (Shadow): "За тенями стоит башня. Там спит Король"
    ↓
Башня: 7 комнат с элитными врагами
    ↓
Босс: Павший Король (3 фазы)
    ↓
После победы: "Король свободен. Но его трон пуст..."
    ↓
Портал в Throne of Eternity
```

### Кодер — Задачи

| # | Файл | Задача |
|---|------|--------|
| **TF-C1** | `src/config/zones.js` | Добавить: `TOWER_WIDTH=800`, `TOWER_HEIGHT=4200`, `TOWER_ROOM_HEIGHT=600`, `TOWER_ROOMS=7`, `TOWER_CAMP_POSITIONS` (14 позиций, по 2 на комнату), `TOWER_CHEST_POSITIONS` (7 шт, по 1 на комнату), `TOWER_STAIR_POSITIONS` (6 шт, лестницы вверх), `TOWER_BOSS_POSITION={x:400,y:300}` |
| **TF-C2** | `src/config/enemies.js` | Добавить 10 типов врагов: `tower_knight` (tank, hp:200, dmg:15), `tower_mage` (mage, hp:120, dmg:20), `tower_archer` (archer, hp:100, dmg:18), `tower_healer` (healer, hp:90, dmg:8), `tower_assassin` (assassin, hp:110, dmg:22), `royal_guard` (tank, hp:250, dmg:18), `dark_counselor` (mage, hp:130, dmg:22), `twisted_noble` (assassin, hp:120, dmg:20), `shadow_advisor` (healer, hp:100, dmg:10), `fallen_paladin` (tank, hp:220, dmg:16). Босс: `fallen_king` (hp:4000, dmg:35, 3 фазы). Миньон: `tower_guardian` (hp:100, dmg:12) |
| **TF-C3** | `src/config/items.js` | Добавить `TOWER_MATERIALS` (10 шт: `ancient_steel`, `royal_dust`, `crown_jewel`, `tower_rune`, `dark_counsel_ink`, `noble_blood`, `shadow_advisor_essence`, `paladin_oath`, `kings_tear`, `tower_heart`). `TOWER_EQUIP` (6 шт). `ACCOUNT_EQUIP_TOWER` (6+ шт) |
| **TF-C4** | `src/config/crafting.js` | Добавить 4 рецепта: `craft_royal_blade` (weapon, legendary), `craft_tower_armor` (armor, epic), `craft_king_ring` (accessory, epic), `craft_paladin_crown` (accessory, legendary) |
| **TF-C5** | `src/config/quests.js` | Добавить NPC: `ghost_advisor` (biome:tower, x:400 y:100), `trapped_prince` (biome:tower, x:300 y:2400), `tower_sage` (biome:tower, x:500 y:3600). Квесты: `tower_knights` (kill 15 tower_knight), `tower_mages` (kill 12 tower_mage), `tower_guards` (kill 10 royal_guard), `tower_counsel` (kill 8 dark_counselor), `tower_king` (kill fallen_king), `tower_relics` (collect 3 crown_jewel) |
| **TF-C6** | `src/zones/TowerZone.js` | Создать. Паттерн как `CastleZone` — комнаты, лестницы вверх, запирание дверей. 7 комнат, в каждой лагерь врагов + сундук. Переход: поднять лестницу → следующая комната. Босс в последней комнате |
| **TF-C7** | `src/zones/TowerSpawner.js` | Создать. Спавн врагов по комнатам, лестницы, сундуки. Паттерн как `CastleSpawner` |
| **TF-C8** | `src/zones/TowerBoss.js` | Создать. Босс: `fallen_king`. 3 фазы: Фаза 1 — обычный бой + призыв 2 стражей. Фаза 2 (HP<50%) — щит (иммунитет 3 сек) + кровопийство (+50% урон). Фаза 3 (HP<25%) — berserk (x1.5 скорость, x2 урон) + спавн 4 стражей |
| **TF-C9** | `src/scenes/GameScene.js` | Импорт `TowerZone`, регистрация в `this.zones.tower`, case в `_setupZone`, update, handleSpace |
| **TF-C10** | `src/systems/SaveLoadSystem.js` | `towerBossDefeated`, `towerRoom` |
| **TF-C11** | `src/zones/ShadowZone.js` | После босса Shadow → portal в Tower |
| **TF-C12** | `src/sound.js` | `tower` в ZONE_DEFS |
| **TF-C13** | `src/config/index.js` | Re-экспорт TOWER_* |

### Визуалист — Задачи

| # | Текстура | Описание |
|---|----------|----------|
| **TF-V1** | `tower_ground` | Каменные стены, факелы, знамёна. Тёмно-серый камень с оранжевым свечением факелов |
| **TF-V2** | `tower_knight` | Рыцарь в ржавых доспехах. 22x32 |
| **TF-V3** | `tower_mage` | Маг в тёмных одеждах. 16x28 |
| **TF-V4** | `tower_archer` | Лучник с луком. 18x30 |
| **TF-V5** | `tower_healer` | Жрец в светлых одеждах. 16x28 |
| **TF-V6** | `tower_assassin` | Ассассин в чёрном. 16x26 |
| **TF-V7** | `royal_guard` | Королевский страж. Огромный, в золотых доспехах. 26x36 |
| **TF-V8** | `dark_counselor` | Тёмный советник. В мантии, с посохом. 18x30 |
| **TF-V9** | `twisted_noble` | Искажённый аристократ. 18x28 |
| **TF-V10** | `shadow_advisor` | Тень советника. Полупрозрачный. 16x26 |
| **TF-V11** | `fallen_paladin` | Павший паладин. Тёмные доспехи, сломанный меч. 24x34 |
| **TF-V12** | `fallen_king` (босс) | Король на троне. Огромный, в разрушенной короне. 40x56. Анимации: idle, attack, shield, berserk |
| **TF-V13** | `tower_guardian` | Миньон босса. Страж. 20x28 |
| **TF-V14** | NPC: `ghost_advisor`, `trapped_prince`, `tower_sage` | 3 NPC текстуры. 32x48 каждый |

---

## ЗОНА 5: «Трон Вечности» ( Throne of Eternity )

**Статус:** Не начата.

### Локация
Верх башни, финальная комната. Открывается после босса Tower.

### Тематика
Финальный босс, выбор судьбы, кат-сцена "Мальчик стал Королём".

### Размер
800 x 600 (1 комната)

### Вход
Лестница из последней комнаты Tower.

### Квестовая линия
```
Павший Король (побеждён): "Мой трон... забери его. Ты достоин."
    ↓
Портал в Throne of Eternity
    ↓
Финальный босс: Повелитель Вечности (4 фазы)
    ↓
Победа → Кат-сцена: "20 лет спустя. Мальчик стал Королём. Деревня процветает."
    ↓
Открытие Prestige режима
```

### Кодер — Задачи

| # | Файл | Задача |
|---|------|--------|
| **TE-C1** | `src/config/zones.js` | `THRONE_WIDTH=800`, `THRONE_HEIGHT=600`, `THRONE_BOSS_POSITION={x:400,y:300}` |
| **TE-C2** | `src/config/enemies.js` | Босс: `eternity_lord` (hp:6000, dmg:40, 4 фазы). Миньоны: `eternity_spawn_1` (tank, hp:120), `eternity_spawn_2` (mage, hp:80), `eternity_spawn_3` (assassin, hp:90) |
| **TE-C3** | `src/config/items.js` | Уникальный лут: `crown_of_eternity` (legendary, accessory, stats:{hpPercent:10,damagePercent:8,spellPercent:5}), `sword_of_eternity` (legendary, weapon, stats:{damagePercent:12,critPercent:6}), `amulet_of_eternity` (legendary, accessory, stats:{hpPercent:8,regenPercent:5,spellPercent:4}) |
| **TE-C4** | `src/config/quests.js` | Квест: `throne_final` (kill eternity_lord). Награда: prestige unlock + уникальный лут |
| **TE-C5** | `src/zones/ThroneZone.js` | Создать. Одна комната, босс-файт, кат-сцена после победы |
| **TE-C6** | `src/zones/ThroneBoss.js` | 4 фазы: Фаза 1 — обычный бой. Фаза 2 (HP<75%) — спавн 3x`eternity_spawn_1` + 3x`eternity_spawn_2`. Фаза 3 (HP<50%) — исцеление до 50% + аура урона. Фаза 4 (HP<25%) — berserk (x2 урон, x1.5 скорость, спавн 3x`eternity_spawn_3`) |
| **TE-C7** | `src/scenes/GameScene.js` | Регистрация |
| **TE-C8** | `src/systems/SaveLoadSystem.js` | `throneBossDefeated`, `prestigeUnlocked` |
| **TE-C9** | `src/config/prestige.js` | Новый файл: престиж-система. `PRESTIGE_BONUSES = [{level:1,expBonus:5,dmgBonus:3,hpBonus:2}, ...]`. Функция `getPrestigeBonuses(level)`. Функция `resetPrestige(account)` — сброс уровня, начисление permanent бонусов |
| **TE-C10** | `src/zones/TowerZone.js` | После босса Tower → portal в Throne |
| **TE-C11** | `src/sound.js` | `throne` в ZONE_DEFS |

### Визуалист — Задачи

| # | Текстура | Описание |
|---|----------|----------|
| **TE-V1** | `throne_ground` | Золотой трон, мраморные колонны. Свет из окон. Золото + белый мрамор |
| **TE-V2** | `eternity_lord` (босс) | Огромная тень в короне. 50x64. Анимации: idle, attack, heal, berserk, death |
| **TE-V3** | `eternity_spawn_1` | Миньон-танк. Тёмный рыцарь. 20x28 |
| **TE-V4** | `eternity_spawn_2` | Миньон-маг. Тёмный маг. 16x24 |
| **TE-V5** | `eternity_spawn_3` | Миньон-ассассин. Тень. 14x22 |
| **TE-V6** | Кат-сцена | Спрайты: мальчик в короне (32x48), толпа жителей (групповой спрайт), фейерверки (частицы) |
| **TE-V7** | UI престижа | Экран престижа: кнопка "PRESTIGE", подтверждение, награды |

---

## Prestige система

**Файл:** `src/config/prestige.js` (новый)

### Механика
- После победы над `eternity_lord` → `prestigeUnlocked = true`
- В деревне появляется NPC "Страж Времени" → даёт option "Пrestige"
- Prestige = сброс уровня персонажа до 1
- Сохраняются: account level, account talents, account equipment, gold, crystals
- Теряются: class level, talents, equipment, materials
- Permanent бонусы за каждый престиж:

| Престиж | EXP Bonus | DMG Bonus | HP Bonus |
|---------|-----------|-----------|----------|
| 1 | +5% | +3% | +2% |
| 2 | +10% | +6% | +4% |
| 3 | +15% | +9% | +6% |
| 4 | +20% | +12% | +8% |
| 5 | +25% | +15% | +10% |

---

## Сводная таблица

| Зона | Кодер | Визуалист | Статус |
|------|-------|-----------|--------|
| Shadow District | ✅ Готово | 7 текстур | ~90% |
| Tower of the Fallen King | 13 задач | 14 задач | 0% |
| Throne of Eternity | 11 задач | 7 задач | 0% |
| Prestige | 1 задача | 1 задача | 0% |
| **ИТОГО** | **25 задач** | **29 задач** | |

---

## Порядок работы

```
Сейчас: доделать 7 текстур Shadow District
Неделя 1: Tower of the Fallen King (параллельно кодер + визуалист)
Неделя 2: Throne of Eternity + Prestige
Неделя 3: Интеграция, баги, тестирование
```

---

## Связь зон (flow)

```
Village (thriving)
    ↓ depthsBossDefeated
Depths (босс: Lich King)
    ↓ cursedBossDefeated  
Cursed Lands (босс: Ancient Evil)
    ↓ shadowBossDefeated
Shadow District (босс: Shadow King)
    ↓ towerBossDefeated
Tower of the Fallen King (босс: Fallen King)
    ↓ throneBossDefeated
Throne of Eternity (босс: Eternity Lord)
    ↓ prestigeUnlocked
Prestige (сброс уровня, permanent бонусы)
```

---

## Связь с сюжетом

```
20 лет мира → Старейшина умирает → "Под деревней тьма"
    ↓
Depths: очищение катакомб → Тень Ребёнка побеждена
    ↓
Cursed Lands: проклятие разливается → Древнее Зло побеждено
    ↓
Shadow District: тени проникают в мир → Shadow King побеждён
    ↓
Tower: древняя башня Короля → Павший Король освобождён
    ↓
Throne: финальный босс → "Мальчик стал Королём"
    ↓
Prestige: новый цикл, но с permanent бонусами
```
