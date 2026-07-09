import Phaser from 'phaser';
import { getAllEntries, getNextLevelInfo } from '../bestiary.js';
import { GAME_WIDTH, GAME_HEIGHT, BESTIARY_LEVELS, BESTIARY_DIFF_MULT } from '../config/index.js';
import { t, getLang, translateName } from '../i18n.js';

export default class BestiaryScene extends Phaser.Scene {
    constructor() {
        super('Bestiary');
    }

    init(data) {
        this.classKey = data.classKey || 'sage';
        this.returnScene = data.returnScene || 'Game';
        this.difficulty = data.difficulty || 'Normal';
    }

    create() {
        
        this.cameras.main.setBackgroundColor('#0a0a1a');
        this.entries = getAllEntries();
        this.selectedIndex = -1;
        this.listItems = [];
        this.detailElements = [];
        this.previewSprite = null;
        this.scrollY = 0;
        this.maxScroll = 0;

        const progress = { current: 0, total: 0 };
        this.entries.forEach(e => { progress.current += e.level; });
        progress.total = this.entries.length * 5;

        // Parchment background - smaller scroll style
        this.add.image(400, 300, 'parchment_bg').setScale(0.85);
        this.add.image(400, 300, 'ornate_border').setScale(0.85);

        this.add.text(400, 40, t('bestiary.title'), {
            fontSize: '28px', fill: '#5c3a1e', fontFamily: 'Georgia, serif', fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(400, 70, `Progress: ${progress.current}/${progress.total}`, {
            fontSize: '14px', fill: '#8b4513', fontFamily: 'Georgia, serif'
        }).setOrigin(0.5);

        this._createGrid();
        this._createDetailPanel();

        this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY) => {
            this.scrollY = Phaser.Math.Clamp(this.scrollY + deltaY * 0.5, 0, this.maxScroll);
            this._updateGridScroll();
        });

        const closeBtn = this.add.rectangle(GAME_WIDTH - 28, 22, 26, 26, 0x34495e)
            .setStrokeStyle(1, 0x556677).setInteractive({ useHandCursor: true }).setDepth(50);
        this.add.text(GAME_WIDTH - 28, 22, 'X', {
            fontSize: '16px', fill: '#3d2a14', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(50);
        closeBtn.on('pointerdown', () => this._close());
        closeBtn.on('pointerover', () => closeBtn.setFillStyle(0xc0392b));
        closeBtn.on('pointerout', () => closeBtn.setFillStyle(0x34495e));

        this.add.text(GAME_WIDTH / 2, GAME_HEIGHT - 18, '[B] CLOSE  |  Scroll to browse', {
            fontSize: '14px', fill: '#666', fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.input.keyboard.on('keydown-B', () => this._close());
        this.input.keyboard.on('keydown-ESC', () => this._close());

        this.input.on('pointerdown', (pointer) => {
            if (this.selectedIndex >= 0) {
                const inGrid = pointer.x < 370;
                const inDetail = pointer.x >= 370 && pointer.x <= 770 && pointer.y >= 65 && pointer.y <= 555;
                if (!inGrid && !inDetail) {
                    this._deselectAll();
                }
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
        const visibleH = GAME_HEIGHT - 90;

        const rows = Math.ceil(this.entries.length / cols);
        const totalH = rows * (itemH + 8);
        this.maxScroll = Math.max(0, totalH - visibleH);

        this.gridContainer = this.add.container(0, 0);

        this.entries.forEach((entry, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const x = startX + col * (itemW + 8);
            const y = startY + row * (itemH + 8);

            const isSeen = entry.encounters > 0;

            const bg = this.add.rectangle(x + itemW / 2, y + itemH / 2, itemW, itemH, isSeen ? 0xe8d5a3 : 0xdcc89a)
                .setStrokeStyle(1, isSeen ? 0x8b4513 : 0xaa9977)
                .setInteractive({ useHandCursor: true });

            let sprite = null;
            if (isSeen && entry.texKey) {
                try {
                    sprite = this.add.sprite(x + itemW / 2, y + 18, entry.texKey).setDisplaySize(28, 28);
                } catch (e) {}
            } else {
                this.add.text(x + itemW / 2, y + 18, '?', {
                    fontSize: '20px', fill: '#333', fontFamily: 'Arial'
                }).setOrigin(0.5);
            }

            const nameText = isSeen ? translateName(entry) : t('bestiary.locked');
            const nameT = this.add.text(x + itemW / 2, y + 44, nameText, {
                fontSize: '10px', fill: isSeen ? '#ddd' : '#444', fontFamily: 'Arial',
                wordWrap: { width: itemW - 4 }, align: 'center', maxLines: 2
            }).setOrigin(0.5);

            const lvl = entry.level;
            const lvlColor = lvl >= 5 ? '#f1c40f' : lvl >= 3 ? '#e67e22' : lvl >= 1 ? '#3498db' : '#333';
            const lvlT = this.add.text(x + itemW / 2, y + 56, lvl > 0 ? 'Lv.' + lvl : '-', {
                fontSize: '10px', fill: lvlColor, fontFamily: 'Arial'
            }).setOrigin(0.5);

            bg.on('pointerdown', () => this._selectEntry(i));

            this.listItems.push({ bg, entry, sprite, nameT, lvlT });
        });

        this._updateGridScroll();
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _updateGridScroll() {
        if (!this.listItems.length) return;
        const itemH = 65;
        const cols = 4;
        const startX = 15;
        const startY = 70;

        this.listItems.forEach((item, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const x = startX + col * (itemH + 8 + 20);
            const y = startY + row * (itemH + 8) - this.scrollY;

            const visible = y > 40 && y < GAME_HEIGHT;
            item.bg.setPosition(x + 42, y + 32);
            item.bg.setVisible(visible);
            if (item.sprite) { item.sprite.setPosition(x + 42, y + 18); item.sprite.setVisible(visible); }
            item.nameT.setPosition(x + 42, y + 44);
            item.nameT.setVisible(visible);
            item.lvlT.setPosition(x + 42, y + 56);
            item.lvlT.setVisible(visible);
        });
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _createDetailPanel() {
        const px = 380;
        const py = 65;
        const pw = 390;
        const ph = 490;

        this.detailBg = this.add.rectangle(px + pw / 2, py + ph / 2, pw, ph, 0xf4e4c1)
            .setStrokeStyle(1, 0x334466).setDepth(5);

        this.detailEmptyText = this.add.text(px + pw / 2, py + ph / 2, 'Select a creature to view details', {
            fontSize: '16px', fill: '#444', fontFamily: 'Arial'
        }).setOrigin(0.5).setDepth(6);

        this.detailTitle = this.add.text(px + 15, py + 12, '', {
            fontSize: '24px', fill: '#f1c40f', fontFamily: 'Georgia', fontStyle: 'bold'
        }).setVisible(false).setDepth(6);

        this.detailLevel = this.add.text(px + 15, py + 42, '', {
            fontSize: '13px', fill: '#e67e22', fontFamily: 'Arial'
        }).setVisible(false).setDepth(6);

        this.detailStats = this.add.text(px + 15, py + 62, '', {
            fontSize: '12px', fill: '#bbb', fontFamily: 'Arial', lineSpacing: 3
        }).setVisible(false).setDepth(6);

        this.detailDesc = this.add.text(px + 15, py + 130, '', {
            fontSize: '12px', fill: '#999', fontFamily: 'Arial',
            wordWrap: { width: pw - 30 }, lineSpacing: 4
        }).setVisible(false).setDepth(6);

        this.detailWeakness = this.add.text(px + 15, py + 290, '', {
            fontSize: '12px', fill: '#e74c3c', fontFamily: 'Arial',
            wordWrap: { width: pw - 30 }, lineSpacing: 4
        }).setVisible(false).setDepth(6);

        this.detailAbilities = this.add.text(px + 15, py + 370, '', {
            fontSize: '12px', fill: '#9b59b6', fontFamily: 'Arial',
            wordWrap: { width: pw - 30 }, lineSpacing: 4
        }).setVisible(false).setDepth(6);

        this.detailLore = this.add.text(px + 15, py + 440, '', {
            fontSize: '11px', fill: '#666', fontFamily: 'Georgia', fontStyle: 'italic',
            wordWrap: { width: pw - 30 }, lineSpacing: 4
        }).setVisible(false).setDepth(6);
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _deselectAll() {
        this.selectedIndex = -1;
        this.listItems.forEach(item => {
            item.bg.setStrokeStyle(1, 0x334466);
        });
        this._clearDetail();
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _clearDetail() {
        this.detailElements.forEach(e => e.destroy());
        this.detailElements = [];
        if (this.previewSprite) {
            this.previewSprite.destroy();
            this.previewSprite = null;
        }
        this.detailTitle.setVisible(false);
        this.detailLevel.setVisible(false);
        this.detailStats.setVisible(false);
        this.detailDesc.setVisible(false);
        this.detailWeakness.setVisible(false);
        this.detailAbilities.setVisible(false);
        this.detailLore.setVisible(false);
        this.detailEmptyText.setVisible(true);
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _selectEntry(index) {
        const entry = this.entries[index];
        if (!entry || entry.encounters === 0) return;

        this.selectedIndex = index;
        this._clearDetail();
        this.detailEmptyText.setVisible(false);

        this.listItems.forEach((item, i) => {
            item.bg.setStrokeStyle(i === index ? 2 : 1, i === index ? 0xf1c40f : 0x334466);
        });

        const px = 380;
        const py = 65;
        const pw = 390;

        this.detailTitle.setText(translateName(entry)).setVisible(true);
        this.detailTitle.setPosition(px + 15, py + 12);

        const diffMult = BESTIARY_DIFF_MULT[this.difficulty] || 1.0;
        const lvlNames = ['Unknown', 'Observed', 'Studied', 'Experienced', 'Mastered', 'Scholar'];
        const lvlText = lvlNames[entry.level] || 'Unknown';
        const baseBonus = BESTIARY_LEVELS[entry.level] || BESTIARY_LEVELS[0];
        const dmgB = Math.floor(baseBonus.dmgBonus * diffMult * 100);
        const expB = Math.floor(baseBonus.expBonus * diffMult * 100);
        const bonusText = dmgB > 0 ? ` (+${dmgB}% DMG, +${expB}% EXP)` : '';
        this.detailLevel.setText(`${t('bestiary.level')}: ${entry.level}/5 — ${lvlText}${bonusText}`).setVisible(true);
        this.detailLevel.setPosition(px + 15, py + 38);

        const statsText = `${t('tip.biome')}: ${entry.biome}\n${t('bestiary.kills')}: ${entry.kills}\n${t('tip.difficulty')}: ${this.difficulty} (×${diffMult})`;
        this.detailStats.setText(statsText).setVisible(true);
        this.detailStats.setPosition(px + 15, py + 56);

        if (entry.texKey) {
            try {
                const previewX = px + pw / 2;
                const previewY = py + 130;
                this.previewSprite = this.add.sprite(previewX, previewY, entry.texKey)
                    .setDisplaySize(64, 64).setDepth(7);
                const walkKey = entry.texKey + '_walk';
                if (this.anims.exists(walkKey)) {
                    this.previewSprite.play(walkKey);
                }
            } catch (e) {}
        }

        const nextInfo = getNextLevelInfo(entry.key);
        if (nextInfo) {
            const barX = px + 15;
            const barY = py + 165;
            const barW = pw - 30;
            const barH = 10;
            const progress = Math.min(nextInfo.currentKills / nextInfo.requiredKills, 1);

            const barBg = this.add.rectangle(barX + barW / 2, barY + barH / 2, barW, barH, 0x222233)
                .setStrokeStyle(1, 0x444466).setDepth(7);
            const barFill = this.add.rectangle(barX + 1 + (barW - 2) * progress / 2, barY + barH / 2, Math.max((barW - 2) * progress, 1), barH - 2, 0x3498db).setDepth(7);
            const barText = this.add.text(barX + barW / 2, barY + barH / 2, `${nextInfo.currentKills}/${nextInfo.requiredKills} ${t('bestiary.kills2')} → Lv.${nextInfo.nextLevel}`, {
                fontSize: '10px', fill: '#3d2a14', fontFamily: 'Arial', fontStyle: 'bold'
            }).setOrigin(0.5).setDepth(8);
            this.detailElements.push(barBg, barFill, barText);
        } else {
            const maxBar = this.add.text(px + pw / 2, py + 170, '★ MAX LEVEL ★', {
                fontSize: '12px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold'
            }).setOrigin(0.5).setDepth(7);
            this.detailElements.push(maxBar);
        }

        const reqLines = BESTIARY_LEVELS.slice(1).map(lv => {
            const d = Math.floor(lv.dmgBonus * diffMult * 100);
            const e = Math.floor(lv.expBonus * diffMult * 100);
            const unlocked = entry.level >= lv.level;
            return `${unlocked ? '✓' : '○'} Lv.${lv.level} (${lv.killsRequired} kills): +${d}% DMG, +${e}% EXP`;
        }).join('\n');
        const reqText = this.add.text(px + 15, py + 182, reqLines, {
            fontSize: '11px', fill: '#777', fontFamily: 'Arial', lineSpacing: 3
        }).setDepth(7);
        this.detailElements.push(reqText);

        let curY = py + 280;

        if (entry.infoLevel === 'stats') {
            this.detailDesc.setText(`A creature of the ${entry.biome}. Encounters: ${entry.encounters}. Kills: ${entry.kills}.`).setVisible(true);
            this.detailDesc.setPosition(px + 15, curY);
            curY += this.detailDesc.height + 12;
        } else {
            this.detailDesc.setText(entry.description || '').setVisible(true);
            this.detailDesc.setPosition(px + 15, curY);
            curY += this.detailDesc.height + 10;

            let weakText = '';
            if (entry.weaknesses.length > 0) weakText += t('bestiary.weaknesses') + ': ' + entry.weaknesses.join(', ');
            if (entry.resistances.length > 0) {
                if (weakText) weakText += '\n';
                weakText += t('bestiary.resistances') + ': ' + entry.resistances.join(', ');
            }
            this.detailWeakness.setText(weakText).setVisible(weakText.length > 0);
            this.detailWeakness.setPosition(px + 15, curY);
            if (weakText.length > 0) curY += this.detailWeakness.height + 10;

            if (entry.abilities.length > 0) {
                this.detailAbilities.setText(t('bestiary.abilities') + ':\n' + entry.abilities.map(a => '  — ' + a).join('\n')).setVisible(true);
            } else {
                this.detailAbilities.setText('').setVisible(false);
            }
            this.detailAbilities.setPosition(px + 15, curY);
            if (entry.abilities.length > 0) curY += this.detailAbilities.height + 10;

            this.detailLore.setText(entry.lore || '').setVisible((entry.lore || '').length > 0);
            this.detailLore.setPosition(px + 15, curY);
        }
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _close() {
        const gameScene = this.scene.get(this.returnScene);
        if (gameScene && gameScene.receiveBestiaryData) {
            gameScene.receiveBestiaryData();
        }
        if (gameScene) gameScene.menuOpen = false;
        this.scene.stop(this.scene.key);
        this.scene.wake(this.returnScene);
    }
}
