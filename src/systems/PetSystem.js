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
        this.petLevel = 1;
    }

    destroy() {
        if (this.petSprite) {
            this.petSprite.destroy();
            this.petSprite = null;
        }
        this.petData = null;
        this.petTarget = null;
    }

    create() {
        this.destroy();
        this.petAttackTimer = 0;
        this.petAttackCooldown = 2000;
        const acc = loadAccount() || {};
        const equippedPet = acc.equippedPet;
        if (!equippedPet) return;
        const petData = PET_DB.find(p => p.id === equippedPet);
        if (!petData) return;
        this.petData = petData;
        this.petLevel = (acc.petLevels || {})[equippedPet] || 1;
        this.petSprite = this.scene.add.sprite(this.scene.player.x + 20, this.scene.player.y + 10, petData.texKey)
            .setDepth(9).setScale(1.5);
        this.scene.tweens.add({
            targets: this.petSprite,
            scaleY: 1.6,
            duration: 1200,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    updateFollow() {
        const s = this.scene;
        if (!this.petSprite || !s.player) return;
        if (this.petTarget && this.petTarget.active && this.petTarget.stats && this.petTarget.stats.hp > 0) {
            const dx = this.petTarget.x - this.petSprite.x;
            const dy = this.petTarget.y - this.petSprite.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (this.petData.type === 'tank') {
                const toEnemyX = this.petTarget.x - s.player.x;
                const toEnemyY = this.petTarget.y - s.player.y;
                const enemyDist = Math.sqrt(toEnemyX * toEnemyX + toEnemyY * toEnemyY);
                const idealDist = Math.min(50, enemyDist * 0.4);
                const tx = s.player.x + (toEnemyX / (enemyDist || 1)) * idealDist;
                const ty = s.player.y + (toEnemyY / (enemyDist || 1)) * idealDist;
                const tdx = tx - this.petSprite.x;
                const tdy = ty - this.petSprite.y;
                const tdist = Math.sqrt(tdx * tdx + tdy * tdy);
                if (tdist > 8) {
                    this.petSprite.x += (tdx / tdist) * 2.5;
                    this.petSprite.y += (tdy / tdist) * 2.5;
                }
            } else {
                const stopDist = 48;
                if (dist > stopDist) {
                    const speed = 2.8;
                    this.petSprite.x += (dx / dist) * speed;
                    this.petSprite.y += (dy / dist) * speed;
                }
            }
            this.petSprite.setFlipX(dx < 0);
        } else {
            this.petTarget = null;
            const offsetX = s.facing === 'left' ? -20 : 20;
            const targetX = s.player.x + offsetX;
            const targetY = s.player.y + 10;
            const dx = targetX - this.petSprite.x;
            const dy = targetY - this.petSprite.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 100) {
                this.petSprite.x = targetX;
                this.petSprite.y = targetY;
            } else {
                this.petSprite.x += dx * 0.12;
                this.petSprite.y += dy * 0.12;
            }
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
        if (this.petTarget && (!this.petTarget.active || !this.petTarget.stats || this.petTarget.stats.hp <= 0)) {
            this.petTarget = null;
        }
        if (!this.petTarget) {
            const searchRanges = { attacker: 130, companion: 110, tank: 150, collector: 100 };
            let closestDist = searchRanges[type] || 120;
            let closest = null;
            const groups = [s.enemies, s.villageZombies, s.hellImps, s.caveSmallBats];
            groups.forEach(grp => {
                if (!grp) return;
                grp.getChildren().forEach(e => {
                    if (!e.active || !e.stats || e.stats.hp <= 0) return;
                    const d = Phaser.Math.Distance.Between(this.petSprite.x, this.petSprite.y, e.x, e.y);
                    if (d < closestDist) { closest = e; closestDist = d; }
                });
            });
            const bossList = [s.boss, s.mineBoss, s.caveBoss, s.villageBoss, s.hellBoss, s.snowyIceSpirit, s.castleBoss];
            bossList.forEach(b => {
                if (b && b.active && b.stats && b.stats.hp > 0) {
                    const d = Phaser.Math.Distance.Between(this.petSprite.x, this.petSprite.y, b.x, b.y);
                    if (d < closestDist) { closest = b; closestDist = d; }
                }
            });
            this.petTarget = closest;
        }
        if (this.petTarget && this.petAttackTimer <= 0) {
            this.petAttackTimer = this.petAttackCooldown;
            const baseDmg = Math.floor(s.playerDamage * 0.3 * (1 + (this.petLevel - 1) * 0.3));
            const dmg = Math.max(1, baseDmg);
            playPetAttack(type);
            s.tweens.add({
                targets: this.petSprite,
                scaleX: 2.0,
                scaleY: 1.0,
                duration: 80,
                yoyo: true,
                ease: 'Quad.easeOut'
            });
            s.combat.hitEnemy(this.petTarget, dmg);
        }
    }

    getAggroTarget() {
        if (!this.petSprite || !this.petData || this.petData.type !== 'tank') return this.scene.player;
        const petDist = Phaser.Math.Distance.Between(this.petSprite.x, this.petSprite.y, this.scene.player.x, this.scene.player.y);
        if (petDist > 150) return this.scene.player;
        return this.petSprite;
    }
}
