import { lighten } from '../utils.js';

function drawItemShape(c, shape, color) {
    switch (shape) {
        case 'line':
            c.fillRect(2, 4, 2, 10);
            c.fillRect(0, 2, 6, 4);
            break;
        case 'diamond':
            c.fillRect(6, 2, 4, 4);
            c.fillRect(4, 6, 8, 4);
            c.fillRect(6, 10, 4, 4);
            break;
        case 'leaf':
            c.fillRect(4, 2, 8, 4);
            c.fillRect(2, 6, 12, 6);
            c.fillRect(6, 12, 4, 2);
            c.fillStyle = '#1e8449';
            c.fillRect(7, 4, 2, 10);
            break;
        case 'mush':
            c.fillStyle = '#fff';
            c.fillRect(4, 8, 8, 6);
            c.fillStyle = color;
            c.fillRect(2, 4, 12, 6);
            c.fillRect(4, 2, 8, 4);
            c.fillStyle = '#fff';
            c.fillRect(4, 4, 2, 2);
            c.fillRect(10, 6, 2, 2);
            break;
        case 'ore':
            c.fillRect(4, 2, 8, 12);
            c.fillStyle = '#7f8c8d';
            c.fillRect(6, 4, 4, 4);
            break;
        case 'rect':
            c.fillRect(2, 4, 12, 8);
            c.fillStyle = '#8b4513';
            c.fillRect(4, 6, 8, 4);
            break;
        case 'herb':
            c.fillRect(6, 2, 4, 12);
            c.fillRect(2, 4, 4, 4);
            c.fillRect(10, 6, 4, 4);
            c.fillStyle = '#1e8449';
            c.fillRect(3, 5, 2, 2);
            c.fillRect(11, 7, 2, 2);
            break;
        case 'gem':
            // Основа
            c.fillRect(6, 2, 4, 4);
            c.fillRect(4, 6, 8, 4);
            c.fillRect(6, 10, 4, 4);
            // Грани
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.3);
            c.fillRect(6, 4, 2, 2);
            c.fillRect(8, 6, 4, 2);
            // Блик
            c.fillStyle = '#fff';
            c.fillRect(7, 3, 1, 1);
            c.fillRect(5, 7, 1, 1);
            // Тень
            c.fillStyle = 'rgba(0,0,0,0.2)';
            c.fillRect(8, 8, 2, 2);
            c.fillRect(6, 10, 2, 2);
            break;
        case 'sword':
            // Клинок
            c.fillRect(7, 0, 2, 10);
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.3);
            c.fillRect(7, 0, 1, 8);
            // Наконечник
            c.fillStyle = '#bdc3c7';
            c.fillRect(7, 0, 2, 2);
            // Переход
            c.fillStyle = '#95a5a6';
            c.fillRect(7, 8, 2, 2);
            // гарда
            c.fillStyle = color;
            c.fillRect(4, 10, 8, 2);
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.2);
            c.fillRect(5, 10, 6, 1);
            // Рукоять
            c.fillStyle = '#5a3d1a';
            c.fillRect(6, 12, 4, 3);
            c.fillStyle = '#6b4423';
            c.fillRect(7, 12, 2, 3);
            // Навершие
            c.fillStyle = color;
            c.fillRect(6, 15, 4, 1);
            break;
        case 'scale':
            c.fillRect(3, 3, 10, 10);
            c.fillStyle = '#7d3c98';
            c.fillRect(5, 5, 6, 6);
            c.fillStyle = color;
            c.fillRect(6, 6, 4, 4);
            break;
        case 'crown':
            c.fillRect(2, 8, 12, 6);
            c.fillRect(2, 4, 2, 4);
            c.fillRect(7, 2, 2, 6);
            c.fillRect(12, 4, 2, 4);
            c.fillStyle = '#e74c3c';
            c.fillRect(3, 6, 2, 2);
            c.fillRect(7, 4, 2, 2);
            c.fillRect(11, 6, 2, 2);
            break;
        case 'hat':
            c.fillRect(2, 8, 12, 6);
            c.fillRect(4, 4, 8, 4);
            c.fillRect(6, 2, 4, 2);
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.3);
            c.fillRect(7, 5, 2, 2);
            break;
        case 'mantle':
            c.fillRect(2, 4, 12, 10);
            c.fillStyle = '#4a235a';
            c.fillRect(4, 6, 8, 6);
            c.fillStyle = color;
            c.fillRect(6, 8, 4, 2);
            break;
        case 'legs':
            c.fillRect(3, 2, 4, 12);
            c.fillRect(9, 2, 4, 12);
            c.fillStyle = '#154360';
            c.fillRect(4, 6, 2, 4);
            c.fillRect(10, 6, 2, 4);
            break;
        case 'book':
            c.fillRect(3, 2, 10, 12);
            c.fillStyle = '#f5f5dc';
            c.fillRect(5, 4, 6, 8);
            c.fillStyle = '#5b2c6f';
            c.fillRect(6, 5, 4, 2);
            c.fillRect(6, 8, 4, 2);
            break;
        case 'amulet':
            // Цепочка
            c.fillStyle = '#95a5a6';
            c.fillRect(6, 0, 4, 2);
            c.fillRect(5, 1, 6, 1);
            // Основа
            c.fillRect(6, 2, 4, 4);
            c.fillRect(4, 6, 8, 4);
            c.fillRect(6, 10, 4, 4);
            // Камень
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.4);
            c.fillRect(7, 7, 2, 2);
            // Блик
            c.fillStyle = '#fff';
            c.fillRect(7, 6, 1, 1);
            // Оправа
            c.fillStyle = '#95a5a6';
            c.fillRect(5, 5, 1, 4);
            c.fillRect(10, 5, 1, 4);
            break;
        case 'ring':
            // Основа кольца
            c.fillStyle = '#95a5a6';
            c.fillRect(4, 6, 8, 2);
            c.fillRect(4, 10, 8, 2);
            c.fillRect(3, 7, 2, 4);
            c.fillRect(11, 7, 2, 4);
            // Камень
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.4);
            c.fillRect(6, 5, 4, 2);
            c.fillRect(7, 12, 2, 1);
            // Блик
            c.fillStyle = '#fff';
            c.fillRect(7, 5, 1, 1);
            // Внутренняя часть
            c.fillStyle = '#7f8c8d';
            c.fillRect(5, 7, 6, 4);
            break;
        case 'charm':
            c.fillRect(6, 2, 4, 2);
            c.fillRect(5, 4, 6, 2);
            c.fillRect(4, 6, 8, 6);
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.4);
            c.fillRect(6, 8, 4, 2);
            c.fillStyle = '#fff';
            c.fillRect(7, 7, 2, 2);
            break;
        case 'potion':
            // Пробка
            c.fillStyle = '#8b4513';
            c.fillRect(5, 2, 6, 3);
            c.fillStyle = '#a0522d';
            c.fillRect(6, 2, 4, 2);
            // Горлышко
            c.fillStyle = '#8b4513';
            c.fillRect(4, 5, 8, 2);
            // Бутылка
            c.fillStyle = color;
            c.fillRect(3, 7, 10, 7);
            // Жидкость (с бликом)
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.3);
            c.fillRect(5, 8, 3, 3);
            c.fillStyle = '#fff';
            c.fillRect(4, 7, 2, 2);
            // Дно
            c.fillStyle = '#8b4513';
            c.fillRect(4, 13, 8, 1);
            break;
        case 'potion_flask':
            c.fillStyle = '#8b4513';
            c.fillRect(6, 1, 4, 2);
            c.fillRect(5, 3, 6, 2);
            c.fillStyle = color;
            c.fillRect(3, 5, 10, 9);
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.35);
            c.fillRect(5, 6, 3, 4);
            c.fillStyle = 'rgba(255,255,255,0.3)';
            c.fillRect(4, 5, 2, 3);
            break;
        case 'scroll':
            c.fillStyle = '#f5deb3';
            c.fillRect(3, 2, 10, 12);
            c.fillStyle = '#d4a574';
            c.fillRect(3, 2, 2, 12);
            c.fillRect(11, 2, 2, 12);
            c.fillStyle = color;
            c.fillRect(5, 5, 6, 2);
            c.fillRect(5, 8, 6, 2);
            c.fillRect(5, 11, 4, 1);
            break;
        case 'upgrade':
            c.fillStyle = '#2c3e50';
            c.fillRect(2, 4, 12, 8);
            c.fillStyle = color;
            c.fillRect(6, 2, 4, 4);
            c.fillRect(4, 6, 8, 4);
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.3);
            c.fillRect(6, 6, 4, 2);
            break;
        case 'dust':
            c.fillRect(2, 10, 12, 4);
            c.fillRect(4, 8, 8, 6);
            c.fillRect(6, 6, 4, 8);
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.3);
            c.fillRect(6, 8, 2, 2);
            break;
        case 'blob':
            c.fillRect(4, 4, 8, 8);
            c.fillRect(2, 6, 12, 4);
            c.fillRect(6, 2, 4, 12);
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.4);
            c.fillRect(5, 5, 3, 3);
            break;
        case 'paper':
            c.fillRect(2, 2, 12, 12);
            c.fillRect(4, 4, 8, 8);
            c.fillStyle = '#f5f5dc';
            c.fillRect(3, 3, 10, 10);
            c.fillStyle = color;
            c.fillRect(5, 5, 6, 1);
            c.fillRect(5, 8, 6, 1);
            c.fillRect(5, 11, 4, 1);
            break;
        case 'vial':
            c.fillStyle = '#8b4513';
            c.fillRect(6, 2, 4, 3);
            c.fillRect(5, 5, 6, 2);
            c.fillStyle = color;
            c.fillRect(3, 7, 10, 7);
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.35);
            c.fillRect(5, 8, 3, 4);
            break;
        case 'crystal':
            c.fillRect(6, 2, 4, 4);
            c.fillRect(4, 6, 8, 6);
            c.fillRect(6, 12, 4, 2);
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.4);
            c.fillRect(7, 3, 2, 3);
            c.fillRect(5, 7, 2, 4);
            break;
        case 'ore_dark':
            c.fillRect(2, 4, 12, 10);
            c.fillRect(4, 2, 8, 12);
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.2);
            c.fillRect(4, 6, 4, 4);
            c.fillStyle = '#000';
            c.fillRect(6, 5, 2, 2);
            c.fillRect(10, 8, 2, 2);
            break;
        case 'coal':
            c.fillRect(3, 4, 10, 10);
            c.fillRect(5, 2, 6, 12);
            c.fillRect(4, 3, 8, 10);
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.15);
            c.fillRect(5, 5, 3, 3);
            c.fillRect(9, 8, 2, 2);
            break;
        case 'flame':
            c.fillRect(6, 2, 4, 4);
            c.fillRect(4, 6, 8, 4);
            c.fillRect(6, 10, 4, 4);
            c.fillRect(2, 8, 4, 4);
            c.fillRect(10, 8, 4, 4);
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.4);
            c.fillRect(7, 3, 2, 3);
            c.fillRect(5, 7, 2, 2);
            break;
        case 'seal':
            c.fillRect(4, 4, 8, 8);
            c.fillRect(2, 6, 12, 4);
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.3);
            c.fillRect(5, 5, 6, 6);
            c.fillStyle = '#fff';
            c.fillRect(7, 7, 2, 2);
            break;
        case 'shard':
            c.fillRect(6, 2, 4, 4);
            c.fillRect(4, 6, 8, 4);
            c.fillRect(6, 10, 4, 4);
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.4);
            c.fillRect(7, 3, 2, 3);
            c.fillRect(5, 7, 2, 2);
            c.fillStyle = '#000';
            c.fillRect(7, 8, 1, 2);
            break;
        case 'moss':
            c.fillRect(2, 8, 12, 6);
            c.fillRect(4, 6, 8, 8);
            c.fillRect(6, 4, 4, 10);
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.3);
            c.fillRect(4, 8, 4, 3);
            c.fillRect(8, 6, 3, 2);
            break;
        case 'sac':
            c.fillRect(4, 4, 8, 8);
            c.fillRect(2, 6, 12, 4);
            c.fillRect(6, 2, 4, 12);
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.3);
            c.fillRect(6, 6, 4, 4);
            c.fillStyle = '#000';
            c.fillRect(7, 8, 2, 1);
            break;
        case 'bark':
            c.fillRect(2, 2, 4, 12);
            c.fillRect(6, 2, 4, 12);
            c.fillRect(10, 2, 4, 12);
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.2);
            c.fillRect(3, 4, 2, 4);
            c.fillRect(7, 6, 2, 4);
            c.fillRect(11, 4, 2, 4);
            break;
        case 'spore':
            c.fillRect(6, 6, 4, 4);
            c.fillRect(4, 8, 8, 4);
            c.fillRect(8, 4, 4, 8);
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.4);
            c.fillRect(7, 7, 2, 2);
            c.fillRect(5, 9, 2, 2);
            c.fillRect(9, 5, 2, 2);
            break;
        case 'eye':
            c.fillRect(4, 4, 8, 8);
            c.fillRect(2, 6, 12, 4);
            c.fillStyle = '#fff';
            c.fillRect(6, 6, 4, 4);
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.5);
            c.fillRect(7, 7, 2, 2);
            c.fillStyle = '#000';
            c.fillRect(7, 7, 1, 1);
            break;
        case 'vein':
            c.fillRect(6, 2, 4, 12);
            c.fillRect(4, 4, 8, 2);
            c.fillRect(2, 8, 4, 2);
            c.fillRect(10, 8, 4, 2);
            c.fillRect(4, 12, 8, 2);
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.3);
            c.fillRect(7, 3, 2, 10);
            c.fillRect(5, 5, 2, 1);
            c.fillRect(9, 9, 2, 1);
            break;
        case 'stone':
            c.fillRect(2, 4, 12, 10);
            c.fillRect(4, 2, 8, 12);
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.15);
            c.fillRect(4, 6, 4, 4);
            c.fillRect(8, 4, 3, 3);
            c.fillStyle = '#000';
            c.fillRect(6, 5, 2, 2);
            break;
        case 'coin':
            c.fillRect(4, 4, 8, 8);
            c.fillRect(2, 6, 12, 4);
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.4);
            c.fillRect(6, 6, 4, 4);
            c.fillStyle = '#000';
            c.fillRect(7, 7, 2, 2);
            break;
        case 'essence':
            c.fillRect(6, 2, 4, 4);
            c.fillRect(4, 6, 8, 4);
            c.fillRect(6, 10, 4, 4);
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.5);
            c.fillRect(7, 3, 2, 2);
            c.fillRect(5, 7, 2, 2);
            c.fillRect(9, 7, 2, 2);
            c.fillRect(7, 11, 2, 2);
            break;
        case 'relic_book':
            c.fillStyle = color;
            c.fillRect(2, 2, 12, 12);
            c.fillRect(4, 1, 8, 2);
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.3);
            c.fillRect(3, 3, 10, 10);
            c.fillStyle = '#f5f5dc';
            c.fillRect(4, 4, 8, 8);
            c.fillStyle = color;
            c.fillRect(5, 5, 6, 1);
            c.fillRect(5, 8, 6, 1);
            c.fillRect(5, 11, 4, 1);
            c.fillStyle = '#f1c40f';
            c.fillRect(6, 2, 4, 1);
            c.fillRect(6, 13, 4, 1);
            break;
        case 'relic_flask':
            c.fillStyle = '#8b4513';
            c.fillRect(6, 1, 4, 3);
            c.fillRect(5, 4, 6, 2);
            c.fillStyle = color;
            c.fillRect(3, 6, 10, 8);
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.3);
            c.fillRect(5, 7, 4, 5);
            c.fillStyle = 'rgba(255,255,255,0.3)';
            c.fillRect(4, 6, 2, 3);
            c.fillStyle = '#f1c40f';
            c.fillRect(5, 1, 1, 1);
            c.fillRect(10, 1, 1, 1);
            break;
        case 'relic_wing':
            c.fillStyle = color;
            c.fillRect(2, 4, 5, 8);
            c.fillRect(9, 4, 5, 8);
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.3);
            c.fillRect(3, 5, 3, 6);
            c.fillRect(10, 5, 3, 6);
            c.fillStyle = '#fff';
            c.fillRect(4, 6, 1, 4);
            c.fillRect(11, 6, 1, 4);
            c.fillStyle = color;
            c.fillRect(7, 6, 2, 4);
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.4);
            c.fillRect(7, 7, 2, 2);
            break;
    }
}

export function drawItemTextures(mk) {
    const defs = [
        { key: 'item_stick',   color: '#a07828', shape: 'line' },
        { key: 'item_stone',   color: '#95a5a6', shape: 'diamond' },
        { key: 'item_leaf',    color: '#27ae60', shape: 'leaf' },
        { key: 'item_mush',    color: '#e74c3c', shape: 'mush' },
        { key: 'item_iron',    color: '#bdc3c7', shape: 'ore' },
        { key: 'item_leather', color: '#a0522d', shape: 'rect' },
        { key: 'item_herb',    color: '#2ecc71', shape: 'herb' },
        { key: 'item_ruby',    color: '#e74c3c', shape: 'gem' },
        { key: 'item_sapph',   color: '#3498db', shape: 'gem' },
        { key: 'item_flame',   color: '#e67e22', shape: 'sword' },
        { key: 'item_dscale',  color: '#8e44ad', shape: 'scale' },
        { key: 'item_crown',   color: '#f1c40f', shape: 'crown' },
        { key: 'acc_hat',      color: '#9b59b6', shape: 'hat' },
        { key: 'acc_mantle',   color: '#6c3483', shape: 'mantle' },
        { key: 'acc_legs',     color: '#1a5276', shape: 'legs' },
        { key: 'acc_book',     color: '#8e44ad', shape: 'book' },
        { key: 'acc_amulet',   color: '#f39c12', shape: 'amulet' },
        { key: 'acc_ring',     color: '#e67e22', shape: 'ring' },
        { key: 'acc_charm',    color: '#27ae60', shape: 'charm' },
        // Sage (purple tones)
        { key: 'sage_hat',     color: '#9b59b6', shape: 'hat' },
        { key: 'sage_mantle',  color: '#7d3c98', shape: 'mantle' },
        { key: 'sage_legs',    color: '#1a5276', shape: 'legs' },
        { key: 'sage_book',    color: '#8e44ad', shape: 'book' },
        { key: 'sage_amulet',  color: '#f39c12', shape: 'amulet' },
        { key: 'sage_ring',    color: '#8e44ad', shape: 'ring' },
        { key: 'sage_charm',   color: '#7d3c98', shape: 'charm' },
        // Alchemist (red/orange tones)
        { key: 'alch_hat',     color: '#c0392b', shape: 'hat' },
        { key: 'alch_mantle',  color: '#922b21', shape: 'mantle' },
        { key: 'alch_legs',    color: '#784212', shape: 'legs' },
        { key: 'alch_wand',    color: '#cb4335', shape: 'book' },
        { key: 'alch_amulet',  color: '#d4ac0d', shape: 'amulet' },
        { key: 'alch_ring',    color: '#dc7633', shape: 'ring' },
        { key: 'alch_charm',   color: '#cb4335', shape: 'charm' },
        // Angel (gold/white tones)
        { key: 'angel_hat',    color: '#f1c40f', shape: 'hat' },
        { key: 'angel_mantle', color: '#d4ac0d', shape: 'mantle' },
        { key: 'angel_legs',   color: '#b7950b', shape: 'legs' },
        { key: 'angel_staff',  color: '#f5f5dc', shape: 'book' },
        { key: 'angel_amulet', color: '#f39c12', shape: 'amulet' },
        { key: 'angel_ring',   color: '#f1c40f', shape: 'ring' },
        { key: 'angel_charm',  color: '#d4ac0d', shape: 'charm' },
        { key: 'consumable_potion', color: '#e74c3c', shape: 'potion' },
        // Potions (unique per type)
        { key: 'potion_heal_small',  color: '#27ae60', shape: 'potion_flask' },
        { key: 'potion_heal_medium', color: '#2980b9', shape: 'potion_flask' },
        { key: 'potion_heal_large',  color: '#8e44ad', shape: 'potion_flask' },
        { key: 'potion_berserker',   color: '#e74c3c', shape: 'potion_flask' },
        { key: 'potion_swift',       color: '#1abc9c', shape: 'potion_flask' },
        { key: 'potion_iron',        color: '#7f8c8d', shape: 'potion_flask' },
        { key: 'potion_heal_mega',   color: '#f1c40f', shape: 'potion_flask' },
        { key: 'potion_precision',   color: '#e67e22', shape: 'potion_flask' },
        { key: 'potion_vampiric',    color: '#c0392b', shape: 'potion_flask' },
        // Boost scrolls
        { key: 'item_scroll_xp',    color: '#3498db', shape: 'scroll' },
        { key: 'item_scroll_gold',  color: '#f1c40f', shape: 'scroll' },
        { key: 'item_scroll_loot',  color: '#2ecc71', shape: 'scroll' },
        { key: 'item_scroll_dmg',   color: '#e74c3c', shape: 'scroll' },
        { key: 'item_scroll_def',   color: '#95a5a6', shape: 'scroll' },
        { key: 'item_scroll_regen', color: '#27ae60', shape: 'scroll' },
        // Permanent upgrades
        { key: 'item_upgrade_hp',   color: '#e74c3c', shape: 'upgrade' },
        { key: 'item_upgrade_dmg',  color: '#f39c12', shape: 'upgrade' },
        { key: 'item_upgrade_spd',  color: '#1abc9c', shape: 'upgrade' },
        { key: 'item_upgrade_crit', color: '#9b59b6', shape: 'upgrade' },
        { key: 'item_upgrade_regen',color: '#27ae60', shape: 'upgrade' },
        // Depths materials
        { key: 'mat_bone_dust',      color: '#d4c4a4', shape: 'dust' },
        { key: 'mat_ectoplasm',      color: '#44aa88', shape: 'blob' },
        { key: 'mat_torn_page',      color: '#c4b494', shape: 'paper' },
        { key: 'mat_ancient_scroll', color: '#d4a574', shape: 'scroll' },
        { key: 'mat_ink_vial',       color: '#1a1a3a', shape: 'vial' },
        { key: 'mat_crystal_fragment', color: '#8844cc', shape: 'crystal' },
        { key: 'mat_soul_iron',      color: '#4a4a5a', shape: 'ore_dark' },
        { key: 'mat_dark_coal',      color: '#2a2a2a', shape: 'coal' },
        { key: 'mat_essence_fire',   color: '#ff6622', shape: 'flame' },
        { key: 'mat_judgement_seal', color: '#ccaa00', shape: 'seal' },
        { key: 'mat_doom_shard',     color: '#6600aa', shape: 'shard' },
        // Swamp materials
        { key: 'mat_swamp_moss',     color: '#3a7a3a', shape: 'moss' },
        { key: 'mat_venom_sac',      color: '#66aa33', shape: 'sac' },
        // Poison forest materials
        { key: 'mat_corrupted_bark', color: '#5a4a3a', shape: 'bark' },
        { key: 'mat_plague_dust',    color: '#8a7a5a', shape: 'spore' },
        { key: 'mat_toxin_essence',  color: '#aadd55', shape: 'essence' },
        // Temple materials
        { key: 'mat_ancient_rune',   color: '#cc8800', shape: 'seal' },
        { key: 'mat_warden_eye',     color: '#ffaa00', shape: 'eye' },
        { key: 'mat_temple_stone',   color: '#6a6a7a', shape: 'stone' },
        // Heart materials
        { key: 'mat_heart_vein',     color: '#cc2244', shape: 'vein' },
        { key: 'mat_flesh_shard',    color: '#aa3a4a', shape: 'shard' },
        // Cross-biome materials
        { key: 'mat_void_essence',   color: '#cc22ff', shape: 'essence' },
        { key: 'mat_cursed_gold',    color: '#ccaa00', shape: 'coin' },
        // Depths weapons
        { key: 'bone_cleaver',       color: '#d4c4a4', shape: 'sword' },
        { key: 'bone_staff',         color: '#c4b494', shape: 'line' },
        // Depths armor
        { key: 'bone_armor',         color: '#d4c4a4', shape: 'rect' },
        { key: 'bone_shield',        color: '#c4b494', shape: 'diamond' },
        // Depths accessories
        { key: 'bone_ring',          color: '#d4c4a4', shape: 'ring' },
        { key: 'bone_amulet',        color: '#e4d4b4', shape: 'amulet' },
        // Cursed weapons
        { key: 'cursed_blade',       color: '#cc2244', shape: 'sword' },
        { key: 'cursed_wand',        color: '#6a1a3a', shape: 'line' },
        // Cursed armor
        { key: 'cursed_armor',       color: '#4a0a2a', shape: 'rect' },
        { key: 'cursed_cloak',       color: '#6a1a3a', shape: 'mantle' },
        // Cursed accessories
        { key: 'cursed_ring',        color: '#cc2244', shape: 'ring' },
        { key: 'cursed_charm',       color: '#ff4466', shape: 'charm' },
        // Shadow weapons
        { key: 'shadow_blade',       color: '#1a1a2a', shape: 'sword' },
        { key: 'shadow_staff',       color: '#2a2a3a', shape: 'line' },
        // Shadow armor
        { key: 'shadow_armor',       color: '#0a0a18', shape: 'rect' },
        { key: 'shadow_cloak',       color: '#1a1a2a', shape: 'mantle' },
        // Shadow accessories
        { key: 'shadow_ring',        color: '#6a4aaa', shape: 'ring' },
        { key: 'shadow_amulet',      color: '#8a6acc', shape: 'amulet' },
        // Tower weapons
        { key: 'tower_blade',        color: '#5a5a62', shape: 'sword' },
        { key: 'tower_staff',        color: '#4a4a52', shape: 'line' },
        // Tower armor
        { key: 'tower_armor',        color: '#5a5a62', shape: 'rect' },
        { key: 'tower_helm',         color: '#4a4a52', shape: 'hat' },
        // Tower accessories
        { key: 'tower_ring',         color: '#ff6600', shape: 'ring' },
        { key: 'tower_amulet',       color: '#ffaa00', shape: 'amulet' },
        // Eternal weapons
        { key: 'eternal_blade',      color: '#d4ac0d', shape: 'sword' },
        { key: 'eternal_staff',      color: '#f1c40f', shape: 'line' },
        // Eternal armor
        { key: 'eternal_armor',      color: '#d4ac0d', shape: 'rect' },
        { key: 'eternal_crown',      color: '#f1c40f', shape: 'crown' },
        // Eternal accessories
        { key: 'eternal_ring',       color: '#d4ac0d', shape: 'ring' },
        { key: 'eternal_amulet',     color: '#f1c40f', shape: 'amulet' },
        // Relic textures (3 unique)
        { key: 'relic_sage',         color: '#6a4aaa', shape: 'relic_book' },
        { key: 'relic_alchemist',    color: '#27ae60', shape: 'relic_flask' },
        { key: 'relic_angel',        color: '#f1c40f', shape: 'relic_wing' },
        // Depths gear
        { key: 'bone_hat',           color: '#d4c4a4', shape: 'hat' },
        { key: 'bone_mantle',        color: '#c4b494', shape: 'mantle' },
        { key: 'bone_legs',          color: '#b8a888', shape: 'legs' },
        // Cursed gear
        { key: 'cursed_hat',         color: '#6a1a3a', shape: 'hat' },
        { key: 'cursed_mantle',      color: '#4a0a2a', shape: 'mantle' },
        { key: 'cursed_legs',        color: '#3a0a1a', shape: 'legs' },
        // Shadow gear
        { key: 'shadow_hat',         color: '#1a1a2a', shape: 'hat' },
        { key: 'shadow_mantle',      color: '#0a0a18', shape: 'mantle' },
        { key: 'shadow_legs',        color: '#0a0a14', shape: 'legs' },
        // Tower gear
        { key: 'tower_hat',          color: '#5a5a62', shape: 'hat' },
        { key: 'tower_mantle',       color: '#4a4a52', shape: 'mantle' },
        { key: 'tower_legs',         color: '#3a3a42', shape: 'legs' },
        // Eternal gear
        { key: 'eternal_hat',        color: '#f1c40f', shape: 'hat' },
        { key: 'eternal_mantle',     color: '#d4ac0d', shape: 'mantle' },
        { key: 'eternal_legs',       color: '#b7950b', shape: 'legs' }
    ];

    defs.forEach(({ key, color, shape }) => {
        mk(key, 16, 16, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = color;
            drawItemShape(c, shape, color);
        });
    });
}
