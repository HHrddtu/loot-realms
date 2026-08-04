import { GAME_WIDTH, GAME_HEIGHT } from '../config/index.js';
import { LORE } from '../config/lore.js';

const ZONE_TUTORIALS = {
    forest: {
        title: 'The Corrupted Forest',
        titleRu: 'Проклятый Лес',
        lines: [
            { text: 'Arrow Keys — move', icon: 'movement' },
            { text: 'SPACE / Left Click — attack', icon: 'attack' },
            { text: 'F — use potion', icon: 'potion' },
            { text: 'Break chests for loot. Kill the boss to proceed.', icon: 'info' }
        ],
        linesRu: [
            { text: 'Стрелки — движение', icon: 'movement' },
            { text: 'SPACE / ЛКМ — атака', icon: 'attack' },
            { text: 'F — зелье', icon: 'potion' },
            { text: 'Ломай сундуки за лут. Убей босса чтобы продолжить.', icon: 'info' }
        ]
    },
    arena: {
        title: 'The Arena',
        titleRu: 'Арена',
        lines: [
            { text: 'Right Click — DODGE! Avoid attacks with invincibility frames.', icon: 'dodge' },
            { text: 'Ancient Treant has 3 phases. Watch for attack telegraphs!', icon: 'boss' },
            { text: 'Phase 2 (60% HP): Roots summon. Phase 3 (30%): Charge attack.', icon: 'info' }
        ],
        linesRu: [
            { text: 'ПКМ — ДОДЖ! Уворачивайся от атак с неуязвимостью.', icon: 'dodge' },
            { text: 'Древний Трент имеет 3 фазы. Следи за телеграфами атак!', icon: 'boss' },
            { text: 'Фаза 2 (60% HP): Призывает корни. Фаза 3 (30%): Рывок.', icon: 'info' }
        ]
    },
    mine: {
        title: 'The Abandoned Mine',
        titleRu: 'Заброшенная Шахта',
        lines: [
            { text: 'Darkness ahead. Torches light your path.', icon: 'darkness' },
            { text: 'Shield enemies! Attack from BEHIND or SIDES for full damage.', icon: 'shield' },
            { text: 'Mine cart deals damage to enemies AND you. Use it!', icon: 'cart' },
            { text: 'New quest types: EXPLORE zones, TALK to NPCs.', icon: 'quest' }
        ],
        linesRu: [
            { text: 'Темнота впереди. Факелы освещают путь.', icon: 'darkness' },
            { text: 'Враги с щитами! Атакуй СЗАДИ или СБОКУ для полного урона.', icon: 'shield' },
            { text: 'Вагонетка наносит урон врагам И ТЕБЕ. Используй её!', icon: 'cart' },
            { text: 'Новые типы квестов: ИССЛЕДУЙ зоны, ГОВОРИ с NPC.', icon: 'quest' }
        ]
    },
    cave: {
        title: 'The Dark Caverns',
        titleRu: 'Тёмные Пещеры',
        lines: [
            { text: 'Golems have shields. Mages cast AoE spells. Watch the ground!', icon: 'info' },
            { text: 'Spiders are fast. Bats swarm. Golems are slow but deadly.', icon: 'info' }
        ],
        linesRu: [
            { text: 'Големы с щитами. Маги кастуют AoE. Следи за землёй!', icon: 'info' },
            { text: 'Пауки быстрые. Летучие мыши роятся. Големы медленные но смертоносные.', icon: 'info' }
        ]
    },
    village: {
        title: 'The Fallen Village',
        titleRu: 'Павшая Деревня',
        lines: [
            { text: 'Healers restore ally HP. Kill them first!', icon: 'healer' },
            { text: 'Assassins dash behind you for backstab damage.', icon: 'assassin' },
            { text: 'Talk to NPCs for quests. Some dialogue changes as you progress.', icon: 'npc' }
        ],
        linesRu: [
            { text: 'Хилеры восстанавливают HP союзников. Убей их первым!', icon: 'healer' },
            { text: 'Ассассины рывком прыгают за спину для BACKSTAB урона.', icon: 'assassin' },
            { text: 'Говори с NPC за квесты. Диалоги меняются с прогрессом.', icon: 'npc' }
        ]
    },
    hell: {
        title: 'The Infernal Gates',
        titleRu: 'Адские Врата',
        lines: [
            { text: 'Lava deals damage over time. Stay on safe ground.', icon: 'danger' },
            { text: 'Five enemy types work together. Healers + Mages = deadly combo.', icon: 'info' }
        ],
        linesRu: [
            { text: 'Лава наносит урон со временем. Держись на безопасной земле.', icon: 'danger' },
            { text: '5 типов врагов действуют вместе. Хилеры + Маги = смертельная комбинация.', icon: 'info' }
        ]
    }
};

const ENEMY_TUTORIALS = {
    hasShield: {
        title: 'Shield Enemy',
        titleRu: 'Враг с Щитом',
        text: 'This enemy blocks frontal attacks! Move to its SIDE or BEHIND for full damage.',
        textRu: 'Этот враг блокирует фронтальные атаки! Подойди СБОКУ или СЗАДИ для полного урона.'
    },
    healer: {
        title: 'Healer',
        titleRu: 'Хилер',
        text: 'Healers restore HP to nearby allies. Kill them first or they will keep healing!',
        textRu: 'Хилеры восстанавливают HP ближайших союзников. Убей их первым или они будут лечить!'
    },
    mage: {
        title: 'Mage',
        titleRu: 'Маг',
        text: 'Mages cast AoE spells. Watch for red warning circles on the ground — dodge them!',
        textRu: 'Маги кастуют AoE заклинания. Следи за красными кругами на земле — уворачивайся!'
    },
    assassin: {
        title: 'Assassin',
        titleRu: 'Ассассин',
        text: 'Assassins dash behind you for critical backstab damage. Keep moving!',
        textRu: 'Ассассины рывком прыгают за спину для критического урона. Двигайся!'
    }
};

const ABILITY_TUTORIALS = {
    shadowStep: {
        title: 'Shadow Step Unlocked!',
        titleRu: 'Shadow Step Разблокирован!',
        lines: [
            { text: 'SHIFT + Right Click — Phase through walls and objects!', icon: 'ability' },
            { text: 'Cooldown: 5 seconds. Move through obstacles to escape or reposition.', icon: 'info' }
        ],
        linesRu: [
            { text: 'SHIFT + ПКМ — Проходи сквозь стены и объекты!', icon: 'ability' },
            { text: 'Кулдаун: 5 секунд. Проходи сквозь препятствия для побега или перегруппировки.', icon: 'info' }
        ]
    },
    timeSlow: {
        title: 'Time Slow Unlocked!',
        titleRu: 'Замедление Времени Разблокировано!',
        lines: [
            { text: 'CTRL + Right Click — Slow all enemies by 50% for 3 seconds!', icon: 'ability' },
            { text: 'Cooldown: 30 seconds. Use when overwhelmed.', icon: 'info' }
        ],
        linesRu: [
            { text: 'CTRL + ПКМ — Замедли всех врагов на 50% на 3 секунды!', icon: 'ability' },
            { text: 'Кулдаун: 30 секунд. Используй когда зажали.', icon: 'info' }
        ]
    },
    vision: {
        title: 'Sight of the Unseen!',
        titleRu: 'Дар Видения!',
        lines: [
            { text: 'You can now see invisible enemies. They appear as transparent with a white outline.', icon: 'ability' },
            { text: 'Attack them to reveal fully. Some zones have hidden threats.', icon: 'info' }
        ],
        linesRu: [
            { text: 'Теперь ты видишь невидимых врагов. Они полупрозрачные с белой обводкой.', icon: 'ability' },
            { text: 'Атакуй чтобы сделать видимыми полностью. В некоторых зонах есть скрытые угрозы.', icon: 'info' }
        ]
    },
    map: {
        title: 'World Map Unlocked!',
        titleRu: 'Карта Мира Разблокирована!',
        lines: [
            { text: 'Press the Map button in the nav panel to view all chapters and zones.', icon: 'ability' },
            { text: 'Click a chapter to see its zones. Completed zones are marked with ✓.', icon: 'info' }
        ],
        linesRu: [
            { text: 'Нажми кнопку "Карта" в панели навигации чтобы увидеть все главы и зоны.', icon: 'ability' },
            { text: 'Нажми на главу чтобы увидеть зоны. Пройденные зоны отмечены ✓.', icon: 'info' }
        ]
    }
};

export class TutorialManager {
    constructor(scene) {
        this.scene = scene;
        this.shown = {};
        this.active = false;
        this.queue = [];
        this._guidedSteps = [];
        this._guidedIndex = -1;
        this._guidedHint = null;
        this._guidedHintBg = null;
    }

    showZoneIntro(zoneKey) {
        const key = 'intro_' + zoneKey;
        if (this.shown[key]) return;
        this.shown[key] = true;

        const lang = localStorage.getItem('game_lang') || 'en';
        const zoneLore = LORE.zones[zoneKey];
        if (!zoneLore) return;

        const title = lang === 'ru' ? (zoneLore.titleRu || zoneLore.title) : lang === 'de' ? (zoneLore.titleDe || zoneLore.title) : zoneLore.title;
        const text = lang === 'ru' ? (zoneLore.textRu || zoneLore.text) : lang === 'de' ? (zoneLore.textDe || zoneLore.text) : zoneLore.text;

        const s = this.scene;
        const elements = [];
        this._zoneIntroElements = elements;
        const depth = 16;

        const overlay = s.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0)
            .setDepth(depth).setScrollFactor(0);
        elements.push(overlay);

        const titleEl = s.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 20, title, {
            fontSize: '28px', fill: '#f1c40f', fontFamily: 'Georgia', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 4
        }).setOrigin(0.5).setDepth(depth + 1).setScrollFactor(0).setAlpha(0);
        elements.push(titleEl);

        const textEl = s.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 20, text, {
            fontSize: '13px', fill: '#bbb', fontFamily: 'Georgia', fontStyle: 'italic',
            wordWrap: { width: 500 }, align: 'center', lineSpacing: 4
        }).setOrigin(0.5).setDepth(depth + 1).setScrollFactor(0).setAlpha(0);
        elements.push(textEl);

        s.tweens.add({ targets: overlay, alpha: 0.6, duration: 800 });
        s.tweens.add({ targets: titleEl, alpha: 1, duration: 1200, delay: 300, ease: 'Sine.easeIn' });
        s.tweens.add({ targets: textEl, alpha: 0.8, duration: 1200, delay: 600, ease: 'Sine.easeIn' });

        s.time.delayedCall(4000, () => {
            s.tweens.add({
                targets: elements, alpha: 0, duration: 1000,
                onComplete: () => { elements.forEach(el => el.destroy()); }
            });
        });
    }

    cleanupZoneIntro() {
        const s = this.scene;
        if (this._zoneIntroElements) {
            this._zoneIntroElements.forEach(el => { if (el && el.destroy) el.destroy(); });
            this._zoneIntroElements = null;
        }
    }

    showZoneTutorial(zoneKey) {
        if (zoneKey === 'forest') return;
        const key = 'zone_' + zoneKey;
        if (this.shown[key]) return;
        const tutorial = ZONE_TUTORIALS[zoneKey];
        if (!tutorial) return;
        this.shown[key] = true;

        const lang = localStorage.getItem('game_lang') || 'en';
        const title = lang === 'ru' ? (tutorial.titleRu || tutorial.title) : tutorial.title;
        const lines = lang === 'ru' ? (tutorial.linesRu || tutorial.lines) : tutorial.lines;

        this._showPanel(title, lines, 0x3498db);
    }

    showEnemyTutorial(enemyStats) {
        let key = null;
        if (enemyStats.hasShield) key = 'hasShield';
        else if (enemyStats.role === 'healer') key = 'healer';
        else if (enemyStats.role === 'mage') key = 'mage';
        else if (enemyStats.role === 'assassin') key = 'assassin';

        if (!key || this.shown['enemy_' + key]) return;
        const tutorial = ENEMY_TUTORIALS[key];
        if (!tutorial) return;
        this.shown['enemy_' + key] = true;

        const lang = localStorage.getItem('game_lang') || 'en';
        const title = lang === 'ru' ? (tutorial.titleRu || tutorial.title) : tutorial.title;
        const text = lang === 'ru' ? (tutorial.textRu || tutorial.text) : tutorial.text;

        this._showPanel(title, [{ text, icon: 'enemy' }], 0xe74c3c);
    }

    showAbilityTutorial(abilityKey) {
        const key = 'ability_' + abilityKey;
        if (this.shown[key]) return;
        const tutorial = ABILITY_TUTORIALS[abilityKey];
        if (!tutorial) return;
        this.shown[key] = true;

        const lang = localStorage.getItem('game_lang') || 'en';
        const title = lang === 'ru' ? (tutorial.titleRu || tutorial.title) : tutorial.title;
        const lines = lang === 'ru' ? (tutorial.linesRu || tutorial.lines) : tutorial.lines;

        this._showPanel(title, lines, 0x8844ff);
    }

    _showPanel(title, lines, color) {
        const s = this.scene;
        if (s.menuOpen) return;
        s.menuOpen = true;
        s.physics.pause();

        const elements = [];
        const depth = 300;

        const overlay = s.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.7).setDepth(depth).setScrollFactor(0);
        elements.push(overlay);

        const pw = 520;
        const ph = 30 + lines.length * 36 + 40;
        const px = GAME_WIDTH / 2;
        const py = GAME_HEIGHT / 2;

        const bg = s.add.rectangle(px, py, pw, ph, 0x0a0a18, 0.96).setStrokeStyle(2, color).setDepth(depth + 1).setScrollFactor(0);
        elements.push(bg);

        const titleText = s.add.text(px, py - ph / 2 + 25, title, {
            fontSize: '20px', fill: '#' + color.toString(16).padStart(6, '0'),
            fontFamily: 'Georgia', fontStyle: 'bold', stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5).setDepth(depth + 2).setScrollFactor(0);
        elements.push(titleText);

        const divider = s.add.rectangle(px, py - ph / 2 + 45, pw - 40, 1, color, 0.3).setDepth(depth + 2).setScrollFactor(0);
        elements.push(divider);

        lines.forEach((line, i) => {
            const ly = py - ph / 2 + 65 + i * 36;
            const bullet = s.add.text(px - pw / 2 + 30, ly, '▸', {
                fontSize: '14px', fill: '#' + color.toString(16).padStart(6, '0'),
                fontFamily: 'Arial'
            }).setDepth(depth + 2).setScrollFactor(0);
            elements.push(bullet);

            const lineText = s.add.text(px - pw / 2 + 50, ly, line.text, {
                fontSize: '13px', fill: '#ddd', fontFamily: 'Arial',
                wordWrap: { width: pw - 90 }
            }).setDepth(depth + 2).setScrollFactor(0);
            elements.push(lineText);
        });

        const hint = s.add.text(px, py + ph / 2 - 20, 'SPACE / Click to continue', {
            fontSize: '11px', fill: '#666', fontFamily: 'Arial'
        }).setOrigin(0.5).setDepth(depth + 2).setScrollFactor(0);
        elements.push(hint);

        let canAdvance = false;
        s.time.delayedCall(600, () => { canAdvance = true; });

        // Auto-close after 5 seconds
        const autoClose = s.time.delayedCall(5000, () => {
            if (!canAdvance) return;
            canAdvance = false;
            s.tweens.add({
                targets: elements, alpha: 0, duration: 400,
                onComplete: () => {
                    elements.forEach(el => el.destroy());
                    s.menuOpen = false;
                    s.physics.resume();
                }
            });
        });

        const advance = () => {
            if (!canAdvance) return;
            canAdvance = false;
            autoClose.destroy();
            s.input.keyboard.off('keydown-SPACE', advance);
            s.input.off('pointerdown', advance);

            s.tweens.add({
                targets: elements, alpha: 0, duration: 400,
                onComplete: () => {
                    elements.forEach(el => el.destroy());
                    s.menuOpen = false;
                    s.physics.resume();
                }
            });
        };

        s.input.keyboard.on('keydown-SPACE', advance);
        s.input.on('pointerdown', advance);
    }

    save() {
        return { ...this.shown };
    }

    load(data) {
        if (data) this.shown = { ...data };
    }

    startGuidedTutorial(steps) {
        if (this._guidedSteps.length > 0) return;
        this._guidedSteps = steps;
        this._guidedIndex = 0;
        this._showGuidedHint();
    }

    _showGuidedHint() {
        const s = this.scene;
        if (this._guidedHint) { this._guidedHint.destroy(); this._guidedHint = null; }
        if (this._guidedHintBg) { this._guidedHintBg.destroy(); this._guidedHintBg = null; }
        if (this._guidedIndex < 0 || this._guidedIndex >= this._guidedSteps.length) return;

        const step = this._guidedSteps[this._guidedIndex];
        const lang = localStorage.getItem('game_lang') || 'en';
        const text = lang === 'ru' ? (step.textRu || step.text) : step.text;

        const depth = 50;
        const bx = GAME_WIDTH / 2;
        const by = GAME_HEIGHT - 30;

        this._guidedHintBg = s.add.rectangle(bx, by, 400, 28, 0x0a0a1a, 0.85)
            .setStrokeStyle(1, 0xf1c40f).setScrollFactor(0).setDepth(depth);
        this._guidedHint = s.add.text(bx, by, text, {
            fontSize: '12px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setScrollFactor(0).setDepth(depth + 1);

        s.tweens.add({
            targets: this._guidedHintBg,
            alpha: { from: 0.6, to: 1 },
            duration: 800, yoyo: true, repeat: -1
        });
    }

    advanceGuidedStep() {
        this._guidedIndex++;
        if (this._guidedIndex >= this._guidedSteps.length) {
            this._clearGuided();
            return;
        }
        this._showGuidedHint();
    }

    _clearGuided() {
        if (this._guidedHint) { this._guidedHint.destroy(); this._guidedHint = null; }
        if (this._guidedHintBg) { this._guidedHintBg.destroy(); this._guidedHintBg = null; }
        this._guidedSteps = [];
        this._guidedIndex = -1;
    }

    updateGuided() {
        if (this._guidedIndex < 0 || this._guidedIndex >= this._guidedSteps.length) return;
        const step = this._guidedSteps[this._guidedIndex];
        if (!step || !step.check) return;
        if (step.check(this.scene)) {
            const s = this.scene;
            const msg = step.completeMsg || 'Done!';
            const lang = localStorage.getItem('game_lang') || 'en';
            const completeText = lang === 'ru' ? (step.completeMsgRu || msg) : msg;
            s.floatingText(s.player.x, s.player.y - 50, completeText, '#2ecc71');
            this.advanceGuidedStep();
        }
    }
}
