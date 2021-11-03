import Phaser from './lib/phaser.js'

import IceWorld from "./scenes/iceworld.js"

const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 600;
export default new Phaser.Game ({
    type: Phaser.AUTO,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
        }   
    },
    scene: IceWorld
})