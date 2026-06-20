import { HUD } from './HUD.js';
import { InventoryPanel } from './InventoryPanel.js';
import { PauseMenu } from './PauseMenu.js';
import { InventoryUI } from './InventoryUI.js';
import { AccountEquipUI } from './AccountEquipUI.js';
import { loadAccount, saveAccount } from '../save.js';
import { getTalentEffects } from '../talents.js';
import { getAccountTalentEffects } from '../accountTalents.js';
import { initMaterialBook, getMaterialBookData } from '../materialBook.js';
import { SPELLS } from '../config/spells.js';

export class UISystem {
    constructor(scene) {
        this.scene = scene;
        this.inventory = new InventoryUI(scene, this);
        this.accountEquip = new AccountEquipUI(scene, this);
        this.hud = new HUD(scene, this);
        this.invPanel = new InventoryPanel(scene, this);
        this.pause = new PauseMenu(scene, this);
    }

    _createUI() { this.hud._createTopBar(); }
    _createTopBar() { this.hud._createTopBar(); }
    _toggleMute() { this.hud._toggleMute(); }
    updateUI() { this.hud.updateUI(); }
    floatingText(x, y, text, color) { this.hud.floatingText(x, y, text, color); }
    showDamageFlash() { this.hud.showDamageFlash(); }
    _mkEl(el) { return el.setScrollFactor(0).setDepth(200); }

    _pauseAndLaunch(sceneName, data) {
        if (this.scene.menuOpen || this.scene.transitioning) return;
        this.scene.menuOpen = true; this.scene.physics.pause();
        if (this.scene.enemies) this.scene.enemies.getChildren().forEach(e => { if (e.body) e.body.setVelocity(0); });
        if (this.scene.stumps) this.scene.stumps.getChildren().forEach(s => { if (s.body) s.body.setVelocity(0); });
        this.scene.scene.launch(sceneName, { ...data, returnScene: 'Game' });
        this.scene.scene.pause();
    }

    _openTalentTree() {
        this._pauseAndLaunch('TalentTree', { unlockedTalents: this.scene.unlockedTalents, talentPoints: this.scene.talentPoints, classKey: this.scene.classKey, unlockedAccountTalents: this.scene.unlockedAccountTalents, accountTalentPoints: this.scene.accountTalentPoints, accountLevel: this.scene.accountLevel, lockedBranches: this.scene.lockedBranches || [], playerGold: this.scene.gold || 0 });
    }

    _openBestiary() {
        const bookScene = this.scene.classKey === 'alchemist' ? 'MaterialBook' : this.scene.classKey === 'angel' ? 'SoulBook' : 'Bestiary';
        this._pauseAndLaunch(bookScene, { classKey: this.scene.classKey, difficulty: this.scene.difficulty });
    }

    _openCrafting() {
        initMaterialBook();
        this._pauseAndLaunch('Craft', { materials: this.scene.materials, equipBag: this.scene.equipBag, maxEquipBag: this.scene.maxEquipBag, isAlchemist: this.scene.classKey === 'alchemist', classKey: this.scene.classKey, difficulty: this.scene.difficulty, materialBookData: getMaterialBookData(), hasRelicCraftBonus: !!(this.scene.relicEffects && this.scene.relicEffects.craft_bonus), onCraftResult: (result) => { if (result.items) result.items.forEach(item => { if (this.scene.addEquip(item)) this.hud.floatingText(this.scene.player.x, this.scene.player.y - 40, '+' + item.name, '#2ecc71'); }); this.scene.materials = result.materials || this.scene.materials; } });
    }

    _openSpellAssign() {
        if (this.scene.menuOpen || this.scene.transitioning) return;
        this.scene.menuOpen = true;
        const cls = this.scene.classKey;
        const allSpells = { sage: ['fireball', 'shield', 'heal', 'meteor'], alchemist: ['acid_flask', 'toxic_puddle', 'burrow', 'chemical_cloud'], angel: ['soul_strike', 'holy_shield', 'holy_nova', 'divine_blessing'] };
        const available = allSpells[cls] || allSpells.sage;
        const assignments = { ...(this.scene.spellAssignments || {}) };
        const defaults = { sage: { q: 'fireball', w: 'shield', e: 'heal', r: 'meteor' }, alchemist: { q: 'acid_flask', w: 'toxic_puddle', e: 'burrow', r: 'chemical_cloud' }, angel: { q: 'soul_strike', w: 'holy_shield', e: 'holy_nova', r: 'divine_blessing' } };
        const d = defaults[cls] || defaults.sage;
        if (!assignments.q) assignments.q = d.q; if (!assignments.w) assignments.w = d.w; if (!assignments.e) assignments.e = d.e; if (!assignments.r) assignments.r = d.r;
        const iconMap = { fireball: 'icon_fireball', shield: 'icon_shield', heal: 'icon_heal', acid_flask: 'icon_acid_flask', toxic_puddle: 'icon_toxic_puddle', burrow: 'icon_burrow', soul_strike: 'icon_soul_strike', holy_shield: 'icon_holy_shield', holy_nova: 'icon_holy_nova', meteor: 'icon_meteor', chemical_cloud: 'icon_chemical_cloud', divine_blessing: 'icon_divine_blessing' };
        const container = this.scene.add.container(0, 0).setScrollFactor(0).setDepth(90);
        const overlay = this.scene.add.rectangle(400, 300, 800, 600, 0x000000, 0.7).setScrollFactor(0).setDepth(90);
        overlay.setInteractive(); container.add(overlay);
        const title = this.scene.add.text(400, 80, 'SPELL ASSIGNMENT', { fontSize: '14px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold' }).setOrigin(0.5).setScrollFactor(0).setDepth(91);
        container.add(title);
        const slotKeys = ['q', 'w', 'e', 'r'], slotLabels = ['Q', 'W', 'E', 'R'], slotX = [300, 360, 420, 480], slotY = 140;
        let selectedSlot = null; const slotElements = [];
        slotKeys.forEach((sk, i) => {
            const bg = this.scene.add.rectangle(slotX[i], slotY, 40, 40, 0x1a1a2e).setStrokeStyle(2, 0xf1c40f).setScrollFactor(0).setDepth(91);
            const icon = this.scene.add.sprite(slotX[i], slotY, iconMap[assignments[sk]] || 'icon_fireball').setScale(1.5).setScrollFactor(0).setDepth(92);
            const lbl = this.scene.add.text(slotX[i], slotY - 28, slotLabels[i], { fontSize: '10px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold' }).setOrigin(0.5).setScrollFactor(0).setDepth(92);
            container.add([bg, icon, lbl]); slotElements.push({ bg, icon, lbl, key: sk });
            bg.setInteractive({ useHandCursor: true });
            bg.on('pointerdown', () => { if (selectedSlot) { slotElements.forEach(s => s.bg.setStrokeStyle(2, 0xf1c40f)); selectedSlot.bg.setStrokeStyle(2, 0xf1c40f); } selectedSlot = slotElements[i]; selectedSlot.bg.setStrokeStyle(2, 0xff0000); });
        });
        const spellElements = []; const spellY = 240;
        available.forEach((sp, i) => {
            const sx = 300 + (i % 4) * 60, sy = spellY + Math.floor(i / 4) * 70;
            const bg = this.scene.add.rectangle(sx, sy, 44, 44, 0x1a1a2e).setStrokeStyle(2, 0x555555).setScrollFactor(0).setDepth(91);
            const icon = this.scene.add.sprite(sx, sy, iconMap[sp] || 'icon_fireball').setScale(1.6).setScrollFactor(0).setDepth(92);
            const nm = this.scene.add.text(sx, sy + 30, (SPELLS[sp] ? SPELLS[sp].nameRu || SPELLS[sp].name : sp), { fontSize: '7px', fill: '#aaa', fontFamily: 'Arial' }).setOrigin(0.5).setScrollFactor(0).setDepth(92);
            container.add([bg, icon, nm]); spellElements.push({ bg, icon, nm, key: sp });
            bg.setInteractive({ useHandCursor: true });
            bg.on('pointerdown', () => { if (selectedSlot) { assignments[selectedSlot.key] = sp; selectedSlot.icon.setTexture(iconMap[sp] || 'icon_fireball'); slotElements.forEach(s => s.bg.setStrokeStyle(2, 0xf1c40f)); selectedSlot = null; } });
        });
        const saveBtn = this.scene.add.rectangle(400, 420, 100, 30, 0x27ae60).setStrokeStyle(2, 0x2ecc71).setScrollFactor(0).setDepth(91);
        const saveTxt = this.scene.add.text(400, 420, 'SAVE', { fontSize: '12px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold' }).setOrigin(0.5).setScrollFactor(0).setDepth(92);
        container.add([saveBtn, saveTxt]);
        const closeBtn = this.scene.add.rectangle(400, 460, 100, 30, 0x555555).setStrokeStyle(2, 0x888888).setScrollFactor(0).setDepth(91);
        const closeTxt = this.scene.add.text(400, 460, 'CLOSE', { fontSize: '12px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold' }).setOrigin(0.5).setScrollFactor(0).setDepth(92);
        container.add([closeBtn, closeTxt]);
        const cleanup = () => { container.destroy(); this.scene.menuOpen = false; this.scene.physics.resume(); };
        saveBtn.setInteractive({ useHandCursor: true }); saveBtn.on('pointerdown', () => { this.scene.spellAssignments = { ...assignments }; const acc = loadAccount() || {}; acc.spellAssignments = { ...(acc.spellAssignments || {}), [this.scene.classKey]: { ...assignments } }; saveAccount(acc); cleanup(); });
        closeBtn.setInteractive({ useHandCursor: true }); closeBtn.on('pointerdown', cleanup);
        overlay.on('pointerdown', () => {});
    }

    toggleInventory() { this.invPanel.toggleInventory(); }
    openInventory() { this.invPanel.openInventory(); }
    closeInventory() { this.invPanel.closeInventory(); }
    _showItemTooltip(x, y, item) { this.invPanel._showItemTooltip(x, y, item); }
    _hideItemTooltip() { this.invPanel._hideItemTooltip(); }
    _drawEquippedPanel() { this.invPanel._drawEquippedPanel(); }
    _drawMaterialsPanel() { this.invPanel._drawMaterialsPanel(); }
    _drawEquipmentBagPanel() { this.invPanel._drawEquipmentBagPanel(); }
    _drawCloseButton() { this.invPanel._drawCloseButton(); }

    togglePause() { this.pause.togglePause(); }
    openPause() { this.pause.openPause(); }
    closePause() { this.pause.closePause(); }
    _openPauseAdvanced() { this.pause._openPauseAdvanced(); }
    _openAccountEquipOverlay() { this.accountEquip._openAccountEquipOverlay(); }
    _closeAccountEquipOverlay() { this.accountEquip._closeAccountEquipOverlay(); }
}
