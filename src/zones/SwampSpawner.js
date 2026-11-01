import {
    SWAMP_CAMP_COUNT, SWAMP_MOBS_PER_CAMP,
    SWAMP_ENEMY_TYPES, SWAMP_CAMP_POSITIONS, SWAMP_CHEST_POSITIONS,
    SWAMP_CHEST_DROP_CHANCE
} from '../config/index.js';
import { spawnCampMobs, spawnCampChests } from '../systems/CampSpawner.js';

export class SwampSpawner {
    constructor(zone) {
        this.zone = zone;
        this.scene = zone.scene;
    }

    spawnSwampCamps() {
        spawnCampMobs(this.scene, {
            offsetKey: 'swampOffsetX',
            campCount: SWAMP_CAMP_COUNT,
            mobsPerCamp: SWAMP_MOBS_PER_CAMP,
            campPositions: SWAMP_CAMP_POSITIONS,
            enemyTypes: SWAMP_ENEMY_TYPES,
            useTexKey: true
        });
    }

    spawnSwampChests() {
        spawnCampChests(this.scene, {
            offsetKey: 'swampOffsetX',
            positions: SWAMP_CHEST_POSITIONS,
            texture: 'cursed_chest',
            hp: 60,
            dropChance: SWAMP_CHEST_DROP_CHANCE,
            groupKey: 'swampChests'
        });
    }
}
