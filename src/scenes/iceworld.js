import Phaser from '../lib/phaser.js'
import Player from "../entities/player.js";
import Sled from "../entities/sled.js";

const PLAYER_START_X = 100;
const PLAYER_START_Y = 450;
const SLED_START_X = 400;
const SLED_START_Y = 140;
const SLED_DISMOUNT_MOVE_X = 100;


const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 600;
export default class IceWorld extends Phaser.Scene
{

    /** @type {Player} */
    player
    /** @type {Sled} */
    sled


    constructor() 
    {
        super('iceworld')
    }


    preload ()
    {
        this.load.image('ice_world', 'assets/ice_world.png');
        this.load.image('luna', "assets/luna.png");
        this.load.image('sled', "assets/sled.png");
    }

     create ()
    {
        this.add.image(400, 300, 'ice_world'); 


        this.player = new Player(this.physics, PLAYER_START_X, PLAYER_START_Y, 'luna');
        this.sled = new Sled(this.physics, SLED_START_X, SLED_START_Y, 'sled', null, WINDOW_WIDTH-10)
        this.physics.add.overlap(this.player.sprite, this.sled.sprite, function () {
            this.player.enterVehicle(this.sled)
            this.sled.startSlide()
        }, null, this)
    }


     update ()
    {
        var cursors = this.input.keyboard.createCursorKeys();
        if (this.player.vehicle == this.sled && this.player.sprite.x >= WINDOW_WIDTH-40-(this.player.sprite.width/2)) {
            this.player.sprite.y += SLED_DISMOUNT_MOVE_X;
            this.player.exitVehicle();
        }
        this.player.update(cursors)
        this.sled.update()
    }
}
