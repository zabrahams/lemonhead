import Player from "./lib/player.js";
import Sled from "./lib/sled.js";

export default class Main {
    constructor() {
        var config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
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


            player = new Player(this.physics, 100, 450, 'luna');
            sled = new Sled(this.physics, 400, 140, 'sled')
            window.player = player
            this.physics.add.overlap(player.sprite, sled.sprite, function () {
                player.enterVehicle(sled)
                sled.startSlide()
            }, null, this)
        }


        function update ()
        {
            var cursors = this.input.keyboard.createCursorKeys();
            if (player.vehicle == sled && player.sprite.x >= 700) {
                player.sprite.y += 100;
                player.exitVehicle();
            }
            player.update(cursors)
            sled.update()
        }
    }
}