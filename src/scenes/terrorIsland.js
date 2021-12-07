import Phaser from '../lib/phaser.js'
import NavBar from '../entities/navBar.js'
import Lemonhead from '../entities/lemonhead.js'
import Corona from '../entities/corona.js'
import Bullet from "../entities/bullet.js"

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

const FLASH_DURATION = 1000
const FLASH_RED = 200


export default class TerrorIsland extends Phaser.Scene
{

    constructor() 
    {
        super('terrorIsland')
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
               this.livesText.text = `x   ${this.lives}`
               setTimeout(() => {
                   this.immune = false
               }, IMMUNITY_LENGTH)
            },
            undefined,
            this
        )

        this.bullets = this.physics.add.group({
            classType: Bullet
        })

        this.physics.add.overlap(
            this.corona,
            this.bullets,
            () => {
                alert("you win")
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
            this.lemonhead.fireBullet(this.bullets)
        }
        
        this.bullets.children.iterate(bullet => {
            if (!inPlayArea(bullet.x, bullet.y)) {
                this.bullets.killAndHide(bullet)
            }
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