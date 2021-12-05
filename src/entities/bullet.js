const BOUNCE = 0.2
const TEXTURE='bullet'
const TEXTURE_ASSET='assets/bullet.png'

/**
 * 
 * @param {scene} Phaser.Scene
 */
 export function preloadBullet(scene) {
    scene.load.image(TEXTURE, TEXTURE_ASSET)
}

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     */
    constructor(scene, x, y, xDelta, yDelta) {
        super(scene, x, y, TEXTURE)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        // Set the player physics properties
        this.setBounce(BOUNCE)
        this.setCollideWorldBounds(false)

        this.setVelocityX(xDelta)
        this.setVelocityY(yDelta)
    }
}
