import Phaser from '../lib/phaser.js'
import NavBar from '../entities/navBar.js'
import { 
    CURRENCY_KEY
} from '../dataConstants.js'

const COST = 5
export default class Kitchen extends Phaser.Scene
{

    constructor() 
    {
        super('kitchen')
    }


    preload ()
    {
        this.load.image('kitchen', 'assets/kitchen.png')
        this.load.audio('numNum', 'assets/num_num.m4a')

        NavBar.preload(this)
    }

     create ()
    {
        // set up cursor keys
        this.cursors = this.input.keyboard.createCursorKeys()

        // Set the background image
        this.add.image(400, 300, 'kitchen')
        this.eatSound = this.sound.add('numNum') 

        // Create the nav bar
        new NavBar(this, 50, this.scale.height/2)

        const buyButton = this.add.zone(400, 310, 300, 220, "#fff")
        buyButton.setInteractive()
        buyButton.on('pointerdown', () => {
            const currency = this.registry.get(CURRENCY_KEY)

            if (currency < COST) {
                this.cameras.main.flash(500, 255, 0 , 0)
                return
            }
    
            this.cameras.main.flash(1000)
            this.eatSound.play()
            this.registry.set(CURRENCY_KEY, currency - COST)
        })
    }
}
