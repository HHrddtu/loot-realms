import Phaser from 'phaser';
import { PET_DB, PET_RARITY, PET_TYPES, getPetStats, getPetLevelUpReq, CASE_DB, rollCaseDrop } from '../config/pets.js';
import { lighten } from '../utils.js';
import { loadAccount, saveAccount } from '../save.js';
import { t } from '../i18n.js';

export default class PetScene extends Phaser.Scene {
    constructor() {
        super('Pet');
    }

    init(data) {
        this.returnScene = data.returnScene || 'Menu';
    }

    create() {
        this.cameras.main.setBackgroundColor('#0a0a1a');
        this.elements = [];
        this._panel = null;
        this._panelEls = [];

        const acc = loadAccount() || {};
        this.crystals = acc.crystals || 0;
        this.ownedPets = acc.ownedPets || [];
        this.equippedPet = acc.equippedPet || null;
        this.petLevels = acc.petLevels || {};

        this._drawHeader();
        this._drawPetList();
        this._drawCases();
        this._drawBottomBar();
    }

    _add(el) { this.elements.push(el); return el; }

    _drawHeader() {
        this._add(this.add.text(400, 30, '\u{1F43E} PETS', {
            fontSize: '32px', fill: '#f1c40f', fontFamily: 'Georgia', fontStyle: 'bold'
        }).setOrigin(0.5));

        this.crystalText = this._add(this.add.text(400, 62, '\u{1F48E} ' + this.crystals, {
            fontSize: '16px', fill: '#3498db', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5));

        if (this.equippedPet) {
            const pet = PET_DB.find(p => p.id === this.equippedPet);
            const level = this.petLevels[this.equippedPet] || 1;
            const stats = getPetStats(this.equippedPet, level);
            const statNames = { hpPercent: '+{0}%HP', damagePercent: '+{0}%DMG', spellPercent: '+{0}%Spell', critPercent: '+{0}%Crit', speedPercent: '+{0}%SPD', regenPercent: '+{0}%Regen', lootPercent: '+{0}%Loot', damageReduction: '+{0}%DR' };
            const parts = [];
            Object.entries(stats).forEach(([k, v]) => { if (statNames[k]) parts.push(statNames[k].replace('{0}', v)); });
            const nameStr = pet ? pet.name : this.equippedPet;
            const infoStr = parts.length > 0 ? nameStr + ' Lv.' + level + '  ' + parts.join('  ') : nameStr + ' Lv.' + level;
            this._add(this.add.text(400, 82, 'Equipped: ' + infoStr, {
                fontSize: '10px', fill: '#2ecc71', fontFamily: 'Arial'
            }).setOrigin(0.5));
        } else {
            this._add(this.add.text(400, 82, 'Equipped: None', {
                fontSize: '12px', fill: '#666', fontFamily: 'Arial'
            }).setOrigin(0.5));
        }
    }

    _getPetName(petId) {
        const pet = PET_DB.find(p => p.id === petId);
        return pet ? pet.name : petId;
    }

    _drawPetList() {
        const startY = 105;
        const cols = 4;
        const slotSize = 48;
        const gap = 8;
        const totalW = cols * (slotSize + gap) - gap;
        const startX = 400 - totalW / 2 + slotSize / 2;

        this._add(this.add.text(400, startY, 'YOUR PETS (' + this.ownedPets.length + '/' + PET_DB.length + ')', {
            fontSize: '12px', fill: '#95a5a6', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5));

        const allPets = PET_DB;
        for (let i = 0; i < allPets.length; i++) {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const sx = startX + col * (slotSize + gap);
            const sy = startY + 20 + row * (slotSize + gap);
            const pet = allPets[i];
            const owned = this.ownedPets.includes(pet.id);
            const equipped = this.equippedPet === pet.id;
            const level = this.petLevels[pet.id] || 1;

            const rc = PET_RARITY[pet.rarity]?.color || 0xaaaaaa;
            const bg = this._add(this.add.rectangle(sx, sy, slotSize, slotSize, owned ? 0x1a1a2e : 0x111118)
                .setStrokeStyle(equipped ? 3 : 1, equipped ? 0xf1c40f : (owned ? rc : 0x333)));
            bg.setInteractive({ useHandCursor: true });

            if (owned) {
                const spr = this._add(this.add.sprite(sx, sy - 4, pet.texKey).setScale(2));
                const lvlText = this._add(this.add.text(sx, sy + slotSize / 2 - 6, 'Lv.' + level, {
                    fontSize: '8px', fill: '#f39c12', fontFamily: 'Arial'
                }).setOrigin(0.5));

                bg.on('pointerdown', () => this._showPetDetail(pet, level));
                bg.on('pointerover', () => { bg.setFillStyle(0x2a2a3e); });
                bg.on('pointerout', () => { bg.setFillStyle(equipped ? 0x2a2a1e : 0x1a1a2e); });
            } else {
                const qm = this._add(this.add.text(sx, sy, '?', {
                    fontSize: '20px', fill: '#333', fontFamily: 'Arial', fontStyle: 'bold'
                }).setOrigin(0.5));

                bg.on('pointerover', () => { bg.setFillStyle(0x1a1a25); });
                bg.on('pointerout', () => { bg.setFillStyle(0x111118); });
            }
        }
    }

    _showPetDetail(pet, level) {
        this._clearPanel();
        const py = 280;
        const backdrop = this._add(this.add.rectangle(400, 300, 800, 600, 0x000000, 0.85)
            .setInteractive());
        this._panelEls.push(backdrop);

        const bg = this._add(this.add.rectangle(400, py, 380, 200, 0x0a0a1a, 0.98)
            .setStrokeStyle(2, PET_RARITY[pet.rarity]?.color || 0xaaaaaa));
        this._panelEls.push(bg);

        const rc = '#' + (PET_RARITY[pet.rarity]?.color || 0xaaaaaa).toString(16).padStart(6, '0');
        const typeName = PET_TYPES[pet.type]?.name || pet.type;

        const nameText = this._add(this.add.text(100, py - 80, pet.name, {
            fontSize: '16px', fill: rc, fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5));
        this._panelEls.push(nameText);

        const infoText = this._add(this.add.text(100, py - 62, typeName + ' | ' + PET_RARITY[pet.rarity]?.name + ' | Lv.' + level, {
            fontSize: '10px', fill: '#888', fontFamily: 'Arial'
        }).setOrigin(0.5));
        this._panelEls.push(infoText);

        const stats = getPetStats(pet.id, level);
        const statLines = [];
        const statNames = {
            hpPercent: '+{0}% HP', damagePercent: '+{0}% DMG', spellPercent: '+{0}% Spell',
            critPercent: '+{0}% Crit', speedPercent: '+{0}% SPD', regenPercent: '+{0}% Regen',
            lootPercent: '+{0}% Loot', damageReduction: '+{0}% DR'
        };
        Object.entries(stats).forEach(([k, v]) => {
            if (statNames[k]) statLines.push(statNames[k].replace('{0}', v));
        });

        const descText = this._add(this.add.text(100, py - 45, pet.desc, {
            fontSize: '9px', fill: '#777', fontFamily: 'Arial', wordWrap: { width: 160 }
        }).setOrigin(0.5, 0));
        this._panelEls.push(descText);

        const statsText = this._add(this.add.text(220, py - 80, statLines.join('\n'), {
            fontSize: '10px', fill: '#2ecc71', fontFamily: 'Arial', lineSpacing: 2
        }));
        this._panelEls.push(statsText);

        if (level < 5) {
            const expText = this._add(this.add.text(220, py - 5, 'Level up: feed duplicates', {
                fontSize: '9px', fill: '#f39c12', fontFamily: 'Arial'
            }));
            this._panelEls.push(expText);
        }

        const isEquipped = this.equippedPet === pet.id;
        const btnColor = isEquipped ? 0xc0392b : 0x27ae60;
        const btnLabel = isEquipped ? 'UNEQUIP' : 'EQUIP';

        const btn = this._add(this.add.rectangle(340, py + 60, 90, 28, btnColor)
            .setStrokeStyle(1, lighten(btnColor, 0.3)).setInteractive({ useHandCursor: true }));
        const btnTxt = this._add(this.add.text(340, py + 60, btnLabel, {
            fontSize: '11px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5));
        this._panelEls.push(btn, btnTxt);

        btn.on('pointerdown', () => {
            if (isEquipped) {
                this.equippedPet = null;
            } else {
                this.equippedPet = pet.id;
            }
            this._savePetData();
            this._clearPanel();
            this.scene.restart({ returnScene: this.returnScene });
        });
        btn.on('pointerover', () => btn.setFillStyle(lighten(btnColor, 0.2)));
        btn.on('pointerout', () => btn.setFillStyle(btnColor));

        const closeBtn = this._add(this.add.rectangle(370, py - 80, 20, 20, 0x34495e)
            .setStrokeStyle(1, 0x555).setInteractive({ useHandCursor: true }));
        const closeTxt = this._add(this.add.text(370, py - 80, 'X', {
            fontSize: '11px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5));
        this._panelEls.push(closeBtn, closeTxt);
        closeBtn.on('pointerdown', () => this._clearPanel());
    }

    _clearPanel() {
        this._panelEls.forEach(e => e.destroy());
        this._panelEls = [];
    }

    _drawCases() {
        const caseY = 350;
        this._add(this.add.text(400, caseY, 'CASE SHOP', {
            fontSize: '14px', fill: '#f39c12', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5));

        const startX = 180;
        const gap = 120;
        CASE_DB.forEach((c, i) => {
            const cx = startX + i * gap;
            const cy = caseY + 55;

            const bg = this._add(this.add.rectangle(cx, cy, 90, 80, 0x12121f)
                .setStrokeStyle(1, 0x3a3a5c));
            bg.setInteractive({ useHandCursor: true });

            const spr = this._add(this.add.sprite(cx, cy - 12, c.texKey).setScale(2));
            const nameText = this._add(this.add.text(cx, cy + 22, c.name, {
                fontSize: '9px', fill: '#ddd', fontFamily: 'Arial', fontStyle: 'bold'
            }).setOrigin(0.5));
            const priceText = this._add(this.add.text(cx, cy + 34, '\u{1F48E} ' + c.price, {
                fontSize: '11px', fill: '#3498db', fontFamily: 'Arial', fontStyle: 'bold'
            }).setOrigin(0.5));

            bg.on('pointerdown', () => this._showCasePreview(c));
            bg.on('pointerover', () => bg.setFillStyle(0x1a1a2e));
            bg.on('pointerout', () => bg.setFillStyle(0x12121f));
        });
    }

    _showCasePreview(caseData) {
        this._clearPanel();
        const backdrop = this._add(this.add.rectangle(400, 300, 800, 600, 0x000000, 0.92)
            .setDepth(200).setInteractive());
        this._panelEls.push(backdrop);

        const bg = this._add(this.add.rectangle(400, 305, 500, 550, 0x0a0a1a, 0.98)
            .setDepth(201).setStrokeStyle(2, 0xf39c12));
        this._panelEls.push(bg);

        const spr = this._add(this.add.sprite(400, 105, caseData.texKey).setScale(3).setDepth(202));
        this._panelEls.push(spr);

        const title = this._add(this.add.text(400, 135, caseData.name, {
            fontSize: '16px', fill: '#f39c12', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(202));
        this._panelEls.push(title);

        const price = this._add(this.add.text(400, 155, 'Price: \u{1F48E} ' + caseData.price + '  |  You: \u{1F48E} ' + this.crystals, {
            fontSize: '11px', fill: '#3498db', fontFamily: 'Arial'
        }).setOrigin(0.5).setDepth(202));
        this._panelEls.push(price);

        let yOff = 178;
        const rarityOrder = ['legendary', 'rare', 'uncommon', 'common'];
        const rarityColors = { common: '#aaaaaa', uncommon: '#2ecc71', rare: '#3498db', legendary: '#f39c12' };

        rarityOrder.forEach(rarity => {
            const drop = caseData.drops.find(d => d.rarity === rarity);
            if (!drop) return;
            const pets = PET_DB.filter(p => p.rarity === rarity && caseData.petPool.includes(p.id));
            if (pets.length === 0) return;

            const pct = Math.round(drop.chance * 100);
            const header = this._add(this.add.text(175, yOff, rarity.toUpperCase() + ' (' + pct + '%)', {
                fontSize: '10px', fill: rarityColors[rarity], fontFamily: 'Arial', fontStyle: 'bold'
            }).setDepth(202));
            this._panelEls.push(header);
            yOff += 16;

            pets.forEach(pet => {
                const stats = getPetStats(pet.id, 1);
                const statParts = [];
                const statNames = { hpPercent: '+{0}%HP', damagePercent: '+{0}%DMG', spellPercent: '+{0}%Spell', critPercent: '+{0}%Crit', speedPercent: '+{0}%SPD', regenPercent: '+{0}%Regen', lootPercent: '+{0}%Loot', damageReduction: '+{0}%DR' };
                Object.entries(stats).forEach(([k, v]) => { if (statNames[k]) statParts.push(statNames[k].replace('{0}', v)); });

                const petSpr = this._add(this.add.sprite(190, yOff + 6, pet.texKey).setScale(1.5).setDepth(202));
                this._panelEls.push(petSpr);
                const petName = this._add(this.add.text(210, yOff, pet.name, {
                    fontSize: '10px', fill: rarityColors[rarity], fontFamily: 'Arial', fontStyle: 'bold'
                }).setDepth(202));
                this._panelEls.push(petName);
                const petStats = this._add(this.add.text(210, yOff + 12, statParts.join('  '), {
                    fontSize: '8px', fill: '#888', fontFamily: 'Arial'
                }).setDepth(202));
                this._panelEls.push(petStats);
                yOff += 24;
            });
            yOff += 4;
        });

        const canBuy = this.crystals >= caseData.price;
        const buyBtn = this._add(this.add.rectangle(340, 565, 90, 28, canBuy ? 0x27ae60 : 0x555555)
            .setDepth(202).setStrokeStyle(1, canBuy ? lighten(0x27ae60, 0.3) : 0x444));
        if (canBuy) buyBtn.setInteractive({ useHandCursor: true });
        const buyTxt = this._add(this.add.text(340, 565, 'BUY', {
            fontSize: '12px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(202));
        this._panelEls.push(buyBtn, buyTxt);

        if (canBuy) {
            buyBtn.on('pointerdown', () => { this._clearPanel(); this._buyCase(caseData); });
            buyBtn.on('pointerover', () => buyBtn.setFillStyle(lighten(0x27ae60, 0.2)));
            buyBtn.on('pointerout', () => buyBtn.setFillStyle(0x27ae60));
        }

        const closeBtn = this._add(this.add.rectangle(430, 565, 90, 28, 0x34495e)
            .setDepth(202).setStrokeStyle(1, 0x5a6c7d).setInteractive({ useHandCursor: true }));
        const closeTxt = this._add(this.add.text(430, 565, 'CLOSE', {
            fontSize: '12px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(202));
        this._panelEls.push(closeBtn, closeTxt);
        closeBtn.on('pointerdown', () => this._clearPanel());
        closeBtn.on('pointerover', () => closeBtn.setFillStyle(0x4a6a8e));
        closeBtn.on('pointerout', () => closeBtn.setFillStyle(0x34495e));
    }

    _buyCase(caseData) {
        if (this.crystals < caseData.price) {
            this._showMessage('Not enough crystals!', '#e74c3c');
            return;
        }

        const allMaxed = this.ownedPets.length >= PET_DB.length && this.ownedPets.every(id => (this.petLevels[id] || 1) >= 5);
        if (allMaxed) {
            this._showMessage('All pets maxed! Nothing new to gain.', '#f39c12');
            return;
        }

        this.crystals -= caseData.price;
        const dropped = rollCaseDrop(caseData.id);
        if (!dropped) return;

        const isNew = !this.ownedPets.includes(dropped.id);
        if (isNew) {
            this.ownedPets.push(dropped.id);
            this.petLevels[dropped.id] = 1;
        } else {
            const curLvl = this.petLevels[dropped.id] || 1;
            if (curLvl < 5) {
                this.petLevels[dropped.id] = curLvl + 1;
            }
        }

        this._savePetData();
        this._showCaseResult(caseData, dropped, isNew);
    }

    _showCaseResult(caseData, pet, isNew) {
        this._clearPanel();
        const py = 300;
        const rc = PET_RARITY[pet.rarity]?.color || 0xaaaaaa;

        const backdrop = this._add(this.add.rectangle(400, 300, 800, 600, 0x000000, 0.85)
            .setInteractive());
        this._panelEls.push(backdrop);

        const bg = this._add(this.add.rectangle(400, py, 300, 160, 0x0a0a1a, 0.98)
            .setStrokeStyle(2, rc));
        this._panelEls.push(bg);

        const title = this._add(this.add.text(400, py - 60, caseData.name + ' OPENED!', {
            fontSize: '14px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5));
        this._panelEls.push(title);

        const spr = this._add(this.add.sprite(400, py - 15, pet.texKey).setScale(3));
        this._panelEls.push(spr);

        const hex = '#' + rc.toString(16).padStart(6, '0');
        const nameText = this._add(this.add.text(400, py + 20, pet.name, {
            fontSize: '14px', fill: hex, fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5));
        this._panelEls.push(nameText);

        const infoText = this._add(this.add.text(400, py + 37, PET_RARITY[pet.rarity]?.name + ' ' + PET_TYPES[pet.type]?.name, {
            fontSize: '10px', fill: '#888', fontFamily: 'Arial'
        }).setOrigin(0.5));
        this._panelEls.push(infoText);

        const statusText = this._add(this.add.text(400, py + 50, isNew ? 'NEW PET!' : 'Level Up!', {
            fontSize: '11px', fill: isNew ? '#2ecc71' : '#f39c12', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5));
        this._panelEls.push(statusText);

        const okBtn = this._add(this.add.rectangle(400, py + 70, 80, 24, 0x27ae60)
            .setStrokeStyle(1, lighten(0x27ae60, 0.3)).setInteractive({ useHandCursor: true }));
        const okTxt = this._add(this.add.text(400, py + 70, 'OK', {
            fontSize: '11px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5));
        this._panelEls.push(okBtn, okTxt);

        okBtn.on('pointerdown', () => {
            this._clearPanel();
            this.scene.restart({ returnScene: this.returnScene });
        });
    }

    _showMessage(msg, color) {
        const m = this._add(this.add.text(400, 555, msg, {
            fontSize: '13px', fill: color, fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5));
        this.tweens.add({
            targets: m, y: m.y - 30, alpha: 0, duration: 1500,
            onComplete: () => m.destroy()
        });
    }

    _drawBottomBar() {
        const backBtn = this._add(this.add.rectangle(100, 570, 120, 32, 0x34495e)
            .setStrokeStyle(1, 0x5a6c7d).setInteractive({ useHandCursor: true }));
        const backTxt = this._add(this.add.text(100, 570, '\u2190 BACK', {
            fontSize: '12px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5));
        backBtn.on('pointerdown', () => {
            this.scene.stop();
            if (this.scene.isActive(this.returnScene) || this.scene.isPaused(this.returnScene)) {
                this.scene.resume(this.returnScene);
            } else {
                this.scene.start(this.returnScene);
            }
        });
        backBtn.on('pointerover', () => backBtn.setFillStyle(0x4a6a8e));
        backBtn.on('pointerout', () => backBtn.setFillStyle(0x34495e));
    }

    _savePetData() {
        const acc = loadAccount() || {};
        acc.crystals = this.crystals;
        acc.ownedPets = this.ownedPets;
        acc.equippedPet = this.equippedPet;
        acc.petLevels = this.petLevels;
        saveAccount(acc);
        if (this.crystalText) this.crystalText.setText('\u{1F48E} ' + this.crystals);
    }
}
