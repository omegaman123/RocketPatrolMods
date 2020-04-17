class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,texture,frame,pointValue,speed) {
        super(scene,x,y,texture,frame,pointValue,speed);
        scene.add.existing(this);
        this.points = pointValue;
        this.speed = speed;
    }

    update() {
        //move ship left
        this.x -= game.settings.spaceshipSpeed+this.speed;
        if (this.x <= 0-this.width){
            this.x = game.config.width;
        }
    }

    reset() {
        this.x = game.config.width;
    }
}