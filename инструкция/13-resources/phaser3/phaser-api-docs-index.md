# Phaser API Docs — Навигационный хаб

#phaser3 #docs

> **1971 файл, 62MB** — удалены из проекта для оптимизации opencode
> Перегенерировать: `cd <path> && typedoc ./types/phaser.d.ts --out ./docs`
> Сгенерировано через TypeDoc из `phaser.d.ts` (Phaser 3.80)

## Открытие

```
09-enemies/phaser-docs-gen/docs/index.html  →  в браузере
```

## Структура

| Папка | Файлов | Что содержит |
|-------|--------|-------------|
| `classes/` | 280 | Классы: Scene, Sprite, Group, Physics, ... |
| `functions/` | 507 | Функции API |
| `variables/` | 566 | Константы, переменные |
| `types/` | 361 | TypeScript типы |
| `modules/` | 185 | Модули движка |
| `interfaces/` | 50 | Интерфейсы |
| `enums/` | 9 | Перечисления |

## Ключевые классы для Loot Realms

| Класс | Файл | Где используется |
|-------|------|-----------------|
| `Phaser.Scene` | `classes/Phaser.Scene.html` | Все сцены |
| `Phaser.GameObjects.Sprite` | `classes/Phaser.GameObjects.Sprite.html` | Спрайты |
| `Phaser.GameObjects.Group` | `classes/Phaser.GameObjects.Group.html` | Группы объектов |
| `Phaser.Physics.Arcade.Group` | `classes/Phaser.Physics.Arcade.Group.html` | Физические группы |
| `Phaser.Physics.Arcade.Sprite` | `classes/Phaser.Physics.Arcade.Sprite.html` | Физические спрайты |
| `Phaser.GameObjects.Particles.ParticleEmitter` | `classes/Phaser.GameObjects.Particles.ParticleEmitter.html` | Частицы |
| `Phaser.Tweens.Tween` | `classes/Phaser.Tweens.Tween.html` | Твины |
| `Phaser.Animations.Animation` | `classes/Phaser.Animations.Animation.html` | Анимации |
| `Phaser.Input.Keyboard.Key` | `classes/Phaser.Input.Keyboard.Key.html` | Клавиатура |
| `Phaser.Cameras.Scene2D.Camera` | `classes/Phaser.Cameras.Scene2D.Camera.html` | Камера |

## Поиск по документации

```bash
# Искать класс
grep -r "ClassName" 09-enemies/phaser-docs-gen/docs/classes/

# Искать метод
grep -r "methodName" 09-enemies/phaser-docs-gen/docs/
```
