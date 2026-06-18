import Phaser from 'phaser';

const STORAGE_KEY = 'loot_realms_keybinds';

export const KEYBIND_ACTIONS = [
    { id: 'move_up', label: 'Move Up', category: 'movement', default: 'UP' },
    { id: 'move_down', label: 'Move Down', category: 'movement', default: 'DOWN' },
    { id: 'move_left', label: 'Move Left', category: 'movement', default: 'LEFT' },
    { id: 'move_right', label: 'Move Right', category: 'movement', default: 'RIGHT' },
    { id: 'attack', label: 'Attack / Interact', category: 'gameplay', default: 'SPACE' },
    { id: 'consumable', label: 'Use Potion', category: 'gameplay', default: 'F' },
    { id: 'spell_q', label: 'Spell Slot 1', category: 'spells', default: 'Q' },
    { id: 'spell_w', label: 'Spell Slot 2', category: 'spells', default: 'W' },
    { id: 'spell_e', label: 'Spell Slot 3', category: 'spells', default: 'E' },
    { id: 'spell_r', label: 'Spell Slot 4', category: 'spells', default: 'R' },
    { id: 'inventory', label: 'Inventory', category: 'ui', default: 'I' },
    { id: 'pause', label: 'Pause', category: 'ui', default: 'P' },
    { id: 'talents', label: 'Talent Tree', category: 'ui', default: 'T' },
    { id: 'bestiary', label: 'Bestiary / Book', category: 'ui', default: 'B' },
    { id: 'quests', label: 'Quest Log', category: 'ui', default: 'N' },
    { id: 'crafting', label: 'Crafting', category: 'ui', default: 'C' },
    { id: 'spell_assign', label: 'Spell Assignment', category: 'ui', default: 'X' },
    { id: 'mute', label: 'Toggle Sound', category: 'ui', default: 'M' },
];

export const CATEGORY_ORDER = ['movement', 'gameplay', 'spells', 'ui'];
export const CATEGORY_LABELS = {
    movement: 'Movement',
    gameplay: 'Gameplay',
    spells: 'Spells',
    ui: 'Interface'
};

let _cache = null;

function getDefaultMap() {
    const map = {};
    KEYBIND_ACTIONS.forEach(a => { map[a.id] = a.default; });
    return map;
}

export function getKeybinds() {
    if (_cache) return _cache;
    try {
        const json = localStorage.getItem(STORAGE_KEY);
        if (json) {
            const saved = JSON.parse(json);
            const defaults = getDefaultMap();
            _cache = { ...defaults, ...saved };
            return _cache;
        }
    } catch (e) {}
    _cache = getDefaultMap();
    return _cache;
}

export function setKeybind(actionId, keyCode) {
    const binds = getKeybinds();
    binds[actionId] = keyCode;
    _cache = binds;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(binds));
    } catch (e) {}
}

export function resetKeybinds() {
    _cache = getDefaultMap();
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(_cache));
    } catch (e) {}
}

export function getKeyForAction(actionId) {
    return getKeybinds()[actionId] || '';
}

export function getKeyCodeForAction(actionId, keyboard) {
    const keyStr = getKeyForAction(actionId);
    if (!keyStr) return null;
    return keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[keyStr] || keyStr);
}

export function getKeyLabel(actionId) {
    const key = getKeyForAction(actionId);
    if (!key) return '---';
    const labels = {
        'UP': 'W/\u2191', 'DOWN': 'S/\u2193', 'LEFT': 'A/\u2190', 'RIGHT': 'D/\u2192',
        'SPACE': 'Space', 'SHIFT': 'Shift', 'CTRL': 'Ctrl', 'ALT': 'Alt',
        'ENTER': 'Enter', 'ESC': 'Esc', 'BACKSPACE': 'Bksp', 'TAB': 'Tab',
    };
    return labels[key] || key;
}

export function parseKeyCode(keyStr) {
    if (!keyStr) return null;
    const code = Phaser.Input.Keyboard.KeyCodes[keyStr];
    return code !== undefined ? code : null;
}

export function invalidateCache() {
    _cache = null;
}
