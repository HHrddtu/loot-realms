# Все боссы

#boss #index

| Босс | Зона | HP (Normal) | DMG | Кристаллы | Абилки |
|------|------|-------------|-----|-----------|--------|
| [[03-bosses/Treant\|Treant]] | [[02-zones/Forest\|Forest]] | 500 | 15 | 4-8 | AoE circle attack, melee |
| [[03-bosses/SkeletonLord\|Skeleton Lord]] | [[02-zones/Arena\|Arena]] / [[02-zones/Mine\|Mine]] | — | — | 6-12 | Summon skeletons, charge |
| [[03-bosses/GiantBat\|Giant Bat]] | [[02-zones/Cave\|Cave]] | — | — | 10-18 | Dash, Screech AoE, Summon |
| [[03-bosses/PurpleDemon\|Purple Demon]] | [[02-zones/Cemetery\|Cemetery]] | — | — | 10-16 | Split (клоны), teleport |
| [[03-bosses/RedDemon\|Red Demon]] | [[02-zones/Hell\|Hell]] | — | — | 20-35 | Fire AoE, summon imps |
| [[03-bosses/IceSpirit\|Ice Spirit]] | [[02-zones/Snowy\|Snowy]] | — | — | 20-35 | Frost Wave, Blizzard, Ice Shards |
| [[03-bosses/BanditLeader\|Bandit Leader]] | [[02-zones/Castle\|Castle]] | — | — | 25-50 | Windup Strike, Whirlwind, Summon |

## Масштабирование по сложностям

```js
boss_hp = base_hp * difficulty_mult * (1 + floor * 0.1)
boss_damage = base_damage * difficulty_mult * (1 + floor * 0.1)
boss_exp = base_exp * difficulty_mult * (1 + floor * 0.2)
```

См. [[06-mechanics/Difficulty|Difficulty]] для множителей.

---

> См. также: [[02-zones/_zones_index|Зоны]], [[06-mechanics/Combat|Combat mechanics]]
