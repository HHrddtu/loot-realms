# PROJECT STATE — v0.16.0

#state #tasks #design

> [!INFO] Связанные заметки
> - [[TASK_QUEUE]] — очередь задач
> - [[TODO_v017]] — выполнено в v0.17
> - [[TODO_v018]] — план v0.18
> - [[GAME_DESIGN]] — механики и баланс
> - [[REVIEW]] — код-ревью
> - [[README]] — карта содержимого

## Статус: 15 зон, 27 сетов, 12 питомцев, баланс ранней игры ужесточён.

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
├── config/         — items, pets, gold, spells, enemies, zones, crafting, quests, rarity, sets, balance, difficulty
├── scenes/         — Boot, Login, Menu, ClassSelect, Game, TalentTree, Bestiary, MaterialBook, SoulBook, Craft, Pet, Keybinds, Intro, Map
├── systems/        — Combat, Player, Spell, UI, NPC, Particle, Pet, QuestTracker, PauseMenu, InventoryUI, etc.
├── zones/          — 15 зон: Meadow, Forest, Arena, Mine, Cave, Village, Cemetery, Hell, Snowy, Castle, Depths, Cursed, Shadow, Tower, Throne
├── textures/       — процедурные текстуры по модулям
├── sound.js        — Web Audio звуки
├── save.js         — localStorage + Firebase account (v3)
├── i18n.js         — 700+ ключей
└── main.js         — entry point
```

## Зоны (порядок прохождения)
```
Meadow → Forest → Mine → Cave → Village → Cemetery → Hell → Snowy → Castle → Depths → Cursed → Shadow → Tower → Throne
```
| # | Зона | Босс | Кристаллы (босс) |
|---|------|------|------------------|
| 1 | Meadow | — | — |
| 2 | Forest | Treant | 4-8 |
| 3 | Mine | Skeleton Lord | 6-12 |
| 4 | Cave | Giant Bat | 10-18 |
| 5 | Village | Purple Demon | 10-16 |
| 6 | Cemetery | — | — |
| 7 | Hell | Red Demon | 20-35 |
| 8 | Snowy | Ice Spirit | 20-35 |
| 9 | Castle | Bandit Leader | 25-50 |
| 10 | Depths | Lich King | 30-60 |
| 11 | Cursed | Ancient Evil | 40-80 |
| 12 | Shadow | Shadow King | 50-100 |
| 13 | Tower | Fallen King | 60-120 |
| 14 | Throne | Eternity Lord | 100-200 |

## Классы
| Класс | HP | DMG | SPD | Книга | Спеллы (Q/W/E) |
|-------|-----|-----|-----|-------|----------------|
| Sage | 80 | 15 | 170 | Bestiary | Fireball, Shield, Heal |
| Alchemist | 90 | 14 | 160 | MaterialBook | Acid Flask, Iron Skin, HealingPotion |
| Angel | 75 | 12 | 180 | SoulBook | SoulStrike, LifeLink, Purify |

## Питомцы (v0.16.0)
12 питомцев, 4 редкости, 4 типа:
- **companion** — бафф статов (Slime, Imp, Drake, Phoenix)
- **attacker** — автоатака (Bat, Wolf, Wraith, Dragon)
- **tank** — отводит агро (Golem, Celestial)
- **collector** — +золото +шанс дропа (Rat, Spider)

## Сеты (27 шт)
Зоновые: Forest, Iron, Flame, Dragon, Bone, Cursed, Shadow, Tower, Eternal
Классовые: Sage, Alchemist, Angel
Гибридные: Vampire, Berserker, Mage, Tank, Assassin, Healer

## Account Equipment
8 слотов: Hat, Mantle, Legs, Weapon, Accessory, Ring, Charm, Relic

## Управление
| Клавиша | Действие |
|---------|----------|
| WASD | Движение |
| SPACE | Атака / Портал / NPC |
| Q / W / E | Заклинания |
| I | Инвентарь |
| TAB | Статы |
| T | Таланты |
| B | Книга знаний |
| N | Журнал квестов |
| P | Пауза |
| M | Звук |
| K | Настройка клавиш |

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
