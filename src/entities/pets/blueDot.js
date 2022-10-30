import Pet from "./pet.js"

const TEXTURE='blueDot'
const TEXTURE_ASSET='assets/pets/blue_dot.png'

export default class BlueDot extends Pet {
    constructor(scene, playerX, playerY) {
        super(scene, playerX, playerY, TEXTURE)
        this.name = TEXTURE;
    }

    static preload(scene) {
        scene.load.image(TEXTURE, TEXTURE_ASSET)
    }

    static image(scene, x, y) {
        return (scene.add.image(x, y, TEXTURE))
    }

    static name() {
        return TEXTURE
    }
}