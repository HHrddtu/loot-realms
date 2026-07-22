import { RARITY_COLORS, MATERIAL_SLOTS } from '../config/index.js';
import { getSetInfo, EQUIPMENT_SETS } from '../config/sets.js';
import { t } from '../i18n.js';

export class InventoryUI {
    constructor(scene, ui) {
        this.scene = scene;
        this.ui = ui;
        this._tab = 'equip';
    }

    toggleInventory() {
        this.scene.invOpen ? this.closeInventory() : this.openInventory();
    }

    openInventory() {
        if (this.scene.menuOpen) return;
        this.scene.invOpen = true; this.scene.menuOpen = true;
        this.scene.physics.pause();
        if (this.scene.enemies && this.scene.enemies.getLength) this.scene.enemies.getChildren().forEach(e => { if (e.body) e.body.setVelocity(0); });
        this.scene.invGroup = [];
        this._tab = 'equip';
        this._drawAll();
    }

    _mk(el) { el.setScrollFactor(0).setDepth(200); this.scene.invGroup.push(el); return el; }

    _clear() { this.scene.invGroup.forEach(e => { try { e.destroy(); } catch (_) {} }); this.scene.invGroup = []; }

    _drawAll() {
        this._clear();
        const w = 760, h = 520;
        const cx = 400, cy = 290;

        // Background
        this._mk(this.scene.add.rectangle(cx, cy, w, h, 0x0a0a1a, 0.95).setStrokeStyle(2, 0x333355));
        this._mk(this.scene.add.text(cx, 45, 'INVENTORY', { fontSize: '20px', fill: '#f1c40f', fontFamily: 'Georgia', fontStyle: 'bold' }).setOrigin(0.5));

        // Player model + 3 equipment slots
        this._drawPlayerModel(cx, 120);

        // Tabs
        this._drawTabs(cx, 220);

        // Content area
        if (this._tab === 'equip') this._drawEquipGrid(cx, 250);
        else this._drawMaterialGrid(cx, 250);

        // Consumable bar
        this._drawConsumableBar(cx, 480);

        // Close
        this._mk(this.scene.add.text(cx, 520, 'X', { fontSize: '18px', fill: '#e74c3c', fontFamily: 'Arial', fontStyle: 'bold' }).setOrigin(0.5).setInteractive({ useHandCursor: true }).on('pointerdown', () => this.closeInventory()));
    }

    _drawPlayerModel(cx, cy) {
        const cls = this.scene.classData;
        const texKey = cls?.texKey || 'player_sage';
        const spr = this._mk(this.scene.add.sprite(cx, cy, texKey).setScale(3));

        // Equipment slots around the player
        const slots = [
            { key: 'weapon', label: 'W', dx: -130, dy: -10 },
            { key: 'armor', label: 'A', dx: 130, dy: -10 },
            { key: 'accessory', label: 'R', dx: 0, dy: 50 }
        ];
        slots.forEach(sl => {
            const item = this.scene.equipment[sl.key];
            const bx = cx + sl.dx, by = cy + sl.dy;
            const bg = this._mk(this.scene.add.rectangle(bx, by, 40, 40, 0x0a0a1a, 0.8).setStrokeStyle(1, item ? RARITY_COLORS[item.rarity] || 0x444466 : 0x444466));
            this._mk(this.scene.add.text(bx, by - 24, sl.label, { fontSize: '10px', fill: '#666', fontFamily: 'Arial' }).setOrigin(0.5));
            if (item) {
                this._mk(this.scene.add.sprite(bx, by, item.texKey));
                bg.setStrokeStyle(2, RARITY_COLORS[item.rarity] || 0x444466);
                bg.setInteractive({ useHandCursor: true }).on('pointerdown', () => { this.scene.invGroup = this.scene.invGroup.filter(e => { try { e.destroy(); } catch(_){} return false; }); this._unequipSlot(sl.key); });
            }
        });

        // Stats text on the right
        const s = this.scene;
        const stats = [
            'HP: ' + s.playerHP + '/' + s.playerMaxHP,
            'DMG: ' + s.playerDamage,
            'SPD: ' + s.playerSpeed,
            'Crit: ' + (s.computedCritChance || 0).toFixed(0) + '%'
        ];
        this._mk(this.scene.add.text(cx + 190, cy - 30, stats.join('\n'), { fontSize: '11px', fill: '#aaa', fontFamily: 'Arial', lineSpacing: 4 }));
    }

    _drawTabs(cx, cy) {
        const tabs = [
            { key: 'equip', label: t('inv.equipBag') },
            { key: 'material', label: 'Materials' }
        ];
        tabs.forEach((tab, i) => {
            const tx = cx - 80 + i * 160;
            const active = this._tab === tab.key;
            this._mk(this.scene.add.rectangle(tx, cy, 140, 24, active ? 0x2a2a4e : 0x1a1a2e).setStrokeStyle(1, active ? 0x9b59b6 : 0x444466).setInteractive({ useHandCursor: true }).on('pointerdown', () => { this._tab = tab.key; this._drawAll(); }));
            this._mk(this.scene.add.text(tx, cy, tab.label, { fontSize: '12px', fill: active ? '#f1c40f' : '#888', fontFamily: 'Arial', fontStyle: 'bold' }).setOrigin(0.5));
        });
    }

    _drawEquipGrid(cx, cy) {
        const bag = this.scene.equipBag || [];
        const cols = 4, cellW = 56, cellH = 56, gap = 8;
        const startX = cx - ((cols * cellW + (cols - 1) * gap) / 2) + cellW / 2;
        const rows = Math.ceil((this.scene.maxEquipBag || 20) / cols);

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const idx = r * cols + c;
                const x = startX + c * (cellW + gap);
                const y = cy + r * (cellH + gap);
                const bg = this._mk(this.scene.add.rectangle(x, y, cellW - 4, cellH - 4, 0x0a0a1a, 0.6).setStrokeStyle(1, 0x333355));
                if (idx < bag.length && bag[idx]) {
                    const item = bag[idx];
                    this._mk(this.scene.add.sprite(x, y, item.texKey));
                    bg.setStrokeStyle(2, RARITY_COLORS[item.rarity] || 0x444466);
                    bg.setInteractive({ useHandCursor: true });
                    bg.on('pointerdown', () => this._equipFromBag(idx));
                    bg.on('pointerover', () => this._showTooltip(x, y, item));
                    bg.on('pointerout', () => this._hideTooltip());
                }
            }
        }
    }

    _drawMaterialGrid(cx, cy) {
        const mats = this.scene.materials || [];
        const cols = 5, cellW = 50, cellH = 50, gap = 6;
        const startX = cx - ((cols * cellW + (cols - 1) * gap) / 2) + cellW / 2;
        const maxSlots = this.scene.maxMaterials || MATERIAL_SLOTS;

        for (let i = 0; i < maxSlots; i++) {
            const col = i % cols, row = Math.floor(i / cols);
            const x = startX + col * (cellW + gap);
            const y = cy + row * (cellH + gap);
            const bg = this._mk(this.scene.add.rectangle(x, y, cellW - 4, cellH - 4, 0x0a0a1a, 0.5).setStrokeStyle(1, 0x333355));
            if (i < mats.length && mats[i]) {
                const m = mats[i];
                const cnt = m.count || 1;
                this._mk(this.scene.add.sprite(x - 4, y - 4, m.texKey));
                this._mk(this.scene.add.text(x + 10, y + 8, cnt > 1 ? cnt.toString() : '', { fontSize: '11px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold' }));
                bg.setStrokeStyle(1, RARITY_COLORS[m.rarity] || 0x444466);
                bg.setInteractive({ useHandCursor: true });
                bg.on('pointerdown', (p) => { if (p.event.shiftKey) { this._deleteMaterial(i); } });
                bg.on('pointerover', () => this._showMatTooltip(x, y, m));
                bg.on('pointerout', () => this._hideTooltip());
            }
        }
    }

    _drawConsumableBar(cx, cy) {
        const con = this.scene.consumable;
        if (!con) return;
        const bg = this._mk(this.scene.add.rectangle(cx, cy, 200, 28, 0x1a1a2e, 0.8).setStrokeStyle(1, 0x27ae60));
        this._mk(this.scene.add.sprite(cx - 80, cy, con.texKey).setScale(0.8));
        this._mk(this.scene.add.text(cx, cy, con.name, { fontSize: '11px', fill: '#2ecc71', fontFamily: 'Arial' }).setOrigin(0.5));
        bg.setInteractive({ useHandCursor: true }).on('pointerdown', () => { this.scene.useConsumable(); this._drawAll(); });
    }

    _equipFromBag(idx) {
        const item = this.scene.equipBag[idx];
        if (!item) return;
        const old = this.scene.equipment[item.slot];
        this.scene.equipment[item.slot] = item;
        this.scene.equipBag.splice(idx, 1);
        if (old) this.scene.equipBag.push(old);
        if (this.scene.playerSys) this.scene.playerSys.recalcStats();
        this._drawAll();
    }

    _unequipSlot(slot) {
        const item = this.scene.equipment[slot];
        if (!item) return;
        this.scene.equipment[slot] = null;
        this.scene.equipBag.push(item);
        if (this.scene.playerSys) this.scene.playerSys.recalcStats();
        this._drawAll();
    }

    _deleteMaterial(idx) {
        if (this.scene.playerSys) this.scene.playerSys.deleteItem('material', idx);
        this._drawAll();
    }

    _showTooltip(x, y, item) {
        this._hideTooltip();
        const rc = '#' + (RARITY_COLORS[item.rarity] || 0xaaaaaa).toString(16).padStart(6, '0');
        const lines = [
            { text: item.name || '?', color: rc, size: '13px', bold: true },
            { text: (item.rarity || 'common').charAt(0).toUpperCase() + (item.rarity || 'common').slice(1), color: '#888', size: '10px' },
            { text: 'Slot: ' + (item.slot || '?'), color: '#95a5a6', size: '10px' }
        ];
        if (item.attackType) lines.push({ text: 'Attack: ' + item.attackType, color: '#f1c40f', size: '11px' });
        if (item.locked) lines.push({ text: 'LOCKED', color: '#e74c3c', size: '10px', bold: true });

        this._renderTooltip(x, y, lines, rc);
    }

    _showMatTooltip(x, y, m) {
        this._hideTooltip();
        const rc = '#' + (RARITY_COLORS[m.rarity] || 0xaaaaaa).toString(16).padStart(6, '0');
        const lines = [{ text: m.name || '?', color: rc, size: '13px', bold: true }];
        const s = m.stats || {};
        if (s.regen) lines.push({ text: '+' + s.regen + ' Regen/s', color: '#2ecc71', size: '11px' });
        if (s.pickupRadius) lines.push({ text: '+' + s.pickupRadius + ' Pickup Range', color: '#2ecc71', size: '11px' });
        if (s.moveNoise) lines.push({ text: 'Stealth ' + Math.round(s.moveNoise * 100) + '%', color: '#3498db', size: '11px' });
        if (s.healOnKill) lines.push({ text: '+' + Math.round(s.healOnKill * 100) + '% HP/Kill', color: '#2ecc71', size: '11px' });
        if (s.detectRange) lines.push({ text: 'Detect +' + s.detectRange, color: '#3498db', size: '11px' });
        lines.push({ text: 'x' + (m.count || 1), color: '#888', size: '10px' });

        this._renderTooltip(x, y, lines, rc);
    }

    _renderTooltip(x, y, lines, borderColor) {
        const maxW = 160, lineH = 15, padX = 8, padY = 6;
        const totalH = lines.length * lineH + padY * 2;
        let tx = x + 16, ty = y - totalH / 2;
        if (tx + maxW > 780) tx = x - maxW - 16;
        if (ty < 10) ty = 10; if (ty + totalH > 590) ty = 590 - totalH;
        const bg = this._mk(this.scene.add.rectangle(tx + maxW / 2, ty + totalH / 2, maxW, totalH, 0x0a0a1a, 0.95).setStrokeStyle(1, borderColor || 0x444466));
        lines.forEach((l, i) => {
            this._mk(this.scene.add.text(tx + padX, ty + padY + i * lineH, l.text, {
                fontSize: l.size || '11px', fill: l.color || '#ccc', fontFamily: 'Arial' + (l.bold ? ', serif' : ''),
                fontStyle: l.bold ? 'bold' : 'normal'
            }));
        });
        this.scene._tooltipGroup = this.scene.invGroup;
    }

    _hideTooltip() {
        if (!this.scene._tooltipGroup) return;
        this.scene.invGroup = this.scene.invGroup.filter(e => {
            if (this.scene._tooltipGroup.includes(e)) { try { e.destroy(); } catch(_){} return false; }
            return true;
        });
        this.scene._tooltipGroup = null;
    }

    closeInventory() {
        this.scene.invOpen = false; this.scene.menuOpen = false;
        this._clear();
        this.scene.physics.resume();
        this.scene.invGroup = [];
    }
}
