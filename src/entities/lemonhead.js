import Bullet, { preloadBullet } from "./bullet.js"

const BOUNCE = 0.2
const TEXTURE='lemonhead'
const TEXTURE_ASSET='assets/lemonhead.png'

const ANGULAR_VELOCITY=160
const VELOCITY=160
const BULLET_VELOCITY=200
const BULLET_DELAY=300 // how often you can fire (in milliseconds)

/**
 * 
 * @param {scene} Phaser.Scene
 */
export function preloadLemonhead(scene) {
    scene.load.image(TEXTURE, TEXTURE_ASSET)
    preloadBullet(scene)
}

export default class Lemonhead extends Phaser.Physics.Arcade.Sprite {
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
        this.canFire = true
    }

    update(cursors) {
        // rotate left
        if (cursors.right.isDown) {
            this.setAngularVelocity(ANGULAR_VELOCITY)
        } else if (cursors.left.isDown) {
            this.setAngularVelocity(-ANGULAR_VELOCITY)
        } else { 
            this.setAngularVelocity(0)
        }   

        if (cursors.up.isDown) {
            const [xDelta, yDelta] = calculateHeading(this.rotation, VELOCITY)
            this.setVelocityX(xDelta)
            this.setVelocityY(-1*yDelta)
        } else if (cursors.down.isDown) {
            const [xDelta, yDelta] = calculateHeading(this.rotation, VELOCITY)
            this.setVelocityX(-1*xDelta)
            this.setVelocityY(yDelta)
        } else {
            this.setVelocityX(0)
            this.setVelocityY(0)
        }
    }

    fireBullet(bullets) {
        if (!this.canFire) {
            return
        }
        this.canFire = false
        setTimeout(() => {
            this.canFire = true
        }, BULLET_DELAY)

        const [xDelta, yDelta] = calculateHeading(this.rotation, BULLET_VELOCITY)
        
        bullets.push(new Bullet(
            this.scene, 
            this.x,
            this.y,
            xDelta,
            -1*yDelta
            )
        )
    }
}

const calculateHeading = (radians, velocity) => {
    const sine = Math.sin(radians)
    const xDelta = sine * velocity

    const cosine = Math.cos(radians)
    const yDelta = cosine * velocity

    return [xDelta, yDelta]
} 