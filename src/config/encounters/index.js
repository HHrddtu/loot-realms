import { FOREST_APEX, FOREST_ENCOUNTERS } from './forest.js';

export const ENCOUNTERS_BY_ZONE = {
    forest: FOREST_ENCOUNTERS
};

export const APEX_BY_ZONE = {
    forest: FOREST_APEX
};

export const ENCOUNTER_PACKS = Object.values(ENCOUNTERS_BY_ZONE).flat();

export function getZoneEncounters(zone) {
    return ENCOUNTERS_BY_ZONE[zone] || [];
}

export function getZoneApex(zone) {
    return APEX_BY_ZONE[zone] || null;
}
