export class BaseZone {
    constructor(scene) {
        this.scene = scene;
    }

    clear() {
        const s = this.scene;
        s.physics.world.colliders.destroy();
        this._destroyFireballs();
        this._destroyEnemyProjectiles();
        this._destroyShield();
        this._destroyEnemies();
        this._destroyStumps();
        this._destroyDefeatedUI();
        this._destroyZoneSpecific();
        this._destroyNPCs();
    }

    _destroyFireballs() {
        const s = this.scene;
        if (s.fireballs) {
            s.fireballs.forEach(fb => { if (fb.glow) fb.glow.destroy(); fb.destroy(); });
            s.fireballs = [];
        }
    }

    _destroyEnemyProjectiles() {
        const s = this.scene;
        if (s.enemyProjectiles) {
            s.enemyProjectiles.forEach(p => { if (p && p.destroy) p.destroy(); });
            s.enemyProjectiles = [];
        }
    }

    _destroyShield() {
        const s = this.scene;
        if (s.shieldActive) {
            s.shieldActive = false;
            s.shieldHP = 0;
            if (s.shieldVfx) { s.shieldVfx.destroy(); s.shieldVfx = null; }
        }
    }

    _destroyEnemies() {
        const s = this.scene;
        if (s.enemies && s.enemies.getLength && s.enemies.getLength() > 0) {
            s.enemies.getChildren().forEach(e => {
                if (e.hpBg) e.hpBg.destroy();
                if (e.hpFill) e.hpFill.destroy();
                if (e.nameText) e.nameText.destroy();
            });
            s.enemies.clear(true, true);
        }
        if (s.enemies) { s.enemies.destroy(); s.enemies = null; }
    }

    _destroyNPCs() {
        const s = this.scene;
        s.npcSprites.forEach(n => {
            if (n.nameTag) n.nameTag.destroy();
            if (n.questIcon) n.questIcon.destroy();
            n.destroy();
        });
        s.npcSprites = [];
        s.questIcons = [];
        s.nearbyNpc = null;
    }

    _destroyDefeatedUI() {
        const s = this.scene;
        if (s.defeatedText) { s.defeatedText.destroy(); s.defeatedText = null; }
        if (s.defeatedLoot) {
            s.defeatedLoot.forEach(t => { if (t && t.destroy) t.destroy(); });
            s.defeatedLoot = null;
        }
    }

    _destroyStumps() {
        const s = this.scene;
        if (s.stumps && s.stumps.getLength && s.stumps.getLength() > 0) {
            s.stumps.getChildren().forEach(st => {
                if (st.hpBg) st.hpBg.destroy();
                if (st.hpFill) st.hpFill.destroy();
            });
            s.stumps.clear(true, true);
        }
        if (s.stumps) { s.stumps.destroy(); s.stumps = null; }
    }

    _destroyZoneSpecific() {
    }
}
