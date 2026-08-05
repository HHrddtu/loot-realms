import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from '../config/index.js';
import { CUTSCENE } from '../config/cutscene.js';
import { playPortal, playScream, playFireCrackle, playMeteorImpact } from '../sound.js';
import { t } from '../i18n.js';

export default class IntroCutscene extends Phaser.Scene {
    constructor() {
        super('IntroCutscene');
    }

    init(data) {
        this.classKey = data.classKey || 'sage';
        this.difficulty = data.difficulty || 'Normal';
        this.multiplayer = data.multiplayer || false;
        this.loadOnStart = data.load || false;
        this.skipRequested = false;
    }

    create() {
        this.cameras.main.setBackgroundColor('#000000');
        this.beatGroup = [];
        this.currentBeat = 0;

        this._skipSpaceHandler = () => this._skip();
        this._skipEscHandler = () => this._skip();
        this._skipPointerHandler = () => this._skip();
        this.input.keyboard.on('keydown-SPACE', this._skipSpaceHandler);
        this.input.keyboard.on('keydown-ESC', this._skipEscHandler);
        this.input.on('pointerdown', this._skipPointerHandler);

        this.time.delayedCall(200, () => {
            this.cameras.main.fadeIn(CUTSCENE.fadeIn, 0, 0, 0);
        });

        this.time.delayedCall(400, () => {
            this._runBeat(0);
        });
    }

    _runBeat(index) {
        if (this.skipRequested) return;
        this.currentBeat = index;
        this._cleanupBeat();
        this.cameras.main.setScroll(0, 0);

        switch (index) {
            case 0: this._beat0_prologue(); break;
            case 1: this._beat1_tavern(); break;
            case 2: this._beat2_jump(); break;
            case 3: this._beat3_village(); break;
            case 4: this._beat4_portalSequence(); break;
            case 5: this._beat5_toGame(); break;
        }

        if (index !== 0 && index !== 2) {
            this.cameras.main.fadeIn(CUTSCENE.fadeIn, 0, 0, 0);
        }
    }

    _transitionTo(index, useFade = true) {
        if (this.skipRequested) return;
        if (useFade) {
            this.cameras.main.fadeOut(CUTSCENE.fadeOut, 0, 0, 0);
            this.time.delayedCall(CUTSCENE.fadeOut + CUTSCENE.beatGap, () => {
                this._runBeat(index);
            });
        } else {
            this._runBeat(index);
        }
    }

    _delayThen(next, ms) {
        this.time.delayedCall(ms, () => {
            if (!this.skipRequested) this._transitionTo(next);
        });
    }

    _skip() {
        if (this.skipRequested) return;
        this.skipRequested = true;
        this._cleanupBeat();
        this.cameras.main.fadeOut(200, 0, 0, 0);
        this.time.delayedCall(250, () => {
            this.scene.start('Game', {
                difficulty: this.difficulty,
                classKey: this.classKey,
                multiplayer: this.multiplayer,
                load: this.loadOnStart
            });
        });
    }

    _cleanupBeat() {
        this.beatGroup.forEach(el => { if (el && el.destroy) el.destroy(); });
        this.beatGroup = [];
    }

    _showText(text, options = {}) {
        const { color = '#f1c40f', y = GAME_HEIGHT - 80, duration = 3000 } = options;
        const el = this.add.text(GAME_WIDTH / 2, y, text, CUTSCENE.textDisplay)
            .setOrigin(0.5).setAlpha(0).setDepth(20).setColor(color);
        this.beatGroup.push(el);
        this.tweens.add({ targets: el, alpha: 1, duration: CUTSCENE.textFade, ease: 'Sine.easeIn' });
        if (duration > 0) {
            this.time.delayedCall(duration, () => {
                if (!this.skipRequested) {
                    this.tweens.add({ targets: el, alpha: 0, duration: CUTSCENE.textFade });
                }
            });
        }
        return el;
    }

    _setBg(color) {
        const bg = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, color).setDepth(0);
        bg.setOrigin(0.5);
        this.beatGroup.push(bg);
        const ground = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT * 0.8, GAME_WIDTH, GAME_HEIGHT * 0.25, Phaser.Display.Color.ValueToColor(color).darken(15).color).setDepth(1);
        this.beatGroup.push(ground);
    }

    // ===== BEAT 0: Prologue — "Long ago..." =====
    _beat0_prologue() {
        this._setBg(CUTSCENE.beat0.bg);

        this._showText(t('cutscene.prologue'), {
            color: '#888',
            y: GAME_HEIGHT / 2,
            duration: CUTSCENE.beat0.duration - 1200
        });

        this._delayThen(1, CUTSCENE.beat0.duration);
    }

    // ===== BEAT 1: Tavern — hero drinking =====
    _beat1_tavern() {
        this._setBg(CUTSCENE.beat1.bg);

        // Bar counter with patrons visible behind it
        const counter = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT * 0.66, 180, 12, 0x0a0500, 0.85).setDepth(4);
        this.beatGroup.push(counter);
        for (let x of [GAME_WIDTH / 2 - 80, GAME_WIDTH / 2, GAME_WIDTH / 2 + 80]) {
            this.beatGroup.push(this.add.rectangle(x, GAME_HEIGHT * 0.73, 6, 20, 0x0a0500, 0.7).setDepth(4));
        }

        // Patron silhouettes at background tables
        const patrons = [
            { x: 250, y: 0.58, scale: 0.85 },
            { x: 350, y: 0.59, scale: 0.8 },
            { x: 520, y: 0.57, scale: 0.9 }
        ];
        patrons.forEach(p => {
            const pb = this.add.rectangle(p.x, GAME_HEIGHT * p.y, 16, 26, 0x050000, 0.45).setDepth(2);
            const ph = this.add.circle(p.x, GAME_HEIGHT * p.y - 15, 6, 0x050000, 0.4).setDepth(2);
            this.beatGroup.push(pb, ph);
            // Tiny mug for each
            this.beatGroup.push(this.add.rectangle(p.x + 10, GAME_HEIGHT * p.y + 4, 6, 8, 0x0a0500, 0.4).setDepth(2));
        });

        // Hero slumped at the counter
        const body = this.add.rectangle(GAME_WIDTH / 2 - 4, GAME_HEIGHT * 0.59, 22, 34, 0x000000, 0.6).setDepth(5);
        const head = this.add.rectangle(GAME_WIDTH / 2 - 2, GAME_HEIGHT * 0.5, 14, 16, 0x000000, 0.55).setDepth(5);
        this.beatGroup.push(body, head);

        // Mug on counter near hero
        const mug = this.add.rectangle(GAME_WIDTH / 2 + 14, GAME_HEIGHT * 0.64, 10, 12, 0x1a0a00, 0.7).setDepth(6);
        this.beatGroup.push(mug);
        this.add.rectangle(GAME_WIDTH / 2 + 14, GAME_HEIGHT * 0.63, 12, 2, 0x2a1a00, 0.5).setDepth(6);

        // Hearth with fire
        const hearth = this.add.rectangle(60, GAME_HEIGHT * 0.6, 50, 70, 0x1a0500, 0.85).setDepth(1);
        this.beatGroup.push(hearth);
        const fireGlow = this.add.circle(60, GAME_HEIGHT * 0.58, 30, 0xff4400, 0.25).setDepth(2);
        this.beatGroup.push(fireGlow);
        this.tweens.add({ targets: fireGlow, alpha: { from: 0.25, to: 0.15 }, scaleX: { from: 1, to: 1.15 }, scaleY: { from: 1, to: 1.1 }, duration: 500, yoyo: true, repeat: -1 });

        for (let i = 0; i < 5; i++) {
            const em = this.add.circle(60 + (Math.random() - 0.5) * 20, GAME_HEIGHT * 0.55, 1.5, 0xff8800, 0.4).setDepth(3);
            this.beatGroup.push(em);
            this.tweens.add({ targets: em, y: em.y - 10 - Math.random() * 15, alpha: 0, duration: 500 + Math.random() * 600, repeat: -1, delay: Math.random() * 400 });
        }

        // Barrel beside the hearth
        const barrel = this.add.rectangle(100, GAME_HEIGHT * 0.73, 26, 28, 0x0a0500, 0.7).setDepth(3);
        this.beatGroup.push(barrel);
        this.add.rectangle(100, GAME_HEIGHT * 0.72, 28, 4, 0x1a0a00, 0.5).setDepth(3);
        this.add.rectangle(100, GAME_HEIGHT * 0.75, 28, 4, 0x1a0a00, 0.5).setDepth(3);

        // Candle on the counter (right side)
        const candleGlow = this.add.circle(GAME_WIDTH / 2 + 56, GAME_HEIGHT * 0.58, 8, 0xff6600, 0.35).setDepth(6);
        this.beatGroup.push(candleGlow);
        this.tweens.add({ targets: candleGlow, alpha: { from: 0.35, to: 0.2 }, duration: 300 + Math.random() * 400, yoyo: true, repeat: -1 });

        // Hanging lamp over the counter
        const lampGlow = this.add.circle(GAME_WIDTH / 2, GAME_HEIGHT * 0.18, 10, 0xff8800, 0.15).setDepth(3);
        this.beatGroup.push(lampGlow);
        this.tweens.add({ targets: lampGlow, alpha: { from: 0.15, to: 0.08 }, duration: 600, yoyo: true, repeat: -1 });
        this.beatGroup.push(this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT * 0.08, 2, 30, 0x0a0500, 0.4).setDepth(2));

        // Window with cool moonlight outside
        const win = this.add.rectangle(GAME_WIDTH - 50, GAME_HEIGHT * 0.2, 50, 50, 0x1a1a3a, 0.45).setDepth(1);
        this.beatGroup.push(win);
        this.beatGroup.push(this.add.rectangle(GAME_WIDTH - 50, GAME_HEIGHT * 0.2, 50, 50, null, 0).setStrokeStyle(2, 0x222244, 0.5).setDepth(2));
        this.beatGroup.push(this.add.rectangle(GAME_WIDTH - 50, GAME_HEIGHT * 0.2, 2, 50, 0x222244, 0.4).setDepth(2));
        this.beatGroup.push(this.add.rectangle(GAME_WIDTH - 50, GAME_HEIGHT * 0.2, 50, 2, 0x222244, 0.4).setDepth(2));

        // Warm ambient overlay
        const warmOverlay = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0xff4400, 0.04).setDepth(7);
        this.beatGroup.push(warmOverlay);

        this._showText('...', { color: '#aa8855', y: GAME_HEIGHT / 2 + 20, duration: 2000 });
        this._delayThen(2, CUTSCENE.beat1.duration);
    }

    // ===== BEAT 2: Scream — hero jumps up =====
    _beat2_jump() {
        this._setBg(CUTSCENE.beat2.bg);

        const counter = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT * 0.64, 180, 12, 0x0a0500, 0.85).setDepth(2);
        this.beatGroup.push(counter);

        const mug = this.add.rectangle(GAME_WIDTH / 2 + 14, GAME_HEIGHT * 0.65, 10, 8, 0x1a0a00, 0.65).setDepth(4);
        this.beatGroup.push(mug);

        const body = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT * 0.56, 22, 40, 0x000000, 0.75).setDepth(3).setAlpha(0);
        const head = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT * 0.46, 14, 16, 0x000000, 0.7).setDepth(3).setAlpha(0);
        this.beatGroup.push(body, head);
        this.tweens.add({ targets: [body, head], alpha: 1, duration: 150, ease: 'Power2' });

        const scream = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT * 0.2, '✧', {
            fontSize: '64px', fill: '#ff4444', fontFamily: 'Arial'
        }).setOrigin(0.5).setAlpha(0).setDepth(10);
        this.beatGroup.push(scream);
        this.tweens.add({ targets: scream, alpha: 0.6, scaleX: 1.4, scaleY: 1.4, duration: 250, yoyo: true, ease: 'Power2' });

        this.cameras.main.shake(200, 0.008);
        playScream();

        // Camera pans right toward the door as hero runs out
        this.time.delayedCall(1400, () => {
            if (!this.skipRequested) {
                this.tweens.add({ targets: this.cameras.main, scrollX: 80, duration: 600, ease: 'Sine.easeInOut' });
            }
        });

        this._delayThen(3, CUTSCENE.beat2.duration);
    }

    // ===== BEAT 3: Burning village — hero outside =====
    _beat3_village() {
        const c = CUTSCENE.beat3;
        this._setBg(c.bg);

        // Burning houses — first one is the tavern (wider, sign)
        const tx = 90;
        const tavern = this.add.rectangle(tx, GAME_HEIGHT * 0.55, 70, 75, 0x050000, 0.85).setDepth(2);
        this.beatGroup.push(tavern);
        this.beatGroup.push(this.add.triangle(tx, GAME_HEIGHT * 0.46, 0, 20, 35, -10, 70, 20, 0x080000, 0.85).setDepth(2));
        this.beatGroup.push(this.add.rectangle(tx, GAME_HEIGHT * 0.42, 18, 6, 0x0a0500, 0.7).setDepth(3));
        const tGlow = this.add.circle(tx, GAME_HEIGHT * 0.44, 20, 0xff4400, 0.1).setDepth(3);
        this.beatGroup.push(tGlow);
        this.tweens.add({ targets: tGlow, alpha: { from: 0.1, to: 0.2 }, duration: 500, yoyo: true, repeat: -1 });

        const houses = [250, 550, 700];
        houses.forEach(x => {
            this.beatGroup.push(this.add.rectangle(x, GAME_HEIGHT * 0.55, 50, 70, 0x050000, 0.85).setDepth(2));
            this.beatGroup.push(this.add.triangle(x, GAME_HEIGHT * 0.48, 0, 20, 25, -8, 50, 20, 0x080000, 0.85).setDepth(2));
            const gl = this.add.circle(x, GAME_HEIGHT * 0.44, 18, 0xff4400, 0.12).setDepth(3);
            this.beatGroup.push(gl);
            this.tweens.add({ targets: gl, alpha: { from: 0.12, to: 0.22 }, scaleX: { from: 1, to: 1.25 }, scaleY: { from: 1, to: 1.25 }, duration: 400 + Math.random() * 600, yoyo: true, repeat: -1 });
        });

        // Hero outside tavern
        const heroOut = this.add.rectangle(tx + 40, GAME_HEIGHT * 0.58, 18, 30, 0x000000, 0.6).setDepth(4);
        const heroOutHead = this.add.circle(tx + 40, GAME_HEIGHT * 0.5, 7, 0x000000, 0.55).setDepth(4);
        this.beatGroup.push(heroOut, heroOutHead);

        // Step 1: Corpses on the ground (lower layer, visible from start)
        const corpses = [
            { x: 220, dir: 1 }, { x: 380, dir: -1 },
            { x: 580, dir: 1 }, { x: 720, dir: -1 }
        ];
        corpses.forEach(c => {
            this.beatGroup.push(this.add.rectangle(c.x, GAME_HEIGHT * 0.71, 26, 10, 0x000000, 0.6).setDepth(3));
            this.beatGroup.push(this.add.circle(c.x + c.dir * 12, GAME_HEIGHT * 0.71, 5, 0x000000, 0.55).setDepth(3));
            this.beatGroup.push(this.add.circle(c.x + 4, GAME_HEIGHT * 0.735, 5 + Math.random() * 5, 0x440000, 0.45).setDepth(3));
        });

        // Step 2: Enemies appear after a short delay (upper mid layer, more visible)
        const enemyPositions = [
            { x: 170, yOff: 0.56 }, { x: 420, yOff: 0.54 }, { x: 650, yOff: 0.55 }
        ];
        enemyPositions.forEach((e, i) => {
            this.time.delayedCall(300 + i * 400, () => {
                if (this.skipRequested) return;
                const ey = GAME_HEIGHT * e.yOff;
                const eb = this.add.rectangle(e.x, ey, 20, 32, 0x1a0000, 0.6).setDepth(4);
                const eh = this.add.rectangle(e.x, ey - 18, 14, 14, 0x1a0000, 0.55).setDepth(4);
                this.beatGroup.push(eb, eh);
            });
        });

        // Step 3: Fire particles (fewer, only near houses)
        for (let i = 0; i < 8; i++) {
            const px = 80 + Math.floor(i / 2) * 200 + (Math.random() - 0.5) * 60;
            const py = GAME_HEIGHT * 0.38 + Math.random() * 40;
            const p = this.add.circle(px, py, 2 + Math.random() * 2, 0xff6600, 0.4 + Math.random() * 0.3).setDepth(5);
            this.beatGroup.push(p);
            this.tweens.add({ targets: p, y: p.y - 20 - Math.random() * 30, alpha: 0, duration: 600 + Math.random() * 800, repeat: -1, delay: Math.random() * 600 });
        }

        // Camera slow pan across the village
        this.tweens.add({ targets: this.cameras.main, scrollX: 30, duration: 2500, yoyo: true, ease: 'Sine.easeInOut' });

        playFireCrackle();

        this._delayThen(4, c.duration);
    }

    // ===== BEAT 4: Portal sequence — father + elder + meteor =====
    _beat4_portalSequence() {
        const c = CUTSCENE.beat4;
        const p = CUTSCENE.portal;
        const ef = CUTSCENE.elderFather;
        const ec = CUTSCENE.elderCurrent;

        this._setBg(c.bg);

        // Ground line between them
        const groundLine = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT * 0.76, GAME_WIDTH, 3, 0x0a0015, 0.6).setDepth(1);
        this.beatGroup.push(groundLine);

        // === Phase A: Father + portal (t=0 to ~3000) ===
        const portalGlow = this.add.image(ef.x + 100, ef.y - 10, 'portal_glow')
            .setDepth(1).setScale(0).setTint(p.glowColor).setAlpha(0.6);
        this.beatGroup.push(portalGlow);
        this.tweens.add({ targets: portalGlow, scaleX: p.maxScale, scaleY: p.maxScale, duration: 1200, ease: 'Power2' });

        playPortal();

        this.time.delayedCall(400, () => {
            if (this.skipRequested) return;
            for (let i = 0; i < 10; i++) {
                const px = ef.x + 100 + (Math.random() - 0.5) * 60;
                const py = ef.y - 10 + (Math.random() - 0.5) * 60;
                const pt = this.add.circle(px, py, 2 + Math.random() * 2, p.particleColors[i % 3], 0.7).setDepth(8);
                this.beatGroup.push(pt);
                this.tweens.add({ targets: pt, y: pt.y - 30 - Math.random() * 35, alpha: 0, scaleX: 0.2, scaleY: 0.2, duration: 500 + Math.random() * 400, repeat: -1, delay: Math.random() * 300 });
            }
        });

        const father = this.add.sprite(ef.x, ef.y, 'npc_elder_father').setDepth(5).setScale(ef.scale).setAlpha(0);
        this.beatGroup.push(father);
        this.tweens.add({ targets: father, alpha: 1, duration: 800, delay: 200 });

        const staffGlow = this.add.circle(ef.x - 4, ef.y - 28, 5, p.glowColor, 0.4).setDepth(6);
        this.beatGroup.push(staffGlow);
        this.tweens.add({ targets: staffGlow, alpha: { from: 0.4, to: 0.8 }, scaleX: { from: 1, to: 1.6 }, scaleY: { from: 1, to: 1.6 }, duration: 500, yoyo: true, repeat: -1, delay: 500 });

        this._showText(t('cutscene.father'), { color: '#c084fc', duration: 3200 });

        // === Phase B: Current elder appears (t=~3200 to ~5500) ===
        this.time.delayedCall(3200, () => {
            if (this.skipRequested) return;

            // Portal shrinks — hero is being pulled in
            this.tweens.add({ targets: portalGlow, alpha: 0.3, scaleX: p.maxScale * 0.5, scaleY: p.maxScale * 0.5, duration: 2000, ease: 'Power1' });

            const elder = this.add.sprite(ec.x, ec.y, 'npc_elder').setDepth(5).setScale(ec.scale).setAlpha(0);
            this.beatGroup.push(elder);
            this.tweens.add({ targets: elder, alpha: 1, duration: 400 });

            const arm = this.add.rectangle(ec.x - 20, ec.y - 8, 24, 5, 0xf5cba7, 0.5).setDepth(6).setAlpha(0);
            this.beatGroup.push(arm);
            this.tweens.add({ targets: arm, alpha: 0.5, x: ec.x - 40, duration: 400 });

            this._showText(t('cutscene.elder'), { color: '#f1c40f', duration: 2400 });
        });

        // === Phase C: Tension pause (t=~5600) ===
        // --- no text, just the portal fading, elders visible ---

        // === Phase D: Meteor falls on father elder (t=6000) ===
        this.time.delayedCall(CUTSCENE.meteor.delay, () => {
            if (this.skipRequested) return;
            const m = CUTSCENE.meteor;
            const meteorX = ef.x;
            const trail = this.add.rectangle(meteorX, m.startY, m.size * 3, m.size, m.trailColor, 0.5).setDepth(9);
            const meteor = this.add.circle(meteorX, m.startY, m.size + 4, m.color, 1).setDepth(11);
            const mGlow = this.add.circle(meteorX, m.startY, (m.size + 4) * 2.5, m.glowColor, 0.35).setDepth(8);
            this.beatGroup.push(trail, meteor, mGlow);

            // Meteor falls directly on father elder's position
            this.tweens.add({ targets: [meteor, mGlow, trail], y: ef.y + 10, duration: m.fallDuration, ease: 'Power1' });

            // Impact
            this.time.delayedCall(m.fallDuration + 80, () => {
                if (this.skipRequested) return;
                const flash = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0xffffff, 0).setDepth(50);
                this.beatGroup.push(flash);
                this.tweens.add({
                    targets: flash, alpha: 0.5, duration: 60, yoyo: true,
                    onComplete: () => {
                        if (!this.skipRequested) {
                            this.tweens.add({
                                targets: flash, alpha: 1, duration: 500,
                                onComplete: () => {
                                    if (!this.skipRequested) this._transitionTo(5, false);
                                }
                            });
                        }
                    }
                });
                this.cameras.main.shake(500, 0.03);
                playMeteorImpact();
            });
        });
    }

    // ===== BEAT 5: Fade in → Game =====
    _beat5_toGame() {
        this._cleanupBeat();
        this.cameras.main.fadeIn(CUTSCENE.beat7.duration, 0, 0, 0);
        this.time.delayedCall(CUTSCENE.beat7.duration + 400, () => {
            if (!this.skipRequested) {
                this.scene.start('Game', {
                    difficulty: this.difficulty,
                    classKey: this.classKey,
                    multiplayer: this.multiplayer,
                    load: this.loadOnStart
                });
            }
        });
    }

    shutdown() {
        this.tweens.killAll();
        this.time.removeAllEvents();
        if (this._skipSpaceHandler) {
            this.input.keyboard.off('keydown-SPACE', this._skipSpaceHandler);
            this._skipSpaceHandler = null;
        }
        if (this._skipEscHandler) {
            this.input.keyboard.off('keydown-ESC', this._skipEscHandler);
            this._skipEscHandler = null;
        }
        if (this._skipPointerHandler) {
            this.input.off('pointerdown', this._skipPointerHandler);
            this._skipPointerHandler = null;
        }
        this._cleanupBeat();
    }
}
