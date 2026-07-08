import { RARITY_COLORS } from '../config/index.js';

export class InventoryUI {
    constructor(scene, ui) {
        this.scene = scene;
        this.ui = ui;
    }

    toggleInventory() {
        this.scene.invOpen ? this.closeInventory() : this.openInventory();
    }

    openInventory() {
        if (this.scene.menuOpen) return;
        this.scene.invOpen = true;
        this.scene.menuOpen = true;
        this.scene.physics.pause();
        if (this.scene.enemies) this.scene.enemies.getChildren().forEach(e => { if (e.body) e.body.setVelocity(0); });
        if (this.scene.stumps) this.scene.stumps.getChildren().forEach(s => { if (s.body) s.body.setVelocity(0); });
        this.scene.invGroup = [];

        this._drawEquippedPanel();
        this._drawMaterialsPanel();
        this._drawEquipmentBagPanel();
        this._drawCloseButton();
    }

    _drawEquippedPanel() {
        const equipX = 150;

        const mkInv = (el) => this.ui._mkEl(el);

        // Parchment background
        this.scene.invGroup.push(mkInv(this.scene.add.image(400, 300, 'parchment_bg').setInteractive()));
        this.scene.invGroup.push(mkInv(this.scene.add.image(400, 300, 'ornate_border')));
        
        this.scene.invGroup.push(mkInv(this.scene.add.text(400, 55, 'INVENTORY', {
            fontSize: '22px', fill: '#5c3a1e', fontFamily: 'Georgia, serif', fontStyle: 'bold'
        }).setOrigin(0.5)));
        this.scene.invGroup.push(mkInv(this.scene.add.text(equipX, 85, 'EQUIPPED', {
            fontSize: '13px', fill: '#8b4513', fontFamily: 'Georgia, serif', fontStyle: 'bold'
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
                bg.on('pointerover', () => this.ui._showItemTooltip(equipX + 50, sl.y, item));
                bg.on('pointerout', () => this.ui._hideItemTooltip());
                bg.on('pointerdown', (pointer) => {
                    if (pointer.rightButtonDown()) {
                        this.scene.playerSys.toggleLock('equip', this.scene.equipBag.indexOf(item));
                    } else {
                        this.ui._hideItemTooltip();
                        this.scene.unequipItem(sl.key);
                        this.closeInventory();
                        this.openInventory();
                    }
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
            consBg.on('pointerover', () => this.ui._showItemTooltip(equipX + 50, consY, item));
            consBg.on('pointerout', () => this.ui._hideItemTooltip());
            consBg.on('pointerdown', () => {
                this.ui._hideItemTooltip();
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
        const mkInv = (el) => this.ui._mkEl(el);

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

        const cols = 5, slotSize = 36, gap = 4;
        for (let i = 0; i < this.scene.maxMaterials; i++) {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const sx = matX - (cols * (slotSize + gap)) / 2 + col * (slotSize + gap) + slotSize / 2;
            const sy = matY + 42 + row * (slotSize + gap) + slotSize / 2;

            const bg = mkInv(this.scene.add.rectangle(sx, sy, slotSize, slotSize, 0x1a1a2e).setStrokeStyle(1, 0x333));
            this.scene.invGroup.push(bg);

            if (i < this.scene.materials.length) {
                const item = this.scene.materials[i];
                this.scene.invGroup.push(mkInv(this.scene.add.sprite(sx, sy, item.texKey).setScale(1.2)));
                bg.setStrokeStyle(2, RARITY_COLORS[item.rarity]);
                bg.setInteractive({ useHandCursor: true });

                if (item.locked) {
                    const lockIcon = mkInv(this.scene.add.text(sx - slotSize / 2 + 3, sy - slotSize / 2 + 2, '\u{1F512}', {
                        fontSize: '8px', fill: '#e74c3c', fontFamily: 'Arial'
                    }));
                    this.scene.invGroup.push(lockIcon);
                }

                const idx = i;
                bg.on('pointerdown', (pointer) => {
                    if (pointer.rightButtonDown()) {
                        this.scene.playerSys.toggleLock('material', idx);
                        this.closeInventory();
                        this.openInventory();
                    } else if (this.scene.input.keyboard.checkDown(this.scene.input.keyboard.addKey('SHIFT'))) {
                        if (item.locked) {
                            this.ui.floatingText(sx, sy - 20, 'Item is locked!', '#e74c3c');
                            return;
                        }
                        const expGain = this.scene.deleteItem('material', idx);
                        if (expGain > 0) {
                            this.ui.floatingText(sx, sy - 20, '+' + expGain + ' EXP', '#2ecc71');
                        }
                        this.closeInventory();
                        this.openInventory();
                    }
                });
                bg.on('pointerover', () => { bg.setScale(1.1); this.ui._showItemTooltip(sx + 30, sy, item); });
                bg.on('pointerout', () => { bg.setScale(1); this.ui._hideItemTooltip(); });

                const statParts = [];
                if (item.stats) {
                    if (item.stats.hp) statParts.push('+' + item.stats.hp + 'HP');
                    if (item.stats.dmg) statParts.push('+' + item.stats.dmg + 'DMG');
                    if (item.stats.speed) statParts.push('+' + item.stats.speed + 'SPD');
                }
                if (statParts.length > 0) {
                    this.scene.invGroup.push(mkInv(this.scene.add.text(sx, sy + slotSize / 2 + 6, statParts.join(' '), {
                        fontSize: '7px', fill: '#27ae60', fontFamily: 'Arial'
                    }).setOrigin(0.5)));
                }

                if (!item.locked) {
                    this.scene.invGroup.push(mkInv(this.scene.add.text(sx + slotSize / 2 - 2, sy - slotSize / 2 + 2, 'x', {
                        fontSize: '8px', fill: '#c0392b', fontFamily: 'Arial', fontStyle: 'bold'
                    }).setOrigin(1, 0)));
                }
            }
        }
    }

    _drawEquipmentBagPanel() {
        const eqX = 350, eqY = 310;
        const mkInv = (el) => this.ui._mkEl(el);

        this.scene.invGroup.push(mkInv(this.scene.add.text(eqX, eqY, 'EQUIPMENT BAG', {
            fontSize: '12px', fill: '#3498db', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5)));
        this.scene.invGroup.push(mkInv(this.scene.add.text(eqX, eqY + 16,
            this.scene.equipBag.length + '/' + this.scene.maxEquipBag + '  click=equip  shift+click=sell  RMB=lock', {
            fontSize: '9px', fill: '#555', fontFamily: 'Arial'
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

                if (item.locked) {
                    const lockIcon = mkInv(this.scene.add.text(sx - slotSize / 2 + 3, sy - slotSize / 2 + 2, '\u{1F512}', {
                        fontSize: '8px', fill: '#e74c3c', fontFamily: 'Arial'
                    }));
                    this.scene.invGroup.push(lockIcon);
                }

                const idx = i;
                bg.on('pointerdown', (pointer) => {
                    if (pointer.rightButtonDown()) {
                        this.scene.playerSys.toggleLock('equip', idx);
                        this.closeInventory();
                        this.openInventory();
                    } else if (this.scene.input.keyboard.checkDown(this.scene.input.keyboard.addKey('SHIFT'))) {
                        if (item.locked) {
                            this.ui.floatingText(sx, sy - 20, 'Item is locked!', '#e74c3c');
                            return;
                        }
                        const sellResult = this.scene.playerSys.sellItem('equip', idx);
                        if (sellResult > 0) {
                            this.ui.floatingText(sx, sy - 20, '+' + sellResult + ' gold', '#f1c40f');
                            if (this.scene.goldText) this.scene.goldText.setText('Gold: ' + this.scene.gold);
                        }
                        this.closeInventory();
                        this.openInventory();
                    } else {
                        this.scene.equipFromBag(idx);
                        this.closeInventory();
                        this.openInventory();
                    }
                });
                bg.on('pointerover', () => { bg.setScale(1.1); this.ui._showItemTooltip(sx + 30, sy, item); });
                bg.on('pointerout', () => { bg.setScale(1); this.ui._hideItemTooltip(); });

                if (!item.locked) {
                    this.scene.invGroup.push(mkInv(this.scene.add.text(sx + slotSize / 2 - 2, sy - slotSize / 2 + 2, 'x', {
                        fontSize: '8px', fill: '#c0392b', fontFamily: 'Arial', fontStyle: 'bold'
                    }).setOrigin(1, 0)));
                }
            }
        }
    }

    _drawCloseButton() {
        const mkInv = (el) => this.ui._mkEl(el);
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
        this.ui._hideItemTooltip();
        this.scene.menuOpen = false;
        this.scene.physics.resume();
        this.scene.invGroup.forEach(e => e.destroy());
        this.scene.invGroup = [];
    }
}
