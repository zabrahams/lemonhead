const VELOCITY = 160;
const BOUNCE = 0.2

export default class Player {
    constructor(factory, x, y, key, frame) {
        this.sprite = factory.add.sprite(x, y, key, frame);
        this.sprite.setBounce(BOUNCE);
        this.sprite.setCollideWorldBounds(true);
    };

    update(cursors) {
        if (this.vehicle != null) {
            this.moveWithVehicle();
        } else {
            this.moveSelf(cursors);
        }
    };

    enterVehicle(vehicle) {
        this.vehicle = vehicle;
    };

    exitVehicle() {
        this.vehicle = null;
    };

    moveWithVehicle() {
        if (this.vehicle == null) {
            return 
        }

        this.sprite.x = this.vehicle.sprite.x;
        this.sprite.y = this.vehicle.sprite.y;
    }


    moveSelf(cursors) {
        if (cursors.left.isDown)
        {
            this.moveLeft()
        }
        else if (cursors.right.isDown)
        {
            this.moveRight()
        }
        else
        {
            this.stopX()
        }

        if (cursors.up.isDown)
        {
            this.moveUp()
        }
        else if (cursors.down.isDown)
        {
            this.moveDown();
        }
        else 
        {
            this.stopY();
        }
    };


    moveLeft() {
        this.sprite.setVelocityX(VELOCITY * -1);
    };

    moveRight() {
        this.sprite.setVelocityX(VELOCITY);
    };

    moveUp() {
        this.sprite.setVelocityY(VELOCITY * -1);
    };

    moveDown() {
        this.sprite.setVelocityY(VELOCITY * 1);
    };

    stopX() {
        this.sprite.setVelocityX(0);
    };

    stopY() {
        this.sprite.setVelocityY(0);
    };
}
