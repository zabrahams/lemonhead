
const X_VELOCITY = 100
const Y_VELOCITY = 50

export default class Sled {
    constructor(factory, x, y, key, frame) {
            this.sprite = factory.add.sprite(x, y, key, frame);
            this.sprite.setCollideWorldBounds(true);
            this.slide = false;
            this.returnBack = false;
    }

    startSlide() {
        this.slide = true
        this.returnBack = false;
    };

    update() {
        if (this.sprite.x >= 720) {
            this.slide = false;
            this.returnBack = true;
        } else if (this.sprite.x <= 400) {
            this.returnBack = false;
        }

        if (this.slide) {
            this.sprite.setVelocityX(X_VELOCITY);
            this.sprite.setVelocityY(Y_VELOCITY);
        } else if (this.returnBack) {
            this.sprite.setVelocityX(-1 * X_VELOCITY);
            this.sprite.setVelocityY(-1 * Y_VELOCITY);
        } else {
            this.sprite.setVelocityX(0);
            this.sprite.setVelocityY(0);
        }

      
    };
}