import { RARITY_COLORS, SHOP_EQUIP_PRICES, SELL_PRICE_RATIO } from '../config/index.js';
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

    _mkEl(el) { el.setScrollFactor(0).setDepth(100); return el; }

    _createUI() {
        this.scene._createTopBar();
    }

    _createTopBar() {
        const s = (el) => { el.setScrollFactor(0).setDepth(20); return el; };
        const sx = (el) => { el.setScrollFactor(0).setDepth(23); return el; };

        this.scene.heroPanelBg = s(this.scene.add.rectangle(95, 44, 190, 88, 0x0a0a1a, 0.88)
            .setStrokeStyle(1, 0x444444));

        this.scene.heroIcon = sx(this.scene.add.sprite(30, 44, 'icon_sage').setScale(2));

        this.scene.heroClassName = sx(this.scene.add.text(58, 16, '', {
            fontSize: '13px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }));

        this.scene.heroLevel = sx(this.scene.add.text(185, 16, '', {
            fontSize: '11px', fill: '#e67e22', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 1
        }).setOrigin(1, 0));

        this.scene.heroDmgText = sx(this.scene.add.text(58, 32, '', {
            fontSize: '11px', fill: '#e74c3c', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 1
        }));

        this.scene.heroHpBarOuter = s(this.scene.add.rectangle(58, 44, 126, 10, 0x1a1a2e)
            .setOrigin(0, 0.5).setStrokeStyle(1, 0x444444));
        this.scene.heroHpBarFill = s(this.scene.add.rectangle(59, 44, 124, 8, 0xe74c3c)
            .setOrigin(0, 0.5));
        this.scene.heroShieldFill = s(this.scene.add.rectangle(59, 44, 0, 8, 0x3498db, 0.4)
            .setOrigin(0, 0.5));

        this.scene.heroHpText = sx(this.scene.add.text(121, 44, '', {
            fontSize: '8px', fill: '#fff', fontFamily: 'Arial',
            stroke: '#000', strokeThickness: 1
        }).setOrigin(0.5));

        this.scene.heroCorLabel = sx(this.scene.add.text(58, 54, 'COR', {
            fontSize: '8px', fill: '#9b59b6', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 1
        }));

        this.scene.heroCorBarOuter = s(this.scene.add.rectangle(80, 54, 104, 5, 0x1a1a2e)
            .setOrigin(0, 0.5).setStrokeStyle(1, 0x333333));
        this.scene.heroCorBarFill = s(this.scene.add.rectangle(81, 54, 0, 3, 0x9b59b6)
            .setOrigin(0, 0.5));

        this.scene.heroAccLabel = sx(this.scene.add.text(58, 64, '', {
            fontSize: '8px', fill: '#e67e22', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 1
        }));

        this.scene.heroAccBarOuter = s(this.scene.add.rectangle(100, 64, 84, 4, 0x1a1a2e)
            .setOrigin(0, 0.5).setStrokeStyle(1, 0x333333));
        this.scene.heroAccBarFill = s(this.scene.add.rectangle(101, 64, 0, 2, 0xe67e22)
            .setOrigin(0, 0.5));

        this.scene.heroHint = sx(this.scene.add.text(58, 74, '', {
            fontSize: '8px', fill: '#666', fontFamily: 'Arial'
        }));

        this.scene.diffText = sx(this.scene.add.text(185, 4, '', {
            fontSize: '9px', fill: '#f39c12', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 1
        }).setOrigin(1, 0));

        this.scene.goldText = sx(this.scene.add.text(185, 86, '', {
            fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 1
        }).setOrigin(1, 0));

        this.scene.hintText = this.scene.add.text(400, 588, '', {
            fontSize: '10px', fill: '#555', fontFamily: 'Arial'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(20);

        this.scene.muteText = this.scene.add.text(790, 30, 'SOUND', {
            fontSize: '10px', fill: '#27ae60', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 1
        }).setOrigin(1, 0.5).setScrollFactor(0).setDepth(23).setInteractive({ useHandCursor: true });
        this.scene.muteText.on('pointerdown', () => this._toggleMute());

        this.scene.talentText = this.scene.add.text(400, 36, '', {
            fontSize: '9px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 1
        }).setScrollFactor(0).setDepth(23);

        this.scene.spellSlots = {};
        const spellKeys = ['fireball', 'shield', 'heal'];
        const spellLabels = ['Q', 'W', 'E'];
        const spellColors = [0xe74c3c, 0x3498db, 0x2ecc71];
        spellKeys.forEach((key, i) => {
            const sx2 = 690 + i * 36;
            const sy = 565;
            const bg = this.scene.add.rectangle(sx2, sy, 30, 30, 0x1a1a2e)
                .setStrokeStyle(2, spellColors[i])
                .setScrollFactor(0).setDepth(24);
            const lbl = this.scene.add.text(sx2, sy - 2, spellLabels[i], {
                fontSize: '10px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
            }).setOrigin(0.5).setScrollFactor(0).setDepth(25);
            const cd = this.scene.add.text(sx2, sy + 10, '', {
                fontSize: '8px', fill: '#f39c12', fontFamily: 'Arial'
            }).setOrigin(0.5).setScrollFactor(0).setDepth(25);
            this.scene.spellSlots[key] = { bg, lbl, cd };
        });
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

    updateUI() {
        const accReq = getAccountLevelUpReq(this.scene.accountLevel);

        const iconKey = 'icon_' + (this.scene.classKey || 'sage');
        if (this.scene.heroIcon && this.scene.heroIcon.texture.key !== iconKey) {
            this.scene.heroIcon.setTexture(iconKey);
        }
        const clsNames = { sage: 'SAGE', alchemist: 'ALCHEMIST', angel: 'ANGEL' };
        if (this.scene.heroClassName) this.scene.heroClassName.setText(clsNames[this.scene.classKey] || 'SAGE');
        if (this.scene.heroLevel) this.scene.heroLevel.setText('Lv.' + this.scene.playerLevel);
        if (this.scene.heroDmgText) this.scene.heroDmgText.setText('DMG:' + this.scene.playerDamage);

        const hpRatio = this.scene.playerMaxHP > 0 ? this.scene.playerHP / this.scene.playerMaxHP : 0;
        if (this.scene.heroHpBarFill) {
            this.scene.heroHpBarFill.width = Math.max(0, 124 * hpRatio);
            if (hpRatio > 0.6) this.scene.heroHpBarFill.setFillStyle(0x27ae60);
            else if (hpRatio > 0.3) this.scene.heroHpBarFill.setFillStyle(0xf39c12);
            else this.scene.heroHpBarFill.setFillStyle(0xe74c3c);
        }
        if (this.scene.heroHpText) this.scene.heroHpText.setText(this.scene.playerHP + '/' + this.scene.playerMaxHP);

        if (this.scene.shieldActive && this.scene.shieldHP > 0) {
            this.scene.heroShieldFill.width = Math.min(124, 124 * (this.scene.shieldHP / this.scene.playerMaxHP));
            this.scene.heroShieldFill.x = 59 + this.scene.heroHpBarFill.width;
        } else {
            this.scene.heroShieldFill.width = 0;
        }

        const corRatio = this.scene.corruptionMax > 0 ? this.scene.corruption / this.scene.corruptionMax : 0;
        if (this.scene.heroCorBarFill) {
            this.scene.heroCorBarFill.width = Math.max(0, 102 * corRatio);
            if (corRatio > 0.8) this.scene.heroCorBarFill.setFillStyle(0xe74c3c);
            else if (corRatio > 0.5) this.scene.heroCorBarFill.setFillStyle(0xe67e22);
            else this.scene.heroCorBarFill.setFillStyle(0x9b59b6);
        }

        if (this.scene.heroAccLabel) this.scene.heroAccLabel.setText('AcLv' + this.scene.accountLevel);
        if (this.scene.heroAccBarFill) this.scene.heroAccBarFill.width = Math.max(0, 82 * (this.scene.accountExp / accReq));

        if (this.scene.heroHint) this.scene.heroHint.setText(this.scene.talentPoints > 0 ? 'Talents: ' + this.scene.talentPoints + ' [T]' : '');

        if (this.scene.diffText) this.scene.diffText.setText(this.scene.difficulty);
        this.scene.talentText.setText(this.scene.talentPoints > 0 ? 'TALENTS: ' + this.scene.talentPoints + ' [T]' : '');
        if (this.scene.goldText) this.scene.goldText.setText('Gold: ' + (this.scene.gold || 0));

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

        const mkInv = (el) => this._mkEl(el);

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

        const consY = 340;
        this.scene.invGroup.push(mkInv(this.scene.add.text(equipX - 55, consY - 8, 'Potion:', {
            fontSize: '11px', fill: '#2ecc71', fontFamily: 'Arial', fontStyle: 'bold'
        })));
        const consBg = mkInv(this.scene.add.rectangle(equipX + 20, consY + 10, 44, 44, 0x1a1a2e)
            .setStrokeStyle(1, 0x2ecc71));
        this.scene.invGroup.push(consBg);
        if (this.scene.consumable) {
            const item = this.scene.consumable;
            this.scene.invGroup.push(mkInv(this.scene.add.sprite(equipX + 20, consY + 10, item.texKey)));
            const rc = '#' + (RARITY_COLORS[item.rarity] || 0xaaaaaa).toString(16).padStart(6, '0');
            this.scene.invGroup.push(mkInv(this.scene.add.text(equipX - 55, consY + 18, item.name, {
                fontSize: '10px', fill: rc, fontFamily: 'Arial'
            })));
            consBg.setStrokeStyle(2, RARITY_COLORS[item.rarity] || 0xaaaaaa);
            consBg.setInteractive({ useHandCursor: true });
            consBg.on('pointerover', () => this._showItemTooltip(equipX + 50, consY, item));
            consBg.on('pointerout', () => this._hideItemTooltip());
            consBg.on('pointerdown', () => {
                this._hideItemTooltip();
                if (this.scene.playerSys) this.scene.playerSys.useConsumable();
                this.closeInventory();
            });
            this.scene.invGroup.push(mkInv(this.scene.add.text(equipX + 44, consY + 10, '[F]', {
                fontSize: '9px', fill: '#2ecc71', fontFamily: 'Arial'
            })));
        } else {
            this.scene.invGroup.push(mkInv(this.scene.add.text(equipX + 20, consY + 10, 'Empty', {
                fontSize: '9px', fill: '#555', fontFamily: 'Arial'
            }).setOrigin(0.5)));
        }

        this.scene.invGroup.push(mkInv(this.scene.add.text(350, consY - 8, 'Gold: ' + (this.scene.gold || 0), {
            fontSize: '13px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5)));
    }

    _drawMaterialsPanel() {
        const matX = 350, matY = 85;
        const mkInv = (el) => this._mkEl(el);

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
        const mkInv = (el) => this._mkEl(el);

        this.scene.invGroup.push(mkInv(this.scene.add.text(eqX, eqY, 'EQUIPMENT BAG', {
            fontSize: '12px', fill: '#3498db', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5)));
        this.scene.invGroup.push(mkInv(this.scene.add.text(eqX, eqY + 16,
            this.scene.equipBag.length + '/' + this.scene.maxEquipBag + '  (click=equip, shift+click=sell)', {
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
                        const sellPrice = Math.floor((SHOP_EQUIP_PRICES[item.rarity] || SHOP_EQUIP_PRICES.uncommon) * SELL_PRICE_RATIO);
                        this.scene.equipBag.splice(idx, 1);
                        this.scene.gold = (this.scene.gold || 0) + sellPrice;
                        this.scene.floatingText(sx, sy - 20, '+' + sellPrice + ' gold', '#f1c40f');
                        if (this.scene.goldText) this.scene.goldText.setText('Gold: ' + this.scene.gold);
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
        const mkInv = (el) => this._mkEl(el);
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
        const mkPause = (el) => this._mkEl(el);

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
        const mkPause = (el) => this._mkEl(el);

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

        const W = 520, H = 520;
        this.scene.accountEquipGroup.push(mk(this.scene.add.rectangle(400, 300, W, H, 0x000000, 0.94)
            .setStrokeStyle(2, 0xf39c12)));

        this.scene.accountEquipGroup.push(mk(this.scene.add.text(400, 28, t('accEquip.title'), {
            fontSize: '18px', fill: '#f39c12', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5)));

        const statsText = this.scene.getAccountEquipStatsText();
        this.scene.accountEquipGroup.push(mk(this.scene.add.text(400, 48, statsText, {
            fontSize: '11px', fill: '#2ecc71', fontFamily: 'Arial'
        }).setOrigin(0.5)));

        this.scene.accountEquipGroup.push(mk(this.scene.add.rectangle(400, 65, W - 40, 1, 0x333)));

        const slots = ['hat', 'mantle', 'legs', 'weapon', 'accessory', 'ring', 'charm', 'relic'];
        const slotLabels = [t('accEquip.hat'), t('accEquip.mantle'), t('accEquip.legs'), t('accEquip.weapon'), t('accEquip.acc'), t('accEquip.ring'), t('accEquip.charm'), t('accEquip.relic')];

        const colX = [165, 385];
        const rowY = [95, 135, 175, 215];
        const slotSize = 30;
        const labelW = 55;
        const nameX = 40;

        slots.forEach((slot, i) => {
            const col = i < 4 ? 0 : 1;
            const row = i % 4;
            const cx = colX[col];
            const cy = rowY[row];
            const item = this.scene.accountEquipment[slot];

            this.scene.accountEquipGroup.push(mk(this.scene.add.text(cx - labelW, cy, slotLabels[i], {
                fontSize: '11px', fill: '#888', fontFamily: 'Arial'
            }).setOrigin(0, 0.5)));

            const bg = mk(this.scene.add.rectangle(cx, cy, slotSize, slotSize, 0x1a1a2e)
                .setStrokeStyle(1, 0x444));
            this.scene.accountEquipGroup.push(bg);

            if (item) {
                const spr = mk(this.scene.add.sprite(cx, cy, item.texKey).setScale(1.3));
                this.scene.accountEquipGroup.push(spr);
                const rc = RARITY_COLORS[item.rarity] || 0xaaaaaa;
                bg.setStrokeStyle(2, rc);

                const hex = '#' + rc.toString(16).padStart(6, '0');
                this.scene.accountEquipGroup.push(mk(this.scene.add.text(cx + slotSize / 2 + 6, cy, item.name, {
                    fontSize: '11px', fill: hex, fontFamily: 'Arial', fontStyle: 'bold'
                }).setOrigin(0, 0.5)));

                bg.setInteractive({ useHandCursor: true });
                bg.on('pointerover', () => {
                    bg.setScale(1.1);
                    this._showItemTooltip(cx + slotSize, cy, item);
                });
                bg.on('pointerout', () => {
                    bg.setScale(1);
                    this._hideItemTooltip();
                });
                bg.on('pointerdown', (pointer) => {
                    if (pointer.rightButtonDown()) {
                        this.scene.unequipAccountItem(slot);
                        this._closeAccountEquipOverlay();
                        this._openAccountEquipOverlay();
                    }
                });
            } else {
                this.scene.accountEquipGroup.push(mk(this.scene.add.text(cx + slotSize / 2 + 6, cy, '—', {
                    fontSize: '11px', fill: '#444', fontFamily: 'Arial'
                }).setOrigin(0, 0.5)));
            }
        });

        this.scene.accountEquipGroup.push(mk(this.scene.add.rectangle(400, 250, W - 40, 1, 0x333)));

        this.scene.accountEquipGroup.push(mk(this.scene.add.text(400, 262, 'BAG', {
            fontSize: '13px', fill: '#f39c12', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5)));

        this.scene.accountEquipGroup.push(mk(this.scene.add.text(400, 278, this.scene.accountEquipBag.length + '/' + this.scene.maxAccountEquipBag + '  LMB=equip  RMB=unequip  SHIFT+click=sell', {
            fontSize: '9px', fill: '#666', fontFamily: 'Arial'
        }).setOrigin(0.5)));

        const bagSlotsPerRow = 6;
        const bagSlotSize = 32;
        const bagSpacing = 40;
        const bagStartX = 400 - (bagSlotsPerRow * bagSpacing) / 2 + bagSpacing / 2;
        const bagStartY = 310;

        for (let i = 0; i < this.scene.maxAccountEquipBag; i++) {
            const row = Math.floor(i / bagSlotsPerRow);
            const col = i % bagSlotsPerRow;
            const sx = bagStartX + col * bagSpacing;
            const sy = bagStartY + row * bagSpacing;

            const bg = mk(this.scene.add.rectangle(sx, sy, bagSlotSize, bagSlotSize, 0x1a1a2e)
                .setStrokeStyle(1, 0x333));
            this.scene.accountEquipGroup.push(bg);

            if (i < this.scene.accountEquipBag.length) {
                const item = this.scene.accountEquipBag[i];
                const spr = mk(this.scene.add.sprite(sx, sy, item.texKey).setScale(1.3));
                this.scene.accountEquipGroup.push(spr);
                const rc = RARITY_COLORS[item.rarity] || 0xaaaaaa;
                bg.setStrokeStyle(2, rc);

                bg.setInteractive({ useHandCursor: true });
                bg.on('pointerover', () => {
                    bg.setScale(1.15);
                    this._showItemTooltip(sx + bagSlotSize, sy, item);
                });
                bg.on('pointerout', () => {
                    bg.setScale(1);
                    this._hideItemTooltip();
                });
                bg.on('pointerdown', (pointer) => {
                    if (pointer.rightButtonDown() || this.scene.input.keyboard.checkDown(this.scene.input.keyboard.addKey('SHIFT'))) {
                        const expGain = this.scene.deleteItem('accountEquipBag', i);
                        if (expGain > 0) {
                            this.floatingText(sx, sy - 20, '+' + expGain + ' Account EXP', '#f39c12');
                        }
                        this._closeAccountEquipOverlay();
                        this._openAccountEquipOverlay();
                    } else {
                        const targetSlot = item.slot;
                        if (targetSlot && this.scene.accountEquipment[targetSlot] !== undefined) {
                            const old = this.scene.accountEquipment[targetSlot];
                            this.scene.accountEquipBag.splice(i, 1);
                            this.scene.accountEquipment[targetSlot] = item;
                            if (old) {
                                if (this.scene.accountEquipBag.length < this.scene.maxAccountEquipBag) {
                                    this.scene.accountEquipBag.push(old);
                                } else {
                                    this.floatingText(sx, sy - 20, 'Bag full! Item lost', '#e74c3c');
                                }
                            }
                            this.scene.recalcStats();
                            this._closeAccountEquipOverlay();
                            this._openAccountEquipOverlay();
                        }
                    }
                });
            }
        }

        const closeBg = mk(this.scene.add.rectangle(400, 490, 100, 24, 0x34495e)
            .setStrokeStyle(1, 0x555)
            .setInteractive({ useHandCursor: true }));
        const closeTxt = mk(this.scene.add.text(400, 490, 'CLOSE', {
            fontSize: '13px', fill: '#fff', fontFamily: 'Arial'
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
