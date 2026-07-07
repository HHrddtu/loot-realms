import Phaser from 'phaser';

/**
 * Handles enemy projectile logic for VillageZone.
 * Extracted from VillageZone to reduce file size.
 */
export class VillageProjectiles {
    constructor(scene) {
        this.scene = scene;
    }

    fireProjectile(e, dx, dy, type) {
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const speed = type === 'arrow' ? 180 : type === 'heal' ? 120 : 150;
        const texKey = type === 'arrow' ? 'enemy_arrow' : type === 'heal' ? 'enemy_heal' : 'enemy_magic';

        const proj = this.scene.add.sprite(e.x, e.y, texKey).setDepth(15);
        this.scene.physics.add.existing(proj);
        proj.body.setVelocity((dx / dist) * speed, (dy / dist) * speed);
        proj.damage = e.stats.damage;
        proj.lifespan = 2000;
        proj.isHeal = (type === 'heal');
        this.scene.enemyProjectiles.push(proj);
    }

    update() {
        for (let i = this.scene.enemyProjectiles.length - 1; i >= 0; i--) {
            const p = this.scene.enemyProjectiles[i];
            if (!p.active) { this.scene.enemyProjectiles.splice(i, 1); continue; }

            p.lifespan -= this.scene.game.loop.delta;
            if (p.lifespan <= 0) { p.destroy(); this.scene.enemyProjectiles.splice(i, 1); continue; }

            if (!p.isHeal) {
                const dist = Phaser.Math.Distance.Between(p.x, p.y, this.scene.player.x, this.scene.player.y);
                if (dist < 16) {
                    this.scene.combat.takeDamage(p.damage);
                    p.destroy();
                    this.scene.enemyProjectiles.splice(i, 1);
                }
            }
        }
    }
}
