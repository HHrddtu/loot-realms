import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from '../config/index.js';
import { INTRO_TEXTS } from '../config/intro.js';

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
        const intro = INTRO_TEXTS[this.classKey] || INTRO_TEXTS.sage;
        const lang = localStorage.getItem('game_lang') || 'en';
        const title = lang === 'ru' ? (intro.titleRu || intro.title) : lang === 'de' ? (intro.titleDe || intro.title) : intro.title;
        const text = lang === 'ru' ? (intro.textRu || intro.text) : lang === 'de' ? (intro.textDe || intro.text) : intro.text;

        // Background
        this.cameras.main.setBackgroundColor('#0a0010');

        // Title
        const titleText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 60, title, {
            fontSize: '32px', fill: '#f1c40f', fontFamily: 'Georgia', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 4
        }).setOrigin(0.5).setAlpha(0);

        // Story text
        const storyText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 20, text, {
            fontSize: '16px', fill: '#ccc', fontFamily: 'Georgia',
            wordWrap: { width: 500 }, align: 'center', lineSpacing: 6
        }).setOrigin(0.5).setAlpha(0);

        // Continue hint
        const continueText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 100, 'Press SPACE to continue...', {
            fontSize: '12px', fill: '#666', fontFamily: 'Arial'
        }).setOrigin(0.5).setAlpha(0);

        // Fade in title
        this.tweens.add({
            targets: titleText, alpha: 1, duration: 1000,
            onComplete: () => {
                // Fade in story
                this.tweens.add({
                    targets: storyText, alpha: 1, duration: 1500,
                    onComplete: () => {
                        // Show continue hint
                        this.tweens.add({ targets: continueText, alpha: 1, duration: 500 });
                        this.canContinue = true;
                    }
                });
            }
        });

        // Input
        this.canContinue = false;
        this.input.keyboard.on('keydown-SPACE', () => {
            if (!this.canContinue) return;
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.time.delayedCall(500, () => {
                this.scene.start('Game', {
                    difficulty: this.difficulty,
                    classKey: this.classKey,
                    multiplayer: this.multiplayer,
                    load: this.loadOnStart
                });
            });
        });

        // Also allow click/tap
        this.input.on('pointerdown', () => {
            if (!this.canContinue) return;
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.time.delayedCall(500, () => {
                this.scene.start('Game', {
                    difficulty: this.difficulty,
                    classKey: this.classKey,
                    multiplayer: this.multiplayer,
                    load: this.loadOnStart
                });
            });
        });
    }
}
