class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.isFiring = false;
        this.sfxRocket = scene.sound.add('sfx_rocket');
        this.currentWeapon = 0;
    }

    update() {
        if (!this.isFiring) {
            if (Phaser.Input.Keyboard.JustDown(keyR)) {
                console.log("switched weapons");
                if (this.currentWeapon === 1) {
                    this.currentWeapon = 0;
                } else {
                    this.currentWeapon = 1;
                }
            }
            if (keyLEFT.isDown && this.x >= 47) {
                if (this.currentWeapon===0) {
                    this.x -= 2;
                } else {this.x -=4}
            } else if (keyRIGHT.isDown && this.x <= 578) {
                if (this.currentWeapon===0) {
                    this.x += 2;
                } else {this.x +=4}            }
        }

        //fire button
        if (Phaser.Input.Keyboard.JustDown(keyF)) {
            if (this.currentWeapon ===1) {
                if(this.r1 !== undefined || this.r2 !== undefined){
                    this.r1.reset();
                    this.r2.reset();
                }
            }
                this.isFiring = true;
            this.sfxRocket.play();
        }
        if (this.isFiring && this.y >= 108) {
            if (this.currentWeapon === 0) {
                if (keyLEFT.isDown && this.x >= 47) {
                    this.x -= 2;
                } else if (keyRIGHT.isDown && this.x <= 578) {
                    this.x += 2;
                }
                this.y -= 1.5;
            }  if (this.currentWeapon === 1) {
                this.y -= 5;
            }
        }
        if (this.y <= 108) {
            if (this.alive !== undefined && this.alive ===1 ){
                this.reset();
            }
            this.isFiring = false;
            this.y = 431;
        }

    }

    reset() {
        if (this.alive !== undefined && this.alive === 1 ){
            this.destroy();
        }
        this.isFiring = false;
        this.y = 431;
    }

}