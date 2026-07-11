# Convention: Template-враги — паттерн текстур

#convention #textures #enemies

> Дата: 2026-07-11

## Паттерн

Все template-враги используют общий паттерн отрисовки:

```js
const enemyDefs = [
    { key: 'enemy_name', w: 40, bh: 44, body: '#hex', head: '#hex', detail: '#hex', eyes: '#hex', accent: '#hex' }
];

enemyDefs.forEach(def => {
    // Спрайтшет (4 кадра анимации ходьбы)
    (() => {
        const fw = def.w, fh = def.bh, frames = 4;
        // ... создание canvas, отрисовка каждого кадра
        addSheet(def.key + '_walk', canvas, { frameWidth: fw, frameHeight: fh });
    })();
    
    // Статическая текстура
    mk(def.key, def.w, def.bh, (c) => {
        // ... отрисовка
    });
});
```

## Структура врага (сверху вниз)

```
1. Shadow (rgba(0,0,0,0.3)) — эллипс под ногами
2. Legs — 2 прямоуголовика (detail цвет)
3. Body — 3 оттенка (body → accent → detail)
4. Arms — 2 прямоуголовика по бокам (body цвет)
5. Head — 2 оттенка (head → accent)
6. Eyes — белки (#ffffff) + зрачки (eyes цвет)
7. Mouth — 1 прямоуголовик (detail цвет)
```

## Размеры

| Тип | Размер | Пример |
|-----|--------|--------|
| Маленький | 28x28 | shade, stalker |
| Средний | 32x32 — 36x36 | archer, mage |
| Большой | 40x44 — 44x48 | brute, guard, golem |

## Цветовые схемы по зонам

| Зона | body | accent | eyes |
|------|------|--------|------|
| Village | Тёмно-красный | Красный | Красный |
| Hell | Тёмно-красный | Оранжевый | Оранжевый |
| Depths | Коричневый | Светло-коричневый | Оранжевый |
| Cursed | Тёмно-зелёный | Зелёный | Жёлтый/Зелёный |
| Shadow | Чёрно-фиолетовый | Фиолетовый | Cyan/Фиолетовый |
| Winter | Синий | Голубой | Cyan |

## Важно

- **НЕ менять** `def.key` — имена текстур остаются прежними
- **НЕ менять** collision boxes (`bw`, `bh`) в config — они отдельные
- **Минимум деталей** — 7 элементов (shadow, legs, body, arms, head, eyes, mouth)
- **3 оттенка body** — для объёма

## Связи

- [[bug-floating-text-scrollfactor]] — UI элементы
- [[bug-npc-quest-icon-position]] — NPC позиционирование
