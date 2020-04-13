class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y ,texture, frame);

        scene.add.existing(this);
        this.isFiring = false;
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update(){
        if (!this.isFiring){
            if (keyLEFT.isDown && this.x >=47){
                this.x -=2;
            } else if (keyRIGHT.isDown && this.x <= 578){
                this.x +=2;
            }
        }

        //fire button
        if (Phaser.Input.Keyboard.JustDown(keyF)){
            this.isFiring = true;
            this.sfxRocket.play();
        }
        if (this.isFiring && this.y >= 108){
            this.y -=2;
        }
        if (this.y <= 108){
            this.isFiring = false;
            this.y = 431;
        }

    }

    reset(){
        this.isFiring = false;
        this.y = 431;
    }

}