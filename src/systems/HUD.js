import { RARITY_COLORS, SPELLS, DIFF_COLORS } from '../config/index.js';
import { lighten } from '../utils.js';
import { toggleMute } from '../sound.js';
import { getAccountLevelUpReq, loadAccount, saveAccount } from '../save.js';
import { initMaterialBook, getMaterialBookData } from '../materialBook.js';
import { PET_DB } from '../config/pets.js';
import { t } from '../i18n.js';

const SPELL_SLOT_STORAGE_KEY = 'loot_realms_spell_slot_pos';

export class HUD {
    constructor(scene, ui) {
        this.scene = scene;
        this.ui = ui;
        this._uiFrame = 0;
    }

    _mkEl(el) { el.setScrollFactor(0).setDepth(100); return el; }

    _createTopBar() {
        const s = (el) => { el.setScrollFactor(0).setDepth(20); return el; };
        const sx = (el) => { el.setScrollFactor(0).setDepth(23); return el; };

        this.scene.heroPanelBg = s(this.scene.add.rectangle(95, 44, 190, 88, 0x0a0a1a, 0.88).setStrokeStyle(1, 0x444444));
        this.scene.heroIcon = sx(this.scene.add.sprite(30, 44, 'icon_sage').setScale(2));
        this.scene.heroClassName = sx(this.scene.add.text(58, 16, '', { fontSize: '13px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 2 }));
        this.scene.heroLevel = sx(this.scene.add.text(185, 16, '', { fontSize: '11px', fill: '#e67e22', fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 1 }).setOrigin(1, 0));
        this.scene.heroDmgText = sx(this.scene.add.text(58, 32, '', { fontSize: '11px', fill: '#e74c3c', fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 1 }));
        this.scene.heroHpBarOuter = s(this.scene.add.rectangle(58, 44, 126, 10, 0x1a1a2e).setOrigin(0, 0.5).setStrokeStyle(1, 0x444444));
        this.scene.heroHpBarFill = s(this.scene.add.rectangle(59, 44, 124, 8, 0xe74c3c).setOrigin(0, 0.5));
        this.scene.heroShieldFill = s(this.scene.add.rectangle(59, 44, 0, 8, 0x3498db, 0.4).setOrigin(0, 0.5));
        this.scene.heroHpText = sx(this.scene.add.text(121, 44, '', { fontSize: '8px', fill: '#fff', fontFamily: 'Arial', stroke: '#000', strokeThickness: 1 }).setOrigin(0.5));
        this.scene.heroCorLabel = sx(this.scene.add.text(58, 54, 'COR', { fontSize: '8px', fill: '#9b59b6', fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 1 }));
        this.scene.heroCorBarOuter = s(this.scene.add.rectangle(80, 54, 104, 5, 0x1a1a2e).setOrigin(0, 0.5).setStrokeStyle(1, 0x333333));
        this.scene.heroCorBarFill = s(this.scene.add.rectangle(81, 54, 0, 3, 0x9b59b6).setOrigin(0, 0.5));
        this.scene.heroAccLabel = sx(this.scene.add.text(58, 64, '', { fontSize: '8px', fill: '#e67e22', fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 1 }));
        this.scene.heroAccBarOuter = s(this.scene.add.rectangle(100, 64, 84, 4, 0x1a1a2e).setOrigin(0, 0.5).setStrokeStyle(1, 0x333333));
        this.scene.heroAccBarFill = s(this.scene.add.rectangle(101, 64, 0, 2, 0xe67e22).setOrigin(0, 0.5));
        this.scene.heroHint = sx(this.scene.add.text(58, 74, '', { fontSize: '8px', fill: '#666', fontFamily: 'Arial' }));
        this.scene.diffText = sx(this.scene.add.text(185, 4, '', { fontSize: '9px', fill: '#f39c12', fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 1 }).setOrigin(1, 0));
        this.scene.zoneText = sx(this.scene.add.text(400, 4, '', { fontSize: '11px', fill: '#3498db', fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 2 }).setOrigin(0.5, 0));
        this.scene.goldText = sx(this.scene.add.text(185, 86, '', { fontSize: '11px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 1 }).setOrigin(1, 0));
        this.scene.crystalText = sx(this.scene.add.text(185, 98, '', { fontSize: '11px', fill: '#3498db', fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 1 }).setOrigin(1, 0));
        this.scene.petBtnText = sx(this.scene.add.text(185, 114, '', { fontSize: '11px', fill: '#e67e22', fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 1 }).setOrigin(1, 0).setInteractive({ useHandCursor: true }));
        this.scene.petBtnText.on('pointerdown', () => { this.scene.scene.launch('Pet', { returnScene: 'Game' }); this.scene.scene.pause(); });
        this.scene.petBtnText.on('pointerover', () => this.scene.petBtnText.setStyle({ fill: '#f39c12' }));
        this.scene.petBtnText.on('pointerout', () => this.scene.petBtnText.setStyle({ fill: '#e67e22' }));

        this.scene.hintText = this.scene.add.text(400, 588, '', { fontSize: '10px', fill: '#555', fontFamily: 'Arial' }).setOrigin(0.5).setScrollFactor(0).setDepth(20);
        this.scene.muteText = this.scene.add.text(790, 30, 'SOUND', { fontSize: '10px', fill: '#27ae60', fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 1 }).setOrigin(1, 0.5).setScrollFactor(0).setDepth(23).setInteractive({ useHandCursor: true });
        this.scene.muteText.on('pointerdown', () => this._toggleMute());
        this.scene.talentText = this.scene.add.text(400, 36, '', { fontSize: '9px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 1 }).setScrollFactor(0).setDepth(23);

        this._createSpellSlots();
        this._createConsumableSlot();
        this._createNavPanel();
    }

    _createSpellSlots() {
        this.scene.spellSlots = {};
        const classKey = this.scene.classKey;
        const slotConfig = { sage: { q: 'fireball', w: 'shield', e: 'heal', r: 'meteor' }, alchemist: { q: 'acid_flask', w: 'toxic_puddle', e: 'burrow', r: 'chemical_cloud' }, angel: { q: 'soul_strike', w: 'holy_shield', e: 'holy_nova', r: 'divine_blessing' } };
        const sc = slotConfig[classKey] || slotConfig.sage;
        const spellKeys = [sc.q, sc.w, sc.e, sc.r];
        const slotLabels = ['Q', 'W', 'E', 'R'];
        const slotColors = [0x555555, 0x555555, 0x555555, 0x555555];
        const iconMap = { fireball: 'icon_fireball', shield: 'icon_shield', heal: 'icon_heal', acid_flask: 'icon_acid_flask', toxic_puddle: 'icon_toxic_puddle', burrow: 'icon_burrow', soul_strike: 'icon_soul_strike', holy_shield: 'icon_holy_shield', holy_nova: 'icon_holy_nova', meteor: 'icon_meteor', chemical_cloud: 'icon_chemical_cloud', divine_blessing: 'icon_divine_blessing' };
        const savedPos = this._loadSpellSlotPositions();
        const defaultSlotY = 565;

        spellKeys.forEach((key, i) => {
            const saved = savedPos && savedPos[i];
            const sx2 = saved ? saved.x : 640 + i * 32;
            const sy = saved ? saved.y : defaultSlotY;
            const bg = this.scene.add.rectangle(sx2, sy, 28, 28, 0x1a1a2e).setStrokeStyle(2, slotColors[i]).setScrollFactor(0).setDepth(24);
            const icon = this.scene.add.sprite(sx2, sy, iconMap[key] || 'icon_fireball').setScale(1.2).setScrollFactor(0).setDepth(25);
            const keyLbl = this.scene.add.text(sx2, sy - 16, slotLabels[i], { fontSize: '8px', fill: '#aaa', fontFamily: 'Arial', fontStyle: 'bold' }).setOrigin(0.5).setScrollFactor(0).setDepth(26);
            const cd = this.scene.add.text(sx2, sy + 9, '', { fontSize: '8px', fill: '#f39c12', fontFamily: 'Arial' }).setOrigin(0.5).setScrollFactor(0).setDepth(25);
            this.scene.spellSlots[key] = { bg, icon, keyLbl, cd, index: i };
            bg.setInteractive({ useHandCursor: true, draggable: true });
            this.scene.input.setDraggable(bg);
            bg.on('dragstart', () => { bg.setStrokeStyle(2, 0xf1c40f); bg.setFillStyle(0x2a2a4e); });
            bg.on('drag', (pointer, dragX, dragY) => { bg.x = dragX; bg.y = dragY; icon.x = dragX; icon.y = dragY; keyLbl.x = dragX; keyLbl.y = dragY - 16; cd.x = dragX; cd.y = dragY + 9; });
            bg.on('dragend', () => { bg.setStrokeStyle(2, slotColors[i]); bg.setFillStyle(0x1a1a2e); this._saveSpellSlotPositions(); });
            bg.on('pointerover', () => { this._showSpellTooltip(key, sx2, sy); });
            bg.on('pointerout', () => { if (this.scene.tooltipText) this.scene.tooltipText.setVisible(false); });
        });
    }

    _showSpellTooltip(key, sx2, sy) {
        if (!this.scene.tooltipText) {
            this.scene.tooltipText = this.scene.add.text(0, 0, '', { fontSize: '9px', fill: '#fff', fontFamily: 'Arial', backgroundColor: '#1a1a2e', padding: { x: 6, y: 4 }, stroke: '#000', strokeThickness: 1, wordWrap: { width: 180 } }).setScrollFactor(0).setDepth(100).setAlpha(0.95);
        }
        const spellDef = SPELLS[key];
        if (spellDef) {
            const name = spellDef.nameRu || spellDef.name;
            const desc = spellDef.description || '';
            const cdStr = spellDef.cooldown ? spellDef.cooldown + 's CD' : '';
            const dmg = spellDef.damage ? spellDef.damage + ' DMG' : '';
            const heal = spellDef.healPercent ? 'Heal ' + Math.floor(spellDef.healPercent * 100) + '%' : '';
            const lines = [name]; if (cdStr) lines.push(cdStr); if (dmg) lines.push(dmg); if (heal) lines.push(heal); if (desc) lines.push(desc);
            this.scene.tooltipText.setText(lines.join('\n'));
        } else { this.scene.tooltipText.setText(key); }
        const tx = Math.min(sx2 - 90, 600);
        const ty = sy - 60;
        this.scene.tooltipText.setPosition(tx, ty).setVisible(true);
    }

    _createConsumableSlot() {
        const fx = 640 + 4 * 32, fy = 565;
        const consBg = this.scene.add.rectangle(fx, fy, 28, 28, 0x1a1a2e).setStrokeStyle(2, 0xf39c12).setScrollFactor(0).setDepth(24);
        const consLbl = this.scene.add.text(fx, fy - 2, 'F', { fontSize: '10px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold' }).setOrigin(0.5).setScrollFactor(0).setDepth(25);
        const consIcon = this.scene.add.sprite(fx, fy - 1, 'potion_heal_small').setScale(1.4).setScrollFactor(0).setDepth(25).setVisible(false);
        const consName = this.scene.add.text(fx, fy + 11, '', { fontSize: '5px', fill: '#f39c12', fontFamily: 'Arial' }).setOrigin(0.5).setScrollFactor(0).setDepth(25);
        this.scene.consumableSlot = { bg: consBg, lbl: consLbl, icon: consIcon, name: consName };
        consBg.setInteractive({ useHandCursor: true });
        consBg.on('pointerdown', () => { if (this.scene.playerSys) this.scene.playerSys.useConsumable(); });
    }

    _createNavPanel() {
        const s = (el) => { el.setScrollFactor(0).setDepth(21); return el; };
        const navBtns = []; const startX = 14, startY = 100, gap = 22;
        const navItems = [
            { icon: 'nav_quest', label: 'Q', cb: () => this.scene._openQuestLog() },
            { icon: 'nav_book', label: 'B', cb: () => this.ui._openBestiary() },
            { icon: 'nav_hammer', label: 'C', cb: () => this.ui._openCrafting() },
            { icon: 'nav_star', label: 'T', cb: () => this.ui._openTalentTree() },
            { icon: 'nav_paw', label: 'P', cb: () => { this.scene.scene.launch('Pet', { returnScene: 'Game' }); this.scene.scene.pause(); } },
            { icon: 'nav_sound', label: 'M', cb: () => this._toggleMute() },
        ];
        const bg = s(this.scene.add.rectangle(startX + 10, startY + (navItems.length * gap) / 2 - gap / 2 + 4, 24, navItems.length * gap + 4, 0x0a0a1a, 0.75).setStrokeStyle(1, 0x333333));
        navBtns.push(bg);
        navItems.forEach((item, i) => {
            const y = startY + i * gap;
            const btnBg = s(this.scene.add.rectangle(startX + 10, y, 20, 20, 0x1a1a2e).setStrokeStyle(1, 0x444444));
            const icon = s(this.scene.add.sprite(startX + 10, y, item.icon).setScale(1));
            navBtns.push(btnBg, icon);
            btnBg.setInteractive({ useHandCursor: true });
            btnBg.on('pointerover', () => { btnBg.setStrokeStyle(2, 0xf1c40f); btnBg.setFillStyle(0x2a2a4e); });
            btnBg.on('pointerout', () => { btnBg.setStrokeStyle(1, 0x444444); btnBg.setFillStyle(0x1a1a2e); });
            btnBg.on('pointerdown', () => { if (!this.scene.menuOpen && !this.scene.transitioning) item.cb(); });
        });
        this.scene.navBtns = navBtns;
    }

    _loadSpellSlotPositions() {
        try { const json = localStorage.getItem(SPELL_SLOT_STORAGE_KEY); if (json) return JSON.parse(json); } catch (e) {}
        return null;
    }

    _saveSpellSlotPositions() {
        try {
            const positions = [];
            const slotConfig = { sage: { q: 'fireball', w: 'shield', e: 'heal', r: 'meteor' }, alchemist: { q: 'acid_flask', w: 'toxic_puddle', e: 'burrow', r: 'chemical_cloud' }, angel: { q: 'soul_strike', w: 'holy_shield', e: 'holy_nova', r: 'divine_blessing' } };
            const sc = slotConfig[this.scene.classKey] || slotConfig.sage;
            [sc.q, sc.w, sc.e, sc.r].forEach((key, i) => { const slot = this.scene.spellSlots[key]; if (slot) positions[i] = { x: Math.round(slot.bg.x), y: Math.round(slot.bg.y) }; });
            localStorage.setItem(SPELL_SLOT_STORAGE_KEY, JSON.stringify(positions));
        } catch (e) {}
    }

    _toggleMute() {
        const m = toggleMute();
        this.scene.muteText.setText(m ? 'MUTE' : 'SOUND');
        this.scene.muteText.setColor(m ? '#e74c3c' : '#27ae60');
    }

    updateUI() {
        this._uiFrame++;
        if (this._uiFrame % 3 !== 0) return;
        const accReq = getAccountLevelUpReq(this.scene.accountLevel);
        const iconKey = 'icon_' + (this.scene.classKey || 'sage');
        if (this.scene.heroIcon && this.scene.heroIcon.texture.key !== iconKey) this.scene.heroIcon.setTexture(iconKey);
        const clsNames = { sage: 'SAGE', alchemist: 'ALCHEMIST', angel: 'ANGEL' };
        if (this.scene.heroClassName) this.scene.heroClassName.setText(clsNames[this.scene.classKey] || 'SAGE');
        if (this.scene.heroLevel) this.scene.heroLevel.setText('Lv.' + this.scene.playerLevel);
        if (this.scene.heroDmgText) this.scene.heroDmgText.setText('DMG:' + this.scene.playerDamage);
        const hpRatio = this.scene.playerMaxHP > 0 ? this.scene.playerHP / this.scene.playerMaxHP : 0;
        if (this.scene.heroHpBarFill) {
            this.scene.heroHpBarFill.width = Math.max(0, 124 * hpRatio);
            this.scene.heroHpBarFill.setFillStyle(hpRatio > 0.6 ? 0x27ae60 : hpRatio > 0.3 ? 0xf39c12 : 0xe74c3c);
        }
        if (this.scene.heroHpText) this.scene.heroHpText.setText(this.scene.playerHP + '/' + this.scene.playerMaxHP);
        if (this.scene.shieldActive && this.scene.shieldHP > 0) {
            this.scene.heroShieldFill.width = Math.min(124, 124 * (this.scene.shieldHP / this.scene.playerMaxHP));
            this.scene.heroShieldFill.x = 59 + this.scene.heroHpBarFill.width;
        } else { this.scene.heroShieldFill.width = 0; }
        const corRatio = this.scene.corruptionMax > 0 ? this.scene.corruption / this.scene.corruptionMax : 0;
        if (this.scene.heroCorBarFill) {
            this.scene.heroCorBarFill.width = Math.max(0, 102 * corRatio);
            this.scene.heroCorBarFill.setFillStyle(corRatio > 0.8 ? 0xe74c3c : corRatio > 0.5 ? 0xe67e22 : 0x9b59b6);
        }
        if (this.scene.heroAccLabel) this.scene.heroAccLabel.setText('AcLv' + this.scene.accountLevel);
        if (this.scene.heroAccBarFill) this.scene.heroAccBarFill.width = Math.max(0, 82 * (this.scene.accountExp / accReq));
        if (this.scene.heroHint) this.scene.heroHint.setText(this.scene.talentPoints > 0 ? 'Talents: ' + this.scene.talentPoints + ' [T]' : '');
        if (this.scene.diffText) this.scene.diffText.setText(this.scene.difficulty).setColor(DIFF_COLORS[this.scene.difficulty] || '#f39c12');
        
        // Zone indicator
        const zoneNames = { forest: 'Forest', arena: 'Arena', mine: 'Mine', cave: 'Cave', village: 'Village', hell: 'Hell', snowy: 'Snowy Village', castle: 'Castle', meadow: 'Meadow', cemetery: 'Cemetery', mine_boss: 'Mine Boss' };
        if (this.scene.zoneText) this.scene.zoneText.setText(zoneNames[this.scene.zone] || this.scene.zone);
        this.scene.talentText.setText(this.scene.talentPoints > 0 ? 'TALENTS: ' + this.scene.talentPoints + ' [T]' : '');
        if (this.scene.goldText) this.scene.goldText.setText('Gold: ' + (this.scene.gold || 0));
        if (this.scene.crystalText) this.scene.crystalText.setText('\u{1F48E} ' + (this.scene.crystals || 0));
        if (this.scene.petBtnText) {
            const eqPet = this.scene.equippedPet;
            this.scene.petBtnText.setText(eqPet ? '\u{1F43E} ' + (PET_DB.find(p => p.id === eqPet)?.name || eqPet) : '\u{1F43E} Pets');
        }
        ['fireball', 'shield', 'heal', 'purify', 'meteor', 'chemical_cloud', 'divine_blessing', 'acid_flask', 'iron_skin', 'healing_potion', 'life_link', 'soul_strike', 'toxic_puddle', 'burrow', 'holy_shield', 'holy_nova'].forEach(key => {
            const s = this.scene.spellSlots[key];
            if (!s) return;
            const cd = this.scene.spellCooldowns[key];
            if (cd > 0) { s.cd.setText(cd.toFixed(1)); s.bg.setFillStyle(0x111111); s.bg.setAlpha(0.6); }
            else { s.cd.setText(''); s.bg.setFillStyle(0x1a1a2e); s.bg.setAlpha(1); }
        });
        if (this.scene.consumableSlot) {
            const cs = this.scene.consumableSlot;
            const cons = this.scene.consumable;
            if (cons) { cs.icon.setTexture(cons.texKey || 'potion_heal_small').setVisible(true); cs.lbl.setVisible(false); cs.name.setText((cons.name || '').split(' ').slice(0, 2).join(' ')); cs.bg.setStrokeStyle(2, 0x2ecc71); }
            else { cs.icon.setVisible(false); cs.lbl.setVisible(true); cs.name.setText(''); cs.bg.setStrokeStyle(2, 0x555555); }
        }
    }

    floatingText(x, y, text, color) {
        const t = this.scene.add.text(x, y, text, { fontSize: '12px', fill: color, fontFamily: 'Arial', fontStyle: 'bold', stroke: '#000', strokeThickness: 2 }).setOrigin(0.5);
        this.scene.tweens.add({ targets: t, y: t.y - 30, alpha: 0, duration: 700, onComplete: () => t.destroy() });
    }

    showDamageFlash() {
        if (this._damageFlash) return;
        this._damageFlash = this.scene.add.rectangle(400, 300, 800, 600, 0xff0000).setAlpha(0.25).setScrollFactor(0).setDepth(300);
        this.scene.tweens.add({ targets: this._damageFlash, alpha: 0, duration: 200, onComplete: () => { if (this._damageFlash) { this._damageFlash.destroy(); this._damageFlash = null; } } });
    }
}
