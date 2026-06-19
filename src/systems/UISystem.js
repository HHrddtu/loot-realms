import { RARITY_COLORS, SHOP_EQUIP_PRICES, SELL_PRICE_RATIO, SPELLS, DIFF_COLORS } from '../config/index.js';
import { lighten } from '../utils.js';
import { toggleMute } from '../sound.js';
import { getAccountLevelUpReq, loadAccount, saveAccount } from '../save.js';
import { getTalentEffects } from '../talents.js';
import { getAccountTalentEffects } from '../accountTalents.js';
import { initMaterialBook, getMaterialBookData } from '../materialBook.js';
import { PET_DB } from '../config/pets.js';
import { t } from '../i18n.js';
import { InventoryUI } from './InventoryUI.js';
import { AccountEquipUI } from './AccountEquipUI.js';

const SPELL_SLOT_STORAGE_KEY = 'loot_realms_spell_slot_pos';

export class UISystem {
    constructor(scene) {
        this.scene = scene;
        this.inventory = new InventoryUI(scene, this);
        this.accountEquip = new AccountEquipUI(scene, this);
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

        this.scene.crystalText = sx(this.scene.add.text(185, 98, '', {
            fontSize: '11px', fill: '#3498db', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 1
        }).setOrigin(1, 0));

        this.scene.petBtnText = sx(this.scene.add.text(185, 114, '', {
            fontSize: '11px', fill: '#e67e22', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 1
        }).setOrigin(1, 0).setInteractive({ useHandCursor: true }));
        this.scene.petBtnText.on('pointerdown', () => {
            this.scene.scene.launch('Pet', { returnScene: 'Game' });
            this.scene.scene.pause();
        });
        this.scene.petBtnText.on('pointerover', () => this.scene.petBtnText.setStyle({ fill: '#f39c12' }));
        this.scene.petBtnText.on('pointerout', () => this.scene.petBtnText.setStyle({ fill: '#e67e22' }));

        this._createNavPanel();

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
        const classKey = this.scene.classKey;
        const slotConfig = {
            sage: { q: 'fireball', w: 'shield', e: 'heal', r: 'meteor' },
            alchemist: { q: 'acid_flask', w: 'toxic_puddle', e: 'burrow', r: 'chemical_cloud' },
            angel: { q: 'soul_strike', w: 'holy_shield', e: 'holy_nova', r: 'divine_blessing' }
        };
        const sc = slotConfig[classKey] || slotConfig.sage;
        const spellKeys = [sc.q, sc.w, sc.e, sc.r];
        const slotLabels = ['Q', 'W', 'E', 'R'];
        const slotColors = [0x555555, 0x555555, 0x555555, 0x555555];

        const iconMap = {
            fireball: 'icon_fireball', shield: 'icon_shield', heal: 'icon_heal',
            acid_flask: 'icon_acid_flask', toxic_puddle: 'icon_toxic_puddle', burrow: 'icon_burrow',
            soul_strike: 'icon_soul_strike', holy_shield: 'icon_holy_shield', holy_nova: 'icon_holy_nova',
            meteor: 'icon_meteor', chemical_cloud: 'icon_chemical_cloud', divine_blessing: 'icon_divine_blessing'
        };

        const savedPos = this._loadSpellSlotPositions();
        const defaultSlotY = 565;

        spellKeys.forEach((key, i) => {
            const saved = savedPos && savedPos[i];
            const sx2 = saved ? saved.x : 640 + i * 32;
            const sy = saved ? saved.y : defaultSlotY;
            const bg = this.scene.add.rectangle(sx2, sy, 28, 28, 0x1a1a2e)
                .setStrokeStyle(2, slotColors[i])
                .setScrollFactor(0).setDepth(24);
            const icon = this.scene.add.sprite(sx2, sy, iconMap[key] || 'icon_fireball').setScale(1.2)
                .setScrollFactor(0).setDepth(25);
            const keyLbl = this.scene.add.text(sx2, sy - 16, slotLabels[i], {
                fontSize: '8px', fill: '#aaa', fontFamily: 'Arial', fontStyle: 'bold'
            }).setOrigin(0.5).setScrollFactor(0).setDepth(26);
            const cd = this.scene.add.text(sx2, sy + 9, '', {
                fontSize: '8px', fill: '#f39c12', fontFamily: 'Arial'
            }).setOrigin(0.5).setScrollFactor(0).setDepth(25);
            this.scene.spellSlots[key] = { bg, icon, keyLbl, cd, index: i };

            bg.setInteractive({ useHandCursor: true, draggable: true });
            this.scene.input.setDraggable(bg);

            bg.on('dragstart', () => {
                bg.setStrokeStyle(2, 0xf1c40f);
                bg.setFillStyle(0x2a2a4e);
            });

            bg.on('drag', (pointer, dragX, dragY) => {
                bg.x = dragX;
                bg.y = dragY;
                icon.x = dragX;
                icon.y = dragY;
                keyLbl.x = dragX;
                keyLbl.y = dragY - 16;
                cd.x = dragX;
                cd.y = dragY + 9;
            });

            bg.on('dragend', () => {
                bg.setStrokeStyle(2, slotColors[i]);
                bg.setFillStyle(0x1a1a2e);
                this._saveSpellSlotPositions();
            });

            bg.on('pointerover', () => {
                if (!this.scene.tooltipText) {
                    this.scene.tooltipText = this.scene.add.text(0, 0, '', {
                        fontSize: '9px', fill: '#fff', fontFamily: 'Arial',
                        backgroundColor: '#1a1a2e', padding: { x: 6, y: 4 },
                        stroke: '#000', strokeThickness: 1, wordWrap: { width: 180 }
                    }).setScrollFactor(0).setDepth(100).setAlpha(0.95);
                }
                const spellDef = SPELLS[key];
                if (spellDef) {
                    const name = spellDef.nameRu || spellDef.name;
                    const desc = spellDef.description || '';
                    const cdStr = spellDef.cooldown ? spellDef.cooldown + 's CD' : '';
                    const dmg = spellDef.damage ? spellDef.damage + ' DMG' : '';
                    const heal = spellDef.healPercent ? 'Heal ' + Math.floor(spellDef.healPercent * 100) + '%' : '';
                    const lines = [name];
                    if (cdStr) lines.push(cdStr);
                    if (dmg) lines.push(dmg);
                    if (heal) lines.push(heal);
                    if (desc) lines.push(desc);
                    this.scene.tooltipText.setText(lines.join('\n'));
                } else {
                    this.scene.tooltipText.setText(key);
                }
                const tx = Math.min(sx2 - 90, 600);
                const ty = sy - 60;
                this.scene.tooltipText.setPosition(tx, ty).setVisible(true);
            });
            bg.on('pointerout', () => {
                if (this.scene.tooltipText) this.scene.tooltipText.setVisible(false);
            });
        });

        const fx = 640 + 4 * 32;
        const fy = 565;
        const consBg = this.scene.add.rectangle(fx, fy, 28, 28, 0x1a1a2e)
            .setStrokeStyle(2, 0xf39c12)
            .setScrollFactor(0).setDepth(24);
        const consLbl = this.scene.add.text(fx, fy - 2, 'F', {
            fontSize: '10px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(25);
        const consIcon = this.scene.add.sprite(fx, fy - 1, 'potion_heal_small').setScale(1.4)
            .setScrollFactor(0).setDepth(25).setVisible(false);
        const consName = this.scene.add.text(fx, fy + 11, '', {
            fontSize: '5px', fill: '#f39c12', fontFamily: 'Arial'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(25);
        this.scene.consumableSlot = { bg: consBg, lbl: consLbl, icon: consIcon, name: consName };

        consBg.setInteractive({ useHandCursor: true });
        consBg.on('pointerdown', () => {
            if (this.scene.playerSys) this.scene.playerSys.useConsumable();
        });
    }

    _toggleMute() {
        const m = toggleMute();
        this.scene.muteText.setText(m ? 'MUTE' : 'SOUND');
        this.scene.muteText.setColor(m ? '#e74c3c' : '#27ae60');
    }

    _createNavPanel() {
        const s = (el) => { el.setScrollFactor(0).setDepth(21); return el; };
        const navBtns = [];
        const startX = 14;
        const startY = 100;
        const gap = 22;

        const navItems = [
            { icon: 'nav_quest', label: 'Q', cb: () => this.scene._openQuestLog(), key: 'nKey' },
            { icon: 'nav_book', label: 'B', cb: () => this.scene._openBestiary(), key: 'bKey' },
            { icon: 'nav_hammer', label: 'C', cb: () => this.scene._openCrafting(), key: 'cKey' },
            { icon: 'nav_star', label: 'T', cb: () => this.scene._openTalentTree(), key: 'tKey' },
            { icon: 'nav_paw', label: 'P', cb: () => { this.scene.scene.launch('Pet', { returnScene: 'Game' }); this.scene.scene.pause(); } },
            { icon: 'nav_sound', label: 'M', cb: () => this._toggleMute() },
        ];

        const bg = s(this.scene.add.rectangle(startX + 10, startY + (navItems.length * gap) / 2 - gap / 2 + 4, 24, navItems.length * gap + 4, 0x0a0a1a, 0.75)
            .setStrokeStyle(1, 0x333333));
        navBtns.push(bg);

        navItems.forEach((item, i) => {
            const y = startY + i * gap;
            const btnBg = s(this.scene.add.rectangle(startX + 10, y, 20, 20, 0x1a1a2e)
                .setStrokeStyle(1, 0x444444));
            const icon = s(this.scene.add.sprite(startX + 10, y, item.icon).setScale(1));
            navBtns.push(btnBg, icon);

            btnBg.setInteractive({ useHandCursor: true });
            btnBg.on('pointerover', () => {
                btnBg.setStrokeStyle(2, 0xf1c40f);
                btnBg.setFillStyle(0x2a2a4e);
            });
            btnBg.on('pointerout', () => {
                btnBg.setStrokeStyle(1, 0x444444);
                btnBg.setFillStyle(0x1a1a2e);
            });
            btnBg.on('pointerdown', () => {
                if (!this.scene.menuOpen && !this.scene.transitioning) {
                    item.cb();
                }
            });
        });

        this.scene.navBtns = navBtns;
    }

    _loadSpellSlotPositions() {
        try {
            const json = localStorage.getItem(SPELL_SLOT_STORAGE_KEY);
            if (json) return JSON.parse(json);
        } catch (e) {}
        return null;
    }

    _saveSpellSlotPositions() {
        try {
            const positions = [];
            const slotConfig = {
                sage: { q: 'fireball', w: 'shield', e: 'heal', r: 'meteor' },
                alchemist: { q: 'acid_flask', w: 'toxic_puddle', e: 'burrow', r: 'chemical_cloud' },
                angel: { q: 'soul_strike', w: 'holy_shield', e: 'holy_nova', r: 'divine_blessing' }
            };
            const sc = slotConfig[this.scene.classKey] || slotConfig.sage;
            const keys = [sc.q, sc.w, sc.e, sc.r];
            keys.forEach((key, i) => {
                const slot = this.scene.spellSlots[key];
                if (slot) {
                    positions[i] = { x: Math.round(slot.bg.x), y: Math.round(slot.bg.y) };
                }
            });
            localStorage.setItem(SPELL_SLOT_STORAGE_KEY, JSON.stringify(positions));
        } catch (e) {}
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
            lockedBranches: this.scene.lockedBranches || [],
            playerGold: this.scene.gold || 0,
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

    _openSpellAssign() {
        if (this.scene.menuOpen || this.scene.transitioning) return;
        this.scene.menuOpen = true;

        const cls = this.scene.classKey;
        const allSpells = {
            sage: ['fireball', 'shield', 'heal', 'meteor'],
            alchemist: ['acid_flask', 'toxic_puddle', 'burrow', 'chemical_cloud'],
            angel: ['soul_strike', 'holy_shield', 'holy_nova', 'divine_blessing']
        };
        const available = allSpells[cls] || allSpells.sage;
        const assignments = { ...(this.scene.spellAssignments || {}) };
        const defaults = {
            sage: { q: 'fireball', w: 'shield', e: 'heal', r: 'meteor' },
            alchemist: { q: 'acid_flask', w: 'toxic_puddle', e: 'burrow', r: 'chemical_cloud' },
            angel: { q: 'soul_strike', w: 'holy_shield', e: 'holy_nova', r: 'divine_blessing' }
        };
        const d = defaults[cls] || defaults.sage;
        if (!assignments.q) assignments.q = d.q;
        if (!assignments.w) assignments.w = d.w;
        if (!assignments.e) assignments.e = d.e;
        if (!assignments.r) assignments.r = d.r;

        const iconMap = {
            fireball: 'icon_fireball', shield: 'icon_shield', heal: 'icon_heal',
            acid_flask: 'icon_acid_flask', toxic_puddle: 'icon_toxic_puddle', burrow: 'icon_burrow',
            soul_strike: 'icon_soul_strike', holy_shield: 'icon_holy_shield', holy_nova: 'icon_holy_nova',
            meteor: 'icon_meteor', chemical_cloud: 'icon_chemical_cloud', divine_blessing: 'icon_divine_blessing'
        };

        const container = this.scene.add.container(0, 0).setScrollFactor(0).setDepth(90);
        const overlay = this.scene.add.rectangle(400, 300, 800, 600, 0x000000, 0.7).setScrollFactor(0).setDepth(90);
        overlay.setInteractive();
        container.add(overlay);

        const title = this.scene.add.text(400, 80, 'SPELL ASSIGNMENT', {
            fontSize: '14px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(91);
        container.add(title);

        const slotKeys = ['q', 'w', 'e', 'r'];
        const slotLabels = ['Q', 'W', 'E', 'R'];
        const slotX = [300, 360, 420, 480];
        const slotY = 140;
        let selectedSlot = null;
        const slotElements = [];

        slotKeys.forEach((sk, i) => {
            const bg = this.scene.add.rectangle(slotX[i], slotY, 40, 40, 0x1a1a2e)
                .setStrokeStyle(2, 0xf1c40f).setScrollFactor(0).setDepth(91);
            const icon = this.scene.add.sprite(slotX[i], slotY, iconMap[assignments[sk]] || 'icon_fireball')
                .setScale(1.5).setScrollFactor(0).setDepth(92);
            const lbl = this.scene.add.text(slotX[i], slotY - 28, slotLabels[i], {
                fontSize: '10px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold'
            }).setOrigin(0.5).setScrollFactor(0).setDepth(92);
            container.add([bg, icon, lbl]);
            slotElements.push({ bg, icon, lbl, key: sk });

            bg.setInteractive({ useHandCursor: true });
            bg.on('pointerdown', () => {
                if (selectedSlot) {
                    slotElements.forEach(s => s.bg.setStrokeStyle(2, 0xf1c40f));
                    selectedSlot.bg.setStrokeStyle(2, 0xf1c40f);
                }
                selectedSlot = slotElements[i];
                selectedSlot.bg.setStrokeStyle(2, 0xff0000);
            });
        });

        const spellElements = [];
        const spellY = 240;
        available.forEach((sp, i) => {
            const sx = 300 + (i % 4) * 60;
            const sy = spellY + Math.floor(i / 4) * 70;
            const bg = this.scene.add.rectangle(sx, sy, 44, 44, 0x1a1a2e)
                .setStrokeStyle(2, 0x555555).setScrollFactor(0).setDepth(91);
            const icon = this.scene.add.sprite(sx, sy, iconMap[sp] || 'icon_fireball')
                .setScale(1.6).setScrollFactor(0).setDepth(92);
            const name = SPELLS[sp] ? (SPELLS[sp].nameRu || SPELLS[sp].name) : sp;
            const nm = this.scene.add.text(sx, sy + 30, name, {
                fontSize: '7px', fill: '#aaa', fontFamily: 'Arial'
            }).setOrigin(0.5).setScrollFactor(0).setDepth(92);
            container.add([bg, icon, nm]);
            spellElements.push({ bg, icon, nm, key: sp });

            bg.setInteractive({ useHandCursor: true });
            bg.on('pointerdown', () => {
                if (selectedSlot) {
                    assignments[selectedSlot.key] = sp;
                    selectedSlot.icon.setTexture(iconMap[sp] || 'icon_fireball');
                    slotElements.forEach(s => s.bg.setStrokeStyle(2, 0xf1c40f));
                    selectedSlot = null;
                }
            });
        });

        const saveBtn = this.scene.add.rectangle(400, 420, 100, 30, 0x27ae60)
            .setStrokeStyle(2, 0x2ecc71).setScrollFactor(0).setDepth(91);
        const saveTxt = this.scene.add.text(400, 420, 'SAVE', {
            fontSize: '12px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(92);
        container.add([saveBtn, saveTxt]);

        const closeBtn = this.scene.add.rectangle(400, 460, 100, 30, 0x555555)
            .setStrokeStyle(2, 0x888888).setScrollFactor(0).setDepth(91);
        const closeTxt = this.scene.add.text(400, 460, 'CLOSE', {
            fontSize: '12px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5).setScrollFactor(0).setDepth(92);
        container.add([closeBtn, closeTxt]);

        const cleanup = () => {
            container.destroy();
            this.scene.menuOpen = false;
            this.scene.physics.resume();
        };

        saveBtn.setInteractive({ useHandCursor: true });
        saveBtn.on('pointerdown', () => {
            this.scene.spellAssignments = { ...assignments };
            const acc = loadAccount() || {};
            acc.spellAssignments = { ...(acc.spellAssignments || {}), [this.scene.classKey]: { ...assignments } };
            saveAccount(acc);
            cleanup();
        });

        closeBtn.setInteractive({ useHandCursor: true });
        closeBtn.on('pointerdown', () => {
            cleanup();
        });

        overlay.on('pointerdown', () => {});
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
        if (this.scene.diffText) this.scene.diffText.setColor(DIFF_COLORS[this.scene.difficulty] || '#f39c12');
        this.scene.talentText.setText(this.scene.talentPoints > 0 ? 'TALENTS: ' + this.scene.talentPoints + ' [T]' : '');
        if (this.scene.goldText) this.scene.goldText.setText('Gold: ' + (this.scene.gold || 0));
        if (this.scene.crystalText) this.scene.crystalText.setText('\u{1F48E} ' + (this.scene.crystals || 0));

        if (this.scene.petBtnText) {
            const eqPet = this.scene.equippedPet;
            this.scene.petBtnText.setText(eqPet ? '\u{1F43E} ' + (PET_DB.find(p => p.id === eqPet)?.name || eqPet) : '\u{1F43E} Pets');
        }

        if (this.scene.spellSlots) {
            ['fireball', 'shield', 'heal', 'purify', 'meteor', 'chemical_cloud', 'divine_blessing', 'acid_flask', 'iron_skin', 'healing_potion', 'life_link', 'soul_strike', 'toxic_puddle', 'burrow', 'holy_shield', 'holy_nova'].forEach(key => {
                const s = this.scene.spellSlots[key];
                if (!s) return;
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

        if (this.scene.consumableSlot) {
            const cs = this.scene.consumableSlot;
            const cons = this.scene.consumable;
            if (cons) {
                cs.icon.setTexture(cons.texKey || 'potion_heal_small').setVisible(true);
                cs.lbl.setVisible(false);
                const shortName = (cons.name || '').split(' ').slice(0, 2).join(' ');
                cs.name.setText(shortName);
                cs.bg.setStrokeStyle(2, 0x2ecc71);
            } else {
                cs.icon.setVisible(false);
                cs.lbl.setVisible(true);
                cs.name.setText('');
                cs.bg.setStrokeStyle(2, 0x555555);
            }
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
        this.inventory.toggleInventory();
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

        if (item.locked) {
            lines.push({ text: '\u{1F512} Locked', color: '#e74c3c', size: '10px', bold: true });
        }
        if (item.questItem) {
            lines.push({ text: '\u2605 Quest Item', color: '#f39c12', size: '10px', bold: true });
        }
        if (item.relic) {
            lines.push({ text: '\u2605 Relic', color: '#9b59b6', size: '10px', bold: true });
        }

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

        lines.push({ text: 'RMB=lock/unlock', color: '#555', size: '9px', bold: false });

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
        this.inventory.openInventory();
    }

    _drawEquippedPanel() {
        this.inventory._drawEquippedPanel();
    }

    _drawMaterialsPanel() {
        this.inventory._drawMaterialsPanel();
    }

    _drawEquipmentBagPanel() {
        this.inventory._drawEquipmentBagPanel();
    }

    _drawCloseButton() {
        this.inventory._drawCloseButton();
    }

    closeInventory() {
        this.inventory.closeInventory();
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

        this.scene.pauseGroup.push(mkPause(this.scene.add.rectangle(400, 300, 420, 300, 0x000000, 0.92)
            .setStrokeStyle(2, 0xf1c40f)));
        this.scene.pauseGroup.push(mkPause(this.scene.add.text(400, 185, t('pause.title'), {
            fontSize: '28px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5)));

        this.scene.pauseGroup.push(mkPause(this.scene.add.text(400, 215, this.scene.difficulty, {
            fontSize: '14px', fill: DIFF_COLORS[this.scene.difficulty] || '#f39c12', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5)));

        const resumeBg = mkPause(this.scene.add.rectangle(400, 235, 220, 38, 0x27ae60)
            .setStrokeStyle(2, lighten(0x27ae60, 0.3))
            .setInteractive({ useHandCursor: true }));
        const resumeLbl = mkPause(this.scene.add.text(400, 235, t('pause.resume'), {
            fontSize: '18px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5));
        resumeBg.on('pointerdown', () => this.closePause());
        resumeBg.on('pointerover', () => { resumeBg.setFillStyle(lighten(0x27ae60, 0.2)); resumeBg.setScale(1.05); resumeLbl.setScale(1.05); });
        resumeBg.on('pointerout', () => { resumeBg.setFillStyle(0x27ae60); resumeBg.setScale(1); resumeLbl.setScale(1); });
        this.scene.pauseGroup.push(resumeBg, resumeLbl);

        const makeSmallBtn = (x, y, text, color, cb) => {
            const bg = mkPause(this.scene.add.rectangle(x, y, 130, 28, color)
                .setStrokeStyle(1, lighten(color, 0.3))
                .setInteractive({ useHandCursor: true }));
            const lbl = mkPause(this.scene.add.text(x, y, text, {
                fontSize: '11px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
            }).setOrigin(0.5));
            bg.on('pointerdown', cb);
            bg.on('pointerover', () => { bg.setFillStyle(lighten(color, 0.2)); });
            bg.on('pointerout', () => { bg.setFillStyle(color); });
            this.scene.pauseGroup.push(bg, lbl);
        };

        makeSmallBtn(335, 280, t('pause.save'), 0x8e44ad, () => { this.scene.doSave(); this.closePause(); });
        makeSmallBtn(465, 280, t('pause.menu'), 0x2980b9, () => {
            this.scene.doSave();
            this.closePause();
            this.scene.scene.start('Menu');
        });

        makeSmallBtn(400, 320, t('adv.title'), 0x555577, () => {
            this.closePause();
            this._openPauseAdvanced();
        });
    }

    _openPauseAdvanced() {
        this.scene.menuOpen = true;
        this.scene.physics.pause();
        if (this.scene.enemies) this.scene.enemies.getChildren().forEach(e => { if (e.body) e.body.setVelocity(0); });
        if (this.scene.stumps) this.scene.stumps.getChildren().forEach(s => { if (s.body) s.body.setVelocity(0); });

        this.scene.pauseGroup = [];
        const mkPause = (el) => this._mkEl(el);

        this.scene.pauseGroup.push(mkPause(this.scene.add.rectangle(400, 300, 420, 340, 0x000000, 0.92)
            .setStrokeStyle(2, 0x555577)));
        this.scene.pauseGroup.push(mkPause(this.scene.add.text(400, 165, t('adv.title'), {
            fontSize: '22px', fill: '#aaa', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5)));

        const makeSmallBtn = (x, y, text, color, cb) => {
            const bg = mkPause(this.scene.add.rectangle(x, y, 130, 28, color)
                .setStrokeStyle(1, lighten(color, 0.3))
                .setInteractive({ useHandCursor: true }));
            const lbl = mkPause(this.scene.add.text(x, y, text, {
                fontSize: '11px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
            }).setOrigin(0.5));
            bg.on('pointerdown', cb);
            bg.on('pointerover', () => { bg.setFillStyle(lighten(color, 0.2)); });
            bg.on('pointerout', () => { bg.setFillStyle(color); });
            this.scene.pauseGroup.push(bg, lbl);
        };

        makeSmallBtn(335, 210, t('adv.talents'), 0x9b59b6, () => {
            this.closePause();
            this._openTalentTree();
        });
        makeSmallBtn(465, 210, t('adv.accountEquip'), 0xf39c12, () => {
            this.closePause();
            this._openAccountEquipOverlay();
        });

        makeSmallBtn(335, 255, t('pause.changeClass'), 0x1abc9c, () => {
            this.scene.doSave();
            this.closePause();
            this.scene.scene.start('ClassSelect');
        });
        makeSmallBtn(465, 255, t('pause.save'), 0x8e44ad, () => {
            this.scene.doSave();
            this.closePause();
        });

        makeSmallBtn(335, 300, t('keybind.controls'), 0x2980b9, () => {
            this.closePause();
            this.scene.scene.launch('Keybinds', { returnScene: 'Game' });
            this.scene.scene.pause();
        });

        makeSmallBtn(400, 345, t('pause.restart'), 0xe67e22, () => {
            this.scene.doSave();
            this.closePause();
            this.scene.scene.restart({ difficulty: this.scene.difficulty, classKey: this.scene.classKey });
        });

        makeSmallBtn(400, 385, t('pause.back'), 0x34495e, () => {
            this.closePause();
            this.openPause();
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
        this.accountEquip._openAccountEquipOverlay();
    }

    _closeAccountEquipOverlay() {
        this.accountEquip._closeAccountEquipOverlay();
    }

    _getAccountItemStatsText(item) {
        return this.accountEquip._getAccountItemStatsText(item);
    }
}
