class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,texture,frame,pointValue,speed,tdirection) {
        super(scene,x,y,texture,frame,pointValue,speed,tdirection);
        scene.add.existing(this);
        this.points = pointValue;
        this.speed = speed;
        this.direction = tdirection;
        if (this.direction ===-1){
            this.x = 0 - getRandomInt(60);
            this.flipX = true;
        }
        console.log(this.x);
    }

    update() {
        //move ship left
        if (this.direction === 1) {
            this.x -= game.settings.spaceshipSpeed + this.speed;
            if (this.x <= 0 - this.width) {
                this.x = game.config.width;
            }
        } else {
            this.x += game.settings.spaceshipSpeed + this.speed;
            if (this.x >= game.config.width +  this.width) {
                this.x = 0-this.width;
            }
        }
    }

    reset() {
        this.x = game.config.width;
    }
}