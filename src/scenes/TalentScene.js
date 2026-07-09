import Phaser from 'phaser';
import { getTalentsForClass, canUnlock, TALENT_SCOPE, getClassBranches, getTalentCost } from '../talents.js';
import { ACCOUNT_TALENTS, canUnlockAccountTalent, ACCOUNT_BRANCHES, getAccountTalentsByBranch } from '../accountTalents.js';
import { lighten } from '../utils.js';
import { getClassData } from '../classes.js';
import { t } from '../i18n.js';

const VIEW_TOP = 118;
const VIEW_BOTTOM = 545;
const NODESpacingY = 75;
const NODESpacingX = 130;
const LOOK_AHEAD = 3;

export default class TalentScene extends Phaser.Scene {
    constructor() {
        super('TalentTree');
    }

    init(data) {
        this.unlockedTalents = data.unlockedTalents || [];
        this.talentPoints = data.talentPoints || 0;
        this.classKey = data.classKey || 'sage';
        this.returnScene = data.returnScene || 'Game';
        this.unlockedAccountTalents = data.unlockedAccountTalents || [];
        this.accountTalentPoints = data.accountTalentPoints || 0;
        this.accountLevel = data.accountLevel || 1;
        this.lockedBranches = data.lockedBranches || [];
        this.playerGold = data.playerGold || 0;
    }

    create() {
        
        this.cameras.main.setBackgroundColor('#0a0a1a');
        this.nodeSprites = [];
        this.lineGfx = this.add.graphics();
        this.tooltipGroup = [];
        this.scrollY = 0;
        this.activeTab = 'class';
        this.activeBranch = 0;
        this.classTalents = getTalentsForClass(this.classKey);
        this.classBranches = getClassBranches(this.classKey);
        const cls = getClassData(this.classKey);

        this.add.text(400, 18, 'TALENT TREE', {
            fontSize: '22px', fill: '#f1c40f', fontFamily: 'Georgia', fontStyle: 'bold'
        }).setOrigin(0.5);

        this.classNameText = this.add.text(400, 40, (cls.name || this.classKey).toUpperCase(), {
            fontSize: '14px', fill: '#aaa', fontFamily: 'Arial'
        }).setOrigin(0.5);

        this._createTabs();
        this.branchTabs = [];
        this.branchLabels = [];
        this._buildBranchTabs();
        this._drawCurrentBranch();
        this._setupScroll();

        // lockBtn и respecBtn создаются в _drawCurrentBranch
        this.menuBtn(440, 572, 'CLOSE', 0x34495e, () => this._close());
        this.menuBtn(580, 572, 'BACK', 0x2980b9, () => this._close());
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _createTabs() {
        const tabY = 62;

        this.tabClass = this.add.rectangle(340, tabY, 110, 24, 0x9b59b6)
            .setStrokeStyle(1, 0xbb77dd).setInteractive({ useHandCursor: true });
        this.tabClassLabel = this.add.text(340, tabY, 'CLASS', {
            fontSize: '12px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5);

        this.tabAccount = this.add.rectangle(460, tabY, 110, 24, 0x34495e)
            .setStrokeStyle(1, 0x556677).setInteractive({ useHandCursor: true });
        this.tabAccountLabel = this.add.text(460, tabY, 'ACCOUNT', {
            fontSize: '12px', fill: '#aaa', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5);

        this.pointsText = this.add.text(400, 85, '', {
            fontSize: '12px', fill: '#ecf0f1', fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.tabClass.on('pointerdown', () => this._switchTab('class'));
        this.tabAccount.on('pointerdown', () => this._switchTab('account'));
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _clearBranchTabs() {
        this.branchTabs.forEach(t => t.destroy());
        this.branchLabels.forEach(t => t.destroy());
        this.branchTabs = [];
        this.branchLabels = [];
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _buildBranchTabs() {
        this._clearBranchTabs();

        const branches = this.activeTab === 'class' ? this.classBranches : ACCOUNT_BRANCHES;
        const count = branches.length;
        const spacing = 95;
        const totalWidth = count * spacing;
        const startX = 400 - totalWidth / 2 + spacing / 2;

        branches.forEach((branch, i) => {
            const x = startX + i * spacing;
            const isActive = i === this.activeBranch;
            const isLocked = this.activeTab === 'class' && this.lockedBranches.includes(branch.key);

            const tab = this.add.rectangle(x, 101, 88, 20, isLocked ? 0x444444 : (isActive ? branch.color : 0x1a1a2e))
                .setStrokeStyle(1, isLocked ? 0x666666 : (isActive ? lighten(branch.color, 0.3) : 0x333355))
                .setInteractive({ useHandCursor: !isLocked });

            const label = this.add.text(x, 101, (isLocked ? '🔒 ' : '') + (branch.nameRu || branch.name), {
                fontSize: '10px', fill: isLocked ? '#666' : (isActive ? '#fff' : '#888'), fontFamily: 'Arial', fontStyle: 'bold'
            }).setOrigin(0.5);

            if (!isLocked) {
                tab.on('pointerdown', () => {
                    this.activeBranch = i;
                    this.scrollY = 0;
                    this._drawCurrentBranch();
                });
            }

            this.branchTabs.push(tab);
            this.branchLabels.push(label);
        });
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _switchTab(tab) {
        if (this.activeTab === tab) return;
        this.activeTab = tab;
        this.activeBranch = 0;
        this.scrollY = 0;

        if (tab === 'class') {
            this.tabClass.setFillStyle(0x9b59b6);
            this.tabClassLabel.setColor('#fff');
            this.tabAccount.setFillStyle(0x34495e);
            this.tabAccountLabel.setColor('#aaa');
            const cls = getClassData(this.classKey);
            this.classNameText.setText((cls.name || this.classKey).toUpperCase());
        } else {
            this.tabAccount.setFillStyle(0xe67e22);
            this.tabAccountLabel.setColor('#fff');
            this.tabClass.setFillStyle(0x34495e);
            this.tabClassLabel.setColor('#aaa');
            this.classNameText.setText('ACCOUNT');
        }

        this._buildBranchTabs();
        this._drawCurrentBranch();
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _getCurrentTalents() {
        if (this.activeTab === 'class') {
            const branch = this.classBranches[this.activeBranch];
            if (!branch) return this.classTalents;
            return this.classTalents.filter(t => t.branch === branch.key);
        } else {
            const branch = ACCOUNT_BRANCHES[this.activeBranch];
            if (!branch) return ACCOUNT_TALENTS;
            return getAccountTalentsByBranch(branch.key);
        }
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _getCurrentUnlocked() {
        return this.activeTab === 'class' ? this.unlockedTalents : this.unlockedAccountTalents;
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _getAccentColor() {
        if (this.activeTab === 'class') {
            const branch = this.classBranches[this.activeBranch];
            return branch ? branch.color : 0x9b59b6;
        } else {
            const branch = ACCOUNT_BRANCHES[this.activeBranch];
            return branch ? branch.color : 0xe67e22;
        }
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _getVisibleTalents(talents, unlocked) {
        const available = talents.filter(t =>
            !unlocked.includes(t.id) && t.requires.every(req => unlocked.includes(req))
        );
        const availableIds = new Set(available.map(t => t.id));

        const visibleIds = new Set(unlocked);
        available.forEach(t => visibleIds.add(t.id));

        const ahead = [];
        const visited = new Set([...unlocked, ...available]);
        const queue = [...available];

        while (queue.length > 0 && ahead.length < LOOK_AHEAD) {
            const current = queue.shift();
            ahead.push(current);
            visibleIds.add(current.id);

            talents.forEach(t => {
                if (!visited.has(t.id) && t.requires.includes(current.id)) {
                    const allReqsMet = t.requires.every(req => unlocked.includes(req) || req === current.id);
                    if (allReqsMet) {
                        visited.add(t.id);
                        queue.push(t);
                    }
                }
            });
        }

        return talents.filter(t => visibleIds.has(t.id));
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _drawCurrentBranch() {
        this._clearNodes();
        this._buildBranchTabs();

        const talents = this._getCurrentTalents();
        const unlocked = this._getCurrentUnlocked();
        const points = this.activeTab === 'class' ? this.talentPoints : this.accountTalentPoints;
        const accentColor = this._getAccentColor();
        const canUnlockFn = this.activeTab === 'class' ? canUnlock : canUnlockAccountTalent;
        const isLocked = this.activeTab === 'class' && this.classBranches[this.activeBranch] &&
            this.lockedBranches.includes(this.classBranches[this.activeBranch].key);

        const visibleTalents = this._getVisibleTalents(talents, unlocked);

        this.pointsText.setText(
            this.activeTab === 'class'
                ? `Class Points: ${this.talentPoints}  |  Gold: ${this.playerGold}`
                : `Account Points: ${this.accountTalentPoints}  (Lv.${this.accountLevel})`
        );

        this.lineGfx.clear();

        const respecCost = this._calcRespecCost();
        // Удаляем старую кнопку, если она существует
        if (this.respecBtnObj) {
            this.respecBtnObj.btn.destroy();
            this.respecBtnObj.label.destroy();
        }
        
        // Создаем новую кнопку с правильной стоимостью
        this.respecBtnObj = this.menuBtn(160, 572, 'RESPEC', 0xc0392b, () => this._respec());
        this.respecBtnObj.label.setText(`RESPEC (${respecCost}g)`);
        this.respecBtn = this.respecBtnObj.btn;

        // Удаляем старую кнопку, если она существует
        if (this.lockBtnObj) {
            this.lockBtnObj.btn.destroy();
            this.lockBtnObj.label.destroy();
        }
        
        // Создаем новую кнопку с правильным текстом и функцией
        const isBranchLocked = this.activeTab === 'class' && this.classBranches[this.activeBranch] &&
            this.lockedBranches.includes(this.classBranches[this.activeBranch].key);
        const btnText = isBranchLocked ? 'UNLOCK' : 'LOCK';
        const btnColor = isBranchLocked ? 0x27ae60 : 0xe67e22;
        this.lockBtnObj = this.menuBtn(300, 572, btnText, btnColor, isBranchLocked ? () => this._unlockBranch() : () => this._lockBranch());
        this.lockBtn = this.lockBtnObj.btn;
        this.lockBtn.setVisible(this.activeTab === 'class');

        visibleTalents.forEach(talent => {
            const pos = this._getNodePos(talent);
            const screenY = pos.y + this.scrollY;
            const inView = screenY >= VIEW_TOP - 30 && screenY <= VIEW_BOTTOM + 30;
            if (!inView) return;

            talent.requires.forEach(reqId => {
                const req = visibleTalents.find(t => t.id === reqId);
                if (!req) return;
                const fromPos = this._getNodePos(req);
                const fromY = fromPos.y + this.scrollY;
                if (fromY < VIEW_TOP - 30 || fromY > VIEW_BOTTOM + 30) return;

                const isLineUnlocked = unlocked.includes(talent.id) && unlocked.includes(reqId);
                this.lineGfx.lineStyle(2, isLineUnlocked ? accentColor : 0x333355, isLineUnlocked ? 0.8 : 0.6);
                this.lineGfx.lineBetween(fromPos.x, fromY, pos.x, screenY);
            });
        });

        visibleTalents.forEach(talent => {
            const pos = this._getNodePos(talent);
            const screenY = pos.y + this.scrollY;
            if (screenY < VIEW_TOP - 30 || screenY > VIEW_BOTTOM + 30) return;

            const isUnlocked = unlocked.includes(talent.id);
            const cost = this.activeTab === 'class' ? getTalentCost(talent.row) : 1;
            const isAvailable = canUnlockFn(talent.id, unlocked) && points >= cost && !isLocked;

            let texKey = 'talent_node';
            if (isUnlocked) texKey = 'talent_node_unlocked';
            else if (isAvailable) texKey = 'talent_node_active';

            const node = this.add.sprite(pos.x, screenY, texKey)
                .setInteractive({ useHandCursor: isAvailable || isUnlocked });

            const accentHex = '#' + accentColor.toString(16).padStart(6, '0');
            const costText = isUnlocked ? '' : ` [${cost}]`;
            const label = this.add.text(pos.x, screenY + 16, (talent.nameRu || talent.name) + costText, {
                fontSize: '10px', fill: isUnlocked ? accentHex : (isAvailable ? '#f1c40f' : '#666'),
                fontFamily: 'Arial', fontStyle: 'bold',
                wordWrap: { width: 110 }, align: 'center'
            }).setOrigin(0.5, 0);

            if (isAvailable) {
                node.on('pointerover', () => {
                    node.setScale(1.2);
                    this._showTooltip(pos.x, screenY - 35, talent, cost);
                });
                node.on('pointerout', () => {
                    node.setScale(1);
                    this._hideTooltip();
                });
                node.on('pointerdown', () => {
                    this._unlockTalent(talent);
                });
            } else if (isUnlocked) {
                node.on('pointerover', () => {
                    this._showTooltip(pos.x, screenY - 35, talent, cost);
                });
                node.on('pointerout', () => {
                    this._hideTooltip();
                });
            }

            this.nodeSprites.push({ node, label, talent });
        });
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _getNodePos(talent) {
        const centerX = 400;
        const startY = 140;
        const x = centerX + (talent.col - 0.5) * NODESpacingX;
        const y = startY + talent.row * NODESpacingY;
        return { x, y };
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _setupScroll() {
        this.input.on('wheel', (pointer, gameObjects, dx, dy) => {
            if (pointer.y < VIEW_TOP || pointer.y > VIEW_BOTTOM) return;
            const talents = this._getCurrentTalents();
            const unlocked = this._getCurrentUnlocked();
            const visibleTalents = this._getVisibleTalents(talents, unlocked);
            const maxRow = Math.max(...visibleTalents.map(t => t.row), 0);
            const contentHeight = (maxRow + 1) * NODESpacingY + 80;
            const viewHeight = VIEW_BOTTOM - VIEW_TOP;
            const maxScroll = Math.max(0, contentHeight - viewHeight);

            this.scrollY = Phaser.Math.Clamp(this.scrollY - dy * 0.8, -maxScroll, 0);
            this._drawCurrentBranch();
        });

        let dragStartY = 0;
        let dragStartScroll = 0;
        let dragging = false;

        this.input.on('pointerdown', (pointer) => {
            if (pointer.y >= VIEW_TOP && pointer.y <= VIEW_BOTTOM) {
                dragStartY = pointer.y;
                dragStartScroll = this.scrollY;
                dragging = true;
            }
        });

        this.input.on('pointermove', (pointer) => {
            if (!dragging || !pointer.isDown) return;
            const talents = this._getCurrentTalents();
            const unlocked = this._getCurrentUnlocked();
            const visibleTalents = this._getVisibleTalents(talents, unlocked);
            const maxRow = Math.max(...visibleTalents.map(t => t.row), 0);
            const contentHeight = (maxRow + 1) * NODESpacingY + 80;
            const viewHeight = VIEW_BOTTOM - VIEW_TOP;
            const maxScroll = Math.max(0, contentHeight - viewHeight);

            const delta = pointer.y - dragStartY;
            this.scrollY = Phaser.Math.Clamp(dragStartScroll + delta, -maxScroll, 0);
            this._drawCurrentBranch();
        });

        this.input.on('pointerup', () => { dragging = false; });
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _clearNodes() {
        this.nodeSprites.forEach(n => {
            if (n.node) n.node.destroy();
            if (n.label) n.label.destroy();
        });
        this.nodeSprites = [];
        this.lineGfx.clear();
        this._hideTooltip();
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _showTooltip(x, y, talent, cost) {
        this._hideTooltip();

        const w = 240, h = 110;
        const tx = Math.max(w / 2 + 10, Math.min(800 - w / 2 - 10, x));
        const ty = Math.max(h / 2 + 10, y);

        const accentColor = this._getAccentColor();
        const bg = this.add.rectangle(tx, ty, w, h, 0x0a0a1a, 0.95)
            .setStrokeStyle(1, accentColor).setDepth(200);
        const name = this.add.text(tx, ty - 38, talent.nameRu || talent.name, {
            fontSize: '14px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(200);
        const costLabel = this.add.text(tx, ty - 20, `Cost: ${cost} point${cost > 1 ? 's' : ''}`, {
            fontSize: '10px', fill: '#e67e22', fontFamily: 'Arial'
        }).setOrigin(0.5).setDepth(200);
        const desc = this.add.text(tx, ty + 4, talent.description, {
            fontSize: '11px', fill: '#bdc3c7', fontFamily: 'Arial',
            wordWrap: { width: w - 20 }, align: 'center'
        }).setOrigin(0.5, 0).setDepth(200);

        const scope = this.add.text(tx, ty + 48, talent.scope === TALENT_SCOPE.ACCOUNT ? '[ACCOUNT]' : '[CLASS]', {
            fontSize: '9px', fill: '#666', fontFamily: 'Arial'
        }).setOrigin(0.5).setDepth(200);

        this.tooltipGroup.push(bg, name, costLabel, desc, scope);
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _hideTooltip() {
        this.tooltipGroup.forEach(e => e.destroy());
        this.tooltipGroup = [];
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _unlockTalent(talent) {
        const cost = this.activeTab === 'class' ? getTalentCost(talent.row) : 1;

        if (this.activeTab === 'class') {
            if (!canUnlock(talent.id, this.unlockedTalents)) return;
            if (this.talentPoints < cost) return;
            this.unlockedTalents.push(talent.id);
            this.talentPoints -= cost;
        } else {
            if (!canUnlockAccountTalent(talent.id, this.unlockedAccountTalents)) return;
            if (this.accountTalentPoints < cost) return;
            this.unlockedAccountTalents.push(talent.id);
            this.accountTalentPoints -= cost;
        }

        this.cameras.main.flash(200, 155, 89, 182);
        this._drawCurrentBranch();
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _calcRespecCost() {
        const unlocked = this.activeTab === 'class' ? this.unlockedTalents : this.unlockedAccountTalents;
        const talents = this.activeTab === 'class' ? this.classTalents : ACCOUNT_TALENTS;
        let totalSpent = 0;
        unlocked.forEach(id => {
            const t = talents.find(tal => tal.id === id);
            if (t) {
                totalSpent += this.activeTab === 'class' ? getTalentCost(t.row) : 1;
            }
        });
        const levelMult = 1 + (this.accountLevel - 1) * 0.1;
        return Math.ceil(totalSpent * levelMult * 5);
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _respec() {
        const cost = this._calcRespecCost();

        if (this.activeTab === 'class') {
            if (this.unlockedTalents.length === 0) return;
            if (this.playerGold < cost) return;
            this.playerGold -= cost;

            let refund = 0;
            this.unlockedTalents.forEach(id => {
                const t = this.classTalents.find(tal => tal.id === id);
                if (t) refund += getTalentCost(t.row);
            });
            this.talentPoints += refund;
            this.unlockedTalents = this.unlockedTalents.filter(id => {
                const t = this.classTalents.find(tal => tal.id === id);
                return t && t.scope === TALENT_SCOPE.ACCOUNT;
            });
        } else {
            if (this.unlockedAccountTalents.length === 0) return;
            if (this.playerGold < cost) return;
            this.playerGold -= cost;
            this.accountTalentPoints += this.unlockedAccountTalents.length;
            this.unlockedAccountTalents = [];
        }

        this.cameras.main.flash(200, 192, 57, 43);
        this._drawCurrentBranch();
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _lockBranch() {
        if (this.activeTab !== 'class') return;
        const branch = this.classBranches[this.activeBranch];
        if (!branch || this.lockedBranches.includes(branch.key)) return;

        const branchTalents = this.classTalents.filter(t => t.branch === branch.key);
        let refund = 0;
        branchTalents.forEach(t => {
            if (this.unlockedTalents.includes(t.id)) {
                refund += getTalentCost(t.row);
            }
        });

        this.unlockedTalents = this.unlockedTalents.filter(id => {
            const t = this.classTalents.find(tal => tal.id === id);
            return t && t.branch !== branch.key;
        });
        this.talentPoints += refund;
        this.lockedBranches.push(branch.key);

        this.cameras.main.flash(200, 230, 126, 34);
        this._drawCurrentBranch();
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _unlockBranch() {
        if (this.activeTab !== 'class') return;
        const branch = this.classBranches[this.activeBranch];
        if (!branch || !this.lockedBranches.includes(branch.key)) return;

        // Удаляем ветку из списка заблокированных
        this.lockedBranches = this.lockedBranches.filter(key => key !== branch.key);
        
        // Визуальный эффект
        this.cameras.main.flash(200, 34, 126, 230);
        this._drawCurrentBranch();
    
        this.events.on('shutdown', () => { this.tweens.killAll(); });

    }

    _close() {
        this.registry.set('talentData', {
            unlockedTalents: this.unlockedTalents,
            talentPoints: this.talentPoints,
            unlockedAccountTalents: this.unlockedAccountTalents,
            accountTalentPoints: this.accountTalentPoints,
            lockedBranches: this.lockedBranches
        });
        const gs2 = this.scene.get(this.returnScene);1
        if (gs2) { gs2.menuOpen = false; gs2.physics.resume(); }
        this.scene.wake(this.returnScene);
    }

    menuBtn(x, y, text, color, cb) {
        const btn = this.add.rectangle(x, y, 130, 35, color)
            .setStrokeStyle(2, lighten(color, 0.3))
            .setInteractive({ useHandCursor: true });

        const lbl = this.add.text(x, y, text, {
            fontSize: '13px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5);

        btn.on('pointerover', () => {
            btn.setFillStyle(lighten(color, 0.2));
            btn.setScale(1.05);
            lbl.setScale(1.05);
        });
        btn.on('pointerout', () => {
            btn.setFillStyle(color);
            btn.setScale(1);
            lbl.setScale(1);
        });
        btn.on('pointerdown', cb);

        return { label: lbl, btn };
    }
}
