import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from '../config/index.js';

export class LoreItemSystem {
    constructor(scene) {
        this.scene = scene;
    }

    spawnLoreItems(zoneKey, positions) {
        const s = this.scene;
        if (!s.loreItemSprites) s.loreItemSprites = [];

        const loreTexts = this._getLoreTexts(zoneKey);
        if (!loreTexts || loreTexts.length === 0) return;

        positions.forEach((pos, i) => {
            const text = loreTexts[i % loreTexts.length];
            const item = s.add.sprite(pos.x, pos.y, 'scroll_item').setDepth(6).setAlpha(0.8);
            if (!s.textures.exists('scroll_item')) {
                item.destroy();
                return;
            }
            s.physics.add.existing(item, true);
            item.body.setSize(20, 20);
            item.loreText = text;
            item.interacted = false;

            s.tweens.add({
                targets: item, alpha: { from: 0.6, to: 1 }, y: pos.y - 2,
                duration: 1500, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
            });

            item.hintText = s.add.text(pos.x, pos.y - 20, '', {
                fontSize: '9px', fill: '#f1c40f', fontFamily: 'Arial', fontStyle: 'bold',
                stroke: '#000', strokeThickness: 2
            }).setOrigin(0.5).setDepth(12);

            s.loreItemSprites.push(item);
        });
    }

    update() {
        const s = this.scene;
        if (!s.loreItemSprites || !s.player) return;

        s.loreItemSprites.forEach(item => {
            if (!item.active || item.interacted) return;
            const dist = Phaser.Math.Distance.Between(s.player.x, s.player.y, item.x, item.y);
            if (dist < 40) {
                item.hintText.setText('SPACE to read');
            } else {
                item.hintText.setText('');
            }
        });
    }

    tryInteract() {
        const s = this.scene;
        if (!s.loreItemSprites || !s.player) return false;

        for (const item of s.loreItemSprites) {
            if (!item.active || item.interacted) continue;
            const dist = Phaser.Math.Distance.Between(s.player.x, s.player.y, item.x, item.y);
            if (dist < 40) {
                this._showLore(item);
                return true;
            }
        }
        return false;
    }

    _showLore(item) {
        const s = this.scene;
        item.interacted = true;
        if (item.hintText) { item.hintText.destroy(); item.hintText = null; }

        const lang = localStorage.getItem('game_lang') || 'en';
        const text = item.loreText[lang] || item.loreText.en || item.loreText;

        s.menuOpen = true;
        s.physics.pause();

        const elements = [];
        const depth = 250;

        const overlay = s.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH, GAME_HEIGHT, 0x000000, 0.7)
            .setDepth(depth).setScrollFactor(0);
        elements.push(overlay);

        const bg = s.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT / 2, 440, 200, 0x1a1a0a, 0.95)
            .setStrokeStyle(2, 0xf1c40f).setDepth(depth + 1).setScrollFactor(0);
        elements.push(bg);

        const title = s.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 - 70, '📜 Found Note', {
            fontSize: '16px', fill: '#f1c40f', fontFamily: 'Georgia', fontStyle: 'bold'
        }).setOrigin(0.5).setDepth(depth + 2).setScrollFactor(0);
        elements.push(title);

        const content = s.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2, text, {
            fontSize: '12px', fill: '#ccc', fontFamily: 'Georgia', fontStyle: 'italic',
            wordWrap: { width: 400 }, align: 'center', lineSpacing: 4
        }).setOrigin(0.5).setDepth(depth + 2).setScrollFactor(0);
        elements.push(content);

        const hint = s.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 80, 'SPACE / Click to close', {
            fontSize: '10px', fill: '#666', fontFamily: 'Arial'
        }).setOrigin(0.5).setDepth(depth + 2).setScrollFactor(0);
        elements.push(hint);

        const close = () => {
            s.input.keyboard.off('keydown-SPACE', close);
            s.input.off('pointerdown', close);
            elements.forEach(el => el.destroy());
            s.menuOpen = false;
            s.physics.resume();
            s.tweens.add({ targets: item, alpha: 0, duration: 500, onComplete: () => {
                const idx = s.loreItemSprites.indexOf(item);
                if (idx !== -1) s.loreItemSprites.splice(idx, 1);
                if (item.active) item.destroy();
            }});
        };

        s.time.delayedCall(500, () => {
            s.input.keyboard.on('keydown-SPACE', close);
            s.input.on('pointerdown', close);
        });
    }

    _getLoreTexts(zoneKey) {
        const texts = {
            forest: [
                { en: 'The goblins were not always evil. Something twisted them — a darkness seeping from below.', ru: 'Гоблины не всегда были злыми. Что-то их исказило — тьма, сочащаяся снизу.' },
                { en: 'The old trees whisper of a time before the corruption. When the forest was safe.', ru: 'Старые деревья шептут о временах до порчи. Когда лес был безопасным.' }
            ],
            mine: [
                { en: 'Day 47: The miners found something deep in the shafts. Not ore. Something alive.', ru: 'День 47: Шахтёры нашли кое-что глубоко в шахтах. Не руду. Что-то живое.' },
                { en: 'The Skeleton Lord was once a king. He sought immortality. He found it — but not as he planned.', ru: 'Повелитель Скелетов когда-то был королём. Он искал бессмертие. Нашёл — но не так, как планировал.' }
            ],
            cave: [
                { en: 'The spiders grew to unnatural sizes feeding on the cave\'s corrupted minerals.', ru: 'Пауки выросли до неестественных размеров, питаясь испорченными минералами пещеры.' },
                { en: 'Deep in the cave, something ancient stirs. It has waited for centuries.', ru: 'Глубоко в пещере что-то древнее шевелится. Оно ждало веками.' }
            ],
            village: [
                { en: 'The infection spread from the cemetery. The dead rose first. Then the living fell.', ru: 'Заражение распространилось с кладбища. Сначала восстали мёртвые. Потом пали живые.' },
                { en: 'The Purple Demon was cast down from hell. It was given this village as punishment.', ru: 'Фиолетовый Демон был низвергнут из ада. Ему дали эту деревню как наказание.' }
            ],
            hell: [
                { en: 'The Red Demon was once an archangel. Cast down for questioning the divine plan.', ru: 'Красный Демон когда-то был архангелом. Низвергнут за сомнения в божественном плане.' },
                { en: 'Lava flows through rivers of fire. The heat is unbearable. But deeper still, something waits.', ru: 'Лава течёт по рекам огня. Жара невыносима. Но глубже всё ещё что-то ждёт.' }
            ],
            snowy: [
                { en: 'The Ice Spirit froze the village in a moment of rage. Its regret is eternal.', ru: 'Ледяной Дух заморозил деревню в момент ярости. Его сожаление вечно.' },
                { en: 'Frost wraiths haunt the frozen streets. They seek warmth they can never find.', ru: 'Морозные призраки бродят по замёрзшим улицам. Они ищут тепло, которое никогда не найдут.' }
            ],
            castle: [
                { en: 'The Bandit Leader was once a general who lost his kingdom. He rebuilt it here — in fear.', ru: 'Лидер Бандитов когда-то был генералом, потерявшим королевство. Он восстановил его здесь — в страхе.' },
                { en: 'Behind every door, a trap. Behind every trap, a treasure. The castle plays games.', ru: 'За каждой дверью — ловушка. За каждой ловушкой — сокровище. Замок играет в игры.' }
            ],
            depths: [
                { en: 'Beneath the village foundation — ancient catacombs. Here sleep the souls of all who were never buried.', ru: 'Под фундаментом деревни — древние катакомбы. Здесь спят души всех, кого не похоронили.' },
                { en: 'The Lich King was once a mortal king who sought immortality through dark rituals.', ru: 'Король Лич когда-то был смертным королём, искавшим бессмертие через тёмные ритуалы.' }
            ],
            shadow: [
                { en: 'A parallel dimension where shadows live their own lives. Reflections of reality, distorted.', ru: 'Параллельное измерение, где тени живут своей жизнью. Отражения реальности, искажённые.' },
                { en: 'The Shadow King was once a mortal ruler who discovered this realm. He conquered it — and it conquered him.', ru: 'Король Теней когда-то был смертным правителем, открывшим это измерение. Он завоевал его — и оно завоевало его.' }
            ],
            tower: [
                { en: 'Two hundred years ago, the King ruled these lands. He was cursed and turned into a shadow.', ru: 'Двести лет назад Король правил этими землями. Он был проклят и превращён в тень.' },
                { en: 'The tower still guards its warriors, loyal to their oath. Free the King — and he will open the path.', ru: 'Башня до сих пор хранит своих воинов, верных присяге. Освободи Короля — и он откроет путь.' }
            ]
        };
        return texts[zoneKey] || [];
    }

    cleanup() {
        const s = this.scene;
        if (s.loreItemSprites) {
            s.loreItemSprites.forEach(item => {
                if (item.hintText) { item.hintText.destroy(); item.hintText = null; }
                if (item.active) item.destroy();
            });
            s.loreItemSprites = [];
        }
    }
}
