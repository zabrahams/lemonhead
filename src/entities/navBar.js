import WorldMapButton from '../entities/worldMapButton.js'
import BackpackButton from '../entities/backpackButton.js'

export default class NavBar {
    constructor(scene, x, y) {
        new WorldMapButton(scene, x, y-50)
        new BackpackButton(scene, x, y+50)
    }

    /**
     * 
     * @param {scene} Phaser.Scene 
     */
    static preload(scene) {
        WorldMapButton.preload(scene)
        BackpackButton.preload(scene)
    } 
}