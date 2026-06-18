import Phaser from 'phaser';
import { lighten } from '../utils.js';
import {
    KEYBIND_ACTIONS, CATEGORY_ORDER, CATEGORY_LABELS,
    getKeybinds, setKeybind, resetKeybinds, getKeyLabel, invalidateCache
} from '../keybinds.js';
import { t } from '../i18n.js';

const MONITOR_KEYS = [
    'A','B','C','D','E','F','G','H','I','J','K','L','M',
    'N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
    'ONE','TWO','THREE','FOUR','FIVE','SIX','SEVEN','EIGHT','NINE','ZERO',
    'SPACE','SHIFT','CTRL','ALT','TAB','ENTER','BACKSPACE','ESC',
    'UP','DOWN','LEFT','RIGHT',
    'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12',
    'MINUS','EQUALS','OPENBRACKET','CLOSEBRACKET','BACKSLASH',
    'SEMICOLON','QUOTE','COMMA','PERIOD','FORWARDSLASH',
    'NUMPAD_ONE','NUMPAD_TWO','NUMPAD_THREE','NUMPAD_FOUR','NUMPAD_FIVE',
    'NUMPAD_SIX','NUMPAD_SEVEN','NUMPAD_EIGHT','NUMPAD_NINE','NUMPAD_ZERO',
    'NUMPAD_ADD','NUMPAD_SUBTRACT','NUMPAD_MULTIPLY','NUMPAD_DIVIDE','NUMPAD_DECIMAL',
];

const KEY_DISPLAY = {
    'ONE': '1', 'TWO': '2', 'THREE': '3', 'FOUR': '4', 'FIVE': '5',
    'SIX': '6', 'SEVEN': '7', 'EIGHT': '8', 'NINE': '9', 'ZERO': '0',
    'MINUS': '-', 'EQUALS': '=', 'OPENBRACKET': '[', 'CLOSEBRACKET': ']',
    'BACKSLASH': '\\', 'SEMICOLON': ';', 'QUOTE': "'", 'COMMA': ',',
    'PERIOD': '.', 'FORWARDSLASH': '/',
};

export default class KeybindScene extends Phaser.Scene {
    constructor() {
        super('Keybinds');
    }

    init(data) {
        this.returnScene = data.returnScene || 'Game';
    }

    create() {
        this.cameras.main.setBackgroundColor('#0a0a1a');
        this.binds = { ...getKeybinds() };
        this.listeningFor = null;
        this.rowElements = [];
        this.scrollY = 0;
        this._prevScrollY = 0;
        this.maxScroll = 0;

        this.add.text(400, 22, t('keybind.title'), {
            fontSize: '24px', fill: '#f1c40f', fontFamily: 'Georgia', fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(400, 48, t('keybind.hint'), {
            fontSize: '11px', fill: '#666', fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.listenText = this.add.text(400, 565, '', {
            fontSize: '13px', fill: '#f39c12', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setVisible(false);

        this.add.rectangle(400, 300, 700, 480, 0x0a0a1a, 0.95)
            .setStrokeStyle(1, 0x333);

        this.keyObjects = {};
        MONITOR_KEYS.forEach(k => {
            const code = Phaser.Input.Keyboard.KeyCodes[k];
            if (code !== undefined) {
                this.keyObjects[k] = this.input.keyboard.addKey(code);
            }
        });

        this.buildRows();

        const resetBtn = this.add.rectangle(300, 570, 140, 30, 0x555555)
            .setStrokeStyle(1, 0x888).setInteractive({ useHandCursor: true });
        this.add.text(300, 570, t('keybind.reset'), {
            fontSize: '12px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5);
        resetBtn.on('pointerdown', () => this.resetAll());
        resetBtn.on('pointerover', () => resetBtn.setFillStyle(0x666666));
        resetBtn.on('pointerout', () => resetBtn.setFillStyle(0x555555));

        const doneBtn = this.add.rectangle(500, 570, 140, 30, 0x27ae60)
            .setStrokeStyle(1, 0x2ecc71).setInteractive({ useHandCursor: true });
        this.add.text(500, 570, t('keybind.done'), {
            fontSize: '12px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5);
        doneBtn.on('pointerdown', () => this.saveAndClose());
        doneBtn.on('pointerover', () => doneBtn.setFillStyle(0x2ecc71));
        doneBtn.on('pointerout', () => doneBtn.setFillStyle(0x27ae60));

        this.input.on('wheel', (pointer, gameObjects, dx, dy) => {
            this.scrollY = Phaser.Math.Clamp(this.scrollY - dy * 0.5, -this.maxScroll, 0);
            this.applyScroll();
        });
    }

    update() {
        if (!this.listeningFor) return;

        const esc = this.keyObjects['ESC'];
        if (esc && Phaser.Input.Keyboard.JustDown(esc)) {
            this.cancelListening();
            return;
        }

        for (const [phaserName, keyObj] of Object.entries(this.keyObjects)) {
            if (Phaser.Input.Keyboard.JustDown(keyObj)) {
                this.acceptKey(phaserName);
                return;
            }
        }
    }

    acceptKey(phaserKeyName) {
        if (!this.listeningFor) return;

        const action = KEYBIND_ACTIONS.find(a => a.id === this.listeningFor);
        if (!action) return;

        if (phaserKeyName === 'ESC') {
            this.cancelListening();
            return;
        }

        const displayKey = KEY_DISPLAY[phaserKeyName] || phaserKeyName;

        const existingAction = Object.entries(this.binds).find(([id, k]) => k === phaserKeyName && id !== this.listeningFor);
        if (existingAction) {
            this.binds[existingAction[0]] = action.default;
        }

        this.binds[this.listeningFor] = phaserKeyName;

        if (this._listenBg) {
            this._listenBg.setFillStyle(0x1a1a2e);
            this._listenBg.setStrokeStyle(1, 0x27ae60);
        }
        if (this._listenLbl) {
            this._listenLbl.setText(displayKey);
            this._listenLbl.setColor('#2ecc71');
        }
        if (this._listenDefLbl) {
            this._listenDefLbl.setText(phaserKeyName === action.default ? '' : '(custom)');
        }

        this.listeningFor = null;
        this.listenText.setVisible(false);

        const bg = this._listenBg;
        const lbl = this._listenLbl;
        this.time.delayedCall(300, () => {
            if (bg) bg.setStrokeStyle(1, 0x444444);
            if (lbl) lbl.setColor('#e67e22');
        });
    }

    buildRows() {
        this.rowElements.forEach(e => e.destroy());
        this.rowElements = [];

        let y = 80;

        CATEGORY_ORDER.forEach(cat => {
            const catLabel = this.add.text(80, y, CATEGORY_LABELS[cat] || cat.toUpperCase(), {
                fontSize: '13px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold'
            });
            this.rowElements.push(catLabel);
            y += 26;

            KEYBIND_ACTIONS.filter(a => a.category === cat).forEach(action => {
                const label = this.add.text(100, y, action.label, {
                    fontSize: '12px', fill: '#ccc', fontFamily: 'Arial'
                });
                this.rowElements.push(label);

                const currentKey = this.binds[action.id] || action.default;
                const displayKey = KEY_DISPLAY[currentKey] || currentKey || '---';
                const isDefault = currentKey === action.default;

                const keyBg = this.add.rectangle(500, y + 6, 80, 22, 0x1a1a2e)
                    .setStrokeStyle(1, 0x444444)
                    .setInteractive({ useHandCursor: true });
                const keyLbl = this.add.text(500, y + 6, displayKey, {
                    fontSize: '11px', fill: '#e67e22', fontFamily: 'Arial', fontStyle: 'bold'
                }).setOrigin(0.5);
                this.rowElements.push(keyBg, keyLbl);

                const defLbl = this.add.text(570, y + 6, isDefault ? '' : '(custom)', {
                    fontSize: '9px', fill: '#666', fontFamily: 'Arial'
                }).setOrigin(0, 0.5);
                this.rowElements.push(defLbl);

                keyBg.on('pointerover', () => {
                    if (this.listeningFor !== action.id) {
                        keyBg.setFillStyle(0x2a2a4e);
                        keyBg.setStrokeStyle(2, 0xf1c40f);
                    }
                });
                keyBg.on('pointerout', () => {
                    if (this.listeningFor !== action.id) {
                        keyBg.setFillStyle(0x1a1a2e);
                        keyBg.setStrokeStyle(1, 0x444444);
                    }
                });
                keyBg.on('pointerdown', () => {
                    this.startListening(action.id, keyBg, keyLbl, defLbl);
                });

                y += 28;
            });
            y += 8;
        });

        this.maxScroll = Math.max(0, y - 520);
    }

    startListening(actionId, keyBg, keyLbl, defLbl) {
        if (this.listeningFor) {
            this.cancelListening();
        }
        this.listeningFor = actionId;
        this._listenBg = keyBg;
        this._listenLbl = keyLbl;
        this._listenDefLbl = defLbl;
        keyBg.setFillStyle(0x4a2a0a);
        keyBg.setStrokeStyle(2, 0xe74c3c);
        keyLbl.setText('...');
        keyLbl.setColor('#e74c3c');
        this.listenText.setText(t('keybind.pressKey')).setVisible(true);
    }

    cancelListening() {
        if (!this.listeningFor) return;
        const action = KEYBIND_ACTIONS.find(a => a.id === this.listeningFor);
        if (this._listenBg) {
            this._listenBg.setFillStyle(0x1a1a2e);
            this._listenBg.setStrokeStyle(1, 0x444444);
        }
        if (this._listenLbl) {
            const currentKey = this.binds[this.listeningFor] || '';
            const displayKey = KEY_DISPLAY[currentKey] || currentKey || '---';
            this._listenLbl.setText(displayKey);
            this._listenLbl.setColor('#e67e22');
        }
        this.listeningFor = null;
        this.listenText.setVisible(false);
    }

    applyScroll() {
        const delta = this.scrollY - this._prevScrollY;
        this.rowElements.forEach(e => {
            if (e.y !== undefined) {
                e.y += delta;
            }
        });
        this._prevScrollY = this.scrollY;
    }

    resetAll() {
        resetKeybinds();
        this.binds = { ...getKeybinds() };
        this.listeningFor = null;
        this.listenText.setVisible(false);
        this.rowElements.forEach(e => e.destroy());
        this.rowElements = [];
        this.scrollY = 0;
        this._prevScrollY = 0;
        this.buildRows();
    }

    saveAndClose() {
        Object.entries(this.binds).forEach(([id, key]) => {
            setKeybind(id, key);
        });
        invalidateCache();
        this.scene.stop();
        this.scene.resume(this.returnScene);
    }
}
