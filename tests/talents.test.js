import { describe, it, expect } from 'vitest';
import { CLASS_TALENTS } from '../src/config/talents.js';
import { getTalentEffects } from '../src/talents.js';

const EFFECT_DEFAULTS = getTalentEffects([]);

describe('compressed talent trees', () => {
    it('has 10 noticeable nodes per branch', () => {
        Object.values(CLASS_TALENTS).forEach(talents => {
            const branches = new Set(talents.map(t => t.branch));
            branches.forEach(branch => {
                expect(talents.filter(t => t.branch === branch)).toHaveLength(10);
            });
        });
    });

    it('has unique ids and valid requirements', () => {
        const ids = new Set();
        Object.values(CLASS_TALENTS).forEach(talents => {
            const branchIds = new Set(talents.map(t => t.id));
            talents.forEach(t => {
                expect(ids.has(t.id)).toBe(false);
                ids.add(t.id);
                expect(branchIds.has(t.id)).toBe(true);
                t.requires.forEach(req => expect(branchIds.has(req)).toBe(true));
                expect(t.description.length).toBeGreaterThan(10);
            });
        });
    });

    it('does not declare effects that getTalentEffects would drop', () => {
        Object.values(CLASS_TALENTS).forEach(talents => {
            talents.forEach(t => {
                Object.keys(t.effects).forEach(key => {
                    expect(EFFECT_DEFAULTS[key]).toBeDefined();
                });
            });
        });
    });

    it('preserves the quality effects', () => {
        const all = Object.values(CLASS_TALENTS).flat();
        const ids = all.map(t => t.id);
        const quality = { spellPierce: false, spellChain: false, spellSplashBurn: false, spellSpreadOnKill: false, cheatDeath: false };

        all.forEach(t => {
            Object.keys(quality).forEach(k => {
                if (t.effects[k]) quality[k] = true;
            });
        });

        expect(quality).toEqual({ spellPierce: true, spellChain: true, spellSplashBurn: true, spellSpreadOnKill: true, cheatDeath: true });
        expect(ids.length).toBe(90);
    });

    it('aggregates a full branch into a meaningful power spike', () => {
        const fireIds = CLASS_TALENTS.sage.filter(t => t.branch === 'fire').map(t => t.id);
        const effects = getTalentEffects(fireIds);

        expect(effects.spellDamage).toBeGreaterThanOrEqual(100);
        expect(effects.critChance).toBeGreaterThanOrEqual(30);
        expect(effects.spellPierce).toBe(true);
        expect(effects.spellSplashBurn).toBe(true);
    });

    it('ignores removed legacy node ids without throwing', () => {
        const effects = getTalentEffects(['s_fire_1', 's_fire_99', 'a_acid_24']);
        expect(effects.spellDamage).toBe(15);
    });
});
