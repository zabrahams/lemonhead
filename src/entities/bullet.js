const BOUNCE = 0.2
const TEXTURE='bullet'
const TEXTURE_ASSET='assets/bullet.png'

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     */
    constructor(scene, x, y, xDelta, yDelta) {
       super(scene, x, y, TEXTURE)

        setup(this, scene, xDelta, yDelta)
    }

    static addToGroup(bullets, x, y, xDelta, yDelta) {
        const bullet = bullets.getFirstDead(true, x, y, TEXTURE)

        setup(bullet, bullets.scene, xDelta, yDelta)

        return bullet
    }

    /**
     * 
     * @param {scene} Phaser.Scene
     */
    static  preload(scene) {
        scene.load.image(TEXTURE, TEXTURE_ASSET)
    }
}

function setup(bullet, scene, xDelta, yDelta) {
    bullet.setVisible(true)
    bullet.setActive(true)
    scene.add.existing(bullet)

    scene.physics.world.enable(bullet)        

    // Set the player physics properties
    bullet.setBounce(BOUNCE)
    bullet.setCollideWorldBounds(false)

    bullet.setVelocityX(xDelta)
    bullet.setVelocityY(yDelta)
}
