import Phaser from '../lib/phaser.js'
import Player from "../entities/player.js"
import NavBar from '../entities/navBar.js'

import Door from '../entities/door.js'


const PLAYER_START_X = 400
const PLAYER_START_Y = 750

export default class BuyTwice extends Phaser.Scene
{
    /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
    cursors
    /** @type {Player} */
    player



    constructor() 
    {
        super('buyTwice')
    }


    preload ()
    {
        this.load.image('buyTwice', 'assets/buy_twice.png')
        NavBar.preload(this)
        Player.preload(this)
    }

     create ()
    {
        // set up cursor keys
        this.cursors = this.input.keyboard.createCursorKeys()

        // Set the background image
        this.add.image(400, 300, 'buyTwice') 

        // Create the nav bar
        new NavBar(this, 50, this.scale.height/2)

        // Create the player at their starting position
        this.player = new Player(this, PLAYER_START_X, PLAYER_START_Y)

        // kitchen door
        new Door(this, 734, 420, 30, 60, this.player, 'kitchen')

          // hospital door
          new Door(this, 480, 440, 40, 80, this.player, 'hospital')

          // store door
          new Door(this, 190, 470, 40, 70, this.player, 'store')
    }


     update ()
    {
        // update all objects in the scene
        this.player.update(this.cursors)
    }
}
