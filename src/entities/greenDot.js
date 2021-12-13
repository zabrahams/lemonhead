const TEXTURE='greenDot'
const TEXTURE_ASSET='assets/green_dot.png'

export default class GreenDot extends Phaser.Physics.Arcade.Sprite {

    static preload(scene) {
        scene.load.image(TEXTURE, TEXTURE_ASSET)
    }

    static image(scene, x, y) {
        return scene.add.image(x, y, TEXTURE)
    }
}