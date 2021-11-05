import Phaser from '../lib/phaser.js'

const TEXTURE = 'world_map_button'
const TEXTURE_ASSET = 'assets/world_button.png'

/**
 * 
 * @param {scene} Phaser.Scene 
 */
 export function preloadWorldMapButton(scene) {
    scene.load.image(TEXTURE, TEXTURE_ASSET)
} 

export default class WorldMapButton extends Phaser.GameObjects.Image 
{
    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     */
    constructor(scene, x, y) 
    {
        super(scene, x, y, TEXTURE)
        scene.add.existing(this)

        this.setInteractive()
        this.on('pointerdown', () => {
            scene.scene.start('worldMap')
        }, scene)        
    }
}