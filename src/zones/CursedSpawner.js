import {
    CURSED_CAMP_COUNT, CURSED_MOBS_PER_CAMP,
    CURSED_ENEMY_TYPES, CURSED_CAMP_POSITIONS, CURSED_CHEST_POSITIONS,
    CURSED_CHEST_DROP_CHANCE
} from '../config/index.js';
import { spawnCampMobs, spawnCampChests } from '../systems/CampSpawner.js';

export class CursedSpawner {
    constructor(zone) {
        this.zone = zone;
        this.scene = zone.scene;
    }

    spawnCursedCamps() {
        spawnCampMobs(this.scene, {
            offsetKey: 'cursedOffsetX',
            campCount: CURSED_CAMP_COUNT,
            mobsPerCamp: CURSED_MOBS_PER_CAMP,
            campPositions: CURSED_CAMP_POSITIONS,
            enemyTypes: CURSED_ENEMY_TYPES
        });
    }

    spawnCursedChests() {
        spawnCampChests(this.scene, {
            offsetKey: 'cursedOffsetX',
            positions: CURSED_CHEST_POSITIONS,
            texture: 'cursed_chest',
            hp: 60,
            dropChance: CURSED_CHEST_DROP_CHANCE,
            groupKey: 'cursedChests'
        });
    }
}
