import Phaser from 'phaser';

export class UIButton {
    static create(scene, x, y, config) {
        const {
            width = 160, height = 36,
            color = 0x27ae60, hoverColor = null,
            icon = null, label = '',
            fontSize = '14px', labelColor = '#fff',
            depth = 100, scrollFactor = 0,
            cb = null
        } = config;

        const elements = [];
        const group = scene.add.container(x, y).setDepth(depth).setScrollFactor(scrollFactor);

        // Shadow
        const shadow = scene.add.graphics();
        shadow.fillStyle(0x000000, 0.3);
        shadow.fillRoundedRect(-width / 2 + 3, -height / 2 + 3, width, height, 8);
        group.add(shadow);
        elements.push(shadow);

        // Button background
        const bg = scene.add.graphics();
        const drawBg = (c, alpha) => {
            bg.clear();
            bg.fillStyle(0x000000, 0.4);
            bg.fillRoundedRect(-width / 2, -height / 2, width, height, 8);
            bg.fillStyle(c, alpha || 1);
            bg.fillRoundedRect(-width / 2, -height / 2 + 2, width, height - 4, 7);
            bg.fillStyle(Phaser.Display.Color.ValueToColor(c).brighten(30).color, 0.3);
            bg.fillRoundedRect(-width / 2 + 2, -height / 2 + 2, width - 4, height / 2 - 2, { tl: 7, tr: 7, bl: 0, br: 0 });
        };
        drawBg(color);
        group.add(bg);
        elements.push(bg);

        // Border
        const border = scene.add.graphics();
        border.lineStyle(1, Phaser.Display.Color.ValueToColor(color).brighten(50).color, 0.6);
        border.strokeRoundedRect(-width / 2, -height / 2, width, height, 8);
        group.add(border);
        elements.push(border);

        let contentX = 0;
        if (icon) {
            const iconSpr = scene.add.sprite(-width / 2 + 22, 0, icon).setScale(0.8);
            group.add(iconSpr);
            elements.push(iconSpr);
            contentX = 12;
        }

        if (label) {
            const text = scene.add.text(contentX, 0, label, {
                fontSize, fill: labelColor, fontFamily: 'Arial', fontStyle: 'bold',
                stroke: '#000', strokeThickness: 1
            }).setOrigin(0.5);
            group.add(text);
            elements.push(text);
        }

        // Hit zone
        const hitZone = scene.add.rectangle(0, 0, width, height, 0x000000, 0)
            .setInteractive({ useHandCursor: !!cb });
        group.add(hitZone);

        // Hover effects
        const hCol = hoverColor || Phaser.Display.Color.ValueToColor(color).brighten(20).color;
        hitZone.on('pointerover', () => {
            drawBg(hCol);
            border.clear();
            border.lineStyle(2, Phaser.Display.Color.ValueToColor(hCol).brighten(50).color, 0.8);
            border.strokeRoundedRect(-width / 2, -height / 2, width, height, 8);
            group.setScale(1.03);
        });
        hitZone.on('pointerout', () => {
            drawBg(color);
            border.clear();
            border.lineStyle(1, Phaser.Display.Color.ValueToColor(color).brighten(50).color, 0.6);
            border.strokeRoundedRect(-width / 2, -height / 2, width, height, 8);
            group.setScale(1);
        });
        if (cb) {
            hitZone.on('pointerdown', cb);
        }

        group.hitZone = hitZone;
        group.elements = elements;
        return group;
    }

    static createNavButton(scene, x, y, icon, locked, cb) {
        const size = 28;
        const group = scene.add.container(x, y).setDepth(21).setScrollFactor(0);

        const bg = scene.add.graphics();
        const drawBg = (color, alpha) => {
            bg.clear();
            bg.fillStyle(0x000000, 0.4);
            bg.fillRoundedRect(-size / 2 + 1, -size / 2 + 1, size, size, 6);
            bg.fillStyle(color, alpha || 1);
            bg.fillRoundedRect(-size / 2, -size / 2, size, size, 6);
        };

        if (locked) {
            drawBg(0x151520, 0.6);
            const lock = scene.add.text(0, 0, '\u{1F512}', { fontSize: '10px' }).setOrigin(0.5).setAlpha(0.4);
            group.add(lock);
        } else {
            drawBg(0x1e1e35, 1);
            const iconSpr = scene.add.sprite(0, 0, icon).setScale(0.9);
            group.add(iconSpr);

            const hitZone = scene.add.rectangle(0, 0, size, size, 0x000000, 0)
                .setInteractive({ useHandCursor: true });
            group.add(hitZone);

            hitZone.on('pointerover', () => {
                drawBg(0x2a2a50, 1);
                group.setScale(1.1);
            });
            hitZone.on('pointerout', () => {
                drawBg(0x1e1e35, 1);
                group.setScale(1);
            });
            if (cb) hitZone.on('pointerdown', () => {
                if (!scene.menuOpen && !scene.transitioning) cb();
            });
        }

        group.add(bg);
        return group;
    }
}
