var timedEvent;
let music;

class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }


    preload() {
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
        this.load.image('smallShip', './assets/ship2.png');
        this.load.image('rocket2', './assets/rocket2.png');
        this.load.image('bg2','./assets/bg02.png');
        this.load.image('bg3','./assets/bg03.png');
        this.load.audio('bgm','./assets/Pulsar.wav');

    }


    create() {
        //place tile sprite

        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.bg2 = this.add.tileSprite(0,0,640,480,'bg2').setOrigin(0,0);
        this.bg3 = this.add.tileSprite(0,0,640,480,'bg3').setOrigin(0,0);

        this.music = this.sound.add('bgm');
        let musicConfig = {
            mute:false,
            volume:.5,
            loop:true
        };
        this.music.play(musicConfig);


        //white rectangle background
        this.add.rectangle(5, 5, 630, 32, 0xFACADE).setOrigin(0, 0);
        this.add.rectangle(5, 443, 630, 32, 0xFACADE).setOrigin(0, 0);
        this.add.rectangle(5, 5, 32, 455, 0xFACADE).setOrigin(0, 0);
        this.add.rectangle(603, 5, 32, 455, 0xFACADE).setOrigin(0, 0);
        this.p1Rocket = new Rocket(this, game.config.width / 2, 431, 'rocket');

        //define shps
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'spaceship', 0, 20, 1,direction[getRandomInt(2)]).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, 260, 'spaceship', 0, 10, 1,direction[getRandomInt(2)]).setOrigin(0, 0);
        this.ship04 = new Spaceship(this, game.config.width + 50, 230, 'smallShip', 0, 50, 2,direction[getRandomInt(2)]).setOrigin(0, 0).setScale(.6);
        this.ship05 = new Spaceship(this, game.config.width + 10, 140, 'smallShip', 0, 70, 3.5,direction[getRandomInt(2)]).setOrigin(0, 0).setScale(.6);
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            framerate: 30
        });
        //score
        this.p1Score = 0;
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        };
        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(game.config.width - 156, 54, highScore, scoreConfig);


        //timer
        this.initialTime = 60;
        this.timeCount = this.add.text(game.config.width - 185, 40, 'Time Left: ' + formatTime(this.initialTime));
        timedEvent = this.time.addEvent({delay: 1000, callback: onEvent, callbackScope: this, loop: true});

        // game over flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(60000, () => {
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, '(F)ire to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            if (this.p1Score > highScore) {
                highScore = this.p1Score;
                this.add.text(game.config.width / 2, game.config.height / 2 + 64 * 2, 'NEW HIGH SCORE!', scoreConfig).setOrigin(.5);
            }
            music.mute = true;
            this.gameOver = true;
        }, null, this);
    }

    update() {
        //reset game when game over
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.restart(this.p1Score);
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        //scroll starfield
        this.starfield.tilePositionX -= 4;
        this.bg2.tilePositionX -=.1;
        this.bg3.tilePositionX -=.02;

        if (!this.gameOver) {
            this.p1Rocket.update();       // update rocket sprite
            if (this.p1Rocket.currentWeapon === 0) {
                this.p1Rocket.setTexture('rocket');
            } else {
                this.p1Rocket.setTexture('rocket2');
            }
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
            this.ship05.update();
            if(this.p1Rocket.r1 !== undefined && this.p1Rocket.r2 !== undefined){
                this.p1Rocket.r1.update();
                this.p1Rocket.r2.update();
            }

        }

        // check collisions
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }
        if (this.checkCollision(this.p1Rocket, this.ship05)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship05);
        }

        if(this.p1Rocket.r1 !== undefined || this.p1Rocket.r2 !== undefined){
            if (this.checkCollision(this.p1Rocket.r1, this.ship03)) {
                this.p1Rocket.r1.reset();
                this.shipExplode(this.ship03);
            }
            if (this.checkCollision(this.p1Rocket.r1, this.ship02)) {
                this.p1Rocket.r1.reset();
                this.shipExplode(this.ship02);
            }
            if (this.checkCollision(this.p1Rocket.r1, this.ship04)) {
                this.p1Rocket.r1.reset();
                this.shipExplode(this.ship04);
            }
            if (this.checkCollision(this.p1Rocket.r1, this.ship05)) {
                this.p1Rocket.r1.reset();
                this.shipExplode(this.ship05);
            }
            if (this.checkCollision(this.p1Rocket.r2, this.ship03)) {
                this.p1Rocket.r2.reset();
                this.shipExplode(this.ship03);
            }
            if (this.checkCollision(this.p1Rocket.r2, this.ship02)) {
                this.p1Rocket.r2.reset();
                this.shipExplode(this.ship02);
            }
            if (this.checkCollision(this.p1Rocket.r2, this.ship04)) {
                this.p1Rocket.r2.reset();
                this.shipExplode(this.ship04);
            }
            if (this.checkCollision(this.p1Rocket.r2, this.ship05)) {
                this.p1Rocket.r2.reset();
                this.shipExplode(this.ship05);
            }
        }

    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
            if (rocket.currentWeapon ===1){
                rocket.r1 = new Rocket(this,rocket.x-40,rocket.y+100,rocket.texture,0).setOrigin(0,0);
                rocket.r2 = new Rocket(this,rocket.x+40,rocket.y+100,rocket.texture,0).setOrigin(0,0);
                rocket.r1.isFiring = true;
                rocket.r2.isFiring = true;
                rocket.r1.alive = 1;
                rocket.r2.alive = 1;
            }
            return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        ship.alpha = 0;                         // temporarily hide ship
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        ship.reset();
        boom.on('animationcomplete', () => {    // callback after animation completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        console.log(ship.points);
        this.sound.play('sfx_explosion');
    }
}

function formatTime(seconds) {
    // Minutes
    var minutes = Math.floor(seconds / 60);
    // Seconds
    var partInSeconds = seconds % 60;
    // Adds left zeros to seconds
    partInSeconds = partInSeconds.toString().padStart(2, '0');
    // Returns formated time
    return `${minutes}:${partInSeconds}`;
}

function onEvent() {
    this.initialTime -= 1; // One second
    this.timeCount.setText('Time Left: ' + formatTime(this.initialTime));
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}