import { RARITY_COLORS, MATERIAL_SLOTS } from '../config/index.js';
import { getSetInfo, EQUIPMENT_SETS } from '../config/sets.js';
import { t } from '../i18n.js';

export class InventoryUI {
    constructor(scene, ui) {
        this.scene = scene;
        this.ui = ui;
        this._tab = 'equip';
        this._infoItem = null;
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
        this._infoItem = null;
        this._drawAll();
    }

    _mk(el) { el.setScrollFactor(0).setDepth(200); this.scene.invGroup.push(el); return el; }
    _clear() { this.scene.invGroup.forEach(e => { try { e.destroy(); } catch (_) {} }); this.scene.invGroup = []; }

    _drawAll() {
        this._clear();
        const cx = 400;

        // Background
        this._mk(this.scene.add.rectangle(cx, 290, 760, 530, 0x0a0a1a, 0.95).setStrokeStyle(2, 0x333355));
        this._mk(this.scene.add.text(cx, 40, 'INVENTORY', { fontSize: '20px', fill: '#f1c40f', fontFamily: 'Georgia', fontStyle: 'bold' }).setOrigin(0.5));

        // Top: player model + equipped slots + stats
        this._drawPlayerModel(cx, 115);

        // Bottom area: tabs + grids
        this._drawTabs(cx, 210);
        if (this._tab === 'equip') this._drawEquipGrid(cx, 240);
        else this._drawMaterialGrid(cx, 240);

        // Left info panel (item summary)
        this._drawInfoPanel(130, 210);

        // Bottom bar
        this._drawConsumableBar(cx, 520);

        // Close X
        this._mk(this.scene.add.text(cx + 340, 42, 'X', { fontSize: '22px', fill: '#e74c3c', fontFamily: 'Arial', fontStyle: 'bold' }).setOrigin(0.5).setInteractive({ useHandCursor: true }).on('pointerdown', () => this.closeInventory()));
    }

    _drawPlayerModel(cx, cy) {
        const cls = this.scene.classData;
        this._mk(this.scene.add.sprite(cx, cy, cls?.texKey || 'player_sage').setScale(3));

        const slotDefs = [
            { key: 'weapon', label: 'Weapon', dx: -150, dy: 0 },
            { key: 'armor', label: 'Armor', dx: 150, dy: 0 },
            { key: 'accessory', label: 'Ring', dx: 0, dy: 60 }
        ];
        slotDefs.forEach(sl => {
            const item = this.scene.equipment[sl.key];
            const bx = cx + sl.dx, by = cy + sl.dy;
            const bg = this._mk(this.scene.add.rectangle(bx, by, 44, 44, 0x0a0a1a, 0.8).setStrokeStyle(1, item ? RARITY_COLORS[item.rarity] || 0x444466 : 0x444466));
            this._mk(this.scene.add.text(bx, by + 30, sl.label, { fontSize: '9px', fill: '#888', fontFamily: 'Arial' }).setOrigin(0.5));
            if (item) {
                this._mk(this.scene.add.sprite(bx, by, item.texKey));
                bg.setStrokeStyle(2, RARITY_COLORS[item.rarity] || 0x444466);
                bg.setInteractive({ useHandCursor: true }).on('pointerdown', () => this._selectInfoItem(item));
            }
        });

        // Stats on right
        const s = this.scene;
        const lines = [
            s.playerHP + '/' + s.playerMaxHP,
            s.playerDamage + ' DMG',
            s.playerSpeed + ' SPD',
            (s.computedCritChance || 0).toFixed(0) + '% Crit'
        ];
        this._mk(this.scene.add.text(cx + 270, cy - 15, lines.join('\n'), { fontSize: '12px', fill: '#ccc', fontFamily: 'Arial', lineSpacing: 6, align: 'right' }).setOrigin(1, 0));
    }

    _drawInfoPanel(px, py) {
        // Remove old info panel elements
        if (this._infoGroup) {
            this._infoGroup.forEach(el => { try { el.destroy(); } catch(_){} });
            this.scene.invGroup = this.scene.invGroup.filter(el => !this._infoGroup.includes(el));
            this._infoGroup = null;
        }
        this._infoGroup = [];
        const _mkInfo = (el) => { el.setScrollFactor(0).setDepth(200); this._infoGroup.push(el); this.scene.invGroup.push(el); return el; };

        const pw = 180, ph = 220;
        _mkInfo(this.scene.add.rectangle(px + pw / 2, py + ph / 2, pw, ph, 0x0a0a1a, 0.7).setStrokeStyle(1, 0x333355));
        _mkInfo(this.scene.add.text(px + pw / 2, py + 12, 'ITEM INFO', { fontSize: '9px', fill: '#555', fontFamily: 'Arial', fontStyle: 'bold' }).setOrigin(0.5));

        if (!this._infoItem) {
            _mkInfo(this.scene.add.text(px + pw / 2, py + ph / 2, 'Click an item\nto see details', { fontSize: '11px', fill: '#555', fontFamily: 'Arial', align: 'center' }).setOrigin(0.5));
            return;
        }

        const item = this._infoItem;
        const rc = '#' + (RARITY_COLORS[item.rarity] || 0xaaaaaa).toString(16).padStart(6, '0');
        let iy = py + 24, lh = 12;

        _mkInfo(this.scene.add.text(px + 6, iy, item.name, { fontSize: '11px', fill: rc, fontFamily: 'Arial', fontStyle: 'bold', wordWrap: { width: pw - 12 } }));
        iy += 16;
        _mkInfo(this.scene.add.text(px + 6, iy, 'Slot: ' + (item.slot || '-'), { fontSize: '9px', fill: '#95a5a6', fontFamily: 'Arial' }));
        iy += lh;

        if (item.type === 'material') {
            const st = item.stats || {};
            if (st.regen) { _mkInfo(this.scene.add.text(px + 6, iy, '+' + st.regen + ' Regen/s', { fontSize: '10px', fill: '#2ecc71', fontFamily: 'Arial' })); iy += lh; }
            if (st.pickupRadius) { _mkInfo(this.scene.add.text(px + 6, iy, '+' + st.pickupRadius + ' Pickup', { fontSize: '10px', fill: '#2ecc71', fontFamily: 'Arial' })); iy += lh; }
            if (st.moveNoise) { _mkInfo(this.scene.add.text(px + 6, iy, 'Stealth ' + Math.round(st.moveNoise * 100) + '%', { fontSize: '10px', fill: '#3498db', fontFamily: 'Arial' })); iy += lh; }
            if (st.healOnKill) { _mkInfo(this.scene.add.text(px + 6, iy, '+' + Math.round(st.healOnKill * 100) + '% HP/Kill', { fontSize: '10px', fill: '#2ecc71', fontFamily: 'Arial' })); iy += lh; }
            if (st.detectRange) { _mkInfo(this.scene.add.text(px + 6, iy, 'Detect +' + st.detectRange, { fontSize: '10px', fill: '#3498db', fontFamily: 'Arial' })); iy += lh; }
            _mkInfo(this.scene.add.text(px + 6, iy, 'x' + (item.count || 1), { fontSize: '9px', fill: '#888', fontFamily: 'Arial' })); iy += lh + 2;
        }

        if (item.type === 'equip') {
            if (item.slot === 'weapon') {
                _mkInfo(this.scene.add.text(px + 6, iy, 'Atk: ' + (item.attackType || 'standard'), { fontSize: '10px', fill: '#f1c40f', fontFamily: 'Arial' })); iy += lh;
                if (item.attackRange) { _mkInfo(this.scene.add.text(px + 6, iy, 'Rng: ' + item.attackRange, { fontSize: '9px', fill: '#aaa', fontFamily: 'Arial' })); iy += lh; }
            } else {
                _mkInfo(this.scene.add.text(px + 6, iy, 'Armor piece', { fontSize: '9px', fill: '#888', fontFamily: 'Arial' })); iy += lh;
            }
        }

        if (item.id) {
            const itemSets = Object.values(EQUIPMENT_SETS).filter(s => s.pieces.includes(item.id));
            if (itemSets.length > 0) {
                iy += 2;
                itemSets.forEach(itemSet => {
                    const setInfo = getSetInfo(this.scene.equipment, this.scene.accountEquipment);
                    const match = setInfo.find(s => s.name === itemSet.name);
                    const equipped = match ? match.equipped : 0;
                    _mkInfo(this.scene.add.text(px + 6, iy, itemSet.name + ' (' + equipped + '/' + itemSet.pieces.length + ')', { fontSize: '9px', fill: '#9b59b6', fontFamily: 'Arial', fontStyle: 'bold' })); iy += lh;
                    itemSet.bonuses.forEach(bonus => {
                        const isActive = equipped >= bonus.pieces;
                        const txt = isActive ? bonus.name : bonus.name + ' [' + bonus.pieces + 'p]';
                        _mkInfo(this.scene.add.text(px + 12, iy, txt, { fontSize: '8px', fill: isActive ? '#2ecc71' : '#555', fontFamily: 'Arial' })); iy += lh - 3;
                    });
                });
            }
        }
    }

    _drawTabs(cx, cy) {
        [
            { key: 'equip', label: t('inv.equipBag') },
            { key: 'material', label: 'Materials' }
        ].forEach((tab, i) => {
            const tx = cx + 20 + i * 160;
            const active = this._tab === tab.key;
            this._mk(this.scene.add.rectangle(tx, cy, 140, 24, active ? 0x2a2a4e : 0x1a1a2e).setStrokeStyle(1, active ? 0x9b59b6 : 0x444466).setInteractive({ useHandCursor: true }).on('pointerdown', () => { this._tab = tab.key; this._drawAll(); }));
            this._mk(this.scene.add.text(tx, cy, tab.label, { fontSize: '12px', fill: active ? '#f1c40f' : '#888', fontFamily: 'Arial', fontStyle: 'bold' }).setOrigin(0.5));
        });
    }

    _drawEquipGrid(cx, cy) {
        const bag = this.scene.equipBag || [];
        const cols = 4, cellW = 46, cellH = 46, gap = 4;
        const startX = cx + 50;
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
                    bg.on('pointerover', () => { this._infoItem = item; this._drawInfoPanel(130, 210); });
                }
            }
        }
    }

    _drawMaterialGrid(cx, cy) {
        const mats = this.scene.materials || [];
        const cols = 4, cellW = 46, cellH = 46, gap = 4;
        const startX = cx + 50;
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
                bg.on('pointerover', () => { this._infoItem = m; this._drawInfoPanel(130, 210); });
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

    _selectInfoItem(item) {
        this._infoItem = item;
        this._drawAll();
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

    closeInventory() {
        this.scene.invOpen = false; this.scene.menuOpen = false;
        this._clear();
        this.scene.physics.resume();
        this.scene.invGroup = [];
    }
}
