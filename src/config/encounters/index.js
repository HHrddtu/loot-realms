import { FOREST_ENCOUNTERS } from './forest.js';

export const ENCOUNTERS_BY_ZONE = {
    forest: FOREST_ENCOUNTERS
};

export const ENCOUNTER_PACKS = Object.values(ENCOUNTERS_BY_ZONE).flat();

export function getZoneEncounters(zone) {
    return ENCOUNTERS_BY_ZONE[zone] || [];
}
