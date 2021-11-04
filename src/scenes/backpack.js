import Phaser from '../lib/phaser.js'

import WorldMapButton from '../entities/worldMapButton.js'


export default class Backpack extends Phaser.Scene
{
    constructor() 
    {
        super('backpack')
    }

    preload () 
    {
        this.load.image('world_map_button', 'assets/world_button.png')
        this.load.image('luna', 'assets/luna.png')

        this.load.image('backpack', 'assets/backpack.png')
    }

    create () 
    {
        this.add.image(400, 300, 'backpack')
        this.add.image(230, 330, 'luna').setScale(4.5)
        new WorldMapButton(this, 50, (this.scale.height/2), 'world_map_button')

        // currency
        const currencyStyle = { color: '#000', fontSize: 24 }
        this.add.text(82, 120, '0', currencyStyle)
            .setScrollFactor(0)
            .setOrigin(0.5, 0)    
    }
}
