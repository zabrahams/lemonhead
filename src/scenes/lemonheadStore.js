import Phaser from '../lib/phaser.js'
import NavBar from '../entities/navBar.js'

export default class LemonheadStore extends Phaser.Scene
{

    constructor() 
    {
        super('lemonheadStore')
    }


    preload ()
    {
        this.load.image('store', 'assets/reinforcements.png')
        NavBar.preload(this)
    }

     create ()
    {
        // set up cursor keys
        this.cursors = this.input.keyboard.createCursorKeys()

        // Set the background image
        this.add.image(400, 300, 'store') 

        // Create the nav bar
        new NavBar(this, 50, this.scale.height/2)

    }
}
