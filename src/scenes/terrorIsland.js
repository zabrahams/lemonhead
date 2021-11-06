import Phaser from '../lib/phaser.js'
import Player, {preloadPlayer} from "../entities/player.js"
import NavBar, {preloadNavBar} from '../entities/navBar.js'

const PLAYER_START_X = 100
const PLAYER_START_Y = 450

export default class TerrorIsland extends Phaser.Scene
{
    /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
    cursors
    /** @type {Player} */
    player



    constructor() 
    {
        super('terrorIsland')
    }


    preload ()
    {
        this.load.image('terrorIsland', 'assets/terror_island.png')
        preloadNavBar(this)
        preloadPlayer(this)
    }

     create ()
    {
        // set up cursor keys
        this.cursors = this.input.keyboard.createCursorKeys()

        // Set the background image
        this.add.image(400, 300, 'terrorIsland') 

        // Create the nav bar
        new NavBar(this, 50, this.scale.height/2)

        // Create the player at their starting position
        this.player = new Player(this, PLAYER_START_X, PLAYER_START_Y)
    }


     update ()
    {
        // update all objects in the scene
        this.player.update(this.cursors)
    }
}
