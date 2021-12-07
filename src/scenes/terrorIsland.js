import Phaser from '../lib/phaser.js'
import NavBar from '../entities/navBar.js'
import Lemonhead from '../entities/lemonhead.js'
import Corona from '../entities/corona.js'

const LEMONHEAD_START_X = 400
const LEMONHEAD_START_Y = 200

const CORONA_START_X = 300
const CORONA_START_Y = 220

const PLAY_AREA_TOP = 94
const PLAY_AREA_BOTTOM = 400
const PLAY_AREA_HEIGHT =  PLAY_AREA_BOTTOM - PLAY_AREA_TOP

const PLAY_AREA_RIGHT = 628
const PLAY_AREA_LEFT = 170
const PLAY_AREA_WIDTH = PLAY_AREA_RIGHT - PLAY_AREA_LEFT

const IMMUNITY_LENGTH = 2000

const FLASH_DURATION = 1000
const FLASH_RED = 200


export default class TerrorIsland extends Phaser.Scene
{

    constructor() 
    {
        super('terrorIsland')
        this.bullets = []
        this.lives = 5
        this.immune = false
    }


    preload ()
    {
        this.load.image('terrorIsland', 'assets/terror_island.png')
        NavBar.preload(this)
        Lemonhead.preload(this)
        Corona.preload(this)
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
        this.corona = new Corona(this, CORONA_START_X, CORONA_START_Y)


        this.bullets = []

        this.physics.add.overlap(
            this.lemonhead,
            this.corona,
            () => {
               if (this.immune) {
                   return
               }

               this.flash()
               this.lives--
               if (this.lives < 0) {
                   alert("boom")
               }
               this.immune = true
               setTimeout(() => {
                   this.immune = false
               }, IMMUNITY_LENGTH)
            },
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
            const newBullet = this.lemonhead.fireBullet(this.bullets)
            if (newBullet) {
                this.bullets.push(newBullet)
            }
        }

        this.bullets = this.bullets.filter(bullet => {
            const inArea = (inPlayArea(bullet.x, bullet.y))
            if (!inArea) {
                bullet.destroy(true)
            }

            return inArea
        })

    }

    flash () {
        this.cameras.main.flash(FLASH_DURATION, FLASH_RED)
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