class Win extends Phaser.Scene {
    constructor() {
        super("win");
        
    }

    preload() {
        
    }

    create() {
        this.cameras.main.setBackgroundColor('#ff9cd9');
        this.nextScene = this.input.keyboard.addKey("O");
        var gameOverText = this.add.text(this.game.canvas.width/2, this.game.canvas.height/2 - 200, "You Win!", {
            fontFamily: 'Times, serif',
            fontSize: 80,
        });

        var textBoundsX = gameOverText.getBounds();
        gameOverText.x -= textBoundsX.width/2;

        var restartText = this.add.text(this.game.canvas.width/2, this.game.canvas.height/2 - 100, "Press o to play again", {
            fontFamily: 'Times, serif',
            fontSize: 20,
        });

        textBoundsX = restartText.getBounds();
        restartText.x -= textBoundsX.width/2;

        var endText = this.add.text(this.game.canvas.width/2, this.game.canvas.height/2 - 50, "Excellent! You successfully gathered all the burgers to feed the colony!", {
            fontFamily: 'Times, serif',
            fontSize: 20,
        });

        textBoundsX = endText.getBounds();
        endText.x -= textBoundsX.width/2;

        var creditText = this.add.text(this.game.canvas.width/2, this.game.canvas.height/2, "Created by: Michael Wong for CMPM 120", {
            fontFamily: 'Times, serif',
            fontSize: 20,
        });

        textBoundsX = creditText.getBounds();
        creditText.x -= textBoundsX.width/2;
    
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.nextScene)) {
            this.scene.start("platformerScene");
        }

    }
}
         