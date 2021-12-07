
const X_VELOCITY = 100
const Y_VELOCITY = 60

const TEXTURE = 'sled'
const TEXTURE_ASSET = 'assets/sled.png'

export default class Sled extends Phaser.Physics.Arcade.Sprite  {

    /** @type {boolean}  */
    sliding
    /** @type {boolean} */
    returning
    /** @type {number} */
    startXPos
    /** @type {number} */
    endSlideXPos


    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     * @param {number} endSlideXPos 'the x value where the sled ends its slide' 
     */
    constructor(scene, x, y, endSlideXPos) {
            super(scene, x, y, TEXTURE)
            scene.add.existing(this)
            scene.physics.add.existing(this)
            
            // set physics properties
            this.setCollideWorldBounds(true)

            // bootstrap initial sled state
            this.sliding = false
            this.returning = false
            this.startXPos = x
            this.endSlideXPos = endSlideXPos-(this.displayWidth/2)
    }

    /**
     * 
     * @param {scene} Phaser.Scene 
     */
    static preload(scene) {
        scene.load.image(TEXTURE, TEXTURE_ASSET)
    } 

    /**
     * Triggers the sled to start sliding down the hill
     */
    startSlide() {
        this.sliding = true
        this.returnings = false
    }

    update() {

        /** 
         * If the sled is at the bottom of the hill update its state to make it 
         * return
         * 
         * If if has returned to starting position, update its state to stop
         * returning
         */
        if (this.x >= this.endSlideXPos) {
            this.sliding = false
            this.returning = true
        } else if (this.x <= this.startXPos) {
            this.returning = false
        }

        // Move the sled
        if (this.sliding) {
            this.setVelocityX(X_VELOCITY)
            this.setVelocityY(Y_VELOCITY)
        } else if (this.returning) {
            this.setVelocityX(-1 * X_VELOCITY)
            this.setVelocityY(-1 * Y_VELOCITY)
        } else {
            this.setVelocityX(0)
            this.setVelocityY(0)
        }
      
    }
}