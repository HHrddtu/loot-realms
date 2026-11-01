import {
    DEPTHS_CAMP_COUNT, DEPTHS_MOBS_PER_CAMP,
    DEPTHS_ENEMY_TYPES, DEPTHS_CAMP_POSITIONS, DEPTHS_CHEST_POSITIONS,
    DEPTHS_CHEST_DROP_CHANCE
} from '../config/index.js';
import { spawnCampMobs, spawnCampChests } from '../systems/CampSpawner.js';

export class DepthsSpawner {
    constructor(zone) {
        this.zone = zone;
        this.scene = zone.scene;
    }

    spawnDepthsCamps() {
        spawnCampMobs(this.scene, {
            offsetKey: 'depthsOffsetX',
            campCount: DEPTHS_CAMP_COUNT,
            mobsPerCamp: DEPTHS_MOBS_PER_CAMP,
            campPositions: DEPTHS_CAMP_POSITIONS,
            enemyTypes: DEPTHS_ENEMY_TYPES
        });
    }

    spawnDepthsChests() {
        spawnCampChests(this.scene, {
            offsetKey: 'depthsOffsetX',
            positions: DEPTHS_CHEST_POSITIONS,
            texture: 'depths_chest',
            hp: 50,
            dropChance: DEPTHS_CHEST_DROP_CHANCE,
            groupKey: 'depthsChests'
        });
    }
}
