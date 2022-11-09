import Phaser from '../lib/phaser.js'
import NavBar from '../entities/navBar.js'
import { 
    PETS_OWNED_STATE_KEY,
    CURRENCY_KEY,
} from '../dataConstants.js'
const PURCHASED_STYLE = { color: '#AAA', fontSize: 48 }

export default class Store extends Phaser.Scene
{

    constructor() 
    {
        super('store')
    }


    preload ()
    {
        this.load.image('buyNice', 'assets/buy_nice.png')
        NavBar.preload(this)
    }

     create ()
    {
        // set up cursor keys
        this.cursors = this.input.keyboard.createCursorKeys()

        // Set the background image
        this.add.image(400, 300, 'buyNice') 

        // Create the nav bar
        new NavBar(this, this.scale.width-100, this.scale.height/2 + 100)

        new PurchaseButton(
            {
                scene: this, 
                name: 'blueDot',
                cost: 3,
                x: 490, 
                y: 230, 
                width: 180, 
                height: 120, 
                debug: false 
            }
        )
    }
}

class PurchaseButton {
    
    constructor({scene, name, cost, x, y, width, height, debug=false})
    {
        this.scene = scene
        this.name = name
        this.cost = cost
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.button = this.scene.add.zone(x, y, width, height)
        this.button.setInteractive()
        this.button.on('pointerdown', this.handleClick)
        if (debug) {
            scene.add.rectangle(x, y, width, height)
        }
        

        const petsOwnedState = this.scene.registry.get(PETS_OWNED_STATE_KEY)
        this.isOwned = petsOwnedState[name]
        // if purchased cross stamp SOLD on it
        if (this.isOwned) {
            this.markAsSold()
        } 
    }

    handleClick = () => {
        if (this.isOwned) {
            this.scene.cameras.main.flash(500, 255, 255 , 0)
            return
        }

        const currentDots = this.scene.registry.get(CURRENCY_KEY)
        if (currentDots < this.cost) {
            this.scene.cameras.main.flash(500, 255, 0 , 0)
            return
        }
    
        this.scene.cameras.main.flash(500, 0, 255, 0)
        this.scene.registry.set(CURRENCY_KEY, currentDots - this.cost)
        const petsOwnedState = this.scene.registry.get(PETS_OWNED_STATE_KEY)
        petsOwnedState[this.name] = true;
        this.scene.registry.set(PETS_OWNED_STATE_KEY, petsOwnedState);
        this.isOwned = true
        this.markAsSold()

    }

    markAsSold = () => {
        this.scene.add.text(this.x - (this.width/4), this.y - (this.height/4), 'SOLD', PURCHASED_STYLE)
    }
}