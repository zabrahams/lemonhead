import Player from "./lib/player.js";
import Sled from "./lib/sled.js";

const WINDOW_WIDTH = 800;
const WINDOW_HEIGHT = 600;

const PLAYER_START_X = 100;
const PLAYER_START_Y = 450;
const SLED_START_X = 400;
const SLED_START_Y = 140;
const SLED_DISMOUNT_MOVE_X = 100;

export default class Main {
    constructor() {
        var config = {
            type: Phaser.AUTO,
            width: WINDOW_WIDTH,
            height: WINDOW_HEIGHT,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: false,
                }   
            },
            scene: {
                preload: preload,
                create: create,
                update: update
            }
        };

        var game = new Phaser.Game(config);
        var player, sled

        function preload ()
        {
            this.load.image('ice_world', 'assets/ice_world.png');
            this.load.image('luna', "assets/luna.png");
            this.load.image('sled', "assets/sled.png");
        }

        function create ()
        {
            this.add.image(400, 300, 'ice_world'); 


            player = new Player(this.physics, PLAYER_START_X, PLAYER_START_Y, 'luna');
            sled = new Sled(this.physics, SLED_START_X, SLED_START_Y, 'sled', null, WINDOW_WIDTH-10)
            window.player = player
            this.physics.add.overlap(player.sprite, sled.sprite, function () {
                player.enterVehicle(sled)
                sled.startSlide()
            }, null, this)
        }


        function update ()
        {
            var cursors = this.input.keyboard.createCursorKeys();
            if (player.vehicle == sled && player.sprite.x >= WINDOW_WIDTH-40-(player.sprite.width/2)) {
                player.sprite.y += SLED_DISMOUNT_MOVE_X;
                player.exitVehicle();
            }
            player.update(cursors)
            sled.update()
        }
    }
}