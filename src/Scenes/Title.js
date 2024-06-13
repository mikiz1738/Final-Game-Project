class Title extends Phaser.Scene {
    constructor() {
        super("title");
        
    }
    preload(){
        this.load.setPath("./assets/");
        this.load.image("burgerIcon", "tile_0090.png");
    }

    create() { 
        //add player sprite animation
        my.sprite.player = this.physics.add.sprite(this.game.canvas.width/2 - 100, 550, "platformer_characters", "tile_0000.png");
        my.sprite.player.setScale(8);
        my.sprite.player.setFlip(true, false);
        my.sprite.player.anims.play('walk', true);

        //add burger sprite 
        my.sprite.burger = this.physics.add.sprite(this.game.canvas.width/2 + 100, 550, "burgerIcon");
        my.sprite.burger.setScale(8)

        //disable debug visuals
        this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
        this.physics.world.debugGraphic.clear()

        //change background color 
        this.cameras.main.setBackgroundColor('#ff9cd9');
        
        //check for space input 
        this.nextScene = this.input.keyboard.addKey("SPACE");

        //title
        var titleText = this.add.text(this.game.canvas.width/2, this.game.canvas.height/2 - 200, "Dessert Dash!", {
            fontFamily: 'Times, serif',
            fontSize: 80,
        });

        //change color, font weight 
        titleText.setStyle({ color: '#e82c4f' });
        titleText.setStyle({ fontWeight: 'bold' });

        //center
        var textBoundsX = titleText.getBounds();
        titleText.x -= textBoundsX.width/2;

        //start text 
        var start = this.add.text(this.game.canvas.width/2, this.game.canvas.height/2 - 100, "Press SPACE to start", {
            fontFamily: 'Times, serif',
            fontSize: 20,
        });

        //center
        textBoundsX = start.getBounds();
        start.x -= textBoundsX.width/2;

        //how to play text 
        var howTo = this.add.text(this.game.canvas.width/2, this.game.canvas.height/2 + 200, "Collect all 28 burgers to bring back to the colony at the end of the path!", {
            fontFamily: 'Times, serif',
            fontSize: 40,
        });

        //change color, font weight
        howTo.setStyle({ color: '#e82c4f' });

        //center 
        textBoundsX = howTo.getBounds();
        howTo.x -= textBoundsX.width/2;
        howTo.setStyle({ fontWeight: 'bold' });
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.nextScene)) {
            this.scene.start("platformerScene");
        }

    }
}
         