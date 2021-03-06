import Phaser from '../lib/phaser.js'

export default class WorldMap extends Phaser.Scene
{
    /** @type {Phaser.GameObjects.Zone} */
    buyTwiceButton
    /** @type {Phaser.GameObjects.Zone} */
    iceWorldButton
    /** @type {Phaser.GameObjects.Zone} */
    lemonGlueButton
    /** @type {Phaser.GameObjects.Zone} */
    shinyaButtonUpper
    /** @type {Phaser.GameObjects.Zone} */
    terrorIslandButton
    /** @type {Phaser.GameObjects.Zone} */
    shinyaButtonLower

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

         this.buyTwiceButton = this.add.zone(430, 140, 86, 86)
         this.buyTwiceButton.setInteractive()
         this.buyTwiceButton.on('pointerdown', () => {
             this.scene.start('buyTwice')
         }, this)
 

        this.iceWorldButton = this.add.zone(368, 264, 130, 100)
        this.iceWorldButton.setInteractive()
        this.iceWorldButton.on('pointerdown', () => {
            this.scene.start('iceWorld')
        }, this)

        this.lemonGlueButton = this.add.zone(192, 436, 124, 66)
        this.lemonGlueButton.setInteractive()
        this.lemonGlueButton.on('pointerdown', () => {
            this.scene.start('lemonGlue')
        }, this)

        this.shinyaButtonUpper = this.add.zone(240, 146, 160, 130)
        this.shinyaButtonUpper.setInteractive()
        this.shinyaButtonUpper.on('pointerdown', () => {
            this.scene.start('shinya')
        }, this)

        this.shinyaButtonUpper = this.add.zone(160, 230, 100, 170)
        this.shinyaButtonUpper.setInteractive()
        this.shinyaButtonUpper.on('pointerdown', () => {
            this.scene.start('shinya')
        }, this)

        this.terrorIslandButton = this.add.zone(472, 362, 80, 96)
        this.terrorIslandButton.setInteractive()
        this.terrorIslandButton.on('pointerdown', () => {
            this.scene.start('terrorIsland')
        }, this)
    }
}
