import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from '../config/index.js';
import { MAP_CHAPTERS } from '../config/mapData.js';
import { loadGame } from '../save.js';

export default class MapScene extends Phaser.Scene {
    constructor() {
        super('Map');
    }

    create() {
        this.cameras.main.setBackgroundColor('#0a0a18');
        this.currentView = 'chapters';
        this.currentChapter = null;
        this.elements = [];

        this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x0a0a18)
            .setDepth(0).setScrollFactor(0);

        const save = loadGame() || {};
        this.completedZones = save.completedZones || {};

        this._showChapters();
        this._addCloseButton();
    }

    _showChapters() {
        this._clear();
        this.currentView = 'chapters';

        const title = this.add.text(GAME_WIDTH / 2, 40, 'WORLD MAP', {
            fontSize: '24px', fill: '#f1c40f', fontFamily: 'Georgia', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5);
        this.elements.push(title);

        const chapterW = 110;
        const gap = 30;
        const totalW = MAP_CHAPTERS.length * chapterW + (MAP_CHAPTERS.length - 1) * gap;
        const startX = (GAME_WIDTH - totalW) / 2 + chapterW / 2;
        const y = GAME_HEIGHT / 2 - 20;

        MAP_CHAPTERS.forEach((ch, i) => {
            const x = startX + i * (chapterW + gap);
            const isUnlocked = this._isChapterUnlocked(ch);
            const isCompleted = this._isChapterCompleted(ch);

            const bg = this.add.rectangle(x, y, chapterW, 70, isUnlocked ? ch.color : 0x333333, isUnlocked ? 0.3 : 0.15)
                .setStrokeStyle(2, isUnlocked ? ch.color : 0x555555)
                .setInteractive({ useHandCursor: isUnlocked });
            this.elements.push(bg);

            const lang = localStorage.getItem('game_lang') || 'en';
            const name = lang === 'ru' ? (ch.nameRu || ch.name) : lang === 'de' ? (ch.nameDe || ch.name) : ch.name;

            const label = this.add.text(x, y - 8, name, {
                fontSize: '11px', fill: isUnlocked ? '#fff' : '#666', fontFamily: 'Arial', fontStyle: 'bold',
                wordWrap: { width: chapterW - 10 }, align: 'center'
            }).setOrigin(0.5);
            this.elements.push(label);

            const status = this.add.text(x, y + 18, isCompleted ? '✓' : (isUnlocked ? (i + 1).toString() : '🔒'), {
                fontSize: '16px', fill: isCompleted ? '#2ecc71' : (isUnlocked ? '#f1c40f' : '#555'),
                fontFamily: 'Arial'
            }).setOrigin(0.5);
            this.elements.push(status);

            if (isUnlocked) {
                bg.on('pointerdown', () => this._showZones(ch));
                bg.on('pointerover', () => bg.setFillStyle(ch.color, 0.5));
                bg.on('pointerout', () => bg.setFillStyle(ch.color, 0.3));
            }

            // Arrow between chapters
            if (i < MAP_CHAPTERS.length - 1) {
                const arrowX = x + chapterW / 2 + gap / 2;
                const arrowColor = isCompleted ? '#2ecc71' : '#555';
                const arrow = this.add.text(arrowX, y, '→', {
                    fontSize: '18px', fill: arrowColor, fontFamily: 'Arial'
                }).setOrigin(0.5);
                this.elements.push(arrow);
            }
        });

        // Bottom hint
        const hint = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT - 30, 'Click chapter to view zones', {
            fontSize: '11px', fill: '#666', fontFamily: 'Arial'
        }).setOrigin(0.5);
        this.elements.push(hint);
    }

    _showZones(chapter) {
        this._clear();
        this.currentView = 'zones';
        this.currentChapter = chapter;

        const lang = localStorage.getItem('game_lang') || 'en';
        const chName = lang === 'ru' ? (chapter.nameRu || chapter.name) : lang === 'de' ? (chapter.nameDe || chapter.name) : chapter.name;

        const title = this.add.text(GAME_WIDTH / 2, 40, chName, {
            fontSize: '22px', fill: '#' + chapter.color.toString(16).padStart(6, '0'),
            fontFamily: 'Georgia', fontStyle: 'bold', stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5);
        this.elements.push(title);

        const zones = chapter.zones;
        const zoneR = 30;
        const zoneGap = 60;
        const totalW = zones.length * zoneR * 2 + (zones.length - 1) * zoneGap;
        const startX = (GAME_WIDTH - totalW) / 2 + zoneR;
        const y = GAME_HEIGHT / 2;

        zones.forEach((z, i) => {
            const x = startX + i * (zoneR * 2 + zoneGap);
            const isCompleted = this.completedZones[z.key];
            const isCurrent = i > 0 ? this.completedZones[zones[i - 1].key] : true;
            const isAvailable = isCurrent || isCompleted;

            const color = isCompleted ? 0x2ecc71 : (isAvailable ? 0xf1c40f : 0x555555);

            // Zone circle
            const circle = this.add.circle(x, y, zoneR, color, isCompleted ? 0.4 : 0.2)
                .setStrokeStyle(2, color)
                .setInteractive({ useHandCursor: isAvailable });
            this.elements.push(circle);

            // Zone name inside circle
            const zName = lang === 'ru' ? (z.nameRu || z.name) : lang === 'de' ? (z.nameDe || z.name) : z.name;
            const label = this.add.text(x, y, isCompleted ? '✓' : zName, {
                fontSize: isCompleted ? '18px' : '9px',
                fill: isCompleted ? '#2ecc71' : (isAvailable ? '#fff' : '#666'),
                fontFamily: 'Arial', fontStyle: 'bold',
                wordWrap: { width: zoneR * 1.5 }, align: 'center'
            }).setOrigin(0.5);
            this.elements.push(label);

            // Arrow between zones
            if (i < zones.length - 1) {
                const arrowX = x + zoneR + zoneGap / 2;
                const arrowColor = isCompleted ? '#2ecc71' : '#555';
                const arrow = this.add.text(arrowX, y, '→', {
                    fontSize: '20px', fill: arrowColor, fontFamily: 'Arial'
                }).setOrigin(0.5);
                this.elements.push(arrow);
            }
        });

        // Back button
        const backBtn = this.add.text(80, GAME_HEIGHT - 30, '← Back', {
            fontSize: '14px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        backBtn.on('pointerdown', () => this._showChapters());
        backBtn.on('pointerover', () => backBtn.setColor('#fff'));
        backBtn.on('pointerout', () => backBtn.setColor('#f1c40f'));
        this.elements.push(backBtn);
    }

    _isChapterUnlocked(chapter) {
        const zones = chapter.zones;
        for (let i = 0; i < zones.length; i++) {
            if (this.completedZones[zones[i].key]) return true;
            if (i > 0 && !this.completedZones[zones[i - 1].key]) return false;
            if (i === 0 && i === zones.length - 1) return true;
            if (i === 0) return true;
        }
        return false;
    }

    _isChapterCompleted(chapter) {
        return chapter.zones.every(z => this.completedZones[z.key]);
    }

    _addCloseButton() {
        const btn = this.add.text(GAME_WIDTH - 40, 20, 'X', {
            fontSize: '20px', fill: '#e74c3c', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        btn.on('pointerdown', () => this.scene.stop());
        btn.on('pointerover', () => btn.setColor('#fff'));
        btn.on('pointerout', () => btn.setColor('#e74c3c'));
        this.elements.push(btn);
    }

    _clear() {
        this.elements.forEach(el => el.destroy());
        this.elements = [];
    }
}
