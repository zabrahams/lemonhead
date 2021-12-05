import Phaser from '../lib/phaser.js'
import NavBar, {preloadNavBar} from '../entities/navBar.js'
import Lemonhead, { preloadLemonhead } from '../entities/lemonhead.js'

const LEMONHEAD_START_X = 400
const LEMONHEAD_START_Y = 200

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
        preloadLemonhead(this)
    }

     create ()
    {
        // set up cursor keys
        this.cursors = this.input.keyboard.createCursorKeys()

        // Set the background image
        this.add.image(400, 300, 'terrorIsland') 

        // Create the nav bar
        new NavBar(this, 50, this.scale.height/2)
        this.lemonhead = new Lemonhead(this, LEMONHEAD_START_X, LEMONHEAD_START_Y)
    }


     update ()
    {
        this.lemonhead.update(this.cursors)
    }
}
