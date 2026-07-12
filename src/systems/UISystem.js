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
        try {
            if (this.scene.menuOpen || this.scene.transitioning) return;
            this.scene.menuOpen = true; this.scene.physics.pause();
            try { if (this.scene.enemies && this.scene.enemies.scene) this.scene.enemies.getChildren().forEach(e => { if (e.body) e.body.setVelocity(0); }); } catch (e) {}
            try { if (this.scene.stumps && this.scene.stumps.scene) this.scene.stumps.getChildren().forEach(s => { if (s.body) s.body.setVelocity(0); }); } catch (e) {}
            this.scene.scene.launch(sceneName, { ...data, returnScene: 'Game' });
            this.scene.scene.sleep(this.scene.scene.key);
        } catch (e) {
            console.error('Error in _pauseAndLaunch:', e);
        }
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

    _openPets() {
        this._pauseAndLaunch('Pet', { returnScene: 'Game' });
    }

    _openSpellAssign() {
        if (this.scene.menuOpen || this.scene.transitioning) return;
        this.scene.menuOpen = true;
        this.scene.physics.pause();
        const cls = this.scene.classKey;
        const level = this.scene.playerLevel || 1;

        // Get all spells for this class (default + new unlockable)
        const classSpells = {
            sage: ['fireball', 'shield', 'heal', 'meteor', 'chain_lightning', 'arcane_burst', 'time_warp', 'nova_blast'],
            alchemist: ['acid_flask', 'toxic_puddle', 'burrow', 'chemical_cloud', 'poison_cloud', 'transmute', 'summon_golem', 'philosopher_stone'],
            angel: ['soul_strike', 'holy_shield', 'holy_nova', 'divine_blessing', 'smite', 'divine_shield', 'resurrection', 'archangel_form']
        };
        const available = classSpells[cls] || classSpells.sage;

        const assignments = { ...(this.scene.spellAssignments || {}) };
        const defaults = { sage: { q: 'fireball', w: 'shield', e: 'heal', r: 'meteor' }, alchemist: { q: 'acid_flask', w: 'toxic_puddle', e: 'burrow', r: 'chemical_cloud' }, angel: { q: 'soul_strike', w: 'holy_shield', e: 'holy_nova', r: 'divine_blessing' } };
        const d = defaults[cls] || defaults.sage;
        if (!assignments.q) assignments.q = d.q; if (!assignments.w) assignments.w = d.w; if (!assignments.e) assignments.e = d.e; if (!assignments.r) assignments.r = d.r;

        const container = this.scene.add.container(0, 0).setScrollFactor(0).setDepth(90);
        const overlay = this.scene.add.rectangle(400, 300, 800, 600, 0x000000, 0.85).setScrollFactor(0).setDepth(90);
        overlay.setInteractive(); container.add(overlay);

        // Title
        container.add(this.scene.add.text(400, 40, 'SPELL ASSIGNMENT', { fontSize: '18px', fill: '#f1c40f', fontFamily: 'Georgia', fontStyle: 'bold' }).setOrigin(0.5).setScrollFactor(0).setDepth(91));
        container.add(this.scene.add.text(400, 60, 'Level: ' + level + '  |  Click slot, then click spell', { fontSize: '10px', fill: '#888', fontFamily: 'Arial' }).setOrigin(0.5).setScrollFactor(0).setDepth(91));

        // Current slots (Q/W/E/R)
        const slotKeys = ['q', 'w', 'e', 'r'], slotLabels = ['Q', 'W', 'E', 'R'];
        const slotX = [320, 380, 440, 500], slotY = 110;
        let selectedSlot = null; const slotElements = [];

        container.add(this.scene.add.text(400, 85, 'ACTIVE SPELLS', { fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold' }).setOrigin(0.5).setScrollFactor(0).setDepth(91));

        slotKeys.forEach((sk, i) => {
            const bg = this.scene.add.rectangle(slotX[i], slotY, 44, 44, 0x1a1a2e).setStrokeStyle(2, 0xf1c40f).setScrollFactor(0).setDepth(91);
            const spell = SPELLS[assignments[sk]];
            const spellName = spell ? (spell.nameRu || spell.name) : '?';
            const spellColor = spell ? '#' + (spell.color || 0xffffff).toString(16).padStart(6, '0') : '#666';
            const icon = this.scene.add.text(slotX[i], slotY - 4, spellName.substring(0, 6), { fontSize: '8px', fill: spellColor, fontFamily: 'Arial', fontStyle: 'bold' }).setOrigin(0.5).setScrollFactor(0).setDepth(92);
            const lbl = this.scene.add.text(slotX[i], slotY + 26, slotLabels[i], { fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold' }).setOrigin(0.5).setScrollFactor(0).setDepth(92);
            container.add([bg, icon, lbl]); slotElements.push({ bg, icon, lbl, key: sk });
            bg.setInteractive({ useHandCursor: true });
            bg.on('pointerdown', () => {
                if (selectedSlot) { slotElements.forEach(s => s.bg.setStrokeStyle(2, 0xf1c40f)); }
                selectedSlot = slotElements[i];
                selectedSlot.bg.setStrokeStyle(2, 0xff0000);
            });
        });

        // Available spells grid
        container.add(this.scene.add.text(400, 160, 'AVAILABLE SPELLS', { fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold' }).setOrigin(0.5).setScrollFactor(0).setDepth(91));

        const spellElements = [];
        const cols = 4, spellW = 70, spellH = 90, startX = 400 - (cols * spellW) / 2 + spellW / 2;
        const startY = 200;

        available.forEach((sp, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const sx = startX + col * spellW;
            const sy = startY + row * (spellH + 10);
            const spell = SPELLS[sp];
            const isLocked = spell.unlockLevel && spell.unlockLevel > level;
            const isActive = Object.values(assignments).includes(sp);

            const bgColor = isLocked ? 0x1a1a1a : (isActive ? 0x1a2a1a : 0x1a1a2e);
            const borderColor = isLocked ? 0x333333 : (isActive ? 0x2ecc71 : 0x555555);
            const bg = this.scene.add.rectangle(sx, sy, spellW - 4, spellH, bgColor).setStrokeStyle(2, borderColor).setScrollFactor(0).setDepth(91);
            container.add(bg);

            // Spell name
            const nameColor = isLocked ? '#555' : '#fff';
            container.add(this.scene.add.text(sx, sy - 25, spell ? (spell.nameRu || spell.name) : sp, { fontSize: '9px', fill: nameColor, fontFamily: 'Arial', fontStyle: 'bold', wordWrap: { width: spellW - 8 } }).setOrigin(0.5).setScrollFactor(0).setDepth(92));

            // Spell slot indicator
            const slotColor = isLocked ? '#333' : '#f1c40f';
            container.add(this.scene.add.text(sx, sy - 12, '[' + (spell ? spell.slot : '?') + ']', { fontSize: '8px', fill: slotColor, fontFamily: 'Arial' }).setOrigin(0.5).setScrollFactor(0).setDepth(92));

            // Stats preview
            if (!isLocked && spell) {
                const stats = [];
                if (spell.damage) stats.push(spell.damage + ' DMG');
                if (spell.healPercent) stats.push('+' + Math.round(spell.healPercent * 100) + '% HP');
                if (spell.absorption) stats.push(spell.absorption + ' Shield');
                if (spell.dot) stats.push(spell.dot + ' DoT');
                container.add(this.scene.add.text(sx, sy + 4, stats.join(' '), { fontSize: '7px', fill: '#aaa', fontFamily: 'Arial' }).setOrigin(0.5).setScrollFactor(0).setDepth(92));

                // Cooldown
                container.add(this.scene.add.text(sx, sy + 15, spell.cooldown + 's', { fontSize: '7px', fill: '#666', fontFamily: 'Arial' }).setOrigin(0.5).setScrollFactor(0).setDepth(92));
            }

            // Lock indicator
            if (isLocked) {
                container.add(this.scene.add.text(sx, sy + 5, 'Lv.' + spell.unlockLevel, { fontSize: '9px', fill: '#e74c3c', fontFamily: 'Arial', fontStyle: 'bold' }).setOrigin(0.5).setScrollFactor(0).setDepth(92));
                container.add(this.scene.add.text(sx, sy + 18, 'LOCKED', { fontSize: '8px', fill: '#666', fontFamily: 'Arial' }).setOrigin(0.5).setScrollFactor(0).setDepth(92));
            }

            // Active indicator
            if (isActive && !isLocked) {
                container.add(this.scene.add.text(sx + spellW / 2 - 6, sy - spellH / 2 + 2, '✓', { fontSize: '10px', fill: '#2ecc71', fontFamily: 'Arial', fontStyle: 'bold' }).setOrigin(1, 0).setScrollFactor(0).setDepth(92));
            }

            // Click handler
            bg.setInteractive({ useHandCursor: true });
            bg.on('pointerover', () => { if (!isLocked) bg.setFillStyle(isActive ? 0x1a3a1a : 0x2a2a4e); });
            bg.on('pointerout', () => { bg.setFillStyle(bgColor); });
            bg.on('pointerdown', () => {
                if (isLocked || !selectedSlot) return;
                // Unassign spell from other slots if already assigned
                Object.keys(assignments).forEach(k => { if (assignments[k] === sp) assignments[k] = d[k]; });
                assignments[selectedSlot.key] = sp;
                // Update slot display
                const newSpell = SPELLS[sp];
                selectedSlot.icon.setText(newSpell ? (newSpell.nameRu || newSpell.name).substring(0, 6) : '?');
                selectedSlot.icon.setColor(newSpell ? '#' + (newSpell.color || 0xffffff).toString(16).padStart(6, '0') : '#666');
                // Reset selection
                slotElements.forEach(s => s.bg.setStrokeStyle(2, 0xf1c40f));
                selectedSlot = null;
                // Refresh grid to update active indicators
                this._refreshSpellGrid(container, spellElements, available, assignments, level, d);
            });

            spellElements.push({ bg, key: sp, isLocked, isActive });
        });

        // Tooltip area
        const tooltipBg = this.scene.add.rectangle(400, 520, 500, 40, 0x111122, 0.9).setStrokeStyle(1, 0x333).setScrollFactor(0).setDepth(91);
        const tooltipText = this.scene.add.text(400, 520, 'Hover over a spell to see details', { fontSize: '9px', fill: '#888', fontFamily: 'Arial', wordWrap: { width: 480 } }).setOrigin(0.5).setScrollFactor(0).setDepth(92);
        container.add([tooltipBg, tooltipText]);

        // Add hover handlers to show descriptions
        spellElements.forEach(se => {
            const spell = SPELLS[se.key];
            if (!spell) return;
            se.bg.on('pointerover', () => {
                if (!se.isLocked) {
                    const desc = spell.description || '';
                    const cost = spell.corruptionCost > 0 ? 'Corruption: ' + spell.corruptionCost : 'No corruption';
                    tooltipText.setText((spell.nameRu || spell.name) + ': ' + desc + '  |  ' + cost + '  |  Cooldown: ' + spell.cooldown + 's');
                }
            });
        });

        // Save button
        const saveBtn = this.scene.add.rectangle(350, 560, 100, 30, 0x27ae60).setStrokeStyle(2, 0x2ecc71).setScrollFactor(0).setDepth(91);
        const saveTxt = this.scene.add.text(350, 560, 'SAVE', { fontSize: '12px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold' }).setOrigin(0.5).setScrollFactor(0).setDepth(92);
        container.add([saveBtn, saveTxt]);

        // Close button
        const closeBtn = this.scene.add.rectangle(450, 560, 100, 30, 0x555555).setStrokeStyle(2, 0x888888).setScrollFactor(0).setDepth(91);
        const closeTxt = this.scene.add.text(450, 560, 'CLOSE', { fontSize: '12px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold' }).setOrigin(0.5).setScrollFactor(0).setDepth(92);
        container.add([closeBtn, closeTxt]);

        const cleanup = () => { container.destroy(); this.scene.menuOpen = false; this.scene.physics.resume(); };
        saveBtn.setInteractive({ useHandCursor: true });
        saveBtn.on('pointerdown', () => {
            this.scene.spellAssignments = { ...assignments };
            const acc = loadAccount() || {};
            acc.spellAssignments = { ...(acc.spellAssignments || {}), [this.scene.classKey]: { ...assignments } };
            saveAccount(acc);
            cleanup();
        });
        closeBtn.setInteractive({ useHandCursor: true });
        closeBtn.on('pointerdown', cleanup);
        overlay.on('pointerdown', () => {});
    }

    _refreshSpellGrid(container, spellElements, available, assignments, level, defaults) {
        // This is a simplified refresh - in practice, we'd need to track and update individual elements
        // For now, the grid is rebuilt when the UI is opened
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

    _openSpellProgress() {
        if (this.scene.menuOpen || this.scene.transitioning) return;
        this.scene.menuOpen = true;
        this.scene.physics.pause();
        const cls = this.scene.classKey;
        const level = this.scene.playerLevel || 1;

        // Get all spells for this class
        const classSpells = {
            sage: ['fireball', 'shield', 'heal', 'meteor', 'chain_lightning', 'arcane_burst', 'time_warp', 'nova_blast'],
            alchemist: ['acid_flask', 'toxic_puddle', 'burrow', 'chemical_cloud', 'poison_cloud', 'transmute', 'summon_golem', 'philosopher_stone'],
            angel: ['soul_strike', 'holy_shield', 'holy_nova', 'divine_blessing', 'smite', 'divine_shield', 'resurrection', 'archangel_form']
        };
        const allSpells = classSpells[cls] || classSpells.sage;

        const container = this.scene.add.container(0, 0).setScrollFactor(0).setDepth(90);
        const overlay = this.scene.add.rectangle(400, 300, 800, 600, 0x000000, 0.85).setScrollFactor(0).setDepth(90);
        overlay.setInteractive(); container.add(overlay);

        // Title
        container.add(this.scene.add.text(400, 30, 'SPELL PROGRESSION', { fontSize: '18px', fill: '#f1c40f', fontFamily: 'Georgia', fontStyle: 'bold' }).setOrigin(0.5).setScrollFactor(0).setDepth(91));
        container.add(this.scene.add.text(400, 52, 'Level: ' + level + ' / 20', { fontSize: '12px', fill: '#888', fontFamily: 'Arial' }).setOrigin(0.5).setScrollFactor(0).setDepth(91));

        // Level progress bar
        const barWidth = 400;
        const barX = 400 - barWidth / 2;
        const barY = 68;
        container.add(this.scene.add.rectangle(400, barY + 5, barWidth, 10, 0x333333).setScrollFactor(0).setDepth(91));
        const progress = Math.min(level / 20, 1);
        container.add(this.scene.add.rectangle(barX + (barWidth * progress) / 2, barY + 5, barWidth * progress, 10, 0xf1c40f).setScrollFactor(0).setDepth(92));

        // Spells by unlock level
        const unlockLevels = [1, 5, 10, 15, 20];
        let yPos = 95;

        unlockLevels.forEach(unlockLvl => {
            const spellsAtLevel = allSpells.filter(sp => {
                const spell = SPELLS[sp];
                return spell && (spell.unlockLevel || 1) === unlockLvl;
            });

            if (spellsAtLevel.length === 0) return;

            // Level header
            const isUnlocked = level >= unlockLvl;
            const headerColor = isUnlocked ? '#f1c40f' : '#555';
            container.add(this.scene.add.text(60, yPos, 'LEVEL ' + unlockLvl, { fontSize: '13px', fill: headerColor, fontFamily: 'Arial', fontStyle: 'bold' }).setScrollFactor(0).setDepth(91));
            if (isUnlocked) {
                container.add(this.scene.add.text(140, yPos, '✓ UNLOCKED', { fontSize: '10px', fill: '#2ecc71', fontFamily: 'Arial' }).setScrollFactor(0).setDepth(91));
            } else {
                container.add(this.scene.add.text(140, yPos, '🔒 LOCKED', { fontSize: '10px', fill: '#e74c3c', fontFamily: 'Arial' }).setScrollFactor(0).setDepth(91));
            }
            yPos += 20;

            // Spells at this level
            spellsAtLevel.forEach((sp, i) => {
                const spell = SPELLS[sp];
                const spellUnlocked = level >= (spell.unlockLevel || 1);
                const x = 80 + i * 120;

                // Spell card background
                const bgColor = spellUnlocked ? 0x1a2a1a : 0x1a1a1a;
                const borderColor = spellUnlocked ? 0x2ecc71 : 0x333333;
                container.add(this.scene.add.rectangle(x + 40, yPos + 40, 100, 80, bgColor).setStrokeStyle(2, borderColor).setScrollFactor(0).setDepth(91));

                // Spell name
                const nameColor = spellUnlocked ? '#fff' : '#555';
                container.add(this.scene.add.text(x + 40, yPos + 10, spell.nameRu || spell.name, { fontSize: '10px', fill: nameColor, fontFamily: 'Arial', fontStyle: 'bold', wordWrap: { width: 90 } }).setOrigin(0.5).setScrollFactor(0).setDepth(92));

                // Slot indicator
                container.add(this.scene.add.text(x + 40, yPos + 24, '[' + spell.slot + ']', { fontSize: '9px', fill: spellUnlocked ? '#f1c40f' : '#444', fontFamily: 'Arial' }).setOrigin(0.5).setScrollFactor(0).setDepth(92));

                // Stats
                if (spellUnlocked) {
                    const stats = [];
                    if (spell.damage) stats.push(spell.damage + ' DMG');
                    if (spell.healPercent) stats.push('+' + Math.round(spell.healPercent * 100) + '% HP');
                    if (spell.absorption) stats.push(spell.absorption + ' Shield');
                    container.add(this.scene.add.text(x + 40, yPos + 38, stats.join(' '), { fontSize: '8px', fill: '#aaa', fontFamily: 'Arial' }).setOrigin(0.5).setScrollFactor(0).setDepth(92));

                    // Cooldown
                    container.add(this.scene.add.text(x + 40, yPos + 50, spell.cooldown + 's CD', { fontSize: '8px', fill: '#666', fontFamily: 'Arial' }).setOrigin(0.5).setScrollFactor(0).setDepth(92));

                    // Corruption
                    if (spell.corruptionCost > 0) {
                        container.add(this.scene.add.text(x + 40, yPos + 60, spell.corruptionCost + ' Cor', { fontSize: '7px', fill: '#9b59b6', fontFamily: 'Arial' }).setOrigin(0.5).setScrollFactor(0).setDepth(92));
                    }
                } else {
                    // Locked overlay
                    container.add(this.scene.add.text(x + 40, yPos + 40, 'Lv.' + (spell.unlockLevel || 1), { fontSize: '12px', fill: '#e74c3c', fontFamily: 'Arial', fontStyle: 'bold' }).setOrigin(0.5).setScrollFactor(0).setDepth(92));
                }
            });

            yPos += 100;
        });

        // Close button
        const closeBtn = this.scene.add.rectangle(400, 560, 120, 30, 0x555555).setStrokeStyle(2, 0x888888).setScrollFactor(0).setDepth(91);
        const closeTxt = this.scene.add.text(400, 560, 'CLOSE', { fontSize: '12px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold' }).setOrigin(0.5).setScrollFactor(0).setDepth(92);
        container.add([closeBtn, closeTxt]);

        const cleanup = () => { container.destroy(); this.scene.menuOpen = false; this.scene.physics.resume(); };
        closeBtn.setInteractive({ useHandCursor: true });
        closeBtn.on('pointerdown', cleanup);
        overlay.on('pointerdown', () => {});
    }
}
