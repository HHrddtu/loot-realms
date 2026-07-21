# Система уникальных ролей врагов

#convention #enemy #roles

**Дата:** 2026-07-13
**Где:** `src/systems/EnemyAI.js`, `src/config/enemies.js`

## Решение

Каждый тип врага имеет уникальную роль с особым поведением:

| Роль | Поведение | Зоны |
|------|-----------|------|
| dps | wander/chase (по умолчанию) | Все |
| archer | держит дистанцию, ranged attack | Cave, Village, Depths, Shadow |
| healer | лечит союзников, убегает при <40% HP | Village, Depths, Hell, Shadow |
| tank | таунт + рывок, shield | Cave, Village, Depths, Hell, Shadow, Tower |
| assassin | рывок за спину (BACKSTAB ×1.6) | Village, Hell, Depths, Shadow, Tower |
| mage | AoE атака с warning circle | Village, Hell, Depths, Shadow, Tower |
| poison | DOT 3 сек, зелёное облако | Cave (пауки), Cursed, Shadow |
| necro | поднимает 2 мертвецов каждые 8 сек | Cursed, Depths |
| fire | огненная атака с визуалом | Hell (лучник) |
| swarm | быстрее с союзниками рядом | Cave (летучие мыши), Hell (импы) |

## Визуальные индикаторы

Над HP bar отображается значок роли:
- 🛡 tank, ❤ healer, ✨ mage, 🗡 assassin
- 🔥 fire, ☠ poison, 💀 necro, 🐝 swarm

## Связано
- [[convention-enemy-texture-template]] — паттерн текстур врагов
- [[convention-hp-bar-depth]] — паттерн UI элементов
