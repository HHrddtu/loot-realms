# Difficulty — Система сложностей

#mechanics #difficulty

## Множители

| Сложность | HP | DMG | EXP | Лут | Шанс редкого |
|-----------|-----|-----|-----|-----|--------------|
| Normal | ×1.0 | ×1.0 | ×1.0 | ×1.0 | ×1.0 |
| Hard | ×1.5 | ×1.3 | ×1.5 | ×1.3 | ×1.2 |
| Expert | ×2.5 | ×2.0 | ×2.5 | ×2.0 | ×1.5 |
| Nightmare | ×4.0 | ×3.0 | ×4.0 | ×3.0 | ×2.0 |
| Hell | ×7.0 | ×5.0 | ×7.0 | ×5.0 | ×3.0 |
| Abyss | ×12.0 | ×8.0 | ×12.0 | ×8.0 | ×5.0 |

## Разблокировка
- Normal: сразу
- Hard: победа Treant
- Expert: победа Skeleton Lord
- Nightmare: Skeleton Lord on Expert
- Hell: Skeleton Lord on Nightmare
- Abyss: Skeleton Lord on Hell

## Формула боссов
```js
boss_hp = base_hp * difficulty_mult * (1 + floor * 0.1)
boss_damage = base_damage * difficulty_mult * (1 + floor * 0.1)
boss_exp = base_exp * difficulty_mult * (1 + floor * 0.2)
```

## Код
- `src/config/difficulties.js` — DIFF_MULT
- `src/config/difficulty.js` — DIFFICULTY_KEYS, DIFFICULTY_UNLOCK_MAP

---

> См. также: [[03-bosses/_bosses_index|Bosses]], [[06-mechanics/Combat|Combat]], [[06-mechanics/Loot|Loot]]
