import { RARITY_COLORS } from '../config/index.js';
import { t } from '../i18n.js';

export class AccountEquipUI {
    constructor(scene, ui) {
        this.scene = scene;
        this.ui = ui;
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
                    this.ui._showItemTooltip(cx + slotSize, cy, item);
                });
                bg.on('pointerout', () => {
                    bg.setScale(1);
                    this.ui._hideItemTooltip();
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

        this.scene.accountEquipGroup.push(mk(this.scene.add.text(400, 278, this.scene.accountEquipBag.length + '/' + this.scene.maxAccountEquipBag + '  LMB=equip  RMB=lock  SHIFT+click=sell', {
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

                if (item.locked) {
                    const lockIcon = mk(this.scene.add.text(sx - bagSlotSize / 2 + 2, sy - bagSlotSize / 2 + 1, '\u{1F512}', {
                        fontSize: '7px', fill: '#e74c3c', fontFamily: 'Arial'
                    }));
                    this.scene.accountEquipGroup.push(lockIcon);
                }

                bg.setInteractive({ useHandCursor: true });
                bg.on('pointerover', () => {
                    bg.setScale(1.15);
                    this.ui._showItemTooltip(sx + bagSlotSize, sy, item);
                });
                bg.on('pointerout', () => {
                    bg.setScale(1);
                    this.ui._hideItemTooltip();
                });
                bg.on('pointerdown', (pointer) => {
                    if (pointer.rightButtonDown()) {
                        this.scene.playerSys.toggleLock('accountEquipBag', i);
                        this._closeAccountEquipOverlay();
                        this._openAccountEquipOverlay();
                    } else if (this.scene.input.keyboard.checkDown(this.scene.input.keyboard.addKey('SHIFT'))) {
                        if (item.locked) {
                            this.ui.floatingText(sx, sy - 20, 'Item is locked!', '#e74c3c');
                            return;
                        }
                        const sellResult = this.scene.playerSys.sellItem('accountEquipBag', i);
                        if (sellResult > 0) {
                            this.ui.floatingText(sx, sy - 20, '+' + sellResult + ' gold', '#f1c40f');
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
                                    this.ui.floatingText(sx, sy - 20, 'Bag full! Item lost', '#e74c3c');
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
        this.ui._hideItemTooltip();
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
        if (s.damageReduction) parts.push('+' + s.damageReduction + '% DR');
        if (s.lifeStealPercent) parts.push('+' + s.lifeStealPercent + '% LS');
        if (s.shieldPercent) parts.push('+' + s.shieldPercent + '% Shield');
        return parts.join(' ');
    }

    _getRarityName(rarity) {
        const names = { common: 'Common', uncommon: 'Uncommon', rare: 'Rare', epic: 'Epic', legendary: 'Legendary' };
        return names[rarity] || rarity;
    }

    _getSlotIcon(slot) {
        const icons = { hat: 'Hat', mantle: 'Cape', legs: 'Boots', weapon: 'Weapon', accessory: 'Acc', ring: 'Ring', charm: 'Charm', relic: 'Relic' };
        return icons[slot] || slot;
    }
}
