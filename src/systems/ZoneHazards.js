function within(px, py, cx, cy, radius) {
    return Math.hypot(px - cx, py - cy) <= radius;
}

/**
 * Resolve Swamp ground hazards for a player position.
 * Safe islands always win over toxic puddles.
 */
export function resolveSwampHazard(px, py, offsetX, config) {
    const onIsland = config.islands.some(i => within(px, py, offsetX + i.x, i.y, i.radius));
    const inPuddle = config.puddles.some(p => within(px, py, offsetX + p.x, p.y, config.puddleRadius));
    return {
        onIsland,
        inPuddle: inPuddle && !onIsland
    };
}
