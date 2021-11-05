import Phaser from '../lib/phaser.js'
import Player, {preloadPlayer} from '../entities/player.js'
import Sled, {preloadSled} from '../entities/sled.js'
import NavBar, {preloadNavBar} from '../entities/navBar.js'

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
        preloadNavBar(this)
        preloadPlayer(this)
        preloadSled(this)
    }

     create ()
    {
        // set up cursor keys
        this.cursors = this.input.keyboard.createCursorKeys()

        // Set the background image
        this.add.image(400, 300, 'ice_world') 

        // Create the nav bar
        new NavBar(this, 50, this.scale.height/2)

        // Create the player at their starting position
        this.player = new Player(this, PLAYER_START_X, PLAYER_START_Y)
        
        // Create the sled at the starting position
        this.sled = new Sled(this, SLED_START_X, SLED_START_Y, this.scale.width-10)
  
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
