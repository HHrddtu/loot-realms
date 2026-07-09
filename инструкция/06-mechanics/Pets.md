# Pets — Питомцы

#mechanics #pets

## PET_DB — Все питомцы

### Common (Обычные)
| ID | Имя | Тип | Статы | Описание |
|----|-----|-----|-------|----------|
| pet_slime | Slime | companion | hpPercent+2 | A bouncy companion that adds health |
| pet_rat | Rat | collector | lootPercent+3 | Sniffs out treasures |
| pet_bat | Bat | attacker | damagePercent+2 | A tiny fanged friend |

### Uncommon (Необычные)
| ID | Имя | Тип | Статы | Описание |
|----|-----|-----|-------|----------|
| pet_wolf | Wolf Pup | attacker | damagePercent+4, critPercent+2 | Fierce pup with sharp instincts |
| pet_spider | Spider | collector | lootPercent+5, speedPercent+2 | Weaves webs that catch shiny things |
| pet_imp | Imp | companion | spellPercent+4, hpPercent+3 | Mischievous magical familiar |

### Rare (Редкие)
| ID | Имя | Тип | Статы | Описание |
|----|-----|-----|-------|----------|
| pet_golem | Golem | tank | hpPercent+8, damageReduction+3 | Stone guardian that absorbs hits |
| pet_wraith | Wraith | attacker | damagePercent+7, critPercent+4 | Spectral assassin |
| pet_drake | Baby Drake | companion | damagePercent+5, hpPercent+5, spellPercent+3 | Tiny dragon with big potential |

### Legendary (Легендарные)
| ID | Имя | Тип | Статы | Описание |
|----|-----|-----|-------|----------|
| pet_phoenix | Phoenix | companion | damagePercent+8, regenPercent+5, spellPercent+5 | Reborn from ash |
| pet_dragon | Dragon | attacker | damagePercent+12, critPercent+6, hpPercent+6 | Apex predator of the skies |
| pet_celestial | Celestial | tank | hpPercent+12, damageReduction+8, regenPercent+4 | Divine being of pure light |

## Уровни питомцев
- Max level: 5
- Scaling: +30% статов за уровень
- EXP formula: `50 * level^1.6`

## Кейсы

| Кейс | Цена | Шансы | Пул |
|------|------|-------|-----|
| Wooden | 30cr | common 65%, uncommon 28%, rare 6%, legendary 1% | slime, rat, bat, wolf, spider, imp |
| Iron | 80cr | common 15%, uncommon 50%, rare 28%, legendary 7% | wolf, spider, imp, golem, wraith, drake, slime, rat, bat |
| Golden | 200cr | common 0%, uncommon 10%, rare 55%, legendary 35% | golem, wraith, drake, phoenix, dragon, celestial, wolf, spider, imp |

## Pet Combat
| Параметр | Значение |
|----------|---------|
| Урон | 30% × playerDamage × levelScale |
| Follow | snap >100px, lerp 0.12 |
| Attack CD | 1.5s |
| Tank aggro radius | 150px |

### Sound
- `playPetAttack()` — звук атаки
- `playPetPickup()` — звук подбора

---

> См. также: [[04-systems/PetSystem|PetSystem]], [[10-economy/Crystals|Crystals]], [[07-scenes/PetScene|PetScene]], [[08-textures/PetTextures|PetTextures]]
