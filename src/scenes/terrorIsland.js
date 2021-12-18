import Phaser from '../lib/phaser.js'
import NavBar from '../entities/navBar.js'
import Lemonhead from '../entities/lemonhead.js'
import Corona from '../entities/corona.js'
import Bullet from "../entities/bullet.js"
import GreenDot from "../entities/greenDot.js"

import {CURRENCY_KEY, IS_GREY_KEY} from '../dataConstants.js'

const LEMONHEAD_START_X = 400
const LEMONHEAD_START_Y = 200

const CORONA_START_X = 300
const CORONA_START_Y = 220

const LEMONHEAD_LIVES_IMAGE_X = 340
const LEMONHEAD_LIVES_IMAGE_Y  = 500
const LEMONHEAD_LIVES_TEXT_X = 400
const LEMONHEAD_LIVES_TEXT_Y  = 484


const PLAY_AREA_TOP = 94
const PLAY_AREA_BOTTOM = 400
const PLAY_AREA_HEIGHT = PLAY_AREA_BOTTOM - PLAY_AREA_TOP

const PLAY_AREA_RIGHT = 628
const PLAY_AREA_LEFT = 170
const PLAY_AREA_WIDTH = PLAY_AREA_RIGHT - PLAY_AREA_LEFT

const IMMUNITY_LENGTH = 2000

const FLASH_DURATION = 500
const FLASH = 150

const MAX_CORONAS = 10

export default class TerrorIsland extends Phaser.Scene
{

    constructor() 
    {
        super('terrorIsland')
        this.immune = false
    }


    preload ()
    {
        this.load.image('terrorIsland', 'assets/terror_island.png')
        NavBar.preload(this)
        Lemonhead.preload(this)
        Corona.preload(this)
        GreenDot.preload(this)
    }

     create ()
    {
        this.lives = 5
        this.currentCoronas = 0
        
        // set up cursor keys
        this.cursors = this.input.keyboard.createCursorKeys()

        // Set the background image
        this.add.image(400, 300, 'terrorIsland') 

        // Set up the lives bar
        Lemonhead.image(this, LEMONHEAD_LIVES_IMAGE_X, LEMONHEAD_LIVES_IMAGE_Y)
        const livesStyle = { color: '#fff', fontSize: 24 }
        this.livesText = this.add.text(LEMONHEAD_LIVES_TEXT_X, LEMONHEAD_LIVES_TEXT_Y, `x   ${this.lives}`, livesStyle)
            .setScrollFactor(0)

        // Create the nav bar
        new NavBar(this, 50, this.scale.height/2)
        this.lemonhead = new Lemonhead(this, LEMONHEAD_START_X, LEMONHEAD_START_Y)
        this.corona = new Corona(this, CORONA_START_X, CORONA_START_Y)

        this.physics.add.overlap(
            this.lemonhead,
            this.corona,
            coronaHitsLemon(this),
            undefined,
            this
        )
        this.greenDots = []
        createGreenDots(this)
        
        this.bullets = this.physics.add.group({
            classType: Bullet
        })

        this.physics.add.overlap(
            this.corona,
            this.bullets,
            shootCorona(this),
            undefined,
            this
        )
    }


     update ()
    {
        this.lemonhead.update(this.cursors)
        wrapSprite(this.lemonhead)
        wrapSprite(this.corona)

        if (this.cursors.space.isDown) {
            this.lemonhead.fireBullet(this.bullets)
        }
        
        this.bullets.children.iterate(bullet => {
            if (!inPlayArea(bullet.x, bullet.y)) {
                this.bullets.killAndHide(bullet)
            }
        })
    }

    flashRed () {
        this.cameras.main.flash(FLASH_DURATION, FLASH, 0, 0)
    }

    flashGreen() {
        this.cameras.main.flash(FLASH_DURATION, 0, FLASH, 0)
    }
}

function createGreenDots(scene) {
    for (let i = 0; i < 10; i = i+2) {
        const leftDot = GreenDot.image(scene, 700, ((scene.scale.height/12)*i)+100)
        leftDot.setVisible(false)
        scene.greenDots.push(leftDot)
        const rightDot = GreenDot.image(scene, 750, ((scene.scale.height/12)*i)+100) 
        rightDot.setVisible(false)
        scene.greenDots.push(rightDot)
    }
}

function shootCorona(scene) {
    return () => {
        scene.flashGreen()
        scene.greenDots[scene.currentCoronas].setVisible(true)
        const currentDots = scene.registry.get(CURRENCY_KEY)
        scene.registry.set(CURRENCY_KEY, currentDots + 1)

        scene.immune = true
        setTimeout(() => {
            scene.immune = false
        }, IMMUNITY_LENGTH/4)

        scene.currentCoronas++
        if (scene.currentCoronas === MAX_CORONAS) {
            scene.scene.start('battleWon')
        }
        scene.physics.world.disable(scene.corona)

        const [startX, startY] = coronaStart()
        scene.corona.reset(scene, startX, startY)
    }
}

function coronaStart() {
    const x = Math.random() * PLAY_AREA_WIDTH + PLAY_AREA_LEFT
    const y = Math.random() * PLAY_AREA_HEIGHT + PLAY_AREA_TOP
    return [x, y]
}

function coronaHitsLemon(scene) {
    return () => {
        if (scene.immune) {
            return
        }

        scene.flashRed()
        scene.lives--
        if (scene.lives <= 0) {
            scene.registry.set(IS_GREY_KEY, true)
            scene.scene.start('battleLost')
        }
        scene.immune = true
        scene.livesText.text = `x   ${scene.lives}`
        setTimeout(() => {
            scene.immune = false
        }, IMMUNITY_LENGTH)
     }
}

function wrapSprite(sprite) {
    if (sprite.x < PLAY_AREA_LEFT) {
        sprite.setX(sprite.x + PLAY_AREA_WIDTH)
    } else if (sprite.x > PLAY_AREA_RIGHT) {
        sprite.setX(sprite.x - PLAY_AREA_WIDTH)
    }

    if (sprite.y < PLAY_AREA_TOP) {
        sprite.setY(sprite.y + PLAY_AREA_HEIGHT)
    } else if (sprite.y > PLAY_AREA_BOTTOM) {
        sprite.setY(sprite.y - PLAY_AREA_HEIGHT)
    }
}

function inPlayArea(x, y) {
    return (
        x > PLAY_AREA_LEFT &&
        x < PLAY_AREA_RIGHT &&
        y > PLAY_AREA_TOP &&
        y < PLAY_AREA_BOTTOM
    )
}