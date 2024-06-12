class Title extends Phaser.Scene {
    constructor() {
        super("title");
        
    }

    preload() {
        
    }

    create() {
        this.cameras.main.setBackgroundColor('#ff9cd9');
        this.nextScene = this.input.keyboard.addKey("SPACE");
        var titleText = this.add.text(this.game.canvas.width/2, this.game.canvas.height/2 - 200, "Dessert Dash!", {
            fontFamily: 'Times, serif',
            fontSize: 80,
        });

        var textBoundsX = titleText.getBounds();
        titleText.x -= textBoundsX.width/2;

        var start = this.add.text(this.game.canvas.width/2, this.game.canvas.height/2 - 100, "Press SPACE to start", {
            fontFamily: 'Times, serif',
            fontSize: 20,
        });

        textBoundsX = start.getBounds();
        start.x -= textBoundsX.width/2;

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
         