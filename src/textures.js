import Phaser from 'phaser';
import { lighten } from './utils.js';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        this.cameras.main.setBackgroundColor('#0a0a1a');
        this.add.text(400, 300, 'Loading...', {
            fontSize: '24px', fill: '#fff', fontFamily: 'Arial'
        }).setOrigin(0.5);
    }

    create() {
        this.generateAllTextures();
        this.scene.start('Menu');
    }

    generateAllTextures() {
        const mk = (key, w, h, drawFn) => {
            const canvas = this.textures.createCanvas(key, w, h);
            drawFn(canvas.getContext());
            canvas.refresh();
        };

        this._mk = mk;
        this._drawPlayer();
        this._drawSage();
        this._drawAlchemist();
        this._drawAngel();
        this._drawEnemies();
        this._drawEffects();
        this._drawWorld();
        this._drawItems();
        this._drawNPCs();
        this._drawBoss();
        this._drawMine();
        this._drawExpansion();
        this._drawSnowyVillage();
        this._generateAnimations();
    }

    _drawPlayer() {
        this._mk('player', 32, 48, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#f39c12';
            c.fillRect(8, 0, 16, 4);
            c.fillStyle = '#f5cba7';
            c.fillRect(12, 4, 8, 8);
            c.fillStyle = '#2c3e50';
            c.fillRect(13, 6, 2, 2);
            c.fillRect(17, 6, 2, 2);
            c.fillStyle = '#c0392b';
            c.fillRect(6, 12, 20, 16);
            c.fillStyle = '#7d3c98';
            c.fillRect(8, 14, 16, 12);
            c.fillStyle = '#f5cba7';
            c.fillRect(2, 14, 4, 12);
            c.fillRect(26, 14, 4, 12);
            c.fillStyle = '#7d3c98';
            c.fillRect(26, 14, 4, 3);
            c.fillStyle = '#c0392b';
            c.fillRect(10, 28, 5, 12);
            c.fillRect(17, 28, 5, 12);
            c.fillStyle = '#5d4e37';
            c.fillRect(9, 40, 6, 6);
            c.fillRect(17, 40, 6, 6);
            c.fillStyle = '#ecf0f1';
            c.fillRect(10, 18, 12, 2);
            c.fillRect(10, 22, 12, 2);
        });
    }

    _drawSage() {
        this._mk('player_sage', 32, 48, (c) => {
            c.imageSmoothingEnabled = false;
            // Hat (pointed wizard hat, dark purple)
            c.fillStyle = '#2d1b4e';
            c.fillRect(10, 0, 12, 4);
            c.fillRect(8, 4, 16, 4);
            c.fillRect(6, 8, 20, 4);
            // Hat brim
            c.fillStyle = '#3d2b5e';
            c.fillRect(4, 12, 24, 2);
            // Hat tip star
            c.fillStyle = '#f1c40f';
            c.fillRect(14, 1, 4, 2);
            // Face (old, pale)
            c.fillStyle = '#d5c4a1';
            c.fillRect(10, 14, 12, 8);
            // Eyes (wise, glowing slightly)
            c.fillStyle = '#7b68ee';
            c.fillRect(12, 16, 2, 2);
            c.fillRect(18, 16, 2, 2);
            // Beard (long, grey)
            c.fillStyle = '#9e9e9e';
            c.fillRect(12, 20, 8, 4);
            c.fillRect(10, 22, 12, 4);
            c.fillRect(12, 26, 8, 2);
            // Robe (dark purple)
            c.fillStyle = '#2d1b4e';
            c.fillRect(6, 14, 20, 16);
            c.fillStyle = '#3d2b5e';
            c.fillRect(8, 16, 16, 12);
            // Robe trim
            c.fillStyle = '#6a3d9a';
            c.fillRect(6, 28, 20, 2);
            // Arms
            c.fillStyle = '#2d1b4e';
            c.fillRect(2, 16, 4, 12);
            c.fillRect(26, 16, 4, 12);
            // Hands (pale)
            c.fillStyle = '#d5c4a1';
            c.fillRect(2, 28, 4, 4);
            c.fillRect(26, 28, 4, 4);
            // Book in left hand
            c.fillStyle = '#5a3d1a';
            c.fillRect(0, 26, 6, 8);
            c.fillStyle = '#f5f5dc';
            c.fillRect(1, 27, 4, 6);
            c.fillStyle = '#2d1b4e';
            c.fillRect(1, 27, 4, 1);
            // Legs/boots
            c.fillStyle = '#1a0e2e';
            c.fillRect(10, 30, 5, 10);
            c.fillRect(17, 30, 5, 10);
            // Boots
            c.fillStyle = '#3d2b1f';
            c.fillRect(9, 38, 6, 6);
            c.fillRect(17, 38, 6, 6);
            // Staff in right hand
            c.fillStyle = '#8b6914';
            c.fillRect(28, 10, 2, 28);
            c.fillStyle = '#6a3d9a';
            c.fillRect(27, 8, 4, 4);
            c.fillStyle = '#9b59b6';
            c.fillRect(28, 9, 2, 2);
        });
    }

    _drawAlchemist() {
        this._mk('player_alchemist', 32, 48, (c) => {
            c.imageSmoothingEnabled = false;
            // Hat (round alchemist hat, brown)
            c.fillStyle = '#5a3d1a';
            c.fillRect(8, 0, 16, 4);
            c.fillRect(6, 4, 20, 4);
            c.fillRect(4, 8, 24, 4);
            // Hat brim
            c.fillStyle = '#6b4423';
            c.fillRect(2, 12, 28, 2);
            // Goggles
            c.fillStyle = '#f39c12';
            c.fillRect(10, 14, 5, 4);
            c.fillRect(17, 14, 5, 4);
            c.fillStyle = '#2c3e50';
            c.fillRect(11, 15, 3, 2);
            c.fillRect(18, 15, 3, 2);
            // Bridge of goggles
            c.fillStyle = '#f39c12';
            c.fillRect(15, 15, 2, 2);
            // Face (weathered)
            c.fillStyle = '#c4956a';
            c.fillRect(10, 14, 12, 8);
            // Beard (brown, bushy)
            c.fillStyle = '#6b4423';
            c.fillRect(10, 20, 12, 4);
            c.fillRect(8, 22, 16, 4);
            c.fillRect(10, 26, 12, 2);
            // Coat (brown leather)
            c.fillStyle = '#5a3d1a';
            c.fillRect(6, 14, 20, 16);
            c.fillStyle = '#6b4423';
            c.fillRect(8, 16, 16, 12);
            // Coat trim
            c.fillStyle = '#8b6914';
            c.fillRect(6, 28, 20, 2);
            // Belt
            c.fillStyle = '#3d2b1f';
            c.fillRect(6, 26, 20, 2);
            c.fillStyle = '#f1c40f';
            c.fillRect(14, 25, 4, 4);
            // Arms
            c.fillStyle = '#5a3d1a';
            c.fillRect(2, 16, 4, 12);
            c.fillRect(26, 16, 4, 12);
            // Hands
            c.fillStyle = '#c4956a';
            c.fillRect(2, 28, 4, 4);
            c.fillRect(26, 28, 4, 4);
            // Flask in left hand (green liquid)
            c.fillStyle = '#27ae60';
            c.fillRect(0, 24, 6, 8);
            c.fillStyle = '#2ecc71';
            c.fillRect(1, 25, 4, 5);
            c.fillStyle = '#5a3d1a';
            c.fillRect(1, 23, 4, 2);
            // Legs/boots
            c.fillStyle = '#3d2b1f';
            c.fillRect(10, 30, 5, 10);
            c.fillRect(17, 30, 5, 10);
            // Boots
            c.fillStyle = '#2c1e14';
            c.fillRect(9, 38, 6, 6);
            c.fillRect(17, 38, 6, 6);
            // Vials on belt
            c.fillStyle = '#e74c3c';
            c.fillRect(26, 22, 3, 5);
            c.fillStyle = '#3498db';
            c.fillRect(27, 20, 3, 5);
        });
    }

    _drawAngel() {
        this._mk('player_angel', 32, 48, (c) => {
            c.imageSmoothingEnabled = false;
            // Hair (blonde)
            c.fillStyle = '#f1c40f';
            c.fillRect(10, 0, 12, 4);
            c.fillRect(8, 2, 16, 6);
            c.fillRect(6, 6, 20, 4);
            // Face (pale, youthful)
            c.fillStyle = '#fdebd0';
            c.fillRect(10, 8, 12, 8);
            // Eyes (blue, divine)
            c.fillStyle = '#5dade2';
            c.fillRect(12, 10, 2, 2);
            c.fillRect(18, 10, 2, 2);
            // Mouth
            c.fillStyle = '#e8a0a0';
            c.fillRect(14, 14, 4, 1);
            // Small white wings
            c.fillStyle = '#ecf0f1';
            c.fillRect(0, 10, 6, 8);
            c.fillRect(26, 10, 6, 8);
            c.fillStyle = '#ffffff';
            c.fillRect(1, 11, 4, 6);
            c.fillRect(27, 11, 4, 6);
            // Wing feathers
            c.fillStyle = '#d5dbdb';
            c.fillRect(0, 12, 2, 4);
            c.fillRect(30, 12, 2, 4);
            // White robe
            c.fillStyle = '#ecf0f1';
            c.fillRect(6, 14, 20, 16);
            c.fillStyle = '#ffffff';
            c.fillRect(8, 16, 16, 12);
            // Robe trim (golden)
            c.fillStyle = '#f1c40f';
            c.fillRect(6, 28, 20, 2);
            // Holy symbol on chest
            c.fillStyle = '#f1c40f';
            c.fillRect(14, 18, 4, 6);
            c.fillRect(12, 20, 8, 2);
            // Arms
            c.fillStyle = '#ecf0f1';
            c.fillRect(2, 16, 4, 12);
            c.fillRect(26, 16, 4, 12);
            // Hands
            c.fillStyle = '#fdebd0';
            c.fillRect(2, 28, 4, 4);
            c.fillRect(26, 28, 4, 4);
            // Violin in right hand
            c.fillStyle = '#8b4513';
            c.fillRect(27, 18, 2, 14);
            c.fillStyle = '#a0522d';
            c.fillRect(25, 20, 6, 8);
            c.fillStyle = '#f5f5dc';
            c.fillRect(26, 21, 4, 6);
            c.fillStyle = '#8b4513';
            c.fillRect(28, 16, 2, 4);
            // Legs/boots (white)
            c.fillStyle = '#ecf0f1';
            c.fillRect(10, 30, 5, 10);
            c.fillRect(17, 30, 5, 10);
            // Boots (golden)
            c.fillStyle = '#f1c40f';
            c.fillRect(9, 38, 6, 6);
            c.fillRect(17, 38, 6, 6);
        });
    }

    _drawEnemies() {
        this._mk('goblin', 24, 24, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#27ae60';
            c.fillRect(8, 0, 8, 4);
            c.fillRect(4, 4, 16, 8);
            c.fillRect(6, 12, 12, 4);
            c.fillStyle = '#1e8449';
            c.fillRect(6, 2, 2, 4);
            c.fillRect(16, 2, 2, 4);
            c.fillStyle = '#f1c40f';
            c.fillRect(9, 6, 2, 2);
            c.fillRect(13, 6, 2, 2);
            c.fillStyle = '#000';
            c.fillRect(10, 6, 1, 1);
            c.fillRect(14, 6, 1, 1);
            c.fillStyle = '#c0392b';
            c.fillRect(10, 10, 4, 1);
            c.fillStyle = '#27ae60';
            c.fillRect(7, 14, 4, 6);
            c.fillRect(13, 14, 4, 6);
            c.fillStyle = '#1e8449';
            c.fillRect(4, 14, 3, 4);
            c.fillRect(17, 14, 3, 4);
            c.fillStyle = '#8b4513';
            c.fillRect(7, 20, 4, 4);
            c.fillRect(13, 20, 4, 4);
        });

        this._mk('slime', 20, 20, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#9b59b6';
            c.fillRect(6, 6, 8, 4);
            c.fillRect(4, 8, 12, 4);
            c.fillRect(2, 10, 16, 4);
            c.fillStyle = '#8e44ad';
            c.fillRect(4, 14, 12, 4);
            c.fillRect(6, 16, 8, 2);
            c.fillStyle = '#fff';
            c.fillRect(7, 8, 2, 2);
            c.fillRect(12, 8, 2, 2);
            c.fillStyle = '#000';
            c.fillRect(7, 9, 1, 1);
            c.fillRect(13, 9, 1, 1);
        });

        this._mk('rat', 20, 16, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#e67e22';
            c.fillRect(10, 2, 4, 4);
            c.fillRect(6, 4, 10, 4);
            c.fillStyle = '#d35400';
            c.fillRect(8, 4, 8, 6);
            c.fillRect(4, 6, 14, 4);
            c.fillRect(2, 8, 16, 2);
            c.fillStyle = '#000';
            c.fillRect(5, 5, 1, 1);
            c.fillRect(14, 5, 1, 1);
            c.fillStyle = '#ecf0f1';
            c.fillRect(9, 8, 1, 1);
            c.fillRect(12, 8, 1, 1);
            c.fillStyle = '#d35400';
            c.fillRect(5, 10, 3, 4);
            c.fillRect(12, 10, 3, 4);
            c.fillStyle = '#8b4513';
            c.fillRect(4, 14, 4, 2);
            c.fillRect(12, 14, 4, 2);
        });
    }

    _drawEffects() {
        this._mk('slash', 40, 40, (c) => {
            c.fillStyle = 'rgba(255,255,255,0.3)';
            c.beginPath();
            c.arc(20, 20, 18, 0, Math.PI * 2);
            c.fill();
            c.fillStyle = 'rgba(255,255,255,0.7)';
            c.beginPath();
            c.arc(20, 20, 10, 0, Math.PI * 2);
            c.fill();
            c.strokeStyle = 'rgba(200,220,255,0.9)';
            c.lineWidth = 2;
            c.beginPath();
            c.arc(20, 20, 14, -0.8, 1.2);
            c.stroke();
        });

        this._mk('corruption_full', 8, 8, (c) => {
            c.fillStyle = '#1a0a00';
            c.fillRect(0, 0, 8, 8);
            c.fillStyle = '#3d0a0a';
            for (let i = 0; i < 8; i++) {
                c.fillRect(Math.random() * 8, Math.random() * 8, 2, 2);
            }
        });

        this._mk('talent_node', 24, 24, (c) => {
            c.fillStyle = '#1a1a2e';
            c.beginPath();
            c.arc(12, 12, 11, 0, Math.PI * 2);
            c.fill();
            c.strokeStyle = '#444466';
            c.lineWidth = 2;
            c.beginPath();
            c.arc(12, 12, 11, 0, Math.PI * 2);
            c.stroke();
        });

        this._mk('talent_node_active', 24, 24, (c) => {
            c.fillStyle = '#1a1a3e';
            c.beginPath();
            c.arc(12, 12, 11, 0, Math.PI * 2);
            c.fill();
            c.strokeStyle = '#f1c40f';
            c.lineWidth = 2;
            c.beginPath();
            c.arc(12, 12, 11, 0, Math.PI * 2);
            c.stroke();
            c.fillStyle = '#f1c40f';
            c.beginPath();
            c.arc(12, 12, 5, 0, Math.PI * 2);
            c.fill();
        });

        this._mk('talent_node_unlocked', 24, 24, (c) => {
            c.fillStyle = '#2d1b4e';
            c.beginPath();
            c.arc(12, 12, 11, 0, Math.PI * 2);
            c.fill();
            c.strokeStyle = '#9b59b6';
            c.lineWidth = 2;
            c.beginPath();
            c.arc(12, 12, 11, 0, Math.PI * 2);
            c.stroke();
            c.fillStyle = '#9b59b6';
            c.beginPath();
            c.arc(12, 12, 5, 0, Math.PI * 2);
            c.fill();
        });

        this._mk('coin', 8, 8, (c) => {
            c.fillStyle = '#f1c40f';
            c.beginPath();
            c.arc(4, 4, 3, 0, Math.PI * 2);
            c.fill();
            c.fillStyle = '#f39c12';
            c.beginPath();
            c.arc(4, 4, 2, 0, Math.PI * 2);
            c.fill();
        });
    }

    _drawWorld() {
        this._mk('ground', 800, 200, (c) => {
            c.fillStyle = '#1a472a';
            c.fillRect(0, 0, 800, 200);
            c.fillStyle = '#1e5631';
            for (let i = 0; i < 200; i++) {
                c.fillRect(Math.random() * 800, Math.random() * 200, 2, 2);
            }
            c.fillStyle = '#145a28';
            for (let i = 0; i < 60; i++) {
                c.fillRect(Math.random() * 800, Math.random() * 50, 4, 2);
            }
            c.fillStyle = '#0d3318';
            for (let i = 0; i < 40; i++) {
                c.fillRect(Math.random() * 800, Math.random() * 200, 3, 1);
            }
        });

        this._mk('stump', 28, 24, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#6d4c2a';
            c.fillRect(4, 8, 20, 14);
            c.fillStyle = '#8b6914';
            c.fillRect(6, 6, 16, 4);
            c.fillStyle = '#5a3d1a';
            c.fillRect(8, 12, 12, 8);
            c.fillStyle = '#a07828';
            c.fillRect(10, 8, 3, 3);
            c.fillRect(17, 10, 2, 2);
            c.fillStyle = '#4a2d10';
            c.fillRect(4, 20, 20, 4);
            c.fillStyle = '#7a5a30';
            c.fillRect(6, 22, 4, 2);
            c.fillRect(18, 22, 4, 2);
        });

        this._mk('stump_broken', 28, 12, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#5a3d1a';
            c.fillRect(2, 4, 24, 6);
            c.fillStyle = '#4a2d10';
            c.fillRect(0, 8, 28, 4);
            c.fillStyle = '#8b6914';
            c.fillRect(6, 2, 4, 4);
            c.fillRect(18, 2, 4, 4);
            c.fillStyle = '#a07828';
            c.fillRect(10, 4, 3, 2);
        });
    }

    _drawItems() {
        const defs = [
            { key: 'item_stick',   color: '#a07828', shape: 'line' },
            { key: 'item_stone',   color: '#95a5a6', shape: 'diamond' },
            { key: 'item_leaf',    color: '#27ae60', shape: 'leaf' },
            { key: 'item_mush',    color: '#e74c3c', shape: 'mush' },
            { key: 'item_iron',    color: '#bdc3c7', shape: 'ore' },
            { key: 'item_leather', color: '#a0522d', shape: 'rect' },
            { key: 'item_herb',    color: '#2ecc71', shape: 'herb' },
            { key: 'item_ruby',    color: '#e74c3c', shape: 'gem' },
            { key: 'item_sapph',   color: '#3498db', shape: 'gem' },
            { key: 'item_flame',   color: '#e67e22', shape: 'sword' },
            { key: 'item_dscale',  color: '#8e44ad', shape: 'scale' },
            { key: 'item_crown',   color: '#f1c40f', shape: 'crown' },
            { key: 'acc_hat',      color: '#9b59b6', shape: 'hat' },
            { key: 'acc_mantle',   color: '#6c3483', shape: 'mantle' },
            { key: 'acc_legs',     color: '#1a5276', shape: 'legs' },
            { key: 'acc_book',     color: '#8e44ad', shape: 'book' },
            { key: 'acc_amulet',   color: '#f39c12', shape: 'amulet' },
            { key: 'acc_ring',     color: '#e67e22', shape: 'ring' }
        ];

        defs.forEach(({ key, color, shape }) => {
            this._mk(key, 16, 16, (c) => {
                c.imageSmoothingEnabled = false;
                c.fillStyle = color;
                this._drawItemShape(c, shape, color);
            });
        });
    }

    _drawNPCs() {
        const npcs = [
            { key: 'npc_elder',    bodyColor: '#8e44ad', robeColor: '#6c3483', detail: '#f1c40f' },
            { key: 'npc_merchant', bodyColor: '#d4ac0d', robeColor: '#b7950b', detail: '#e67e22' },
            { key: 'npc_miner',    bodyColor: '#7f8c8d', robeColor: '#566573', detail: '#f39c12' },
            { key: 'npc_ghost',    bodyColor: '#5dade2', robeColor: '#3498db', detail: '#ecf0f1' }
        ];

        npcs.forEach(npc => {
            this._mk(npc.key, 32, 48, (c) => {
                c.imageSmoothingEnabled = false;

                c.fillStyle = npc.bodyColor;
                c.fillRect(8, 12, 16, 20);

                c.fillStyle = npc.robeColor;
                c.fillRect(6, 14, 20, 18);
                c.fillRect(4, 20, 24, 10);

                c.fillStyle = '#f5cba7';
                c.fillRect(10, 2, 12, 10);
                c.fillRect(8, 4, 16, 8);

                c.fillStyle = '#2c3e50';
                c.fillRect(12, 6, 3, 3);
                c.fillRect(18, 6, 3, 3);

                c.fillStyle = npc.detail;
                c.fillRect(13, 0, 6, 4);
                c.fillRect(10, 0, 12, 2);

                c.fillStyle = npc.robeColor;
                c.fillRect(10, 32, 5, 14);
                c.fillRect(17, 32, 5, 14);

                c.fillStyle = '#2c3e50';
                c.fillRect(8, 44, 8, 4);
                c.fillRect(16, 44, 8, 4);

                c.fillStyle = npc.bodyColor;
                c.fillRect(2, 16, 6, 12);
                c.fillRect(24, 16, 6, 12);

                c.fillStyle = '#f5cba7';
                c.fillRect(0, 26, 6, 6);
                c.fillRect(26, 26, 6, 6);
            });
        });

        this._mk('quest_icon', 12, 12, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#f1c40f';
            c.fillRect(3, 0, 6, 10);
            c.fillRect(1, 2, 10, 6);
            c.fillStyle = '#0a0a1a';
            c.fillRect(5, 2, 2, 5);
            c.fillRect(4, 7, 4, 2);
            c.fillRect(4, 9, 2, 1);
        });
    }

    _drawItemShape(c, shape, color) {
        switch (shape) {
            case 'line':
                c.fillRect(2, 4, 2, 10);
                c.fillRect(0, 2, 6, 4);
                break;
            case 'diamond':
                c.fillRect(6, 2, 4, 4);
                c.fillRect(4, 6, 8, 4);
                c.fillRect(6, 10, 4, 4);
                break;
            case 'leaf':
                c.fillRect(4, 2, 8, 4);
                c.fillRect(2, 6, 12, 6);
                c.fillRect(6, 12, 4, 2);
                c.fillStyle = '#1e8449';
                c.fillRect(7, 4, 2, 10);
                break;
            case 'mush':
                c.fillStyle = '#fff';
                c.fillRect(4, 8, 8, 6);
                c.fillStyle = color;
                c.fillRect(2, 4, 12, 6);
                c.fillRect(4, 2, 8, 4);
                c.fillStyle = '#fff';
                c.fillRect(4, 4, 2, 2);
                c.fillRect(10, 6, 2, 2);
                break;
            case 'ore':
                c.fillRect(4, 2, 8, 12);
                c.fillStyle = '#7f8c8d';
                c.fillRect(6, 4, 4, 4);
                break;
            case 'rect':
                c.fillRect(2, 4, 12, 8);
                c.fillStyle = '#8b4513';
                c.fillRect(4, 6, 8, 4);
                break;
            case 'herb':
                c.fillRect(6, 2, 4, 12);
                c.fillRect(2, 4, 4, 4);
                c.fillRect(10, 6, 4, 4);
                c.fillStyle = '#1e8449';
                c.fillRect(3, 5, 2, 2);
                c.fillRect(11, 7, 2, 2);
                break;
            case 'gem':
                c.fillRect(6, 2, 4, 4);
                c.fillRect(4, 6, 8, 4);
                c.fillRect(6, 10, 4, 4);
                c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.3);
                c.fillRect(6, 4, 2, 2);
                break;
            case 'sword':
                c.fillRect(7, 0, 2, 12);
                c.fillRect(4, 12, 8, 2);
                c.fillRect(6, 14, 4, 2);
                c.fillStyle = '#c0392b';
                c.fillRect(5, 10, 6, 2);
                break;
            case 'scale':
                c.fillRect(3, 3, 10, 10);
                c.fillStyle = '#7d3c98';
                c.fillRect(5, 5, 6, 6);
                c.fillStyle = color;
                c.fillRect(6, 6, 4, 4);
                break;
            case 'crown':
                c.fillRect(2, 8, 12, 6);
                c.fillRect(2, 4, 2, 4);
                c.fillRect(7, 2, 2, 6);
                c.fillRect(12, 4, 2, 4);
                c.fillStyle = '#e74c3c';
                c.fillRect(3, 6, 2, 2);
                c.fillRect(7, 4, 2, 2);
                c.fillRect(11, 6, 2, 2);
                break;
            case 'hat':
                c.fillRect(2, 8, 12, 6);
                c.fillRect(4, 4, 8, 4);
                c.fillRect(6, 2, 4, 2);
                c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.3);
                c.fillRect(7, 5, 2, 2);
                break;
            case 'mantle':
                c.fillRect(2, 4, 12, 10);
                c.fillStyle = '#4a235a';
                c.fillRect(4, 6, 8, 6);
                c.fillStyle = color;
                c.fillRect(6, 8, 4, 2);
                break;
            case 'legs':
                c.fillRect(3, 2, 4, 12);
                c.fillRect(9, 2, 4, 12);
                c.fillStyle = '#154360';
                c.fillRect(4, 6, 2, 4);
                c.fillRect(10, 6, 2, 4);
                break;
            case 'book':
                c.fillRect(3, 2, 10, 12);
                c.fillStyle = '#f5f5dc';
                c.fillRect(5, 4, 6, 8);
                c.fillStyle = '#5b2c6f';
                c.fillRect(6, 5, 4, 2);
                c.fillRect(6, 8, 4, 2);
                break;
            case 'amulet':
                c.fillRect(6, 2, 4, 4);
                c.fillRect(4, 6, 8, 4);
                c.fillRect(6, 10, 4, 4);
                c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.4);
                c.fillRect(7, 7, 2, 2);
                break;
            case 'ring':
                c.fillRect(4, 6, 8, 2);
                c.fillRect(4, 10, 8, 2);
                c.fillRect(3, 7, 2, 4);
                c.fillRect(11, 7, 2, 4);
                c.fillStyle = lighten(parseInt(color.slice(1), 16), 0.4);
                c.fillRect(6, 5, 4, 2);
                c.fillRect(7, 12, 2, 1);
                break;
        }
    }

    _drawBoss() {
        this._mk('treant_boss', 64, 80, (c) => {
            c.imageSmoothingEnabled = false;
            // Roots / legs
            c.fillStyle = '#3d2b1f';
            c.fillRect(8, 68, 8, 12);
            c.fillRect(48, 68, 8, 12);
            c.fillRect(20, 70, 8, 10);
            c.fillRect(36, 70, 8, 10);
            c.fillStyle = '#2c1e14';
            c.fillRect(6, 76, 12, 4);
            c.fillRect(46, 76, 12, 4);
            c.fillRect(18, 78, 12, 2);
            c.fillRect(34, 78, 12, 2);
            // Trunk / body
            c.fillStyle = '#5c3a1e';
            c.fillRect(18, 28, 28, 42);
            c.fillStyle = '#4a2e16';
            c.fillRect(20, 30, 24, 38);
            c.fillStyle = '#6b4423';
            c.fillRect(22, 35, 4, 8);
            c.fillRect(38, 40, 4, 6);
            c.fillRect(24, 50, 3, 5);
            // Arms (branches)
            c.fillStyle = '#5c3a1e';
            c.fillRect(2, 38, 16, 6);
            c.fillRect(46, 38, 16, 6);
            c.fillStyle = '#4a2e16';
            c.fillRect(0, 40, 6, 4);
            c.fillRect(58, 40, 6, 4);
            c.fillRect(6, 34, 4, 6);
            c.fillRect(54, 34, 4, 6);
            // Hands / claws
            c.fillStyle = '#3d2b1f';
            c.fillRect(0, 36, 4, 6);
            c.fillRect(60, 36, 4, 6);
            c.fillRect(4, 32, 4, 4);
            c.fillRect(56, 32, 4, 4);
            // Crown (foliage)
            c.fillStyle = '#1a5c2a';
            c.fillRect(12, 4, 40, 26);
            c.fillStyle = '#1e6b31';
            c.fillRect(14, 2, 36, 22);
            c.fillStyle = '#155723';
            c.fillRect(8, 8, 12, 14);
            c.fillRect(44, 8, 12, 14);
            c.fillStyle = '#0f4a1c';
            c.fillRect(10, 0, 8, 10);
            c.fillRect(46, 0, 8, 10);
            c.fillRect(26, 0, 12, 6);
            // Eyes (glowing red)
            c.fillStyle = '#ff2222';
            c.fillRect(22, 18, 6, 4);
            c.fillRect(36, 18, 6, 4);
            c.fillStyle = '#ff6644';
            c.fillRect(23, 19, 2, 2);
            c.fillRect(37, 19, 2, 2);
            // Mouth
            c.fillStyle = '#1a0a00';
            c.fillRect(26, 24, 12, 3);
            c.fillStyle = '#ff2222';
            c.fillRect(28, 24, 2, 2);
            c.fillRect(34, 24, 2, 2);
        });

        this._mk('tree_hole', 64, 80, (c) => {
            c.imageSmoothingEnabled = false;
            // Outer trunk
            c.fillStyle = '#5c3a1e';
            c.fillRect(0, 0, 64, 80);
            c.fillStyle = '#4a2e16';
            c.fillRect(4, 0, 56, 80);
            // Bark lines
            c.fillStyle = '#6b4423';
            c.fillRect(8, 5, 3, 12);
            c.fillRect(50, 10, 3, 8);
            c.fillRect(10, 30, 2, 10);
            c.fillRect(52, 40, 2, 12);
            c.fillRect(14, 55, 3, 8);
            c.fillRect(46, 60, 3, 10);
            // Foliage top
            c.fillStyle = '#1a5c2a';
            c.fillRect(0, 0, 64, 16);
            c.fillStyle = '#1e6b31';
            c.fillRect(4, 0, 56, 10);
            c.fillStyle = '#155723';
            c.fillRect(10, 0, 44, 6);
            // The hole (dark)
            c.fillStyle = '#0a0500';
            c.fillRect(18, 28, 28, 36);
            c.fillStyle = '#120a02';
            c.fillRect(20, 30, 24, 32);
            // Inner glow hint
            c.fillStyle = '#1a0e05';
            c.fillRect(22, 34, 20, 24);
            // Roots at base
            c.fillStyle = '#3d2b1f';
            c.fillRect(4, 72, 12, 8);
            c.fillRect(48, 72, 12, 8);
            c.fillRect(22, 74, 8, 6);
            c.fillRect(34, 74, 8, 6);
        });

        this._mk('boss_ground', 800, 600, (c) => {
            c.fillStyle = '#0d0d1a';
            c.fillRect(0, 0, 800, 600);
            c.fillStyle = '#111122';
            for (let i = 0; i < 300; i++) {
                c.fillRect(Math.random() * 800, Math.random() * 600, 2, 2);
            }
            c.fillStyle = '#0a0a15';
            for (let i = 0; i < 100; i++) {
                c.fillRect(Math.random() * 800, Math.random() * 600, 3, 1);
            }
            c.fillStyle = '#151530';
            for (let i = 0; i < 40; i++) {
                const x = Math.random() * 800, y = Math.random() * 600;
                c.fillRect(x, y, 6, 3);
            }
            // Fog wisps
            c.fillStyle = 'rgba(80,80,120,0.08)';
            for (let i = 0; i < 20; i++) {
                const x = Math.random() * 800, y = Math.random() * 600;
                c.beginPath();
                c.ellipse(x, y, 30 + Math.random() * 40, 8 + Math.random() * 10, 0, 0, Math.PI * 2);
                c.fill();
            }
        });

        this._mk('boss_aoe', 128, 128, (c) => {
            c.strokeStyle = 'rgba(180,60,20,0.8)';
            c.lineWidth = 3;
            c.beginPath();
            c.arc(64, 64, 50, 0, Math.PI * 2);
            c.stroke();
            c.strokeStyle = 'rgba(255,80,30,0.5)';
            c.lineWidth = 2;
            c.beginPath();
            c.arc(64, 64, 35, 0, Math.PI * 2);
            c.stroke();
            c.fillStyle = 'rgba(180,40,10,0.1)';
            c.beginPath();
            c.arc(64, 64, 50, 0, Math.PI * 2);
            c.fill();
        });

        this._mk('boss_portal', 64, 80, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#3d2b1f';
            c.fillRect(0, 0, 64, 80);
            c.fillStyle = '#2c1e14';
            c.fillRect(4, 0, 56, 80);
            c.fillStyle = '#4a2e16';
            c.fillRect(8, 0, 48, 10);
            c.fillStyle = '#1a5c2a';
            c.fillRect(0, 0, 64, 8);
            c.fillStyle = '#1e6b31';
            c.fillRect(4, 0, 56, 4);
            c.fillStyle = '#3a1050';
            c.fillRect(18, 28, 28, 36);
            c.fillStyle = '#5a2080';
            c.fillRect(20, 30, 24, 32);
            c.fillStyle = '#7a30aa';
            c.fillRect(24, 36, 16, 20);
            c.fillStyle = '#aa50ee';
            c.fillRect(28, 40, 8, 12);
            c.fillStyle = '#3d2b1f';
            c.fillRect(4, 72, 12, 8);
            c.fillRect(48, 72, 12, 8);
        });
    }

    _drawMine() {
        this._mk('mine_ground', 800, 200, (c) => {
            c.fillStyle = '#1a1a1a';
            c.fillRect(0, 0, 800, 200);
            c.fillStyle = '#222222';
            for (let i = 0; i < 250; i++) {
                c.fillRect(Math.random() * 800, Math.random() * 200, 2, 2);
            }
            c.fillStyle = '#151515';
            for (let i = 0; i < 80; i++) {
                c.fillRect(Math.random() * 800, Math.random() * 200, 3, 1);
            }
            c.fillStyle = '#2a2a2a';
            for (let i = 0; i < 50; i++) {
                c.fillRect(Math.random() * 800, Math.random() * 200, 4, 2);
            }
            // Rail tracks
            c.fillStyle = '#555555';
            c.fillRect(0, 95, 800, 2);
            c.fillRect(0, 105, 800, 2);
            c.fillStyle = '#444444';
            for (let i = 0; i < 20; i++) {
                c.fillRect(i * 42, 93, 4, 16);
            }
        });

        this._mk('skeleton_warrior', 24, 28, (c) => {
            c.imageSmoothingEnabled = false;
            // Skull
            c.fillStyle = '#d4c5a9';
            c.fillRect(8, 0, 8, 8);
            c.fillRect(6, 2, 12, 4);
            // Eyes
            c.fillStyle = '#1a0a00';
            c.fillRect(8, 3, 2, 2);
            c.fillRect(13, 3, 2, 2);
            // Jaw
            c.fillStyle = '#c4b599';
            c.fillRect(8, 6, 8, 2);
            c.fillStyle = '#1a0a00';
            c.fillRect(9, 7, 1, 1);
            c.fillRect(11, 7, 1, 1);
            c.fillRect(13, 7, 1, 1);
            // Body (ribcage)
            c.fillStyle = '#d4c5a9';
            c.fillRect(9, 8, 6, 2);
            c.fillRect(8, 10, 8, 2);
            c.fillRect(9, 12, 6, 2);
            c.fillRect(8, 14, 8, 2);
            c.fillStyle = '#1a0a00';
            c.fillRect(10, 10, 1, 2);
            c.fillRect(12, 10, 1, 2);
            c.fillRect(10, 14, 1, 2);
            c.fillRect(12, 14, 1, 2);
            // Arms + shield
            c.fillStyle = '#d4c5a9';
            c.fillRect(4, 9, 4, 2);
            c.fillRect(16, 9, 4, 2);
            c.fillRect(4, 12, 2, 4);
            c.fillRect(18, 12, 2, 4);
            // Shield (left)
            c.fillStyle = '#7f8c8d';
            c.fillRect(1, 8, 6, 8);
            c.fillStyle = '#95a5a6';
            c.fillRect(2, 9, 4, 6);
            // Sword (right)
            c.fillStyle = '#bdc3c7';
            c.fillRect(19, 6, 2, 10);
            c.fillStyle = '#7f8c8d';
            c.fillRect(18, 14, 4, 2);
            // Legs
            c.fillStyle = '#d4c5a9';
            c.fillRect(8, 16, 3, 6);
            c.fillRect(13, 16, 3, 6);
            c.fillRect(8, 22, 3, 2);
            c.fillRect(13, 22, 3, 2);
            // Feet
            c.fillStyle = '#555';
            c.fillRect(7, 24, 4, 3);
            c.fillRect(13, 24, 4, 3);
            // Helmet
            c.fillStyle = '#7f8c8d';
            c.fillRect(6, 0, 12, 2);
            c.fillRect(5, 1, 14, 2);
            c.fillStyle = '#95a5a6';
            c.fillRect(7, 0, 10, 1);
        });

        this._mk('skeleton_archer', 24, 28, (c) => {
            c.imageSmoothingEnabled = false;
            // Skull
            c.fillStyle = '#d4c5a9';
            c.fillRect(8, 0, 8, 8);
            c.fillRect(6, 2, 12, 4);
            // Eyes (green glow)
            c.fillStyle = '#1a3a0a';
            c.fillRect(8, 3, 2, 2);
            c.fillRect(13, 3, 2, 2);
            // Jaw
            c.fillStyle = '#c4b599';
            c.fillRect(8, 6, 8, 2);
            // Body
            c.fillStyle = '#d4c5a9';
            c.fillRect(9, 8, 6, 2);
            c.fillRect(8, 10, 8, 2);
            c.fillRect(9, 12, 6, 2);
            c.fillRect(8, 14, 8, 2);
            c.fillStyle = '#1a0a00';
            c.fillRect(10, 10, 1, 2);
            c.fillRect(12, 10, 1, 2);
            c.fillRect(10, 14, 1, 2);
            c.fillRect(12, 14, 1, 2);
            // Arms + bow
            c.fillStyle = '#d4c5a9';
            c.fillRect(4, 9, 4, 2);
            c.fillRect(16, 9, 4, 2);
            c.fillRect(4, 11, 2, 3);
            c.fillRect(18, 11, 2, 3);
            // Bow (right hand)
            c.fillStyle = '#5a3d1a';
            c.fillRect(20, 6, 2, 14);
            c.fillRect(19, 7, 1, 12);
            c.fillStyle = '#8b6914';
            c.fillRect(21, 8, 1, 10);
            // Quiver on back
            c.fillStyle = '#5a3d1a';
            c.fillRect(5, 10, 2, 6);
            c.fillStyle = '#d4c5a9';
            c.fillRect(5, 8, 2, 3);
            c.fillRect(5, 11, 1, 2);
            c.fillRect(6, 11, 1, 2);
            // Legs
            c.fillStyle = '#d4c5a9';
            c.fillRect(8, 16, 3, 6);
            c.fillRect(13, 16, 3, 6);
            c.fillRect(8, 22, 3, 2);
            c.fillRect(13, 22, 3, 2);
            // Feet
            c.fillStyle = '#555';
            c.fillRect(7, 24, 4, 3);
            c.fillRect(13, 24, 4, 3);
            // Hood
            c.fillStyle = '#4a3728';
            c.fillRect(6, 0, 12, 3);
            c.fillRect(5, 1, 14, 3);
            c.fillRect(4, 3, 16, 2);
        });

        this._mk('skeleton_shaman', 24, 30, (c) => {
            c.imageSmoothingEnabled = false;
            // Skull (slightly larger)
            c.fillStyle = '#d4c5a9';
            c.fillRect(7, 0, 10, 8);
            c.fillRect(5, 2, 14, 4);
            // Eyes (purple glow)
            c.fillStyle = '#3a0a3a';
            c.fillRect(8, 3, 2, 2);
            c.fillRect(14, 3, 2, 2);
            // Jaw
            c.fillStyle = '#c4b599';
            c.fillRect(8, 6, 8, 2);
            // Body (robes)
            c.fillStyle = '#2d1b4e';
            c.fillRect(6, 8, 12, 10);
            c.fillStyle = '#3d2b5e';
            c.fillRect(8, 10, 8, 6);
            // Rune on chest
            c.fillStyle = '#9b59b6';
            c.fillRect(10, 11, 1, 3);
            c.fillRect(9, 12, 3, 1);
            c.fillRect(13, 11, 1, 3);
            c.fillRect(12, 12, 3, 1);
            // Arms
            c.fillStyle = '#d4c5a9';
            c.fillRect(4, 9, 3, 2);
            c.fillRect(17, 9, 3, 2);
            c.fillRect(4, 11, 2, 4);
            c.fillRect(18, 11, 2, 4);
            // Staff (left hand)
            c.fillStyle = '#5a3d1a';
            c.fillRect(1, 2, 2, 22);
            c.fillStyle = '#9b59b6';
            c.fillRect(0, 0, 4, 4);
            c.fillStyle = '#7b4aaa';
            c.fillRect(1, 1, 2, 2);
            // Legs (under robes)
            c.fillStyle = '#2d1b4e';
            c.fillRect(7, 18, 4, 6);
            c.fillRect(13, 18, 4, 6);
            // Feet
            c.fillStyle = '#3d2b1f';
            c.fillRect(6, 24, 5, 3);
            c.fillRect(13, 24, 5, 3);
            // Hood
            c.fillStyle = '#2d1b4e';
            c.fillRect(5, 0, 14, 3);
            c.fillRect(4, 1, 16, 4);
            c.fillRect(3, 3, 18, 2);
            // Glowing tip on staff
            c.fillStyle = '#bf77f6';
            c.fillRect(1, 0, 2, 2);
        });

        this._mk('skeleton_lord', 56, 72, (c) => {
            c.imageSmoothingEnabled = false;
            // Crown
            c.fillStyle = '#f1c40f';
            c.fillRect(14, 0, 28, 4);
            c.fillRect(12, 2, 4, 6);
            c.fillRect(26, 0, 4, 6);
            c.fillRect(40, 2, 4, 6);
            c.fillStyle = '#e74c3c';
            c.fillRect(15, 2, 2, 2);
            c.fillRect(27, 1, 2, 2);
            c.fillRect(41, 2, 2, 2);
            // Skull (large)
            c.fillStyle = '#d4c5a9';
            c.fillRect(14, 4, 28, 14);
            c.fillRect(12, 6, 32, 10);
            // Eyes (red glow)
            c.fillStyle = '#ff2222';
            c.fillRect(16, 8, 6, 4);
            c.fillRect(34, 8, 6, 4);
            c.fillStyle = '#ff6644';
            c.fillRect(17, 9, 2, 2);
            c.fillRect(35, 9, 2, 2);
            // Nose
            c.fillStyle = '#1a0a00';
            c.fillRect(26, 11, 4, 3);
            // Jaw / teeth
            c.fillStyle = '#c4b599';
            c.fillRect(16, 14, 24, 4);
            c.fillStyle = '#1a0a00';
            c.fillRect(18, 15, 2, 2);
            c.fillRect(22, 15, 2, 2);
            c.fillRect(26, 15, 2, 2);
            c.fillRect(30, 15, 2, 2);
            c.fillRect(34, 15, 2, 2);
            // Neck
            c.fillStyle = '#d4c5a9';
            c.fillRect(22, 18, 12, 4);
            // Armor (dark steel)
            c.fillStyle = '#4a4a5a';
            c.fillRect(10, 22, 36, 18);
            c.fillStyle = '#3a3a4a';
            c.fillRect(12, 24, 32, 14);
            c.fillStyle = '#5a5a6a';
            c.fillRect(14, 26, 28, 2);
            c.fillRect(14, 30, 28, 2);
            // Armor spikes
            c.fillStyle = '#6a6a7a';
            c.fillRect(10, 22, 4, 4);
            c.fillRect(42, 22, 4, 4);
            c.fillStyle = '#7a7a8a';
            c.fillRect(11, 22, 2, 2);
            c.fillRect(43, 22, 2, 2);
            // Dark crystal on chest
            c.fillStyle = '#9b59b6';
            c.fillRect(24, 28, 8, 6);
            c.fillStyle = '#bf77f6';
            c.fillRect(26, 29, 4, 4);
            // Arms
            c.fillStyle = '#4a4a5a';
            c.fillRect(2, 24, 8, 14);
            c.fillRect(46, 24, 8, 14);
            c.fillStyle = '#3a3a4a';
            c.fillRect(4, 26, 4, 10);
            c.fillRect(48, 26, 4, 10);
            // Hands
            c.fillStyle = '#d4c5a9';
            c.fillRect(2, 38, 6, 4);
            c.fillRect(48, 38, 6, 4);
            // Great sword (right)
            c.fillStyle = '#7f8c8d';
            c.fillRect(50, 10, 4, 30);
            c.fillStyle = '#95a5a6';
            c.fillRect(51, 12, 2, 26);
            c.fillStyle = '#bdc3c7';
            c.fillRect(51, 10, 2, 4);
            // Shield (left)
            c.fillStyle = '#4a4a5a';
            c.fillRect(0, 26, 8, 12);
            c.fillStyle = '#5a5a6a';
            c.fillRect(1, 27, 6, 10);
            c.fillStyle = '#f1c40f';
            c.fillRect(3, 30, 2, 4);
            // Legs
            c.fillStyle = '#4a4a5a';
            c.fillRect(14, 40, 8, 16);
            c.fillRect(34, 40, 8, 16);
            c.fillStyle = '#3a3a4a';
            c.fillRect(16, 42, 4, 12);
            c.fillRect(36, 42, 4, 12);
            // Boots
            c.fillStyle = '#2a2a3a';
            c.fillRect(12, 54, 10, 8);
            c.fillRect(34, 54, 10, 8);
            c.fillStyle = '#3a3a4a';
            c.fillRect(13, 54, 8, 2);
            c.fillRect(35, 54, 8, 2);
            // Cape
            c.fillStyle = '#2d1b4e';
            c.fillRect(12, 22, 4, 34);
            c.fillRect(40, 22, 4, 34);
            c.fillStyle = '#3d2b5e';
            c.fillRect(14, 24, 2, 30);
            c.fillRect(42, 24, 2, 30);
        });

        this._mk('mine_rock', 32, 28, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#3a3a3a';
            c.fillRect(4, 8, 24, 16);
            c.fillRect(8, 4, 16, 20);
            c.fillRect(6, 6, 20, 18);
            c.fillStyle = '#4a4a4a';
            c.fillRect(8, 6, 16, 14);
            c.fillStyle = '#555555';
            c.fillRect(10, 8, 4, 4);
            c.fillRect(18, 10, 3, 3);
            c.fillStyle = '#2a2a2a';
            c.fillRect(6, 20, 20, 4);
            c.fillRect(4, 22, 24, 4);
        });

        this._mk('mine_rails', 800, 12, (c) => {
            c.fillStyle = '#555555';
            c.fillRect(0, 2, 800, 2);
            c.fillRect(0, 8, 800, 2);
            c.fillStyle = '#444444';
            for (let i = 0; i < 20; i++) {
                c.fillRect(i * 42, 0, 4, 12);
            }
        });

        this._mk('mine_crystal', 16, 20, (c) => {
            c.fillStyle = '#9b59b6';
            c.fillRect(6, 0, 4, 4);
            c.fillRect(4, 4, 8, 4);
            c.fillRect(2, 8, 12, 4);
            c.fillRect(4, 12, 8, 4);
            c.fillRect(6, 16, 4, 4);
            c.fillStyle = '#bf77f6';
            c.fillRect(6, 2, 4, 2);
            c.fillRect(4, 6, 2, 2);
            c.fillRect(8, 6, 2, 2);
            c.fillStyle = '#7b4aaa';
            c.fillRect(4, 10, 8, 2);
        });

        this._mk('mine_ladder', 32, 60, (c) => {
            c.fillStyle = '#5a3d1a';
            c.fillRect(4, 0, 4, 60);
            c.fillRect(24, 0, 4, 60);
            c.fillStyle = '#8b6914';
            c.fillRect(4, 6, 24, 3);
            c.fillRect(4, 16, 24, 3);
            c.fillRect(4, 26, 24, 3);
            c.fillRect(4, 36, 24, 3);
            c.fillRect(4, 46, 24, 3);
        });

        this._mk('skeleton_lord_aoe', 128, 128, (c) => {
            c.strokeStyle = 'rgba(100,50,150,0.8)';
            c.lineWidth = 3;
            c.beginPath();
            c.arc(64, 64, 50, 0, Math.PI * 2);
            c.stroke();
            c.strokeStyle = 'rgba(150,70,200,0.5)';
            c.lineWidth = 2;
            c.beginPath();
            c.arc(64, 64, 35, 0, Math.PI * 2);
            c.stroke();
            c.fillStyle = 'rgba(100,30,130,0.12)';
            c.beginPath();
            c.arc(64, 64, 50, 0, Math.PI * 2);
            c.fill();
        });

        this._mk('mine_chest', 28, 24, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#5a3d1a';
            c.fillRect(2, 8, 24, 14);
            c.fillStyle = '#8b6914';
            c.fillRect(4, 6, 20, 4);
            c.fillStyle = '#4a2d10';
            c.fillRect(4, 12, 20, 8);
            c.fillStyle = '#f1c40f';
            c.fillRect(12, 10, 4, 4);
            c.fillStyle = '#e67e22';
            c.fillRect(13, 11, 2, 2);
            c.fillStyle = '#6b4423';
            c.fillRect(2, 8, 24, 2);
            c.fillRect(2, 20, 24, 2);
        });

        this._mk('mine_chest_open', 28, 20, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#5a3d1a';
            c.fillRect(2, 6, 24, 12);
            c.fillStyle = '#8b6914';
            c.fillRect(4, 4, 20, 4);
            c.fillStyle = '#4a2d10';
            c.fillRect(4, 8, 20, 8);
            c.fillStyle = '#f1c40f';
            c.fillRect(12, 8, 4, 2);
            c.fillStyle = '#3d2b1f';
            c.fillRect(4, 2, 20, 4);
            c.fillStyle = '#5a3d1a';
            c.fillRect(6, 0, 16, 4);
            c.fillStyle = '#2a1a0a';
            c.fillRect(6, 10, 16, 4);
        });

        this._mk('mine_chest_broken', 28, 24, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#3d2b1f';
            c.fillRect(2, 10, 12, 12);
            c.fillRect(14, 12, 10, 10);
            c.fillStyle = '#5a3d1a';
            c.fillRect(4, 8, 8, 4);
            c.fillRect(16, 10, 6, 4);
            c.fillStyle = '#2a1a0a';
            c.fillRect(6, 14, 4, 6);
        });

        this._mk('mine_boss_portal', 48, 64, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#2a2a2a';
            c.fillRect(4, 0, 40, 64);
            c.fillStyle = '#3a3a3a';
            c.fillRect(8, 0, 32, 64);
            c.fillStyle = '#1a1a1a';
            c.fillRect(12, 20, 24, 36);
            c.fillStyle = '#2d1b4e';
            c.fillRect(14, 22, 20, 32);
            c.fillStyle = '#4a2080';
            c.fillRect(16, 26, 16, 24);
            c.fillStyle = '#7a30aa';
            c.fillRect(20, 30, 8, 16);
            c.fillStyle = '#3a3a3a';
            c.fillRect(0, 0, 8, 10);
            c.fillRect(40, 0, 8, 10);
            c.fillStyle = '#4a4a4a';
            c.fillRect(2, 2, 4, 6);
            c.fillRect(42, 2, 4, 6);
        });

        this._mk('torch', 12, 24, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#5a3d1a';
            c.fillRect(4, 8, 4, 16);
            c.fillStyle = '#4a2d10';
            c.fillRect(5, 10, 2, 14);
            c.fillStyle = '#e67e22';
            c.fillRect(3, 2, 6, 8);
            c.fillRect(2, 4, 8, 4);
            c.fillStyle = '#f39c12';
            c.fillRect(4, 0, 4, 6);
            c.fillRect(3, 2, 6, 4);
            c.fillStyle = '#f1c40f';
            c.fillRect(4, 1, 4, 3);
            c.fillStyle = '#fff3e0';
            c.fillRect(5, 1, 2, 2);
        });

        this._mk('torch_glow', 128, 128, (c) => {
            const grd = c.createRadialGradient(64, 64, 0, 64, 64, 64);
            grd.addColorStop(0, 'rgba(255,160,50,0.35)');
            grd.addColorStop(0.3, 'rgba(255,120,20,0.18)');
            grd.addColorStop(0.6, 'rgba(255,80,10,0.06)');
            grd.addColorStop(1, 'rgba(0,0,0,0)');
            c.fillStyle = grd;
            c.fillRect(0, 0, 128, 128);
        });

        this._mk('mine_darkness', 800, 900, (c) => {
            c.fillStyle = 'rgba(0,0,0,0.55)';
            c.fillRect(0, 0, 800, 900);
            for (let i = 0; i < 100; i++) {
                c.fillStyle = `rgba(0,0,0,${0.3 + Math.random() * 0.4})`;
                c.fillRect(Math.random() * 800, Math.random() * 900, 4 + Math.random() * 8, 2 + Math.random() * 4);
            }
        });

        this._mk('fireball', 14, 14, (c) => {
            c.imageSmoothingEnabled = false;
            const grd = c.createRadialGradient(7, 7, 0, 7, 7, 7);
            grd.addColorStop(0, '#fff8e1');
            grd.addColorStop(0.2, '#ff9800');
            grd.addColorStop(0.5, '#f44336');
            grd.addColorStop(0.8, '#b71c1c');
            grd.addColorStop(1, 'rgba(100,0,0,0)');
            c.fillStyle = grd;
            c.fillRect(0, 0, 14, 14);
        });

        this._mk('acid_flask', 12, 16, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#555';
            c.fillRect(4, 0, 4, 3);
            c.fillStyle = '#444';
            c.fillRect(3, 3, 6, 2);
            c.fillStyle = '#2ecc71';
            c.fillRect(2, 5, 8, 10);
            c.fillStyle = '#27ae60';
            c.fillRect(3, 6, 6, 8);
            c.fillStyle = '#1abc9c';
            c.fillRect(4, 8, 4, 4);
        });

        this._mk('soul_strike', 12, 12, (c) => {
            c.imageSmoothingEnabled = false;
            const grd = c.createRadialGradient(6, 6, 0, 6, 6, 6);
            grd.addColorStop(0, '#ffffff');
            grd.addColorStop(0.3, '#ecf0f1');
            grd.addColorStop(0.6, '#bdc3c7');
            grd.addColorStop(1, 'rgba(189,195,199,0)');
            c.fillStyle = grd;
            c.fillRect(0, 0, 12, 12);
        });

        this._mk('shield_vfx', 48, 48, (c) => {
            c.imageSmoothingEnabled = false;
            c.strokeStyle = 'rgba(52,152,219,0.8)';
            c.lineWidth = 3;
            c.beginPath();
            c.arc(24, 24, 20, 0, Math.PI * 2);
            c.stroke();
            c.strokeStyle = 'rgba(100,180,255,0.4)';
            c.lineWidth = 2;
            c.beginPath();
            c.arc(24, 24, 16, 0, Math.PI * 2);
            c.stroke();
        });

        this._mk('heal_vfx', 32, 32, (c) => {
            c.imageSmoothingEnabled = false;
            const grd = c.createRadialGradient(16, 16, 0, 16, 16, 16);
            grd.addColorStop(0, 'rgba(46,204,113,0.7)');
            grd.addColorStop(0.5, 'rgba(46,204,113,0.3)');
            grd.addColorStop(1, 'rgba(46,204,113,0)');
            c.fillStyle = grd;
            c.fillRect(0, 0, 32, 32);
        });
    }

    _drawSnowyVillage() {
        // Snow ground — 64x64 tile for village (white/blue tones)
        this._mk('snow_ground', 64, 64, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#c8d8e8';
            c.fillRect(0, 0, 64, 64);
            c.fillStyle = '#b0c4d8';
            for (let i = 0; i < 40; i++) {
                c.fillRect(Math.random() * 64, Math.random() * 64, 3, 2);
            }
            c.fillStyle = '#dde8f0';
            for (let i = 0; i < 20; i++) {
                c.fillRect(Math.random() * 64, Math.random() * 64, 2, 3);
            }
            c.fillStyle = '#a0b8cc';
            for (let i = 0; i < 15; i++) {
                c.fillRect(Math.random() * 64, Math.random() * 64, 4, 1);
            }
        });

        // Snow house — 60x50, wooden house with snow on roof
        this._mk('snow_house', 60, 50, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#5c3a1e';
            c.fillRect(5, 18, 50, 30);
            c.fillStyle = '#7a4f2e';
            c.fillRect(8, 20, 44, 26);
            c.fillStyle = '#8b4513';
            c.beginPath();
            c.moveTo(0, 18);
            c.lineTo(30, 0);
            c.lineTo(60, 18);
            c.fill();
            // Snow on roof
            c.fillStyle = '#e8f0f8';
            c.fillRect(2, 16, 56, 4);
            c.fillRect(8, 12, 44, 4);
            c.fillRect(14, 8, 32, 4);
            c.fillRect(20, 4, 20, 4);
            c.fillStyle = '#ffffff';
            c.fillRect(4, 14, 52, 2);
            c.fillRect(10, 10, 40, 2);
            c.fillRect(16, 6, 28, 2);
            // Windows and door
            c.fillStyle = '#4a2a10';
            c.fillRect(24, 32, 12, 16);
            c.fillStyle = '#88ccff';
            c.fillRect(10, 24, 10, 10);
            c.fillRect(40, 24, 10, 10);
            c.fillStyle = '#aaddff';
            c.fillRect(12, 26, 6, 6);
            c.fillRect(42, 26, 6, 6);
        });

        // Snowy barrel (chest) — 18x22
        this._mk('snowy_barrel', 18, 22, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#6b4a2a';
            c.fillRect(3, 4, 12, 16);
            c.fillStyle = '#8b6a3a';
            c.fillRect(4, 5, 10, 14);
            c.fillStyle = '#555';
            c.fillRect(2, 8, 14, 2);
            c.fillRect(2, 14, 14, 2);
            // Snow on top
            c.fillStyle = '#e8f0f8';
            c.fillRect(2, 2, 14, 4);
            c.fillStyle = '#fff';
            c.fillRect(4, 1, 10, 2);
        });

        this._mk('snowy_barrel_open', 18, 22, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#6b4a2a';
            c.fillRect(3, 6, 12, 14);
            c.fillStyle = '#8b6a3a';
            c.fillRect(4, 7, 10, 12);
            c.fillStyle = '#555';
            c.fillRect(2, 10, 14, 2);
            c.fillRect(2, 15, 14, 2);
            c.fillStyle = '#4a3a20';
            c.fillRect(3, 6, 12, 2);
        });

        // Campfire — 24x30, inactive (icy)
        this._mk('campfire', 24, 30, (c) => {
            c.imageSmoothingEnabled = false;
            // Stones
            c.fillStyle = '#666';
            c.fillRect(2, 22, 20, 8);
            c.fillStyle = '#888';
            c.fillRect(4, 20, 16, 4);
            // Logs
            c.fillStyle = '#5c3a1e';
            c.fillRect(6, 16, 12, 6);
            c.fillRect(8, 14, 8, 4);
            // Ice on top
            c.fillStyle = '#a0d0f0';
            c.fillRect(8, 10, 8, 6);
            c.fillStyle = '#c0e0ff';
            c.fillRect(10, 8, 4, 4);
        });

        // Campfire active — 24x30, burning
        this._mk('campfire_active', 24, 30, (c) => {
            c.imageSmoothingEnabled = false;
            // Stones
            c.fillStyle = '#666';
            c.fillRect(2, 22, 20, 8);
            c.fillStyle = '#888';
            c.fillRect(4, 20, 16, 4);
            // Logs
            c.fillStyle = '#5c3a1e';
            c.fillRect(6, 16, 12, 6);
            c.fillRect(8, 14, 8, 4);
            // Flames
            c.fillStyle = '#ff4400';
            c.fillRect(8, 6, 8, 10);
            c.fillStyle = '#ff8800';
            c.fillRect(9, 4, 6, 8);
            c.fillStyle = '#ffcc00';
            c.fillRect(10, 2, 4, 6);
            c.fillStyle = '#ffff88';
            c.fillRect(11, 0, 2, 4);
        });

        // Warmth Core item — 14x14
        this._mk('warmth_core', 14, 14, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#ff6600';
            c.beginPath();
            c.arc(7, 7, 6, 0, Math.PI * 2);
            c.fill();
            c.fillStyle = '#ffaa00';
            c.beginPath();
            c.arc(7, 7, 4, 0, Math.PI * 2);
            c.fill();
            c.fillStyle = '#ffdd44';
            c.beginPath();
            c.arc(7, 7, 2, 0, Math.PI * 2);
            c.fill();
        });

        // Ice Shard minion — 10x12
        this._mk('ice_shard', 10, 12, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#80c0e0';
            c.fillRect(2, 0, 6, 12);
            c.fillStyle = '#a0d8f0';
            c.fillRect(3, 1, 4, 10);
            c.fillStyle = '#c0eaff';
            c.fillRect(4, 2, 2, 8);
        });

        // Ice Shard walk spritesheet (4 frames)
        (() => {
            const fw = 10, fh = 12, frames = 4;
            const canvas = document.createElement('canvas');
            canvas.width = fw * frames;
            canvas.height = fh;
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = false;
            for (let f = 0; f < frames; f++) {
                const ox = f * fw;
                const wUp = f % 2 === 0;
                ctx.fillStyle = '#80c0e0';
                ctx.fillRect(ox + 2, wUp ? 0 : 1, 6, 11);
                ctx.fillStyle = '#a0d8f0';
                ctx.fillRect(ox + 3, wUp ? 1 : 2, 4, 9);
                ctx.fillStyle = '#c0eaff';
                ctx.fillRect(ox + 4, wUp ? 2 : 3, 2, 7);
            }
            this.textures.addSpriteSheet('ice_shard_walk', canvas, { frameWidth: fw, frameHeight: fh });
        })();

        // Frost Wave VFX — 24x24
        this._mk('frost_wave_vfx', 24, 24, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#4488cc';
            c.beginPath();
            c.arc(12, 12, 10, 0, Math.PI * 2);
            c.fill();
            c.fillStyle = '#66aaee';
            c.beginPath();
            c.arc(12, 12, 6, 0, Math.PI * 2);
            c.fill();
            c.fillStyle = '#88ccff';
            c.beginPath();
            c.arc(12, 12, 3, 0, Math.PI * 2);
            c.fill();
        });

        // Blizzard VFX — 32x32
        this._mk('blizzard_vfx', 32, 32, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = 'rgba(100,180,255,0.3)';
            c.beginPath();
            c.arc(16, 16, 14, 0, Math.PI * 2);
            c.fill();
            c.fillStyle = 'rgba(150,210,255,0.4)';
            c.beginPath();
            c.arc(16, 16, 10, 0, Math.PI * 2);
            c.fill();
            c.fillStyle = 'rgba(200,230,255,0.5)';
            c.beginPath();
            c.arc(16, 16, 5, 0, Math.PI * 2);
            c.fill();
        });

        // Winter enemy spritesheets — 5 types
        const winterEnemyDefs = [
            { key: 'ice_golem',    w: 22, bh: 24, body: '#4488aa', head: '#5599bb', detail: '#336688', eyes: '#00ffff' },
            { key: 'frost_wraith', w: 14, bh: 16, body: '#334466', head: '#445577', detail: '#223355', eyes: '#88ccff' },
            { key: 'snow_wolf',    w: 18, bh: 16, body: '#ccdde8', head: '#ddeeff', detail: '#aabbcc', eyes: '#4488cc' },
            { key: 'ice_elemental', w: 14, bh: 18, body: '#2266aa', head: '#3377bb', detail: '#115599', eyes: '#00ddff' },
            { key: 'frost_mage',   w: 14, bh: 18, body: '#2a3a5a', head: '#3a4a6a', detail: '#1a2a4a', eyes: '#88ccff' }
        ];

        winterEnemyDefs.forEach(def => {
            (() => {
                const fw = def.w, fh = def.bh, frames = 4;
                const canvas = document.createElement('canvas');
                canvas.width = fw * frames;
                canvas.height = fh;
                const ctx = canvas.getContext('2d');
                ctx.imageSmoothingEnabled = false;
                for (let f = 0; f < frames; f++) {
                    const ox = f * fw;
                    const wUp = f % 2 === 0;
                    ctx.fillStyle = def.body;
                    ctx.fillRect(ox + 3, wUp ? 4 : 5, fw - 6, fh - 8);
                    ctx.fillStyle = def.head;
                    ctx.fillRect(ox + 4, wUp ? 1 : 2, fw - 8, 6);
                    ctx.fillStyle = def.eyes;
                    ctx.fillRect(ox + 5, wUp ? 2 : 3, 2, 2);
                    ctx.fillRect(ox + fw - 7, wUp ? 2 : 3, 2, 2);
                    ctx.fillStyle = def.detail;
                    ctx.fillRect(ox + 2, wUp ? 2 : 3, 3, 4);
                    ctx.fillRect(ox + fw - 5, wUp ? 2 : 3, 3, 4);
                    ctx.fillStyle = def.body;
                    ctx.fillRect(ox + 4, fh - 4, 3, 4);
                    ctx.fillRect(ox + fw - 7, fh - 4, 3, 4);
                }
                this.textures.addSpriteSheet(def.key + '_walk', canvas, { frameWidth: fw, frameHeight: fh });
            })();
            this._mk(def.key, def.w, def.bh, (c) => {
                c.imageSmoothingEnabled = false;
                c.fillStyle = def.body;
                c.fillRect(3, 4, def.w - 6, def.bh - 8);
                c.fillStyle = def.head;
                c.fillRect(4, 1, def.w - 8, 6);
                c.fillStyle = def.eyes;
                c.fillRect(5, 2, 2, 2);
                c.fillRect(def.w - 7, 2, 2, 2);
                c.fillStyle = def.detail;
                c.fillRect(2, 2, 3, 4);
                c.fillRect(def.w - 5, 2, 3, 4);
            });
        });

        // Ice Spirit boss — 40x44 spritesheet
        (() => {
            const fw = 40, fh = 44, frames = 4;
            const canvas = document.createElement('canvas');
            canvas.width = fw * frames;
            canvas.height = fh;
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = false;
            for (let f = 0; f < frames; f++) {
                const ox = f * fw;
                const wUp = f % 2 === 0;
                // Body
                ctx.fillStyle = '#2266aa';
                ctx.fillRect(ox + 10, wUp ? 12 : 14, 20, 24);
                ctx.fillStyle = '#3388cc';
                ctx.fillRect(ox + 12, wUp ? 14 : 16, 16, 20);
                // Head
                ctx.fillStyle = '#44aaee';
                ctx.fillRect(ox + 12, wUp ? 2 : 4, 16, 12);
                ctx.fillStyle = '#66ccff';
                ctx.fillRect(ox + 14, wUp ? 4 : 6, 12, 8);
                // Eyes
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(ox + 15, wUp ? 5 : 6, 4, 4);
                ctx.fillRect(ox + 23, wUp ? 5 : 6, 4, 4);
                ctx.fillStyle = '#00aaff';
                ctx.fillRect(ox + 16, wUp ? 6 : 7, 2, 2);
                ctx.fillRect(ox + 24, wUp ? 6 : 7, 2, 2);
                // Crown/icicles
                ctx.fillStyle = '#88ddff';
                ctx.fillRect(ox + 14, wUp ? 0 : 1, 3, 4);
                ctx.fillRect(ox + 19, wUp ? 0 : 1, 2, 3);
                ctx.fillRect(ox + 23, wUp ? 0 : 1, 3, 4);
                // Arms
                ctx.fillStyle = '#2266aa';
                ctx.fillRect(ox + 4, wUp ? 16 : 18, 6, 18);
                ctx.fillRect(ox + 30, wUp ? 16 : 18, 6, 18);
                // Hands
                ctx.fillStyle = '#44aaee';
                ctx.fillRect(ox + 2, wUp ? 18 : 20, 4, 10);
                ctx.fillRect(ox + 34, wUp ? 18 : 20, 4, 10);
                // Legs
                ctx.fillStyle = '#115599';
                ctx.fillRect(ox + 14, fh - 6, 5, 6);
                ctx.fillRect(ox + 21, fh - 6, 5, 6);
            }
            this.textures.addSpriteSheet('ice_spirit_walk', canvas, { frameWidth: fw, frameHeight: fh });
        })();

        // Ice Spirit static
        this._mk('ice_spirit', 40, 44, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#2266aa';
            c.fillRect(10, 12, 20, 24);
            c.fillStyle = '#3388cc';
            c.fillRect(12, 14, 16, 20);
            c.fillStyle = '#44aaee';
            c.fillRect(12, 2, 16, 12);
            c.fillStyle = '#66ccff';
            c.fillRect(14, 4, 12, 8);
            c.fillStyle = '#ffffff';
            c.fillRect(15, 5, 4, 4);
            c.fillRect(23, 5, 4, 4);
            c.fillStyle = '#00aaff';
            c.fillRect(16, 6, 2, 2);
            c.fillRect(24, 6, 2, 2);
            c.fillStyle = '#88ddff';
            c.fillRect(14, 0, 3, 4);
            c.fillRect(19, 0, 2, 3);
            c.fillRect(23, 0, 3, 4);
            c.fillStyle = '#2266aa';
            c.fillRect(4, 16, 6, 18);
            c.fillRect(30, 16, 6, 18);
            c.fillStyle = '#44aaee';
            c.fillRect(2, 18, 4, 10);
            c.fillRect(34, 18, 4, 10);
            c.fillStyle = '#115599';
            c.fillRect(14, 38, 5, 6);
            c.fillRect(21, 38, 5, 6);
        });
    }

    _generateAnimations() {
        this._genSageWalk();
        this._genSageAttack();
        this._genAlchemistWalk();
        this._genAlchemistAttack();
        this._genAngelWalk();
        this._genAngelAttack();
        this._genGoblinWalk();
        this._genGoblinAttack();
        this._genSlimeWalk();
        this._genRatWalk();
        this._genSkeletonWalk();
        this._genSkeletonAttack();
        this._genSkeletonArcherWalk();
        this._genSkeletonShamanWalk();
        this._genTreantWalk();
        this._genSkeletonLordWalk();
        this._genSkeletonLordAttack();
    }

    _genSageWalk() {
        const fw = 32, fh = 48, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const legPhase = f % 4;
            const bob = (f === 1 || f === 3) ? -1 : 0;

            // Hat
            c.fillStyle = '#2d1b4e';
            c.fillRect(ox + 10, bob + 0, 12, 4);
            c.fillRect(ox + 8, bob + 4, 16, 4);
            c.fillRect(ox + 6, bob + 8, 20, 4);
            c.fillStyle = '#3d2b5e';
            c.fillRect(ox + 4, bob + 12, 24, 2);
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 14, bob + 1, 4, 2);

            // Face
            c.fillStyle = '#d5c4a1';
            c.fillRect(ox + 10, bob + 14, 12, 8);
            c.fillStyle = '#7b68ee';
            c.fillRect(ox + 12, bob + 16, 2, 2);
            c.fillRect(ox + 18, bob + 16, 2, 2);

            // Beard
            c.fillStyle = '#9e9e9e';
            c.fillRect(ox + 12, bob + 20, 8, 4);
            c.fillRect(ox + 10, bob + 22, 12, 4);
            c.fillRect(ox + 12, bob + 26, 8, 2);

            // Robe
            c.fillStyle = '#2d1b4e';
            c.fillRect(ox + 6, bob + 14, 20, 16);
            c.fillStyle = '#3d2b5e';
            c.fillRect(ox + 8, bob + 16, 16, 12);
            c.fillStyle = '#6a3d9a';
            c.fillRect(ox + 6, bob + 28, 20, 2);

            // Arms
            c.fillStyle = '#2d1b4e';
            c.fillRect(ox + 2, bob + 16, 4, 12);
            c.fillRect(ox + 26, bob + 16, 4, 12);
            c.fillStyle = '#d5c4a1';
            c.fillRect(ox + 2, bob + 28, 4, 4);
            c.fillRect(ox + 26, bob + 28, 4, 4);

            // Book
            c.fillStyle = '#5a3d1a';
            c.fillRect(ox + 0, bob + 26, 6, 8);
            c.fillStyle = '#f5f5dc';
            c.fillRect(ox + 1, bob + 27, 4, 6);

            // Staff
            c.fillStyle = '#8b6914';
            c.fillRect(ox + 28, bob + 10, 2, 28);
            c.fillStyle = '#6a3d9a';
            c.fillRect(ox + 27, bob + 8, 4, 4);

            // Legs with walk cycle
            c.fillStyle = '#1a0e2e';
            if (legPhase === 0) {
                c.fillRect(ox + 10, 30, 5, 10);
                c.fillRect(ox + 17, 30, 5, 10);
            } else if (legPhase === 1) {
                c.fillRect(ox + 9, 30, 5, 10);
                c.fillRect(ox + 18, 30, 5, 10);
            } else if (legPhase === 2) {
                c.fillRect(ox + 10, 30, 5, 10);
                c.fillRect(ox + 17, 30, 5, 10);
            } else {
                c.fillRect(ox + 11, 30, 5, 10);
                c.fillRect(ox + 16, 30, 5, 10);
            }

            // Boots
            c.fillStyle = '#3d2b1f';
            c.fillRect(ox + 9, 38, 6, 6);
            c.fillRect(ox + 17, 38, 6, 6);

            // Robe stripes
            c.fillStyle = '#ecf0f1';
            c.fillRect(ox + 10, 18, 12, 2);
            c.fillRect(ox + 10, 22, 12, 2);
        }

        const tex = this.textures.addSpriteSheet('player_sage_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    _genSageAttack() {
        const fw = 40, fh = 48, frames = 3;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;

            // Hat
            c.fillStyle = '#2d1b4e';
            c.fillRect(ox + 14, 0, 12, 4);
            c.fillRect(ox + 12, 4, 16, 4);
            c.fillRect(ox + 10, 8, 20, 4);
            c.fillStyle = '#3d2b5e';
            c.fillRect(ox + 8, 12, 24, 2);
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 18, 1, 4, 2);

            // Face
            c.fillStyle = '#d5c4a1';
            c.fillRect(ox + 14, 14, 12, 8);
            c.fillStyle = '#7b68ee';
            c.fillRect(ox + 16, 16, 2, 2);
            c.fillRect(ox + 22, 16, 2, 2);

            // Beard
            c.fillStyle = '#9e9e9e';
            c.fillRect(ox + 16, 20, 8, 4);
            c.fillRect(ox + 14, 22, 12, 4);
            c.fillRect(ox + 16, 26, 8, 2);

            // Robe
            c.fillStyle = '#2d1b4e';
            c.fillRect(ox + 10, 14, 20, 16);
            c.fillStyle = '#3d2b5e';
            c.fillRect(ox + 12, 16, 16, 12);
            c.fillStyle = '#6a3d9a';
            c.fillRect(ox + 10, 28, 20, 2);

            // Attack arm animation
            c.fillStyle = '#2d1b4e';
            c.fillRect(ox + 6, 16, 4, 12);
            c.fillStyle = '#d5c4a1';
            c.fillRect(ox + 6, 28, 4, 4);

            // Right arm swings based on frame
            c.fillStyle = '#2d1b4e';
            if (f === 0) {
                c.fillRect(ox + 30, 14, 4, 12);
                c.fillStyle = '#d5c4a1';
                c.fillRect(ox + 30, 26, 4, 4);
                // Staff pointing up
                c.fillStyle = '#8b6914';
                c.fillRect(ox + 32, 4, 2, 22);
                c.fillStyle = '#6a3d9a';
                c.fillRect(ox + 31, 2, 4, 4);
            } else if (f === 1) {
                c.fillRect(ox + 30, 18, 4, 12);
                c.fillStyle = '#d5c4a1';
                c.fillRect(ox + 30, 28, 4, 4);
                // Staff swung forward
                c.fillStyle = '#8b6914';
                c.fillRect(ox + 32, 14, 18, 3);
                c.fillStyle = '#6a3d9a';
                c.fillRect(ox + 48, 12, 4, 4);
            } else {
                c.fillRect(ox + 30, 20, 4, 10);
                c.fillStyle = '#d5c4a1';
                c.fillRect(ox + 30, 28, 4, 4);
                // Staff pointing down
                c.fillStyle = '#8b6914';
                c.fillRect(ox + 32, 20, 2, 18);
                c.fillStyle = '#6a3d9a';
                c.fillRect(ox + 31, 36, 4, 4);
            }

            // Book in left hand
            c.fillStyle = '#5a3d1a';
            c.fillRect(ox + 4, 26, 6, 8);
            c.fillStyle = '#f5f5dc';
            c.fillRect(ox + 5, 27, 4, 6);

            // Legs
            c.fillStyle = '#1a0e2e';
            c.fillRect(ox + 14, 30, 5, 10);
            c.fillRect(ox + 21, 30, 5, 10);
            c.fillStyle = '#3d2b1f';
            c.fillRect(ox + 13, 38, 6, 6);
            c.fillRect(ox + 21, 38, 6, 6);
        }

        this.textures.addSpriteSheet('player_sage_attack', canvas, { frameWidth: fw, frameHeight: fh });
    }

    _genAlchemistWalk() {
        const fw = 32, fh = 48, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const legPhase = f % 4;
            const bob = (f === 1 || f === 3) ? -1 : 0;

            // Hat
            c.fillStyle = '#5a3d1a';
            c.fillRect(ox + 8, bob + 0, 16, 4);
            c.fillRect(ox + 6, bob + 4, 20, 4);
            c.fillRect(ox + 4, bob + 8, 24, 4);
            c.fillStyle = '#6b4423';
            c.fillRect(ox + 2, bob + 12, 28, 2);

            // Goggles
            c.fillStyle = '#f39c12';
            c.fillRect(ox + 10, bob + 14, 5, 4);
            c.fillRect(ox + 17, bob + 14, 5, 4);
            c.fillStyle = '#2c3e50';
            c.fillRect(ox + 11, bob + 15, 3, 2);
            c.fillRect(ox + 18, bob + 15, 3, 2);

            // Face
            c.fillStyle = '#c4956a';
            c.fillRect(ox + 10, bob + 14, 12, 8);

            // Beard
            c.fillStyle = '#6b4423';
            c.fillRect(ox + 10, bob + 20, 12, 4);
            c.fillRect(ox + 8, bob + 22, 16, 4);
            c.fillRect(ox + 10, bob + 26, 12, 2);

            // Coat
            c.fillStyle = '#5a3d1a';
            c.fillRect(ox + 6, bob + 14, 20, 16);
            c.fillStyle = '#6b4423';
            c.fillRect(ox + 8, bob + 16, 16, 12);
            c.fillStyle = '#8b6914';
            c.fillRect(ox + 6, bob + 28, 20, 2);

            // Belt
            c.fillStyle = '#3d2b1f';
            c.fillRect(ox + 6, bob + 26, 20, 2);

            // Arms
            c.fillStyle = '#5a3d1a';
            c.fillRect(ox + 2, bob + 16, 4, 12);
            c.fillRect(ox + 26, bob + 16, 4, 12);
            c.fillStyle = '#c4956a';
            c.fillRect(ox + 2, bob + 28, 4, 4);
            c.fillRect(ox + 26, bob + 28, 4, 4);

            // Flask
            c.fillStyle = '#27ae60';
            c.fillRect(ox + 0, bob + 24, 6, 8);
            c.fillStyle = '#2ecc71';
            c.fillRect(ox + 1, bob + 25, 4, 5);

            // Legs with walk cycle
            c.fillStyle = '#3d2b1f';
            if (legPhase === 0) {
                c.fillRect(ox + 10, 30, 5, 10);
                c.fillRect(ox + 17, 30, 5, 10);
            } else if (legPhase === 1) {
                c.fillRect(ox + 9, 30, 5, 10);
                c.fillRect(ox + 18, 30, 5, 10);
            } else if (legPhase === 2) {
                c.fillRect(ox + 10, 30, 5, 10);
                c.fillRect(ox + 17, 30, 5, 10);
            } else {
                c.fillRect(ox + 11, 30, 5, 10);
                c.fillRect(ox + 16, 30, 5, 10);
            }

            c.fillStyle = '#2c1e14';
            c.fillRect(ox + 9, 38, 6, 6);
            c.fillRect(ox + 17, 38, 6, 6);

            // Vials
            c.fillStyle = '#e74c3c';
            c.fillRect(ox + 26, 22, 3, 5);
        }

        this.textures.addSpriteSheet('player_alchemist_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    _genAlchemistAttack() {
        const fw = 40, fh = 48, frames = 3;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;

            // Hat
            c.fillStyle = '#5a3d1a';
            c.fillRect(ox + 12, 0, 16, 4);
            c.fillRect(ox + 10, 4, 20, 4);
            c.fillRect(ox + 8, 8, 24, 4);
            c.fillStyle = '#6b4423';
            c.fillRect(ox + 6, 12, 28, 2);

            // Goggles
            c.fillStyle = '#f39c12';
            c.fillRect(ox + 14, 14, 5, 4);
            c.fillRect(ox + 21, 14, 5, 4);
            c.fillStyle = '#2c3e50';
            c.fillRect(ox + 15, 15, 3, 2);
            c.fillRect(ox + 22, 15, 3, 2);

            // Face
            c.fillStyle = '#c4956a';
            c.fillRect(ox + 14, 14, 12, 8);

            // Beard
            c.fillStyle = '#6b4423';
            c.fillRect(ox + 14, 20, 12, 4);
            c.fillRect(ox + 12, 22, 16, 4);

            // Coat
            c.fillStyle = '#5a3d1a';
            c.fillRect(ox + 10, 14, 20, 16);
            c.fillStyle = '#6b4423';
            c.fillRect(ox + 12, 16, 16, 12);
            c.fillStyle = '#8b6914';
            c.fillRect(ox + 10, 28, 20, 2);

            // Left arm stays
            c.fillStyle = '#5a3d1a';
            c.fillRect(ox + 6, 16, 4, 12);
            c.fillStyle = '#c4956a';
            c.fillRect(ox + 6, 28, 4, 4);

            // Right arm throws flask
            c.fillStyle = '#5a3d1a';
            if (f === 0) {
                c.fillRect(ox + 30, 16, 4, 12);
                c.fillStyle = '#c4956a';
                c.fillRect(ox + 30, 28, 4, 4);
                c.fillStyle = '#27ae60';
                c.fillRect(ox + 30, 24, 6, 8);
            } else if (f === 1) {
                c.fillRect(ox + 30, 12, 4, 12);
                c.fillStyle = '#c4956a';
                c.fillRect(ox + 30, 22, 4, 4);
                c.fillStyle = '#27ae60';
                c.fillRect(ox + 32, 8, 6, 8);
                c.fillStyle = '#2ecc71';
                c.fillRect(ox + 33, 9, 4, 5);
            } else {
                c.fillRect(ox + 30, 18, 4, 10);
                c.fillStyle = '#c4956a';
                c.fillRect(ox + 30, 26, 4, 4);
            }

            // Legs
            c.fillStyle = '#3d2b1f';
            c.fillRect(ox + 14, 30, 5, 10);
            c.fillRect(ox + 21, 30, 5, 10);
            c.fillStyle = '#2c1e14';
            c.fillRect(ox + 13, 38, 6, 6);
            c.fillRect(ox + 21, 38, 6, 6);
        }

        this.textures.addSpriteSheet('player_alchemist_attack', canvas, { frameWidth: fw, frameHeight: fh });
    }

    _genAngelWalk() {
        const fw = 32, fh = 48, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const legPhase = f % 4;
            const bob = (f === 1 || f === 3) ? -1 : 0;
            const wingPhase = f % 2;

            // Hair
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 10, bob + 0, 12, 4);
            c.fillRect(ox + 8, bob + 2, 16, 6);
            c.fillRect(ox + 6, bob + 6, 20, 4);

            // Face
            c.fillStyle = '#fdebd0';
            c.fillRect(ox + 10, bob + 8, 12, 8);
            c.fillStyle = '#5dade2';
            c.fillRect(ox + 12, bob + 10, 2, 2);
            c.fillRect(ox + 18, bob + 10, 2, 2);
            c.fillStyle = '#e8a0a0';
            c.fillRect(ox + 14, bob + 14, 4, 1);

            // Wings (slight flap)
            c.fillStyle = '#ecf0f1';
            c.fillRect(ox + 0, bob + 10 - wingPhase, 6, 8);
            c.fillRect(ox + 26, bob + 10 - wingPhase, 6, 8);
            c.fillStyle = '#ffffff';
            c.fillRect(ox + 1, bob + 11 - wingPhase, 4, 6);
            c.fillRect(ox + 27, bob + 11 - wingPhase, 4, 6);
            c.fillStyle = '#d5dbdb';
            c.fillRect(ox + 0, bob + 12 - wingPhase, 2, 4);
            c.fillRect(ox + 30, bob + 12 - wingPhase, 2, 4);

            // White robe
            c.fillStyle = '#ecf0f1';
            c.fillRect(ox + 6, bob + 14, 20, 16);
            c.fillStyle = '#ffffff';
            c.fillRect(ox + 8, bob + 16, 16, 12);
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 6, bob + 28, 20, 2);

            // Holy symbol
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 14, bob + 18, 4, 6);
            c.fillRect(ox + 12, bob + 20, 8, 2);

            // Arms
            c.fillStyle = '#ecf0f1';
            c.fillRect(ox + 2, bob + 16, 4, 12);
            c.fillRect(ox + 26, bob + 16, 4, 12);
            c.fillStyle = '#fdebd0';
            c.fillRect(ox + 2, bob + 28, 4, 4);
            c.fillRect(ox + 26, bob + 28, 4, 4);

            // Violin
            c.fillStyle = '#8b4513';
            c.fillRect(ox + 27, bob + 18, 2, 14);
            c.fillStyle = '#a0522d';
            c.fillRect(ox + 25, bob + 20, 6, 8);

            // Legs with walk cycle
            c.fillStyle = '#ecf0f1';
            if (legPhase === 0) {
                c.fillRect(ox + 10, 30, 5, 10);
                c.fillRect(ox + 17, 30, 5, 10);
            } else if (legPhase === 1) {
                c.fillRect(ox + 9, 30, 5, 10);
                c.fillRect(ox + 18, 30, 5, 10);
            } else if (legPhase === 2) {
                c.fillRect(ox + 10, 30, 5, 10);
                c.fillRect(ox + 17, 30, 5, 10);
            } else {
                c.fillRect(ox + 11, 30, 5, 10);
                c.fillRect(ox + 16, 30, 5, 10);
            }

            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 9, 38, 6, 6);
            c.fillRect(ox + 17, 38, 6, 6);
        }

        this.textures.addSpriteSheet('player_angel_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    _genAngelAttack() {
        const fw = 40, fh = 48, frames = 3;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;

            // Hair
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 14, 0, 12, 4);
            c.fillRect(ox + 12, 2, 16, 6);
            c.fillRect(ox + 10, 6, 20, 4);

            // Face
            c.fillStyle = '#fdebd0';
            c.fillRect(ox + 14, 8, 12, 8);
            c.fillStyle = '#5dade2';
            c.fillRect(ox + 16, 10, 2, 2);
            c.fillRect(ox + 22, 10, 2, 2);

            // Wings spread wider during attack
            c.fillStyle = '#ecf0f1';
            c.fillRect(ox + 0, 8, 8, 10);
            c.fillRect(ox + 32, 8, 8, 10);
            c.fillStyle = '#ffffff';
            c.fillRect(ox + 1, 9, 6, 8);
            c.fillRect(ox + 33, 9, 6, 8);

            // White robe
            c.fillStyle = '#ecf0f1';
            c.fillRect(ox + 10, 14, 20, 16);
            c.fillStyle = '#ffffff';
            c.fillRect(ox + 12, 16, 16, 12);
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 10, 28, 20, 2);

            // Holy symbol glows
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 18, 18, 4, 6);
            c.fillRect(ox + 16, 20, 8, 2);

            // Left arm
            c.fillStyle = '#ecf0f1';
            c.fillRect(ox + 6, 16, 4, 12);
            c.fillStyle = '#fdebd0';
            c.fillRect(ox + 6, 28, 4, 4);

            // Right arm swings violin
            c.fillStyle = '#ecf0f1';
            if (f === 0) {
                c.fillRect(ox + 30, 16, 4, 12);
                c.fillStyle = '#fdebd0';
                c.fillRect(ox + 30, 28, 4, 4);
                c.fillStyle = '#8b4513';
                c.fillRect(ox + 31, 18, 2, 14);
                c.fillStyle = '#a0522d';
                c.fillRect(ox + 29, 20, 6, 8);
            } else if (f === 1) {
                c.fillRect(ox + 30, 12, 4, 12);
                c.fillStyle = '#fdebd0';
                c.fillRect(ox + 30, 22, 4, 4);
                c.fillStyle = '#8b4513';
                c.fillRect(ox + 30, 6, 14, 2);
                c.fillStyle = '#a0522d';
                c.fillRect(ox + 42, 4, 6, 6);
            } else {
                c.fillRect(ox + 30, 20, 4, 10);
                c.fillStyle = '#fdebd0';
                c.fillRect(ox + 30, 28, 4, 4);
                c.fillStyle = '#8b4513';
                c.fillRect(ox + 31, 26, 2, 14);
                c.fillStyle = '#a0522d';
                c.fillRect(ox + 29, 36, 6, 6);
            }

            // Legs
            c.fillStyle = '#ecf0f1';
            c.fillRect(ox + 14, 30, 5, 10);
            c.fillRect(ox + 21, 30, 5, 10);
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 13, 38, 6, 6);
            c.fillRect(ox + 21, 38, 6, 6);
        }

        this.textures.addSpriteSheet('player_angel_attack', canvas, { frameWidth: fw, frameHeight: fh });
    }

    _genGoblinWalk() {
        const fw = 24, fh = 24, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const legOff = (f % 2 === 0) ? 0 : 2;

            c.fillStyle = '#27ae60';
            c.fillRect(ox + 8, 0, 8, 4);
            c.fillRect(ox + 4, 4, 16, 8);
            c.fillRect(ox + 6, 12, 12, 4);
            c.fillStyle = '#1e8449';
            c.fillRect(ox + 6, 2, 2, 4);
            c.fillRect(ox + 16, 2, 2, 4);
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 9, 6, 2, 2);
            c.fillRect(ox + 13, 6, 2, 2);
            c.fillStyle = '#000';
            c.fillRect(ox + 10, 6, 1, 1);
            c.fillRect(ox + 14, 6, 1, 1);
            c.fillStyle = '#c0392b';
            c.fillRect(ox + 10, 10, 4, 1);
            c.fillStyle = '#27ae60';
            c.fillRect(ox + 7 - legOff, 14, 4, 6);
            c.fillRect(ox + 13 + legOff, 14, 4, 6);
            c.fillStyle = '#1e8449';
            c.fillRect(ox + 4 - legOff, 14, 3, 4);
            c.fillRect(ox + 17 + legOff, 14, 3, 4);
            c.fillStyle = '#8b4513';
            c.fillRect(ox + 7 - legOff, 20, 4, 4);
            c.fillRect(ox + 13 + legOff, 20, 4, 4);
        }

        this.textures.addSpriteSheet('goblin_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    _genGoblinAttack() {
        const fw = 28, fh = 24, frames = 3;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;

            c.fillStyle = '#27ae60';
            c.fillRect(ox + 10, 0, 8, 4);
            c.fillRect(ox + 6, 4, 16, 8);
            c.fillRect(ox + 8, 12, 12, 4);
            c.fillStyle = '#1e8449';
            c.fillRect(ox + 8, 2, 2, 4);
            c.fillRect(ox + 18, 2, 2, 4);
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 11, 6, 2, 2);
            c.fillRect(ox + 15, 6, 2, 2);
            c.fillStyle = '#000';
            c.fillRect(ox + 12, 6, 1, 1);
            c.fillRect(ox + 16, 6, 1, 1);
            c.fillStyle = '#c0392b';
            c.fillRect(ox + 12, 10, 4, 1);

            // Arm with weapon swings
            c.fillStyle = '#27ae60';
            if (f === 0) {
                c.fillRect(ox + 2, 14, 4, 6);
                c.fillRect(ox + 22, 14, 4, 6);
                c.fillStyle = '#8b4513';
                c.fillRect(ox + 22, 8, 2, 8);
            } else if (f === 1) {
                c.fillRect(ox + 2, 14, 4, 6);
                c.fillRect(ox + 22, 10, 4, 6);
                c.fillStyle = '#8b4513';
                c.fillRect(ox + 22, 4, 12, 2);
            } else {
                c.fillRect(ox + 2, 14, 4, 6);
                c.fillRect(ox + 22, 16, 4, 4);
                c.fillStyle = '#8b4513';
                c.fillRect(ox + 22, 16, 2, 8);
            }

            c.fillStyle = '#27ae60';
            c.fillRect(ox + 9, 14, 4, 6);
            c.fillRect(ox + 15, 14, 4, 6);
            c.fillStyle = '#8b4513';
            c.fillRect(ox + 9, 20, 4, 4);
            c.fillRect(ox + 15, 20, 4, 4);
        }

        this.textures.addSpriteSheet('goblin_attack', canvas, { frameWidth: fw, frameHeight: fh });
    }

    _genSlimeWalk() {
        const fw = 20, fh = 20, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const squish = (f === 1 || f === 3) ? 2 : 0;
            const yOff = squish / 2;

            c.fillStyle = '#9b59b6';
            c.fillRect(ox + 6, 6 + yOff + squish, 8, 4 - squish);
            c.fillRect(ox + 4, 8 + yOff + squish, 12, 4 - squish);
            c.fillRect(ox + 2, 10 + yOff, 16, 4);
            c.fillStyle = '#8e44ad';
            c.fillRect(ox + 4, 14, 12, 4);
            c.fillRect(ox + 6, 16, 8, 2);
            c.fillStyle = '#fff';
            c.fillRect(ox + 7, 8 + yOff + squish, 2, 2);
            c.fillRect(ox + 12, 8 + yOff + squish, 2, 2);
            c.fillStyle = '#000';
            c.fillRect(ox + 7, 9 + yOff + squish, 1, 1);
            c.fillRect(ox + 13, 9 + yOff + squish, 1, 1);
        }

        this.textures.addSpriteSheet('slime_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    _genRatWalk() {
        const fw = 20, fh = 16, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const legPhase = f % 4;
            const legL = (legPhase === 0 || legPhase === 2) ? 0 : 2;
            const legR = (legPhase === 0 || legPhase === 2) ? 2 : 0;

            c.fillStyle = '#e67e22';
            c.fillRect(ox + 10, 2, 4, 4);
            c.fillRect(ox + 6, 4, 10, 4);
            c.fillStyle = '#d35400';
            c.fillRect(ox + 8, 4, 8, 6);
            c.fillRect(ox + 4, 6, 14, 4);
            c.fillRect(ox + 2, 8, 16, 2);
            c.fillStyle = '#000';
            c.fillRect(ox + 5, 5, 1, 1);
            c.fillRect(ox + 14, 5, 1, 1);
            c.fillStyle = '#ecf0f1';
            c.fillRect(ox + 9, 8, 1, 1);
            c.fillRect(ox + 12, 8, 1, 1);
            c.fillStyle = '#d35400';
            c.fillRect(ox + 5 - legL, 10, 3, 4);
            c.fillRect(ox + 12 + legR, 10, 3, 4);
            c.fillStyle = '#8b4513';
            c.fillRect(ox + 4 - legL, 14, 4, 2);
            c.fillRect(ox + 12 + legR, 14, 4, 2);
        }

        this.textures.addSpriteSheet('rat_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    _genSkeletonWalk() {
        const fw = 24, fh = 28, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const legOff = (f % 2 === 0) ? 0 : 2;

            // Skull
            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 8, 0, 8, 8);
            c.fillRect(ox + 6, 2, 12, 4);
            c.fillStyle = '#1a0a00';
            c.fillRect(ox + 8, 3, 2, 2);
            c.fillRect(ox + 13, 3, 2, 2);
            c.fillStyle = '#c4b599';
            c.fillRect(ox + 8, 6, 8, 2);
            c.fillStyle = '#1a0a00';
            c.fillRect(ox + 9, 7, 1, 1);
            c.fillRect(ox + 11, 7, 1, 1);
            c.fillRect(ox + 13, 7, 1, 1);

            // Body
            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 9, 8, 6, 2);
            c.fillRect(ox + 8, 10, 8, 2);
            c.fillRect(ox + 9, 12, 6, 2);
            c.fillRect(ox + 8, 14, 8, 2);
            c.fillStyle = '#1a0a00';
            c.fillRect(ox + 10, 10, 1, 2);
            c.fillRect(ox + 12, 10, 1, 2);
            c.fillRect(ox + 10, 14, 1, 2);
            c.fillRect(ox + 12, 14, 1, 2);

            // Arms
            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 4, 9, 4, 2);
            c.fillRect(ox + 16, 9, 4, 2);
            c.fillRect(ox + 4, 12, 2, 4);
            c.fillRect(ox + 18, 12, 2, 4);

            // Shield + Sword
            c.fillStyle = '#7f8c8d';
            c.fillRect(ox + 1, 8, 6, 8);
            c.fillStyle = '#95a5a6';
            c.fillRect(ox + 2, 9, 4, 6);
            c.fillStyle = '#bdc3c7';
            c.fillRect(ox + 19, 6, 2, 10);
            c.fillStyle = '#7f8c8d';
            c.fillRect(ox + 18, 14, 4, 2);

            // Legs with walk
            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 8 - legOff, 16, 3, 6);
            c.fillRect(ox + 13 + legOff, 16, 3, 6);
            c.fillRect(ox + 8 - legOff, 22, 3, 2);
            c.fillRect(ox + 13 + legOff, 22, 3, 2);
            c.fillStyle = '#555';
            c.fillRect(ox + 7 - legOff, 24, 4, 3);
            c.fillRect(ox + 13 + legOff, 24, 4, 3);

            // Helmet
            c.fillStyle = '#7f8c8d';
            c.fillRect(ox + 6, 0, 12, 2);
            c.fillRect(ox + 5, 1, 14, 2);
            c.fillStyle = '#95a5a6';
            c.fillRect(ox + 7, 0, 10, 1);
        }

        this.textures.addSpriteSheet('skeleton_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    _genSkeletonAttack() {
        const fw = 30, fh = 28, frames = 3;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;

            // Skull
            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 9, 0, 8, 8);
            c.fillRect(ox + 7, 2, 12, 4);
            c.fillStyle = '#1a0a00';
            c.fillRect(ox + 9, 3, 2, 2);
            c.fillRect(ox + 14, 3, 2, 2);
            c.fillStyle = '#c4b599';
            c.fillRect(ox + 9, 6, 8, 2);

            // Body
            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 10, 8, 6, 2);
            c.fillRect(ox + 9, 10, 8, 2);
            c.fillRect(ox + 10, 12, 6, 2);
            c.fillRect(ox + 9, 14, 8, 2);

            // Shield arm stays
            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 5, 9, 4, 2);
            c.fillRect(ox + 5, 12, 2, 4);
            c.fillStyle = '#7f8c8d';
            c.fillRect(ox + 2, 8, 6, 8);
            c.fillStyle = '#95a5a6';
            c.fillRect(ox + 3, 9, 4, 6);

            // Sword arm swings
            c.fillStyle = '#d4c5a9';
            if (f === 0) {
                c.fillRect(ox + 20, 9, 4, 2);
                c.fillRect(ox + 22, 12, 2, 4);
                c.fillStyle = '#bdc3c7';
                c.fillRect(ox + 23, 4, 2, 10);
                c.fillStyle = '#7f8c8d';
                c.fillRect(ox + 22, 12, 4, 2);
            } else if (f === 1) {
                c.fillRect(ox + 20, 11, 4, 2);
                c.fillRect(ox + 22, 12, 2, 4);
                c.fillStyle = '#bdc3c7';
                c.fillRect(ox + 23, 8, 12, 2);
                c.fillStyle = '#7f8c8d';
                c.fillRect(ox + 33, 7, 2, 4);
            } else {
                c.fillRect(ox + 20, 13, 4, 2);
                c.fillRect(ox + 22, 14, 2, 4);
                c.fillStyle = '#bdc3c7';
                c.fillRect(ox + 23, 16, 2, 10);
                c.fillStyle = '#7f8c8d';
                c.fillRect(ox + 22, 24, 4, 2);
            }

            // Legs
            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 10, 16, 3, 6);
            c.fillRect(ox + 15, 16, 3, 6);
            c.fillRect(ox + 10, 22, 3, 2);
            c.fillRect(ox + 15, 22, 3, 2);
            c.fillStyle = '#555';
            c.fillRect(ox + 9, 24, 4, 3);
            c.fillRect(ox + 15, 24, 4, 3);

            // Helmet
            c.fillStyle = '#7f8c8d';
            c.fillRect(ox + 7, 0, 12, 2);
            c.fillRect(ox + 6, 1, 14, 2);
        }

        this.textures.addSpriteSheet('skeleton_attack', canvas, { frameWidth: fw, frameHeight: fh });
    }

    _genSkeletonArcherWalk() {
        const fw = 24, fh = 28, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const legOff = (f % 2 === 0) ? 0 : 2;

            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 8, 0, 8, 8);
            c.fillRect(ox + 6, 2, 12, 4);
            c.fillStyle = '#1a3a0a';
            c.fillRect(ox + 8, 3, 2, 2);
            c.fillRect(ox + 13, 3, 2, 2);
            c.fillStyle = '#c4b599';
            c.fillRect(ox + 8, 6, 8, 2);

            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 9, 8, 6, 2);
            c.fillRect(ox + 8, 10, 8, 2);
            c.fillRect(ox + 9, 12, 6, 2);
            c.fillRect(ox + 8, 14, 8, 2);

            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 4, 9, 4, 2);
            c.fillRect(ox + 16, 9, 4, 2);
            c.fillRect(ox + 4, 11, 2, 3);
            c.fillRect(ox + 18, 11, 2, 3);

            c.fillStyle = '#5a3d1a';
            c.fillRect(ox + 20, 6, 2, 14);
            c.fillRect(ox + 19, 7, 1, 12);
            c.fillStyle = '#8b6914';
            c.fillRect(ox + 21, 8, 1, 10);

            c.fillStyle = '#5a3d1a';
            c.fillRect(ox + 5, 10, 2, 6);
            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 5, 8, 2, 3);

            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 8 - legOff, 16, 3, 6);
            c.fillRect(ox + 13 + legOff, 16, 3, 6);
            c.fillRect(ox + 8 - legOff, 22, 3, 2);
            c.fillRect(ox + 13 + legOff, 22, 3, 2);
            c.fillStyle = '#555';
            c.fillRect(ox + 7 - legOff, 24, 4, 3);
            c.fillRect(ox + 13 + legOff, 24, 4, 3);

            c.fillStyle = '#4a3728';
            c.fillRect(ox + 6, 0, 12, 3);
            c.fillRect(ox + 5, 1, 14, 3);
            c.fillRect(ox + 4, 3, 16, 2);
        }

        this.textures.addSpriteSheet('skeleton_archer_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    _genSkeletonShamanWalk() {
        const fw = 24, fh = 30, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const legOff = (f % 2 === 0) ? 0 : 2;

            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 7, 0, 10, 8);
            c.fillRect(ox + 5, 2, 14, 4);
            c.fillStyle = '#3a0a3a';
            c.fillRect(ox + 8, 3, 2, 2);
            c.fillRect(ox + 14, 3, 2, 2);
            c.fillStyle = '#c4b599';
            c.fillRect(ox + 8, 6, 8, 2);

            c.fillStyle = '#2d1b4e';
            c.fillRect(ox + 6, 8, 12, 10);
            c.fillStyle = '#3d2b5e';
            c.fillRect(ox + 8, 10, 8, 6);
            c.fillStyle = '#9b59b6';
            c.fillRect(ox + 10, 11, 1, 3);
            c.fillRect(ox + 9, 12, 3, 1);
            c.fillRect(ox + 13, 11, 1, 3);
            c.fillRect(ox + 12, 12, 3, 1);

            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 4, 9, 3, 2);
            c.fillRect(ox + 17, 9, 3, 2);
            c.fillRect(ox + 4, 11, 2, 4);
            c.fillRect(ox + 18, 11, 2, 4);

            c.fillStyle = '#5a3d1a';
            c.fillRect(ox + 1, 2, 2, 22);
            c.fillStyle = '#9b59b6';
            c.fillRect(ox + 0, 0, 4, 4);
            c.fillStyle = '#7b4aaa';
            c.fillRect(ox + 1, 1, 2, 2);

            c.fillStyle = '#2d1b4e';
            c.fillRect(ox + 7 - legOff, 18, 4, 6);
            c.fillRect(ox + 13 + legOff, 18, 4, 6);
            c.fillStyle = '#3d2b1f';
            c.fillRect(ox + 6 - legOff, 24, 5, 3);
            c.fillRect(ox + 13 + legOff, 24, 5, 3);

            c.fillStyle = '#2d1b4e';
            c.fillRect(ox + 5, 0, 14, 3);
            c.fillRect(ox + 4, 1, 16, 4);
            c.fillRect(ox + 3, 3, 18, 2);
        }

        this.textures.addSpriteSheet('skeleton_shaman_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    _genTreantWalk() {
        const fw = 64, fh = 80, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const legPhase = f % 4;
            const bob = (f === 1 || f === 3) ? -2 : 0;
            const legL = (legPhase === 0 || legPhase === 2) ? 0 : 4;
            const legR = (legPhase === 0 || legPhase === 2) ? 4 : 0;

            // Roots / legs
            c.fillStyle = '#3d2b1f';
            c.fillRect(ox + 8 - legL, 68 + bob, 8, 12);
            c.fillRect(ox + 48 + legR, 68 + bob, 8, 12);
            c.fillRect(ox + 20, 70 + bob, 8, 10);
            c.fillRect(ox + 36, 70 + bob, 8, 10);
            c.fillStyle = '#2c1e14';
            c.fillRect(ox + 6 - legL, 76 + bob, 12, 4);
            c.fillRect(ox + 46 + legR, 76 + bob, 12, 4);
            c.fillRect(ox + 18, 78 + bob, 12, 2);
            c.fillRect(ox + 34, 78 + bob, 12, 2);

            // Trunk
            c.fillStyle = '#5c3a1e';
            c.fillRect(ox + 18, 28 + bob, 28, 42);
            c.fillStyle = '#4a2e16';
            c.fillRect(ox + 20, 30 + bob, 24, 38);
            c.fillStyle = '#6b4423';
            c.fillRect(ox + 22, 35 + bob, 4, 8);
            c.fillRect(ox + 38, 40 + bob, 4, 6);

            // Arms sway
            c.fillStyle = '#5c3a1e';
            c.fillRect(ox + 2 - legL, 38 + bob, 16, 6);
            c.fillRect(ox + 46 + legR, 38 + bob, 16, 6);
            c.fillStyle = '#4a2e16';
            c.fillRect(ox + 0 - legL, 40 + bob, 6, 4);
            c.fillRect(ox + 58 + legR, 40 + bob, 6, 4);

            // Hands
            c.fillStyle = '#3d2b1f';
            c.fillRect(ox + 0 - legL, 36 + bob, 4, 6);
            c.fillRect(ox + 60 + legR, 36 + bob, 4, 6);

            // Crown
            c.fillStyle = '#1a5c2a';
            c.fillRect(ox + 12, 4 + bob, 40, 26);
            c.fillStyle = '#1e6b31';
            c.fillRect(ox + 14, 2 + bob, 36, 22);
            c.fillStyle = '#155723';
            c.fillRect(ox + 8, 8 + bob, 12, 14);
            c.fillRect(ox + 44, 8 + bob, 12, 14);
            c.fillStyle = '#0f4a1c';
            c.fillRect(ox + 10, 0 + bob, 8, 10);
            c.fillRect(ox + 46, 0 + bob, 8, 10);
            c.fillRect(ox + 26, 0 + bob, 12, 6);

            // Eyes
            c.fillStyle = '#ff2222';
            c.fillRect(ox + 22, 18 + bob, 6, 4);
            c.fillRect(ox + 36, 18 + bob, 6, 4);
            c.fillStyle = '#ff6644';
            c.fillRect(ox + 23, 19 + bob, 2, 2);
            c.fillRect(ox + 37, 19 + bob, 2, 2);

            // Mouth
            c.fillStyle = '#1a0a00';
            c.fillRect(ox + 26, 24 + bob, 12, 3);
        }

        this.textures.addSpriteSheet('treant_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    _genSkeletonLordWalk() {
        const fw = 56, fh = 72, frames = 4;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;
            const legOff = (f % 2 === 0) ? 0 : 3;
            const bob = (f === 1 || f === 3) ? -1 : 0;

            // Crown
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 14, bob + 0, 28, 4);
            c.fillRect(ox + 12, bob + 2, 4, 6);
            c.fillRect(ox + 26, bob + 0, 4, 6);
            c.fillRect(ox + 40, bob + 2, 4, 6);
            c.fillStyle = '#e74c3c';
            c.fillRect(ox + 15, bob + 2, 2, 2);
            c.fillRect(ox + 27, bob + 1, 2, 2);
            c.fillRect(ox + 41, bob + 2, 2, 2);

            // Skull
            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 14, bob + 4, 28, 14);
            c.fillRect(ox + 12, bob + 6, 32, 10);
            c.fillStyle = '#ff2222';
            c.fillRect(ox + 16, bob + 8, 6, 4);
            c.fillRect(ox + 34, bob + 8, 6, 4);
            c.fillStyle = '#ff6644';
            c.fillRect(ox + 17, bob + 9, 2, 2);
            c.fillRect(ox + 35, bob + 9, 2, 2);
            c.fillStyle = '#1a0a00';
            c.fillRect(ox + 26, bob + 11, 4, 3);
            c.fillStyle = '#c4b599';
            c.fillRect(ox + 16, bob + 14, 24, 4);
            c.fillStyle = '#1a0a00';
            c.fillRect(ox + 18, bob + 15, 2, 2);
            c.fillRect(ox + 22, bob + 15, 2, 2);
            c.fillRect(ox + 26, bob + 15, 2, 2);
            c.fillRect(ox + 30, bob + 15, 2, 2);
            c.fillRect(ox + 34, bob + 15, 2, 2);

            // Neck
            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 22, bob + 18, 12, 4);

            // Armor
            c.fillStyle = '#4a4a5a';
            c.fillRect(ox + 10, bob + 22, 36, 18);
            c.fillStyle = '#3a3a4a';
            c.fillRect(ox + 12, bob + 24, 32, 14);
            c.fillStyle = '#5a5a6a';
            c.fillRect(ox + 14, bob + 26, 28, 2);
            c.fillRect(ox + 14, bob + 30, 28, 2);

            // Crystal
            c.fillStyle = '#9b59b6';
            c.fillRect(ox + 24, bob + 28, 8, 6);
            c.fillStyle = '#bf77f6';
            c.fillRect(ox + 26, bob + 29, 4, 4);

            // Arms sway
            c.fillStyle = '#4a4a5a';
            c.fillRect(ox + 2 - legOff, bob + 24, 8, 14);
            c.fillRect(ox + 46 + legOff, bob + 24, 8, 14);
            c.fillStyle = '#3a3a4a';
            c.fillRect(ox + 4 - legOff, bob + 26, 4, 10);
            c.fillRect(ox + 48 + legOff, bob + 26, 4, 10);

            // Hands
            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 2 - legOff, bob + 38, 6, 4);
            c.fillRect(ox + 48 + legOff, bob + 38, 6, 4);

            // Sword
            c.fillStyle = '#7f8c8d';
            c.fillRect(ox + 50 + legOff, bob + 10, 4, 30);
            c.fillStyle = '#95a5a6';
            c.fillRect(ox + 51 + legOff, bob + 12, 2, 26);
            c.fillStyle = '#bdc3c7';
            c.fillRect(ox + 51 + legOff, bob + 10, 2, 4);

            // Shield
            c.fillStyle = '#4a4a5a';
            c.fillRect(ox + 0 - legOff, bob + 26, 8, 12);
            c.fillStyle = '#5a5a6a';
            c.fillRect(ox + 1 - legOff, bob + 27, 6, 10);
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 3 - legOff, bob + 30, 2, 4);

            // Legs
            c.fillStyle = '#4a4a5a';
            c.fillRect(ox + 14 - legOff, bob + 40, 8, 16);
            c.fillRect(ox + 34 + legOff, bob + 40, 8, 16);
            c.fillStyle = '#3a3a4a';
            c.fillRect(ox + 16 - legOff, bob + 42, 4, 12);
            c.fillRect(ox + 36 + legOff, bob + 42, 4, 12);

            // Boots
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 12 - legOff, bob + 54, 10, 8);
            c.fillRect(ox + 34 + legOff, bob + 54, 10, 8);

            // Cape
            c.fillStyle = '#2d1b4e';
            c.fillRect(ox + 12, bob + 22, 4, 34);
            c.fillRect(ox + 40, bob + 22, 4, 34);
        }

        this.textures.addSpriteSheet('skeleton_lord_walk', canvas, { frameWidth: fw, frameHeight: fh });
    }

    _genSkeletonLordAttack() {
        const fw = 64, fh = 72, frames = 3;
        const canvas = document.createElement('canvas');
        canvas.width = fw * frames;
        canvas.height = fh;
        const c = canvas.getContext('2d');
        c.imageSmoothingEnabled = false;

        for (let f = 0; f < frames; f++) {
            const ox = f * fw;

            // Crown
            c.fillStyle = '#f1c40f';
            c.fillRect(ox + 18, 0, 28, 4);
            c.fillRect(ox + 16, 2, 4, 6);
            c.fillRect(ox + 30, 0, 4, 6);
            c.fillRect(ox + 44, 2, 4, 6);
            c.fillStyle = '#e74c3c';
            c.fillRect(ox + 19, 2, 2, 2);
            c.fillRect(ox + 31, 1, 2, 2);
            c.fillRect(ox + 45, 2, 2, 2);

            // Skull
            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 18, 4, 28, 14);
            c.fillRect(ox + 16, 6, 32, 10);
            c.fillStyle = '#ff2222';
            c.fillRect(ox + 20, 8, 6, 4);
            c.fillRect(ox + 38, 8, 6, 4);
            c.fillStyle = '#ff6644';
            c.fillRect(ox + 21, 9, 2, 2);
            c.fillRect(ox + 39, 9, 2, 2);
            c.fillStyle = '#1a0a00';
            c.fillRect(ox + 30, 11, 4, 3);
            c.fillStyle = '#c4b599';
            c.fillRect(ox + 20, 14, 24, 4);

            // Neck
            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 26, 18, 12, 4);

            // Armor
            c.fillStyle = '#4a4a5a';
            c.fillRect(ox + 14, 22, 36, 18);
            c.fillStyle = '#3a3a4a';
            c.fillRect(ox + 16, 24, 32, 14);
            c.fillStyle = '#9b59b6';
            c.fillRect(ox + 28, 28, 8, 6);
            c.fillStyle = '#bf77f6';
            c.fillRect(ox + 30, 29, 4, 4);

            // Arms - attack animation
            c.fillStyle = '#4a4a5a';
            c.fillRect(ox + 6, 24, 8, 14);
            c.fillStyle = '#d4c5a9';
            c.fillRect(ox + 6, 38, 6, 4);

            // Shield
            c.fillStyle = '#4a4a5a';
            c.fillRect(ox + 2, 26, 8, 12);
            c.fillStyle = '#5a5a6a';
            c.fillRect(ox + 3, 27, 6, 10);

            // Sword arm swings
            c.fillStyle = '#4a4a5a';
            if (f === 0) {
                c.fillRect(ox + 50, 24, 8, 14);
                c.fillStyle = '#d4c5a9';
                c.fillRect(ox + 50, 38, 6, 4);
                c.fillStyle = '#7f8c8d';
                c.fillRect(ox + 52, 8, 4, 30);
                c.fillStyle = '#bdc3c7';
                c.fillRect(ox + 53, 8, 2, 4);
            } else if (f === 1) {
                c.fillRect(ox + 50, 20, 8, 14);
                c.fillStyle = '#d4c5a9';
                c.fillRect(ox + 50, 32, 6, 4);
                c.fillStyle = '#7f8c8d';
                c.fillRect(ox + 52, 16, 20, 3);
                c.fillStyle = '#bdc3c7';
                c.fillRect(ox + 70, 14, 4, 6);
            } else {
                c.fillRect(ox + 50, 28, 8, 12);
                c.fillStyle = '#d4c5a9';
                c.fillRect(ox + 50, 38, 6, 4);
                c.fillStyle = '#7f8c8d';
                c.fillRect(ox + 52, 36, 4, 26);
                c.fillStyle = '#bdc3c7';
                c.fillRect(ox + 52, 58, 4, 4);
            }

            // Legs
            c.fillStyle = '#4a4a5a';
            c.fillRect(ox + 18, 40, 8, 16);
            c.fillRect(ox + 38, 40, 8, 16);
            c.fillStyle = '#2a2a3a';
            c.fillRect(ox + 16, 54, 10, 8);
            c.fillRect(ox + 36, 54, 10, 8);

            // Cape
            c.fillStyle = '#2d1b4e';
            c.fillRect(ox + 16, 22, 4, 34);
            c.fillRect(ox + 44, 22, 4, 34);
        }

        this.textures.addSpriteSheet('skeleton_lord_attack', canvas, { frameWidth: fw, frameHeight: fh });
    }

    _drawExpansion() {
        // ===== SECRET KEY =====
        this._mk('item_key', 16, 16, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#f1c40f';
            c.fillRect(6, 2, 4, 8);
            c.fillRect(4, 4, 8, 4);
            c.fillStyle = '#e67e22';
            c.fillRect(7, 3, 2, 6);
            c.fillStyle = '#f39c12';
            c.fillRect(4, 10, 8, 2);
            c.fillRect(2, 10, 2, 4);
            c.fillRect(12, 10, 2, 2);
        });

        // ===== CART DRIVER NPC =====
        this._mk('npc_cart_driver', 32, 48, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#5d4e37';
            c.fillRect(8, 12, 16, 20);
            c.fillStyle = '#4a3b2a';
            c.fillRect(6, 14, 20, 18);
            c.fillRect(4, 20, 24, 10);
            c.fillStyle = '#f5cba7';
            c.fillRect(10, 2, 12, 10);
            c.fillRect(8, 4, 16, 8);
            c.fillStyle = '#2c3e50';
            c.fillRect(12, 6, 3, 3);
            c.fillRect(18, 6, 3, 3);
            c.fillStyle = '#5d4e37';
            c.fillRect(6, 0, 20, 4);
            c.fillRect(4, 2, 24, 2);
            c.fillStyle = '#f1c40f';
            c.fillRect(12, 1, 2, 2);
            c.fillStyle = '#5d4e37';
            c.fillRect(10, 32, 5, 14);
            c.fillRect(17, 32, 5, 14);
            c.fillStyle = '#3d2e1a';
            c.fillRect(8, 44, 8, 4);
            c.fillRect(16, 44, 8, 4);
            c.fillStyle = '#5d4e37';
            c.fillRect(2, 16, 6, 12);
            c.fillRect(24, 16, 6, 12);
            c.fillStyle = '#f5cba7';
            c.fillRect(0, 26, 6, 6);
            c.fillRect(26, 26, 6, 6);
        });

        // ===== MEADOW GROUND =====
        this._mk('meadow_ground', 800, 600, (c) => {
            c.fillStyle = '#2d5a1e';
            c.fillRect(0, 0, 800, 600);
            c.fillStyle = '#3a7a28';
            for (let i = 0; i < 400; i++) {
                c.fillRect(Math.random() * 800, Math.random() * 600, 4, 3);
            }
            c.fillStyle = '#1e4a12';
            for (let i = 0; i < 150; i++) {
                c.fillRect(Math.random() * 800, Math.random() * 600, 3, 5);
            }
            c.fillStyle = '#4a8a35';
            for (let i = 0; i < 80; i++) {
                c.fillRect(Math.random() * 800, Math.random() * 600, 6, 4);
            }
        });

        // ===== MINE GATE =====
        this._mk('mine_gate', 64, 80, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#555555';
            c.fillRect(0, 0, 64, 80);
            c.fillStyle = '#444444';
            c.fillRect(4, 4, 56, 72);
            c.fillStyle = '#333333';
            c.fillRect(8, 8, 48, 64);
            c.fillStyle = '#666666';
            c.fillRect(0, 0, 4, 80);
            c.fillRect(60, 0, 4, 80);
            c.fillRect(0, 0, 64, 4);
            c.fillRect(0, 76, 64, 4);
            c.fillStyle = '#888888';
            c.fillRect(28, 20, 8, 40);
            c.fillRect(20, 30, 24, 4);
            c.fillStyle = '#f1c40f';
            c.fillRect(30, 40, 4, 8);
        });

        // ===== CART RIDE OVERLAY =====
        this._mk('cart_ride', 800, 600, (c) => {
            c.fillStyle = '#1a0e05';
            c.fillRect(0, 0, 800, 600);
            c.fillStyle = '#2a1a0a';
            for (let i = 0; i < 200; i++) {
                c.fillRect(Math.random() * 800, Math.random() * 600, 3, 2);
            }
        });

        // ===== CAVE GROUND =====
        this._mk('cave_ground', 500, 1200, (c) => {
            c.fillStyle = '#1a1a1a';
            c.fillRect(0, 0, 500, 1200);
            c.fillStyle = '#222222';
            for (let i = 0; i < 600; i++) {
                c.fillRect(Math.random() * 500, Math.random() * 1200, 3, 2);
            }
            c.fillStyle = '#111111';
            for (let i = 0; i < 200; i++) {
                c.fillRect(Math.random() * 500, Math.random() * 1200, 4, 3);
            }
            c.fillStyle = '#2a2a2a';
            for (let i = 0; i < 100; i++) {
                c.fillRect(Math.random() * 500, Math.random() * 1200, 2, 5);
            }
        });

        // ===== CAVE CHEST =====
        this._mk('cave_chest', 20, 18, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#5d4e37';
            c.fillRect(2, 6, 16, 10);
            c.fillStyle = '#4a3b2a';
            c.fillRect(3, 7, 14, 8);
            c.fillStyle = '#8b6914';
            c.fillRect(2, 4, 16, 3);
            c.fillRect(1, 3, 18, 2);
            c.fillStyle = '#f1c40f';
            c.fillRect(8, 8, 4, 4);
            c.fillStyle = '#c8a82e';
            c.fillRect(9, 9, 2, 2);
            c.fillStyle = '#3d2e1a';
            c.fillRect(4, 16, 4, 2);
            c.fillRect(12, 16, 4, 2);
        });
        this._mk('cave_chest_open', 20, 18, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#5d4e37';
            c.fillRect(2, 8, 16, 8);
            c.fillStyle = '#4a3b2a';
            c.fillRect(3, 9, 14, 6);
            c.fillStyle = '#8b6914';
            c.fillRect(2, 2, 16, 6);
            c.fillRect(1, 1, 18, 2);
            c.fillStyle = '#2c1810';
            c.fillRect(4, 10, 12, 4);
            c.fillStyle = '#3d2e1a';
            c.fillRect(4, 16, 4, 2);
            c.fillRect(12, 16, 4, 2);
        });

        // ===== CAVE SPIDER =====
        this._mk('cave_spider', 16, 14, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#4a2d6e';
            c.fillRect(4, 4, 8, 6);
            c.fillStyle = '#3a1d5e';
            c.fillRect(3, 3, 10, 8);
            c.fillStyle = '#e74c3c';
            c.fillRect(5, 5, 2, 2);
            c.fillRect(9, 5, 2, 2);
            c.fillStyle = '#2d1b4e';
            c.fillRect(1, 2, 3, 2);
            c.fillRect(12, 2, 3, 2);
            c.fillRect(1, 8, 3, 2);
            c.fillRect(12, 8, 3, 2);
            c.fillRect(3, 10, 2, 4);
            c.fillRect(6, 10, 2, 4);
            c.fillRect(8, 10, 2, 4);
            c.fillRect(11, 10, 2, 4);
        });
        // Cave spider walk spritesheet (4 frames)
        (() => {
            const fw = 16, fh = 14, frames = 4;
            const canvas = document.createElement('canvas');
            canvas.width = fw * frames;
            canvas.height = fh;
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = false;
            for (let f = 0; f < frames; f++) {
                const ox = f * fw;
                const lo = (f % 2 === 0) ? 0 : 1;
                ctx.fillStyle = '#4a2d6e';
                ctx.fillRect(ox + 4, 4, 8, 6);
                ctx.fillStyle = '#3a1d5e';
                ctx.fillRect(ox + 3, 3, 10, 8);
                ctx.fillStyle = '#e74c3c';
                ctx.fillRect(ox + 5, 5, 2, 2);
                ctx.fillRect(ox + 9, 5, 2, 2);
                ctx.fillStyle = '#2d1b4e';
                ctx.fillRect(ox + 1, 2, 3, 2);
                ctx.fillRect(ox + 12, 2, 3, 2);
                ctx.fillRect(ox + 1, 8, 3, 2);
                ctx.fillRect(ox + 12, 8, 3, 2);
                ctx.fillRect(ox + 3, 10 - lo, 2, 4 + lo);
                ctx.fillRect(ox + 6, 10 - lo, 2, 4 + lo);
                ctx.fillRect(ox + 8, 10 - lo, 2, 4 + lo);
                ctx.fillRect(ox + 11, 10 - lo, 2, 4 + lo);
            }
            this.textures.addSpriteSheet('cave_spider_walk', canvas, { frameWidth: fw, frameHeight: fh });
        })();

        // ===== CAVE BAT =====
        this._mk('cave_bat', 14, 12, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#2c2c3e';
            c.fillRect(5, 3, 4, 5);
            c.fillStyle = '#1c1c2e';
            c.fillRect(4, 2, 6, 7);
            c.fillStyle = '#e74c3c';
            c.fillRect(5, 3, 1, 1);
            c.fillRect(8, 3, 1, 1);
            c.fillStyle = '#3c3c4e';
            c.fillRect(0, 2, 4, 6);
            c.fillRect(10, 2, 4, 6);
            c.fillStyle = '#4c4c5e';
            c.fillRect(1, 1, 2, 4);
            c.fillRect(11, 1, 2, 4);
            c.fillStyle = '#f5cba7';
            c.fillRect(6, 8, 2, 3);
            c.fillRect(7, 9, 2, 2);
        });
        // Cave bat walk spritesheet (4 frames)
        (() => {
            const fw = 14, fh = 12, frames = 4;
            const canvas = document.createElement('canvas');
            canvas.width = fw * frames;
            canvas.height = fh;
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = false;
            for (let f = 0; f < frames; f++) {
                const ox = f * fw;
                const wUp = (f % 2 === 0);
                ctx.fillStyle = '#2c2c3e';
                ctx.fillRect(ox + 5, 3, 4, 5);
                ctx.fillStyle = '#1c1c2e';
                ctx.fillRect(ox + 4, 2, 6, 7);
                ctx.fillStyle = '#e74c3c';
                ctx.fillRect(ox + 5, 3, 1, 1);
                ctx.fillRect(ox + 8, 3, 1, 1);
                ctx.fillStyle = '#3c3c4e';
                ctx.fillRect(ox + 0, wUp ? 0 : 2, 4, 6);
                ctx.fillRect(ox + 10, wUp ? 0 : 2, 4, 6);
                ctx.fillStyle = '#4c4c5e';
                ctx.fillRect(ox + 1, wUp ? 0 : 1, 2, 4);
                ctx.fillRect(ox + 11, wUp ? 0 : 1, 2, 4);
                ctx.fillStyle = '#f5cba7';
                ctx.fillRect(ox + 6, 8, 2, 3);
                ctx.fillRect(ox + 7, 9, 2, 2);
            }
            this.textures.addSpriteSheet('cave_bat_walk', canvas, { frameWidth: fw, frameHeight: fh });
        })();

        // ===== STONE GOLEM (Tank) =====
        this._mk('stone_golem', 22, 26, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#666666';
            c.fillRect(6, 0, 10, 10);
            c.fillStyle = '#777777';
            c.fillRect(7, 1, 8, 8);
            c.fillStyle = '#ff4444';
            c.fillRect(8, 3, 2, 2);
            c.fillRect(12, 3, 2, 2);
            c.fillStyle = '#555555';
            c.fillRect(4, 10, 14, 12);
            c.fillStyle = '#666666';
            c.fillRect(5, 11, 12, 10);
            c.fillStyle = '#444444';
            c.fillRect(0, 12, 4, 8);
            c.fillRect(18, 12, 4, 8);
            c.fillStyle = '#777777';
            c.fillRect(1, 14, 2, 4);
            c.fillRect(19, 14, 2, 4);
            c.fillStyle = '#555555';
            c.fillRect(6, 22, 4, 4);
            c.fillRect(12, 22, 4, 4);
        });
        // Stone golem walk spritesheet (4 frames)
        (() => {
            const fw = 22, fh = 26, frames = 4;
            const canvas = document.createElement('canvas');
            canvas.width = fw * frames;
            canvas.height = fh;
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = false;
            for (let f = 0; f < frames; f++) {
                const ox = f * fw;
                const step = (f % 2 === 0) ? 0 : 2;
                ctx.fillStyle = '#666666';
                ctx.fillRect(ox + 6, 0, 10, 10);
                ctx.fillStyle = '#777777';
                ctx.fillRect(ox + 7, 1, 8, 8);
                ctx.fillStyle = '#ff4444';
                ctx.fillRect(ox + 8, 3, 2, 2);
                ctx.fillRect(ox + 12, 3, 2, 2);
                ctx.fillStyle = '#555555';
                ctx.fillRect(ox + 4, 10, 14, 12);
                ctx.fillStyle = '#666666';
                ctx.fillRect(ox + 5, 11, 12, 10);
                ctx.fillStyle = '#444444';
                ctx.fillRect(ox + 0, 12 - step, 4, 8);
                ctx.fillRect(ox + 18, 12 - step, 4, 8);
                ctx.fillStyle = '#777777';
                ctx.fillRect(ox + 1, 14 - step, 2, 4);
                ctx.fillRect(ox + 19, 14 - step, 2, 4);
                ctx.fillStyle = '#555555';
                ctx.fillRect(ox + 6, 22 + step, 4, 4);
                ctx.fillRect(ox + 12, 22 + step, 4, 4);
            }
            this.textures.addSpriteSheet('stone_golem_walk', canvas, { frameWidth: fw, frameHeight: fh });
        })();

        // ===== EARTH WORM (Tank) =====
        this._mk('earth_worm', 24, 18, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#5a7a3a';
            c.fillRect(4, 4, 16, 10);
            c.fillStyle = '#6a8a4a';
            c.fillRect(6, 5, 12, 8);
            c.fillStyle = '#ffcc00';
            c.fillRect(7, 6, 2, 2);
            c.fillRect(15, 6, 2, 2);
            c.fillStyle = '#4a6a2a';
            c.fillRect(2, 6, 2, 6);
            c.fillRect(20, 6, 2, 6);
            c.fillStyle = '#3a5a1a';
            c.fillRect(0, 8, 3, 4);
            c.fillRect(21, 8, 3, 4);
            c.fillStyle = '#7a9a5a';
            c.fillRect(8, 14, 8, 4);
            c.fillRect(10, 16, 4, 2);
        });
        // Earth worm walk spritesheet (4 frames)
        (() => {
            const fw = 24, fh = 18, frames = 4;
            const canvas = document.createElement('canvas');
            canvas.width = fw * frames;
            canvas.height = fh;
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = false;
            for (let f = 0; f < frames; f++) {
                const ox = f * fw;
                const w = (f % 2 === 0) ? 0 : 1;
                ctx.fillStyle = '#5a7a3a';
                ctx.fillRect(ox + 4, 4 - w, 16, 10);
                ctx.fillStyle = '#6a8a4a';
                ctx.fillRect(ox + 6, 5 - w, 12, 8);
                ctx.fillStyle = '#ffcc00';
                ctx.fillRect(ox + 7, 6 - w, 2, 2);
                ctx.fillRect(ox + 15, 6 - w, 2, 2);
                ctx.fillStyle = '#4a6a2a';
                ctx.fillRect(ox + 2, 6, 2, 6);
                ctx.fillRect(ox + 20, 6, 2, 6);
                ctx.fillStyle = '#3a5a1a';
                ctx.fillRect(ox + 0, 8, 3, 4);
                ctx.fillRect(ox + 21, 8, 3, 4);
                ctx.fillStyle = '#7a9a5a';
                ctx.fillRect(ox + 8, 14 + w, 8, 4);
                ctx.fillRect(ox + 10, 16 + w, 4, 2);
            }
            this.textures.addSpriteSheet('earth_worm_walk', canvas, { frameWidth: fw, frameHeight: fh });
        })();

        // ===== GIANT BAT (Boss) =====
        this._mk('giant_bat', 48, 36, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#2c1a3e';
            c.fillRect(16, 10, 16, 14);
            c.fillStyle = '#3c2a4e';
            c.fillRect(18, 12, 12, 10);
            c.fillStyle = '#ff0000';
            c.fillRect(20, 14, 3, 3);
            c.fillRect(27, 14, 3, 3);
            c.fillStyle = '#cc0000';
            c.fillRect(22, 19, 6, 2);
            c.fillStyle = '#1a0a2e';
            c.fillRect(20, 8, 8, 4);
            c.fillRect(22, 6, 4, 2);
            c.fillStyle = '#4c3a5e';
            c.fillRect(0, 8, 16, 16);
            c.fillRect(32, 8, 16, 16);
            c.fillStyle = '#5c4a6e';
            c.fillRect(2, 10, 12, 12);
            c.fillRect(34, 10, 12, 12);
            c.fillStyle = '#3c2a4e';
            c.fillRect(0, 12, 2, 8);
            c.fillRect(46, 12, 2, 8);
            c.fillStyle = '#6c5a7e';
            c.fillRect(1, 14, 1, 4);
            c.fillRect(47, 14, 1, 4);
            c.fillStyle = '#1a0a2e';
            c.fillRect(18, 24, 12, 8);
            c.fillStyle = '#f5cba7';
            c.fillRect(22, 28, 2, 3);
            c.fillRect(26, 28, 2, 3);
        });
        // Giant bat walk spritesheet (4 frames)
        (() => {
            const fw = 48, fh = 36, frames = 4;
            const canvas = document.createElement('canvas');
            canvas.width = fw * frames;
            canvas.height = fh;
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = false;
            for (let f = 0; f < frames; f++) {
                const ox = f * fw;
                const wUp = (f % 2 === 0);
                ctx.fillStyle = '#2c1a3e';
                ctx.fillRect(ox + 16, 10, 16, 14);
                ctx.fillStyle = '#3c2a4e';
                ctx.fillRect(ox + 18, 12, 12, 10);
                ctx.fillStyle = '#ff0000';
                ctx.fillRect(ox + 20, 14, 3, 3);
                ctx.fillRect(ox + 27, 14, 3, 3);
                ctx.fillStyle = '#cc0000';
                ctx.fillRect(ox + 22, 19, 6, 2);
                ctx.fillStyle = '#1a0a2e';
                ctx.fillRect(ox + 20, 8, 8, 4);
                ctx.fillRect(ox + 22, 6, 4, 2);
                ctx.fillStyle = '#4c3a5e';
                ctx.fillRect(ox + 0, wUp ? 4 : 8, 16, 16);
                ctx.fillRect(ox + 32, wUp ? 4 : 8, 16, 16);
                ctx.fillStyle = '#5c4a6e';
                ctx.fillRect(ox + 2, wUp ? 6 : 10, 12, 12);
                ctx.fillRect(ox + 34, wUp ? 6 : 10, 12, 12);
                ctx.fillStyle = '#3c2a4e';
                ctx.fillRect(ox + 0, wUp ? 10 : 12, 2, 8);
                ctx.fillRect(ox + 46, wUp ? 10 : 12, 2, 8);
                ctx.fillStyle = '#1a0a2e';
                ctx.fillRect(ox + 18, 24, 12, 8);
                ctx.fillStyle = '#f5cba7';
                ctx.fillRect(ox + 22, 28, 2, 3);
                ctx.fillRect(ox + 26, 28, 2, 3);
            }
            this.textures.addSpriteSheet('giant_bat_walk', canvas, { frameWidth: fw, frameHeight: fh });
        })();

        // ===== SMALL BAT (Summoned Add) =====
        this._mk('small_bat', 18, 14, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#3c1a4e';
            c.fillRect(6, 4, 6, 6);
            c.fillStyle = '#4c2a5e';
            c.fillRect(7, 5, 4, 4);
            c.fillStyle = '#ff4444';
            c.fillRect(8, 5, 1, 1);
            c.fillRect(10, 5, 1, 1);
            c.fillStyle = '#5c3a6e';
            c.fillRect(0, 3, 6, 7);
            c.fillRect(12, 3, 6, 7);
            c.fillStyle = '#6c4a7e';
            c.fillRect(1, 4, 4, 5);
            c.fillRect(13, 4, 4, 5);
            c.fillStyle = '#3c1a4e';
            c.fillRect(8, 10, 4, 4);
        });
        // Small bat walk spritesheet (4 frames)
        (() => {
            const fw = 18, fh = 14, frames = 4;
            const canvas = document.createElement('canvas');
            canvas.width = fw * frames;
            canvas.height = fh;
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = false;
            for (let f = 0; f < frames; f++) {
                const ox = f * fw;
                const wUp = (f % 2 === 0);
                ctx.fillStyle = '#3c1a4e';
                ctx.fillRect(ox + 6, 4, 6, 6);
                ctx.fillStyle = '#4c2a5e';
                ctx.fillRect(ox + 7, 5, 4, 4);
                ctx.fillStyle = '#ff4444';
                ctx.fillRect(ox + 8, 5, 1, 1);
                ctx.fillRect(ox + 10, 5, 1, 1);
                ctx.fillStyle = '#5c3a6e';
                ctx.fillRect(ox + 0, wUp ? 1 : 3, 6, 7);
                ctx.fillRect(ox + 12, wUp ? 1 : 3, 6, 7);
                ctx.fillStyle = '#6c4a7e';
                ctx.fillRect(ox + 1, wUp ? 2 : 4, 4, 5);
                ctx.fillRect(ox + 13, wUp ? 2 : 4, 4, 5);
                ctx.fillStyle = '#3c1a4e';
                ctx.fillRect(ox + 8, 10, 4, 4);
            }
            this.textures.addSpriteSheet('small_bat_walk', canvas, { frameWidth: fw, frameHeight: fh });
        })();

        // ===== CAVE STAIRS =====
        this._mk('cave_stairs', 32, 24, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#555555';
            c.fillRect(2, 0, 28, 24);
            c.fillStyle = '#666666';
            c.fillRect(4, 2, 24, 4);
            c.fillRect(6, 8, 20, 4);
            c.fillRect(8, 14, 16, 4);
            c.fillRect(10, 20, 12, 4);
            c.fillStyle = '#777777';
            c.fillRect(5, 3, 22, 2);
            c.fillRect(7, 9, 18, 2);
            c.fillRect(9, 15, 14, 2);
            c.fillRect(11, 21, 10, 2);
        });

        // ===== VILLAGE =====
        this._mk('village_ground', 700, 2500, (c) => {
            c.fillStyle = '#2a1f14';
            c.fillRect(0, 0, 700, 2000);
            c.fillStyle = '#352a1e';
            for (let i = 0; i < 800; i++) {
                c.fillRect(Math.random() * 700, Math.random() * 2000, 3, 2);
            }
            c.fillStyle = '#1f170f';
            for (let i = 0; i < 300; i++) {
                c.fillRect(Math.random() * 700, Math.random() * 2000, 4, 3);
            }
            c.fillStyle = '#4a3d2e';
            for (let i = 0; i < 150; i++) {
                c.fillRect(Math.random() * 700, Math.random() * 2000, 2, 4);
            }
            c.fillStyle = '#3a3530';
            c.fillRect(0, 2000, 700, 500);
            c.fillStyle = '#2a2520';
            for (let i = 0; i < 200; i++) {
                c.fillRect(Math.random() * 700, 2000 + Math.random() * 500, 3, 2);
            }
            c.fillStyle = '#4a4540';
            for (let i = 0; i < 100; i++) {
                c.fillRect(Math.random() * 700, 2000 + Math.random() * 500, 2, 3);
            }
            c.fillStyle = '#555';
            for (let y = 1950; y < 2010; y += 4) {
                c.fillRect(300, y, 100, 2);
            }
        });

        this._mk('village_house', 60, 50, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#5c3a1e';
            c.fillRect(5, 18, 50, 30);
            c.fillStyle = '#7a4f2e';
            c.fillRect(8, 20, 44, 26);
            c.fillStyle = '#8b4513';
            c.beginPath();
            c.moveTo(0, 18);
            c.lineTo(30, 0);
            c.lineTo(60, 18);
            c.fill();
            c.fillStyle = '#4a2a10';
            c.fillRect(24, 32, 12, 16);
            c.fillStyle = '#6b8cff';
            c.fillRect(10, 24, 10, 10);
            c.fillRect(40, 24, 10, 10);
            c.fillStyle = '#88ccff';
            c.fillRect(12, 26, 6, 6);
            c.fillRect(42, 26, 6, 6);
        });

        this._mk('village_barrel', 18, 22, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#6b4226';
            c.fillRect(3, 4, 12, 16);
            c.fillStyle = '#8b5a2b';
            c.fillRect(4, 5, 10, 14);
            c.fillStyle = '#555';
            c.fillRect(2, 6, 14, 2);
            c.fillRect(2, 14, 14, 2);
            c.fillStyle = '#444';
            c.fillRect(3, 7, 12, 1);
            c.fillRect(3, 15, 12, 1);
        });

        this._mk('village_barrel_open', 18, 22, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#6b4226';
            c.fillRect(3, 4, 12, 16);
            c.fillStyle = '#8b5a2b';
            c.fillRect(4, 5, 10, 14);
            c.fillStyle = '#555';
            c.fillRect(2, 6, 14, 2);
            c.fillRect(2, 14, 14, 2);
            c.fillStyle = '#3a2a10';
            c.fillRect(5, 2, 8, 4);
        });

        this._mk('village_corpse', 16, 10, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#7a5a3a';
            c.fillRect(2, 2, 12, 6);
            c.fillStyle = '#5a3a1a';
            c.fillRect(4, 0, 4, 4);
            c.fillStyle = '#8b0000';
            c.fillRect(6, 5, 4, 3);
        });

        this._mk('village_garden', 30, 20, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#3a2a10';
            c.fillRect(0, 0, 30, 20);
            c.fillStyle = '#2d5a1e';
            for (let i = 0; i < 5; i++) {
                c.fillRect(3 + i * 6, 4, 4, 12);
            }
            c.fillStyle = '#4a8a2e';
            for (let i = 0; i < 5; i++) {
                c.fillRect(4 + i * 6, 6, 2, 4);
            }
        });

        this._mk('village_fence', 40, 12, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#6b5a3a';
            c.fillRect(0, 4, 40, 3);
            c.fillStyle = '#7a6a4a';
            c.fillRect(2, 0, 3, 12);
            c.fillRect(18, 0, 3, 12);
            c.fillRect(35, 0, 3, 12);
        });

        this._mk('child_npc', 10, 14, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#ffcc88';
            c.fillRect(3, 0, 4, 4);
            c.fillStyle = '#e74c3c';
            c.fillRect(2, 5, 6, 6);
            c.fillStyle = '#2980b9';
            c.fillRect(2, 11, 3, 3);
            c.fillRect(5, 11, 3, 3);
        });

        // Village enemy spritesheets
        const villageEnemyDefs = [
            { key: 'village_brute', w: 20, bh: 22, body: '#6b2020', head: '#8b3030', detail: '#4a1010', eyes: '#ff0000' },
            { key: 'village_stalker', w: 14, bh: 14, body: '#2a2a4a', head: '#3a3a5a', detail: '#1a1a3a', eyes: '#ff4444' },
            { key: 'village_spitter', w: 16, bh: 16, body: '#3a5a2a', head: '#4a6a3a', detail: '#2a4a1a', eyes: '#ffff00' },
            { key: 'village_curser', w: 14, bh: 18, body: '#5a2a5a', head: '#6a3a6a', detail: '#3a1a3a', eyes: '#ff00ff' }
        ];

        villageEnemyDefs.forEach(def => {
            (() => {
                const fw = def.w, fh = def.bh, frames = 4;
                const canvas = document.createElement('canvas');
                canvas.width = fw * frames;
                canvas.height = fh;
                const ctx = canvas.getContext('2d');
                ctx.imageSmoothingEnabled = false;
                for (let f = 0; f < frames; f++) {
                    const ox = f * fw;
                    const wUp = f % 2 === 0;
                    ctx.fillStyle = def.body;
                    ctx.fillRect(ox + 3, wUp ? 4 : 5, fw - 6, fh - 8);
                    ctx.fillStyle = def.head;
                    ctx.fillRect(ox + 4, wUp ? 1 : 2, fw - 8, 6);
                    ctx.fillStyle = def.eyes;
                    ctx.fillRect(ox + 5, wUp ? 2 : 3, 2, 2);
                    ctx.fillRect(ox + fw - 7, wUp ? 2 : 3, 2, 2);
                    ctx.fillStyle = def.detail;
                    ctx.fillRect(ox + 2, wUp ? 2 : 3, 3, 4);
                    ctx.fillRect(ox + fw - 5, wUp ? 2 : 3, 3, 4);
                    ctx.fillStyle = def.body;
                    ctx.fillRect(ox + 4, fh - 4, 3, 4);
                    ctx.fillRect(ox + fw - 7, fh - 4, 3, 4);
                }
                this.textures.addSpriteSheet(def.key + '_walk', canvas, { frameWidth: fw, frameHeight: fh });
            })();
            this._mk(def.key, def.w, def.bh, (c) => {
                c.imageSmoothingEnabled = false;
                c.fillStyle = def.body;
                c.fillRect(3, 4, def.w - 6, def.bh - 8);
                c.fillStyle = def.head;
                c.fillRect(4, 1, def.w - 8, 6);
                c.fillStyle = def.eyes;
                c.fillRect(5, 2, 2, 2);
                c.fillRect(def.w - 7, 2, 2, 2);
                c.fillStyle = def.detail;
                c.fillRect(2, 2, 3, 4);
                c.fillRect(def.w - 5, 2, 3, 4);
            });
        });

        // Zombie minion spritesheet
        (() => {
            const fw = 14, fh = 16, frames = 4;
            const canvas = document.createElement('canvas');
            canvas.width = fw * frames;
            canvas.height = fh;
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = false;
            for (let f = 0; f < frames; f++) {
                const ox = f * fw;
                const wUp = f % 2 === 0;
                ctx.fillStyle = '#4a5a3a';
                ctx.fillRect(ox + 3, wUp ? 4 : 5, 8, 10);
                ctx.fillStyle = '#5a6a4a';
                ctx.fillRect(ox + 4, wUp ? 1 : 2, 6, 5);
                ctx.fillStyle = '#ff0000';
                ctx.fillRect(ox + 5, wUp ? 2 : 3, 2, 2);
                ctx.fillRect(ox + 7, wUp ? 2 : 3, 2, 2);
                ctx.fillStyle = '#3a4a2a';
                ctx.fillRect(ox + 4, fh - 4, 3, 4);
                ctx.fillRect(ox + 7, fh - 4, 3, 4);
            }
            this.textures.addSpriteSheet('zombie_walk', canvas, { frameWidth: fw, frameHeight: fh });
        })();
        this._mk('zombie', 14, 16, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#4a5a3a';
            c.fillRect(3, 4, 8, 10);
            c.fillStyle = '#5a6a4a';
            c.fillRect(4, 1, 6, 5);
            c.fillStyle = '#ff0000';
            c.fillRect(5, 2, 2, 2);
            c.fillRect(7, 2, 2, 2);
        });

        // Purple Demon spritesheet
        (() => {
            const fw = 40, fh = 44, frames = 4;
            const canvas = document.createElement('canvas');
            canvas.width = fw * frames;
            canvas.height = fh;
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = false;
            for (let f = 0; f < frames; f++) {
                const ox = f * fw;
                const wUp = f % 2 === 0;
                ctx.fillStyle = '#6a2080';
                ctx.fillRect(ox + 10, wUp ? 10 : 12, 20, 28);
                ctx.fillStyle = '#8a30a0';
                ctx.fillRect(ox + 12, wUp ? 4 : 6, 16, 12);
                ctx.fillStyle = '#ff0000';
                ctx.fillRect(ox + 14, wUp ? 6 : 8, 4, 4);
                ctx.fillRect(ox + 22, wUp ? 6 : 8, 4, 4);
                ctx.fillStyle = '#aa40c0';
                ctx.fillRect(ox + 16, wUp ? 0 : 2, 4, 6);
                ctx.fillRect(ox + 20, wUp ? 0 : 2, 4, 6);
                ctx.fillRect(ox + 24, wUp ? 1 : 3, 3, 5);
                ctx.fillStyle = '#5a1070';
                ctx.fillRect(ox + 8, wUp ? 14 : 16, 4, 14);
                ctx.fillRect(ox + 28, wUp ? 14 : 16, 4, 14);
                ctx.fillStyle = '#7a2090';
                ctx.fillRect(ox + 6, wUp ? 16 : 18, 4, 10);
                ctx.fillRect(ox + 30, wUp ? 16 : 18, 4, 10);
                ctx.fillStyle = '#4a1060';
                ctx.fillRect(ox + 14, fh - 6, 5, 6);
                ctx.fillRect(ox + 21, fh - 6, 5, 6);
            }
            this.textures.addSpriteSheet('purple_demon_walk', canvas, { frameWidth: fw, frameHeight: fh });
        })();
        this._mk('purple_demon', 40, 44, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#6a2080';
            c.fillRect(10, 10, 20, 28);
            c.fillStyle = '#8a30a0';
            c.fillRect(12, 4, 16, 12);
            c.fillStyle = '#ff0000';
            c.fillRect(14, 6, 4, 4);
            c.fillRect(22, 6, 4, 4);
            c.fillStyle = '#aa40c0';
            c.fillRect(16, 0, 4, 6);
            c.fillRect(20, 0, 4, 6);
            c.fillRect(24, 1, 3, 5);
            c.fillStyle = '#5a1070';
            c.fillRect(8, 14, 4, 14);
            c.fillRect(28, 14, 4, 14);
            c.fillStyle = '#7a2090';
            c.fillRect(6, 16, 4, 10);
            c.fillRect(30, 16, 4, 10);
            c.fillStyle = '#4a1060';
            c.fillRect(14, 38, 5, 6);
            c.fillRect(21, 38, 5, 6);
        });

        this._mk('meteor_vfx', 20, 20, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#ff4400';
            c.beginPath();
            c.arc(10, 10, 8, 0, Math.PI * 2);
            c.fill();
            c.fillStyle = '#ffaa00';
            c.beginPath();
            c.arc(10, 10, 5, 0, Math.PI * 2);
            c.fill();
            c.fillStyle = '#ffff00';
            c.beginPath();
            c.arc(10, 10, 2, 0, Math.PI * 2);
            c.fill();
        });

        this._mk('cemetery_entrance', 100, 16, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#555';
            c.fillRect(0, 0, 100, 16);
            c.fillStyle = '#666';
            c.fillRect(10, 0, 6, 16);
            c.fillRect(44, 0, 12, 16);
            c.fillRect(84, 0, 6, 16);
            c.fillStyle = '#777';
            c.fillRect(11, 1, 4, 14);
            c.fillRect(45, 1, 10, 14);
            c.fillRect(85, 1, 4, 14);
        });

        // === HELL ZONE TEXTURES ===

        // Hell ground tile (lava + dark rock)
        this._mk('hell_ground', 64, 64, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#1a0500';
            c.fillRect(0, 0, 64, 64);
            c.fillStyle = '#330800';
            c.fillRect(0, 0, 32, 32);
            c.fillRect(32, 32, 32, 32);
            c.fillStyle = '#ff2200';
            c.fillRect(8, 8, 4, 4);
            c.fillRect(40, 20, 6, 3);
            c.fillRect(20, 44, 5, 5);
            c.fillRect(50, 50, 3, 3);
            c.fillStyle = '#cc1100';
            c.fillRect(10, 10, 2, 2);
            c.fillRect(42, 22, 3, 2);
            c.fillStyle = '#220600';
            c.fillRect(0, 28, 64, 8);
            c.fillRect(28, 0, 8, 64);
        });

        // Hell lava circle (for hazard zones)
        this._mk('hell_lava_circle', 80, 80, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#ff3300';
            c.beginPath();
            c.arc(40, 40, 36, 0, Math.PI * 2);
            c.fill();
            c.fillStyle = '#ff6600';
            c.beginPath();
            c.arc(40, 40, 28, 0, Math.PI * 2);
            c.fill();
            c.fillStyle = '#ffaa00';
            c.beginPath();
            c.arc(40, 40, 18, 0, Math.PI * 2);
            c.fill();
            c.fillStyle = '#ffdd44';
            c.beginPath();
            c.arc(40, 40, 8, 0, Math.PI * 2);
            c.fill();
        });

        // Hell portal (red)
        this._mk('hell_portal', 60, 16, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#ff2200';
            c.fillRect(0, 0, 60, 16);
            c.fillStyle = '#ff6600';
            c.fillRect(4, 2, 52, 12);
            c.fillStyle = '#ffaa00';
            c.fillRect(8, 4, 44, 8);
            c.fillStyle = '#ffffff';
            c.fillRect(14, 6, 32, 4);
        });

        // Hell enemy spritesheets
        const hellEnemyDefs = [
            { key: 'hell_guard',   w: 22, bh: 24, body: '#8b1a1a', head: '#a02020', detail: '#601010', eyes: '#ff4400' },
            { key: 'hell_stalker', w: 14, bh: 14, body: '#2a1a3a', head: '#3a2a4a', detail: '#1a0a2a', eyes: '#ff00ff' },
            { key: 'hell_archer',  w: 16, bh: 16, body: '#5a3a1a', head: '#6a4a2a', detail: '#4a2a0a', eyes: '#ffff00' },
            { key: 'hell_mage',    w: 14, bh: 18, body: '#4a1a5a', head: '#5a2a6a', detail: '#3a0a4a', eyes: '#ff00ff' },
            { key: 'hell_priest',  w: 14, bh: 18, body: '#6a2a2a', head: '#7a3a3a', detail: '#5a1a1a', eyes: '#ffffff' }
        ];

        hellEnemyDefs.forEach(def => {
            (() => {
                const fw = def.w, fh = def.bh, frames = 4;
                const canvas = document.createElement('canvas');
                canvas.width = fw * frames;
                canvas.height = fh;
                const ctx = canvas.getContext('2d');
                ctx.imageSmoothingEnabled = false;
                for (let f = 0; f < frames; f++) {
                    const ox = f * fw;
                    const wUp = f % 2 === 0;
                    ctx.fillStyle = def.body;
                    ctx.fillRect(ox + 3, wUp ? 4 : 5, fw - 6, fh - 8);
                    ctx.fillStyle = def.head;
                    ctx.fillRect(ox + 4, wUp ? 1 : 2, fw - 8, 6);
                    ctx.fillStyle = def.eyes;
                    ctx.fillRect(ox + 5, wUp ? 2 : 3, 2, 2);
                    ctx.fillRect(ox + fw - 7, wUp ? 2 : 3, 2, 2);
                    ctx.fillStyle = def.detail;
                    ctx.fillRect(ox + 2, wUp ? 2 : 3, 3, 4);
                    ctx.fillRect(ox + fw - 5, wUp ? 2 : 3, 3, 4);
                    ctx.fillStyle = def.body;
                    ctx.fillRect(ox + 4, fh - 4, 3, 4);
                    ctx.fillRect(ox + fw - 7, fh - 4, 3, 4);
                }
                this.textures.addSpriteSheet(def.key + '_walk', canvas, { frameWidth: fw, frameHeight: fh });
            })();
            this._mk(def.key, def.w, def.bh, (c) => {
                c.imageSmoothingEnabled = false;
                c.fillStyle = def.body;
                c.fillRect(3, 4, def.w - 6, def.bh - 8);
                c.fillStyle = def.head;
                c.fillRect(4, 1, def.w - 8, 6);
                c.fillStyle = def.eyes;
                c.fillRect(5, 2, 2, 2);
                c.fillRect(def.w - 7, 2, 2, 2);
                c.fillStyle = def.detail;
                c.fillRect(2, 2, 3, 4);
                c.fillRect(def.w - 5, 2, 3, 4);
            });
        });

        // Hell Imp minion spritesheet
        (() => {
            const fw = 12, fh = 14, frames = 4;
            const canvas = document.createElement('canvas');
            canvas.width = fw * frames;
            canvas.height = fh;
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = false;
            for (let f = 0; f < frames; f++) {
                const ox = f * fw;
                const wUp = f % 2 === 0;
                ctx.fillStyle = '#aa2200';
                ctx.fillRect(ox + 2, wUp ? 3 : 4, 8, 8);
                ctx.fillStyle = '#cc3300';
                ctx.fillRect(ox + 3, wUp ? 1 : 2, 6, 4);
                ctx.fillStyle = '#ffff00';
                ctx.fillRect(ox + 4, wUp ? 2 : 3, 1, 1);
                ctx.fillRect(ox + 7, wUp ? 2 : 3, 1, 1);
                ctx.fillStyle = '#881100';
                ctx.fillRect(ox + 3, fh - 3, 2, 3);
                ctx.fillRect(ox + 7, fh - 3, 2, 3);
            }
            this.textures.addSpriteSheet('hell_imp_walk', canvas, { frameWidth: fw, frameHeight: fh });
        })();
        this._mk('hell_imp', 12, 14, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#aa2200';
            c.fillRect(2, 3, 8, 8);
            c.fillStyle = '#cc3300';
            c.fillRect(3, 1, 6, 4);
            c.fillStyle = '#ffff00';
            c.fillRect(4, 2, 1, 1);
            c.fillRect(7, 2, 1, 1);
        });

        // Red Demon boss spritesheet
        (() => {
            const fw = 44, fh = 48, frames = 4;
            const canvas = document.createElement('canvas');
            canvas.width = fw * frames;
            canvas.height = fh;
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = false;
            for (let f = 0; f < frames; f++) {
                const ox = f * fw;
                const wUp = f % 2 === 0;
                // Body
                ctx.fillStyle = '#991111';
                ctx.fillRect(ox + 12, wUp ? 12 : 14, 20, 28);
                // Head
                ctx.fillStyle = '#bb2222';
                ctx.fillRect(ox + 14, wUp ? 4 : 6, 16, 12);
                // Eyes
                ctx.fillStyle = '#ffff00';
                ctx.fillRect(ox + 16, wUp ? 6 : 8, 4, 4);
                ctx.fillRect(ox + 24, wUp ? 6 : 8, 4, 4);
                // Horns
                ctx.fillStyle = '#dd3333';
                ctx.fillRect(ox + 18, wUp ? 0 : 2, 4, 6);
                ctx.fillRect(ox + 22, wUp ? 0 : 2, 4, 6);
                ctx.fillRect(ox + 26, wUp ? 1 : 3, 3, 5);
                // Arms
                ctx.fillStyle = '#770000';
                ctx.fillRect(ox + 8, wUp ? 14 : 16, 4, 14);
                ctx.fillRect(ox + 32, wUp ? 14 : 16, 4, 14);
                // Hands
                ctx.fillStyle = '#aa1111';
                ctx.fillRect(ox + 6, wUp ? 16 : 18, 4, 10);
                ctx.fillRect(ox + 34, wUp ? 16 : 18, 4, 10);
                // Legs
                ctx.fillStyle = '#660000';
                ctx.fillRect(ox + 16, fh - 6, 5, 6);
                ctx.fillRect(ox + 23, fh - 6, 5, 6);
            }
            this.textures.addSpriteSheet('red_demon_walk', canvas, { frameWidth: fw, frameHeight: fh });
        })();
        this._mk('red_demon', 44, 48, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#991111';
            c.fillRect(12, 12, 20, 28);
            c.fillStyle = '#bb2222';
            c.fillRect(14, 4, 16, 12);
            c.fillStyle = '#ffff00';
            c.fillRect(16, 6, 4, 4);
            c.fillRect(24, 6, 4, 4);
            c.fillStyle = '#dd3333';
            c.fillRect(18, 0, 4, 6);
            c.fillRect(22, 0, 4, 6);
            c.fillRect(26, 1, 3, 5);
            c.fillStyle = '#770000';
            c.fillRect(8, 14, 4, 14);
            c.fillRect(32, 14, 4, 14);
            c.fillStyle = '#aa1111';
            c.fillRect(6, 16, 4, 10);
            c.fillRect(34, 16, 4, 10);
            c.fillStyle = '#660000';
            c.fillRect(16, 42, 5, 6);
            c.fillRect(23, 42, 5, 6);
        });

        // Fire wave VFX
        this._mk('fire_wave_vfx', 24, 24, (c) => {
            c.imageSmoothingEnabled = false;
            c.fillStyle = '#ff4400';
            c.beginPath();
            c.arc(12, 12, 10, 0, Math.PI * 2);
            c.fill();
            c.fillStyle = '#ff8800';
            c.beginPath();
            c.arc(12, 12, 6, 0, Math.PI * 2);
            c.fill();
            c.fillStyle = '#ffcc00';
            c.beginPath();
            c.arc(12, 12, 3, 0, Math.PI * 2);
            c.fill();
        });
    }
}
