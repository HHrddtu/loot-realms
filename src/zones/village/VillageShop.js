import { RARITY_COLORS, VILLAGE_HOUSE_POSITIONS } from '../../config/index.js';
import { CONSUMABLES, SHOP_BOOSTS, SHOP_UPGRADES, SHOP_GOLD_CASES } from '../../config/gold.js';
import { rollCaseDrop, CASE_DB } from '../../config/pets.js';
import { loadAccount, saveAccount } from '../../save.js';
import { playLoot } from '../../sound.js';

export class VillageShop {
    constructor(scene) {
        this.scene = scene;
    }

    spawnShop() {
        const s = this.scene;
        if (s.villageMerchantNPC) return;
        const ox = s.villageOffsetX;
        const house = VILLAGE_HOUSE_POSITIONS[2] || VILLAGE_HOUSE_POSITIONS[0];
        const x = ox + house.x + 40;
        const y = house.y + 30;

        s.villageMerchantNPC = s.add.sprite(x, y, 'villager_merchant').setDepth(6);
        s.villageMerchantHint = s.add.text(x, y - 20, '', {
            fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);

        s.tweens.add({
            targets: s.villageMerchantNPC,
            y: y - 3, duration: 1500, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
        });

        s.time.delayedCall(1000, () => {
            if (s.zone !== 'village') return;
            if (s.villageMerchantHint && s.villageMerchantHint.active) {
                s.villageMerchantHint.setText('SPACE = shop');
            }
        });
    }

    spawnInn() {
        const s = this.scene;
        if (s.villageInn) return;
        const ox = s.villageOffsetX;
        const house = VILLAGE_HOUSE_POSITIONS[3] || VILLAGE_HOUSE_POSITIONS[1];
        const x = ox + house.x;
        const y = house.y + 25;

        s.villageInn = s.add.image(x, y, 'village_bed').setDepth(4);
        s.physics.add.existing(s.villageInn, true);
        s.villageInn.body.setSize(32, 20);

        s.villageInnHint = s.add.text(x, y - 18, '', {
            fontSize: '10px', fill: '#2ecc71', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);
    }

    useInn() {
        const s = this.scene;
        if (s.innUsed) {
            if (s.villageInnHint) s.villageInnHint.setText('Already rested!');
            return;
        }
        s.innUsed = true;
        s.playerHP = s.playerMaxHP;
        s.floatingText(s.player.x, s.player.y - 30, 'Fully healed!', '#2ecc71');
        if (s.villageInnHint) s.villageInnHint.setText('Rest (+50 EXP)');
        s.playerExp += 50;
        s.checkLevelUp();
    }

    openShop() {
        const s = this.scene;
        if (s.menuOpen) return;
        s.menuOpen = true;
        s.physics.pause();
        if (s.enemies) s.enemies.getChildren().forEach(e => { if (e.body) e.body.setVelocity(0); });
        s.shopGroup = [];
        const mk = (el) => { el.setScrollFactor(0).setDepth(200); return el; };

        const W = 520, H = 500;
        s.shopGroup.push(mk(s.add.rectangle(400, 300, W, H, 0x0a0a1a, 0.95).setStrokeStyle(2, 0xf1c40f)));

        s.shopGroup.push(mk(s.add.text(400, 65, 'VILLAGE MERCHANT', {
            fontSize: '18px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5)));

        const goldText = mk(s.add.text(260, 87, '\u{1F4B0} ' + (s.gold || 0), {
            fontSize: '12px', fill: '#f1c40f', fontFamily: 'Arial'
        }).setOrigin(0.5));
        s.shopGroup.push(goldText);

        const crystalText = mk(s.add.text(400, 87, '\u{1F48E} ' + (s.crystals || 0), {
            fontSize: '12px', fill: '#3498db', fontFamily: 'Arial'
        }).setOrigin(0.5));
        s.shopGroup.push(crystalText);

        const cap = { Normal: 200, Hard: 50, Expert: 75, Nightmare: 100, Hell: 150, Abyss: 200 }[s.difficulty] || 200;
        const capText = mk(s.add.text(540, 87, 'Cap: ' + (s.crystalsThisRun || 0) + '/' + cap, {
            fontSize: '9px', fill: '#888', fontFamily: 'Arial'
        }).setOrigin(0.5));
        s.shopGroup.push(capText);

        const tabs = ['Potions', 'Boosts', 'Upgrades', 'Cases'];
        const tabColors = ['#27ae60', '#3498db', '#e74c3c', '#f1c40f'];
        let currentTab = 0;

        const tabBtns = [];
        tabs.forEach((tab, i) => {
            const tx = 175 + i * 95;
            const tbg = mk(s.add.rectangle(tx, 108, 85, 20, i === 0 ? 0x2c3e50 : 0x1a1a2e)
                .setStrokeStyle(1, i === 0 ? parseInt(tabColors[i].slice(1), 16) : 0x555));
            const ttl = mk(s.add.text(tx, 108, tab, {
                fontSize: '10px', fill: i === 0 ? tabColors[i] : '#888', fontFamily: 'Arial', fontStyle: 'bold'
            }).setOrigin(0.5));
            tbg.setInteractive({ useHandCursor: true });
            tbg.on('pointerdown', () => {
                currentTab = i;
                this.closeShop();
                s.menuOpen = false;
                s.physics.resume();
                this.openShopTab(i);
            });
            tabBtns.push(tbg, ttl);
        });
        s.shopGroup.push(...tabBtns);

        this._renderShopTab(0, mk, goldText, crystalText, capText);

        const closeBg = mk(s.add.rectangle(400, 535, 100, 24, 0x34495e)
            .setStrokeStyle(1, 0x5a6c7d).setInteractive({ useHandCursor: true }));
        const closeTxt = mk(s.add.text(400, 535, 'CLOSE', {
            fontSize: '12px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5));
        closeBg.on('pointerdown', () => this.closeShop());
        s.shopGroup.push(closeBg, closeTxt);
    }

    openShopTab(tabIndex) {
        const s = this.scene;
        if (s.menuOpen) return;
        s.menuOpen = true;
        s.physics.pause();
        if (s.enemies) s.enemies.getChildren().forEach(e => { if (e.body) e.body.setVelocity(0); });
        s.shopGroup = [];
        const mk = (el) => { el.setScrollFactor(0).setDepth(200); return el; };

        const W = 520, H = 500;
        s.shopGroup.push(mk(s.add.rectangle(400, 300, W, H, 0x0a0a1a, 0.95).setStrokeStyle(2, 0xf1c40f)));

        s.shopGroup.push(mk(s.add.text(400, 65, 'VILLAGE MERCHANT', {
            fontSize: '18px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5)));

        const goldText = mk(s.add.text(260, 87, '\u{1F4B0} ' + (s.gold || 0), {
            fontSize: '12px', fill: '#f1c40f', fontFamily: 'Arial'
        }).setOrigin(0.5));
        s.shopGroup.push(goldText);

        const crystalText = mk(s.add.text(400, 87, '\u{1F48E} ' + (s.crystals || 0), {
            fontSize: '12px', fill: '#3498db', fontFamily: 'Arial'
        }).setOrigin(0.5));
        s.shopGroup.push(crystalText);

        const cap = { Normal: 200, Hard: 50, Expert: 75, Nightmare: 100, Hell: 150, Abyss: 200 }[s.difficulty] || 200;
        const capText = mk(s.add.text(540, 87, 'Cap: ' + (s.crystalsThisRun || 0) + '/' + cap, {
            fontSize: '9px', fill: '#888', fontFamily: 'Arial'
        }).setOrigin(0.5));
        s.shopGroup.push(capText);

        const tabs = ['Potions', 'Boosts', 'Upgrades', 'Cases'];
        const tabColors = ['#27ae60', '#3498db', '#e74c3c', '#f1c40f'];
        tabs.forEach((tab, i) => {
            const tx = 175 + i * 95;
            const tbg = mk(s.add.rectangle(tx, 108, 85, 20, i === tabIndex ? 0x2c3e50 : 0x1a1a2e)
                .setStrokeStyle(1, i === tabIndex ? parseInt(tabColors[i].slice(1), 16) : 0x555));
            const ttl = mk(s.add.text(tx, 108, tab, {
                fontSize: '10px', fill: i === tabIndex ? tabColors[i] : '#888', fontFamily: 'Arial', fontStyle: 'bold'
            }).setOrigin(0.5));
            tbg.setInteractive({ useHandCursor: true });
            tbg.on('pointerdown', () => {
                this.closeShop();
                s.menuOpen = false;
                s.physics.resume();
                this.openShopTab(i);
            });
            s.shopGroup.push(tbg, ttl);
        });

        this._renderShopTab(tabIndex, mk, goldText, crystalText, capText);

        const closeBg = mk(s.add.rectangle(400, 535, 100, 24, 0x34495e)
            .setStrokeStyle(1, 0x5a6c7d).setInteractive({ useHandCursor: true }));
        const closeTxt = mk(s.add.text(400, 535, 'CLOSE', {
            fontSize: '12px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5));
        closeBg.on('pointerdown', () => this.closeShop());
        s.shopGroup.push(closeBg, closeTxt);
    }

    _renderShopTab(tabIndex, mk, goldText, crystalText, capText) {
        const updateCurrency = () => {
            const s = this.scene;
            if (goldText) goldText.setText('\u{1F4B0} ' + (s.gold || 0));
            if (crystalText) crystalText.setText('\u{1F48E} ' + (s.crystals || 0));
            const cap = { Normal: 200, Hard: 50, Expert: 75, Nightmare: 100, Hell: 150, Abyss: 200 }[s.difficulty] || 200;
            if (capText) capText.setText('Cap: ' + (s.crystalsThisRun || 0) + '/' + cap);
        };

        if (tabIndex === 0) this._renderPotionsTab(mk, updateCurrency);
        else if (tabIndex === 1) this._renderBoostsTab(mk, updateCurrency);
        else if (tabIndex === 2) this._renderUpgradesTab(mk, updateCurrency);
        else if (tabIndex === 3) this._renderCasesTab(mk, updateCurrency);
    }

    _renderPotionsTab(mk, updateCurrency) {
        const s = this.scene;
        const equippedId = s.consumable ? s.consumable.id : null;
        const items = CONSUMABLES.slice();
        const cols = 3, slotW = 140, slotH = 60, gapX = 12, gapY = 6;
        const totalW = cols * slotW + (cols - 1) * gapX;
        const startX = 400 - totalW / 2 + slotW / 2;
        const startY = 160;

        const healing = items.filter(i => i.category === 'healing');
        const combat = items.filter(i => i.category === 'combat');

        s.shopGroup.push(mk(s.add.text(400, startY - 8, '\u2764 Healing', {
            fontSize: '10px', fill: '#e74c3c', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5)));

        let allItems = [];
        healing.forEach((item, i) => { allItems.push({ item, row: Math.floor(i / cols), col: i % cols }); });
        let combatStart = Math.ceil(healing.length / cols);
        s.shopGroup.push(mk(s.add.text(400, startY + combatStart * (slotH + gapY) + 16, '\u2694 Combat', {
            fontSize: '10px', fill: '#e67e22', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5)));
        combat.forEach((item, i) => { allItems.push({ item, row: combatStart + Math.floor(i / cols), col: i % cols }); });

        allItems.forEach(({ item, row, col }) => {
            const sx = startX + col * (slotW + gapX);
            const sy = startY + row * (slotH + gapY) + (row > 0 ? 16 : 0);

            const rc = RARITY_COLORS[item.rarity] || 0xaaaaaa;
            const rcHex = '#' + rc.toString(16).padStart(6, '0');
            const isEquipped = equippedId === item.id;

            const bgColor = isEquipped ? 0x1a3a1a : 0x1a1a2e;
            const borderColor = isEquipped ? 0x2ecc71 : rc;
            const bg = mk(s.add.rectangle(sx, sy, slotW, slotH, bgColor).setStrokeStyle(isEquipped ? 2 : 1, borderColor));
            s.shopGroup.push(bg);

            s.shopGroup.push(mk(s.add.sprite(sx - 40, sy, item.texKey).setScale(2.0)));

            s.shopGroup.push(mk(s.add.text(sx + 5, sy - 18, item.name.split(' ').slice(0, 2).join(' '), {
                fontSize: '8px', fill: rcHex, fontFamily: 'Arial', fontStyle: 'bold'
            }).setOrigin(0, 0.5)));

            s.shopGroup.push(mk(s.add.text(sx + 5, sy - 4, item.description, {
                fontSize: '7px', fill: '#aaa', fontFamily: 'Arial'
            }).setOrigin(0, 0.5)));

            s.shopGroup.push(mk(s.add.text(sx + 5, sy + 10, item.effectDesc || '', {
                fontSize: '6px', fill: '#888', fontFamily: 'Arial', wordWrap: { width: slotW - 55 }
            }).setOrigin(0, 0.5)));

            s.shopGroup.push(mk(s.add.text(sx, sy + slotH / 2 - 8, item.price + 'g', {
                fontSize: '10px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold'
            }).setOrigin(0.5)));

            if (isEquipped) {
                s.shopGroup.push(mk(s.add.text(sx, sy - slotH / 2 + 8, 'EQUIPPED', {
                    fontSize: '7px', fill: '#2ecc71', fontFamily: 'Arial', fontStyle: 'bold',
                    stroke: '#000', strokeThickness: 1
                }).setOrigin(0.5)));
            }

            bg.setInteractive({ useHandCursor: true });
            bg.on('pointerover', () => bg.setScale(1.03));
            bg.on('pointerout', () => bg.setScale(1));
            bg.on('pointerdown', () => {
                if ((s.gold || 0) >= item.price) {
                    s.gold -= item.price;
                    s.consumable = { ...item, type: 'consumable' };
                    s.floatingText(s.player.x, s.player.y - 30, '+' + item.name, '#2ecc71');
                    this.closeShop();
                    s.menuOpen = false;
                    s.physics.resume();
                    this.openShopTab(0);
                } else {
                    s.floatingText(s.player.x, s.player.y - 30, 'Not enough gold!', '#e74c3c');
                }
            });
        });
    }

    _renderBoostsTab(mk, updateCurrency) {
        const s = this.scene;
        const cols = 2, slotW = 220, slotH = 60, gapX = 14, gapY = 8;
        const totalW = cols * slotW + (cols - 1) * gapX;
        const startX = 400 - totalW / 2 + slotW / 2;
        const startY = 160;

        s.shopGroup.push(mk(s.add.text(400, startY - 8, 'Run Boosts (active until run ends)', {
            fontSize: '10px', fill: '#3498db', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5)));

        const activeBoosts = s.activeBoosts || {};

        SHOP_BOOSTS.forEach((item, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const sx = startX + col * (slotW + gapX);
            const sy = startY + 14 + row * (slotH + gapY);

            const rc = RARITY_COLORS[item.rarity] || 0xaaaaaa;
            const rcHex = '#' + rc.toString(16).padStart(6, '0');
            const isActive = activeBoosts[item.boostType] > 0;

            const bgColor = isActive ? 0x1a3a2a : 0x1a1a2e;
            const borderColor = isActive ? 0x2ecc71 : rc;
            const bg = mk(s.add.rectangle(sx, sy, slotW, slotH, bgColor).setStrokeStyle(isActive ? 2 : 1, borderColor));
            s.shopGroup.push(bg);

            s.shopGroup.push(mk(s.add.sprite(sx - 85, sy, item.texKey).setScale(1.8)));

            s.shopGroup.push(mk(s.add.text(sx - 55, sy - 16, item.name, {
                fontSize: '10px', fill: rcHex, fontFamily: 'Arial', fontStyle: 'bold'
            }).setOrigin(0, 0.5)));

            s.shopGroup.push(mk(s.add.text(sx - 55, sy - 3, item.effectDesc || item.description, {
                fontSize: '7px', fill: '#aaa', fontFamily: 'Arial', wordWrap: { width: slotW - 50 }
            }).setOrigin(0, 0.5)));

            s.shopGroup.push(mk(s.add.text(sx, sy + slotH / 2 - 8, item.price + 'g', {
                fontSize: '10px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold'
            }).setOrigin(0.5)));

            if (isActive) {
                s.shopGroup.push(mk(s.add.text(sx, sy - slotH / 2 + 8, 'ACTIVE', {
                    fontSize: '7px', fill: '#2ecc71', fontFamily: 'Arial', fontStyle: 'bold',
                    stroke: '#000', strokeThickness: 1
                }).setOrigin(0.5)));
            }

            bg.setInteractive({ useHandCursor: true });
            bg.on('pointerover', () => bg.setScale(1.03));
            bg.on('pointerout', () => bg.setScale(1));
            bg.on('pointerdown', () => {
                if ((s.gold || 0) >= item.price) {
                    s.gold -= item.price;
                    if (!s.activeBoosts) s.activeBoosts = {};
                    s.activeBoosts[item.boostType] = (s.activeBoosts[item.boostType] || 0) + item.value;
                    s.recalcStats();
                    s.floatingText(s.player.x, s.player.y - 30, '+' + item.name + ' activated!', '#2ecc71');
                    this.closeShop();
                    s.menuOpen = false;
                    s.physics.resume();
                    this.openShopTab(1);
                } else {
                    s.floatingText(s.player.x, s.player.y - 30, 'Not enough gold!', '#e74c3c');
                }
            });
        });
    }

    _renderUpgradesTab(mk, updateCurrency) {
        const s = this.scene;
        const cols = 1, slotW = 440, slotH = 55, gapX = 0, gapY = 7;
        const startX = 400;
        const startY = 160;

        s.shopGroup.push(mk(s.add.text(400, startY - 8, 'Permanent Upgrades (survive death)', {
            fontSize: '10px', fill: '#e74c3c', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5)));

        const upgradeLevels = s.upgradeLevels || {};

        SHOP_UPGRADES.forEach((item, i) => {
            const sy = startY + 14 + i * (slotH + gapY);
            const level = upgradeLevels[item.id] || 0;
            const maxed = level >= item.maxLevel;
            const price = maxed ? 0 : Math.floor(item.basePrice * Math.pow(item.priceScale, level));

            const rc = maxed ? 0x2ecc71 : 0xaaaaaa;
            const rcHex = '#' + rc.toString(16).padStart(6, '0');

            const bg = mk(s.add.rectangle(startX, sy, slotW, slotH, 0x1a1a2e)
                .setStrokeStyle(1, maxed ? 0x2ecc71 : 0x555));
            s.shopGroup.push(bg);

            s.shopGroup.push(mk(s.add.sprite(startX - 190, sy, item.texKey).setScale(1.8)));

            s.shopGroup.push(mk(s.add.text(startX - 165, sy - 14, item.name, {
                fontSize: '11px', fill: rcHex, fontFamily: 'Arial', fontStyle: 'bold'
            }).setOrigin(0, 0.5)));

            s.shopGroup.push(mk(s.add.text(startX - 165, sy + 2, item.effectDesc || item.description, {
                fontSize: '8px', fill: '#aaa', fontFamily: 'Arial'
            }).setOrigin(0, 0.5)));

            const lvlText = maxed ? 'MAX' : 'Lv ' + level + '/' + item.maxLevel;
            s.shopGroup.push(mk(s.add.text(startX + 120, sy - 5, lvlText, {
                fontSize: '10px', fill: maxed ? '#2ecc71' : '#888', fontFamily: 'Arial', fontStyle: 'bold'
            }).setOrigin(0.5)));

            if (!maxed) {
                const buyBg = mk(s.add.rectangle(startX + 180, sy, 80, 22, 0x2c3e50)
                    .setStrokeStyle(1, 0xf1c40f).setInteractive({ useHandCursor: true }));
                const buyTxt = mk(s.add.text(startX + 180, sy, price + 'g', {
                    fontSize: '10px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold'
                }).setOrigin(0.5));
                s.shopGroup.push(buyBg, buyTxt);

                buyBg.on('pointerdown', () => {
                    if ((s.gold || 0) >= price) {
                        s.gold -= price;
                        if (!s.upgradeLevels) s.upgradeLevels = {};
                        s.upgradeLevels[item.id] = level + 1;
                        s.recalcStats();
                        s.floatingText(s.player.x, s.player.y - 30, item.name + ' upgraded!', '#2ecc71');
                        this.closeShop();
                        s.menuOpen = false;
                        s.physics.resume();
                        this.openShopTab(2);
                    } else {
                        s.floatingText(s.player.x, s.player.y - 30, 'Not enough gold!', '#e74c3c');
                    }
                });
            } else {
                s.shopGroup.push(mk(s.add.text(startX + 180, sy, 'DONE', {
                    fontSize: '10px', fill: '#2ecc71', fontFamily: 'Arial', fontStyle: 'bold'
                }).setOrigin(0.5)));
            }
        });
    }

    _renderCasesTab(mk, updateCurrency) {
        const s = this.scene;
        const startY = 160;

        s.shopGroup.push(mk(s.add.text(400, startY - 8, 'Pet Cases (Gold)', {
            fontSize: '10px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5)));

        SHOP_GOLD_CASES.forEach((item, i) => {
            const sx = 200 + i * 170;
            const sy = startY + 70;

            const caseInfo = CASE_DB.find(c => c.id === item.caseId);
            const rc = RARITY_COLORS[caseInfo ? caseInfo.rarity : 'common'] || 0xaaaaaa;
            const rcHex = '#' + rc.toString(16).padStart(6, '0');

            const bg = mk(s.add.rectangle(sx, sy, 150, 140, 0x1a1a2e)
                .setStrokeStyle(1, rc));
            s.shopGroup.push(bg);

            s.shopGroup.push(mk(s.add.sprite(sx, sy - 30, item.texKey).setScale(2.5)));

            s.shopGroup.push(mk(s.add.text(sx, sy + 25, item.name, {
                fontSize: '10px', fill: rcHex, fontFamily: 'Arial', fontStyle: 'bold'
            }).setOrigin(0.5)));

            s.shopGroup.push(mk(s.add.text(sx, sy + 40, item.description, {
                fontSize: '8px', fill: '#aaa', fontFamily: 'Arial'
            }).setOrigin(0.5)));

            s.shopGroup.push(mk(s.add.text(sx, sy + 55, item.goldPrice + 'g', {
                fontSize: '12px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold'
            }).setOrigin(0.5)));

            bg.setInteractive({ useHandCursor: true });
            bg.on('pointerover', () => bg.setScale(1.05));
            bg.on('pointerout', () => bg.setScale(1));
            bg.on('pointerdown', () => {
                if ((s.gold || 0) >= item.goldPrice) {
                    s.gold -= item.goldPrice;
                    this._openCase(item.caseId);
                } else {
                    s.floatingText(s.player.x, s.player.y - 30, 'Not enough gold!', '#e74c3c');
                }
            });
        });

        s.shopGroup.push(mk(s.add.text(400, startY + 170, 'Crystal Cases (Pet Scene)', {
            fontSize: '10px', fill: '#3498db', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5)));

        CASE_DB.forEach((c, i) => {
            const sx = 200 + i * 170;
            const sy = startY + 240;

            const rc = RARITY_COLORS[c.rarity] || 0xaaaaaa;
            const rcHex = '#' + rc.toString(16).padStart(6, '0');

            const bg = mk(s.add.rectangle(sx, sy, 150, 120, 0x1a1a2e)
                .setStrokeStyle(1, rc));
            s.shopGroup.push(bg);

            s.shopGroup.push(mk(s.add.sprite(sx, sy - 20, c.texKey).setScale(2.5)));

            s.shopGroup.push(mk(s.add.text(sx, sy + 25, c.name, {
                fontSize: '10px', fill: rcHex, fontFamily: 'Arial', fontStyle: 'bold'
            }).setOrigin(0.5)));

            s.shopGroup.push(mk(s.add.text(sx, sy + 42, '\u{1F48E} ' + c.price, {
                fontSize: '12px', fill: '#3498db', fontFamily: 'Arial', fontStyle: 'bold'
            }).setOrigin(0.5)));

            s.shopGroup.push(mk(s.add.text(sx, sy + 55, 'Pet Scene only', {
                fontSize: '7px', fill: '#666', fontFamily: 'Arial'
            }).setOrigin(0.5)));
        });
    }

    _openCase(caseId) {
        const s = this.scene;
        const pet = rollCaseDrop(caseId);
        if (!pet) return;

        const acc = loadAccount() || {};
        if (!acc.ownedPets) acc.ownedPets = [];
        const alreadyOwned = acc.ownedPets.includes(pet.id);
        acc.ownedPets.push(pet.id);
        if (!acc.petLevels) acc.petLevels = {};
        saveAccount(acc);

        this.closeShop();
        s.menuOpen = false;
        s.physics.resume();

        s.floatingText(s.player.x, s.player.y - 40,
            (alreadyOwned ? '(owned) ' : '') + pet.name + ' (' + pet.rarity + ')',
            pet.rarity === 'legendary' ? '#f39c12' : pet.rarity === 'rare' ? '#3498db' : '#fff'
        );
        playLoot();
    }

    closeShop() {
        const s = this.scene;
        s._hideItemTooltip();
        if (s.shopGroup) {
            s.shopGroup.forEach(e => e.destroy());
            s.shopGroup = [];
        }
        if (s.upgradeLevels) {
            const acc = loadAccount() || {};
            acc.upgradeLevels = s.upgradeLevels;
            saveAccount(acc);
        }
        s.menuOpen = false;
        s.physics.resume();
    }
}
