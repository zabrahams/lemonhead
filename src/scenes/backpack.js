import Phaser from '../lib/phaser.js'
import Player from '../entities/player.js'
import BlueDot from  '../entities/pets/blueDot.js'
import PetFactory from '../entities/pets/petFactory.js'

import WorldMapButton from '../entities/worldMapButton.js'
import {CURRENCY_KEY, PETS_OWNED_STATE_KEY, ACTIVE_PET_KEY} from '../dataConstants.js'

const PET_IMAGE_X = 320
const PET_IMAGE_Y = 430
export default class Backpack extends Phaser.Scene
{
    constructor() 
    {
        super('backpack')
        this.pet = {}
    }

    preload () 
    {
        WorldMapButton.preload(this)
        Player.preload(this)

        this.load.image('backpack', 'assets/backpack.png')
    }

    create () 
    {
        this.add.image(400, 300, 'backpack')
        Player.image(this, 230, 300).setScale(4.5)
        const pet = this.registry.get(ACTIVE_PET_KEY)
        if (pet) {
            const petFactory = new PetFactory()
            const petClass = petFactory.create(pet)
            const petImage = petClass.image(this, PET_IMAGE_X, PET_IMAGE_Y).setScale(2)
            this.pet = {
                name: pet, 
                image: petImage
            }
        }        
    
        new WorldMapButton(this, 50, (this.scale.height/2), 'world_map_button')

        // currency
        const currencyStyle = { color: '#000', fontSize: 24 }
        const currentCurrency = this.registry.get(CURRENCY_KEY)
        this.add.text(82, 120, `${currentCurrency}`, currencyStyle)
            .setScrollFactor(0)
            .setOrigin(0.5, 0)    

        new PetButton(
            {
                scene: this,
                x: 506,
                y: 240,
                petClass: BlueDot,
                width: 70,
                height: 96
            }
        )
    }

    update() 
    {
        const currentPet = this.registry.get(ACTIVE_PET_KEY)
        if (currentPet === this.pet.name) {
            return
        }

        if (this.pet.image) {
            this.pet.image.destroy()
        }

        if (typeof currentPet === 'undefined') {
            this.pet = {}
            return
        }
        const petFactory = new PetFactory()
        const petClass = petFactory.create(currentPet)
        const petImage = petClass.image(this, PET_IMAGE_X, PET_IMAGE_Y).setScale(2)
        this.pet = {
            name: currentPet,
            image: petImage,
        }
    }
}

class PetButton {
    constructor({scene, x, y, petClass, width, height, debug=false}) 
    {
        this.name = petClass.name()
        this.isOwned = scene.registry.get(PETS_OWNED_STATE_KEY)[this.name]
        this.isActive = scene.registry.get(ACTIVE_PET_KEY) === this.name

        this.scene = scene

        if (!this.isOwned) {
            return // don't render the image or attach a button for unowned pets
        }

        this.button = scene.add.zone(x, y, width, height)
        if (debug) {
            this.button = scene.add.rectangle(x, y, width, height, '#FFFFFF')
        }
        petClass.image(this.scene, x, y)
        this.button.setInteractive()
        this.button.on('pointerdown', this.handleClick) 
    }


    handleClick = () => {
        this.scene.cameras.main.flash(500, 0, 255, 0)

        if (this.isActive) {
            this.scene.registry.set(ACTIVE_PET_KEY, undefined)
            this.isActive = false;
            return
        }

        this.scene.registry.set(ACTIVE_PET_KEY, this.name)
        this.isActive = true;

    }
}