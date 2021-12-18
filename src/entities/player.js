const VELOCITY = 160
const BOUNCE = 0.2

const TEXTURE='luna'
const TEXTURE_ASSET='assets/luna.png'
const GREY_TEXTURE='lunaGrey'
const GREY_TEXTURE_ASSET='assets/luna_grey.png'
import {IS_GREY_KEY} from '../dataConstants.js'

export default class Player extends Phaser.Physics.Arcade.Sprite {
    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     */
    constructor(scene, x, y) {
        let texture

        if (scene.registry.get(IS_GREY_KEY)) {
            texture = GREY_TEXTURE
        } else {
            texture = TEXTURE
        }
        
        super(scene, x, y, texture)
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
        let texture, textureAsset
        if (scene.registry.get(IS_GREY_KEY)) {
            texture = GREY_TEXTURE
            textureAsset = GREY_TEXTURE_ASSET
        } else {
            texture = TEXTURE
            textureAsset = TEXTURE_ASSET
        }

        scene.load.image(texture, textureAsset)
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