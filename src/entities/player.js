const VELOCITY = 160
const BOUNCE = 0.2

const TEXTURE='luna'
const TEXTURE_ASSET='assets/luna.png'
export default class Player extends Phaser.Physics.Arcade.Sprite {
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
    }

    /**
     * 
     * @param {scene} Phaser.Scene 
     */
    static preload(scene) {
        scene.load.image(TEXTURE, TEXTURE_ASSET)
    }

     /**
     * 
     * @param {Phaser.GameObjects.Sprite} vehicle 
     */
    update(cursors) {
        if (this.vehicle) {
            this.moveWithVehicle()
        } else {
            this.moveSelf(cursors)
        }
    }

    /**
     * 
     * @param {Phaser.GameObjects.Sprite} vehicle 
     */
    enterVehicle(vehicle) {
        this.vehicle = vehicle
    }

    exitVehicle() {
        this.vehicle = null
    }

    moveWithVehicle() {
        if (this.vehicle) {    
            this.x = this.vehicle.x
            this.y = this.vehicle.y
        }
    }


    /**
     * 
     * @param {@param {Phaser.Types.Input.Keyboard.CursorKeys} cursors 
     */
    moveSelf(cursors) {
        /**  
         * horizontal and vertical movement are handled independantly
         *
         * for both with set velocity if a key pressed and set it to
         * 0 if no key is pressed 
         */

        // horizontal
        if (cursors.left.isDown)
        {
            this.setVelocityX(VELOCITY * -1)
        }
        else if (cursors.right.isDown)
        {
            this.setVelocityX(VELOCITY)
        }
        else
        {
            this.setVelocityX(0)
        }

        // vertical
        if (cursors.up.isDown)
        {
            this.setVelocityY(VELOCITY * -1)
        }
        else if (cursors.down.isDown)
        {
            this.setVelocityY(VELOCITY * 1)
        }
        else 
        {
            this.setVelocityY(0)
        }
    }
}