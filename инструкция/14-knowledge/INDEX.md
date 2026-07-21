# Knowledge Base — Индекс

> Автоматически обновляемый индекс всех знаний проекта Loot Realms.
> Формат: `| Дата | Тип | Тема (ссылка) | Краткое описание |`

## Ресурсы (13-resources)

| Дата | Категория | Тема | Описание |
|------|-----------|------|----------|
| 2026-07-10 | phaser3 | [Phaser — База и экосистема](../13-resources/phaser3/phaser-ecosystem.md) | Docs, Learn, Labs, Examples, Phaser 4 |
| 2026-07-10 | phaser3 | [Phaser + AI — Агенты и скиллы](../13-resources/phaser3/phaser-ai-agents.md) | phaser4-gamedev, Game Agent, .agents/skills |
| 2026-07-10 | phaser3 | [Курсы по Phaser (RU)](../13-resources/phaser3/phaser-courses-ru.md) | TheDev.io, CourseHunter, Habr |
| 2026-07-10 | gamedesign | [Obsidian как база знаний для ИИ](../13-resources/gamedesign/obsidian-ai-knowledge-base.md) | Методология PARA vs Zettelkasten, MOC, AI-интеграция |

## Знания (14-knowledge)

| Дата | Тип | Тема | Описание |
|------|-----|------|----------|
| 2026-07-13 | bug | [Mine cart knockback up](bug-mine-cart-knockback.md) | Вагонетка толкала игрока вверх из-за фиксированного Y-вектора |
| 2026-07-13 | bug | [Shield icon persists](bug-shield-icon-persists.md) | 🛡 индикатор не исчезал при смерти врага во всех зонах |
| 2026-07-13 | review | [Критическое ревью геймдизайна](game-design-review-critical.md) | Полный разбор нарратива, геймплея, мультиплеера, архитектуры. 3 главные задачи для удержания игроков |
| 2026-07-15 | review | [Ревью v2 — после исправлений](game-design-review-v2.md) | 8 критичных проблем осталось: интро, 14 одинаковых зон, реиграбельность, мир молчит |
| 2026-07-12 | decision | [Multiplayer host-authoritative](decision-multiplayer-host-authoritative.md) | Хост — единственный авторитет игрового состояния. Snapshot 20Hz + input 30Hz, render delay 100ms, attack_action для урона |
| 2026-07-11 | bug | [floatingText scrollfactor](bug-floating-text-scrollfactor.md) | UI текст должен использовать setScrollFactor(0) |
| 2026-07-11 | bug | [NPC quest icon position](bug-npc-quest-icon-position.md) | Дочерние элементы NPC обновлять позицию в update |
| 2026-07-11 | bug | [Portal hint position](bug-portal-hint-position.md) | Hint тексты привязанные к движущимся объектам обновлять в update |
| 2026-07-11 | convention | [Enemy texture template](convention-enemy-texture-template.md) | Паттерн отрисовки template-врагов (7 элементов, 3 оттенка) |
| 2026-07-13 | convention | [HP bar depth](convention-hp-bar-depth.md) | HP bar depth >= 15 чтобы быть видимыми над врагами |
| 2026-07-13 | decision | [Reward system](decision-reward-system.md) | Уникальные награды за боссов: Vision, Map, Shadow Step, Time Slow |
| 2026-07-13 | convention | [Enemy roles](convention-enemy-roles.md) | 10 уникальных ролей врагов с индикаторами |
| 2026-07-13 | convention | [Tutorial manager](convention-tutorial-manager.md) | Панельное обучение для зон, врагов, способностей |
| 2026-07-13 | convention | [Enemy visual](convention-enemy-visual.md) | Tint, aura, scale, role icons для визуальной дифференциации |
| 2026-07-13 | bug | [Visual fixes](bug-visual-fixes.md) | Карта нав-панель, role icons, clearStroke Sprite bug |
| 2026-07-18 | bug | [Village defense waves](bug-village-defense-waves.md) | AI сгенерировал defense waves без ведома разработчика, сломал camp→clear→gate |
| 2026-07-18 | bug | [Lore item cleanup](bug-lore-item-cleanup.md) | scroll_item спрайты утекали между зонами из-за отсутствия cleanup |
| 2026-07-18 | bug | [Tutorial persistence](bug-tutorial-persistence.md) | TutorialManager.shown не сохранялся в сейв, туториали повторялись |
| 2026-07-18 | gotcha | [removeAllEvents kills timers](gotcha-remove-all-events.md) | removeAllEvents убивает ВСЕ таймеры сцены, включая чужие |
| 2026-07-18 | gotcha | [Phaser Sprite no addChild](gotcha-phaser-sprite-no-addchild.md) | Sprite не имеет addChild — нужен Container или отдельный спрайт |
| 2026-07-18 | decision | [Предрелизный аудит v3 — критические фиксы](decision-prerelease-fixes-v3.md) | 5 блокеров релиза: imports, quest, synergy, prestige, finale choice |
| 2026-07-21 | convention | [Cleanup при смене зоны](convention-zone-cleanup.md) | BaseZone.clear(), orphaned-объекты, обнуление ссылок, таймеры |
| 2026-07-21 | convention | [Buff/Modifier lifecycle](convention-buff-lifecycle.md) | SET → CONSUME: любой бафф должен читаться в формуле, иначе косметика |
| 2026-07-21 | convention | [Структура файлов зоны](convention-zone-file-structure.md) | Zone + Spawner + Boss + (Projectiles), наследование BaseZone |
| 2026-07-21 | convention | [Config-driven design](convention-config-driven.md) | Все параметры в src/config/*.js, без магических чисел в коде |
| 2026-07-21 | log | [Session Log](SESSION_LOG.md) | Журнал сессий — хронология разработки из git history |
| ~2026-07-19 | failed | [Zoom/Fullscreen эксперимент](FAILED_EXPERIMENTS.md) | Увеличение зон ×1.5 + camera zoom — откат из-за абсолютных NPC-координат |

---

## Типы записей

| Тип | Описание | Шаблон |
|-----|----------|--------|
| `resource` | Внешний ресурс (курс, туториал, статья) | `_templates/resource-template.md` |
| `decision` | Архитектурное решение и его обоснование | `_templates/decision-template.md` |
| `convention` | Паттерн кода, правило именования | `_templates/convention-template.md` |
| `gotcha` | Ловушка API, тонкость окружения | `_templates/gotcha-template.md` |
| `bug` | Найденный и исправленный баг | `_templates/bug-template.md` |
| `review` | Ревью кода/геймдизайна | — |
| `failed` | Неудачный эксперимент (откат) | — |
| `log` | Журнал сессий | — |

## Категории ресурсов

| Категория | Папка | Описание |
|-----------|-------|----------|
| `phaser3` | `13-resources/phaser3/` | Phaser 3 туториалы, гайды, документация |
| `gamedesign` | `13-resources/gamedesign/` | Game design паттерны, баланс, механики |
| `javascript` | `13-resources/javascript/` | JS/ES6 best practices, паттерны |
| `firebase-peerjs` | `13-resources/firebase-peerjs/` | Firebase + PeerJS туториалы |
