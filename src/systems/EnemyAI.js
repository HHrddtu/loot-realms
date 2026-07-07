export class EnemyAI {
    static WANDER_SPEED = 50;
    static CHASE_RANGE = 200;
    static WANDER_TICK = 60;

    static updateWanderChase(e, player, scene) {
        if (!e.active || !e.stats) return;
        this._updateHpBar(e);

        if (scene.menuOpen || scene.transitioning) {
            e.body.setVelocity(0);
            return;
        }

        const dist = Phaser.Math.Distance.Between(player.x, player.y, e.x, e.y);

        if (dist < this.CHASE_RANGE) {
            this._chase(e, player, dist);
        } else {
            this._wander(e);
        }
    }

    static _updateHpBar(e) {
        e.hpBg.x = e.x;
        e.hpBg.y = e.y - e.stats.bh / 2 - 8;
        e.hpFill.x = e.x;
        e.hpFill.y = e.hpBg.y;
        if (e.hpFill) {
            e.hpFill.width = e.hpBg.width * (e.stats.hp / e.stats.maxHp);
        }
    }

    static _chase(e, player, dist) {
        const dx = player.x - e.x;
        const dy = player.y - e.y;
        const spd = e.stats.speed || 50;
        const engageDist = e.stats.engageDist || 30;

        if (dist > engageDist) {
            const chaseSpd = dist < 80 ? spd * 1.4 : spd;
            e.body.setVelocity((dx / dist) * chaseSpd, (dy / dist) * chaseSpd);
            e.setFlipX(dx < 0);
        } else {
            e.body.setVelocity(0);
        }

        if (e.walkAnimKey && (!e.anims.isPlaying || e.anims.currentAnim.key !== e.walkAnimKey)) {
            e.play(e.walkAnimKey);
        }
    }

    static _wander(e) {
        e.stats.wTimer = (e.stats.wTimer || 0) + 1;
        if (e.stats.wTimer > this.WANDER_TICK) {
            e.stats.wTimer = 0;
            e.stats.wDir = Math.floor(Math.random() * 5);
        }
        const sp = this.WANDER_SPEED;
        if (e.stats.wDir === 1) e.body.setVelocityX(-sp);
        else if (e.stats.wDir === 2) e.body.setVelocityX(sp);
        else if (e.stats.wDir === 3) e.body.setVelocityY(-sp);
        else if (e.stats.wDir === 4) e.body.setVelocityY(sp);
        else e.body.setVelocity(0);

        const isMoving = e.stats.wDir !== 0;
        if (isMoving && e.walkAnimKey) {
            if (!e.anims.isPlaying || e.anims.currentAnim.key !== e.walkAnimKey) {
                e.play(e.walkAnimKey);
            }
            e.setFlipX(e.body.velocity.x < 0);
        } else if (!isMoving) {
            e.stop();
            e.setFrame(0);
        }
    }
}
