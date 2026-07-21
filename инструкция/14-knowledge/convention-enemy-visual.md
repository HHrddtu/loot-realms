# Визуальная дифференциация врагов

#convention #enemy #visual

**Дата:** 2026-07-13
**Где:** `src/systems/EnemyAI.js`, `src/config/enemies.js`, все Spawner файлы

## Проблема

6 зон имели одинаковых визуально врагов — те же процедурные текстуры 30×36, отличались только цветом.

## Решение

### Tint по ролям
| Роль | Цвет | HEX |
|------|------|-----|
| Healer | зелёный | `#44ff44` |
| Mage | фиолетовый | `#aa66ff` |
| Assassin | розовый | `#ff44ff` |
| Fire | оранжевый | `#ff6622` |
| Poison | салатовый | `#44ff88` |
| Necro | тёмный фиолет | `#aa44ff` |
| Swarm | янтарный | `#ffaa44` |
| Tank | голубой | `#88aaff` |

### Aura particles
Каждые ~2 сек из ног врага поднимаются цветные частицы (healer, mage, fire, poison, necro).

### Размеры по ролям (scale)
| Роль | Scale |
|------|-------|
| Tank | 1.2–1.3 |
| Healer | 0.85 |
| Assassin | 0.75–0.8 |
| Archer | 0.85–0.9 |
| Mage | 0.85–0.9 |
| Swarm | 0.9 |

### Role icons
Над HP bar отображается значок роли: ❤ healer, ✨ mage, 🗡 assassin, 🔥 fire, ☠ poison, 💀 necro, 🐝 swarm, 🛡 tank.

## Связано
- [[convention-enemy-roles]] — системы ролей врагов
- [[convention-hp-bar-depth]] — паттерн UI элементов
