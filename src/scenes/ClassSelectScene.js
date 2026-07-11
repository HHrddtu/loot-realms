import Phaser from 'phaser';
import { CLASS_DB } from '../classes.js';
import { lighten } from '../utils.js';
import { DIFFICULTIES, DIFF_COLORS } from '../config/index.js';
import { initAccount, loadAccount, loadGame } from '../save.js';
import { t, getLang } from '../i18n.js';

export default class ClassSelectScene extends Phaser.Scene {
    constructor() {
        super('ClassSelect');
    }

    create() {
        this.cameras.main.setBackgroundColor('#0a0a1a');
        initAccount();
        // Restore previous class from account or game save
        const acc = loadAccount();
        const sv = loadGame();
        this.selectedClass = (acc && acc.classKey) || (sv && sv.classKey) || 'sage';
        this.diffIdx = 0;

        this.add.text(400, 50, t('class.title'), {
            fontSize: '36px', fill: '#f1c40f', fontFamily: 'Georgia', fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(400, 85, t('class.subtitle'), {
            fontSize: '16px', fill: '#7f8c8d', fontFamily: 'Arial'
        }).setOrigin(0.5);

        const classes = Object.values(CLASS_DB);
        const cardW = 220;
        const cardH = 340;
        const gap = 20;
        const totalW = classes.length * cardW + (classes.length - 1) * gap;
        const startX = (800 - totalW) / 2 + cardW / 2;

        this.classCards = [];
        this.cardBorders = [];

        classes.forEach((cls, i) => {
            const x = startX + i * (cardW + gap);
            const y = 280;
            this._drawClassCard(x, y, cls, i);
        });

        this.add.text(400, 490, t('class.difficulty') + ': Story', {
            fontSize: '18px', fill: '#27ae60', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5);

        this.menuBtn(400, 570, t('class.begin'), 0x27ae60, () => {
            this.scene.start('Intro', {
                difficulty: 'Normal',
                classKey: this.selectedClass
            });
        });
    }

    _drawClassCard(x, y, cls, index) {
        const w = 220, h = 340;

        const border = this.add.rectangle(x, y, w, h, 0x0a0a1a, 0.95)
            .setStrokeStyle(2, 0x444466)
            .setInteractive({ useHandCursor: true });
        this.cardBorders.push(border);

        const preview = this.add.rectangle(x, y - 80, 120, 120, 0x1a1a2e)
            .setStrokeStyle(1, 0x333355);

        const spr = this.add.sprite(x, y - 80, cls.texKey).setScale(2.5);

        const lang = getLang();
        const displayName = lang === 'ru' && cls.nameRu ? cls.nameRu : cls.name;

        const nameText = this.add.text(x, y + 10, displayName, {
            fontSize: '22px', fill: '#f1c40f', fontFamily: 'Georgia', fontStyle: 'bold'
        }).setOrigin(0.5);

        const desc = this.add.text(x, y + 45, cls.description, {
            fontSize: '12px', fill: '#95a5a6', fontFamily: 'Arial',
            wordWrap: { width: w - 30 }, align: 'center'
        }).setOrigin(0.5, 0);

        const stats = cls.stats;
        const statsText = [
            t('inv.hp') + ': ' + stats.hp,
            t('inv.dmg') + ': ' + stats.damage,
            t('inv.spd') + ': ' + stats.speed,
            'COR: ' + stats.corruptionMax
        ].join('  |  ');

        this.add.text(x, y + 130, statsText, {
            fontSize: '11px', fill: '#7f8c8d', fontFamily: 'Arial'
        }).setOrigin(0.5);

        const bookNames = { sage: 'Bestiary', alchemist: 'Material Book', angel: 'Soul Book' };
        const bookName = bookNames[cls.key] || '';
        if (bookName) {
            this.add.text(x, y + 150, bookName, {
                fontSize: '12px', fill: '#3498db', fontFamily: 'Arial', fontStyle: 'italic'
            }).setOrigin(0.5);
        }

        border.on('pointerover', () => {
            border.setFillStyle(lighten(0x0a0a1a, 0.1));
            border.setStrokeStyle(2, 0x9b59b6);
        });
        border.on('pointerout', () => {
            if (this.selectedClass !== cls.key) {
                border.setFillStyle(0x0a0a1a);
                border.setStrokeStyle(2, 0x444466);
            }
        });
        border.on('pointerdown', () => {
            this.selectedClass = cls.key;
            this.cardBorders.forEach(b => {
                b.setFillStyle(0x0a0a1a);
                b.setStrokeStyle(2, 0x444466);
            });
            border.setFillStyle(0x1a1a3e);
            border.setStrokeStyle(2, 0xf1c40f);
        });

        // Highlight the currently selected class card
        if (cls.key === this.selectedClass) {
            border.setFillStyle(0x1a1a3e);
            border.setStrokeStyle(2, 0xf1c40f);
        }
    }

    menuBtn(x, y, text, color, cb) {
        const btn = this.add.rectangle(x, y, 140, 35, color)
            .setStrokeStyle(2, lighten(color, 0.3))
            .setInteractive({ useHandCursor: true });

        const lbl = this.add.text(x, y, text, {
            fontSize: '18px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5);

        btn.on('pointerover', () => {
            btn.setFillStyle(lighten(color, 0.2));
            btn.setScale(1.05);
            lbl.setScale(1.05);
        });
        btn.on('pointerout', () => {
            btn.setFillStyle(color);
            btn.setScale(1);
            lbl.setScale(1);
        });
        btn.on('pointerdown', cb);
    }
}
