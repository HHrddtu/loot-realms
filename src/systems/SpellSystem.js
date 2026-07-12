import Phaser from 'phaser';
import { SPELLS } from '../config/index.js';
import { recordKill } from '../bestiary.js';
import { SpellCast } from './SpellCast.js';
import { SpellProjectile } from './SpellProjectile.js';
import { SpellEffects } from './SpellEffects.js';

export class SpellSystem {
    constructor(scene) {
        this.scene = scene;
        this.cast = new SpellCast(scene);
        this.projectile = new SpellProjectile(scene);
        this.effects = new SpellEffects(scene);
        scene.effects = this.effects;
    }

    _updateCorruption() { this.cast._updateCorruption(); }
    _getClassSpells() { return this.cast._getClassSpells(); }

    _castSpell(slot) {
        const spell = SPELLS[slot];
        if (!spell) return;
        if (this.scene.spellCooldowns[slot] > 0) return;
        if (slot !== 'purify' && this.scene.corruption + spell.corruptionCost > this.scene.corruptionMax) return;

        this.scene.corruption += spell.corruptionCost;
        this.scene.spellCooldowns[slot] = spell.cooldown;

        // Sage spells
        if (slot === 'fireball') this.projectile._castProjectile(spell);
        else if (slot === 'chain_lightning') this.projectile._castChainLightning(spell);
        else if (slot === 'arcane_burst') this.effects._castArcaneBurst(spell);
        else if (slot === 'time_warp') this.effects._castTimeWarp(spell);
        else if (slot === 'nova_blast') this.projectile._castNovaBlast(spell);
        else if (slot === 'shield') this.effects._castShield(spell);
        else if (slot === 'heal') this.effects._castHeal(spell);
        else if (slot === 'meteor') this.projectile._castMeteor(spell);

        // Alchemist spells
        else if (slot === 'acid_flask') this.projectile._castAcidFlask(spell);
        else if (slot === 'poison_cloud') this.effects._castPoisonCloud(spell);
        else if (slot === 'toxic_puddle') this.effects._castToxicPuddle(spell);
        else if (slot === 'iron_skin') this.effects._castShield(spell);
        else if (slot === 'transmute') this.effects._castTransmute(spell);
        else if (slot === 'burrow') this.effects._castBurrow(spell);
        else if (slot === 'summon_golem') this.effects._castSummonGolem(spell);
        else if (slot === 'chemical_cloud') this.effects._castChemicalCloud(spell);
        else if (slot === 'philosopher_stone') this.effects._castDivineBlessing(spell);

        // Angel spells
        else if (slot === 'soul_strike') this.projectile._castSoulStrike(spell);
        else if (slot === 'smite') this.projectile._castProjectile(spell);
        else if (slot === 'holy_shield') this.effects._castHolyShield(spell);
        else if (slot === 'divine_shield') this.effects._castDivineShield(spell);
        else if (slot === 'healing_potion') this.effects._castHeal(spell);
        else if (slot === 'holy_nova') this.effects._castHolyNova(spell);
        else if (slot === 'resurrection') this.effects._castResurrection(spell);
        else if (slot === 'divine_blessing') this.effects._castDivineBlessing(spell);
        else if (slot === 'archangel_form') this.effects._castArchangelForm(spell);
        else if (slot === 'purify') this.effects._castPurify(spell);
    }

    _updateSpells(delta) {
        const dt = delta / 1000;
        this.cast._updateTimers(dt);
        this.projectile._updateProjectiles(dt);
    }
}
