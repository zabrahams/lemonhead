import Phaser from '../lib/phaser.js'
import NavBar, {preloadNavBar} from '../entities/navBar.js'

export default class Hospital extends Phaser.Scene
{

    constructor() 
    {
        super('hospital')
    }


    preload ()
    {
        this.load.image('hospital', 'assets/hospital.png')
        preloadNavBar(this)
    }

     create ()
    {
        // set up cursor keys
        this.cursors = this.input.keyboard.createCursorKeys()

        // Set the background image
        this.add.image(400, 300, 'hospital') 

        // Create the nav bar
        new NavBar(this, 50, this.scale.height/2)

    }
}
