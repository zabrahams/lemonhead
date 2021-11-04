import Phaser from '../lib/phaser.js'

export default class BackpackButton extends Phaser.GameObjects.Image 
{
    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     * @param {string} texture
     */
    constructor(scene, x, y, texture) 
    {
        super(scene, x, y, texture)
        scene.add.existing(this)

        this.setInteractive()
        this.on('pointerdown', () => {
            scene.scene.start('backpack')
        }, scene)        
    }
}