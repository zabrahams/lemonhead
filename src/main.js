import Phaser from './lib/phaser.js'

import WorldMap from './scenes/worldMap.js'
import IceWorld from './scenes/iceWorld.js'
import Backpack from './scenes/backpack.js'

const WINDOW_WIDTH = 800
const WINDOW_HEIGHT = 600

export default new Phaser.Game ({
    type: Phaser.AUTO,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    scene: [WorldMap, IceWorld, Backpack],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
        }   
    }
})