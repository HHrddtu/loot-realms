import { describe, it, expect } from 'vitest';

const BUFF_ICONS = {
    dmg:       { icon: '\u{1F525}', label: 'DMG' },
    spd:       { icon: '\u{1F680}', label: 'SPD' },
    def:       { icon: '\u{1F6E1}', label: 'DEF' },
    crit:      { icon: '\u{2728}',  label: 'CRIT' },
    lifesteal: { icon: '\u{1F5E1}', label: 'LS' },
    divine:    { icon: '\u{2726}',  label: 'BLESS' },
    poison:    { icon: '\u{2620}',  label: 'POISON' },
    shield:    { icon: '\u{1F6E1}', label: 'SHIELD' }
};

function getActiveBuffs(scene) {
    const buffs = [];
    if (scene._consumableBonusDmg > 0) buffs.push({ key: 'dmg', time: scene._consumableBonusDmgTimer });
    if (scene._consumableBonusSpd > 0) buffs.push({ key: 'spd', time: scene._consumableBonusSpdTimer });
    if (scene._consumableBonusDef > 0) buffs.push({ key: 'def', time: scene._consumableBonusDefTimer });
    if (scene._consumableBonusCrit > 0) buffs.push({ key: 'crit', time: scene._consumableBonusCritTimer });
    if (scene._consumableBonusLifesteal > 0) buffs.push({ key: 'lifesteal', time: scene._consumableBonusLifestealTimer });
    if (scene._divineBlessingTimer > 0) buffs.push({ key: 'divine', time: scene._divineBlessingTimer });
    if (scene._poisonDot && scene._poisonTimer > 0) buffs.push({ key: 'poison', time: scene._poisonTimer });
    if (scene.shieldActive) buffs.push({ key: 'shield', time: 0 });
    return buffs;
}

function createMockScene(overrides = {}) {
    return {
        _consumableBonusDmg: 0, _consumableBonusDmgTimer: 0,
        _consumableBonusSpd: 0, _consumableBonusSpdTimer: 0,
        _consumableBonusDef: 0, _consumableBonusDefTimer: 0,
        _consumableBonusCrit: 0, _consumableBonusCritTimer: 0,
        _consumableBonusLifesteal: 0, _consumableBonusLifestealTimer: 0,
        _divineBlessingTimer: 0, _divineBlessingDmgBuff: 0, _divineBlessingDefBuff: 0,
        _poisonDot: false, _poisonTimer: 0,
        shieldActive: false,
        ...overrides
    };
}

describe('StatusIcons buff detection', () => {
    it('returns no buffs when none active', () => {
        expect(getActiveBuffs(createMockScene())).toEqual([]);
    });

    it('detects consumable DMG boost with timer', () => {
        const scene = createMockScene({ _consumableBonusDmg: 0.2, _consumableBonusDmgTimer: 30000 });
        const buffs = getActiveBuffs(scene);
        expect(buffs).toHaveLength(1);
        expect(buffs[0].key).toBe('dmg');
        expect(buffs[0].time).toBe(30000);
    });

    it('detects multiple simultaneous buffs', () => {
        const scene = createMockScene({
            _consumableBonusDmg: 0.2, _consumableBonusDmgTimer: 30000,
            _consumableBonusSpd: 0.25, _consumableBonusSpdTimer: 20000,
            _poisonDot: true, _poisonTimer: 2500,
            shieldActive: true
        });
        const keys = getActiveBuffs(scene).map(b => b.key);
        expect(keys).toContain('dmg');
        expect(keys).toContain('spd');
        expect(keys).toContain('poison');
        expect(keys).toContain('shield');
    });

    it('expired buff with zero value is not shown', () => {
        const scene = createMockScene({ _consumableBonusDmg: 0, _consumableBonusDmgTimer: 5000 });
        expect(getActiveBuffs(scene)).toEqual([]);
    });

    it('divine blessing shows when timer active', () => {
        const scene = createMockScene({ _divineBlessingTimer: 8000 });
        const buffs = getActiveBuffs(scene);
        expect(buffs.some(b => b.key === 'divine')).toBe(true);
    });

    it('every detected buff has a known icon', () => {
        const scene = createMockScene({
            _consumableBonusDmg: 0.2, _consumableBonusDmgTimer: 1000,
            _consumableBonusSpd: 0.2, _consumableBonusSpdTimer: 1000,
            _consumableBonusDef: 0.2, _consumableBonusDefTimer: 1000,
            _consumableBonusCrit: 10, _consumableBonusCritTimer: 1000,
            _consumableBonusLifesteal: 0.1, _consumableBonusLifestealTimer: 1000,
            _divineBlessingTimer: 1000,
            _poisonDot: true, _poisonTimer: 1000,
            shieldActive: true
        });
        const buffs = getActiveBuffs(scene);
        expect(buffs.length).toBeGreaterThan(0);
        buffs.forEach(b => expect(BUFF_ICONS[b.key]).toBeTruthy());
    });
});