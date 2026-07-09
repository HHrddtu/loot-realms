# BUGFIX: v0.9.8 — Cave Stairs Ghost + Account Equipment Save

#bugfix #tech

> [!INFO] Связанные заметки
> - [[PROJECT_STATE]] — история версий
> - [[TECHNICAL_DESIGN]] — архитектура зон
> - [[README]] — карта содержимого

## Билд: v0.9.8

---

## Баг 1: Призрачная лестница из пещеры в Village/Hell

### Симптом
После убийства Giant Bat в Cave и перехода в Village, спрайт `cave_stairs` оставался видимым по центру карты как неинтерактивная модель.

### Корень
`_clearCave()` вызывается через `delayedCall(800)` в `_enterCaveVillage()`. Если `this.caveStairs` оказывается `null` (ссылка потерялась, или `_clearCave()` не сработал вовремя), спрайт-сирота остаётся в `this.children.list` Phaser и продолжает рендериться. При входе в Village/Hell из других зон (`_exitHell()` → `_setupVillage()`) вызывается `_clearHell()`, который не знает про `caveStairs`.

### Решение
Метод `_destroyOrphanedCaveStairs()` — сканирует `this.children.list` и уничтожает любой спрайт с текстурой `cave_stairs`. Вызывается в начале `_setupVillage()` и `_setupHell()`.

```javascript
_destroyOrphanedCaveStairs() {
    if (this.caveStairs) { this.caveStairs.destroy(); this.caveStairs = null; }
    if (this.caveStairsHint) { this.caveStairsHint.destroy(); this.caveStairsHint = null; }
    const toRemove = [];
    this.children.list.forEach(child => {
        if (child.texture && child.texture.key === 'cave_stairs') toRemove.push(child);
    });
    toRemove.forEach(s => s.destroy());
}
```

---

## Баг 2: Account equipment не сохраняется при закрытии

### Симптом
Одеваешь account предмет → закрываешь/обновляешь страницу → при перезапуске предмет снят и лежит в инвентаре.

### Корень
Автосохранение (`doSave()`) запускалось только по таймеру каждые 5 минут. При закрытии/обновлении вкладки сохранения не было — `shutdown` event только останавливал музыку, `beforeunload` хендлер отсутствовал.

### Решение
```javascript
this.events.on('shutdown', () => {
    if (this._onBeforeUnload) {
        window.removeEventListener('beforeunload', this._onBeforeUnload);
        this._onBeforeUnload = null;
    }
    this.doSave();
    stopMusic();
});

this._onBeforeUnload = () => this.doSave();
window.addEventListener('beforeunload', this._onBeforeUnload);
```

---

## Изменённые файлы

- `src/scenes/GameScene.js` — `_destroyOrphanedCaveStairs()`, `beforeunload` handler, `shutdown` save
