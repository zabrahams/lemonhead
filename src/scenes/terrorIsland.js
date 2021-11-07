import Phaser from '../lib/phaser.js'
import NavBar, {preloadNavBar} from '../entities/navBar.js'



export default class TerrorIsland extends Phaser.Scene
{

    constructor() 
    {
        super('terrorIsland')
    }


    preload ()
    {
        this.load.image('terrorIsland', 'assets/terror_island.png')
        preloadNavBar(this)
    }

     create ()
    {
        // set up cursor keys
        this.cursors = this.input.keyboard.createCursorKeys()

        // Set the background image
        this.add.image(400, 300, 'terrorIsland') 

        // Create the nav bar
        new NavBar(this, 50, this.scale.height/2)

    }


     update ()
    {
    }
}
