const BOUNCE = 0.2
const TEXTURE='corona'
const TEXTURE_ASSET='assets/corona.png'

const MIN_VELOCITY=1
const MAX_VELOCITY=200

export default class Corona extends Phaser.Physics.Arcade.Sprite {
     /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     */
    constructor(scene, x, y) {
        super(scene, x, y, TEXTURE)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        // Set the player physics properties
        this.setBounce(BOUNCE)
        this.setCollideWorldBounds(true)

        const xVelocity = Math.random() * (MAX_VELOCITY - MIN_VELOCITY) + MIN_VELOCITY
        const signedXVelocity = xVelocity * (Math.round(Math.random()) ? 1 : -1)
        this.body.setVelocityX(signedXVelocity)

        const yVelocity = Math.random() * (MAX_VELOCITY - MIN_VELOCITY) + MIN_VELOCITY
        const signedYVelocity = yVelocity * (Math.round(Math.random()) ? 1 : -1)
        this.body.setVelocityY(signedYVelocity)
    }

    /**
     * 
     * @param {scene} Phaser.Scene
     */
    static preload(scene) {
        scene.load.image(TEXTURE, TEXTURE_ASSET)
    }
}
