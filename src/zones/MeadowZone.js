import Phaser from 'phaser';
import { MEADOW_GATE_POS, MEADOW_WIDTH, MEADOW_HEIGHT, GAME_WIDTH, GAME_HEIGHT } from '../config/index.js';
import { playPortal, startZoneMusic } from '../sound.js';
import { BaseZone } from '../systems/BaseZone.js';

export class MeadowZone extends BaseZone {
    constructor(scene) {
        super(scene);
    }

    setup() {
        const s = this.scene;
        s.cameras.main.setBackgroundColor('#1a3a1a');
        s.physics.world.setBounds(0, 0, MEADOW_WIDTH, MEADOW_HEIGHT);
        s.cameras.main.setBounds(0, 0, MEADOW_WIDTH, MEADOW_HEIGHT);

        s.meadowBg = s.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'meadow_ground').setDepth(0);

        s.meadowGate = s.add.sprite(MEADOW_GATE_POS.x, MEADOW_GATE_POS.y, 'mine_gate').setDepth(5);
        s.physics.add.existing(s.meadowGate, true);
        s.meadowGate.body.setSize(64, 80);

        s.gateHint = s.add.text(MEADOW_GATE_POS.x, MEADOW_GATE_POS.y + 50, '', {
            fontSize: '12px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);

        s.gateArrow = s.add.text(MEADOW_GATE_POS.x, MEADOW_GATE_POS.y - 50, '\u25bc', {
            fontSize: '20px', fill: '#f1c40f', fontFamily: 'Arial'
        }).setOrigin(0.5).setDepth(12);
        s.tweens.add({ targets: s.gateArrow, y: MEADOW_GATE_POS.y - 42, duration: 500, yoyo: true, repeat: -1 });

        s.gateGlow = s.add.circle(MEADOW_GATE_POS.x, MEADOW_GATE_POS.y, 35, 0xf1c40f, 0.15).setDepth(4);
        s.tweens.add({ targets: s.gateGlow, alpha: { from: 0.08, to: 0.25 }, scaleX: { from: 0.9, to: 1.1 }, scaleY: { from: 0.9, to: 1.1 }, duration: 1200, yoyo: true, repeat: -1 });

        s.player.x = 400;
        s.player.y = 500;
        s.player.body.setCollideWorldBounds(true);
        s.cameras.main.startFollow(s.player, true, 0.1, 0.1);
        s.cameras.main.setDeadzone(100, 80);

        s.enemies = s.physics.add.group();

        s.zone = 'meadow';
        s.npc.spawnNPCs();

        const elderSprite = s.npcSprites.find(n => n.npcKey === 'meadow_elder');
        if (elderSprite) {
            if (s.zones.arena && s.zones.arena.bossDefeated) {
                elderSprite.greeting = 'You defeated the Treant! The Mine is now open. Find the Skeleton Lord — he holds the key to the Village gates.';
                elderSprite.greetingRu = 'Ты победил Трента! Шахта теперь открыта. Найди Повелителя Скелетов — он хранит ключ к Вратам Деревни.';
                elderSprite.greetingDe = 'Du hast den Treant besiegt! Das Mine ist jetzt offen. Finde den Skelett-Lord — er hält den Schlüssel zu den Toren des Dorfes.';
            }
        }

        startZoneMusic('meadow');
        s.doSave();

        if (!s.tutorialMgr.shown['guided_intro']) {
            s.tutorialMgr.shown['guided_intro'] = true;
            s.tutorialMgr.startGuidedTutorial([
                {
                    text: 'Move with the Arrow Keys',
                    textRu: 'Двигайся с помощью Стрелок',
                    check: (sc) => sc.player && (Math.abs(sc.player.body.velocity.x) > 10 || Math.abs(sc.player.body.velocity.y) > 10),
                    completeMsg: 'Good! Now approach the Old Traveler',
                    completeMsgRu: 'Отлично! Теперь подойди к Старому Страннику'
                },
                {
                    text: 'Talk to the Old Traveler (SPACE near him)',
                    textRu: 'Поговори со Старым Странником (SPACE рядом с ним)',
                    check: (sc) => sc._meadowSpokeToElder,
                    completeMsg: 'Quest received!',
                    completeMsgRu: 'Квест получен!'
                },
                {
                    text: 'Go through the gate to the Forest (SPACE at the gate)',
                    textRu: 'Пройди через ворота в Лес (SPACE у ворот)',
                    check: (sc) => sc.zone === 'forest',
                    completeMsg: 'Forest entered!',
                    completeMsgRu: 'В Лес Entered!'
                }
            ]);
        }
    }

    handleSpace() {
        const s = this.scene;
        if (s.transitioning || s.menuOpen) return;
        if (s.nearbyNpc) {
            if (s.nearbyNpc.npcKey === 'meadow_elder') s._meadowSpokeToElder = true;
            s.npc.interactWithNpc();
            return;
        }
        if (s.zone !== 'meadow') return;
        if (!s.meadowGate) return;
        const dist = Phaser.Math.Distance.Between(
            s.player.x, s.player.y, MEADOW_GATE_POS.x, MEADOW_GATE_POS.y
        );
        if (dist >= 70) {
            s.attack();
            return;
        }

        s.transitioning = true;
        s.gateHint.setText('');
        playPortal();
        s.cameras.main.fadeOut(800, 0, 0, 0);
        s.time.delayedCall(800, () => {
            s._setupZone('forest');
            s.cameras.main.fadeIn(500, 0, 0, 0);
            s.transitioning = false;
        });
    }

    update() {
        const s = this.scene;
        if (s.zone !== 'meadow' || s.transitioning || s.menuOpen) return;
        const gd = Phaser.Math.Distance.Between(s.player.x, s.player.y, MEADOW_GATE_POS.x, MEADOW_GATE_POS.y);
        if (s.gateHint) {
            s.gateHint.setText(gd < 80 ? 'SPACE = enter forest' : '');
        }
    }

    _destroyZoneSpecific() {
        const s = this.scene;
        if (s.meadowBg) { s.meadowBg.destroy(); s.meadowBg = null; }
        if (s.meadowGate) { s.meadowGate.destroy(); s.meadowGate = null; }
        if (s.gateHint) { s.gateHint.destroy(); s.gateHint = null; }
        if (s.gateArrow) { s.gateArrow.destroy(); s.gateArrow = null; }
        if (s.gateGlow) { s.gateGlow.destroy(); s.gateGlow = null; }
        s._meadowSpokeToElder = false;
    }
}
