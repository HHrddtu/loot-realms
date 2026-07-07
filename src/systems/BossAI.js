import { GAME_WIDTH, GAME_HEIGHT } from '../config/index.js';

export class BossAI {
    static updateHpBar(boss, options = {}) {
        const bg = boss.hpBg;
        const fill = boss.hpFill;
        if (!bg || !fill) return;

        const {
            x, y, width, fillOffsetX = 0,
            nameText, nameYOffset = -10, show
        } = options;

        if (show) {
            if (bg.setVisible) bg.setVisible(true);
            if (fill.setVisible) fill.setVisible(true);
            if (nameText && nameText.setVisible) nameText.setVisible(true);
        }

        if (x !== undefined) {
            bg.x = x;
            fill.x = x + fillOffsetX;
            if (nameText) nameText.x = x;
        }
        if (y !== undefined) {
            bg.y = y;
            fill.y = y;
            if (nameText) nameText.y = y + nameYOffset;
        }

        const w = width !== undefined ? width : bg.width;
        const ratio = boss.stats.hp / boss.stats.maxHp;
        fill.width = w * ratio;
    }

    static phaseTransition(scene, boss, phaseText, phaseColor) {
        const st = boss.stats;
        st.transitioning = true;
        st.invulnerable = true;
        boss.body.setVelocity(0);

        if (boss.telegraph) { boss.telegraph.destroy(); boss.telegraph = null; }

        scene.cameras.main.shake(300, 0.01);
        scene.tweens.add({
            targets: boss, alpha: 0.3, duration: 150, yoyo: true, repeat: 3,
            onComplete: () => { if (boss.active) boss.setAlpha(1); }
        });

        const flash = scene.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0xffffff)
            .setAlpha(0).setDepth(20).setScrollFactor(0);
        scene.tweens.add({
            targets: flash, alpha: 0.4, duration: 200, yoyo: true,
            onComplete: () => flash.destroy()
        });

        if (st.phase === 3) {
            st.baseSpeed = Math.floor((st.baseSpeed || st.speed || 50) * 1.2);
            st.damage = Math.floor(st.damage * 1.5);
            scene.floatingText(boss.x, boss.y - 50, 'ENRAGED!', '#ff2222');
        } else if (st.phase === 2) {
            scene.floatingText(boss.x, boss.y - 50, phaseText || 'PHASE 2!', phaseColor || '#9b59b6');
        }

        scene.time.delayedCall(1200, () => {
            if (boss.active) {
                st.transitioning = false;
                st.invulnerable = false;
                st.aiState = 'chase';
                st.attackTimer = 1500;
            }
        });
    }
}
