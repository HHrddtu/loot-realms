import Phaser from 'phaser';
import { lighten } from '../utils.js';
import { register, login, loginAsGuest } from '../auth.js';
import { t } from '../i18n.js';

export default class LoginScene extends Phaser.Scene {
    constructor() {
        super('Login');
    }

    create() {
        this.cameras.main.setBackgroundColor('#0a0a1a');
        this.elements = [];
        this._domInputs = [];
        this.errorText = null;

        this.add.text(400, 50, t('login.title'), {
            fontSize: '36px', fill: '#f1c40f', fontFamily: 'Georgia', fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add.text(400, 90, t('login.subtitle'), {
            fontSize: '14px', fill: '#7f8c8d', fontFamily: 'Arial'
        }).setOrigin(0.5);

        this._fields = [
            { key: 'name', y: 145, placeholder: 'Player Name', type: 'text' },
            { key: 'email', y: 195, placeholder: 'Email', type: 'email' },
            { key: 'password', y: 245, placeholder: 'Password', type: 'password' }
        ];

        this._fields.forEach(f => {
            const bg = this.add.rectangle(400, f.y, 300, 34, 0x12121f)
                .setStrokeStyle(1, 0x3a3a5c);
            this.elements.push(bg);
        });

        this.errorText = this.add.text(400, 300, '', {
            fontSize: '13px', fill: '#e74c3c', fontFamily: 'Arial', fontStyle: 'bold',
            wordWrap: { width: 360 }
        }).setOrigin(0.5);

        this._createBtn(400, 340, t('login.login'), 0x27ae60, () => this._doLogin());
        this._createBtn(400, 385, t('login.register'), 0x2980b9, () => this._doRegister());
        this._createBtn(400, 435, t('login.guest'), 0x555577, () => this._doGuest());

        this.add.text(400, 490, t('login.hint'), {
            fontSize: '11px', fill: '#555', fontFamily: 'Arial',
            wordWrap: { width: 350 }, align: 'center'
        }).setOrigin(0.5);

        this.time.delayedCall(100, () => this._injectDOMInputs());
    }

    _injectDOMInputs() {
        const canvas = this.game.canvas;
        const parent = canvas.parentNode;
        const canvasRect = canvas.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();
        const offsetX = canvasRect.left - parentRect.left;
        const offsetY = canvasRect.top - parentRect.top;
        const scaleX = canvasRect.width / 800;
        const scaleY = canvasRect.height / 600;

        this._fields.forEach(f => {
            const px = offsetX + 400 * scaleX;
            const py = offsetY + f.y * scaleY;
            const w = 300 * scaleX;
            const h = 34 * scaleY;

            const wrapper = document.createElement('div');
            wrapper.style.cssText = `
                position: absolute;
                left: ${px - w / 2}px;
                top: ${py - h / 2}px;
                width: ${w}px;
                height: ${h}px;
                background: #12121f;
                border: 1px solid #3a3a5c;
                display: flex;
                align-items: center;
                padding: 0 8px;
                border-radius: 0;
                z-index: 10;
            `;

            const input = document.createElement('input');
            input.type = f.type;
            input.placeholder = f.placeholder;
            input.style.cssText = `
                flex: 1;
                height: 100%;
                background: transparent !important;
                border: none !important;
                outline: none !important;
                box-shadow: none !important;
                color: #d0d0d0;
                font-family: Arial, sans-serif;
                font-size: ${14 * scaleY}px;
                caret-color: #f1c40f;
                padding: 0;
                margin: 0;
            `;

            wrapper.appendChild(input);

            if (f.type === 'password') {
                const eye = document.createElement('span');
                eye.textContent = '\u{1F441}';
                eye.style.cssText = `font-size:${13 * scaleY}px;cursor:pointer;padding:0 4px;user-select:none;opacity:0.5;`;
                eye.addEventListener('click', () => {
                    this._passwordVisible = !this._passwordVisible;
                    input.type = this._passwordVisible ? 'text' : 'password';
                    eye.textContent = this._passwordVisible ? '\u{1F512}' : '\u{1F441}';
                    eye.style.opacity = this._passwordVisible ? '1' : '0.5';
                });
                wrapper.appendChild(eye);
            }

            wrapper.addEventListener('mouseenter', () => wrapper.style.borderColor = '#5a5a8c');
            wrapper.addEventListener('mouseleave', () => wrapper.style.borderColor = '#3a3a5c');

            parent.appendChild(wrapper);
            this['_' + f.key + 'Input'] = input;
            this['_' + f.key + 'Wrapper'] = wrapper;
            this._domInputs.push(wrapper);
        });
    }

    _createBtn(x, y, label, color, cb) {
        const bg = this.add.rectangle(x, y, 300, 36, color)
            .setStrokeStyle(2, lighten(color, 0.3))
            .setInteractive({ useHandCursor: true });
        const txt = this.add.text(x, y, label, {
            fontSize: '16px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5);

        bg.on('pointerover', () => { bg.setFillStyle(lighten(color, 0.2)); bg.setScale(1.03); txt.setScale(1.03); });
        bg.on('pointerout', () => { bg.setFillStyle(color); bg.setScale(1); txt.setScale(1); });
        bg.on('pointerdown', cb);
        this.elements.push(bg, txt);
    }

    _showError(msg) {
        if (this.errorText) this.errorText.setText(msg);
    }

    _clearError() {
        if (this.errorText) this.errorText.setText('');
    }

    async _doLogin() {
        this._clearError();
        const email = this._emailInput.value.trim();
        const pass = this._passwordInput.value;
        if (!email || !pass) { this._showError(t('login.emptyFields')); return; }
        try {
            await login(email, pass);
            this._cleanup();
            this.scene.start('Menu');
        } catch (e) {
            this._showError(this._translateAuthError(e.code));
        }
    }

    async _doRegister() {
        this._clearError();
        const name = this._nameInput.value.trim();
        const email = this._emailInput.value.trim();
        const pass = this._passwordInput.value;
        if (!name || !email || !pass) { this._showError(t('login.allFields')); return; }
        if (pass.length < 6) { this._showError(t('login.weakPassword')); return; }
        try {
            await register(email, pass, name);
            this._cleanup();
            this.scene.start('Menu');
        } catch (e) {
            this._showError(this._translateAuthError(e.code));
        }
    }

    async _doGuest() {
        this._clearError();
        try {
            await loginAsGuest();
            this._cleanup();
            this.scene.start('Menu');
        } catch (e) {
            this._showError(this._translateAuthError(e.code));
        }
    }

    _cleanup() {
        this._domInputs.forEach(el => { if (el.parentNode) el.parentNode.removeChild(el); });
        this._domInputs = [];
    }

    shutdown() { this._cleanup(); }

    _translateAuthError(code) {
        const map = {
            'auth/email-already-in-use': t('login.emailInUse'),
            'auth/invalid-email': t('login.invalidEmail'),
            'auth/user-not-found': t('login.userNotFound'),
            'auth/wrong-password': t('login.wrongPassword'),
            'auth/weak-password': t('login.weakPassword'),
            'auth/too-many-requests': t('login.tooMany'),
            'auth/network-request-failed': t('login.networkError'),
            'auth/invalid-credential': t('login.invalidCredential')
        };
        return map[code] || t('login.genericError');
    }
}
