# Phaser Examples — Навигационный хаб

#phaser3 #examples

> **5163 JS-файлов** — удалены из проекта для оптимизации opencode
> Переклонировать: `git clone --depth 1 https://github.com/phaserjs/examples.git <path>`
> Полная локальная копия labs.phaser.io для офлайн-поиска

## Быстрый поиск

```bash
# Искать по ключевому слову
grep -r "keyword" 09-enemies/phaser-examples/public/3.86/src/

# Искать по конкретной категории
ls 09-enemies/phaser-examples/public/3.86/src/actions/
ls 09-enemies/phaser-examples/public/3.86/src/camera/
```

---

## Категории и привязка к системам Loot Realms

### Управление и инпут (41 пример)
**Путь:** `src/actions/`
**Что внутри:** перемещение объектов,拖拽, следование, патрулирование
**Примеры:** `follow.js`, `drag.js`, `move-to.js`, `rotate.js`
**→ [[04-systems/PlayerSystem|PlayerSystem]]** — управление игроком

### Анимации (47 примеров)
**Путь:** `src/animation/`
**Что внутри:** sprite sheets, ключевые кадры, смешивание анимаций
**Примеры:** `blend.js`, `events.js`, `frame.js`, `generate.js`
**→ [[06-mechanics/Animations|Animations]]** — анимации персонажей и врагов

### Аудио (34 примера)
**Путь:** `src/audio/`
**Подкатегории:**
- `Web Audio/` (16) — основной API, рекомендуется
- `HTML5 Audio/` (10) — запасной вариант
- `No Audio/` (7) — заглушки
- `SID/` (1) — Sound Manager
**→ [[src/sound.js|sound.js]]** — звуковая система

### Камера (76 примеров)
**Путь:** `src/camera/`
**Подкатегории:**
- Основные (69) — follow, bounds, fade, flash, shake
- `multi camera/` (7) — несколько камер, split screen
**Примеры:** `follow.js`, `fade.js`, `flash.js`, `shake.js`, `zoom.js`
**→ [[07-scenes/GameScene|GameScene]]** — камера следующая за игроком

### Отображение (58 примеров)
**Путь:** `src/display/`
**Подкатегории:**
- `tint/` (14) — окрашивание спрайтов
- `blend modes/` (9) — режимы смешивания
- `align/` (9) — выравнивание объектов
- `shaders/` (8) — кастомные шейдеры
- `color/` (8) — работа с цветом
- `masks/` (5) — маскирование
- `alpha/` (5) — прозрачность
**→ [[04-systems/HUDSystem|HUDSystem]]** — UI эффекты

### События (9 примеров)
**Путь:** `src/events/`
**Что внутри:** обработка событий, эмиттеры
**→ [[04-systems/PlayerSystem|PlayerSystem]]** — ввод и события

### Кастомные компоненты (7 примеров)
**Путь:** `src/components/`
**Подкатегории:** `data/` (7)
**→ [[04-systems/_systems_index|Systems]]** — архитектура компонентов

### Сортировка по глубине (8 примеров)
**Путь:** `src/depth sorting/`
**Что внутри:** z-ordering, приоритет отрисовки
**→ [[07-scenes/GameScene|GameScene]]** — отрисовка объектов

### Демосцены (5 примеров)
**Путь:** `src/demoscene/`
**Что внутри:** визуальные эффекты, генеративная графика
**→ [[04-systems/ParticleSystem|ParticleSystem]]** — визуальные эффекты

### FX (3 примера)
**Путь:** `src/fx/`
**Подкатегории:** `barrel/` (3) — barrel distortion
**→ [[04-systems/SpellSystem|SpellSystem]]** — визуальные эффекты заклинаний

### Баги и тесты (200 примеров)
**Путь:** `src/bugs/`
**Что внутри:** regression tests, edge cases, воспроизведение багов
**→ Полезно для поиска решений странных проблем

---

## Маппинг по системам Loot Realms

| Система проекта | Категория примеров | Поиск |
|----------------|-------------------|-------|
| [[04-systems/PlayerSystem\|PlayerSystem]] | actions, events | `grep -r "keyboard\|pointer\|input" src/` |
| [[04-systems/CombatSystem\|CombatSystem]] | — | `grep -r "collider\|overlap\|physics" src/` |
| [[04-systems/SpellSystem\|SpellSystem]] | fx, display/shaders | `grep -r "tween\|shader\|fx" src/` |
| [[04-systems/EnemyAI\|EnemyAI]] | actions | `grep -r "follow\|patrol\|move" src/` |
| [[04-systems/HUDSystem\|HUDSystem]] | display | `grep -r "text\|bitmap\|dom" src/` |
| [[04-systems/ParticleSystem\|ParticleSystem]] | demoscene, fx | `grep -r "particle\|emitter" src/` |
| [[04-systems/InventoryPanel\|InventoryPanel]] | display | `grep -r "grid\|slot\|icon" src/` |
| [[07-scenes/GameScene\|GameScene]] | camera, depth sorting | `grep -r "camera\|follow" src/` |
| [[07-scenes/BootScene\|BootScene]] | audio | `grep -r "preload\|load" src/` |
| [[06-mechanics/Animations\|Animations]] | animation | `grep -r "sprite\|frame\|anim" src/` |
| [[src/sound.js\|sound.js]] | audio | `grep -r "sound\|music\|audio" src/` |

---

## Топ-10最有价值的 примеров для Loot Realms

1. `src/actions/follow.js` — объект следует за целью (камера, AI)
2. `src/camera/follow.js` — камера следит за игроком
3. `src/animation/blend.js` — смешивание анимаций
4. `src/display/tint/` — окрашивание (урон, баффы)
5. `src/audio/Web Audio/` — звуки и музыка
6. `src/actions/drag.js` — перетаскивание (инвентарь)
7. `src/camera/multi camera/` — HUD overlay
8. `src/display/shaders/` — кастомные эффекты
9. `src/depth sorting/` — правильная отрисовка
10. `src/bugs/` — решения странных проблем
