import {
    HELL_CAMP_COUNT, HELL_MOBS_PER_CAMP,
    HELL_ENEMY_TYPES, HELL_CAMP_POSITIONS, HELL_LAVA_POSITIONS
} from '../config/index.js';
import { spawnCampMobs } from '../systems/CampSpawner.js';

export class HellSpawner {
    constructor(zone) {
        this.zone = zone;
        this.scene = zone.scene;
    }

    spawnHellCamps() {
        spawnCampMobs(this.scene, {
            offsetKey: 'hellOffsetX',
            campCount: HELL_CAMP_COUNT,
            mobsPerCamp: HELL_MOBS_PER_CAMP,
            campPositions: HELL_CAMP_POSITIONS,
            enemyTypes: HELL_ENEMY_TYPES
        });
    }

    spawnHellLavaCircles() {
        const s = this.scene;
        const ox = s.hellOffsetX;
        HELL_LAVA_POSITIONS.forEach(lp => {
            const gfx = s.add.sprite(ox + lp.x, lp.y, 'hell_lava_circle').setDepth(1).setAlpha(0.4);
            const vfx = s.add.sprite(ox + lp.x, lp.y, 'hell_lava_circle').setDepth(1).setAlpha(0).setScale(1);
            s.hellLavaCircles.push({ x: ox + lp.x, y: lp.y, r: lp.r, gfx, vfx, timer: 0 });
        });
    }
}
