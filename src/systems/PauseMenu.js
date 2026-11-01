import { DIFF_COLORS, GAME_WIDTH, GAME_HEIGHT } from '../config/index.js';
import { lighten } from '../utils.js';
import { t } from '../i18n.js';
import { getAchievementProgress, getAchievementStats } from '../achievements.js';

export class PauseMenu {
    constructor(scene, ui) {
        this.scene = scene;
        this.ui = ui;
    }

    togglePause() { this.scene.menuOpen ? this.closePause() : this.openPause(); }

    openPause() {
        this.scene.menuOpen = true;
        this.scene.physics.pause();
        try {
            if (this.scene.enemies && this.scene.enemies.scene) this.scene.enemies.getChildren().forEach(e => { if (e.body) e.body.setVelocity(0); });
        } catch (e) {}
        try {
            if (this.scene.stumps && this.scene.stumps.scene) this.scene.stumps.getChildren().forEach(s => { if (s.body) s.body.setVelocity(0); });
        } catch (e) {}
        this.scene.pauseGroup = [];
        const mk = (el) => { el.setScrollFactor(0).setDepth(100); return el; };
        
        // Parchment background
        this.scene.pauseGroup.push(mk(this.scene.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'parchment_bg')));
        this.scene.pauseGroup.push(mk(this.scene.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'ornate_border')));
        
        this.scene.pauseGroup.push(mk(this.scene.add.text(400, 185, t('pause.title'), { fontSize: '28px', fill: '#5c3a1e', fontFamily: 'Georgia, serif', fontStyle: 'bold' }).setOrigin(0.5)));
        this.scene.pauseGroup.push(mk(this.scene.add.text(400, 215, 'Story Mode', { fontSize: '14px', fill: '#27ae60', fontFamily: 'Georgia, serif', fontStyle: 'bold' }).setOrigin(0.5)));

        const resumeBg = mk(this.scene.add.rectangle(400, 235, 220, 38, 0x27ae60).setStrokeStyle(2, lighten(0x27ae60, 0.3)).setInteractive({ useHandCursor: true }));
        const resumeLbl = mk(this.scene.add.text(400, 235, t('pause.resume'), { fontSize: '18px', fill: '#fff', fontFamily: 'Georgia, serif', fontStyle: 'bold' }).setOrigin(0.5));
        resumeBg.on('pointerdown', () => this.closePause());
        resumeBg.on('pointerover', () => { resumeBg.setFillStyle(lighten(0x27ae60, 0.2)); resumeBg.setScale(1.05); resumeLbl.setScale(1.05); });
        resumeBg.on('pointerout', () => { resumeBg.setFillStyle(0x27ae60); resumeBg.setScale(1); resumeLbl.setScale(1); });
        this.scene.pauseGroup.push(resumeBg, resumeLbl);

        const makeSmallBtn = (x, y, text, color, cb) => {
            const bg = mk(this.scene.add.rectangle(x, y, 130, 28, color).setStrokeStyle(1, lighten(color, 0.3)).setInteractive({ useHandCursor: true }));
            const lbl = mk(this.scene.add.text(x, y, text, { fontSize: '11px', fill: '#fff', fontFamily: 'Georgia, serif', fontStyle: 'bold' }).setOrigin(0.5));
            bg.on('pointerdown', cb);
            bg.on('pointerover', () => bg.setFillStyle(lighten(color, 0.2)));
            bg.on('pointerout', () => bg.setFillStyle(color));
            this.scene.pauseGroup.push(bg, lbl);
        };
        makeSmallBtn(335, 280, t('pause.save'), 0x8e44ad, () => { this.scene.doSave(); this.closePause(); });
        makeSmallBtn(465, 280, t('pause.menu'), 0x2980b9, () => { this.scene.doSave(); this.closePause(); this.scene.scene.start('Menu'); });
        makeSmallBtn(400, 320, t('adv.title'), 0x555577, () => { this.closePause(); this._openPauseAdvanced(); });
        makeSmallBtn(400, 360, 'Achievements', 0xf1c40f, () => { this.closePause(); this._openAchievements(); });
    }

    _openAchievements() {
        this.scene.menuOpen = true;
        this.scene.physics.pause();
        this.scene.pauseGroup = [];
        const mk = (el) => { el.setScrollFactor(0).setDepth(100); return el; };
        this.scene.pauseGroup.push(mk(this.scene.add.rectangle(400, 300, 740, 520, 0x0a0a1a, 0.95).setStrokeStyle(2, 0x555577)));
        this.scene.pauseGroup.push(mk(this.scene.add.text(400, 60, 'ACHIEVEMENTS', {
            fontSize: '24px', fill: '#f1c40f', fontFamily: 'Georgia, serif', fontStyle: 'bold'
        }).setOrigin(0.5)));

        const progress = getAchievementProgress(getAchievementStats(this.scene));
        const done = progress.filter(a => a.unlocked).length;
        this.scene.pauseGroup.push(mk(this.scene.add.text(400, 88, `${done}/${progress.length} unlocked`, {
            fontSize: '12px', fill: '#95a5a6', fontFamily: 'Arial'
        }).setOrigin(0.5)));

        progress.forEach((achievement, i) => {
            const col = Math.floor(i / 10);
            const row = i % 10;
            const x = 215 + col * 370;
            const y = 120 + row * 38;
            const color = achievement.unlocked ? '#2ecc71' : '#666';
            const marker = achievement.unlocked ? '\u2713 ' : '\u25CB ';
            this.scene.pauseGroup.push(mk(this.scene.add.text(x, y, marker + achievement.name, {
                fontSize: '11px', fill: color, fontFamily: 'Georgia, serif', fontStyle: 'bold'
            }).setOrigin(0.5)));
            const desc = achievement.description.length > 42
                ? achievement.description.slice(0, 39) + '...'
                : achievement.description;
            this.scene.pauseGroup.push(mk(this.scene.add.text(x, y + 12, desc, {
                fontSize: '8px', fill: achievement.unlocked ? '#7fbf8f' : '#555', fontFamily: 'Arial'
            }).setOrigin(0.5)));
        });

        const back = mk(this.scene.add.rectangle(400, 540, 130, 28, 0x34495e)
            .setStrokeStyle(1, 0x556677).setInteractive({ useHandCursor: true }));
        const backLbl = mk(this.scene.add.text(400, 540, t('pause.back'), {
            fontSize: '12px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5));
        back.on('pointerdown', () => { this.closePause(); this.openPause(); });
        this.scene.pauseGroup.push(back, backLbl);
    }

    _openPauseAdvanced() {
        this.scene.menuOpen = true;
        this.scene.physics.pause();
        try {
            if (this.scene.enemies && this.scene.enemies.scene) this.scene.enemies.getChildren().forEach(e => { if (e.body) e.body.setVelocity(0); });
        } catch (e) {}
        try {
            if (this.scene.stumps && this.scene.stumps.scene) this.scene.stumps.getChildren().forEach(s => { if (s.body) s.body.setVelocity(0); });
        } catch (e) {}
        this.scene.pauseGroup = [];
        const mk = (el) => { el.setScrollFactor(0).setDepth(100); return el; };
        this.scene.pauseGroup.push(mk(this.scene.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, 420, 340, 0x000000, 0.92).setStrokeStyle(2, 0x555577)));
        this.scene.pauseGroup.push(mk(this.scene.add.text(GAME_WIDTH / 2, 165, t('adv.title'), { fontSize: '22px', fill: '#aaa', fontFamily: 'Georgia, serif', fontStyle: 'bold' }).setOrigin(0.5)));
        const makeSmallBtn = (x, y, text, color, cb) => {
            const bg = mk(this.scene.add.rectangle(x, y, 130, 28, color).setStrokeStyle(1, lighten(color, 0.3)).setInteractive({ useHandCursor: true }));
            const lbl = mk(this.scene.add.text(x, y, text, { fontSize: '11px', fill: '#fff', fontFamily: 'Georgia, serif', fontStyle: 'bold' }).setOrigin(0.5));
            bg.on('pointerdown', cb); bg.on('pointerover', () => bg.setFillStyle(lighten(color, 0.2))); bg.on('pointerout', () => bg.setFillStyle(color));
            this.scene.pauseGroup.push(bg, lbl);
        };
        makeSmallBtn(335, 210, t('adv.talents'), 0x9b59b6, () => { this.closePause(); this.ui._openTalentTree(); });
        makeSmallBtn(465, 210, t('adv.accountEquip'), 0xf39c12, () => { this.closePause(); this.ui.accountEquip._openAccountEquipOverlay(); });
        makeSmallBtn(335, 255, 'Spells', 0xe74c3c, () => { this.closePause(); this.ui._openSpellAssign(); });
        makeSmallBtn(465, 255, t('pause.changeClass'), 0x1abc9c, () => { this.scene.doSave(); this.closePause(); this.scene.scene.start('ClassSelect'); });
        makeSmallBtn(335, 300, t('keybind.controls'), 0x2980b9, () => { 
            this.scene.doSave();
            this.scene.menuOpen = false;
            if (this.scene.pauseGroup) { this.scene.pauseGroup.forEach(e => e.destroy()); this.scene.pauseGroup = []; }
            this.scene.scene.start('Keybinds', { returnScene: 'Game' });
        });
        makeSmallBtn(465, 300, 'Progress', 0x3498db, () => { this.closePause(); this.ui._openSpellProgress(); });
        makeSmallBtn(400, 345, t('pause.restart'), 0xe67e22, () => { this.scene.doSave(); this.closePause(); this.scene.scene.restart({ difficulty: this.scene.difficulty, classKey: this.scene.classKey }); });
        makeSmallBtn(400, 385, t('pause.back'), 0x34495e, () => { this.closePause(); this.openPause(); });
    }

    closePause() {
        this.scene.menuOpen = false;
        this.scene.physics.resume();
        if (this.scene.pauseGroup) { this.scene.pauseGroup.forEach(e => e.destroy()); this.scene.pauseGroup = []; }
    }
}
