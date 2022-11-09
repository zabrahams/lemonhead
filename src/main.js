import Phaser from './lib/phaser.js'

import WorldMap from './scenes/worldMap.js'
import IceWorld from './scenes/iceWorld.js'
import BuyTwice from './scenes/buyTwice.js'
import Backpack from './scenes/backpack.js'
import LemonGlue from './scenes/lemonGlue.js'
import Shinya from './scenes/shinya.js'
import TerrorIsland from './scenes/terrorIsland.js'
import BattleWon from './scenes/battleWon.js'
import BattleLost from './scenes/battleLost.js'
import Hospital from './scenes/hospital.js'
import Hut from './scenes/hut.js'
import Kitchen from './scenes/kitchen.js'
import Store from './scenes/store.js'
import LemonheadStore from './scenes/lemonheadStore.js'

import {
    CURRENCY_KEY, 
    IS_GREY_KEY, 
    REINFORCEMENT_PURCHASES_KEY, 
    MAX_LIVES_KEY,
    PETS_OWNED_STATE_KEY,
    ACTIVE_PET_KEY,
} from './dataConstants.js'

const WINDOW_WIDTH = 800
const WINDOW_HEIGHT = 600

const STARTING_CURRENCY = 3
const STARTING_IS_GREY = false
const STARTING_MAX_LIVES = 5
const STARTING_PET_STATE = {
    blueDot: false
}
const STARTING_ACTIVE_PET = undefined

const init = (game) => {
    game.registry.set(CURRENCY_KEY, STARTING_CURRENCY)
    game.registry.set(IS_GREY_KEY, STARTING_IS_GREY)
    game.registry.set(MAX_LIVES_KEY, STARTING_MAX_LIVES)
    game.registry.set(REINFORCEMENT_PURCHASES_KEY, [false, false, false, false])
    game.registry.set(PETS_OWNED_STATE_KEY, STARTING_PET_STATE)
    game.registry.set(ACTIVE_PET_KEY, STARTING_ACTIVE_PET)
}

export default new Phaser.Game ({
    type: Phaser.AUTO,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    scene: [  
        Store,
        WorldMap,  
        BuyTwice, 
        IceWorld,
        LemonGlue,  
        Shinya, 
        TerrorIsland, 
        BattleWon,
        BattleLost,
        Hospital,
        Hut, 
        Kitchen, 
        LemonheadStore,
        Backpack,
        // Store,
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
        }   
    },
    callbacks: {
        postBoot: init,
    },
    audio: {
        disableWebAudio: true
    }
})
