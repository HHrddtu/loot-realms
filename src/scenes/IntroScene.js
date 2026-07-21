import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from '../config/index.js';
import { LORE } from '../config/lore.js';

export default class IntroScene extends Phaser.Scene {
    constructor() {
        super('Intro');
    }

    init(data) {
        this.classKey = data.classKey || 'sage';
        this.difficulty = data.difficulty || 'Normal';
        this.multiplayer = data.multiplayer || false;
        this.loadOnStart = data.load || false;
    }

    create() {
        const lang = localStorage.getItem('game_lang') || 'en';
        this.cameras.main.setBackgroundColor('#000000');
        this.elements = [];

        const t = (key) => {
            const texts = {
                longAgo: { en: 'Long ago, a hero saved the village...', ru: 'Давно, герой спас деревню...', de: 'Vor langer Zeit rettete ein Held das Dorf...' },
                darkness: { en: 'But beneath the foundation, darkness grew...', ru: 'Но под фундаментом росла тьма...', de: 'Doch unter dem Fundament wuchs die Dunkelheit...' },
                now: { en: 'Now it awakens. And you are the last hope.', ru: 'Теперь она пробуждается. И ты — последняя надежда.', de: 'Jetzt erwacht sie. Und du bist die letzte Hoffnung.' },
                pressSpace: { en: 'Press SPACE to begin...', ru: 'Нажми SPACE чтобы начать...', de: 'Drücke SPACE um zu beginnen...' }
            };
            return texts[key]?.[lang] || texts[key]?.en || '';
        };

        const cls = LORE.classes[this.classKey] || LORE.classes.sage;
        const clsText = lang === 'ru' ? cls.textRu : lang === 'de' ? cls.textDe : cls.text;
        const clsName = lang === 'ru' ? cls.nameRu : lang === 'de' ? cls.nameDe : cls.name;

        // Phase 1: "Long ago..."
        this._showText(t('longAgo'), 2000, () => {
            // Phase 2: Show forest scene
            this._showScene(0x1a3a1a, 0x2ecc71, 'FOREST', 2000, () => {
                // Phase 3: "But darkness grew..."
                this._showText(t('darkness'), 2000, () => {
                    // Phase 4: Show hell scene
                    this._showScene(0x3a0a0a, 0xe74c3c, 'HELL', 2000, () => {
                        // Phase 5: "Now it awakens..."
                        this._showText(t('now'), 2500, () => {
                            // Phase 6: Class intro
                            this._showClassIntro(clsName, clsText, 3000, () => {
                                // Phase 7: Ready
                                this._showReady(t('pressSpace'));
                            });
                        });
                    });
                });
            });
        });
    }

    _showText(text, duration, onDone) {
        this._clearElements();
        const el = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2, text, {
            fontSize: '20px', fill: '#ccc', fontFamily: 'Georgia', fontStyle: 'italic',
            wordWrap: { width: 500 }, align: 'center', lineSpacing: 8
        }).setOrigin(0.5).setAlpha(0).setDepth(10);
        this.elements.push(el);

        this.tweens.add({
            targets: el, alpha: 1, duration: 1500, ease: 'Sine.easeIn',
            onComplete: () => {
                this.time.delayedCall(duration, () => {
                    this.tweens.add({
                        targets: el, alpha: 0, duration: 800,
                        onComplete: () => { this._clearElements(); if (onDone) onDone(); }
                    });
                });
            }
        });
    }

    _showScene(bgColor, accentColor, label, duration, onDone) {
        this._clearElements();

        const bg = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, bgColor).setDepth(0);
        this.elements.push(bg);

        // Ground
        const ground = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT * 0.7, GAME_WIDTH, GAME_HEIGHT * 0.3, Phaser.Display.Color.ValueToColor(bgColor).darken(30).color).setDepth(1);
        this.elements.push(ground);

        // Trees/objects silhouettes
        const count = 8;
        for (let i = 0; i < count; i++) {
            const x = (i / count) * GAME_WIDTH + Math.random() * 50;
            const h = 40 + Math.random() * 60;
            const tree = this.add.rectangle(x, GAME_HEIGHT * 0.7 - h / 2, 8 + Math.random() * 12, h, Phaser.Display.Color.ValueToColor(bgColor).darken(20).color).setDepth(2);
            this.elements.push(tree);
        }

        // Particles
        for (let i = 0; i < 15; i++) {
            const p = this.add.circle(
                Math.random() * GAME_WIDTH,
                Math.random() * GAME_HEIGHT * 0.7,
                2 + Math.random() * 3,
                accentColor, 0.3 + Math.random() * 0.4
            ).setDepth(3);
            this.elements.push(p);
            this.tweens.add({
                targets: p, y: p.y - 50 - Math.random() * 100, alpha: 0,
                duration: 2000 + Math.random() * 2000, delay: Math.random() * 1000,
                repeat: -1, onRepeat: () => { p.y = GAME_HEIGHT * 0.7; p.alpha = 0.4; }
            });
        }

        // Zone label
        const labelEl = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT * 0.3, label, {
            fontSize: '36px', fill: accentColor, fontFamily: 'Georgia', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 4
        }).setOrigin(0.5).setAlpha(0).setDepth(5);
        this.elements.push(labelEl);

        this.tweens.add({ targets: labelEl, alpha: 0.8, duration: 1000, ease: 'Sine.easeIn' });

        this.time.delayedCall(duration, () => {
            this.tweens.add({
                targets: this.elements, alpha: 0, duration: 800,
                onComplete: () => { this._clearElements(); if (onDone) onDone(); }
            });
        });
    }

    _showClassIntro(clsName, clsText, duration, onDone) {
        this._clearElements();

        const bg = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x0a0a18).setDepth(0);
        this.elements.push(bg);

        const title = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 80, clsName, {
            fontSize: '32px', fill: '#f1c40f', fontFamily: 'Georgia', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 4
        }).setOrigin(0.5).setAlpha(0).setDepth(5);
        this.elements.push(title);

        const divider = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 50, 200, 2, 0x333333).setAlpha(0).setDepth(5);
        this.elements.push(divider);

        const text = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 20, clsText, {
            fontSize: '14px', fill: '#aaa', fontFamily: 'Georgia',
            wordWrap: { width: 480 }, align: 'center', lineSpacing: 6
        }).setOrigin(0.5).setAlpha(0).setDepth(5);
        this.elements.push(text);

        this.tweens.add({ targets: title, alpha: 1, y: GAME_HEIGHT / 2 - 70, duration: 800, ease: 'Power2' });
        this.tweens.add({ targets: divider, alpha: 1, duration: 600, delay: 400 });
        this.tweens.add({ targets: text, alpha: 1, duration: 1000, delay: 600 });

        this.time.delayedCall(duration, () => {
            this.tweens.add({
                targets: this.elements, alpha: 0, duration: 800,
                onComplete: () => { this._clearElements(); if (onDone) onDone(); }
            });
        });
    }

    _showReady(text) {
        this._clearElements();

        const bg = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x0a0010).setDepth(0);
        this.elements.push(bg);

        const title = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 40, 'LOOT REALMS', {
            fontSize: '40px', fill: '#f1c40f', fontFamily: 'Georgia', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 4
        }).setOrigin(0.5).setAlpha(0).setDepth(5);
        this.elements.push(title);

        const hint = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 30, text, {
            fontSize: '14px', fill: '#666', fontFamily: 'Arial'
        }).setOrigin(0.5).setAlpha(0).setDepth(5);
        this.elements.push(hint);

        this.tweens.add({ targets: title, alpha: 1, duration: 1500, ease: 'Sine.easeIn' });
        this.tweens.add({ targets: hint, alpha: 1, duration: 1000, delay: 1000 });

        this.canStart = false;
        this.time.delayedCall(2000, () => { this.canStart = true; });

        this.input.keyboard.on('keydown-SPACE', () => this._tryStart());
        this.input.on('pointerdown', () => this._tryStart());
    }

    _tryStart() {
        if (!this.canStart) return;
        this.canStart = false;
        this.cameras.main.fadeOut(800, 0, 0, 0);
        this.time.delayedCall(800, () => {
            this.scene.start('Game', {
                difficulty: this.difficulty,
                classKey: this.classKey,
                multiplayer: this.multiplayer,
                load: this.loadOnStart
            });
        });
    }

    _clearElements() {
        this.elements.forEach(el => { if (el && el.destroy) el.destroy(); });
        this.elements = [];
    }
}
