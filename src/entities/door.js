import Phaser from "../lib/phaser.js";

export default class Door extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, width, height, player, sceneName) {
        super(scene, x , y, width, height)
        scene.physics.add.existing(this)

        scene.physics.add.overlap(player, this, function() {
            scene.scene.start(sceneName)
        }, undefined, scene)
    }
}