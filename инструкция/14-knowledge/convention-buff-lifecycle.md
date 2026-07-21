# Конвенция: Buff/Modifier lifecycle

#convention #buff #modifier #balance

**Дата:** 2026-07-21

## Summary

Любой бафф/модификатор, который сеттится в одном месте, **должен потребляться (читаться) в формуле урона/эффекта** в другом месте. Иначе это косметика, которая вводит игрока в заблуждение.

## Правило

```
SET (где-то сеттится значение) → CONSUME (где-то читается в формуле)
```

Если `SET` существует, но `CONSUME` отсутствует — это баг.

## Примеры из кода

```js
// ✅ Правильно — synergyDmgBuff сеттится и читается:
// SpellSystem.js
s._synergyDmgBuff = 0.3;

// CombatCore.hitEnemy() — ЧИТАЕТ бафф в формуле урона
if (s._synergyDmgBuff) {
    dmg = Math.floor(dmg * (1 + s._synergyDmgBuff));
}
```

```js
// ❌ Неправильно — prestige effects сеттились, но не читались:
// prestige.js
{ effect: { lifesteal: 0.1 } }  // SET

// Нигде в коде нет:
// if (prestigeLevel >= X) { damage = damage * (1 + lifesteal) }  // CONSUME отсутствовал
```

## Чек-лист при добавлении нового баффа

1. Определить где сеттится значение (`this._newBuff = X`)
2. Найти формулу, куда он должен 적용иться
3. Добавить чтение: `if (this._newBuff) { ... }`
4. Добавить визуальный индикатор (опционально, но рекомендуется)
5. Добавить таймер сброса (если бафф временный)

## Где искать формулы

| Бафф | Формула |
|------|---------|
| Damage | `CombatCore.hitEnemy()`, `CombatCore.applyAttackAt()` |
| Damage reduction | `CombatCore.takeDamage()` |
| Movement speed | `PlayerSystem.recalcStats()` → `s.playerSpeed` |
| HP | `PlayerSystem.recalcStats()` → `s.player.maxHp` |
| Crit | `CombatCore.hitEnemy()` → crit chance check |
| Spell damage | `SpellSystem.castSpell()`, `SpellProjectile` |

## Когда применяется

- Добавление нового prestige уровня
- Добавление нового сет-бонуса
- Добавление нового баффа от питомца/таланта/зелья
- Любое изменение `s._someBuff` или `s.computedDamageReduction` и т.д.

## Связи

- [[decision-prerelease-fixes-v3]] — 5 критических фиксов, включая synergyDmgBuff и prestige
- [[01-tech/ARCHITECTURE|Architecture]]
