import Phaser from 'phaser';
import { getClassData } from '../classes.js';
import { getKeybinds, parseKeyCode } from '../keybinds.js';
import { playHit, playBossAoE } from '../sound.js';

export class InputSystem {
    constructor(scene) {
        this.scene = scene;
        this._reviveProgress = 0;
        this._reviveTarget = null;
        this._shadowStepCooldown = false;
        this._timeSlowCooldown = false;
        this._timeSlowActive = false;
        this._shadowStepFirstUse = true;
        this._timeSlowFirstUse = true;
    }

    bindKeys() {
        const s = this.scene;
        const binds = getKeybinds();
        const kb = s.input.keyboard;

        const resolveKey = (name) => {
            const code = parseKeyCode(binds[name]);
            return code !== null ? kb.addKey(code) : kb.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        };

        s.cursors = {
            left: resolveKey('move_left'),
            right: resolveKey('move_right'),
            up: resolveKey('move_up'),
            down: resolveKey('move_down')
        };
        s.spaceKey = resolveKey('attack');
        s.fKey = resolveKey('consumable');
        s.qKey = resolveKey('spell_q');
        s.wKey = resolveKey('spell_w');
        s.eKey = resolveKey('spell_e');
        s.rKey = resolveKey('spell_r');
        s.iKey = resolveKey('inventory');
        s.pKey = resolveKey('pause');
        s.tKey = resolveKey('talents');
        s.bKey = resolveKey('bestiary');
        s.nKey = resolveKey('quests');
        s.cKey = resolveKey('crafting');
        s.xKey = resolveKey('spell_assign');
        s.mKey = resolveKey('mute');

        s.input.on('pointerdown', (pointer) => {
            if (s.menuOpen || s.transitioning || s.invOpen) return;
            if (pointer.button === 2) {
                const shift = s.input.keyboard.addKey('SHIFT');
                const ctrl = s.input.keyboard.addKey('CTRL');
                if (ctrl.isDown && s.timeSlowUnlocked) {
                    this.timeSlow();
                } else if (shift.isDown && s.shadowStepUnlocked) {
                    this.shadowStep();
                } else {
                    this.dodgeRoll();
                }
                return;
            }
            if (pointer.button !== 0) return;
            const worldPoint = s.cameras.main.getWorldPoint(pointer.x, pointer.y);
            const dx = worldPoint.x - s.player.x;
            const dy = worldPoint.y - s.player.y;
            if (Math.abs(dx) > Math.abs(dy)) {
                s.facing = dx > 0 ? 'right' : 'left';
            } else {
                s.facing = dy > 0 ? 'down' : 'up';
            }
            s.attack();
        });

        s.input.mouse.disableContextMenu();
    }

    handleInput() {
        const s = this.scene;
        const body = s.player.body;
        if (!s.isDodging) body.setVelocity(0);
        let isMoving = false;

        if (s.isDowned) {
            body.setVelocity(0);
            return;
        }

        if (!s.menuOpen && !s.transitioning && !s.isDodging) {
            let moveX = 0, moveY = 0;
            if (s.cursors.left.isDown) moveX = -1;
            else if (s.cursors.right.isDown) moveX = 1;
            if (s.cursors.up.isDown) moveY = -1;
            else if (s.cursors.down.isDown) moveY = 1;

            if (moveX !== 0 || moveY !== 0) {
                const len = Math.sqrt(moveX * moveX + moveY * moveY);
                body.setVelocityX((moveX / len) * s.playerSpeed);
                body.setVelocityY((moveY / len) * s.playerSpeed);
                if (moveX !== 0) s.facing = moveX < 0 ? 'left' : 'right';
                else s.facing = moveY < 0 ? 'up' : 'down';
                isMoving = true;
            }

            if (isMoving && !s.playerAttacking) {
                const cls = s.classData || getClassData(s.classKey);
                const walkAnim = cls.walkAnim || 'sage_walk_right';
                if (!s.player.anims.isPlaying || s.player.anims.currentAnim.key !== walkAnim) {
                    s.player.play(walkAnim);
                }
                s.player.setFlipX(s.facing === 'left');
            } else if (!isMoving && !s.playerAttacking) {
                s.player.stop();
                s.player.setFrame(0);
            }

            this.handleActionKeys();
        } else if (s.invOpen) {
            if (Phaser.Input.Keyboard.JustDown(s.iKey)) s.closeInventory();
            if (Phaser.Input.Keyboard.JustDown(s.pKey)) {
                s.closeInventory();
                s.togglePause();
            }
        }
    }

    handleActionKeys() {
        const s = this.scene;
        const JustDown = Phaser.Input.Keyboard.JustDown;

        if (s.spaceKey.isDown && !s.isDowned) {
            if (this._tryReviveAlly()) return;
        } else {
            this._reviveProgress = 0;
            this._reviveTarget = null;
        }

        if (JustDown(s.spaceKey)) {
            if (s.isDowned) return;
            if (s.currentZone && typeof s.currentZone.handleSpace === 'function') {
                s.currentZone.handleSpace();
            } else if (s.nearbyNpc) {
                s._interactWithNpc();
            } else {
                s.attack();
            }
        }

        if (JustDown(s.iKey)) s.toggleInventory();
        if (JustDown(s.pKey)) {
            if (s.zone === 'village' && s.prestigeSys && s.prestigeSys.canPrestige()) {
                if (s.currentZone && typeof s.currentZone._showPrestigeInfo === 'function') {
                    s.currentZone._showPrestigeInfo();
                }
            } else {
                s.togglePause();
            }
        }
        if (JustDown(s.tKey)) s._openTalentTree();
        if (JustDown(s.mKey)) s._toggleMute();
        if (JustDown(s.fKey) && s.playerSys) s.playerSys.useConsumable();
        if (JustDown(s.bKey)) s._openBestiary();
        if (JustDown(s.nKey)) s._openQuestLog();
        if (JustDown(s.cKey)) s._openCrafting();
        if (JustDown(s.xKey)) s._openSpellAssign();

        const spells = s._getClassSpells();
        if (JustDown(s.qKey)) s._castSpell(spells.q);
        if (JustDown(s.wKey)) s._castSpell(spells.w);
        if (JustDown(s.eKey)) s._castSpell(spells.e);
        if (JustDown(s.rKey)) s._castSpell(spells.r);
    }

    dodgeRoll() {
        const s = this.scene;
        if (s.isDodging || s.dodgeCooldown || s.menuOpen || s.transitioning) return;
        s.isDodging = true;
        s.dodgeCooldown = true;
        s.invincible = true;

        const speed = 450;
        const dirs = { right: 1, left: -1, up: -1, down: 1 };
        const isHoriz = s.facing === 'right' || s.facing === 'left';
        const vx = isHoriz ? dirs[s.facing] * speed : 0;
        const vy = isHoriz ? 0 : dirs[s.facing] * speed;
        s.player.body.setVelocity(vx, vy);
        s.player.setTint(0x44aaff);

        for (let i = 0; i < 4; i++) {
            s.time.delayedCall(i * 50, () => {
                if (!s.player || !s.player.active) return;
                const ghost = s.add.sprite(s.player.x, s.player.y, s.player.texture.key)
                    .setAlpha(0.6 - i * 0.12).setDepth(9).setTint(0x44aaff);
                ghost.setFlipX(s.player.flipX);
                s.tweens.add({ targets: ghost, alpha: 0, duration: 250, onComplete: () => ghost.destroy() });
            });
        }

        s.cameras.main.shake(120, 0.008);

        s.time.delayedCall(400, () => {
            s.player.body.setVelocity(0);
            s.player.clearTint();
            s.isDodging = false;
            s.invincible = false;
        });
        s.time.delayedCall(1200, () => { s.dodgeCooldown = false; });
    }

    _tryReviveAlly() {
        const s = this.scene;
        if (!s.multiplayer || !s.mpManager) return false;
        const rpm = s.mpManager.remotePlayers;
        for (const id in rpm) {
            const rp = rpm[id];
            if (!rp || !rp.sprite || !rp.sprite.active || !rp.isDowned) continue;
            const dist = Phaser.Math.Distance.Between(s.player.x, s.player.y, rp.sprite.x, rp.sprite.y);
            if (dist < 60) {
                if (this._reviveTarget !== id) {
                    this._reviveTarget = id;
                    this._reviveProgress = 0;
                }
                this._reviveProgress += 16;
                const pct = Math.min(100, Math.floor(this._reviveProgress / 2000 * 100));
                s.floatingText(rp.sprite.x, rp.sprite.y - 40, 'Reviving... ' + pct + '%', '#2ecc71');
                if (this._reviveProgress >= 2000) {
                    this._reviveProgress = 0;
                    this._reviveTarget = null;
                    s.mpManager.sendRevive(id);
                }
                return true;
            }
        }
        this._reviveProgress = 0;
        this._reviveTarget = null;
        return false;
    }

    shadowStep() {
        const s = this.scene;
        if (this._shadowStepCooldown || s.isDodging || s.menuOpen || s.transitioning) return;
        this._shadowStepCooldown = true;

        if (this._shadowStepFirstUse) {
            this._shadowStepFirstUse = false;
            s.floatingText(s.player.x, s.player.y - 60, 'Shadow Step!', '#8844ff');
        }

        const speed = 500;
        const dist = 100;
        const dirs = { right: 1, left: -1, up: -1, down: 1 };
        const isHoriz = s.facing === 'right' || s.facing === 'left';
        const vx = isHoriz ? dirs[s.facing] * speed : 0;
        const vy = isHoriz ? 0 : dirs[s.facing] * speed;

        s.player.body.setVelocity(vx, vy);
        s.player.body.setAllowGravity(false);
        s.player.setAlpha(0.3);
        s.player.setTint(0x8844ff);

        playHit();

        for (let i = 0; i < 3; i++) {
            s.time.delayedCall(i * 40, () => {
                if (!s.player || !s.player.active) return;
                const ghost = s.add.sprite(s.player.x, s.player.y, s.player.texture.key)
                    .setAlpha(0.4 - i * 0.1).setDepth(9).setTint(0x8844ff);
                ghost.setFlipX(s.player.flipX);
                s.tweens.add({ targets: ghost, alpha: 0, duration: 200, onComplete: () => ghost.destroy() });
            });
        }

        s.time.delayedCall(200, () => {
            s.player.body.setVelocity(0);
            s.player.body.setAllowGravity(true);
            s.player.setAlpha(1);
            s.player.clearTint();
        });

        s.time.delayedCall(5000, () => { this._shadowStepCooldown = false; });
    }

    timeSlow() {
        const s = this.scene;
        if (this._timeSlowCooldown || this._timeSlowActive || s.isDodging || s.menuOpen || s.transitioning) return;
        this._timeSlowCooldown = true;
        this._timeSlowActive = true;

        if (this._timeSlowFirstUse) {
            this._timeSlowFirstUse = false;
            s.floatingText(s.player.x, s.player.y - 60, 'Time Slow!', '#3498db');
        }

        playBossAoE();

        const overlay = s.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x3498db, 0.15)
            .setDepth(200).setScrollFactor(0).setAlpha(0);
        s.tweens.add({ targets: overlay, alpha: 1, duration: 300 });

        if (s.enemies) {
            s.enemies.getChildren().forEach(e => {
                if (e.active && e.body) {
                    e._normalSpeed = e.stats.speed || 50;
                    e.stats.speed = e._normalSpeed * 0.5;
                    e.setTint(0x6688cc);
                }
            });
        }

        s.time.delayedCall(3000, () => {
            if (s.enemies) {
                s.enemies.getChildren().forEach(e => {
                    if (e.active && e._normalSpeed !== undefined) {
                        e.stats.speed = e._normalSpeed;
                        e.clearTint();
                    }
                });
            }
            s.tweens.add({
                targets: overlay, alpha: 0, duration: 300,
                onComplete: () => { overlay.destroy(); this._timeSlowActive = false; }
            });
        });

        s.time.delayedCall(30000, () => { this._timeSlowCooldown = false; });
    }
}
