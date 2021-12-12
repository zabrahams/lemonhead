import Phaser from '../lib/phaser.js'
import NavBar from '../entities/navBar.js'


export default class BattleLost extends Phaser.Scene
{

    constructor()
    {
        super('battleLost')
    }

    preload () 
    {
        NavBar.preload(this)
    }

    create ()
    {
        new NavBar(this, 50, this.scale.height/2)
        const winTextStyle = { color: '#FFF', fontSize: 36, align: "center" }
        this.add.text(
            240, 
            240,
            "You were defeated and turned grey. Better luck next time!",
            winTextStyle).setWordWrapWidth(400)
    }
}