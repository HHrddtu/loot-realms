import Phaser from 'phaser';
import { loadAccount } from '../save.js';
import { PET_DB } from '../config/pets.js';
import { playPetAttack } from '../sound.js';

export class PetSystem {
    constructor(scene) {
        this.scene = scene;
        this.petSprite = null;
        this.petData = null;
        this.petTarget = null;
        this.petAttackTimer = 0;
        this.petAttackCooldown = 2000;
        this.petAbilityTimer = 0;
        this.petAttackCount = 0;
        this.petLevel = 1;
    }

    destroy() {
        if (this.petSprite) { this.petSprite.destroy(); this.petSprite = null; }
        this.petData = null; this.petTarget = null;
    }

    create() {
        this.destroy();
        this.petAttackTimer = 0; this.petAbilityTimer = 0; this.petAttackCount = 0;
        this.petAttackCooldown = 2000;
        const acc = loadAccount() || {};
        const equippedPet = acc.equippedPet;
        if (!equippedPet) return;
        const petData = PET_DB.find(p => p.id === equippedPet);
        if (!petData) return;
        this.petData = petData;
        this.petLevel = (acc.petLevels || {})[equippedPet] || 1;
        this.petSprite = this.scene.add.sprite(this.scene.player.x + 20, this.scene.player.y + 10, petData.texKey).setDepth(9).setScale(1.5);
        this.scene.tweens.add({ targets: this.petSprite, scaleY: 1.6, duration: 1200, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    }

    updateFollow() {
        const s = this.scene;
        if (!this.petSprite || !s.player) return;
        if (this.petTarget && this.petTarget.active && this.petTarget.stats && this.petTarget.stats.hp > 0) {
            const dx = this.petTarget.x - this.petSprite.x;
            const dy = this.petTarget.y - this.petSprite.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const type = this.petData.type;
            if (type === 'tank') {
                const toEx = this.petTarget.x - s.player.x;
                const toEy = this.petTarget.y - s.player.y;
                const eDist = Math.sqrt(toEx * toEx + toEy * toEy);
                const ideal = Math.min(50, eDist * 0.4);
                const tx = s.player.x + (toEx / (eDist || 1)) * ideal;
                const ty = s.player.y + (toEy / (eDist || 1)) * ideal;
                const tdx = tx - this.petSprite.x, tdy = ty - this.petSprite.y, tdist = Math.sqrt(tdx * tdx + tdy * tdy);
                if (tdist > 8) { this.petSprite.x += (tdx / tdist) * 2.5; this.petSprite.y += (tdy / tdist) * 2.5; }
            } else {
                const stop = type === 'healer' ? 70 : 48;
                if (dist > stop) { const spd = 2.8; this.petSprite.x += (dx / dist) * spd; this.petSprite.y += (dy / dist) * spd; }
                else if (type === 'healer' && dist < 40) { this.petSprite.x -= (dx / dist) * 1.2; this.petSprite.y -= (dy / dist) * 1.2; }
            }
            this.petSprite.setFlipX(dx < 0);
        } else {
            this.petTarget = null;
            const offX = s.facing === 'left' ? -24 : 24;
            const tx = s.player.x + offX, ty = s.player.y + 10;
            const dx = tx - this.petSprite.x, dy = ty - this.petSprite.y, dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 100) { this.petSprite.x = tx; this.petSprite.y = ty; }
            else { this.petSprite.x += dx * 0.12; this.petSprite.y += dy * 0.12; }
            this.petSprite.setFlipX(s.facing === 'left');
        }
    }

    updateCombat(delta) {
        const s = this.scene;
        if (!this.petSprite || !this.petData) return;
        const type = this.petData.type;
        const cooldowns = { attacker: 1500, companion: 2200, tank: 2500, collector: 2000 };
        this.petAttackCooldown = cooldowns[type] || 2000;
        this.petAttackTimer -= delta;
        this.petAbilityTimer -= delta;

        // Find target
        if (this.petTarget && (!this.petTarget.active || !this.petTarget.stats || this.petTarget.stats.hp <= 0)) this.petTarget = null;
        if (!this.petTarget) {
            const ranges = { attacker: 130, companion: 110, tank: 150, collector: 100 };
            let bestDist = ranges[type] || 120;
            let best = null;
            const groups = [s.enemies, s.villageZombies, s.hellImps, s.caveSmallBats];
            groups.forEach(grp => {
                if (!grp || !grp.scene) return;
                let ch; try { ch = grp.getChildren(); } catch (e) { return; }
                ch.forEach(e => {
                    if (!e.active || !e.stats || e.stats.hp <= 0) return;
                    const d = Phaser.Math.Distance.Between(this.petSprite.x, this.petSprite.y, e.x, e.y);
                    if (d < bestDist) { best = e; bestDist = d; }
                });
            });
            [s.boss, s.mineBoss, s.caveBoss, s.villageBoss, s.hellBoss, s.snowyIceSpirit, s.castleBoss].forEach(b => {
                if (b && b.active && b.stats && b.stats.hp > 0) {
                    const d = Phaser.Math.Distance.Between(this.petSprite.x, this.petSprite.y, b.x, b.y);
                    if (d < bestDist) { best = b; bestDist = d; }
                }
            });
            this.petTarget = best;
        }

        // Attack
        if (this.petTarget && this.petAttackTimer <= 0) {
            this.petAttackTimer = this.petAttackCooldown;
            this.petAttackCount++;
            const baseDmg = Math.floor(s.playerDamage * 0.3 * (1 + (this.petLevel - 1) * 0.3));
            let dmg = Math.max(1, baseDmg);

            // Passive: attacker crit every 4th hit
            if (type === 'attacker' && this.petAttackCount % 4 === 0) {
                dmg = Math.floor(dmg * 2);
                s.floatingText(this.petTarget.x, this.petTarget.y - 30, 'PET CRIT!', '#ff6600');
            }

            playPetAttack(type);
            s.tweens.add({ targets: this.petSprite, scaleX: 2.0, scaleY: 1.0, duration: 80, yoyo: true, ease: 'Quad.easeOut' });
            s.combat.hitEnemy(this.petTarget, dmg);
        }

        // Passive: tank shield every 10s
        if (type === 'tank' && this.petAttackCount > 0 && this.petAttackCount % 5 === 0 && this.petSprite.alpha > 0.5) {
            s.floatingText(this.petSprite.x, this.petSprite.y - 20, 'GUARD!', '#3498db');
            s.tweens.add({ targets: this.petSprite, alpha: 0.6, duration: 80, yoyo: true, repeat: 4 });
        }

        // Active ability
        if (this.petTarget && this.petAbilityTimer <= 0 && this.petData.abilityKey) {
            this.petAbilityTimer = this.petData.abilityCd || 12000;
            this._useAbility(this.petData.abilityKey, s);
        }
    }

    _useAbility(key, s) {
        switch (key) {
            case 'rush':
                if (!this.petTarget) return;
                s.tweens.add({ targets: this.petSprite, x: this.petTarget.x + 20, y: this.petTarget.y, duration: 200, ease: 'Power2' });
                const rushDmg = Math.floor(s.playerDamage * 0.6 * (1 + (this.petLevel - 1) * 0.3));
                s.combat.hitEnemy(this.petTarget, Math.max(1, rushDmg));
                s.floatingText(this.petTarget.x, this.petTarget.y - 30, 'RUSH!', '#ff8800');
                break;
            case 'taunt':
                if (!this.petTarget) return;
                const range = 150;
                const groups = [s.enemies, s.villageZombies, s.hellImps, s.caveSmallBats];
                groups.forEach(grp => {
                    if (!grp || !grp.scene) return;
                    let ch; try { ch = grp.getChildren(); } catch (e) { return; }
                    ch.forEach(e => {
                        if (!e.active || !e.stats) return;
                        if (Phaser.Math.Distance.Between(this.petSprite.x, this.petSprite.y, e.x, e.y) < range) {
                            e._tauntedUntil = Date.now() + 3000;
                        }
                    });
                });
                this.petSprite.setTint(0xff6600);
                s.time.delayedCall(3000, () => { if (this.petSprite && this.petSprite.active) this.petSprite.clearTint(); });
                s.floatingText(this.petSprite.x, this.petSprite.y - 20, 'TAUNT!', '#ff6600');
                break;
            case 'vacuum':
                if (!s.groundLootGroup) return;
                let collected = 0;
                s.groundLootGroup.getChildren().forEach(loot => {
                    if (!loot.active) return;
                    s.tweens.add({ targets: loot, x: s.player.x, y: s.player.y, duration: 400, ease: 'Power2', onComplete: () => { if (loot.active) { loot.destroy(); collected++; } } });
                });
                if (collected > 0) s.floatingText(s.player.x, s.player.y - 30, 'VACUUM!', '#f1c40f');
                break;
            case 'buff':
                s.floatingText(this.petSprite.x, this.petSprite.y - 20, 'INSPIRE!', '#9b59b6');
                const buffDmg = Math.floor(s.playerDamage * 0.2);
                s.playerDamage = (s.playerDamage || 0) + buffDmg;
                s.time.delayedCall(5000, () => { s.playerDamage = Math.max(1, (s.playerDamage || 0) - buffDmg); });
                break;
        }
    }

    getAggroTarget() {
        if (!this.petSprite || !this.petData || this.petData.type !== 'tank') return this.scene.player;
        const d = Phaser.Math.Distance.Between(this.petSprite.x, this.petSprite.y, this.scene.player.x, this.scene.player.y);
        if (d > 150) return this.scene.player;
        return this.petSprite;
    }
}
