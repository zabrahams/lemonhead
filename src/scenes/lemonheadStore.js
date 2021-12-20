import Phaser from '../lib/phaser.js'
import NavBar from '../entities/navBar.js'
import { 
    REINFORCEMENT_PURCHASES_KEY, 
    MAX_LIVES_KEY,
    CURRENCY_KEY
} from '../dataConstants.js'


const COST_PER_LEMONHEAD = 100
const CURRENCY_STYLE = { color: '#000', fontSize: 24 }


const getText = (scene, i) => {
    if (scene.registry.get(REINFORCEMENT_PURCHASES_KEY)[i]) {
        return "SOLD!"
    } 

    return `${COST_PER_LEMONHEAD*(i+1)} dots`
}
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

        new PurchaseButton(
            {
                scene: this, 
                i: 0,
                x: 610, 
                y: 80, 
                height: 160, 
                width: 180, 
                textX: 560, 
                textY: 0
            })

        new PurchaseButton(
            {
                scene: this, 
                i: 1,
                x: 750, 
                y: 70, 
                height: 140, 
                width: 90, 
                textX: 700, 
                textY: 0
            })
        

        new PurchaseButton(
            {
                scene: this, 
                i: 2,
                x: 120, 
                y: 90, 
                height: 180, 
                width: 240, 
                textX: 120, 
                textY: 0
            })
        
        
        new PurchaseButton(
            {
                scene: this, 
                i: 3,
                x: 380, 
                y: 80, 
                height: 160, 
                width: 250, 
                textX: 380, 
                textY: 0,
            })
    }
}

class PurchaseButton {
  
    constructor({scene, i, x, y, width, height, textX, textY})
    {
        this.isPurchased = scene.registry.get(REINFORCEMENT_PURCHASES_KEY)[i]
        this.cost = (i+1)*COST_PER_LEMONHEAD

        this.i = i
        this.scene = scene

        this.priceText = scene.add.text(textX, textY, this.createText(), CURRENCY_STYLE)
        this.button = scene.add.zone(x, y, width, height)
        this.button.setInteractive()
        this.button.on('pointerdown', this.handleClick)
    }

    handleClick = () => {
        if (this.isPurchased) {
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
        
        const maxLives = this.scene.registry.get(MAX_LIVES_KEY)
        this.scene.registry.set(MAX_LIVES_KEY, maxLives + this.i + 1)

        const currentPurchases = this.scene.registry.get(REINFORCEMENT_PURCHASES_KEY)
        currentPurchases[this.i] = true
        this.scene.registry.set(REINFORCEMENT_PURCHASES_KEY, currentPurchases)

        this.isPurchased = true
        this.priceText.text = this.createText()
    }

    createText = () => {
        if (this.isPurchased) {
            return "SOLD!"
        } 
    
        return `${this.cost} dots`
    }
}