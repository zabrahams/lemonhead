import Phaser from '../lib/phaser.js'
import NavBar from '../entities/navBar.js'
import {IS_GREY_KEY} from '../dataConstants.js'

const FLASH_DURATION = 1000
export default class Hospital extends Phaser.Scene
{

     /** @type {Phaser.GameObjects.Zone} */
     hospitalBedButton

    constructor() 
    {
        super('hospital')
    }


    preload ()
    {
        this.load.image('hospital', 'assets/hospital.png')
        NavBar.preload(this)
    }

     create ()
    {
        // set up cursor keys
        this.cursors = this.input.keyboard.createCursorKeys()

        // Set the background image
        this.add.image(400, 300, 'hospital') 

        // Create the nav bar
        new NavBar(this, 50, this.scale.height/2)

        // Add the clickable area for clicking on the hospital bed
        this.hospitalBedButton = this.add.zone(470, 374, 274, 150)
        this.hospitalBedButton.setInteractive() 
        this.hospitalBedButton.on('pointerdown', () => {
            this.registry.set(IS_GREY_KEY, false)
            this.cameras.main.flash(FLASH_DURATION)
        })

    }
}
