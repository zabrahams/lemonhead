import Phaser from '../lib/phaser.js'
import Player from "../entities/player.js"
import Sled from "../entities/sled.js"
import WorldMapButton from '../entities/worldMapButton.js'
import BackpackButton from '../entities/backpackButton.js'

const PLAYER_START_X = 100
const PLAYER_START_Y = 450
const SLED_START_X = 400
const SLED_START_Y = 140
const SLED_DISMOUNT_MOVE_X = 100
export default class IceWorld extends Phaser.Scene
{
    /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
    cursors
    /** @type {Player} */
    player
    /** @type {Sled} */
    sled


    constructor() 
    {
        super('iceWorld')
    }


    preload ()
    {
        this.load.image('ice_world', 'assets/ice_world.png')
        this.load.image('backpack_button', 'assets/backpack_button.png')
        this.load.image('world_map_button', 'assets/world_button.png')
        this.load.image('luna', "assets/luna.png")
        this.load.image('sled', "assets/sled.png")
    }

     create ()
    {
        // set up cursor keys
        this.cursors = this.input.keyboard.createCursorKeys()

        // Set the background image
        this.add.image(400, 300, 'ice_world') 

        // Create the button to go back to the world map
        new WorldMapButton(this, 50, (this.scale.height/2)-50, 'world_map_button')
        new BackpackButton(this, 50, (this.scale.height/2)+50, 'backpack_button')
        // Create the player at their starting position
        this.player = new Player(this, PLAYER_START_X, PLAYER_START_Y, 'luna')
        
        // Create the sled at the starting position
        this.sled = new Sled(this, SLED_START_X, SLED_START_Y, 'sled', this.scale.width-10)
  
        // Set up the overlap for the player and sled
        this.physics.add.overlap(this.player, this.sled, function () {
            this.player.enterVehicle(this.sled)
            this.sled.startSlide()
        }, undefined, this)
    }


     update ()
    {
        /**
         * if the player has completed the sled ride, dismount her from the sled
         * making sure to move her a reasonable distance away
         */
        if (this.player.vehicle == this.sled && this.player.x >= this.scale.width-40-(this.player.displayWidth/2)) {
            this.player.y += SLED_DISMOUNT_MOVE_X
            this.player.exitVehicle()
        }

        // update all objects in the scene
        this.player.update(this.cursors)
        this.sled.update()
    }
}
