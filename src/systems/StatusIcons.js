const BUFF_ICONS = {
    dmg:       { icon: '\u{1F525}', label: 'DMG',   color: '#e74c3c' },
    spd:       { icon: '\u{1F680}', label: 'SPD',   color: '#3498db' },
    def:       { icon: '\u{1F6E1}', label: 'DEF',   color: '#f39c12' },
    crit:      { icon: '\u{2728}',  label: 'CRIT',  color: '#9b59b6' },
    lifesteal: { icon: '\u{1F5E1}', label: 'LS',    color: '#c0392b' },
    divine:    { icon: '\u{2726}',  label: 'BLESS', color: '#f1c40f' },
    poison:    { icon: '\u{2620}',  label: 'POISON', color: '#27ae60' },
    shield:    { icon: '\u{1F6E1}', label: 'SHIELD', color: '#3498db' }
};

export class StatusIcons {
    constructor(scene) {
        this.scene = scene;
        this.group = [];
        this._frame = 0;
    }

    _mk(el) { el.setScrollFactor(0).setDepth(45); this.group.push(el); return el; }

    clear() {
        this.group.forEach(el => { try { el.destroy(); } catch (_) {} });
        this.group = [];
    }

    _getActiveBuffs() {
        const s = this.scene;
        const buffs = [];
        if (s._consumableBonusDmg > 0) buffs.push({ key: 'dmg', time: s._consumableBonusDmgTimer, value: Math.floor(s._consumableBonusDmg * 100) + '%' });
        if (s._consumableBonusSpd > 0) buffs.push({ key: 'spd', time: s._consumableBonusSpdTimer, value: Math.floor(s._consumableBonusSpd * 100) + '%' });
        if (s._consumableBonusDef > 0) buffs.push({ key: 'def', time: s._consumableBonusDefTimer, value: Math.floor(s._consumableBonusDef * 100) + '%' });
        if (s._consumableBonusCrit > 0) buffs.push({ key: 'crit', time: s._consumableBonusCritTimer, value: s._consumableBonusCrit + '%' });
        if (s._consumableBonusLifesteal > 0) buffs.push({ key: 'lifesteal', time: s._consumableBonusLifestealTimer, value: Math.floor(s._consumableBonusLifesteal * 100) + '%' });
        if (s._divineBlessingTimer > 0) buffs.push({ key: 'divine', time: s._divineBlessingTimer, value: '+' + s._divineBlessingDmgBuff + '/' + s._divineBlessingDefBuff });
        if (s._poisonDot && s._poisonTimer > 0) buffs.push({ key: 'poison', time: s._poisonTimer, value: 'DoT' });
        if (s.shieldActive) buffs.push({ key: 'shield', time: 0, value: '' });
        return buffs;
    }

    update(delta) {
        this._frame++;
        if (this._frame % 15 !== 0) return;
        this._redraw();
    }

    _redraw() {
        this.clear();
        const s = this.scene;
        const buffs = this._getActiveBuffs();
        if (buffs.length === 0) return;

        const startX = 58;
        const y = 90;
        const cellW = 34, cellH = 16, gap = 2;

        buffs.forEach((b, i) => {
            const meta = BUFF_ICONS[b.key];
            if (!meta) return;
            const x = startX + i * (cellW + gap);

            this._mk(s.add.rectangle(x + cellW / 2, y, cellW, cellH, 0x0a0a1a, 0.9).setStrokeStyle(1, parseInt(meta.color.slice(1), 16)));
            this._mk(s.add.text(x + 4, y - 2, meta.icon, { fontSize: '8px', fontFamily: 'Arial' }));
            this._mk(s.add.text(x + 13, y - 2, meta.label, { fontSize: '7px', fill: meta.color, fontFamily: 'Arial', fontStyle: 'bold' }));

            const secs = Math.ceil((b.time || 0) / 1000);
            const timeTxt = b.time > 0 ? (secs > 99 ? '99+' : secs) + 's' : '';
            this._mk(s.add.text(x + cellW - 3, y + 4, timeTxt, { fontSize: '7px', fill: '#ccc', fontFamily: 'Arial' }).setOrigin(1, 0));
            if (b.value) {
                this._mk(s.add.text(x + cellW / 2, y + 4, b.value, { fontSize: '7px', fill: '#888', fontFamily: 'Arial' }).setOrigin(0.5, 0));
            }
        });
    }
}