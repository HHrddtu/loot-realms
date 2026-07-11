import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from '../config/index.js';

const ZONES = [
    { key: 'village', name: 'Village', nameRu: 'Деревня', x: 200, y: 100, color: 0x27ae60, requires: null },
    { key: 'forest', name: 'Forest', nameRu: 'Лес', x: 100, y: 200, color: 0x2ecc71, requires: null },
    { key: 'mine', name: 'Mine', nameRu: 'Шахта', x: 300, y: 200, color: 0x8b6914, requires: 'treant_boss' },
    { key: 'cave', name: 'Cave', nameRu: 'Пещера', x: 400, y: 200, color: 0x555555, requires: 'treant_boss' },
    { key: 'depths', name: 'Depths', nameRu: 'Подземелье', x: 600, y: 100, color: 0x8800ff, requires: 'villageThriving' },
    { key: 'cursed', name: 'Cursed Lands', nameRu: 'Проклятые Земли', x: 600, y: 200, color: 0x00aa00, requires: 'depthsBossDefeated' },
    { key: 'shadow', name: 'Shadow District', nameRu: 'Теневой Район', x: 600, y: 300, color: 0x4a0080, requires: 'cursedBossDefeated' },
    { key: 'tower', name: 'Tower', nameRu: 'Башня', x: 600, y: 400, color: 0xcc8800, requires: 'shadowBossDefeated' },
    { key: 'throne', name: 'Throne', nameRu: 'Трон', x: 600, y: 500, color: 0xffd700, requires: 'towerBossDefeated' }
];

const LINES = [
    ['village', 'forest'],
    ['forest', 'mine'],
    ['forest', 'cave'],
    ['village', 'depths'],
    ['depths', 'cursed'],
    ['cursed', 'shadow'],
    ['shadow', 'tower'],
    ['tower', 'throne']
];

export default class MapScene extends Phaser.Scene {
    constructor() {
        super('Map');
    }

    create() {
        this.cameras.main.setBackgroundColor('#0a0a1a');

        // Title
        this.add.text(GAME_WIDTH / 2, 30, 'WORLD MAP', {
            fontSize: '24px', fill: '#f1c40f', fontFamily: 'Georgia', fontStyle: 'bold'
        }).setOrigin(0.5);

        // Load save data
        const saveData = this._loadSaveData();

        // Draw lines
        LINES.forEach(([from, to]) => {
            const a = ZONES.find(z => z.key === from);
            const b = ZONES.find(z => z.key === to);
            if (a && b) {
                const unlocked = this._isZoneUnlocked(to, saveData);
                const color = unlocked ? 0x444444 : 0x222222;
                this.add.line(0, 0, a.x, a.y, b.x, b.y, color).setOrigin(0).setLineWidth(2);
            }
        });

        // Draw zones
        ZONES.forEach(zone => {
            const unlocked = this._isZoneUnlocked(zone.key, saveData);
            const currentZone = saveData.zone || 'forest';
            const isCurrent = zone.key === currentZone;

            const circle = this.add.circle(zone.x, zone.y, 30, unlocked ? zone.color : 0x333333)
                .setStrokeStyle(isCurrent ? 3 : 1, isCurrent ? 0xffffff : 0x666666)
                .setInteractive({ useHandCursor: unlocked });

            if (!unlocked) {
                circle.setAlpha(0.4);
                this.add.text(zone.x, zone.y + 40, '🔒', { fontSize: '16px' }).setOrigin(0.5);
            }

            const lang = localStorage.getItem('game_lang') || 'en';
            const name = lang === 'ru' ? (zone.nameRu || zone.name) : zone.name;
            this.add.text(zone.x, zone.y - 40, name, {
                fontSize: '11px', fill: unlocked ? '#fff' : '#666', fontFamily: 'Arial', fontStyle: 'bold'
            }).setOrigin(0.5);

            if (isCurrent) {
                this.add.text(zone.x, zone.y + 50, '(you are here)', {
                    fontSize: '9px', fill: '#f1c40f', fontFamily: 'Arial'
                }).setOrigin(0.5);
            }

            if (unlocked) {
                circle.on('pointerover', () => circle.setFillStyle(zone.color, 0.8));
                circle.on('pointerout', () => circle.setFillStyle(zone.color, 1));
                circle.on('pointerdown', () => this._enterZone(zone.key));
            }
        });

        // Back button
        const backBtn = this.add.rectangle(GAME_WIDTH - 80, GAME_HEIGHT - 30, 120, 30, 0x34495e)
            .setStrokeStyle(1, 0x556677).setInteractive({ useHandCursor: true });
        this.add.text(GAME_WIDTH - 80, GAME_HEIGHT - 30, 'Back', {
            fontSize: '14px', fill: '#fff', fontFamily: 'Arial'
        }).setOrigin(0.5);
        backBtn.on('pointerdown', () => this.scene.start('Menu'));

        // ESC to close
        this.input.keyboard.on('keydown-ESC', () => this.scene.start('Menu'));
    }

    _loadSaveData() {
        try {
            const data = JSON.parse(localStorage.getItem('loot_realms_save') || '{}');
            return data;
        } catch (e) {
            return {};
        }
    }

    _isZoneUnlocked(zoneKey, saveData) {
        switch (zoneKey) {
            case 'village': return true;
            case 'forest': return true;
            case 'mine': return saveData.bossDefeated || false;
            case 'cave': return saveData.bossDefeated || false;
            case 'depths': return saveData.villageThriving || false;
            case 'cursed': return saveData.depthsBossDefeated || false;
            case 'shadow': return saveData.cursedBossDefeated || false;
            case 'tower': return saveData.shadowBossDefeated || false;
            case 'throne': return saveData.towerBossDefeated || false;
            default: return false;
        }
    }

    _enterZone(zoneKey) {
        this.scene.start('Game', {
            difficulty: localStorage.getItem('game_difficulty') || 'Normal',
            classKey: localStorage.getItem('game_class') || 'sage',
            load: true,
            startZone: zoneKey
        });
    }
}
