import Phaser from 'phaser';
import { getAllMaterialEntries, getNextMaterialLevelInfo } from '../materialBook.js';
import { GAME_WIDTH, GAME_HEIGHT, MATERIAL_BOOK_LEVELS, BESTIARY_DIFF_MULT } from '../config/index.js';
import { t, getLang, translateName } from '../i18n.js';

export default class MaterialBookScene extends Phaser.Scene {
    constructor() {
        super('MaterialBook');
    }

    init(data) {
        this.classKey = data.classKey || 'alchemist';
        this.returnScene = data.returnScene || 'Game';
        this.difficulty = data.difficulty || 'Normal';
    }

    create() {
        this.cameras.main.setBackgroundColor('#0a0a1a');
        this.entries = getAllMaterialEntries();
        this.selectedIndex = -1;
        this.listItems = [];
        this.detailElements = [];
        this.previewSprite = null;

        const progress = { current: 0, total: 0 };
        this.entries.forEach(e => { progress.current += e.level; });
        progress.total = this.entries.length * 5;

        this.add.text(200, 22, t('matBook.title'), {
            fontSize: '26px', fill: '#e67e22', fontFamily: 'Georgia', fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(200, 52, `${t('matBook.collected')}: ${progress.current}/${progress.total}`, {
            fontSize: '14px', fill: '#aaa', fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.add.text(200, 68, 'Collect materials from stumps and enemies. Study them to gain permanent +HP, +DMG, +SPD.', {
            fontSize: '10px', fill: '#666', fontFamily: 'Arial', fontStyle: 'italic'
        }).setOrigin(0.5);

        this._createGrid();
        this._createDetailPanel();

        const closeBtn = this.add.rectangle(GAME_WIDTH - 28, 22, 26, 26, 0x34495e)
            .setStrokeStyle(1, 0x556677).setInteractive({ useHandCursor: true }).setDepth(50);
        this.add.text(GAME_WIDTH - 28, 22, 'X', {
            fontSize: '16px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(50);
        closeBtn.on('pointerdown', () => this._close());
        closeBtn.on('pointerover', () => closeBtn.setFillStyle(0xc0392b));
        closeBtn.on('pointerout', () => closeBtn.setFillStyle(0x34495e));

        this.add.text(GAME_WIDTH / 2, GAME_HEIGHT - 18, '[B] CLOSE', {
            fontSize: '14px', fill: '#666', fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.input.keyboard.on('keydown-B', () => this._close());
        this.input.keyboard.on('keydown-ESC', () => this._close());

        this.input.on('pointerdown', (pointer) => {
            if (this.selectedIndex >= 0) {
                const inGrid = pointer.x < 370;
                const inDetail = pointer.x >= 370 && pointer.x <= 770 && pointer.y >= 65 && pointer.y <= 555;
                if (!inGrid && !inDetail) this._deselectAll();
            }
        });
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _createGrid() {
        const startX = 15;
        const startY = 70;
        const itemW = 85;
        const itemH = 65;
        const cols = 4;

        this.entries.forEach((entry, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const x = startX + col * (itemW + 8);
            const y = startY + row * (itemH + 8);

            const isSeen = entry.collected > 0;

            const bg = this.add.rectangle(x + itemW / 2, y + itemH / 2, itemW, itemH, isSeen ? 0x2a1a0a : 0x111118)
                .setStrokeStyle(1, isSeen ? 0x664422 : 0x222233)
                .setInteractive({ useHandCursor: true });

            if (isSeen && entry.texKey) {
                try {
                    this.add.sprite(x + itemW / 2, y + 18, entry.texKey).setDisplaySize(28, 28);
                } catch (e) {}
            } else {
                this.add.text(x + itemW / 2, y + 18, '?', {
                    fontSize: '20px', fill: '#333', fontFamily: 'Arial'
                }).setOrigin(0.5);
            }

            this.add.text(x + itemW / 2, y + 44, isSeen ? translateName(entry) : t('matBook.locked'), {
                fontSize: '11px', fill: isSeen ? '#ddd' : '#444', fontFamily: 'Arial',
                wordWrap: { width: itemW - 4 }, align: 'center'
            }).setOrigin(0.5);

            const lvl = entry.level;
            const lvlColor = lvl >= 5 ? '#f1c40f' : lvl >= 3 ? '#e67e22' : lvl >= 1 ? '#3498db' : '#333';
            this.add.text(x + itemW / 2, y + 56, lvl > 0 ? 'Lv.' + lvl : '-', {
                fontSize: '10px', fill: lvlColor, fontFamily: 'Arial'
            }).setOrigin(0.5);

            bg.on('pointerdown', () => this._selectEntry(i));
            this.listItems.push({ bg, entry });
        });
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _createDetailPanel() {
        const px = 380;
        const py = 65;
        const pw = 390;
        const ph = 490;

        this.detailBg = this.add.rectangle(px + pw / 2, py + ph / 2, pw, ph, 0x150f08)
            .setStrokeStyle(1, 0x664422).setDepth(5);

        this.detailEmptyText = this.add.text(px + pw / 2, py + ph / 2, 'Select a material to view details\n\nCollect materials by breaking stumps and defeating enemies.\nStudy materials to gain passive bonuses:\n+HP, +DMG, +SPD\n\nHigher mastery = stronger bonuses.', {
            fontSize: '12px', fill: '#555', fontFamily: 'Arial',
            wordWrap: { width: pw - 40 }, align: 'center', lineSpacing: 4
        }).setOrigin(0.5).setDepth(6);

        this.detailTitle = this.add.text(px + 15, py + 12, '', {
            fontSize: '24px', fill: '#e67e22', fontFamily: 'Georgia', fontStyle: 'bold'
        }).setVisible(false).setDepth(6);

        this.detailLevel = this.add.text(px + 15, py + 42, '', {
            fontSize: '13px', fill: '#f39c12', fontFamily: 'Arial'
        }).setVisible(false).setDepth(6);

        this.detailStats = this.add.text(px + 15, py + 62, '', {
            fontSize: '12px', fill: '#bbb', fontFamily: 'Arial', lineSpacing: 3
        }).setVisible(false).setDepth(6);

        this.detailDesc = this.add.text(px + 15, py + 130, '', {
            fontSize: '12px', fill: '#999', fontFamily: 'Arial',
            wordWrap: { width: pw - 30 }, lineSpacing: 4
        }).setVisible(false).setDepth(6);

        this.detailProps = this.add.text(px + 15, py + 230, '', {
            fontSize: '12px', fill: '#2ecc71', fontFamily: 'Arial',
            wordWrap: { width: pw - 30 }, lineSpacing: 4
        }).setVisible(false).setDepth(6);

        this.detailRecipe = this.add.text(px + 15, py + 320, '', {
            fontSize: '12px', fill: '#9b59b6', fontFamily: 'Arial',
            wordWrap: { width: pw - 30 }, lineSpacing: 4
        }).setVisible(false).setDepth(6);

        this.detailLore = this.add.text(px + 15, py + 410, '', {
            fontSize: '11px', fill: '#666', fontFamily: 'Georgia', fontStyle: 'italic',
            wordWrap: { width: pw - 30 }, lineSpacing: 4
        }).setVisible(false).setDepth(6);
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _deselectAll() {
        this.selectedIndex = -1;
        this.listItems.forEach(item => { item.bg.setStrokeStyle(1, 0x664422); });
        this._clearDetail();
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _clearDetail() {
        this.detailElements.forEach(e => e.destroy());
        this.detailElements = [];
        if (this.previewSprite) { this.previewSprite.destroy(); this.previewSprite = null; }
        this.detailTitle.setVisible(false);
        this.detailLevel.setVisible(false);
        this.detailStats.setVisible(false);
        this.detailDesc.setVisible(false);
        this.detailProps.setVisible(false);
        this.detailRecipe.setVisible(false);
        this.detailLore.setVisible(false);
        this.detailEmptyText.setVisible(true);
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _selectEntry(index) {
        const entry = this.entries[index];
        if (!entry || entry.collected === 0) return;

        this.selectedIndex = index;
        this._clearDetail();
        this.detailEmptyText.setVisible(false);

        this.listItems.forEach((item, i) => {
            item.bg.setStrokeStyle(i === index ? 2 : 1, i === index ? 0xf1c40f : 0x664422);
        });

        const px = 380;
        const py = 65;
        const pw = 390;

        this.detailTitle.setText(translateName(entry)).setVisible(true);
        this.detailTitle.setPosition(px + 15, py + 12);

        const diffMult = BESTIARY_DIFF_MULT[this.difficulty] || 1.0;
        const lvlNames = ['Uncollected', 'Gathered', 'Practiced', 'Skilled', 'Expert', 'Master'];
        const lvlText = lvlNames[entry.level] || 'Unknown';
        const cfg = MATERIAL_BOOK_LEVELS.find(l => l.level === entry.level) || MATERIAL_BOOK_LEVELS[0];
        const hpB = Math.floor(cfg.hpBonus * diffMult);
        const dmB = Math.floor(cfg.dmgBonus * diffMult);
        const spB = Math.floor(cfg.speedBonus * diffMult);
        const bonusText = hpB > 0 || dmB > 0 || spB > 0 ? ` (+${hpB} HP, +${dmB} DMG, +${spB} SPD)` : '';
        this.detailLevel.setText(`Mastery: ${entry.level}/5 — ${lvlText}${bonusText}`).setVisible(true);
        this.detailLevel.setPosition(px + 15, py + 38);

        this.detailStats.setText(`Rarity: ${entry.rarity}\nCollected: ${entry.collected}\nDifficulty: ${this.difficulty} (×${diffMult})`).setVisible(true);
        this.detailStats.setPosition(px + 15, py + 56);

        if (entry.texKey) {
            try {
                this.previewSprite = this.add.sprite(px + pw / 2, py + 95, entry.texKey)
                    .setDisplaySize(48, 48).setDepth(7);
            } catch (e) {}
        }

        const nextInfo = getNextMaterialLevelInfo(entry.key);
        if (nextInfo) {
            const barX = px + 15;
            const barY = py + 120;
            const barW = pw - 30;
            const barH = 10;
            const progress = Math.min(nextInfo.currentCount / nextInfo.requiredCount, 1);

            const barBg = this.add.rectangle(barX + barW / 2, barY + barH / 2, barW, barH, 0x222233)
                .setStrokeStyle(1, 0x444466).setDepth(7);
            const barFill = this.add.rectangle(barX + 1 + (barW - 2) * progress / 2, barY + barH / 2, Math.max((barW - 2) * progress, 1), barH - 2, 0xe67e22).setDepth(7);
            const barText = this.add.text(barX + barW / 2, barY + barH / 2, `${nextInfo.currentCount}/${nextInfo.requiredCount} collected → Lv.${nextInfo.nextLevel}`, {
                fontSize: '10px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
            }).setOrigin(0.5).setDepth(8);
            this.detailElements.push(barBg, barFill, barText);
        } else {
            const maxBar = this.add.text(px + pw / 2, py + 125, '★ MAX MASTERY ★', {
                fontSize: '12px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold'
            }).setOrigin(0.5).setDepth(7);
            this.detailElements.push(maxBar);
        }

        const lvlLines = MATERIAL_BOOK_LEVELS.slice(1).map(lv => {
            const hp = Math.floor(lv.hpBonus * diffMult);
            const dm = Math.floor(lv.dmgBonus * diffMult);
            const sp = Math.floor(lv.speedBonus * diffMult);
            const unlocked = entry.level >= lv.level;
            return `${unlocked ? '✓' : '○'} Lv.${lv.level} (${lv.countRequired}×): +${hp}HP +${dm}DMG +${sp}SPD`;
        }).join('\n');
        const lvlText2 = this.add.text(px + 15, py + 140, lvlLines, {
            fontSize: '11px', fill: '#777', fontFamily: 'Arial', lineSpacing: 3
        }).setDepth(7);
        this.detailElements.push(lvlText2);

        this.detailDesc.setText(entry.description || '').setVisible(true);
        this.detailDesc.setPosition(px + 15, py + 250);

        if (entry.properties) {
            this.detailProps.setText('Properties:\n' + entry.properties).setVisible(true);
            this.detailProps.setPosition(px + 15, py + 320);
        }

        if (entry.recipe) {
            this.detailRecipe.setText('Recipes:\n' + entry.recipe).setVisible(true);
            this.detailRecipe.setPosition(px + 15, py + 390);
        }

        if (entry.lore) {
            this.detailLore.setText(entry.lore).setVisible(true);
            this.detailLore.setPosition(px + 15, py + 450);
        }
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _close() {
        const gameScene = this.scene.get(this.returnScene);
        if (gameScene && gameScene.receiveBestiaryData) {
            gameScene.receiveBestiaryData();
        }
        this.scene.stop();
    }
}
