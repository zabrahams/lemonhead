import Phaser from '../lib/phaser.js'
import Player from "../entities/player.js"
import NavBar from '../entities/navBar.js'
import Door from '../entities/door.js'


const PLAYER_START_X = 100
const PLAYER_START_Y = 450

export default class LemonGlue extends Phaser.Scene
{
    /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
    cursors
    /** @type {Player} */
    player



    constructor() 
    {
        super('lemonGlue')
    }


    preload ()
    {
        this.load.image('lemonGlue', 'assets/lemon_glue.png')
        NavBar.preload(this)
        Player.preload(this)
    }

     create ()
    {
        // set up cursor keys
        this.cursors = this.input.keyboard.createCursorKeys()

        // Set the background image
        this.add.image(400, 300, 'lemonGlue') 

        // Create the nav bar
        new NavBar(this, 50, this.scale.height/2)

        // Create the player at their starting position
        this.player = new Player(this, PLAYER_START_X, PLAYER_START_Y)

        // Lemon glue door
        new Door(this, 374, 340, 80, 60, this.player, 'lemonheadStore')
    }


     update ()
    {
        // update all objects in the scene
        this.player.update(this.cursors)
    }
}


