import Phaser from 'phaser';
import { lighten } from '../utils.js';
import { getDisplayName } from '../auth.js';
import {
    createRoom, joinRoom, disconnect, isHost, getMyId,
    getPlayerNames, onPlayerJoin, onPlayerLeave
} from '../network.js';
import { t } from '../i18n.js';

export default class LobbyScene extends Phaser.Scene {
    constructor() {
        super('Lobby');
    }

    create() {
        this.cameras.main.setBackgroundColor('#0a0a1a');
        this._group = this.add.group();
        this._domInputs = [];
        this._roomCode = '';
        this._playersList = null;

        this._showMenu();
    }

    _add(obj) {
        this._group.add(obj);
        return obj;
    }

    _showMenu() {
        this._cleanup();
        this._status = 'menu';

        this._add(this.add.text(400, 60, t('mp.title'), {
            fontSize: '32px', fill: '#f1c40f', fontFamily: 'Georgia', fontStyle: 'bold'
        }).setOrigin(0.5));

        this._add(this.add.text(400, 100, t('mp.subtitle'), {
            fontSize: '14px', fill: '#7f8c8d', fontFamily: 'Arial'
        }).setOrigin(0.5));

        this._createField('name', 400, 170, getDisplayName() !== 'Guest' ? getDisplayName() : 'Your Name');

        this._errorText = this._add(this.add.text(400, 215, '', {
            fontSize: '13px', fill: '#e74c3c', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5));

        this._createBtn(400, 260, t('mp.create'), 0x27ae60, () => this._doCreate());
        this._createBtn(400, 310, t('mp.join'), 0x2980b9, () => this._showJoinUI());
        this._createBtn(400, 380, t('mp.back'), 0x555577, () => {
            this._cleanup();
            this.scene.start('Menu');
        });
    }

    _showJoinUI() {
        this._cleanup();
        this._status = 'joinUI';

        this._add(this.add.text(400, 60, t('mp.joinRoom'), {
            fontSize: '28px', fill: '#2980b9', fontFamily: 'Georgia', fontStyle: 'bold'
        }).setOrigin(0.5));

        this._createField('name', 400, 130, getDisplayName() !== 'Guest' ? getDisplayName() : 'Your Name');
        this._createField('code', 400, 200, 'CODE');

        this._errorText = this._add(this.add.text(400, 250, '', {
            fontSize: '13px', fill: '#e74c3c', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5));

        this._createBtn(400, 295, t('mp.connect'), 0x27ae60, () => this._doJoin());
        this._createBtn(400, 355, t('mp.back'), 0x555577, () => this._showMenu());
    }

    _showWaitingRoom() {
        this._cleanup();
        this._status = 'waiting';

        const hostMode = isHost();

        this._add(this.add.text(400, 50, hostMode ? t('mp.youAreHost') : t('mp.connected'), {
            fontSize: '28px', fill: hostMode ? '#f1c40f' : '#27ae60', fontFamily: 'Georgia', fontStyle: 'bold'
        }).setOrigin(0.5));

        this._add(this.add.text(400, 95, t('mp.roomCode') + ': ' + this._roomCode, {
            fontSize: '22px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 3
        }).setOrigin(0.5));

        if (hostMode) {
            this._add(this.add.text(400, 125, t('mp.shareCode'), {
                fontSize: '12px', fill: '#888', fontFamily: 'Arial'
            }).setOrigin(0.5));
        }

        this._add(this.add.text(400, 165, t('mp.players') + ':', {
            fontSize: '16px', fill: '#ecf0f1', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5));

        this._playersList = this._add(this.add.text(400, 195, t('mp.waiting'), {
            fontSize: '14px', fill: '#bdc3c7', fontFamily: 'Arial',
            wordWrap: { width: 350 }, align: 'center', lineSpacing: 6
        }).setOrigin(0.5, 0));

        this._createBtn(400, 400, t('mp.startGame'), 0x27ae60, () => this._startGame());
        this._createBtn(400, 450, t('mp.leave'), 0xc0392b, () => {
            disconnect();
            this._showMenu();
        });

        onPlayerJoin(() => this._updatePlayersList());
        onPlayerLeave(() => this._updatePlayersList());

        this._updatePlayersList();
    }

    _updatePlayersList() {
        if (!this._playersList || !this._playersList.active) return;
        const names = getPlayerNames();
        const ids = Object.keys(names);
        if (ids.length === 0) {
            this._playersList.setText(t('mp.waiting'));
            return;
        }
        const lines = ids.map((id, i) => {
            const me = id === getMyId();
            const name = names[id] || '???';
            return (i + 1) + '. ' + name + (me ? ' (you)' : '') + (isHost() && i === 0 ? ' ★' : '');
        });
        this._playersList.setText(lines.join('\n'));
    }

    _createField(key, x, y, placeholder) {
        const W = 300, H = 34;

        const bg = this._add(this.add.rectangle(x, y, W, H, 0x12121f).setStrokeStyle(1, 0x3a3a5c));

        const container = document.createElement('div');
        container.style.cssText = `
            position: absolute;
            left: ${this._getCanvasOffsetX() + x - W / 2}px;
            top: ${this._getCanvasOffsetY() + y - H / 2}px;
            width: ${W}px; height: ${H}px;
            background: #12121f; border: 1px solid #3a3a5c;
            display: flex; align-items: center; padding: 0 10px;
        `;

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = placeholder;
        input.maxLength = key === 'code' ? 4 : 20;
        input.style.cssText = `
            flex: 1; height: 100%;
            background: transparent !important; border: none !important; outline: none !important;
            color: #d0d0d0; font-family: Arial; font-size: 14px;
            caret-color: #f1c40f; padding: 0; margin: 0;
            text-transform: ${key === 'code' ? 'uppercase' : 'none'};
            letter-spacing: ${key === 'code' ? '8px' : 'normal'};
            text-align: center;
        `;
        container.appendChild(input);
        container.addEventListener('mouseenter', () => container.style.borderColor = '#5a5a8c');
        container.addEventListener('mouseleave', () => container.style.borderColor = '#3a3a5c');

        this.game.canvas.parentNode.appendChild(container);
        this['_' + key + 'Input'] = input;
        this._domInputs.push(container);
    }

    _getCanvasOffsetX() {
        return this.game.canvas.getBoundingClientRect().left - this.game.canvas.parentNode.getBoundingClientRect().left;
    }

    _getCanvasOffsetY() {
        return this.game.canvas.getBoundingClientRect().top - this.game.canvas.parentNode.getBoundingClientRect().top;
    }

    _createBtn(x, y, label, color, cb) {
        const bg = this._add(this.add.rectangle(x, y, 280, 40, color)
            .setStrokeStyle(2, lighten(color, 0.3))
            .setInteractive({ useHandCursor: true }));
        const txt = this._add(this.add.text(x, y, label, {
            fontSize: '16px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5));
        bg.on('pointerover', () => { bg.setFillStyle(lighten(color, 0.2)); bg.setScale(1.03); txt.setScale(1.03); });
        bg.on('pointerout', () => { bg.setFillStyle(color); bg.setScale(1); txt.setScale(1); });
        bg.on('pointerdown', cb);
    }

    async _doCreate() {
        const name = this._nameInput ? this._nameInput.value.trim() : '';
        if (!name) { this._showError(t('mp.enterName')); return; }
        try {
            this._roomCode = await createRoom(name);
            this._showWaitingRoom();
        } catch (e) {
            this._showError(t('mp.createError'));
        }
    }

    async _doJoin() {
        const name = this._nameInput ? this._nameInput.value.trim() : '';
        const code = this._codeInput ? this._codeInput.value.trim().toUpperCase() : '';
        if (!name) { this._showError(t('mp.enterName')); return; }
        if (code.length !== 4) { this._showError(t('mp.invalidCode')); return; }
        try {
            this._roomCode = code;
            await joinRoom(code, name);
            this._showWaitingRoom();
        } catch (e) {
            this._showError(t('mp.joinError'));
        }
    }

    _startGame() {
        this._cleanup();
        this.scene.start('Game', {
            difficulty: 'Normal',
            classKey: 'sage',
            multiplayer: true
        });
    }

    _showError(msg) {
        if (this._errorText && this._errorText.active) this._errorText.setText(msg);
    }

    _cleanup() {
        this._domInputs.forEach(el => { if (el.parentNode) el.parentNode.removeChild(el); });
        this._domInputs = [];
        if (this._group) {
            this._group.getChildren().forEach(obj => {
                if (obj && obj.destroy) obj.destroy();
            });
            this._group.clear();
        }
        this._errorText = null;
        this._playersList = null;
    }

    shutdown() {
        this._cleanup();
    }
}
