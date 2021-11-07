import Phaser from './lib/phaser.js'

import WorldMap from './scenes/worldMap.js'
import IceWorld from './scenes/iceWorld.js'
import BuyTwice from './scenes/buyTwice.js'
import Backpack from './scenes/backpack.js'
import LemonGlue from './scenes/lemonglue.js'
import Shinya from './scenes/shinya.js'
import TerrorIsland from './scenes/terrorIsland.js'
import Hut from './scenes/hut.js'
import Kitchen from './scenes/kitchen.js'

const WINDOW_WIDTH = 800
const WINDOW_HEIGHT = 600

export default new Phaser.Game ({
    type: Phaser.AUTO,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    scene: [
        BuyTwice, 
        WorldMap, 
        IceWorld,
        LemonGlue,  
        Shinya, 
        TerrorIsland, 
        Hut, 
        Kitchen, 
        Backpack,
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
        }   
    }
})