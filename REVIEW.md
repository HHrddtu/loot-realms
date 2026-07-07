# 🔴 STRICT CODE REVIEW — Loot Realms v0.16.0

**Дата:** 20.06.2026
**Метод:** полный разбор архитектуры + прямое чтение кода

---

## 1. АРХИТЕКТУРА — ОЦЕНКА: 4/10

### ❌ GameScene — GOD OBJECT (1193 строк)

`src/scenes/GameScene.js` — центральная проблема проекта. В одном файле:

- Свойства для **всех зон** (`this.boss`, `this.mineBoss`, `this.caveBoss`, `this.villageBoss`,
  `this.hellBoss`, `this.snowyIceSpirit`, `this.castleBoss`, `this.villageZombies`,
  `this.hellImps`, `this.caveSmallBats`, `this.snowyIceShards`...)
- Свойства для **всех сундуков** (`this.forestChests`, `this.mineChests`, `this.caveChests`,
  `this.caveExtraChests`, `this.villageChests`...)
- Методы зон вперемешку с основной логикой (`_villageBossSplit`, `_snowyIceSpiritDied`,
  `_victoryHellBoss`, `_updateVillageNPCs`...)
- UI-логика (`openInventory`, `closeInventory`, `drawInventory`...) — должно быть в UISystem
- `_handleInput()` — **106 строк** `if/else if` для обработки пробела по зонам (строки 920–1026)

**Каждая сцена знает про все остальные сцены. Это антипаттерн.**

```js
// GameScene.js:156 — сцена хранит состояние ВСЕХ зон одновременно
this.villageFrozen = false;
this.villageRestored = false;
this.villageThriving = false;
this.villageBossDefeated = false;
this.hellBossDefeated = false;
this.castleQuestDone = false;
this.castleRoom = 0;
this.castleFloorCleared = false;
this.castleBossDefeated = false;
this.castleKeyObtained = false;
this.castleRescued = false;
```

### ❌ Дублирование AI-логики в зонах — КАТАСТРОФА

Логика wander+chase для мобов живёт в `_updateEnemies()` (GameScene.js, строки 1114–1192),
но каждая зона также содержит собственные AI-лупы для боссов и спец-врагов.

Конкретный пример: `_mineBossPhaseTransition` (MineZone.js:1005–1043) и
`_caveBossPhaseTransition` (CaveZone.js:773–811) — **80% кода идентичен**:

```js
// Оба метода содержат одинаковый код:
st.transitioning = true;
st.invulnerable = true;
boss.body.setVelocity(0);
if (boss.telegraph) { boss.telegraph.destroy(); boss.telegraph = null; }
s.cameras.main.shake(300, 0.01);
s.tweens.add({ targets: boss, alpha: 0.3, duration: 150, yoyo: true, repeat: 3, ... });
const flash = s.add.rectangle(..., GAME_WIDTH, GAME_HEIGHT, 0xffffff)...;
// Различие только в цвете текста фазы
```

Методы `clear()` во всех зонах (ForestZone, MineZone, CaveZone, VillageZone) содержат
**одинаковый скелет из 100+ строк**: destroy colliders → очистка fireballs →
очистка enemyProjectiles → очистка shield → очистка enemies → очистка зоно-специфики.

### ❌ TECHNICAL_DESIGN.md врёт

В `TECHNICAL_DESIGN.md` написано: *"Игра построена на паттерне Component-Entity-System (ECS)"*.

Никакого ECS в коде нет. Есть процедурный код с мутацией глобального состояния сцены.
Не вводите себя в заблуждение — это не ECS.

---

## 2. КАЧЕСТВО КОДА — ОЦЕНКА: 3/10

### ❌ Файлы-монстры (должны быть <500 строк)

| Файл | Размер | ~Строк | Проблема |
|------|--------|--------|----------|
| `VillageZone.js` | 72.8 KB | ~1800 | Безобразно огромный |
| `talents.js` | 60.7 KB | ~1500 | Данные + логика в куче |
| `enemies.js` (config) | 60.8 KB | ~1500 | Мёртвый груз конфига |
| `GameScene.js` | 54.5 KB | 1193 | God object |
| `SpellSystem.js` | 54.5 KB | ~1000 | Слишком много ответственностей |
| `CastleZone.js` | 48.3 KB | ~1200 | Дублирование AI |
| `UISystem.js` | 40.9 KB | ~907 | UI должен быть в компонентах |
| `CaveZone.js` | 36.9 KB | ~918 | Дублирование AI |
| `MineZone.js` | 39.5 KB | ~1044 | Дублирование AI |
| `HellZone.js` | 28.5 KB | ~710 | Дублирование AI |

**Ни один файл в `systems/` и `zones/` не проходит лимит в 500 строк.**

### ❌ `utils.js` — 80 строк, но потенциал потерян

`rollEquip()`, `rollMaterial()`, `rollAccountEquip()` — вынесены правильно. Но нет:
- distance check helper (везде копипастится `Phaser.Math.Distance.Between`)
- floating text helper (уже как метод сцены, но не как утилита)
- enemy creation factory
- damage calculation pipeline

### ❌ `firebase.js` — 17 строк ✅ хорошо
### ⚠️ `auth.js` — 140 строк, смешивает Firebase-логику с UI-состоянием (`_passwordVisible`)
### ⚠️ `sound.js` — 33.9 KB процедурного аудио в одном файле

### ❌ Нет тестов — ни одного

Для игры с формулами урона, дропа, крита, баланса — это халатность.
Без тестов нельзя гарантировать, что изменения в `recalcStats()` не сломали урон
для Angel-a на сложности Nightmare.

---

## 3. ДАННЫЕ VS ЛОГИКА — ОЦЕНКА: 5/10

### ✅ Хорошо: вынос конфигурации в `config/`

Предметы, враги, зоны, редкости, баланс — вынесены в объекты. Это правильный подход.

### ❌ Плохо: таланты — это конфиг, а не код

`talents.js` (60.7 KB) содержит 3 класса × 3 ветки × ~24 таланта = ~216 объектов
с id, именем, описанием, эффектами, зависимостями. Это **чистые данные**.
Они должны быть в `config/talents.js` или `config/talents/sage.json`.

Сейчас talents.js содержит и данные, и функцию `getTalentEffects()`.
Раздели: данные отдельно, логика отдельно.

### ❌ `enemies.js` — 60.8 KB

Вроде в config/ — ок. Но 60KB на определения врагов. Можно разбить по зонам:
`enemies/forest.js`, `enemies/mine.js` и т.д.

### ⚠️ Магические числа

Из `инструкция.txt`: *"Никаких магических чисел"*. Однако:

```js
// CombatSystem.js
if (Phaser.Math.Distance.Between(ax, ay, e.x, e.y) < 35) // 35 — магическое
this.scene.time.delayedCall(500, ...)                      // 500 — магия
e.stats.wTimer > 60                                         // 60 — магия
```

---

## 4. СЦЕНЫ — РАЗБОР

### ✅ BootScene.js (69 строк) — хорошо
Чёткая загрузка текстур, анимаций. Не перегружен.

### ✅ LoginScene.js (212 строк) — приемлемо
Смесь Canvas-кнопок и DOM-инпутов. Минус: при ресайзе окна позиции инпутов не пересчитываются.

### ✅ MenuScene.js (437 строк) — перегружен
6 оверлеев (Account, Advanced, Instructions, Exit, AccountEquip, NoClass).
Каждый оверлей — кандидат на отдельный компонент.

### ✅ ClassSelectScene.js (159 строк) — хорошо

### 🔴 GameScene.js (1193 строк) — КРИТИЧЕСКИ
Уже разобрано выше. Главная проблема проекта.

### ⚠️ TalentScene.js, PetScene.js, CraftScene.js — на пределе

---

## 5. МУЛЬТИПЛЕЕР — ОЦЕНКА: 7/10

### ✅ `network.js` (552 строки)
Хорошая структура: PeerJS-обёртка с send/receive функциями. Отдельные коллбэки
для каждого типа сообщений. Хост/гость логика понятна.

### ✅ `multiplayer.js` (338 строк)
Синхронизация мобов, боссов, сундуков — логична.

### ⚠️ Проблемы:
1. **Нет реконнекта** — при обрыве соединения состояние теряется
2. **Нет лаг-компенсации** — клиент с лагами видит врагов не там
3. **Максимум 4 игрока захардкожено**
4. **`mobIdCounter`** не сбрасывается — потенциальный переполняющийся счётчик

---

## 6. СИСТЕМЫ — РАЗБОР

### ✅ CombatSystem.js (842 строки) — самый важный файл
- `hitEnemy()` правильный: damage → crit → armor shred → lifesteal → kill check
- **Проблема**: `_dealAttackDamage()` проверяет 11+ групп объектов
  (enemies, stumps, forestChests, mineChests, caveChests, villageChests,
  villageZombies, hellImps, caveSmallBats, snowyIceSpirit, snowyIceShards) —
  результат God Object GameScene. Нужен единый список "attackable entities".
- `killGenericBoss()` — хорошая абстракция, но 15+ полей в конфиге — хрупко.

### ⚠️ PlayerSystem.js (473 строки)
- `recalcStats()` — **самая опасная функция**: 130+ строк мультипликативных вычислений.
  Учитывает: класс, уровень, материалы, экипировку, таланты, аккаунт-таланты,
  аккаунт-экипировку, питомцев, апгрейды, бусты, divine blessing, consumable бонусы,
  бестиарий-бонусы, материал-бук бонусы, соул-бук бонусы.
- Слишком много источников статов — кошмар для балансировки.

### ❌ SpellSystem.js (54.5 KB)
Второй по величине файл. Кастинг, снаряды, AOE, щиты, хилы, DoT — всё в одном.
Разбей на `SpellCast.js`, `SpellProjectile.js`, `SpellEffects.js`.

### ⚠️ UISystem.js (40.9 KB)
Смесь HUD, инвентаря, статов, тултипов, паузы. Разбей на:
`HUD.js`, `InventoryPanel.js`, `Tooltip.js`, `PauseMenu.js`.

---

## 7. СОХРАНЕНИЯ / АККАУНТ — ОЦЕНКА: 7/10

### ✅ `save.js`
Версионирование (v3), миграция, разделение game-state и account-state.
Двойное хранение (localStorage + Firebase) правильно.

### ⚠️ `auth.js`
Анонимный вход работает, но нет привязки анонимного аккаунта к email
(важно для удержания игроков-"гостей").

---

## 8. БАЛАНС — КРИТИЧЕСКИЕ ЗАМЕЧАНИЯ

### 🔴 Стекинг мультипликативных бонусов

Урон игрока модифицируется ОДНОВРЕМЕННО:
- `s_fire_14`: +25% Fireball DMG
- `s_fire_11`: +15% Fireball, +8% Crit
- `s_know_10`: +15% Spell, +10% Crit
- Account Equip: +X% DMG per item
- Pet: +damagePercent
- Consumable: damage_boost
- Bestiary bonus: dmgBonus per enemy
- Material bonuses, Soul bonuses...

Все стекаются мультипликативно через `recalcStats()`. На высоких уровнях
цифры уходят в астрономию. Переход на аддитивную модель внутри групп
и мультипликативную между группами обязателен.

### ⚠️ Кристаллы — только с боссов

Если игрок застрял на боссе, он не может купить питомцев/кейсы вообще.
Нужен альтернативный доход (daily quests — уже в планах).

---

## 9. UI / UX

### ✅ Инвентарь — работает
### ✅ HUD — информативен
### ⚠️ DOM-инпуты (Login, KeybindScene) — при ресайзе окна ломаются
### ❌ Нет мобильной поддержки — только клавиатура
### ⚠️ Тултипы — текстовые, без фона, могут накладываться

---

## 10. ПРОИЗВОДИТЕЛЬНОСТЬ

| Проблема | Серьёзность |
|----------|-------------|
| Бандл 2.3 MB без code splitting | Средняя |
| Все текстуры генерятся в BootScene (блокирует загрузку) | Средняя |
| `recalcStats()` при КАЖДОМ добавлении материала/шмота | Низкая |
| `updateUI()` часто без проверки изменений | Низкая |
| Particle системы создаются/удаляются, нет object pooling | Средняя |
| Нет throttle для некритичных обновлений | Низкая |

---

## 11. ИДЕЯ И РЕАЛИЗАЦИЯ — ОБЩАЯ ОЦЕНКА

### Идея: 8/10
PvE-фарм с 8 биомами, 3 классами, 4 типами питомцев, мультиплеером,
талантами, крафтом — амбициозная и цельная концепция.
"Ещё один забег" — правильный геймплейный хук.

### Реализация: 5/10
- Базовая механика (бой/лут/прогрессия) **работает**
- 8 зон **работают**
- Сохранения **работают**
- Но кодовая база — **технический долг на годы вперёд**
- Каждая новая зона добавляет 30-70 KB копипасты
- God Object GameScene будет только расти
- Без рефакторинга проект станет неподдерживаемым через 2-3 фичи

---

## 12. ПРИОРИТЕТНЫЙ ПЛАН ИСПРАВЛЕНИЙ

### 🔴 КРИТИЧЕСКИ (сделать до новых фич)

| # | Задача | Файлы |
|---|--------|-------|
| 1 | **Вынести EnemyAI в общий модуль** — убрать 7 копий wander+chase логики | `systems/EnemyAI.js` |
| 2 | **Разделить GameScene** — zone-specific свойства в ZoneManager | `systems/ZoneManager.js` |
| 3 | **Разделить talents.js** — данные в `config/`, логика отдельно | config + src |
| 4 | **Написать тесты на recalcStats()** — критическая функция, 0 тестов | `tests/` |
| 5 | **Создать BaseZone.clear()** — убрать 100+ строк копипасты в каждой зоне | `zones/BaseZone.js` |
| 6 | **Вынести `_bossPhaseTransition()`** — дублируется в MineZone и CaveZone | `systems/BossAI.js` |
| 7 | **Разделить `_handleInput()`** — каждая зона получает `handleSpace()` | GameScene + zones |

### 🟡 ВАЖНО (следующий цикл)

| # | Задача |
|---|--------|
| 8 | Разбить UISystem.js на HUD + InventoryPanel + Tooltip + PauseMenu |
| 9 | Разбить SpellSystem.js на модули |
| 10 | Добавить code splitting |
| 11 | Вынести магические числа в config/balance.js |

### 🟢 ЖЕЛАТЕЛЬНО

| # | Задача |
|---|--------|
| 12 | Object pooling для частиц и снарядов |
| 13 | Пересчёт DOM-инпутов при ресайзе окна |
| 14 | Реконнект в мультиплеере |
| 15 | Ревью баланса (переход на аддитивные статы) |

---

## ИТОГ: двумя фразами

**Игра работает и играется. Это достижение.** Но кодовая база — башня из спагетти,
которую ты строишь всё выше. Каждая новая зона делает фундамент слабее.
Если не сделать рефакторинг СЕЙЧАС (на v0.16), на v0.20 ты не сможешь добавить
ни одной новой механики без каскадных багов.

**Приоритет №1 — EnemyAI + GameScene split + BaseZone.clear() + тесты на recalcStats().**
Это спасёт проект.
