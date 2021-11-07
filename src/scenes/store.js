import Phaser from '../lib/phaser.js'
import NavBar, {preloadNavBar} from '../entities/navBar.js'

export default class Store extends Phaser.Scene
{

    constructor() 
    {
        super('store')
    }


    preload ()
    {
        // this.load.image('store', 'assets/store.png')
        preloadNavBar(this)
    }

     create ()
    {
        // set up cursor keys
        this.cursors = this.input.keyboard.createCursorKeys()

        // Set the background image
        // this.add.image(400, 300, 'store') 

        // Create the nav bar
        new NavBar(this, 50, this.scale.height/2)

    }
}
