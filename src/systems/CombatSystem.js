import { CombatCore } from './CombatCore.js';
import { CombatLoot } from './CombatLoot.js';

export class CombatSystem {
    constructor(scene) {
        this.scene = scene;
        this.core = new CombatCore(scene);
        this.loot = new CombatLoot(scene);
        scene.loot = this.loot;
    }

    makeEnemy(t, x, y) { return this.core.makeEnemy(t, x, y); }
    takeDamage(amount) { this.core.takeDamage(amount); }
    attack() { this.core.attack(); }
    hitEnemy(enemy, damage) { this.core.hitEnemy(enemy, damage); }
    killEnemy(enemy) { this.loot.killEnemy(enemy); }
    killBoss() { this.loot.killBoss(); }
    killMineBoss() { this.loot.killMineBoss(); }
    killCaveBoss() { this.loot.killCaveBoss(); }
    breakChest(ch) { this.loot.breakChest(ch); }
    breakStump(stump) { this.loot.breakStump(stump); }
    breakVillageChest(ch) { this.loot.breakVillageChest(ch); }
    hitChest(ch, damage) { this.core.hitChest(ch, damage); }
    hitStump(stump, damage) { this.core.hitStump(stump, damage); }
    respawnPlayer() { this.core.respawnPlayer(); }
}
