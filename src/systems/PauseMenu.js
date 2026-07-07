import { DIFF_COLORS } from '../config/index.js';
import { lighten } from '../utils.js';
import { t } from '../i18n.js';

export class PauseMenu {
    constructor(scene, ui) {
        this.scene = scene;
        this.ui = ui;
    }

    togglePause() { this.scene.menuOpen ? this.closePause() : this.openPause(); }

    openPause() {
        this.scene.menuOpen = true;
        this.scene.physics.pause();
        if (this.scene.enemies) this.scene.enemies.getChildren().forEach(e => { if (e.body) e.body.setVelocity(0); });
        if (this.scene.stumps) this.scene.stumps.getChildren().forEach(s => { if (s.body) s.body.setVelocity(0); });
        this.scene.pauseGroup = [];
        const mk = (el) => { el.setScrollFactor(0).setDepth(100); return el; };
        this.scene.pauseGroup.push(mk(this.scene.add.rectangle(400, 300, 420, 300, 0x000000, 0.92).setStrokeStyle(2, 0xf1c40f)));
        this.scene.pauseGroup.push(mk(this.scene.add.text(400, 185, t('pause.title'), { fontSize: '28px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold' }).setOrigin(0.5)));
        this.scene.pauseGroup.push(mk(this.scene.add.text(400, 215, this.scene.difficulty, { fontSize: '14px', fill: DIFF_COLORS[this.scene.difficulty] || '#f39c12', fontFamily: 'Arial', fontStyle: 'bold' }).setOrigin(0.5)));

        const resumeBg = mk(this.scene.add.rectangle(400, 235, 220, 38, 0x27ae60).setStrokeStyle(2, lighten(0x27ae60, 0.3)).setInteractive({ useHandCursor: true }));
        const resumeLbl = mk(this.scene.add.text(400, 235, t('pause.resume'), { fontSize: '18px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold' }).setOrigin(0.5));
        resumeBg.on('pointerdown', () => this.closePause());
        resumeBg.on('pointerover', () => { resumeBg.setFillStyle(lighten(0x27ae60, 0.2)); resumeBg.setScale(1.05); resumeLbl.setScale(1.05); });
        resumeBg.on('pointerout', () => { resumeBg.setFillStyle(0x27ae60); resumeBg.setScale(1); resumeLbl.setScale(1); });
        this.scene.pauseGroup.push(resumeBg, resumeLbl);

        const makeSmallBtn = (x, y, text, color, cb) => {
            const bg = mk(this.scene.add.rectangle(x, y, 130, 28, color).setStrokeStyle(1, lighten(color, 0.3)).setInteractive({ useHandCursor: true }));
            const lbl = mk(this.scene.add.text(x, y, text, { fontSize: '11px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold' }).setOrigin(0.5));
            bg.on('pointerdown', cb);
            bg.on('pointerover', () => bg.setFillStyle(lighten(color, 0.2)));
            bg.on('pointerout', () => bg.setFillStyle(color));
            this.scene.pauseGroup.push(bg, lbl);
        };
        makeSmallBtn(335, 280, t('pause.save'), 0x8e44ad, () => { this.scene.doSave(); this.closePause(); });
        makeSmallBtn(465, 280, t('pause.menu'), 0x2980b9, () => { this.scene.doSave(); this.closePause(); this.scene.scene.start('Menu'); });
        makeSmallBtn(400, 320, t('adv.title'), 0x555577, () => { this.closePause(); this._openPauseAdvanced(); });
    }

    _openPauseAdvanced() {
        this.scene.menuOpen = true;
        this.scene.physics.pause();
        if (this.scene.enemies) this.scene.enemies.getChildren().forEach(e => { if (e.body) e.body.setVelocity(0); });
        if (this.scene.stumps) this.scene.stumps.getChildren().forEach(s => { if (s.body) s.body.setVelocity(0); });
        this.scene.pauseGroup = [];
        const mk = (el) => { el.setScrollFactor(0).setDepth(100); return el; };
        this.scene.pauseGroup.push(mk(this.scene.add.rectangle(400, 300, 420, 340, 0x000000, 0.92).setStrokeStyle(2, 0x555577)));
        this.scene.pauseGroup.push(mk(this.scene.add.text(400, 165, t('adv.title'), { fontSize: '22px', fill: '#aaa', fontFamily: 'Arial', fontStyle: 'bold' }).setOrigin(0.5)));
        const makeSmallBtn = (x, y, text, color, cb) => {
            const bg = mk(this.scene.add.rectangle(x, y, 130, 28, color).setStrokeStyle(1, lighten(color, 0.3)).setInteractive({ useHandCursor: true }));
            const lbl = mk(this.scene.add.text(x, y, text, { fontSize: '11px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold' }).setOrigin(0.5));
            bg.on('pointerdown', cb); bg.on('pointerover', () => bg.setFillStyle(lighten(color, 0.2))); bg.on('pointerout', () => bg.setFillStyle(color));
            this.scene.pauseGroup.push(bg, lbl);
        };
        makeSmallBtn(335, 210, t('adv.talents'), 0x9b59b6, () => { this.closePause(); this.ui._openTalentTree(); });
        makeSmallBtn(465, 210, t('adv.accountEquip'), 0xf39c12, () => { this.closePause(); this.ui.accountEquip._openAccountEquipOverlay(); });
        makeSmallBtn(335, 255, t('pause.changeClass'), 0x1abc9c, () => { this.scene.doSave(); this.closePause(); this.scene.scene.start('ClassSelect'); });
        makeSmallBtn(465, 255, t('pause.save'), 0x8e44ad, () => { this.scene.doSave(); this.closePause(); });
        makeSmallBtn(335, 300, t('keybind.controls'), 0x2980b9, () => { this.closePause(); this.scene.scene.launch('Keybinds', { returnScene: 'Game' }); this.scene.scene.pause(); });
        makeSmallBtn(400, 345, t('pause.restart'), 0xe67e22, () => { this.scene.doSave(); this.closePause(); this.scene.scene.restart({ difficulty: this.scene.difficulty, classKey: this.scene.classKey }); });
        makeSmallBtn(400, 385, t('pause.back'), 0x34495e, () => { this.closePause(); this.openPause(); });
    }

    closePause() {
        this.scene.menuOpen = false;
        this.scene.physics.resume();
        if (this.scene.pauseGroup) { this.scene.pauseGroup.forEach(e => e.destroy()); this.scene.pauseGroup = []; }
    }
}
