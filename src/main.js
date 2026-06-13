import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from './config/index.js';
import BootScene from './scenes/BootScene.js';
import MenuScene from './scenes/MenuScene.js';
import ClassSelectScene from './scenes/ClassSelectScene.js';
import GameScene from './scenes/GameScene.js';
import TalentScene from './scenes/TalentScene.js';
import BestiaryScene from './scenes/BestiaryScene.js';
import MaterialBookScene from './scenes/MaterialBookScene.js';
import SoulBookScene from './scenes/SoulBookScene.js';
import CraftScene from './scenes/CraftScene.js';
import { loadLang } from './i18n.js';

loadLang();

new Phaser.Game({
    type: Phaser.AUTO,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    parent: 'game-container',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 0 }, debug: false }
    },
    scene: [BootScene, MenuScene, ClassSelectScene, GameScene, TalentScene, BestiaryScene, MaterialBookScene, SoulBookScene, CraftScene]
});
