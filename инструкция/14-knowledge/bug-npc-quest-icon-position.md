# Bug: NPC quest icon не следует за спрайтом

#bug #npc #ui

> Дата: 2026-07-11

## Проблема

Quest icon и nameTag NPC обновляли позицию только частично. `questIcon` вообще не обновлял позицию в `updateQuestIcons()`.

## Корневая причина

```js
// БЫЛО (неправильно):
if (spr.nameTag) {
    spr.nameTag.setPosition(spr.x, spr.y - 30);
}
// questIcon НЕ обновлялся

// СТАЛО (правильно):
if (spr.questIcon) {
    spr.questIcon.setPosition(spr.x, spr.y - 44);
    // ... visibility logic
}
if (spr.nameTag) {
    spr.nameTag.setPosition(spr.x, spr.y - 30);
}
```

## Правило

**Все дочерние элементы NPC (nameTag, questIcon, hint) ДОЛЖНЫ обновлять позицию в update loop.**

## Паттерн

```js
updateQuestIcons() {
    this.scene.npcSprites.forEach(spr => {
        // 1. Обновить позиции всех дочерних элементов
        if (spr.questIcon) spr.questIcon.setPosition(spr.x, spr.y - 44);
        if (spr.nameTag) spr.nameTag.setPosition(spr.x, spr.y - 30);
        
        // 2. Обновить видимость/стиль
        const status = getNpcQuestStatus(spr.npcKey);
        if (spr.questIcon) {
            spr.questIcon.setVisible(status === 'quest_available' || status === 'quest_complete');
        }
    });
}
```

## Связи

- [[bug-floating-text-scrollfactor]] — похожая проблема с позиционированием UI
- [[convention-npc-structure]] — структура NPC спрайтов
