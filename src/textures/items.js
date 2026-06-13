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
            c.fillRect(6, 2, 4, 4);
            c.fillRect(4, 6, 8, 4);
            c.fillRect(6, 10, 4, 4);
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.3);
            c.fillRect(6, 4, 2, 2);
            break;
        case 'sword':
            c.fillRect(7, 0, 2, 12);
            c.fillRect(4, 12, 8, 2);
            c.fillRect(6, 14, 4, 2);
            c.fillStyle = '#c0392b';
            c.fillRect(5, 10, 6, 2);
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
            c.fillRect(6, 2, 4, 4);
            c.fillRect(4, 6, 8, 4);
            c.fillRect(6, 10, 4, 4);
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.4);
            c.fillRect(7, 7, 2, 2);
            break;
        case 'ring':
            c.fillRect(4, 6, 8, 2);
            c.fillRect(4, 10, 8, 2);
            c.fillRect(3, 7, 2, 4);
            c.fillRect(11, 7, 2, 4);
            c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.4);
            c.fillRect(6, 5, 4, 2);
            c.fillRect(7, 12, 2, 1);
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
        { key: 'angel_charm',  color: '#d4ac0d', shape: 'charm' }
    ];

    defs.forEach(({ key, color, shape }) => {
        mk(key, 16, 16, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = color;
            drawItemShape(c, shape, color);
        });
    });
}
