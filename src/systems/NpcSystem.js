import Phaser from 'phaser';
import { NPC_DB, QUEST_DB, CART_DRIVER_NPC, GAME_WIDTH, GAME_HEIGHT } from '../config/index.js';
import { getNpcQuestStatus, getActiveQuests, getAvailableQuests, acceptQuest, completeQuest, isQuestComplete, saveQuests, getQuestProgress, getQuestNpc } from '../quests.js';
import { rollEquip } from '../utils.js';
import { getLang } from '../i18n.js';
import { t } from '../i18n.js';
import { playPortal } from '../sound.js';

export class NpcSystem {
    constructor(scene) {
        this.scene = scene;
    }

    spawnNPCs() {
        const s = this.scene;
        s.npcSprites.forEach(n => n.destroy());
        s.questIcons.forEach(n => n.destroy());
        s.npcSprites = [];
        s.questIcons = [];
        s.nearbyNpc = null;

        Object.entries(NPC_DB).forEach(([key, npc]) => {
            if (npc.biome !== s.zone) return;
            // Check condition for NPC appearance
            if (npc.condition) {
                const cond = npc.condition;
                if (cond === '!isRestored' && s.zones.village && s.zones.village.isRestored) return;
                if (cond === '!isThriving' && s.zones.village && s.zones.village.isThriving) return;
            }
            const spr = s.add.sprite(npc.x, npc.y, npc.texKey).setDepth(8);
            s.physics.add.existing(spr, true);
            spr.body.setSize(24, 24);
            spr.npcKey = key;
            s.npcSprites.push(spr);

            const lang = getLang();
            const displayName = lang === 'ru' ? (npc.nameRu || npc.name) : lang === 'de' ? (npc.nameDe || npc.name) : npc.name;
            const nameTag = npc.hideName ? null : s.add.text(npc.x, npc.y - 30, displayName, {
                fontSize: '10px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5).setDepth(9);
            spr.nameTag = nameTag;

            const icon = s.add.sprite(npc.x, npc.y - 44, 'quest_icon').setDepth(10);
            s.questIcons.push(icon);
            spr.questIcon = icon;
        });

        if (s.cartDriverNpc) { s.cartDriverNpc.destroy(); s.cartDriverNpc = null; }
        if (s.zone === 'forest' && s.zones.mine.hasSecretKey) {
            const cd = CART_DRIVER_NPC.cart_driver;
            const spr = s.add.sprite(cd.x, cd.y, cd.texKey).setDepth(8);
            s.physics.add.existing(spr, true);
            spr.body.setSize(24, 24);
            spr.npcKey = 'cart_driver';
            s.npcSprites.push(spr);
            s.cartDriverNpc = spr;

            const lang = getLang();
            const displayName = lang === 'ru' ? cd.nameRu : lang === 'de' ? cd.nameDe : cd.name;
            const nameTag = s.add.text(cd.x, cd.y - 30, displayName, {
                fontSize: '10px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5).setDepth(9);
            spr.nameTag = nameTag;

            const icon = s.add.sprite(cd.x, cd.y - 44, 'quest_icon').setDepth(10);
            s.questIcons.push(icon);
            spr.questIcon = icon;
        }

        this.updateQuestIcons();
    }

    updateQuestIcons() {
        const s = this.scene;
        s.npcSprites.forEach(spr => {
            const status = getNpcQuestStatus(spr.npcKey);
            if (spr.questIcon) {
                spr.questIcon.setVisible(status === 'quest_available' || status === 'quest_complete');
                if (status === 'quest_complete') {
                    spr.questIcon.setTint(0x2ecc71);
                } else {
                    spr.questIcon.clearTint();
                }
            }
            if (spr.nameTag) {
                spr.nameTag.setPosition(spr.x, spr.y - 30);
            }
        });
    }

    checkNpcProximity() {
        const s = this.scene;
        if (s.menuOpen || s.transitioning) {
            s.nearbyNpc = null;
            return;
        }
        s.nearbyNpc = null;
        let minDist = 60;
        s.npcSprites.forEach(spr => {
            if (!spr.active) return;
            const d = Phaser.Math.Distance.Between(s.player.x, s.player.y, spr.x, spr.y);
            if (d < minDist) {
                minDist = d;
                s.nearbyNpc = spr;
            }
        });
        if (s.nearbyNpc) {
            const status = getNpcQuestStatus(s.nearbyNpc.npcKey);
            const npcName = NPC_DB[s.nearbyNpc.npcKey]?.name || '';
            if (status === 'quest_available') {
                s.hintText.setText('SPACE: Talk to ' + npcName);
            } else if (status === 'quest_complete') {
                s.hintText.setText('SPACE: Turn in quest to ' + npcName);
            } else {
                s.hintText.setText('SPACE: Talk to ' + npcName);
            }
        }
    }

    interactWithNpc() {
        const s = this.scene;
        if (!s.nearbyNpc) return;
        const npcKey = s.nearbyNpc.npcKey;

        if (npcKey === 'cart_driver' && s.zones.mine.hasSecretKey) {
            this.startCartRide();
            return;
        }

        const npc = NPC_DB[npcKey];
        if (!npc) return;

        const status = getNpcQuestStatus(npcKey);

        if (status === 'quest_complete') {
            const active = getActiveQuests();
            const completable = active.filter(q => isQuestComplete(q.key));
            if (completable.length > 0) {
                const q = completable[0];
                const rewards = completeQuest(q.key);
                const rewardText = this._formatRewards(rewards);
                this._showDialog(npc, q.name + ' Complete!', rewardText, '#2ecc71', () => {
                    if (rewards.exp) {
                        s.playerExp += rewards.exp;
                        s.floatingText(s.player.x, s.player.y - 40, '+' + rewards.exp + ' EXP', '#f1c40f');
                    }
                    if (rewards.accountExp) {
                        s.accountExp += rewards.accountExp;
                        s.floatingText(s.player.x, s.player.y - 60, '+' + rewards.accountExp + ' Account EXP', '#e67e22');
                    }
                    if (rewards.talentPoints) {
                        s.talentPoints += rewards.talentPoints;
                        s.floatingText(s.player.x, s.player.y - 80, '+' + rewards.talentPoints + ' Talent Point', '#9b59b6');
                    }
                    if (q.rewardItems && q.rewardItems.length > 0) {
                        const item = rollEquip();
                        if (s.addEquip(item)) {
                            s.floatingText(s.player.x + 30, s.player.y - 40, '+' + item.name, '#3498db');
                        }
                    }
                    this.updateQuestIcons();
                    saveQuests();
                });
            }
            return;
        }

        const available = getAvailableQuests(npcKey);
        if (available.length > 0) {
            const qKey = available[0];
            const quest = QUEST_DB[qKey];
            this._showDialog(npc, quest.name, quest.description, '#f1c40f', () => {
                acceptQuest(qKey);
                s.floatingText(s.player.x, s.player.y - 40, 'New Quest: ' + quest.name, '#f1c40f');
                this.updateQuestIcons();
                saveQuests();
            }, t('quest.npc.talk'));
        } else {
            const greeting = getLang() === 'ru' && npc.greetingRu ? npc.greetingRu
                : getLang() === 'de' && npc.greetingDe ? npc.greetingDe
                : npc.greeting;
            this._showDialog(npc, npc.name, greeting, '#aaa', null);
        }
    }

    _formatRewards(rewards) {
        if (!rewards) return '';
        const parts = [];
        if (rewards.exp) parts.push('+' + rewards.exp + ' EXP');
        if (rewards.accountExp) parts.push('+' + rewards.accountExp + ' Account EXP');
        if (rewards.talentPoints) parts.push('+' + rewards.talentPoints + ' Talent Point');
        if (rewards.gold) parts.push('+' + rewards.gold + ' Gold');
        return parts.length > 0 ? parts.join('\n') : 'No rewards';
    }

    _showDialog(npc, title, text, titleColor, onConfirm, confirmLabel) {
        const s = this.scene;
        if (s.menuOpen) return;
        s.menuOpen = true;
        s.physics.pause();
        if (s.enemies) s.enemies.getChildren().forEach(e => { if (e.body) e.body.setVelocity(0); });

        const dw = 600;
        const dh = 200;
        const dx = GAME_WIDTH / 2;
        const dy = GAME_HEIGHT - dh / 2 - 15;
        const depth = 120;

        s.dialogGroup = [];
        const mk = (el) => { el.setDepth(depth); s.dialogGroup.push(el); return el; };

        mk(s.add.rectangle(dx, dy, dw, dh, 0x0a0a18, 0.96).setStrokeStyle(2, Phaser.Display.Color.HexStringToColor(titleColor).color));

        const lang = getLang();
        const displayName = lang === 'ru' ? (npc.nameRu || npc.name) : lang === 'de' ? (npc.nameDe || npc.name) : npc.name;

        try {
            const portrait = mk(s.add.sprite(dx - dw / 2 + 50, dy - 10, npc.texKey).setDisplaySize(56, 56));
            try {
                const walkKey = npc.texKey + '_walk';
                if (s.anims.exists(walkKey)) portrait.play(walkKey);
            } catch (e) {}
        } catch (e) {
            mk(s.add.rectangle(dx - dw / 2 + 50, dy - 10, 48, 48, 0x334466));
        }

        mk(s.add.text(dx - dw / 2 + 85, dy - dh / 2 + 15, displayName, {
            fontSize: '16px', fill: '#f1c40f', fontFamily: 'Georgia', fontStyle: 'bold'
        }));

        mk(s.add.text(dx - dw / 2 + 85, dy - dh / 2 + 38, title, {
            fontSize: '13px', fill: titleColor, fontFamily: 'Arial', fontStyle: 'bold'
        }));

        mk(s.add.text(dx - dw / 2 + 85, dy - 10, text, {
            fontSize: '12px', fill: '#ccc', fontFamily: 'Arial',
            wordWrap: { width: dw - 110 }, lineSpacing: 3
        }).setOrigin(0, 0.5));

        if (onConfirm && confirmLabel) {
            const btnW = 140;
            const btnX = dx + dw / 2 - btnW / 2 - 15;
            const btnY = dy + dh / 2 - 22;
            const btn = mk(s.add.rectangle(btnX, btnY, btnW, 28, 0x27ae60)
                .setStrokeStyle(1, 0x2ecc71).setInteractive({ useHandCursor: true }));
            mk(s.add.text(btnX, btnY, confirmLabel, {
                fontSize: '12px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
            }).setOrigin(0.5));
            btn.on('pointerover', () => btn.setFillStyle(0x2ecc71));
            btn.on('pointerout', () => btn.setFillStyle(0x27ae60));
            btn.on('pointerdown', () => {
                this._closeDialog();
                onConfirm();
            });
        }

        const closeBtnX = confirmLabel ? dx + dw / 2 - 15 : dx;
        const closeBtnY = dy + dh / 2 - 22;
        const closeBtn = mk(s.add.rectangle(closeBtnX - (confirmLabel ? 155 : 0), closeBtnY, 100, 28, 0x34495e)
            .setStrokeStyle(1, 0x556677).setInteractive({ useHandCursor: true }));
        mk(s.add.text(closeBtnX - (confirmLabel ? 155 : 0), closeBtnY, t('quest.close'), {
            fontSize: '12px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5));
        closeBtn.on('pointerdown', () => this._closeDialog());
        closeBtn.on('pointerover', () => closeBtn.setFillStyle(0x445566));
        closeBtn.on('pointerout', () => closeBtn.setFillStyle(0x34495e));

        const onKey = (e) => {
            if (e.code === 'Space' || e.code === 'Escape' || e.code === 'Enter') {
                this._closeDialog();
            }
        };
        this._dialogKeyHandler = onKey;
        s.input.keyboard.on('keydown', onKey);
    }

    _closeDialog() {
        const s = this.scene;
        if (this._dialogKeyHandler) {
            s.input.keyboard.off('keydown', this._dialogKeyHandler);
            this._dialogKeyHandler = null;
        }
        if (s.dialogGroup) {
            s.dialogGroup.forEach(e => e.destroy());
            s.dialogGroup = [];
        }
        s.menuOpen = false;
        s.physics.resume();
    }

    startCartRide() {
        const s = this.scene;
        if (s.transitioning) return;
        s.transitioning = true;
        s.menuOpen = true;
        s.physics.pause();

        const cd = CART_DRIVER_NPC.cart_driver;
        const lang = getLang();
        const greeting = lang === 'ru' ? cd.greetingRu : lang === 'de' ? cd.greetingDe : cd.greeting;
        s.floatingText(s.player.x, s.player.y - 40, greeting, '#f1c40f');

        s.time.delayedCall(1500, () => {
            s.cameras.main.fadeOut(800, 0, 0, 0);
            s.time.delayedCall(800, () => {
                s.currentZone.clear();

                s.cameras.main.setBackgroundColor('#1a0e05');
                s.add.image(400, 300, 'cart_ride').setDepth(0);

                const cartText = s.add.text(400, 280, '...', {
                    fontSize: '20px', fill: '#f5cba7', fontFamily: 'Georgia', fontStyle: 'italic'
                }).setOrigin(0.5).setDepth(10);

                const dots = ['...', '....', '.....', 'The road is long...'];
                let dotIdx = 0;
                const dotTimer = s.time.addEvent({
                    delay: 800, repeat: dots.length - 1,
                    callback: () => {
                        dotIdx++;
                        if (dotIdx < dots.length) cartText.setText(dots[dotIdx]);
                    }
                });

                s.cameras.main.fadeIn(500, 0, 0, 0);

                s.time.delayedCall(3500, () => {
                    s.cameras.main.fadeOut(800, 0, 0, 0);
                    s.time.delayedCall(800, () => {
                        cartText.destroy();
                        s._setupZone('meadow');
                        s.cameras.main.fadeIn(500, 0, 0, 0);
                        s.transitioning = false;
                        s.menuOpen = false;
                        s.physics.resume();
                        s.zones.mine.hasSecretKey = false;
                        s.doSave();
                    });
                });
            });
        });
    }

    openQuestLog() {
        const s = this.scene;
        if (s.menuOpen) return;
        s.questLogOpen = true;
        s.menuOpen = true;
        s.physics.pause();

        s.questLogGroup = [];
        const mk = (el) => { el.setScrollFactor(0).setDepth(100); return el; };

        s.questLogGroup.push(mk(s.add.rectangle(400, 300, 800, 600, 0x000000, 0.97)
            .setStrokeStyle(2, 0xf1c40f).setInteractive()));

        s.questLogGroup.push(mk(s.add.text(400, 35, t('quest.title'), {
            fontSize: '26px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5)));

        const active = getActiveQuests();
        if (active.length === 0) {
            s.questLogGroup.push(mk(s.add.text(400, 300, t('quest.noQuests'), {
                fontSize: '16px', fill: '#666', fontFamily: 'Arial', align: 'center'
            }).setOrigin(0.5)));
        } else {
            active.forEach((q, i) => {
                const y = 75 + i * 95;
                const complete = isQuestComplete(q.key);
                const color = complete ? '#2ecc71' : '#ecf0f1';

                const npc = getQuestNpc(q.key);
                if (npc && npc.texKey) {
                    try {
                        s.questLogGroup.push(mk(s.add.sprite(40, y + 8, npc.texKey).setScale(1.5)));
                    } catch (e) {}
                }

                s.questLogGroup.push(mk(s.add.text(60, y, q.name, {
                    fontSize: '15px', fill: color, fontFamily: 'Arial', fontStyle: 'bold'
                })));

                s.questLogGroup.push(mk(s.add.text(60, y + 20, q.description, {
                    fontSize: '12px', fill: '#95a5a6', fontFamily: 'Arial',
                    wordWrap: { width: 520 }
                })));

                const prog = getQuestProgress(q.key);
                const actionLabel = q.type === 'kill' ? t('quest.kill') : t('quest.collect');
                const progText = `${actionLabel} ${q.target}: ${prog.current}/${prog.total}`;
                s.questLogGroup.push(mk(s.add.text(640, y, progText, {
                    fontSize: '12px', fill: complete ? '#2ecc71' : '#f39c12', fontFamily: 'Arial', fontStyle: 'bold'
                }).setOrigin(1, 0)));

                const rewardParts = [];
                if (q.rewards) {
                    if (q.rewards.exp) rewardParts.push('+' + q.rewards.exp + ' EXP');
                    if (q.rewards.accountExp) rewardParts.push('+' + q.rewards.accountExp + ' Acc EXP');
                    if (q.rewards.talentPoints) rewardParts.push('+' + q.rewards.talentPoints + ' TP');
                }
                if (q.rewardItems && q.rewardItems.length > 0) {
                    rewardParts.push(q.rewardItems.length + ' item(s)');
                }
                if (rewardParts.length > 0) {
                    s.questLogGroup.push(mk(s.add.text(640, y + 20, t('quest.rewards') + ': ' + rewardParts.join('  '), {
                        fontSize: '11px', fill: '#f39c12', fontFamily: 'Arial'
                    }).setOrigin(1, 0)));
                }

                if (i < active.length - 1) {
                    s.questLogGroup.push(mk(s.add.rectangle(400, y + 80, 680, 1, 0x333)));
                }
            });
        }

        const closeBtn = mk(s.add.rectangle(400, 560, 140, 35, 0x34495e)
            .setStrokeStyle(1, 0x555).setInteractive({ useHandCursor: true }));
        s.questLogGroup.push(closeBtn);
        s.questLogGroup.push(mk(s.add.text(400, 560, t('quest.close'), {
            fontSize: '16px', fill: '#fff', fontFamily: 'Arial', fontStyle: 'bold'
        }).setOrigin(0.5)));
        closeBtn.on('pointerdown', () => this.closeQuestLog());
        s.input.keyboard.on('keydown-N', () => this.closeQuestLog());
        s.input.keyboard.on('keydown-ESC', () => this.closeQuestLog());
    }

    closeQuestLog() {
        const s = this.scene;
        s.questLogGroup.forEach(e => e.destroy());
        s.questLogGroup = [];
        s.questLogOpen = false;
        s.menuOpen = false;
        s.physics.resume();
    }
}
