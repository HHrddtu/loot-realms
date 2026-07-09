import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT, CRAFT_CATEGORIES, CRAFTING_RECIPES, RARITY_COLORS, MATERIAL_DB } from '../config/index.js';
import { canCraft, craft, getRecipeStatus, countMaterials, getMaterialName } from '../crafting.js';
import { getLang, t } from '../i18n.js';

const RARITY_NAMES = {
    common:    { en: 'Common',    ru: 'Обычный',   de: 'Gewöhnlich' },
    uncommon:  { en: 'Uncommon',  ru: 'Необычный',  de: 'Ungewöhnlich' },
    rare:      { en: 'Rare',      ru: 'Редкий',     de: 'Selten' },
    epic:      { en: 'Epic',      ru: 'Эпический',  de: 'Episch' },
    legendary: { en: 'Legendary', ru: 'Легендарный', de: 'Legendär' }
};

const SLOT_NAMES = {
    weapon:    { en: 'Weapon',    ru: 'Оружие',     de: 'Waffe' },
    armor:     { en: 'Armor',     ru: 'Броня',      de: 'Rüstung' },
    accessory: { en: 'Accessory', ru: 'Аксессуар',  de: 'Accessoire' }
};

export default class CraftScene extends Phaser.Scene {
    constructor() {
        super('Craft');
    }

    init(data) {
        this.materials = data.materials || [];
        this.equipBag = data.equipBag || [];
        this.maxEquipBag = data.maxEquipBag || 12;
        this.isAlchemist = data.isAlchemist || false;
        this.returnScene = data.returnScene || 'Game';
        this.classKey = data.classKey || 'sage';
        this.difficulty = data.difficulty || 'Normal';
        this.materialBookData = data.materialBookData || {};
        this.hasRelicCraftBonus = data.hasRelicCraftBonus || false;
        this.onCraftResult = data.onCraftResult || null;
    }

    create() {
        
        this.cameras.main.setBackgroundColor('#1a1408');
        this.selectedCategory = 'weapon';
        this.selectedIndex = -1;
        this.listItems = [];
        this.detailElements = [];
        this.craftResultElements = [];

        // Parchment background - smaller scroll style
        this.add.image(400, 300, 'parchment_bg').setScale(0.85);
        this.add.image(400, 300, 'ornate_border').setScale(0.85);

        this._createHeader();
        this._createCategoryTabs();
        this._createDetailPanel();
        this._createMaterialBar();
        this._updateRecipeList();

        this.input.keyboard.on('keydown-C', () => this._close());
        this.input.keyboard.on('keydown-ESC', () => this._close());

        const closeBtn = this.add.rectangle(GAME_WIDTH - 28, 22, 26, 26, 0x34495e)
            .setStrokeStyle(1, 0x556677).setInteractive({ useHandCursor: true }).setDepth(50);
        this.add.text(GAME_WIDTH - 28, 22, 'X', {
            fontSize: '16px', fill: '#3d2a14', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(50);
        closeBtn.on('pointerdown', () => this._close());
        closeBtn.on('pointerover', () => closeBtn.setFillStyle(0xc0392b));
        closeBtn.on('pointerout', () => closeBtn.setFillStyle(0x34495e));
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _createHeader() {
        this.add.text(GAME_WIDTH / 2, 22, t('craft.title') || 'CRAFTING TABLE', {
            fontSize: '28px', fill: '#f1c40f', fontFamily: 'Georgia', fontStyle: 'bold'
        }).setOrigin(0.5);

        if (this.isAlchemist) {
            this.add.text(GAME_WIDTH / 2, 50, '⚗ Alchemist Bonus: 15% double yield', {
                fontSize: '12px', fill: '#27ae60', fontFamily: 'Arial'
            }).setOrigin(0.5);
        }
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _createCategoryTabs() {
        const categories = Object.entries(CRAFT_CATEGORIES);
        const tabW = 120;
        const tabH = 28;
        const startX = (GAME_WIDTH - categories.length * (tabW + 5)) / 2;
        const y = 72;

        this.tabButtons = [];

        categories.forEach(([key, label], i) => {
            const x = startX + i * (tabW + 5) + tabW / 2;
            const lang = getLang();
            const text = label[lang] || label.en;
            const isActive = key === this.selectedCategory;

            const bg = this.add.rectangle(x, y, tabW, tabH, isActive ? 0x2c3e50 : 0x1a2a3a)
                .setStrokeStyle(1, isActive ? 0xf1c40f : 0x334466)
                .setInteractive({ useHandCursor: true });

            const txt = this.add.text(x, y, text, {
                fontSize: '13px', fill: isActive ? '#f1c40f' : '#aaa', fontFamily: 'Arial',
                fontStyle: 'bold'
            }).setOrigin(0.5);

            bg.on('pointerdown', () => {
                this.selectedCategory = key;
                this.selectedIndex = -1;
                this._refreshTabs();
                this._updateRecipeList();
                this._clearDetail();
            });

            bg.on('pointerover', () => { if (!isActive) bg.setFillStyle(0x223344); });
            bg.on('pointerout', () => { if (!isActive) bg.setFillStyle(0x1a2a3a); });

            this.tabButtons.push({ bg, txt, key });
        });
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _refreshTabs() {
        this.tabButtons.forEach(tab => {
            const isActive = tab.key === this.selectedCategory;
            tab.bg.setFillStyle(isActive ? 0x2c3e50 : 0x1a2a3a);
            tab.bg.setStrokeStyle(1, isActive ? 0xf1c40f : 0x334466);
            tab.txt.setStyle({ fill: isActive ? '#f1c40f' : '#aaa' });
        });
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _updateRecipeList() {
        this.listItems.forEach(item => {
            item.bg.destroy();
            item.nameText.destroy();
            item.rarityText.destroy();
            item.materialsText.destroy();
            if (item.lockedOverlay) item.lockedOverlay.destroy();
            if (item.lockedText) item.lockedText.destroy();
        });
        this.listItems = [];

        const lang = getLang();
        const allRecipes = this._getFilteredRecipes();
        const startX = 15;
        const startY = 105;
        const itemW = 340;
        const itemH = 55;

        allRecipes.forEach((recipe, i) => {
            const y = startY + i * (itemH + 4);
            if (y + itemH > GAME_HEIGHT - 50) return;

            const canMake = canCraft(recipe, this.materials, this.isAlchemist);
            const rarityColor = RARITY_COLORS[recipe.rarity] || 0xaaaaaa;
            const bgColor = canMake ? 0xe8d5a3 : 0xdcc89a;

            const bg = this.add.rectangle(startX + itemW / 2, y + itemH / 2, itemW, itemH, bgColor)
                .setStrokeStyle(1, 0x334466)
                .setInteractive({ useHandCursor: true });

            const nameStr = recipe['name' + lang.charAt(0).toUpperCase() + lang.slice(1)] || recipe.name;
            const nameText = this.add.text(startX + 42, y + 8, nameStr, {
                fontSize: '14px', fill: canMake ? '#ddd' : '#666', fontFamily: 'Arial', fontStyle: 'bold'
            });

            const rarityStr = (RARITY_NAMES[recipe.rarity] || {})[lang] || recipe.rarity;
            const rarityText = this.add.text(startX + 42, y + 26, rarityStr, {
                fontSize: '11px', fill: '#' + rarityColor.toString(16).padStart(6, '0'), fontFamily: 'Arial'
            });

            const matParts = Object.entries(recipe.materials).map(([matId, need]) => {
                const have = countMaterials(this.materials, matId);
                const color = have >= need ? '#2ecc71' : '#e74c3c';
                return `${have}/${need}`;
            });
            const materialsText = this.add.text(startX + 42, y + 40, matParts.join('  '), {
                fontSize: '10px', fill: '#aaa', fontFamily: 'Arial'
            });

            if (!canMake) {
                const lockBg = this.add.rectangle(startX + itemW / 2, y + itemH / 2, itemW, itemH, 0x000000, 0.3);
                const lockTxt = this.add.text(startX + itemW - 15, y + itemH / 2, 'LOCKED', {
                    fontSize: '11px', fill: '#666', fontFamily: 'Arial', fontStyle: 'bold'
                }).setOrigin(1, 0.5);
                this.listItems.push({ bg, nameText, rarityText, materialsText, lockedOverlay: lockBg, lockedText: lockTxt, recipe });
            } else {
                this.listItems.push({ bg, nameText, rarityText, materialsText, recipe });
            }

            if (this.selectedIndex === i) {
                bg.setStrokeStyle(2, 0xf1c40f);
            }

            bg.on('pointerdown', () => {
                this.selectedIndex = i;
                this.listItems.forEach((item, j) => {
                    item.bg.setStrokeStyle(j === i ? 2 : 1, j === i ? 0xf1c40f : 0x334466);
                });
                this._showDetail(recipe);
            });
        });

        if (allRecipes.length === 0) {
            this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'No recipes available', {
                fontSize: '16px', fill: '#555', fontFamily: 'Arial'
            }).setOrigin(0.5);
        }
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _getFilteredRecipes() {
        const lang = getLang();
        return CRAFTING_RECIPES.filter(r => r.category === this.selectedCategory);
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _createDetailPanel() {
        const px = 380;
        const py = 100;
        const pw = 400;
        const ph = 430;

        this.detailBg = this.add.rectangle(px + pw / 2, py + ph / 2, pw, ph, 0xf4e4c1)
            .setStrokeStyle(2, 0x8b4513).setDepth(5);

        this.detailEmptyText = this.add.text(px + pw / 2, py + ph / 2, 'Select a recipe', {
            fontSize: '16px', fill: '#444', fontFamily: 'Arial'
        }).setOrigin(0.5).setDepth(6);

        this.detailTitle = this.add.text(px + 15, py + 12, '', {
            fontSize: '22px', fill: '#f1c40f', fontFamily: 'Georgia', fontStyle: 'bold'
        }).setVisible(false).setDepth(6);

        this.detailRarity = this.add.text(px + 15, py + 40, '', {
            fontSize: '13px', fill: '#e67e22', fontFamily: 'Arial'
        }).setVisible(false).setDepth(6);

        this.detailSlot = this.add.text(px + 15, py + 58, '', {
            fontSize: '12px', fill: '#bbb', fontFamily: 'Arial'
        }).setVisible(false).setDepth(6);

        this.detailStats = this.add.text(px + 15, py + 78, '', {
            fontSize: '13px', fill: '#3498db', fontFamily: 'Arial', fontStyle: 'bold'
        }).setVisible(false).setDepth(6);

        this.detailDesc = this.add.text(px + 15, py + 110, '', {
            fontSize: '12px', fill: '#999', fontFamily: 'Arial',
            wordWrap: { width: pw - 30 }, lineSpacing: 4
        }).setVisible(false).setDepth(6);

        this.detailMaterials = this.add.text(px + 15, py + 200, '', {
            fontSize: '13px', fill: '#ddd', fontFamily: 'Arial', lineSpacing: 4
        }).setVisible(false).setDepth(6);

        const craftBtnX = px + pw / 2;
        const craftBtnY = py + ph - 40;
        this.craftBtnBg = this.add.rectangle(craftBtnX, craftBtnY, 180, 36, 0x27ae60)
            .setStrokeStyle(2, 0x2ecc71).setInteractive({ useHandCursor: true }).setDepth(7).setVisible(false);
        this.craftBtnText = this.add.text(craftBtnX, craftBtnY, 'CRAFT', {
            fontSize: '16px', fill: '#3d2a14', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(8).setVisible(false);

        this.craftBtnBg.on('pointerdown', () => this._doCraft());
        this.craftBtnBg.on('pointerover', () => { if (this.craftBtnBg.visible) this.craftBtnBg.setFillStyle(0x2ecc71); });
        this.craftBtnBg.on('pointerout', () => { if (this.craftBtnBg.visible) this.craftBtnBg.setFillStyle(0x27ae60); });
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _showDetail(recipe) {
        this._clearDetail();
        this.detailEmptyText.setVisible(false);
        const lang = getLang();
        const px = 380;
        const py = 100;
        const pw = 400;

        const nameStr = recipe['name' + lang.charAt(0).toUpperCase() + lang.slice(1)] || recipe.name;
        this.detailTitle.setText(nameStr).setVisible(true);
        this.detailTitle.setPosition(px + 15, py + 12);

        const rarityStr = (RARITY_NAMES[recipe.rarity] || {})[lang] || recipe.rarity;
        const rarityColor = '#' + (RARITY_COLORS[recipe.rarity] || 0xaaaaaa).toString(16).padStart(6, '0');
        this.detailRarity.setText(rarityStr).setVisible(true);
        this.detailRarity.setStyle({ fill: rarityColor });
        this.detailRarity.setPosition(px + 15, py + 40);

        const slotStr = (SLOT_NAMES[recipe.slot] || {})[lang] || recipe.slot;
        this.detailSlot.setText(slotStr).setVisible(true);
        this.detailSlot.setPosition(px + 15, py + 58);

        const statParts = Object.entries(recipe.stats).map(([k, v]) => {
            const labels = {
                dmg: 'DMG', hp: 'HP', crit: 'Crit', regen: 'Regen',
                spellPercent: 'Spell %', dodgePercent: 'Dodge %', critPercent: 'Crit %',
                damageReduction: 'DR %', regenPercent: 'Regen %'
            };
            return `+${v} ${labels[k] || k}`;
        });
        this.detailStats.setText(statParts.join('  |  ')).setVisible(true);
        this.detailStats.setPosition(px + 15, py + 78);

        const descStr = recipe['description' + lang.charAt(0).toUpperCase() + lang.slice(1)] || recipe.description;
        this.detailDesc.setText(descStr || '').setVisible(true);
        this.detailDesc.setPosition(px + 15, py + 110);

        const status = getRecipeStatus(recipe, this.materials);
        const matLines = Object.entries(status).map(([matId, info]) => {
            const name = getMaterialName(matId);
            const color = info.enough ? '#2ecc71' : '#e74c3c';
            const mark = info.enough ? '✓' : '✗';
            return `${mark} ${name}: ${info.have}/${info.need}`;
        });
        this.detailMaterials.setText('Materials:\n' + matLines.join('\n')).setVisible(true);
        this.detailMaterials.setPosition(px + 15, py + 200);

        const canMake = canCraft(recipe, this.materials, this.isAlchemist);
        this.craftBtnBg.setVisible(canMake);
        this.craftBtnText.setVisible(canMake);
        if (canMake) {
            this.craftBtnBg.setFillStyle(0x27ae60);
        }

        this.currentRecipe = recipe;
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _clearDetail() {
        this.detailElements.forEach(e => e.destroy());
        this.detailElements = [];
        this.craftResultElements.forEach(e => e.destroy());
        this.craftResultElements = [];
        this.detailTitle.setVisible(false);
        this.detailRarity.setVisible(false);
        this.detailSlot.setVisible(false);
        this.detailStats.setVisible(false);
        this.detailDesc.setVisible(false);
        this.detailMaterials.setVisible(false);
        this.craftBtnBg.setVisible(false);
        this.craftBtnText.setVisible(false);
        this.detailEmptyText.setVisible(true);
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _createMaterialBar() {
        this.matBarElements = [];
        this._refreshMaterialBar();
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _refreshMaterialBar() {
        this.matBarElements.forEach(e => e.destroy());
        this.matBarElements = [];

        const lang = getLang();
        const counts = {};
        this.materials.forEach(m => {
            counts[m.id] = (counts[m.id] || 0) + 1;
        });

        const y = GAME_HEIGHT - 25;
        const parts = MATERIAL_DB.map(m => {
            const count = counts[m.id] || 0;
            const name = m['name' + lang.charAt(0).toUpperCase() + lang.slice(1)] || m.name;
            return `${name}: ${count}`;
        });

        const barText = this.add.text(GAME_WIDTH / 2, y, parts.join('  |  '), {
            fontSize: '12px', fill: '#888', fontFamily: 'Arial'
        }).setOrigin(0.5).setDepth(10);
        this.matBarElements.push(barText);

        const closeHint = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT - 10, '[C] CLOSE', {
            fontSize: '11px', fill: '#555', fontFamily: 'Arial'
        }).setOrigin(0.5).setDepth(10);
        this.matBarElements.push(closeHint);
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _doCraft() {
        if (!this.currentRecipe) return;

        const result = craft(this.currentRecipe, this.materials, this.isAlchemist, this.equipBag, this.maxEquipBag, this.hasRelicCraftBonus);
        if (!result.success) return;

        this.materials = result.materials;

        if (this.onCraftResult) {
            this.onCraftResult(result);
        }

        const lang = getLang();
        const pw = 400;
        const ph = 430;
        const px = 380;
        const py = 100;
        const centerX = px + pw / 2;
        const centerY = py + ph / 2 - 30;

        const overlay = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.6).setDepth(20);
        const resultBg = this.add.rectangle(centerX, centerY + 30, 300, 120, 0x1a3a2a)
            .setStrokeStyle(2, 0x2ecc71).setDepth(21);
        const resultText = this.add.text(centerX, centerY, 'CRAFTED!', {
            fontSize: '24px', fill: '#2ecc71', fontFamily: 'Georgia', fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(22);

        const itemName = this.currentRecipe['name' + lang.charAt(0).toUpperCase() + lang.slice(1)] || this.currentRecipe.name;
        const itemText = this.add.text(centerX, centerY + 35, itemName, {
            fontSize: '16px', fill: '#f1c40f', fontFamily: 'Arial'
        }).setOrigin(0.5).setDepth(22);

        const bonusText = this.add.text(centerX, centerY + 55, result.bonusYield ? '⚗ Double Yield!' : '', {
            fontSize: '12px', fill: '#27ae60', fontFamily: 'Arial'
        }).setOrigin(0.5).setDepth(22);

        this.craftResultElements.push(overlay, resultBg, resultText, itemText, bonusText);

        this.time.delayedCall(1200, () => {
            overlay.destroy();
            resultBg.destroy();
            resultText.destroy();
            itemText.destroy();
            bonusText.destroy();
            this.craftResultElements = [];

            this._refreshMaterialBar();
            this._updateRecipeList();
            this._clearDetail();
            this.selectedIndex = -1;
        });
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _close() {
        const gameScene = this.scene.get(this.returnScene);
        if (gameScene && gameScene.receiveCraftData) {
            gameScene.receiveCraftData(this.materials);
        }
        this.scene.stop();
    }
}
