import Phaser from '../lib/phaser.js'

export default class WorldMap extends Phaser.Scene
{
    /** @type {Phaser.GameObjects.Zone} */
    iceWorldButton

    constructor() 
    {
        super('worldMap')
    }

    preload () 
    {
        this.load.image('worldMap', 'assets/world_map.png')
    }

    create () 
    {
        this.add.image(400, 300, 'worldMap')
        /** These values are gross and hardcoded, but given the weird nature of the underlying map
        * it's hard to make them easily manipulable!
        */
        this.iceWorldButton = this.add.zone(368, 264, 130, 100)

        this.iceWorldButton.setInteractive()
        this.iceWorldButton.on('pointerdown', () => {
            this.scene.start('iceWorld')
        }, this)
    }
}
