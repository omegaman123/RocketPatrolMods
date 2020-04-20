class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.image('menu_bg','./assets/dumb.png');
    }

    create() {

        let menuConfig = {
          fontFamily:'Courier',
          fontSize:'20px',
          backgroundColor:'#F3B141',
          color:'#843605',
          align:'right',
          padding:{
              top:5,
              bottom:5,
          },
          fixedWidth:0
        };

        let centerX = game.config.width / 2;
        let centerY = game.config.height / 2;

        let textSpace = 64;

        this.add.tileSprite(0,0,640,480,'menu_bg').setOrigin(0,0);
        this.add.text(centerX, centerY - textSpace, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY, 'Use <- -> arrows to move and (F) to Fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(centerX, centerY + textSpace, 'Press <- for Easy or -> for Hard', menuConfig).setOrigin(.5);
        this.add.text(centerX, centerY + textSpace + 64, 'Press "R" to switch weapons', menuConfig).setOrigin(.5);
        this.add.text(centerX,centerY+ 2*textSpace+32 ,'HIGH SCORE',menuConfig).setOrigin(.5);
        this.add.text(centerX,centerY+ 2*textSpace +64, highScore ,menuConfig).setOrigin(.5);



        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            };
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            };
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
    }
}
