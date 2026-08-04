import Phaser from 'phaser';
import { drawPlayerTextures } from '../textures/player.js';
import { drawEnemyTextures } from '../textures/enemies.js';
import { drawEffectTextures } from '../textures/effects.js';
import { drawZoneTextures } from '../textures/zones.js';
import { drawItemTextures } from '../textures/items.js';
import { drawNpcTextures } from '../textures/npcs.js';
import { drawBossTextures } from '../textures/bosses.js';
import { drawMineTextures } from '../textures/mine.js';
import { drawSnowyTextures } from '../textures/snowy.js';
import { drawExpansionTextures } from '../textures/expansion.js';
import { drawPetTextures } from '../textures/pets.js';
import { generateAnimations } from '../textures/animations.js';
import { onAuthChange, getCurrentUser } from '../auth.js';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        this.cameras.main.setBackgroundColor('#0a0a1a');
        this.add.text(400, 300, 'Loading...', {
            fontSize: '24px', fill: '#fff', fontFamily: 'Arial'
        }).setOrigin(0.5);
    }

    create() {
        try {
            this.generateAllTextures();
        } catch (e) {
            console.error('Texture generation failed:', e);
        }

        const unsub = onAuthChange((user) => {
            unsub();
            if (user) {
                this.scene.start('Menu');
            } else {
                this.scene.start('Login');
            }
        });

        this.time.delayedCall(5000, () => {
            if (!getCurrentUser()) {
                unsub();
                this.scene.start('Login');
            }
        });
    }

    generateAllTextures() {
        const mk = (key, w, h, drawFn) => {
            if (this.textures.exists(key)) return;
            const canvas = this.textures.createCanvas(key, w, h);
            if (!canvas) return;
            drawFn(canvas.getContext());
            canvas.refresh();
        };

        const safe = (fn) => { try { fn(); } catch (e) { console.warn('Texture gen error:', e); } };

        safe(() => drawPlayerTextures(mk));
        safe(() => drawEnemyTextures(mk));
        safe(() => drawEffectTextures(mk));
        safe(() => drawZoneTextures(mk));
        safe(() => drawItemTextures(mk));
        safe(() => drawNpcTextures(mk));
        safe(() => drawBossTextures(mk));
        safe(() => drawMineTextures(mk));
        safe(() => drawSnowyTextures(mk, this.textures));
        safe(() => drawExpansionTextures(mk, this.textures));
        safe(() => drawPetTextures(mk));
        safe(() => generateAnimations(this.textures));
    }
}
