import Phaser from '../lib/phaser.js'
import Player from "../entities/player.js"

import WorldMapButton from '../entities/worldMapButton.js'
import {CURRENCY_KEY} from '../dataConstants.js'

export default class Backpack extends Phaser.Scene
{
    constructor() 
    {
        super('backpack')
    }

    preload () 
    {
        WorldMapButton.preload(this)
        Player.preload(this)

        this.load.image('backpack', 'assets/backpack.png')
    }

    create () 
    {
        this.add.image(400, 300, 'backpack')
        Player.image(this, 230, 330).setScale(4.5)
    
        new WorldMapButton(this, 50, (this.scale.height/2), 'world_map_button')

        // currency
        const currencyStyle = { color: '#000', fontSize: 24 }
        console.log(this)
        const currentCurrency = this.registry.get(CURRENCY_KEY)
        this.add.text(82, 120, `${currentCurrency}`, currencyStyle)
            .setScrollFactor(0)
            .setOrigin(0.5, 0)    
    }
}
