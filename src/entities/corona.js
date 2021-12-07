const BOUNCE = 0.2
const TEXTURE='corona'
const TEXTURE_ASSET='assets/corona.png'

const RESPAWN_DELAY = 500

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
        this.setVisible(true)
        this.setActive(true)
        
        scene.add.existing(this)
        scene.physics.world.enable(this)

        // Set the player physics properties
        this.setBounce(BOUNCE)
        this.setCollideWorldBounds(true)
        this.randomVelocity()
       
    }

    /**
     * 
     * @param {scene} Phaser.Scene
     */
    static preload(scene) {
        scene.load.image(TEXTURE, TEXTURE_ASSET)
    }

    reset(scene, x, y) {
        this.setActive(false)
        this.setVisible(false)

        setTimeout(() => {
            this.setX(x)
            this.setY(y)
            this.setActive(true)
            this.setVisible(true)
            this.randomVelocity()
            scene.physics.world.enable(this)
        }, RESPAWN_DELAY)
    }

    randomVelocity() {
        const xVelocity = Math.random() * (MAX_VELOCITY - MIN_VELOCITY) + MIN_VELOCITY
        const signedXVelocity = xVelocity * (Math.round(Math.random()) ? 1 : -1)
        this.body.setVelocityX(signedXVelocity)

        const yVelocity = Math.random() * (MAX_VELOCITY - MIN_VELOCITY) + MIN_VELOCITY
        const signedYVelocity = yVelocity * (Math.round(Math.random()) ? 1 : -1)
        this.body.setVelocityY(signedYVelocity)
    }
}
