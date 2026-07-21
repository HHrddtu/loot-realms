export class InterpolationBuffer {
    constructor(maxSize = 6) {
        this.snapshots = [];
        this.maxSize = maxSize;
    }

    push(snap) {
        if (!snap) return;
        this.snapshots.push(snap);
        if (this.snapshots.length > this.maxSize) {
            this.snapshots.shift();
        }
    }

    sample(renderT) {
        const snaps = this.snapshots;
        if (snaps.length === 0) return null;
        if (snaps.length === 1) return snaps[0];

        if (renderT <= snaps[0].t) return snaps[0];
        if (renderT >= snaps[snaps.length - 1].t) return snaps[snaps.length - 1];

        for (let i = 0; i < snaps.length - 1; i++) {
            const a = snaps[i];
            const b = snaps[i + 1];
            if (renderT >= a.t && renderT < b.t) {
                const dt = b.t - a.t;
                const alpha = dt > 0 ? (renderT - a.t) / dt : 0;
                return {
                    t: renderT,
                    x: a.x + (b.x - a.x) * alpha,
                    y: a.y + (b.y - a.y) * alpha,
                    vx: a.vx + ((b.vx || 0) - (a.vx || 0)) * alpha,
                    vy: a.vy + ((b.vy || 0) - (a.vy || 0)) * alpha,
                    facing: alpha < 0.5 ? a.facing : b.facing,
                    attacking: alpha < 0.5 ? a.attacking : b.attacking,
                    casting: alpha < 0.5 ? a.casting : b.casting,
                    hp: b.hp,
                    maxHp: b.maxHp,
                    zone: b.zone,
                    classKey: a.classKey
                };
            }
        }
        return snaps[snaps.length - 1];
    }

    clear() {
        this.snapshots = [];
    }

    get latest() {
        return this.snapshots.length > 0 ? this.snapshots[this.snapshots.length - 1] : null;
    }

    get size() {
        return this.snapshots.length;
    }
}
