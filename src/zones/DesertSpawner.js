import {
    DESERT_CAMP_COUNT, DESERT_MOBS_PER_CAMP,
    DESERT_ENEMY_TYPES, DESERT_CAMP_POSITIONS, DESERT_CHEST_POSITIONS,
    DESERT_CHEST_DROP_CHANCE
} from '../config/index.js';
import { spawnCampMobs, spawnCampChests } from '../systems/CampSpawner.js';

export class DesertSpawner {
    constructor(zone) {
        this.zone = zone;
        this.scene = zone.scene;
    }

    spawnDesertCamps() {
        spawnCampMobs(this.scene, {
            offsetKey: 'desertOffsetX',
            campCount: DESERT_CAMP_COUNT,
            mobsPerCamp: DESERT_MOBS_PER_CAMP,
            campPositions: DESERT_CAMP_POSITIONS,
            enemyTypes: DESERT_ENEMY_TYPES,
            useTexKey: true
        });
    }

    spawnDesertChests() {
        spawnCampChests(this.scene, {
            offsetKey: 'desertOffsetX',
            positions: DESERT_CHEST_POSITIONS,
            texture: 'cursed_chest',
            hp: 60,
            dropChance: DESERT_CHEST_DROP_CHANCE,
            groupKey: 'desertChests'
        });
    }
}
