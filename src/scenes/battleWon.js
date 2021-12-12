import Phaser from '../lib/phaser.js'
import NavBar from '../entities/navBar.js'


export default class BattleWon extends Phaser.Scene
{

    constructor()
    {
        super('battleWon')
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
            "You won the difficult battle because you're totally awesome",
            winTextStyle).setWordWrapWidth(400)
    }
}