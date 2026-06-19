import Phaser from 'phaser';
import { MEADOW_GATE_POS, MEADOW_WIDTH, MEADOW_HEIGHT } from '../config/index.js';
import { playPortal, startZoneMusic } from '../sound.js';

export class MeadowZone {
    constructor(scene) {
        this.scene = scene;
    }

    setup() {
        const s = this.scene;
        s.cameras.main.setBackgroundColor('#1a3a1a');
        s.physics.world.setBounds(0, 0, MEADOW_WIDTH, MEADOW_HEIGHT);
        s.cameras.main.setBounds(0, 0, MEADOW_WIDTH, MEADOW_HEIGHT);

        s.meadowBg = s.add.image(400, 300, 'meadow_ground').setDepth(0);

        s.meadowGate = s.add.sprite(MEADOW_GATE_POS.x, MEADOW_GATE_POS.y, 'mine_gate').setDepth(5);
        s.physics.add.existing(s.meadowGate, true);
        s.meadowGate.body.setSize(64, 80);

        s.gateHint = s.add.text(MEADOW_GATE_POS.x, MEADOW_GATE_POS.y + 50, '', {
            fontSize: '12px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
            stroke: '#000', strokeThickness: 2
        }).setOrigin(0.5).setDepth(12);

        s.player.x = 400;
        s.player.y = 500;
        s.player.body.setCollideWorldBounds(true);
        s.cameras.main.startFollow(s.player, true, 0.1, 0.1);
        s.cameras.main.setDeadzone(100, 80);

        s.zone = 'meadow';
        startZoneMusic('meadow');
        s.doSave();
    }

    handleSpace() {
        const s = this.scene;
        if (s.transitioning || s.menuOpen) return;
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
            this.clear();
            s.zones.cave.setup();
            s.cameras.main.fadeIn(500, 0, 0, 0);
            s.transitioning = false;
        });
    }

    update() {
        const s = this.scene;
        if (s.zone !== 'meadow' || s.transitioning || s.menuOpen) return;
        const gd = Phaser.Math.Distance.Between(s.player.x, s.player.y, MEADOW_GATE_POS.x, MEADOW_GATE_POS.y);
        if (s.gateHint) {
            s.gateHint.setText(gd < 80 ? 'SPACE = enter cave' : '');
        }
    }

    clear() {
        const s = this.scene;
        s.physics.world.colliders.destroy();
        if (s.meadowBg) { s.meadowBg.destroy(); s.meadowBg = null; }
        if (s.meadowGate) { s.meadowGate.destroy(); s.meadowGate = null; }
        if (s.gateHint) { s.gateHint.destroy(); s.gateHint = null; }
    }
}
