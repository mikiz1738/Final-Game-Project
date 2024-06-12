class Title extends Phaser.Scene {
    constructor() {
        super("title");
        
    }
    preload(){
        this.load.setPath("./assets/");
        this.load.image("burgerIcon", "tile_0090.png");
    }

    create() { 
        my.sprite.player = this.physics.add.sprite(this.game.canvas.width/2 - 100, 550, "platformer_characters", "tile_0000.png");
        my.sprite.player.setScale(8);
        my.sprite.player.setFlip(true, false);
        my.sprite.player.anims.play('walk', true);

        my.sprite.burger = this.physics.add.sprite(this.game.canvas.width/2 + 100, 550, "burgerIcon");
        my.sprite.burger.setScale(8)

        //disable debug visuals
        this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
        this.physics.world.debugGraphic.clear()

        this.cameras.main.setBackgroundColor('#ff9cd9');
        this.nextScene = this.input.keyboard.addKey("SPACE");
        var titleText = this.add.text(this.game.canvas.width/2, this.game.canvas.height/2 - 200, "Dessert Dash!", {
            fontFamily: 'Times, serif',
            fontSize: 80,
        });

        titleText.setStyle({ color: '#e82c4f' });
        titleText.setStyle({ fontWeight: 'bold' });

        var textBoundsX = titleText.getBounds();
        titleText.x -= textBoundsX.width/2;

        var start = this.add.text(this.game.canvas.width/2, this.game.canvas.height/2 - 100, "Press SPACE to start", {
            fontFamily: 'Times, serif',
            fontSize: 20,
        });

        textBoundsX = start.getBounds();
        start.x -= textBoundsX.width/2;

        var howTo = this.add.text(this.game.canvas.width/2, this.game.canvas.height/2 + 200, "Collect all 28 burgers to bring back to the colony at the end of the path!", {
            fontFamily: 'Times, serif',
            fontSize: 40,
        });
        howTo.setStyle({ color: '#e82c4f' });
        textBoundsX = howTo.getBounds();
        howTo.x -= textBoundsX.width/2;
        howTo.setStyle({ fontWeight: 'bold' });
        // var endText = this.add.text(this.game.canvas.width/2, this.game.canvas.height/2 - 50, "Excellent! You successfully gathered all the burgers to feed the colony!", {
        //     fontFamily: 'Times, serif',
        //     fontSize: 20,
        // });

        // textBoundsX = endText.getBounds();
        // endText.x -= textBoundsX.width/2;
    
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.nextScene)) {
            this.scene.start("platformerScene");
        }

    }
}
         