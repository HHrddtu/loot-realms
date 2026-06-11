import Phaser from 'phaser';
import { getTalentsForClass, canUnlock, TALENT_SCOPE, getClassBranches } from '../talents.js';
import { ACCOUNT_TALENTS, canUnlockAccountTalent, ACCOUNT_BRANCHES, getAccountTalentsByBranch } from '../accountTalents.js';
import { lighten } from '../utils.js';
import { getClassData } from '../classes.js';

const VIEW_TOP = 118;
const VIEW_BOTTOM = 545;
const NODESpacingY = 75;
const NODESpacingX = 130;

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

        this.menuBtn(120, 572, 'RESPEC', 0xc0392b, () => this._respec());
        this.menuBtn(400, 572, 'CLOSE', 0x34495e, () => this._close());
        this.menuBtn(680, 572, 'BACK', 0x2980b9, () => this._close());
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
    }

    _clearBranchTabs() {
        this.branchTabs.forEach(t => t.destroy());
        this.branchLabels.forEach(t => t.destroy());
        this.branchTabs = [];
        this.branchLabels = [];
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

            const tab = this.add.rectangle(x, 101, 88, 20, isActive ? branch.color : 0x1a1a2e)
                .setStrokeStyle(1, isActive ? lighten(branch.color, 0.3) : 0x333355)
                .setInteractive({ useHandCursor: true });

            const label = this.add.text(x, 101, branch.nameRu || branch.name, {
                fontSize: '10px', fill: isActive ? '#fff' : '#888', fontFamily: 'Arial', fontStyle: 'bold'
            }).setOrigin(0.5);

            tab.on('pointerdown', () => {
                this.activeBranch = i;
                this.scrollY = 0;
                this._drawCurrentBranch();
            });

            this.branchTabs.push(tab);
            this.branchLabels.push(label);
        });
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
    }

    _getCurrentUnlocked() {
        return this.activeTab === 'class' ? this.unlockedTalents : this.unlockedAccountTalents;
    }

    _getAccentColor() {
        if (this.activeTab === 'class') {
            const branch = this.classBranches[this.activeBranch];
            return branch ? branch.color : 0x9b59b6;
        } else {
            const branch = ACCOUNT_BRANCHES[this.activeBranch];
            return branch ? branch.color : 0xe67e22;
        }
    }

    _drawCurrentBranch() {
        this._clearNodes();
        this._buildBranchTabs();

        const talents = this._getCurrentTalents();
        const unlocked = this._getCurrentUnlocked();
        const points = this.activeTab === 'class' ? this.talentPoints : this.accountTalentPoints;
        const accentColor = this._getAccentColor();
        const canUnlockFn = this.activeTab === 'class' ? canUnlock : canUnlockAccountTalent;

        this.pointsText.setText(
            this.activeTab === 'class'
                ? 'Class Points: ' + this.talentPoints
                : 'Account Points: ' + this.accountTalentPoints + '  (Lv.' + this.accountLevel + ')'
        );

        this.lineGfx.clear();

        talents.forEach(talent => {
            const pos = this._getNodePos(talent);
            const screenY = pos.y + this.scrollY;
            const inView = screenY >= VIEW_TOP - 30 && screenY <= VIEW_BOTTOM + 30;
            if (!inView) return;

            talent.requires.forEach(reqId => {
                const req = talents.find(t => t.id === reqId);
                if (!req) return;
                const fromPos = this._getNodePos(req);
                const fromY = fromPos.y + this.scrollY;
                if (fromY < VIEW_TOP - 30 || fromY > VIEW_BOTTOM + 30) return;

                const isUnlocked = unlocked.includes(talent.id) && unlocked.includes(reqId);
                this.lineGfx.lineStyle(2, isUnlocked ? accentColor : 0x333355, isUnlocked ? 0.8 : 0.6);
                this.lineGfx.lineBetween(fromPos.x, fromY, pos.x, screenY);
            });
        });

        talents.forEach(talent => {
            const pos = this._getNodePos(talent);
            const screenY = pos.y + this.scrollY;
            if (screenY < VIEW_TOP - 30 || screenY > VIEW_BOTTOM + 30) return;

            const isUnlocked = unlocked.includes(talent.id);
            const isAvailable = canUnlockFn(talent.id, unlocked) && points > 0;

            let texKey = 'talent_node';
            if (isUnlocked) texKey = 'talent_node_unlocked';
            else if (isAvailable) texKey = 'talent_node_active';

            const node = this.add.sprite(pos.x, screenY, texKey)
                .setInteractive({ useHandCursor: isAvailable || isUnlocked });

            const accentHex = '#' + accentColor.toString(16).padStart(6, '0');
            const label = this.add.text(pos.x, screenY + 16, talent.nameRu || talent.name, {
                fontSize: '10px', fill: isUnlocked ? accentHex : (isAvailable ? '#f1c40f' : '#666'),
                fontFamily: 'Arial', fontStyle: 'bold',
                wordWrap: { width: 110 }, align: 'center'
            }).setOrigin(0.5, 0);

            if (isAvailable) {
                node.on('pointerover', () => {
                    node.setScale(1.2);
                    this._showTooltip(pos.x, screenY - 35, talent);
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
                    this._showTooltip(pos.x, screenY - 35, talent);
                });
                node.on('pointerout', () => {
                    this._hideTooltip();
                });
            }

            this.nodeSprites.push({ node, label, talent });
        });
    }

    _getNodePos(talent) {
        const centerX = 400;
        const startY = 140;
        const x = centerX + (talent.col - 0.5) * NODESpacingX;
        const y = startY + talent.row * NODESpacingY;
        return { x, y };
    }

    _setupScroll() {
        this.input.on('wheel', (pointer, gameObjects, dx, dy) => {
            if (pointer.y < VIEW_TOP || pointer.y > VIEW_BOTTOM) return;
            const talents = this._getCurrentTalents();
            const maxRow = Math.max(...talents.map(t => t.row), 0);
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
            const maxRow = Math.max(...talents.map(t => t.row), 0);
            const contentHeight = (maxRow + 1) * NODESpacingY + 80;
            const viewHeight = VIEW_BOTTOM - VIEW_TOP;
            const maxScroll = Math.max(0, contentHeight - viewHeight);

            const delta = pointer.y - dragStartY;
            this.scrollY = Phaser.Math.Clamp(dragStartScroll + delta, -maxScroll, 0);
            this._drawCurrentBranch();
        });

        this.input.on('pointerup', () => { dragging = false; });
    }

    _clearNodes() {
        this.nodeSprites.forEach(n => {
            if (n.node) n.node.destroy();
            if (n.label) n.label.destroy();
        });
        this.nodeSprites = [];
        this.lineGfx.clear();
        this._hideTooltip();
    }

    _showTooltip(x, y, talent) {
        this._hideTooltip();

        const w = 230, h = 100;
        const tx = Math.max(w / 2 + 10, Math.min(800 - w / 2 - 10, x));
        const ty = Math.max(h / 2 + 10, y);

        const accentColor = this._getAccentColor();
        const bg = this.add.rectangle(tx, ty, w, h, 0x0a0a1a, 0.95)
            .setStrokeStyle(1, accentColor).setDepth(200);
        const name = this.add.text(tx, ty - 32, talent.name, {
            fontSize: '14px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(200);
        const desc = this.add.text(tx, ty + 2, talent.description, {
            fontSize: '11px', fill: '#bdc3c7', fontFamily: 'Arial',
            wordWrap: { width: w - 20 }, align: 'center'
        }).setOrigin(0.5, 0).setDepth(200);

        const scope = this.add.text(tx, ty + 38, talent.scope === TALENT_SCOPE.ACCOUNT ? '[ACCOUNT]' : '[CLASS]', {
            fontSize: '9px', fill: '#666', fontFamily: 'Arial'
        }).setOrigin(0.5).setDepth(200);

        this.tooltipGroup.push(bg, name, desc, scope);
    }

    _hideTooltip() {
        this.tooltipGroup.forEach(e => e.destroy());
        this.tooltipGroup = [];
    }

    _unlockTalent(talent) {
        if (this.activeTab === 'class') {
            if (!canUnlock(talent.id, this.unlockedTalents)) return;
            if (this.talentPoints <= 0) return;
            this.unlockedTalents.push(talent.id);
            this.talentPoints--;
        } else {
            if (!canUnlockAccountTalent(talent.id, this.unlockedAccountTalents)) return;
            if (this.accountTalentPoints <= 0) return;
            this.unlockedAccountTalents.push(talent.id);
            this.accountTalentPoints--;
        }

        this.cameras.main.flash(200, 155, 89, 182);
        this._drawCurrentBranch();
    }

    _respec() {
        if (this.activeTab === 'class') {
            if (this.unlockedTalents.length === 0) return;
            const accountTalents = this.unlockedTalents.filter(id => {
                const t = this.classTalents.find(tal => tal.id === id);
                return t && t.scope === TALENT_SCOPE.ACCOUNT;
            });
            const classTalents = this.unlockedTalents.filter(id => {
                const t = this.classTalents.find(tal => tal.id === id);
                return t && t.scope === TALENT_SCOPE.CLASS;
            });
            this.talentPoints += classTalents.length;
            this.unlockedTalents = accountTalents;
        } else {
            if (this.unlockedAccountTalents.length === 0) return;
            const refunded = this.unlockedAccountTalents.length;
            this.accountTalentPoints += refunded;
            this.unlockedAccountTalents = [];
        }

        this.cameras.main.flash(200, 192, 57, 43);
        this._drawCurrentBranch();
    }

    _close() {
        this.registry.set('talentData', {
            unlockedTalents: this.unlockedTalents,
            talentPoints: this.talentPoints,
            unlockedAccountTalents: this.unlockedAccountTalents,
            accountTalentPoints: this.accountTalentPoints
        });
        this.scene.stop('TalentTree');
        this.scene.resume(this.returnScene);
    }

    menuBtn(x, y, text, color, cb) {
        const btn = this.add.rectangle(x, y, 120, 35, color)
            .setStrokeStyle(2, lighten(color, 0.3))
            .setInteractive({ useHandCursor: true });

        const lbl = this.add.text(x, y, text, {
            fontSize: '15px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
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
    }
}
