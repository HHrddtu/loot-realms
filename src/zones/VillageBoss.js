import { PurpleDemonBoss } from './PurpleDemonBoss.js';
import { IceSpiritBoss } from './IceSpiritBoss.js';

export class VillageBoss extends PurpleDemonBoss {
    constructor(scene, zone) {
        super(scene, zone);
        this._iceSpirit = new IceSpiritBoss(scene, zone);
    }

    spawnSnowyBoss() { return this._iceSpirit.spawnSnowyBoss(); }
    updateSnowyBoss(delta) { return this._iceSpirit.updateSnowyBoss(delta); }
    iceSpiritDied() { return this._iceSpirit.iceSpiritDied(); }
}
