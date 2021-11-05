import Phaser from '../lib/phaser.js'
import Player from "../entities/player.js"
import WorldMapButton from '../entities/worldMapButton.js'
import BackpackButton from '../entities/backpackButton.js'

const PLAYER_START_X = 100
const PLAYER_START_Y = 450

export default class Shinya extends Phaser.Scene
{
    /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
    cursors
    /** @type {Player} */
    player



    constructor() 
    {
        super('shinya')
    }


    preload ()
    {
        this.load.image('shinya', 'assets/shinya.png')
        this.load.image('backpack_button', 'assets/backpack_button.png')
        this.load.image('world_map_button', 'assets/world_button.png')
        this.load.image('luna', "assets/luna.png")
    }

     create ()
    {
        // set up cursor keys
        this.cursors = this.input.keyboard.createCursorKeys()

        // Set the background image
        this.add.image(400, 300, 'shinya') 

        // Create the button to go back to the world map
        new WorldMapButton(this, 50, (this.scale.height/2)-50, 'world_map_button')
        new BackpackButton(this, 50, (this.scale.height/2)+50, 'backpack_button')
        // Create the player at their starting position
        this.player = new Player(this, PLAYER_START_X, PLAYER_START_Y, 'luna')
    }


     update ()
    {
        // update all objects in the scene
        this.player.update(this.cursors)
    }
}
