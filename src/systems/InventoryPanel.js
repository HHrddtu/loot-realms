import { RARITY_COLORS } from '../config/index.js';
import { getSetInfo } from '../config/sets.js';

export class InventoryPanel {
    constructor(scene, ui) {
        this.scene = scene;
        this.ui = ui;
        this.inventory = ui.inventory;
    }

    toggleInventory() { this.inventory.toggleInventory(); }
    openInventory() { this.inventory.openInventory(); }
    closeInventory() { this.inventory.closeInventory(); }
    _drawEquippedPanel() { this.inventory._drawEquippedPanel(); }
    _drawMaterialsPanel() { this.inventory._drawMaterialsPanel(); }
    _drawEquipmentBagPanel() { this.inventory._drawEquipmentBagPanel(); }
    _drawCloseButton() { this.inventory._drawCloseButton(); }

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
        if (item.locked) lines.push({ text: '\u{1F512} Locked', color: '#e74c3c', size: '10px', bold: true });
        if (item.questItem) lines.push({ text: '\u2605 Quest Item', color: '#f39c12', size: '10px', bold: true });
        if (item.relic) lines.push({ text: '\u2605 Relic', color: '#9b59b6', size: '10px', bold: true });
        if (item.slot) lines.push({ text: 'Slot: ' + item.slot.charAt(0).toUpperCase() + item.slot.slice(1), color: '#95a5a6', size: '10px', bold: false });
        
        // Item stats
        if (item.type === 'material' || item.type === 'equip') {
            const s = item.stats || {};
            if (s.hp) lines.push({ text: '+' + s.hp + ' HP', color: '#2ecc71', size: '11px', bold: false });
            if (s.dmg) lines.push({ text: '+' + s.dmg + ' DMG', color: '#2ecc71', size: '11px', bold: false });
            if (s.speed) lines.push({ text: '+' + s.speed + ' SPD', color: '#2ecc71', size: '11px', bold: false });
            if (s.crit) lines.push({ text: '+' + s.crit + '% Crit', color: '#2ecc71', size: '11px', bold: false });
        }
        if (item.type === 'accountEquip') {
            const s = item.stats || {};
            if (s.hpPercent) lines.push({ text: '+' + s.hpPercent + '% HP', color: '#2ecc71', size: '11px' });
            if (s.damagePercent) lines.push({ text: '+' + s.damagePercent + '% DMG', color: '#2ecc71', size: '11px' });
            if (s.speedPercent) lines.push({ text: '+' + s.speedPercent + '% SPD', color: '#2ecc71', size: '11px' });
            if (s.spellPercent) lines.push({ text: '+' + s.spellPercent + '% Spell', color: '#2ecc71', size: '11px' });
            if (s.critPercent) lines.push({ text: '+' + s.critPercent + '% Crit', color: '#2ecc71', size: '11px' });
            if (s.dodgePercent) lines.push({ text: '+' + s.dodgePercent + '% Dodge', color: '#2ecc71', size: '11px' });
            if (s.expPercent) lines.push({ text: '+' + s.expPercent + '% EXP', color: '#2ecc71', size: '11px' });
            if (s.regenPercent) lines.push({ text: '+' + s.regenPercent + '% Regen', color: '#2ecc71', size: '11px' });
            if (s.corruptionMax) lines.push({ text: '+' + s.corruptionMax + ' CorrMax', color: '#2ecc71', size: '11px' });
        }
        
        // Item comparison (if hovering over bag item and something is equipped)
        if (item.type === 'equip' && item.slot) {
            const equipped = this.scene.equipment[item.slot];
            if (equipped && equipped !== item) {
                lines.push({ text: '--- vs Equipped ---', color: '#f39c12', size: '10px', bold: true });
                const newStats = item.stats || {};
                const oldStats = equipped.stats || {};
                const statNames = { hp: 'HP', dmg: 'DMG', speed: 'SPD', crit: 'Crit' };
                for (const [key, label] of Object.entries(statNames)) {
                    const oldVal = oldStats[key] || 0;
                    const newVal = newStats[key] || 0;
                    const diff = newVal - oldVal;
                    if (oldVal > 0 || newVal > 0) {
                        const diffText = diff > 0 ? '+' + diff : diff.toString();
                        const diffColor = diff > 0 ? '#2ecc71' : diff < 0 ? '#e74c3c' : '#888';
                        lines.push({ text: label + ': ' + oldVal + ' -> ' + newVal + ' (' + diffText + ')', color: diffColor, size: '10px', bold: false });
                    }
                }
            }
        }
        
        if (item.effect) lines.push({ text: 'Effect: ' + item.effect, color: '#f39c12', size: '10px' });
        
        // Set info
        if (item.id) {
            const setInfo = getSetInfo(this.scene.equipment, this.scene.accountEquipment);
            setInfo.forEach(set => {
                if (set.equipped > 0) {
                    const progress = set.equipped + '/' + set.total;
                    lines.push({ text: set.name + ' (' + progress + ')', color: '#9b59b6', size: '10px', bold: true });
                    set.bonuses.forEach(bonus => {
                        const status = bonus.active ? '[ACTIVE]' : '[need ' + bonus.needed + ']';
                        const statusColor = bonus.active ? '#2ecc71' : '#555';
                        lines.push({ text: '  ' + bonus.name + ' ' + status, color: statusColor, size: '9px' });
                    });
                }
            });
        }
        
        lines.push({ text: 'Click=equip | RMB=lock', color: '#555', size: '9px' });
        const maxW = 180, lineH = 16, padX = 10, padY = 8;
        const totalH = lines.length * lineH + padY * 2;
        let tx = x + 20, ty = y - totalH / 2;
        if (tx + maxW > 780) tx = x - maxW - 20;
        if (ty < 10) ty = 10;
        if (ty + totalH > 590) ty = 590 - totalH;
        ttGroup.push(mk(this.scene.add.rectangle(tx + maxW / 2, ty + totalH / 2, maxW, totalH, 0x0a0a1a, 0.95).setStrokeStyle(1, rc)));
        lines.forEach((l, i) => { const t = mk(this.scene.add.text(tx + padX, ty + padY + i * lineH, l.text, { fontSize: l.size, fill: l.color, fontFamily: 'Arial' + (l.bold ? ', fontStyle: bold' : '') })); ttGroup.push(t); });
        this.scene._tooltipGroup = ttGroup;
    }

    _hideItemTooltip() {
        if (this.scene._tooltipGroup) { this.scene._tooltipGroup.forEach(e => e.destroy()); }
        this.scene._tooltipGroup = [];
    }
}
