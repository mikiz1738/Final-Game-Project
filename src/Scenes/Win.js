class Win extends Phaser.Scene {
    constructor() {
        super("win");
        
    }

    preload() {
        
    }

    create() {
        //change background color 
        this.cameras.main.setBackgroundColor('#ff9cd9');

        //check for O key input 
        this.nextScene = this.input.keyboard.addKey("O");

        //game over text 
        var gameOverText = this.add.text(this.game.canvas.width/2, this.game.canvas.height/2 - 200, "You Win!", {
            fontFamily: 'Times, serif',
            fontSize: 80,
        });

        //center 
        var textBoundsX = gameOverText.getBounds();
        gameOverText.x -= textBoundsX.width/2;

        //restart text 
        var restartText = this.add.text(this.game.canvas.width/2, this.game.canvas.height/2 - 100, "Press o to play again", {
            fontFamily: 'Times, serif',
            fontSize: 20,
        });

        //center 
        textBoundsX = restartText.getBounds();
        restartText.x -= textBoundsX.width/2;

        //end text 
        var endText = this.add.text(this.game.canvas.width/2, this.game.canvas.height/2 - 50, "Excellent! You successfully gathered all the burgers to feed the colony!", {
            fontFamily: 'Times, serif',
            fontSize: 20,
        });

        //center 
        textBoundsX = endText.getBounds();
        endText.x -= textBoundsX.width/2;

        //credit text 
        var creditText = this.add.text(this.game.canvas.width/2, this.game.canvas.height/2, "Created by: Michael Wong for CMPM 120", {
            fontFamily: 'Times, serif',
            fontSize: 20,
        });

        //center 
        textBoundsX = creditText.getBounds();
        creditText.x -= textBoundsX.width/2;
    
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.nextScene)) {
            this.scene.start("title");
        }

    }
}
         