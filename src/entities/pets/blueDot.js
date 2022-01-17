import Pet from "./pet.js"

const TEXTURE='blueDot'
const TEXTURE_ASSET='assets/pets/blue_dot.png'

export default class BlueDot extends Pet {
    constructor(scene, playerX, playerY) {
        super(scene, playerX, playerY, TEXTURE)
    }

    static preload(scene) {
        scene.load.image(TEXTURE, TEXTURE_ASSET)
    }
}