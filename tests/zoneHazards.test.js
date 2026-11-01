import { describe, it, expect } from 'vitest';
import { resolveSwampHazard } from '../src/systems/ZoneHazards.js';
import { SWAMP_HAZARD, DESERT_SANDSTORM } from '../src/config/zoneHazards.js';

const config = {
    puddleRadius: 50,
    puddles: [{ x: 100, y: 100 }],
    islands: [{ x: 100, y: 100, radius: 60 }]
};

describe('resolveSwampHazard', () => {
    it('detects a toxic puddle', () => {
        const hazard = resolveSwampHazard(120, 120, 0, { ...config, islands: [] });
        expect(hazard.inPuddle).toBe(true);
        expect(hazard.onIsland).toBe(false);
    });

    it('lets safe islands override puddles', () => {
        const hazard = resolveSwampHazard(100, 100, 0, config);
        expect(hazard.onIsland).toBe(true);
        expect(hazard.inPuddle).toBe(false);
    });

    it('applies the zone offset', () => {
        expect(resolveSwampHazard(300, 100, 200, { ...config, islands: [] }).inPuddle).toBe(true);
        expect(resolveSwampHazard(0, 100, 200, { ...config, islands: [] }).inPuddle).toBe(false);
    });

    it('returns no hazard outside puddles and islands', () => {
        const hazard = resolveSwampHazard(0, 0, 0, { ...config, islands: [] });
        expect(hazard.inPuddle).toBe(false);
        expect(hazard.onIsland).toBe(false);
    });
});

describe('hazard config', () => {
    it('keeps every swamp hazard inside the zone bounds', () => {
        SWAMP_HAZARD.puddles.forEach(p => {
            expect(p.x).toBeGreaterThanOrEqual(0);
            expect(p.x).toBeLessThanOrEqual(900);
            expect(p.y).toBeGreaterThanOrEqual(0);
            expect(p.y).toBeLessThanOrEqual(2000);
        });
        SWAMP_HAZARD.islands.forEach(i => {
            expect(i.radius).toBeGreaterThan(0);
            expect(i.x).toBeGreaterThanOrEqual(0);
            expect(i.x).toBeLessThanOrEqual(900);
            expect(i.y).toBeGreaterThanOrEqual(0);
            expect(i.y).toBeLessThanOrEqual(2000);
        });
    });

    it('uses sane sandstorm timings', () => {
        expect(DESERT_SANDSTORM.telegraph).toBeLessThan(DESERT_SANDSTORM.duration);
        expect(DESERT_SANDSTORM.speedMult).toBeGreaterThan(0);
        expect(DESERT_SANDSTORM.speedMult).toBeLessThan(1);
        expect(DESERT_SANDSTORM.interval).toBeGreaterThan(DESERT_SANDSTORM.duration);
    });
});
