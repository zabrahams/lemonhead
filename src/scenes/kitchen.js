import Phaser from '../lib/phaser.js'
import NavBar, {preloadNavBar} from '../entities/navBar.js'



export default class Kitchen extends Phaser.Scene
{

    constructor() 
    {
        super('kitchen')
    }


    preload ()
    {
        this.load.image('kitchen', 'assets/kitchen.png')
        preloadNavBar(this)
    }

     create ()
    {
        // set up cursor keys
        this.cursors = this.input.keyboard.createCursorKeys()

        // Set the background image
        this.add.image(400, 300, 'kitchen') 

        // Create the nav bar
        new NavBar(this, 50, this.scale.height/2)

    }


     update ()
    {
    }
}
