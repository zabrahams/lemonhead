const PLAYER_DELTA = 30

export default class Pet extends Phaser.Physics.Arcade.Sprite {
     /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     */
      constructor(scene, playerX, playerY, texture) {
        const x = playerX + PLAYER_DELTA
        const y = playerY + PLAYER_DELTA

        super(scene, x, y, texture)
        this.hidden = false
        scene.add.existing(this)
        scene.physics.add.existing(this)
      }

      update(playerX, playerY) {
          this.x = playerX + PLAYER_DELTA
          this.y = playerY + PLAYER_DELTA
      }

      hide(scene) {
          this.setVisible(false)
      }

      unhide(scene) {
        this.setVisible(true)
    }
}