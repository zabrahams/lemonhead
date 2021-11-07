import Phaser from './lib/phaser.js'

import WorldMap from './scenes/worldMap.js'
import IceWorld from './scenes/iceWorld.js'
import BuyTwice from './scenes/buyTwice.js'
import Backpack from './scenes/backpack.js'
import LemonGlue from './scenes/lemonGlue.js'
import Shinya from './scenes/shinya.js'
import TerrorIsland from './scenes/terrorIsland.js'
import Hospital from './scenes/hospital.js'
import Hut from './scenes/hut.js'
import Kitchen from './scenes/kitchen.js'
import Store from './scenes/store.js'
import LemonheadStore from './scenes/lemonheadStore.js'

const WINDOW_WIDTH = 800
const WINDOW_HEIGHT = 600

export default new Phaser.Game ({
    type: Phaser.AUTO,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    scene: [
        WorldMap, 
        BuyTwice, 
        IceWorld,
        LemonGlue,  
        Shinya, 
        TerrorIsland, 
        Hospital,
        Hut, 
        Kitchen, 
        LemonheadStore,
        Backpack,
        Store,
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
        }   
    }
})