import WorldMapButton, {preloadWorldMapButton} from '../entities/worldMapButton.js'
import BackpackButton, {preloadBackpackButton} from '../entities/backpackButton.js'

/**
 * 
 * @param {scene} Phaser.Scene 
 */
 export function preloadNavBar(scene) {
    preloadWorldMapButton(scene)
    preloadBackpackButton(scene)
} 

export default class NavBar {
    constructor(scene, x, y) {
        new WorldMapButton(scene, x, y-50)
        new BackpackButton(scene, x, y+50)
    }
}