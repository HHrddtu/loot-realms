# PROJECT STATE — v0.16.0+

#state #tasks #design

> [!INFO] Связанные заметки
> - [[TASK_QUEUE]] — очередь задач
> - [[TODO_v017]] — выполнено в v0.17
> - [[TODO_v018]] — план v0.18
> - [[GAME_DESIGN]] — механики и баланс
> - [[REVIEW]] — код-ревью
> - [[README]] — карта содержимого

## Статус: Пит-система полностью реализована. Баланс кристаллов. Типы питомцев работают.

---

## Что это
**Loot Realms** — PvE Adventure Loot Game на Phaser 3. Процедурные текстуры, JS ES6, без TypeScript, без внешних ассетов.

## Технологии
- Phaser 3, Vite, Firebase Auth, PeerJS (P2P)
- Web Audio API (осцилляторы), localStorage + Firebase
- i18n: EN/RU/DE

## Структура
```
src/
├── config/         — items, pets, gold, classes, spells, enemies, bosses, zones, crafting, quests, rarity
├── scenes/         — Boot, Login, Menu, ClassSelect, Game, TalentTree, Bestiary, MaterialBook, SoulBook, Craft, PetScene
├── systems/        — Combat, Player, Spell, UI, NPC, Particle
├── zones/          — Forest, Arena, Mine, Cave, Village, Hell, Snowy, Castle
├── textures/       — процедурные текстуры по модулям
├── sound.js        — Web Audio звуки
├── save.js         — localStorage + Firebase account (v3)
├── i18n.js         — 700+ ключей
└── main.js         — entry point
```

## Зоны (порядок прохождения)
```
Forest → Mine → Cave → Village → Cemetery → Hell → Snowy → Castle
```
| # | Зона | Босс | Кристаллы (босс) |
|---|------|------|------------------|
| 1 | Forest | Treant | 4-8 |
| 2 | Mine | Skeleton Lord | 6-12 |
| 3 | Cave | Giant Bat | 10-18 |
| 4 | Village | Purple Demon + Ice Spirit | 10-16 |
| 5 | Cemetery | — | — |
| 6 | Hell | Red Demon | 20-35 |
| 7 | Snowy | Ice Spirit | 20-35 |
| 8 | Castle | Castle Boss | 25-50 |

## Классы
| Класс | HP | DMG | SPD | Книга | Спеллы (Q/W/E) |
|-------|-----|-----|-----|-------|----------------|
| Sage | 100 | 20 | 180 | Bestiary | Fireball, Shield, Heal |
| Alchemist | 110 | 18 | 170 | MaterialBook | Acid Flask, Iron Skin, HealingPotion |
| Angel | 90 | 15 | 190 | SoulBook | SoulStrike, LifeLink, Purify |

## Питомцы (v0.16.0)
12 питомцев, 4 редкости, 4 типа:
- **companion** — только бафф статов (Slime, Imp, Drake, Phoenix)
- **attacker** — автоатака ближайшего врага (Bat, Wolf, Wraith, Dragon)
- **tank** — отводит агро врагов (Golem, Celestial) — враги идут на питомца вместо игрока (150px)
- **collector** — +золото +шанс дропа (Rat, Spider)

3 кейса: Wooden (30 кр), Iron (80 кр), Golden (200 кр). Кристаллы только с боссов.

### Питомец combat
- Атака: `playPetAttack()` звук, lunge анимация, урон = 30% playerDamage × level scaling
- Follow: snap if >100px, lerp 0.12
- Bob: scaleY tween (Sine.easeInOut)
- Cleanup: `_destroyPet()` on shutdown, `_createPet()` on resume

### Pet UI
- HUD кнопка 🐾 с именем питомца
- PetScene: список, детали, магазин, кейсы, превью кейса (полноэкранный оверлей)
- Экипированные баффы в шапке PetScene

## Account Equipment (per-class)
5 слотов: Hat, Mantle, Legs, Weapon, Accessory
+ Account-wide: 5 слотов (Book, Mantle, Legs, Weapon, Accessory)
+ Item Lock: ПКМ toggle, auto-lock epic/legendary

## Управление
| Клавиша | Действие |
|---------|----------|
| Стрелки | Движение |
| SPACE | Атака / Портал / NPC / Лестница |
| Q / W / E | Заклинания |
| I | Инвентарь |
| TAB | Статы |
| T | Таланты |
| B | Книга знаний |
| N | Журнал квестов |
| P | Пауза |
| M | Звук |

## Ключевые паттерны
- Процедурные текстуры: `src/textures/*.js`, регистрация в BootScene
- Floating text: `scene.floatingText(x, y, text, color)`
- Зональные переходы: `_saveGame()` → `scene.restart()`
- Account save: `_saveAccount()` → `saveGame()` + Firebase write
- `petLevel` кэшируется в `_createPet()`, без per-frame loadAccount()

## Текущие известные ограничения
- Bundle: 2.3MB (Phaser + весь код)
- Нет code splitting
- Дублирование AI логики по зонам (каждая зона свой цикл)
- Нет звуков для питомца collector/tank

## Следующие шаги
1. Daily quests (кристаллы за повторяемые задания)
2. Achievement system
3. Класс-специфичные рерорки (healer, alchemist)
4. Loot из сундуков по локациям (визуальный прогресс)
5. Collector pet: авто-подбор лута в радиусе
6. Tank pet: перенаправление урона на питомца
7. Bundle optimization / code splitting
