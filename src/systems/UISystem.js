import { RARITY_COLORS } from '../config.js';
import { lighten } from '../utils.js';
import { toggleMute } from '../sound.js';
import { getAccountLevelUpReq } from '../save.js';
import { getTalentEffects } from '../talents.js';
import { getAccountTalentEffects } from '../accountTalents.js';
import { initMaterialBook, getMaterialBookData } from '../materialBook.js';
import { t } from '../i18n.js';

export class UISystem {
    constructor(scene) {
        this.scene = scene;
    }

    _createUI() {
        this.scene._createTopBar();
        this.scene._buildStatsPanel();
    }

    _createTopBar() {
        this.scene.topBarBg = this.scene.add.rectangle(400, 12, 780, 22, 0x000000, 0.5)
            .setScrollFactor(0).setDepth(20);
        this.scene.topBarBg.setStrokeStyle(1, 0x333333);

        this.scene.hpBarOuter = this.scene.add.rectangle(200, 12, 200, 14, 0x1a1a2e)
            .setOrigin(0, 0.5).setScrollFactor(0).setDepth(21);
        this.scene.hpBarOuter.setStrokeStyle(1, 0x444444);
        this.scene.hpBarFill = this.scene.add.rectangle(201, 12, 198, 12, 0xe74c3c)
            .setOrigin(0, 0.5).setScrollFactor(0).setDepth(22);

        this.scene.shieldBarFill = this.scene.add.rectangle(201, 12, 0, 12, 0x3498db, 0.4)
            .setOrigin(0, 0.5).setScrollFactor(0).setDepth(22.5);

        this.scene.levelText = this.scene.add.text(10, 12, '', {
            fontSize: '12px', fill: '#e67e22', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0, 0.5).setScrollFactor(0).setDepth(23);

        this.scene.diffText = this.scene.add.text(790, 12, this.scene.difficulty, {
            fontSize: '10px', fill: '#f39c12', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 1
        }).setOrigin(1, 0.5).setScrollFactor(0).setDepth(23);

        this.scene.hintText = this.scene.add.text(400, 588, '', {
            fontSize: '10px', fill: '#555', fontFamily: 'Arial'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(20);

        this.scene.muteText = this.scene.add.text(790, 30, 'SOUND', {
            fontSize: '10px', fill: '#27ae60', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 1
        }).setOrigin(1, 0.5).setScrollFactor(0).setDepth(23).setInteractive({ useHandCursor: true });
        this.scene.muteText.on('pointerdown', () => this._toggleMute());

        this.scene.corruptionLabel = this.scene.add.text(10, 36, 'COR', {
            fontSize: '9px', fill: '#9b59b6', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 1
        }).setScrollFactor(0).setDepth(23);

        this.scene.corruptionBarOuter = this.scene.add.rectangle(200, 36, 200, 6, 0x1a1a2e)
            .setOrigin(0, 0.5).setScrollFactor(0).setDepth(21);
        this.scene.corruptionBarOuter.setStrokeStyle(1, 0x333333);
        this.scene.corruptionBarFill = this.scene.add.rectangle(201, 36, 0, 4, 0x9b59b6)
            .setOrigin(0, 0.5).setScrollFactor(0).setDepth(22);

        this.scene.talentText = this.scene.add.text(400, 36, '', {
            fontSize: '9px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 1
        }).setScrollFactor(0).setDepth(23);

        this.scene.accountLevelText = this.scene.add.text(10, 48, '', {
            fontSize: '9px', fill: '#e67e22', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 1
        }).setScrollFactor(0).setDepth(23);

        this.scene.accountExpBarOuter = this.scene.add.rectangle(200, 48, 200, 4, 0x1a1a2e)
            .setOrigin(0, 0.5).setScrollFactor(0).setDepth(21);
        this.scene.accountExpBarOuter.setStrokeStyle(1, 0x333333);
        this.scene.accountExpBarFill = this.scene.add.rectangle(201, 48, 0, 2, 0xe67e22)
            .setOrigin(0, 0.5).setScrollFactor(0).setDepth(22);

        this.scene.spellSlots = {};
        const spellKeys = ['fireball', 'shield', 'heal'];
        const spellLabels = ['Q', 'W', 'E'];
        const spellColors = [0xe74c3c, 0x3498db, 0x2ecc71];
        spellKeys.forEach((key, i) => {
            const sx = 690 + i * 36;
            const sy = 565;
            const bg = this.scene.add.rectangle(sx, sy, 30, 30, 0x1a1a2e)
                .setStrokeStyle(2, spellColors[i])
                .setScrollFactor(0).setDepth(24);
            const lbl = this.scene.add.text(sx, sy - 2, spellLabels[i], {
                fontSize: '10px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
            }).setOrigin(0.5).setScrollFactor(0).setDepth(25);
            const cd = this.scene.add.text(sx, sy + 10, '', {
                fontSize: '8px', fill: '#f39c12', fontFamily: 'Arial'
            }).setOrigin(0.5).setScrollFactor(0).setDepth(25);
            this.scene.spellSlots[key] = { bg, lbl, cd };
        });
    }

    _buildStatsPanel() {
        if (this.scene.statsGroup) this.scene.statsGroup.forEach(e => e.destroy());
        this.scene.statsGroup = [];

        const s = (el) => { el.setScrollFactor(0).setDepth(100); return el; };

        this.scene.statsBarBg = s(this.scene.add.rectangle(110, 60, 200, 22, 0x0a0a1a, 0.8)
            .setStrokeStyle(1, 0x444444));
        this.scene.statsBarText = s(this.scene.add.text(15, 60, '', {
            fontSize: '10px', fill: '#ecf0f1', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0, 0.5));
        this.scene.statsBarBtn = s(this.scene.add.text(210, 60, '[ + ]', {
            fontSize: '10px', fill: '#f1c40f', fontFamily: 'Arial'
        }).setOrigin(1, 0.5).setInteractive({ useHandCursor: true }));
        this.scene.statsBarBtn.on('pointerdown', () => this._toggleStats());

        const px = 10, py = 78, pw = 210, ph = 152;
        this.scene.statsPanelBg = s(this.scene.add.rectangle(px + pw / 2, py + ph / 2, pw, ph, 0x0a0a1a, 0.9)
            .setStrokeStyle(1, 0x444444));
        this.scene.statsPanelBg.setVisible(false);

        this.scene.statsCloseBtn = s(this.scene.add.text(px + pw - 10, py + 4, '[ - ]', {
            fontSize: '10px', fill: '#f1c40f', fontFamily: 'Arial'
        }).setOrigin(1, 0).setInteractive({ useHandCursor: true }));
        this.scene.statsCloseBtn.on('pointerdown', () => this._toggleStats());
        this.scene.statsCloseBtn.setVisible(false);

        this.scene.statsTitle = s(this.scene.add.text(px + 10, py + 6, 'STATS', {
            fontSize: '12px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold'
        }));
        this.scene.statsTitle.setVisible(false);

        const labels = ['Acc Lv:', 'HP:', 'Damage:', 'Acc EXP:'];
        const colors = ['#f1c40f', '#27ae60', '#e74c3c', '#f1c40f'];
        this.scene.statsLabels = [];
        this.scene.statsValues = [];

        labels.forEach((label, i) => {
            const y = py + 26 + i * 22;
            const lt = s(this.scene.add.text(px + 12, y, label, {
                fontSize: '11px', fill: '#95a5a6', fontFamily: 'Arial'
            }));
            lt.setVisible(false);
            this.scene.statsLabels.push(lt);

            const vt = s(this.scene.add.text(px + pw - 16, y, '', {
                fontSize: '11px', fill: colors[i], fontFamily: 'Arial', fontStyle: 'bold'
            }).setOrigin(1, 0));
            vt.setVisible(false);
            this.scene.statsValues.push(vt);
        });

        this.scene._statsExpanded = false;
    }

    _toggleStats() {
        this.scene._statsExpanded = !this.scene._statsExpanded;
        this.scene.statsPanelBg.setVisible(this.scene._statsExpanded);
        this.scene.statsCloseBtn.setVisible(this.scene._statsExpanded);
        this.scene.statsTitle.setVisible(this.scene._statsExpanded);
        this.scene.statsLabels.forEach(e => e.setVisible(this.scene._statsExpanded));
        this.scene.statsValues.forEach(e => e.setVisible(this.scene._statsExpanded));
        this.scene.statsBarBtn.setText(this.scene._statsExpanded ? '[ - ]' : '[ + ]');
    }

    _toggleMute() {
        const m = toggleMute();
        this.scene.muteText.setText(m ? 'MUTE' : 'SOUND');
        this.scene.muteText.setColor(m ? '#e74c3c' : '#27ae60');
    }

    _openTalentTree() {
        if (this.scene.menuOpen || this.scene.transitioning) return;
        this.scene.menuOpen = true;
        this.scene.physics.pause();
        if (this.scene.enemies) this.scene.enemies.getChildren().forEach(e => { if (e.body) e.body.setVelocity(0); });
        if (this.scene.stumps) this.scene.stumps.getChildren().forEach(s => { if (s.body) s.body.setVelocity(0); });

        this.scene.scene.launch('TalentTree', {
            unlockedTalents: this.scene.unlockedTalents,
            talentPoints: this.scene.talentPoints,
            classKey: this.scene.classKey,
            unlockedAccountTalents: this.scene.unlockedAccountTalents,
            accountTalentPoints: this.scene.accountTalentPoints,
            accountLevel: this.scene.accountLevel,
            returnScene: 'Game'
        });
        this.scene.scene.pause();
    }

    _openBestiary() {
        if (this.scene.menuOpen || this.scene.transitioning) return;
        this.scene.menuOpen = true;
        this.scene.physics.pause();
        if (this.scene.enemies) this.scene.enemies.getChildren().forEach(e => { if (e.body) e.body.setVelocity(0); });
        if (this.scene.stumps) this.scene.stumps.getChildren().forEach(s => { if (s.body) s.body.setVelocity(0); });

        const bookScene = this.scene.classKey === 'alchemist' ? 'MaterialBook' :
                          this.scene.classKey === 'angel' ? 'SoulBook' : 'Bestiary';

        this.scene.scene.launch(bookScene, {
            classKey: this.scene.classKey,
            difficulty: this.scene.difficulty,
            returnScene: 'Game'
        });
        this.scene.scene.pause();
    }

    receiveBestiaryData() {
        this.scene.menuOpen = false;
        this.scene.physics.resume();
        this.scene.scene.resume();
        this.scene.recalcStats();
    }

    _openCrafting() {
        if (this.scene.menuOpen || this.scene.transitioning) return;
        this.scene.menuOpen = true;
        this.scene.physics.pause();
        if (this.scene.enemies) this.scene.enemies.getChildren().forEach(e => { if (e.body) e.body.setVelocity(0); });
        if (this.scene.stumps) this.scene.stumps.getChildren().forEach(s => { if (s.body) s.body.setVelocity(0); });

        const isAlchemist = this.scene.classKey === 'alchemist';
        initMaterialBook();
        const matData = getMaterialBookData();

        this.scene.scene.launch('Craft', {
            materials: this.scene.materials,
            equipBag: this.scene.equipBag,
            maxEquipBag: this.scene.maxEquipBag,
            isAlchemist: isAlchemist,
            returnScene: 'Game',
            classKey: this.scene.classKey,
            difficulty: this.scene.difficulty,
            materialBookData: matData,
            hasRelicCraftBonus: !!(this.scene.relicEffects && this.scene.relicEffects.craft_bonus),
            onCraftResult: (result) => {
                if (result.items) {
                    result.items.forEach(item => {
                        if (this.scene.addEquip(item)) {
                            this.floatingText(this.scene.player.x, this.scene.player.y - 40, '+' + item.name, '#2ecc71');
                        }
                    });
                }
                this.scene.materials = result.materials || this.scene.materials;
            }
        });
        this.scene.scene.pause();
    }

    receiveCraftData(materials) {
        this.scene.materials = materials || this.scene.materials;
        this.scene.menuOpen = false;
        this.scene.physics.resume();
        this.scene.scene.resume();
        this.scene.recalcStats();
    }

    receiveTalentData(data) {
        this.scene.unlockedTalents = data.unlockedTalents || [];
        this.scene.talentPoints = data.talentPoints || 0;
        this.scene.talentEffects = getTalentEffects(this.scene.unlockedTalents);
        this.scene.unlockedAccountTalents = data.unlockedAccountTalents || [];
        this.scene.accountTalentPoints = data.accountTalentPoints || 0;
        this.scene.accountEffects = getAccountTalentEffects(this.scene.unlockedAccountTalents);
        this.scene.recalcStats();
        this.scene.menuOpen = false;
        this.scene.physics.resume();
    }

    updateUI() {
        const req = Math.floor(100 * Math.pow(this.scene.playerLevel, 1.5));

        const accReq = getAccountLevelUpReq(this.scene.accountLevel);
        this.scene.levelText.setText('Lv.' + this.scene.playerLevel);
        this.scene.hpBarFill.width = Math.max(0, 198 * (this.scene.playerHP / this.scene.playerMaxHP));
        if (this.scene.playerHP / this.scene.playerMaxHP > 0.6) this.scene.hpBarFill.setFillStyle(0x27ae60);
        else if (this.scene.playerHP / this.scene.playerMaxHP > 0.3) this.scene.hpBarFill.setFillStyle(0xf39c12);
        else this.scene.hpBarFill.setFillStyle(0xe74c3c);

        if (this.scene.shieldActive && this.scene.shieldHP > 0) {
            this.scene.shieldBarFill.width = Math.min(198, 198 * (this.scene.shieldHP / this.scene.playerMaxHP));
            this.scene.shieldBarFill.x = 201 + this.scene.hpBarFill.width;
        } else {
            this.scene.shieldBarFill.width = 0;
        }

        this.scene.corruptionBarFill.width = Math.max(0, 198 * (this.scene.corruption / this.scene.corruptionMax));
        if (this.scene.corruption / this.scene.corruptionMax > 0.8) this.scene.corruptionBarFill.setFillStyle(0xe74c3c);
        else if (this.scene.corruption / this.scene.corruptionMax > 0.5) this.scene.corruptionBarFill.setFillStyle(0xe67e22);
        else this.scene.corruptionBarFill.setFillStyle(0x9b59b6);

        this.scene.talentText.setText(this.scene.talentPoints > 0 ? 'TALENTS: ' + this.scene.talentPoints + ' [T]' : '');

        this.scene.accountLevelText.setText('Acc Lv.' + this.scene.accountLevel + '  ' + this.scene.accountExp + '/' + accReq);
        this.scene.accountExpBarFill.width = Math.max(0, 198 * (this.scene.accountExp / accReq));

        this.scene.statsBarText.setText(
            'Acc Lv.' + this.scene.accountLevel +
            '  HP:' + this.scene.playerHP + '/' + this.scene.playerMaxHP +
            '  DMG:' + this.scene.playerDamage +
            '  EXP:' + this.scene.accountExp + '/' + accReq
        );

        if (this.scene._statsExpanded && this.scene.statsValues.length >= 4) {
            this.scene.statsValues[0].setText('' + this.scene.accountLevel);
            this.scene.statsValues[1].setText(this.scene.playerHP + ' / ' + this.scene.playerMaxHP);
            this.scene.statsValues[1].setColor(this.scene.playerHP / this.scene.playerMaxHP > 0.3 ? '#27ae60' : '#e74c3c');
            this.scene.statsValues[2].setText('' + this.scene.playerDamage);
            this.scene.statsValues[3].setText(this.scene.accountExp + ' / ' + accReq);
        }

        if (this.scene.spellSlots) {
            ['fireball', 'shield', 'heal'].forEach(key => {
                const s = this.scene.spellSlots[key];
                const cd = this.scene.spellCooldowns[key];
                if (cd > 0) {
                    s.cd.setText(cd.toFixed(1));
                    s.bg.setFillStyle(0x111111);
                    s.bg.setAlpha(0.6);
                } else {
                    s.cd.setText('');
                    s.bg.setFillStyle(0x1a1a2e);
                    s.bg.setAlpha(1);
                }
            });
        }
    }

    floatingText(x, y, text, color) {
        const t = this.scene.add.text(x, y, text, {
            fontSize: '12px', fill: color, fontFamily: 'Arial',
            fontStyle: 'bold', stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5);
        this.scene.tweens.add({
            targets: t, y: t.y - 30, alpha: 0, duration: 700,
            onComplete: () => t.destroy()
        });
    }

    showDamageFlash() {
        if (this._damageFlash) return;
        this._damageFlash = this.scene.add.rectangle(400, 300, 800, 600, 0xff0000)
            .setAlpha(0.25).setScrollFactor(0).setDepth(300);
        this.scene.tweens.add({
            targets: this._damageFlash, alpha: 0, duration: 200,
            onComplete: () => { if (this._damageFlash) { this._damageFlash.destroy(); this._damageFlash = null; } }
        });
    }

    toggleInventory() {
        this.scene.invOpen ? this.closeInventory() : this.openInventory();
    }

    _showItemTooltip(x, y, item) {
        this._hideItemTooltip();
        if (!item) return;

        const ttGroup = [];
        const mk = (el) => { el.setScrollFactor(0).setDepth(200); return el; };

        const lines = [];
        const rc = RARITY_COLORS[item.rarity] || 0xaaaaaa;
        const hex = '#' + rc.toString(16).padStart(6, '0');
        const rarityName = (item.rarity || 'common').charAt(0).toUpperCase() + (item.rarity || 'common').slice(1);

        lines.push({ text: item.name || 'Unknown', color: hex, size: '13px', bold: true });
        lines.push({ text: rarityName, color: '#888', size: '10px', bold: false });

        if (item.slot) {
            const slotName = item.slot.charAt(0).toUpperCase() + item.slot.slice(1);
            lines.push({ text: 'Slot: ' + slotName, color: '#95a5a6', size: '10px', bold: false });
        }

        if (item.type === 'material' || item.type === 'equip') {
            const s = item.stats || {};
            const statMap = { hp: '+{0} HP', dmg: '+{0} DMG', speed: '+{0} SPD', crit: '+{0}% Crit' };
            Object.entries(statMap).forEach(([k, fmt]) => {
                if (s[k]) lines.push({ text: fmt.replace('{0}', s[k]), color: '#2ecc71', size: '11px', bold: false });
            });
        }

        if (item.type === 'accountEquip') {
            const s = item.stats || {};
            const statMap = {
                hpPercent: '+{0}% HP', damagePercent: '+{0}% DMG', speedPercent: '+{0}% SPD',
                spellPercent: '+{0}% Spell', critPercent: '+{0}% Crit', dodgePercent: '+{0}% Dodge',
                expPercent: '+{0}% EXP', lootPercent: '+{0}% Loot', regenPercent: '+{0}% Regen',
                corruptionMax: '+{0} CorrMax'
            };
            Object.entries(statMap).forEach(([k, fmt]) => {
                if (s[k]) lines.push({ text: fmt.replace('{0}', s[k]), color: '#2ecc71', size: '11px', bold: false });
            });
        }

        if (item.effect) {
            lines.push({ text: 'Effect: ' + item.effect, color: '#f39c12', size: '10px', bold: false });
        }

        const maxW = 180;
        const lineH = 16;
        const padX = 10;
        const padY = 8;
        const totalH = lines.length * lineH + padY * 2;

        let tx = x + 20;
        let ty = y - totalH / 2;
        if (tx + maxW > 780) tx = x - maxW - 20;
        if (ty < 10) ty = 10;
        if (ty + totalH > 590) ty = 590 - totalH;

        ttGroup.push(mk(this.scene.add.rectangle(tx + maxW / 2, ty + totalH / 2, maxW, totalH, 0x0a0a1a, 0.95)
            .setStrokeStyle(1, rc)));

        lines.forEach((l, i) => {
            const fontWeight = l.bold ? ', fontStyle: ' + "'bold'" : '';
            const t = mk(this.scene.add.text(tx + padX, ty + padY + i * lineH, l.text, {
                fontSize: l.size, fill: l.color, fontFamily: 'Arial' + fontWeight
            }));
            ttGroup.push(t);
        });

        this.scene._tooltipGroup = ttGroup;
    }

    _hideItemTooltip() {
        if (this.scene._tooltipGroup) {
            this.scene._tooltipGroup.forEach(e => e.destroy());
        }
        this.scene._tooltipGroup = [];
    }

    openInventory() {
        if (this.scene.menuOpen) return;
        this.scene.invOpen = true;
        this.scene.menuOpen = true;
        this.scene.physics.pause();
        if (this.scene.enemies) this.scene.enemies.getChildren().forEach(e => { if (e.body) e.body.setVelocity(0); });
        if (this.scene.stumps) this.scene.stumps.getChildren().forEach(s => { if (s.body) s.body.setVelocity(0); });
        this.scene.invGroup = [];

        this.scene._drawEquippedPanel();
        this.scene._drawMaterialsPanel();
        this.scene._drawEquipmentBagPanel();
        this.scene._drawCloseButton();
    }

    _drawEquippedPanel() {
        const equipX = 150;

        const mkInv = (el) => { el.setScrollFactor(0).setDepth(100); return el; };

        this.scene.invGroup.push(mkInv(this.scene.add.rectangle(400, 300, 620, 500, 0x0a0a1a, 0.95)
            .setStrokeStyle(2, 0xf1c40f).setInteractive()));
        this.scene.invGroup.push(mkInv(this.scene.add.text(400, 55, 'INVENTORY', {
            fontSize: '22px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5)));
        this.scene.invGroup.push(mkInv(this.scene.add.text(equipX, 85, 'EQUIPPED', {
            fontSize: '13px', fill: '#e74c3c', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5)));

        const slots = [
            { key: 'weapon', label: 'Weapon', y: 140 },
            { key: 'armor', label: 'Armor', y: 210 },
            { key: 'accessory', label: 'Accessory', y: 280 }
        ];

        slots.forEach(sl => {
            this.scene.invGroup.push(mkInv(this.scene.add.text(equipX - 55, sl.y - 8, sl.label + ':', {
                fontSize: '11px', fill: '#95a5a6', fontFamily: 'Arial'
            })));

            const bg = mkInv(this.scene.add.rectangle(equipX + 20, sl.y + 10, 44, 44, 0x1a1a2e)
                .setStrokeStyle(1, 0x444));
            this.scene.invGroup.push(bg);

            if (this.scene.equipment[sl.key]) {
                const item = this.scene.equipment[sl.key];
                this.scene.invGroup.push(mkInv(this.scene.add.sprite(equipX + 20, sl.y + 10, item.texKey)));
                const rc = '#' + RARITY_COLORS[item.rarity].toString(16).padStart(6, '0');
                this.scene.invGroup.push(mkInv(this.scene.add.text(equipX - 55, sl.y + 18, item.name, {
                    fontSize: '10px', fill: rc, fontFamily: 'Arial'
                })));
                bg.setStrokeStyle(2, RARITY_COLORS[item.rarity]);
                bg.setInteractive({ useHandCursor: true });
                bg.on('pointerover', () => this._showItemTooltip(equipX + 50, sl.y, item));
                bg.on('pointerout', () => this._hideItemTooltip());
                bg.on('pointerdown', () => {
                    this._hideItemTooltip();
                    this.scene.unequipItem(sl.key);
                    this.closeInventory();
                    this.openInventory();
                });
            } else {
                this.scene.invGroup.push(mkInv(this.scene.add.text(equipX + 20, sl.y + 10, 'Empty', {
                    fontSize: '9px', fill: '#555', fontFamily: 'Arial'
                }).setOrigin(0.5)));
            }
        });
    }

    _drawMaterialsPanel() {
        const matX = 350, matY = 85;
        const mkInv = (el) => { el.setScrollFactor(0).setDepth(100); return el; };

        this.scene.invGroup.push(mkInv(this.scene.add.text(matX, matY, 'MATERIALS (session)', {
            fontSize: '12px', fill: '#27ae60', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5)));
        this.scene.invGroup.push(mkInv(this.scene.add.text(matX, matY + 16,
            this.scene.materials.length + '/' + this.scene.maxMaterials, {
            fontSize: '10px', fill: '#555', fontFamily: 'Arial'
        }).setOrigin(0.5)));
        this.scene.invGroup.push(mkInv(this.scene.add.text(matX, matY + 30, this.scene.getMaterialStatsText(), {
            fontSize: '10px', fill: '#27ae60', fontFamily: 'Arial'
        }).setOrigin(0.5)));

        const cols = 3, slotSize = 40, gap = 4;
        for (let i = 0; i < 6; i++) {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const sx = matX - (cols * (slotSize + gap)) / 2 + col * (slotSize + gap) + slotSize / 2;
            const sy = matY + 42 + row * (slotSize + gap) + slotSize / 2;

            const bg = mkInv(this.scene.add.rectangle(sx, sy, slotSize, slotSize, 0x1a1a2e).setStrokeStyle(1, 0x333));
            this.scene.invGroup.push(bg);

            if (i < this.scene.materials.length) {
                const item = this.scene.materials[i];
                this.scene.invGroup.push(mkInv(this.scene.add.sprite(sx, sy, item.texKey).setScale(1.3)));
                bg.setStrokeStyle(2, RARITY_COLORS[item.rarity]);
                bg.setInteractive({ useHandCursor: true });

                const idx = i;
                bg.on('pointerdown', () => {
                    if (this.scene.input.keyboard.checkDown(this.scene.input.keyboard.addKey('SHIFT'))) {
                        const expGain = this.scene.deleteItem('material', idx);
                        if (expGain > 0) {
                            this.floatingText(sx, sy - 20, '+' + expGain + ' EXP', '#2ecc71');
                        }
                        this.closeInventory();
                        this.openInventory();
                    }
                });
                bg.on('pointerover', () => { bg.setScale(1.1); this._showItemTooltip(sx + 30, sy, item); });
                bg.on('pointerout', () => { bg.setScale(1); this._hideItemTooltip(); });

                const statParts = [];
                if (item.stats) {
                    if (item.stats.hp) statParts.push('+' + item.stats.hp + 'HP');
                    if (item.stats.dmg) statParts.push('+' + item.stats.dmg + 'DMG');
                    if (item.stats.speed) statParts.push('+' + item.stats.speed + 'SPD');
                }
                if (statParts.length > 0) {
                    this.scene.invGroup.push(mkInv(this.scene.add.text(sx, sy + slotSize / 2 + 8, statParts.join(' '), {
                        fontSize: '8px', fill: '#27ae60', fontFamily: 'Arial'
                    }).setOrigin(0.5)));
                }

                this.scene.invGroup.push(mkInv(this.scene.add.text(sx + slotSize / 2 - 2, sy - slotSize / 2 + 2, 'x', {
                    fontSize: '8px', fill: '#c0392b', fontFamily: 'Arial', fontStyle: 'bold'
                }).setOrigin(1, 0)));
            }
        }
    }

    _drawEquipmentBagPanel() {
        const eqX = 350, eqY = 310;
        const mkInv = (el) => { el.setScrollFactor(0).setDepth(100); return el; };

        this.scene.invGroup.push(mkInv(this.scene.add.text(eqX, eqY, 'EQUIPMENT BAG', {
            fontSize: '12px', fill: '#3498db', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5)));
        this.scene.invGroup.push(mkInv(this.scene.add.text(eqX, eqY + 16,
            this.scene.equipBag.length + '/' + this.scene.maxEquipBag + '  (click to equip)', {
            fontSize: '10px', fill: '#555', fontFamily: 'Arial'
        }).setOrigin(0.5)));

        const cols = 4, slotSize = 40, gap = 4;
        for (let i = 0; i < this.scene.maxEquipBag; i++) {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const sx = eqX - (cols * (slotSize + gap)) / 2 + col * (slotSize + gap) + slotSize / 2;
            const sy = eqY + 32 + row * (slotSize + gap) + slotSize / 2;

            const bg = mkInv(this.scene.add.rectangle(sx, sy, slotSize, slotSize, 0x1a1a2e).setStrokeStyle(1, 0x333));
            this.scene.invGroup.push(bg);

            if (i < this.scene.equipBag.length) {
                const item = this.scene.equipBag[i];
                this.scene.invGroup.push(mkInv(this.scene.add.sprite(sx, sy, item.texKey).setScale(1.4)));
                bg.setStrokeStyle(2, RARITY_COLORS[item.rarity]);
                bg.setInteractive({ useHandCursor: true });

                const idx = i;
                bg.on('pointerdown', () => {
                    if (this.scene.input.keyboard.checkDown(this.scene.input.keyboard.addKey('SHIFT'))) {
                        const expGain = this.scene.deleteItem('equip', idx);
                        if (expGain > 0) {
                            this.floatingText(sx, sy - 20, '+' + expGain + ' EXP', '#2ecc71');
                        }
                        this.closeInventory();
                        this.openInventory();
                    } else {
                        this.scene.equipFromBag(idx);
                        this.closeInventory();
                        this.openInventory();
                    }
                });
                bg.on('pointerover', () => { bg.setScale(1.1); this._showItemTooltip(sx + 30, sy, item); });
                bg.on('pointerout', () => { bg.setScale(1); this._hideItemTooltip(); });

                this.scene.invGroup.push(mkInv(this.scene.add.text(sx + slotSize / 2 - 2, sy - slotSize / 2 + 2, 'x', {
                    fontSize: '8px', fill: '#c0392b', fontFamily: 'Arial', fontStyle: 'bold'
                }).setOrigin(1, 0)));
            }
        }
    }

    _drawCloseButton() {
        const mkInv = (el) => { el.setScrollFactor(0).setDepth(100); return el; };
        const bg = mkInv(this.scene.add.rectangle(400, 520, 100, 30, 0x34495e)
            .setStrokeStyle(1, 0x5a6c7d)
            .setInteractive({ useHandCursor: true }));
        const lbl = mkInv(this.scene.add.text(400, 520, 'CLOSE', {
            fontSize: '12px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5));
        bg.on('pointerdown', () => this.closeInventory());
        this.scene.invGroup.push(bg, lbl);
    }

    closeInventory() {
        this.scene.invOpen = false;
        this._hideItemTooltip();
        this.scene.menuOpen = false;
        this.scene.physics.resume();
        this.scene.invGroup.forEach(e => e.destroy());
        this.scene.invGroup = [];
    }

    togglePause() {
        this.scene.menuOpen ? this.closePause() : this.openPause();
    }

    openPause() {
        this.scene.menuOpen = true;
        this.scene.physics.pause();
        if (this.scene.enemies) this.scene.enemies.getChildren().forEach(e => { if (e.body) e.body.setVelocity(0); });
        if (this.scene.stumps) this.scene.stumps.getChildren().forEach(s => { if (s.body) s.body.setVelocity(0); });

        this.scene.pauseGroup = [];
        const mkPause = (el) => { el.setScrollFactor(0).setDepth(100); return el; };

        this.scene.pauseGroup.push(mkPause(this.scene.add.rectangle(400, 300, 400, 260, 0x000000, 0.92)
            .setStrokeStyle(2, 0xf1c40f)));
        this.scene.pauseGroup.push(mkPause(this.scene.add.text(400, 200, t('pause.title'), {
            fontSize: '28px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5)));

        const buttons = [
            { t: t('pause.resume'), c: 0x27ae60, cb: () => this.closePause() },
            { t: t('pause.menu'), c: 0x2980b9, cb: () => {
                this.scene.doSave();
                this.closePause();
                this.scene.scene.start('Menu');
            }},
            { t: t('adv.title'), c: 0x555577, cb: () => {
                this.closePause();
                this._openPauseAdvanced();
            }}
        ];

        buttons.forEach((b, i) => {
            const y = 245 + i * 42;
            const bg = mkPause(this.scene.add.rectangle(400, y, 200, 32, b.c)
                .setStrokeStyle(1, lighten(b.c, 0.3))
                .setInteractive({ useHandCursor: true }));
            const lbl = mkPause(this.scene.add.text(400, y, b.t, {
                fontSize: '13px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
            }).setOrigin(0.5));
            bg.on('pointerdown', b.cb);
            this.scene.pauseGroup.push(bg, lbl);
        });
    }

    _openPauseAdvanced() {
        this.scene.menuOpen = true;
        this.scene.physics.pause();
        if (this.scene.enemies) this.scene.enemies.getChildren().forEach(e => { if (e.body) e.body.setVelocity(0); });
        if (this.scene.stumps) this.scene.stumps.getChildren().forEach(s => { if (s.body) s.body.setVelocity(0); });

        this.scene.pauseGroup = [];
        const mkPause = (el) => { el.setScrollFactor(0).setDepth(100); return el; };

        this.scene.pauseGroup.push(mkPause(this.scene.add.rectangle(400, 300, 400, 360, 0x000000, 0.92)
            .setStrokeStyle(2, 0x555577)));
        this.scene.pauseGroup.push(mkPause(this.scene.add.text(400, 155, t('adv.title'), {
            fontSize: '20px', fill: '#aaa', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5)));

        const buttons = [
            { t: t('adv.talents'), c: 0x9b59b6, cb: () => {
                this.closePause();
                this._openTalentTree();
            }},
            { t: t('adv.accountEquip'), c: 0xf39c12, cb: () => {
                this.closePause();
                this._openAccountEquipOverlay();
            }},
            { t: t('pause.changeClass'), c: 0x1abc9c, cb: () => {
                this.scene.doSave();
                this.closePause();
                this.scene.scene.start('ClassSelect');
            }},
            { t: t('pause.save'), c: 0x8e44ad, cb: () => { this.scene.doSave(); this.closePause(); }},
            { t: t('pause.restart'), c: 0xe67e22, cb: () => {
                this.scene.doSave();
                this.closePause();
                this.scene.scene.restart({ difficulty: this.scene.difficulty, classKey: this.scene.classKey });
            }},
            { t: t('pause.back'), c: 0x34495e, cb: () => {
                this.closePause();
                this.openPause();
            }}
        ];

        buttons.forEach((b, i) => {
            const y = 190 + i * 38;
            const bg = mkPause(this.scene.add.rectangle(400, y, 200, 30, b.c)
                .setStrokeStyle(1, lighten(b.c, 0.3))
                .setInteractive({ useHandCursor: true }));
            const lbl = mkPause(this.scene.add.text(400, y, b.t, {
                fontSize: '12px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
            }).setOrigin(0.5));
            bg.on('pointerdown', b.cb);
            this.scene.pauseGroup.push(bg, lbl);
        });
    }

    closePause() {
        this.scene.menuOpen = false;
        this.scene.physics.resume();
        if (this.scene.pauseGroup) {
            this.scene.pauseGroup.forEach(e => e.destroy());
            this.scene.pauseGroup = [];
        }
    }

    _openAccountEquipOverlay() {
        this.scene.menuOpen = true;
        this.scene.physics.pause();
        this.scene.accountEquipGroup = [];
        const mk = (el) => { el.setScrollFactor(0).setDepth(100); return el; };

        this.scene.accountEquipGroup.push(mk(this.scene.add.rectangle(400, 300, 620, 560, 0x000000, 0.94)
            .setStrokeStyle(2, 0xf39c12)));

        this.scene.accountEquipGroup.push(mk(this.scene.add.text(400, 35, t('accEquip.title'), {
            fontSize: '20px', fill: '#f39c12', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5)));

        const statsText = this.scene.getAccountEquipStatsText();
        this.scene.accountEquipGroup.push(mk(this.scene.add.text(400, 55, statsText, {
            fontSize: '12px', fill: '#2ecc71', fontFamily: 'Arial'
        }).setOrigin(0.5)));

        const slots = ['hat', 'mantle', 'legs', 'weapon', 'accessory', 'relic'];
        const slotLabels = [t('accEquip.hat'), t('accEquip.mantle'), t('accEquip.legs'), t('accEquip.weapon'), t('accEquip.acc'), 'Relic'];
        const slotY = [85, 120, 155, 190, 225, 260];

        slots.forEach((slot, i) => {
            const item = this.scene.accountEquipment[slot];
            const y = slotY[i];

            this.scene.accountEquipGroup.push(mk(this.scene.add.text(120, y, slotLabels[i] + ':', {
                fontSize: '13px', fill: '#aaa', fontFamily: 'Arial', fontStyle: 'bold'
            }).setOrigin(0, 0.5)));

            const bg = mk(this.scene.add.rectangle(210, y, 36, 36, 0x1a1a2e)
                .setStrokeStyle(1, 0x444));
            this.scene.accountEquipGroup.push(bg);

            if (item) {
                const spr = mk(this.scene.add.sprite(210, y, item.texKey).setScale(1.6));
                this.scene.accountEquipGroup.push(spr);
                const rc = RARITY_COLORS[item.rarity] || 0xaaaaaa;
                bg.setStrokeStyle(2, rc);

                const hex = '#' + rc.toString(16).padStart(6, '0');
                this.scene.accountEquipGroup.push(mk(this.scene.add.text(235, y - 6, item.name, {
                    fontSize: '12px', fill: hex, fontFamily: 'Arial', fontStyle: 'bold'
                }).setOrigin(0, 0.5)));

                const st = this._getAccountItemStatsText(item);
                this.scene.accountEquipGroup.push(mk(this.scene.add.text(235, y + 6, st, {
                    fontSize: '10px', fill: '#2ecc71', fontFamily: 'Arial'
                }).setOrigin(0, 0.5)));

                bg.setInteractive({ useHandCursor: true });
                bg.on('pointerover', () => this._showItemTooltip(560, y, item));
                bg.on('pointerout', () => this._hideItemTooltip());

                const ub = mk(this.scene.add.rectangle(520, y, 50, 18, 0xc0392b)
                    .setStrokeStyle(1, 0xe74c3c)
                    .setInteractive({ useHandCursor: true }));
                const ut = mk(this.scene.add.text(520, y, 'REMOVE', {
                    fontSize: '10px', fill: '#fff', fontFamily: 'Arial'
                }).setOrigin(0.5));
                ub.on('pointerdown', () => {
                    this.scene.unequipAccountItem(slot);
                    this._closeAccountEquipOverlay();
                    this._openAccountEquipOverlay();
                });
                ub.on('pointerover', () => ub.setFillStyle(0xe74c3c));
                ub.on('pointerout', () => ub.setFillStyle(0xc0392b));
                this.scene.accountEquipGroup.push(ub, ut);
            } else {
                this.scene.accountEquipGroup.push(mk(this.scene.add.text(210, y, 'Empty', {
                    fontSize: '11px', fill: '#555', fontFamily: 'Arial'
                }).setOrigin(0.5)));
            }
        });

        this.scene.accountEquipGroup.push(mk(this.scene.add.rectangle(400, 300, 560, 1, 0x444)));

        this.scene.accountEquipGroup.push(mk(this.scene.add.text(400, 315, 'INVENTORY', {
            fontSize: '15px', fill: '#f39c12', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5)));

        this.scene.accountEquipGroup.push(mk(this.scene.add.text(400, 332, this.scene.accountEquipBag.length + '/' + this.scene.maxAccountEquipBag + '  (SHIFT+click = sell for Account EXP)', {
            fontSize: '11px', fill: '#888', fontFamily: 'Arial'
        }).setOrigin(0.5)));

        const bagSlotsPerRow = 5;
        const bagSlotSize = 38;
        const bagSpacing = 48;
        const bagStartX = 400 - (bagSlotsPerRow * bagSpacing) / 2 + bagSpacing / 2;
        const bagStartY = 370;

        for (let i = 0; i < this.scene.maxAccountEquipBag; i++) {
            const row = Math.floor(i / bagSlotsPerRow);
            const col = i % bagSlotsPerRow;
            const sx = bagStartX + col * bagSpacing;
            const sy = bagStartY + row * bagSpacing;

            const bg = mk(this.scene.add.rectangle(sx, sy, bagSlotSize, bagSlotSize, 0x1a1a2e)
                .setStrokeStyle(1, 0x444));
            this.scene.accountEquipGroup.push(bg);

            if (i < this.scene.accountEquipBag.length) {
                const item = this.scene.accountEquipBag[i];
                const spr = mk(this.scene.add.sprite(sx, sy, item.texKey).setScale(1.6));
                this.scene.accountEquipGroup.push(spr);
                const rc = RARITY_COLORS[item.rarity] || 0xaaaaaa;
                bg.setStrokeStyle(2, rc);

                this.scene.accountEquipGroup.push(mk(this.scene.add.text(sx + bagSlotSize / 2 - 2, sy - bagSlotSize / 2 + 2, 'x', {
                    fontSize: '9px', fill: '#c0392b', fontFamily: 'Arial', fontStyle: 'bold'
                }).setOrigin(1, 0)));

                bg.setInteractive({ useHandCursor: true });
                bg.on('pointerdown', (pointer) => {
                    if (this.scene.input.keyboard.checkDown(this.scene.input.keyboard.addKey('SHIFT'))) {
                        const expGain = this.scene.deleteItem('accountEquipBag', i);
                        if (expGain > 0) {
                            this.floatingText(sx, sy - 20, '+' + expGain + ' Account EXP', '#f39c12');
                        }
                        this._closeAccountEquipOverlay();
                        this._openAccountEquipOverlay();
                    } else {
                        const emptySlot = slots.find(s => !this.scene.accountEquipment[s]);
                        if (emptySlot) {
                            this.scene.accountEquipBag.splice(i, 1);
                            this.scene.accountEquipment[emptySlot] = item;
                            this.scene.recalcStats();
                            this._closeAccountEquipOverlay();
                            this._openAccountEquipOverlay();
                        }
                    }
                });
            } else {
                this.scene.accountEquipGroup.push(mk(this.scene.add.text(sx, sy, 'Empty', {
                    fontSize: '10px', fill: '#333', fontFamily: 'Arial'
                }).setOrigin(0.5)));
            }
        }

        const closeBg = mk(this.scene.add.rectangle(400, 530, 100, 26, 0x34495e)
            .setStrokeStyle(1, 0x555)
            .setInteractive({ useHandCursor: true }));
        const closeTxt = mk(this.scene.add.text(400, 530, 'CLOSE', {
            fontSize: '14px', fill: '#fff', fontFamily: 'Arial'
        }).setOrigin(0.5));
        closeBg.on('pointerdown', () => this._closeAccountEquipOverlay());
        closeBg.on('pointerover', () => closeBg.setFillStyle(0x4a6a8e));
        closeBg.on('pointerout', () => closeBg.setFillStyle(0x34495e));
        this.scene.accountEquipGroup.push(closeBg, closeTxt);
    }

    _closeAccountEquipOverlay() {
        this._hideItemTooltip();
        if (this.scene.accountEquipGroup) {
            this.scene.accountEquipGroup.forEach(e => e.destroy());
            this.scene.accountEquipGroup = [];
        }
        this.scene.menuOpen = false;
        this.scene.physics.resume();
    }

    _getAccountItemStatsText(item) {
        if (!item || !item.stats) return '';
        const s = item.stats;
        const parts = [];
        if (s.hpPercent) parts.push('+' + s.hpPercent + '% HP');
        if (s.damagePercent) parts.push('+' + s.damagePercent + '% DMG');
        if (s.speedPercent) parts.push('+' + s.speedPercent + '% SPD');
        if (s.spellPercent) parts.push('+' + s.spellPercent + '% Spell');
        if (s.critPercent) parts.push('+' + s.critPercent + '% Crit');
        if (s.dodgePercent) parts.push('+' + s.dodgePercent + '% Dodge');
        if (s.expPercent) parts.push('+' + s.expPercent + '% EXP');
        if (s.lootPercent) parts.push('+' + s.lootPercent + '% Loot');
        if (s.regenPercent) parts.push('+' + s.regenPercent + '% Regen');
        if (s.corruptionMax) parts.push('+' + s.corruptionMax + ' CorrMax');
        return parts.join(' ');
    }
}
