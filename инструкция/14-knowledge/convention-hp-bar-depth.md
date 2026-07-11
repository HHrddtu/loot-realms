# Convention: HP bar depth

#convention #ui #depth

> Дата: 2026-07-11

## Правило

**Все HP bar ДОЛЖНЫ иметь depth >= 15, чтобы быть видимыми над врагами (depth=5).**

## Depth layers

| Depth | Элемент |
|-------|---------|
| 0-4 | Фон, декорации, порталы |
| 5 | Враги, NPC, интерактивные объекты |
| 6-14 | Эффекты, частицы |
| **15+** | **HP bar, name tags** |
| 100+ | UI (menu, dialog, inventory) |

## Паттерн

```js
// Правильно:
e.hpBg = s.add.rectangle(x, y, w, h, 0x000000).setDepth(15);
e.hpFill = s.add.rectangle(x, y, w, h, 0xff0000).setDepth(15);

// Неправильно:
e.hpBg = s.add.rectangle(x, y, w, h, 0x000000).setDepth(6); // Слишком низко!
```

## Исключения

- Boss HP bars с `setScrollFactor(0)` — используют depth 12-20 (screen space)
- Enemy HP bars — depth 15 (world space)

## Связи

- [[convention-enemy-texture-template]] — структура врагов
- [[bug-floating-text-scrollfactor]] — screen vs world coordinates
