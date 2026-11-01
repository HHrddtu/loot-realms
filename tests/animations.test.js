import { describe, it, expect } from 'vitest';
import { getEnemyAttackAnim, hasDeathAnim } from '../src/config/animations.js';

describe('enemy animation mapping', () => {
    it('maps melee mobs to attack animations', () => {
        expect(getEnemyAttackAnim('goblin')).toBe('goblin_attack');
        expect(getEnemyAttackAnim('slime')).toBe('slime_attack_anim');
        expect(getEnemyAttackAnim('rat')).toBe('rat_attack_anim');
        expect(getEnemyAttackAnim('village_brute')).toBe('village_brute_attack_anim');
        expect(getEnemyAttackAnim('hell_guard')).toBe('hell_guard_attack_anim');
        expect(getEnemyAttackAnim('tower_knight')).toBe('tower_knight_attack_anim');
    });

    it('maps skeleton variants to the shared skeleton attack sheet', () => {
        expect(getEnemyAttackAnim('skeleton_warrior')).toBe('skeleton_attack');
        expect(getEnemyAttackAnim('skeleton_archer')).toBe('skeleton_attack');
        expect(getEnemyAttackAnim('skeleton_shaman')).toBe('skeleton_attack');
        expect(getEnemyAttackAnim('skeleton_lord')).toBe('skeleton_lord_attack');
    });

    it('maps the cursed boss to its attack sheet', () => {
        expect(getEnemyAttackAnim('ancient_evil')).toBe('ancient_evil_attack');
        expect(hasDeathAnim('ancient_evil')).toBe(true);
    });

    it('returns null for mobs without a dedicated attack', () => {
        expect(getEnemyAttackAnim('lich_king')).toBeNull();
        expect(getEnemyAttackAnim('unknown_mob')).toBeNull();
    });
});
