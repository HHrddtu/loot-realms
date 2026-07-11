import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from './config/index.js';
import BootScene from './scenes/BootScene.js';
import { loadLang } from './i18n.js';

loadLang();

const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    parent: 'game-container',
    pixelArt: true,
    dom: { createContainer: true },
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 0 }, debug: false }
    },
    scene: [BootScene]
});

const LAZY_SCENES = [
    { key: 'Login', path: () => import('./scenes/LoginScene.js') },
    { key: 'Menu', path: () => import('./scenes/MenuScene.js') },
    { key: 'Lobby', path: () => import('./scenes/LobbyScene.js') },
    { key: 'ClassSelect', path: () => import('./scenes/ClassSelectScene.js') },
    { key: 'Intro', path: () => import('./scenes/IntroScene.js') },
    { key: 'Map', path: () => import('./scenes/MapScene.js') },
    { key: 'Game', path: () => import('./scenes/GameScene.js') },
    { key: 'TalentTree', path: () => import('./scenes/TalentScene.js') },
    { key: 'Bestiary', path: () => import('./scenes/BestiaryScene.js') },
    { key: 'MaterialBook', path: () => import('./scenes/MaterialBookScene.js') },
    { key: 'SoulBook', path: () => import('./scenes/SoulBookScene.js') },
    { key: 'Craft', path: () => import('./scenes/CraftScene.js') },
    { key: 'Pet', path: () => import('./scenes/PetScene.js') },
    { key: 'Keybinds', path: () => import('./scenes/KeybindScene.js') }
];

LAZY_SCENES.forEach(s => {
    s.path().then(mod => game.scene.add(s.key, mod.default, false));
});
