# Курсы по Phaser 3 (RU)

#resource #phaser3

**Источник:** Сборник русскоязычных курсов
**Тип:** course, article
**Дата добавления:** 2026-07-10
**Статус:** Изучено по URL

## Ключевые идеи

### 1. CourseHunter — "Создание HTML5-игр с помощью Phaser 3" (ИЗУЧЕНО)
**coursehunter.net/course/sozdanie-html5-igr-s-pomoshchyu-phaser-3**

**Статистика:** 5 звёзд (9 оценок), 4ч 36мин, 159 уроков, обновлён 29.04.2026

**Курс создаёт 3 HTML5-игры + универсальный шаблон:**

**Игра 1: Road Rush** (уроки 27-84)
- Загрузка изображений, создание класса дороги
- Спрайт игрока, переключение полос, препятствия
- Коллизии, изменение скорости и масштаба
- **Toolbox паттерн:** переиспользуемые компоненты:
  - `collision checker` — проверка столкновений
  - `model` — модель данных
  - `event dispatcher` — события
  - `constants` — константы
  - `Game Controller` — управление игрой
  - `Scorebox` — счёт
  - `Align Grid` — сетка для размещения UI
  - `Text Button` — кнопки с событиями
  - `Title Screen` / `Game Over Screen` — экраны
  - `Media Manager` — звуки, кнопки звука
  - `Bar component` — прогресс-бар загрузки
  - `Preloader` — сцена загрузки

**Игра 2: Pong** (уроки 85-111)
- Гравитация, отскоки, физика
- paddle, ball, score, game over
- Звуки, Title Screen

**Игра 3: Space Shooter** (уроки 112-159)
- Камера, спавн камней, физика групп
- Пули, взрывы, вражеский корабль
- Близость, стрельба врага, урон
- **Балансировка:** Game balancing parts 1-2
- **Баги:** реальные баги и их исправление

**Ключевой паттерн: "Toolbox"** — переиспользуемый набор компонентов:
- Это прямой аналог наших систем в `src/systems/`
- Collision Checker → [[04-systems/CombatCore|CombatCore]]
- Game Controller → [[04-systems/PlayerSystem|PlayerSystem]]
- Scorebox → [[04-systems/HUDSystem|HUDSystem]]
- Preloader → [[07-scenes/BootScene|BootScene]]

**Подходит для:** быстрого клепания похожих механик, переиспользования паттернов в [[02-zones/_zones_index|Zones]], [[09-enemies/_enemies_index|Enemies]]

### 2. Habr — "Создание вашей первой игры на Phaser" (ИЗУЧЕНО)
**habr.com/ru/articles/325384/**

**Серия статей (v2 API, устаревший):**
- Часть 3 — Создание игрового мира
- Группы, мир физики, управление, цели

**Ключевые концепции из статьи:**
- `this.game.add.sprite()` — создаёт спрайт и возвращает объект Phaser.Sprite
- `this.game.world` — игровой мир, все созданные объекты
- Мир не имеет фиксированного размера, расширяется бесконечно
- Координаты 0,0 — центр мира
- Камера по умолчанию в верхнем левом углу
- `Phaser.Physics.ARCADE` — аркадная физика (достаточна для простых игр)
- `this.game.add.group()` — группы с `enableBody = true`
- `body.immovable = true` — неподвижные объекты (платформы)
- `ground.scale.setTo(2, 2)` — масштабирование

**Пример кода (TypeScript):**
```typescript
// Группа платформ
this.platforms = this.game.add.group();
this.platforms.enableBody = true;

// Пол
const ground = this.platforms.create(0, this.game.world.height - 64, 'platform');
ground.scale.setTo(2, 2);
ground.body.immovable = true;

// Уступы
const ledge = this.platforms.create(400, 400, 'platform');
ledge.body.immovable = true;
```

**Подходит для:** исторического контекста, понимания базовых концепций (мир, группы, спрайты)

### 3. TheDev.io
- **courses.thedev.io** — 404 (страница не найдена)
- Детальный курс: Arcade + Matter.js физика, спрайты, сцены, TexturePacker → анимация
- Ссылка может быть устаревшей

## Практическое применение

### Приоритет чтения:
1. **CourseHunter** (159 уроков) — самый практичный, 3 игры + шаблон. Уроки 27-84 (Road Rush) дают паттерн "Toolbox" — переиспользуемые компоненты
2. **Habr** — только для общего понимания, API устарел (v2)
3. **TheDev.io** — ссылка мертва, искать актуальную

### Конкретное применение:
- **Toolbox паттерн** из CourseHunter → наши `src/systems/`:
  - Collision Checker → [[04-systems/CombatCore|CombatCore]]
  - Game Controller → [[04-systems/PlayerSystem|PlayerSystem]]
  - Scorebox → [[04-systems/HUDSystem|HUDSystem]]
  - Media Manager → [[src/sound.js|sound.js]]
  - Preloader → [[07-scenes/BootScene|BootScene]]
- Физика коллизий → [[04-systems/CombatSystem|CombatSystem]]
- Спавн и группы → [[04-systems/EnemyAI|EnemyAI]]
- Анимации спрайтов → [[06-mechanics/Animations|Animations]]

## Ссылки

| Ресурс | URL | Уровень | Статус |
|--------|-----|---------|--------|
| CourseHunter | https://coursehunter.net/course/sozdanie-html5-igr-s-pomoshchyu-phaser-3 | Начинающий-Средний | ✅ Доступен |
| Habr | https://habr.com/ru/articles/325384/ | Начинающий (v2) | ✅ Доступен |
| TheDev.io | https://courses.thedev.io | Продвинутый | ❌ 404 |

## Связи

- [[01-tech/TECH_STACK|Tech Stack]] — Phaser 3.80
- [[04-systems/CombatSystem|CombatSystem]] — физика, коллизии
- [[04-systems/CombatCore|CombatCore]] — collision checker
- [[04-systems/PlayerSystem|PlayerSystem]] — game controller
- [[04-systems/HUDSystem|HUDSystem]] — scorebox
- [[04-systems/EnemyAI|EnemyAI]] — спавн, группы врагов
- [[06-mechanics/Animations|Animations]] — анимации
- [[07-scenes/_scenes_index|Scenes]] — структура сцен
- [[07-scenes/BootScene|BootScene]] — preloader
- [[02-zones/_zones_index|Zones]] — зоны, тайлмапы
- [[src/sound.js|sound.js]] — media manager
