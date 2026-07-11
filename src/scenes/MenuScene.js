import Phaser from 'phaser';
import { RARITY_COLORS, EMPTY_ACCOUNT_EQUIPMENT } from '../config/index.js';
import { lighten } from '../utils.js';
import { hasSave, loadGame, deleteSave, hasAccount, loadAccount, getAccountLevelUpReq } from '../save.js';
import { t, getLang, setLang } from '../i18n.js';
import { getCurrentUser, getDisplayName, isAnonymous, logout } from '../auth.js';
import { syncAccountFromCloud } from '../save.js';
import { LORE } from '../config/lore.js';

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    create() {
        this.cameras.main.setBackgroundColor('#1a1408');
        this.overlayEls = [];

        if (getCurrentUser() && !isAnonymous()) {
            syncAccountFromCloud();
        }

        // Parchment background
        this.add.image(400, 300, 'parchment_bg');
        this.add.image(400, 300, 'ornate_border');

        // User info
        const userName = getDisplayName();
        const userTag = isAnonymous() ? ' (Guest)' : '';
        this.add.text(400, 40, '\u{1F464} ' + userName + userTag, {
            fontSize: '13px', fill: isAnonymous() ? '#888' : '#5c3a1e', fontFamily: 'Georgia, serif', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 1
        }).setOrigin(0.5);

        // Title
        this.titleText = this.add.text(400, 90, t('menu.title'), {
            fontSize: '48px', fill: '#5c3a1e', fontFamily: 'Georgia, serif', fontStyle: 'bold',
            stroke: '#3d2a14', strokeThickness: 2
        }).setOrigin(0.5);

        // Subtitle
        this.subtitleText = this.add.text(400, 135, t('menu.subtitle'), {
            fontSize: '18px', fill: '#8b4513', fontFamily: 'Georgia, serif'
        }).setOrigin(0.5);

        // Decorative line
        this.add.rectangle(400, 160, 300, 2, 0x8b4513);

        // Main buttons
        this.menuBtn(400, 210, t('menu.start'), 0x27ae60, () => {
            if (hasAccount()) {
                const acc = loadAccount();
                const sv = loadGame();
                this.scene.start('Game', {
                    difficulty: 'Normal',
                    classKey: (acc && acc.classKey) || (sv && sv.classKey) || 'sage'
                });
            } else {
                this.scene.start('ClassSelect');
            }
        }, 280, 50, '24px');

        this.menuBtn(400, 280, t('menu.multiplayer'), 0x8e44ad, () => {
            this.scene.start('Lobby');
        }, 200, 40, '18px');

        // Secondary buttons
        this.menuBtn(300, 340, t('menu.account'), 0x2980b9, () => this.showAccount(), 160, 35, '14px');
        this.menuBtn(500, 340, t('menu.advanced'), 0x555577, () => this.showAdvanced(), 160, 35, '14px');
        this.menuBtn(400, 380, 'Lore', 0x8e44ad, () => this.showLore(), 140, 30, '14px');

        // Logout
        this.menuBtn(400, 420, t('menu.logout'), 0xc0392b, async () => {
            await logout();
            this.scene.start('Login');
        }, 140, 30, '14px');

        // Version
        this.versionText = this.add.text(400, 460, t('menu.version'), {
            fontSize: '11px', fill: '#8b4513', fontFamily: 'Georgia, serif'
        }).setOrigin(0.5);
    }

    showAdvanced() {
        this.openOvl();
        this.ovlText(400, 70, t('adv.title'), {
            fontSize: '28px', fill: '#aaa', fontFamily: 'Georgia, serif', fontStyle: 'bold'
        });

        const acc = hasAccount();

        this.ovlText(400, 110, t('adv.difficulty') + ': Story', {
            fontSize: '14px', fill: '#27ae60', fontFamily: 'Georgia, serif', fontStyle: 'bold'
        });

        const langs = ['en', 'ru', 'de'];
        const langNames = { en: 'English', ru: 'Русский', de: 'Deutsch' };
        let langIdx = langs.indexOf(getLang());
        if (langIdx < 0) langIdx = 0;

        this.ovlText(400, 175, t('adv.language'), {
            fontSize: '14px', fill: '#ecf0f1', fontFamily: 'Georgia, serif', fontStyle: 'bold'
        });

        const langLabel = this.ovlText(400, 200, langNames[langs[langIdx]], {
            fontSize: '18px', fill: '#3498db', fontFamily: 'Georgia, serif'
        });

        const langLeft = this.add.rectangle(310, 200, 30, 28, 0x34495e)
            .setStrokeStyle(1, 0x556677).setInteractive({ useHandCursor: true });
        const langLeftLbl = this.add.text(310, 200, '<', {
            fontSize: '16px', fill: '#fff', fontFamily: 'Georgia, serif', fontStyle: 'bold'
        }).setOrigin(0.5);
        this.overlayEls.push(langLeft, langLeftLbl);

        const langRight = this.add.rectangle(490, 200, 30, 28, 0x34495e)
            .setStrokeStyle(1, 0x556677).setInteractive({ useHandCursor: true });
        const langRightLbl = this.add.text(490, 200, '>', {
            fontSize: '16px', fill: '#fff', fontFamily: 'Georgia, serif', fontStyle: 'bold'
        }).setOrigin(0.5);
        this.overlayEls.push(langRight, langRightLbl);

        langLeft.on('pointerdown', () => {
            langIdx = (langIdx + langs.length - 1) % langs.length;
            setLang(langs[langIdx]);
            langLabel.setText(langNames[langs[langIdx]]);
        });
        langRight.on('pointerdown', () => {
            langIdx = (langIdx + 1) % langs.length;
            setLang(langs[langIdx]);
            langLabel.setText(langNames[langs[langIdx]]);
        });

        const advBtns = [
            { t: t('adv.load'), c: 0x8e44ad, show: hasSave(), cb: () => {
                const sv = loadGame();
                this.scene.start('Game', {
                    difficulty: 'Normal',
                    classKey: sv ? sv.classKey || 'sage' : 'sage',
                    load: true
                });
            }},
            { t: t('adv.changeClass'), c: 0x1abc9c, show: acc, cb: () => {
                this.scene.start('ClassSelect');
            }},
            { t: t('adv.talents'), c: 0x9b59b6, show: acc, cb: () => {
                const a = loadAccount();
                this.scene.launch('TalentTree', {
                    unlockedTalents: [],
                    talentPoints: 0,
                    classKey: a ? a.classKey || 'sage' : 'sage',
                    unlockedAccountTalents: a ? a.unlockedAccountTalents || [] : [],
                    accountTalentPoints: a ? a.accountTalentPoints || 0 : 0,
                    accountLevel: a ? a.accountLevel || 1 : 1,
                    lockedBranches: a ? (a.lockedBranchesPerClass || {})[a.classKey || 'sage'] || [] : [],
                    playerGold: 0,
                    returnScene: 'Menu'
                });
                this.scene.pause();
            }},
            { t: t('adv.accountEquip'), c: 0xf39c12, show: acc, cb: () => this.showAccountEquip() },
            { t: t('keybind.controls'), c: 0x2980b9, show: true, cb: () => {
                this.scene.launch('Keybinds', { returnScene: 'Menu' });
                this.scene.pause();
            }},
            { t: t('adv.instructions'), c: 0x8e44ad, show: true, cb: () => this.showInstructions() },
            { t: t('adv.exit'), c: 0xc0392b, show: true, cb: () => this.showExit() }
        ];

        let btnY = 240;
        advBtns.forEach(b => {
            if (!b.show) return;
            const bg = this.add.rectangle(400, btnY, 200, 30, b.c)
                .setStrokeStyle(1, lighten(b.c, 0.3))
                .setInteractive({ useHandCursor: true });
            const lbl = this.add.text(400, btnY, b.t, {
                fontSize: '14px', fill: '#fff', fontFamily: 'Georgia, serif', fontStyle: 'bold'
            }).setOrigin(0.5);
            bg.on('pointerdown', b.cb);
            bg.on('pointerover', () => bg.setFillStyle(lighten(b.c, 0.2)));
            bg.on('pointerout', () => bg.setFillStyle(b.c));
            this.overlayEls.push(bg, lbl);
            btnY += 36;
        });

        this.ovlBtn(400, 480, t('adv.close'), 0x34495e, () => this.closeOverlay());
    }

    showLore() {
        this.openOvl();
        const lang = localStorage.getItem('game_lang') || 'en';

        this.ovlText(400, 50, 'LORE', {
            fontSize: '28px', fill: '#8b4513', fontFamily: 'Georgia, serif', fontStyle: 'bold'
        });

        // General lore
        const general = lang === 'ru' ? LORE.general.textRu : lang === 'de' ? LORE.general.textDe : LORE.general.text;
        this.ovlText(400, 100, general, {
            fontSize: '11px', fill: '#2c1810', fontFamily: 'Georgia', wordWrap: { width: 480 }, align: 'center', lineSpacing: 4
        });

        // Class lore
        let y = 180;
        Object.entries(LORE.classes).forEach(([key, cls]) => {
            const title = lang === 'ru' ? cls.nameRu : lang === 'de' ? cls.nameDe : cls.name;
            this.ovlText(400, y, title, {
                fontSize: '13px', fill: '#8b4513', fontFamily: 'Georgia', fontStyle: 'bold'
            });
            const text = lang === 'ru' ? cls.textRu : lang === 'de' ? cls.textDe : cls.text;
            this.ovlText(400, y + 18, text, {
                fontSize: '9px', fill: '#3a2a1a', fontFamily: 'Georgia', wordWrap: { width: 460 }, align: 'center'
            });
            y += 70;
        });

        this.ovlBtn(400, 560, t('adv.close'), 0x5a3d1a, () => this.closeOverlay());
    }

    menuBtn(x, y, text, color, cb, w, h, fontSize) {
        w = w || 260;
        h = h || 40;
        fontSize = fontSize || '20px';
        const btn = this.add.rectangle(x, y, w, h, color)
            .setStrokeStyle(2, lighten(color, 0.3))
            .setInteractive({ useHandCursor: true });

        const lbl = this.add.text(x, y, text, {
            fontSize: fontSize, fill: '#fff', fontFamily: 'Georgia, serif', fontStyle: 'bold'
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

    closeOverlay() {
        this.overlayEls.forEach(e => e.destroy());
        this.overlayEls = [];
    }

    ovlText(x, y, text, style) {
        const t = this.add.text(x, y, text, style).setOrigin(0.5);
        this.overlayEls.push(t);
        return t;
    }

    ovlBtn(x, y, text, color, cb) {
        const bg = this.add.rectangle(x, y, 120, 35, color)
            .setStrokeStyle(1, lighten(color, 0.3))
            .setInteractive({ useHandCursor: true });
        const lbl = this.add.text(x, y, text, {
            fontSize: '16px', fill: '#fff', fontFamily: 'Georgia, serif', fontStyle: 'bold'
        }).setOrigin(0.5);
        bg.on('pointerdown', cb);
        this.overlayEls.push(bg, lbl);
    }

    openOvl() {
        this.closeOverlay();
        // Parchment overlay
        this.overlayEls.push(
            this.add.image(400, 300, 'parchment_bg')
        );
        this.overlayEls.push(
            this.add.image(400, 300, 'ornate_border')
        );
    }

    showAccount() {
        this.openOvl();
        this.ovlText(400, 70, t('acc.title'), {
            fontSize: '28px', fill: '#f1c40f', fontFamily: 'Georgia, serif', fontStyle: 'bold'
        });

        const acc = loadAccount() || {};
        const save = loadGame() || {};

        const accLevel = acc.accountLevel || 1;
        const accExp = acc.accountExp || 0;
        const accReq = getAccountLevelUpReq(accLevel);
        const totalKills = acc.totalKills || 0;
        const totalStumps = acc.totalStumps || 0;
        const playTime = acc.playTime || 0;
        const mins = Math.floor(playTime / 60);

        this.ovlText(400, 110, t('acc.level') + ': ' + accLevel + '  (' + accExp + '/' + accReq + ' EXP)', {
            fontSize: '18px', fill: '#e67e22', fontFamily: 'Georgia, serif', fontStyle: 'bold'
        });

        const hi = acc.highestClassLevel || {};
        const classInfo = Object.keys(hi).length > 0
            ? Object.entries(hi).map(([k, v]) => k.charAt(0).toUpperCase() + k.slice(1) + ': Lv.' + v).join('  |  ')
            : t('acc.noClasses');
        this.ovlText(400, 140, classInfo, {
            fontSize: '14px', fill: '#9b59b6', fontFamily: 'Georgia, serif'
        });

        this.ovlText(400, 175, '---', { fontSize: '14px', fill: '#444', fontFamily: 'Georgia, serif' });
        this.ovlText(400, 200, t('acc.stats'), {
            fontSize: '16px', fill: '#ecf0f1', fontFamily: 'Georgia, serif', fontStyle: 'bold'
        });

        const stats = [
            t('acc.totalKills') + ': ' + totalKills,
            t('acc.totalStumps') + ': ' + totalStumps,
            t('acc.playTime') + ': ' + mins + ' min'
        ];
        stats.forEach((l, i) => {
            this.ovlText(400, 230 + i * 26, l, {
                fontSize: '15px', fill: '#bdc3c7', fontFamily: 'Georgia, serif'
            });
        });

        if (save.classKey) {
            this.ovlText(400, 320, '---', { fontSize: '14px', fill: '#444', fontFamily: 'Georgia, serif' });
            this.ovlText(400, 345, t('acc.lastSave'), {
                fontSize: '16px', fill: '#ecf0f1', fontFamily: 'Georgia, serif', fontStyle: 'bold'
            });
            const saveInfo = [
                t('acc.class') + ': ' + (save.classKey || 'none'),
                t('acc.level2') + ': ' + (save.playerLevel || 1),
                t('inv.hp') + ': ' + (save.playerHP || 100) + '/' + (save.playerMaxHP || 100),
                t('acc.totalKills') + ': ' + (save.kills || 0) + '  |  ' + t('acc.totalStumps') + ': ' + (save.stumpsBroken || 0)
            ];
            saveInfo.forEach((l, i) => {
                this.ovlText(400, 375 + i * 24, l, {
                    fontSize: '14px', fill: '#95a5a6', fontFamily: 'Georgia, serif'
                });
            });
        }

        this.ovlBtn(400, 470, t('adv.close'), 0x34495e, () => this.closeOverlay());
    }

    showAccountEquip() {
        if (!hasAccount()) {
            this.showNoClass();
            return;
        }
        this.openOvl();
        this.ovlText(400, 55, t('accEquip.title'), {
            fontSize: '24px', fill: '#f39c12', fontFamily: 'Georgia, serif', fontStyle: 'bold'
        });

        const acc = loadAccount() || {};
        const aePerClass = acc.accountEquipment || {};
        const classes = ['sage', 'alchemist', 'angel'];
        const classColors = { sage: '#f1c40f', alchemist: '#e67e22', angel: '#3498db' };
        const classNames = { sage: 'Sage', alchemist: 'Alchemist', angel: 'Angel' };
        const slots = ['hat', 'mantle', 'legs', 'weapon', 'accessory', 'ring', 'charm', 'relic'];
        const slotLabels = [t('accEquip.hat'), t('accEquip.mantle'), t('accEquip.legs'), t('accEquip.weapon'), t('accEquip.acc'), t('accEquip.ring'), t('accEquip.charm'), t('accEquip.relic')];

        let baseY = 85;
        classes.forEach(cls => {
            this.ovlText(400, baseY, classNames[cls], {
                fontSize: '15px', fill: classColors[cls], fontFamily: 'Georgia, serif', fontStyle: 'bold'
            });
            baseY += 20;

            const ae = aePerClass[cls] || { ...EMPTY_ACCOUNT_EQUIPMENT };
            let row = '';
            slots.forEach((slot, i) => {
                const item = ae[slot];
                row += slotLabels[i] + ': ' + (item ? item.name : '---') + '  ';
                if (i < slots.length - 1 && (i + 1) % 3 === 0) {
                    this.ovlText(400, baseY, row, { fontSize: '12px', fill: '#bbb', fontFamily: 'Georgia, serif' });
                    baseY += 18;
                    row = '';
                }
            });
            if (row) {
                this.ovlText(400, baseY, row, { fontSize: '12px', fill: '#bbb', fontFamily: 'Georgia, serif' });
                baseY += 18;
            }
            baseY += 8;
        });

        this.ovlBtn(400, 460, t('adv.close'), 0x34495e, () => this.closeOverlay());
    }

    _getAccountItemStatsText(item) {
        if (!item || !item.stats) return '';
        const s = item.stats;
        const parts = [];
        if (s.hpPercent) parts.push('+' + s.hpPercent + '% HP');
        if (s.damagePercent) parts.push('+' + s.damagePercent + '% DMG');
        if (s.speedPercent) parts.push('+' + s.speedPercent + '% SPD');
        if (s.spellPercent) parts.push('+' + s.spellPercent + '% Spell');
        if (s.critPercent) parts.push('+' + s.critPercent + '% Crit');
        if (s.dodgePercent) parts.push('+' + s.dodgePercent + '% Dodge');
        if (s.expPercent) parts.push('+' + s.expPercent + '% EXP');
        if (s.lootPercent) parts.push('+' + s.lootPercent + '% Loot');
        if (s.regenPercent) parts.push('+' + s.regenPercent + '% Regen');
        if (s.corruptionMax) parts.push('+' + s.corruptionMax + ' CorrMax');
        return parts.join(' ');
    }

    showInstructions() {
        this.openOvl();
        this.ovlText(400, 90, t('instr.title'), {
            fontSize: '28px', fill: '#8e44ad', fontFamily: 'Georgia, serif', fontStyle: 'bold'
        });

        const lines = [
            t('instr.controls'),
            t('instr.move'),
            t('instr.attack'),
            t('instr.inventory'),
            t('instr.pause'),
            t('instr.questLog'),
            '',
            t('instr.gameplay'),
            t('instr.killEnemies'),
            t('instr.breakStumps'),
            t('instr.materialSlots'),
            t('instr.levelUp')
        ];

        lines.forEach((l, i) => {
            this.ovlText(400, 140 + i * 26, l, {
                fontSize: '15px', fill: '#bdc3c7', fontFamily: 'Georgia, serif'
            });
        });

        this.ovlBtn(400, 470, t('adv.close'), 0x34495e, () => this.closeOverlay());
    }

    showExit() {
        this.openOvl();
        this.ovlText(400, 220, t('exit.title'), {
            fontSize: '28px', fill: '#e74c3c', fontFamily: 'Georgia, serif', fontStyle: 'bold'
        });
        this.ovlBtn(340, 330, t('exit.yes'), 0xc0392b, () => {
            this.closeOverlay();
            this.ovlText(400, 400, t('exit.msg'), {
                fontSize: '14px', fill: '#e74c3c', fontFamily: 'Georgia, serif'
            });
        });
        this.ovlBtn(460, 330, t('exit.no'), 0x27ae60, () => this.closeOverlay());
    }

    showNoClass() {
        this.openOvl();
        this.ovlText(400, 220, t('err.noClass'), {
            fontSize: '24px', fill: '#e74c3c', fontFamily: 'Georgia, serif', fontStyle: 'bold'
        });
        this.ovlText(400, 270, t('err.noClassMsg'), {
            fontSize: '14px', fill: '#bdc3c7', fontFamily: 'Georgia, serif'
        });
        this.ovlBtn(400, 350, t('adv.close'), 0x34495e, () => this.closeOverlay());
    }
}
