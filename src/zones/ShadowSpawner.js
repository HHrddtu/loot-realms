import {
    SHADOW_CAMP_COUNT, SHADOW_MOBS_PER_CAMP,
    SHADOW_ENEMY_TYPES, SHADOW_CAMP_POSITIONS, SHADOW_CHEST_POSITIONS,
    SHADOW_CHEST_DROP_CHANCE
} from '../config/index.js';
import { spawnCampMobs, spawnCampChests } from '../systems/CampSpawner.js';

export class ShadowSpawner {
    constructor(zone) {
        this.zone = zone;
        this.scene = zone.scene;
    }

    spawnShadowCamps() {
        spawnCampMobs(this.scene, {
            offsetKey: 'shadowOffsetX',
            campCount: SHADOW_CAMP_COUNT,
            mobsPerCamp: SHADOW_MOBS_PER_CAMP,
            campPositions: SHADOW_CAMP_POSITIONS,
            enemyTypes: SHADOW_ENEMY_TYPES
        });
    }

    spawnShadowChests() {
        spawnCampChests(this.scene, {
            offsetKey: 'shadowOffsetX',
            positions: SHADOW_CHEST_POSITIONS,
            texture: 'shadow_chest',
            hp: 70,
            dropChance: SHADOW_CHEST_DROP_CHANCE,
            groupKey: 'shadowChests'
        });
    }
}
