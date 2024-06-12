class Win extends Phaser.Scene {
    constructor() {
        super("win");
        
    }

    preload() {
        
    }

    create() {
        this.cameras.main.setBackgroundColor('#ff9cd9');
        this.nextScene = this.input.keyboard.addKey("O");
        var gameOverText = this.add.text(this.game.canvas.width/2, this.game.canvas.height/2 - 100, "You Win!", {
            fontFamily: 'Times, serif',
            fontSize: 80,
        });

        var textBounds = gameOverText.getBounds();

        gameOverText.x -= textBounds.width/2;

        var restartText = this.add.text(this.game.canvas.width/2, this.game.canvas.height/2, "Press o to restart", {
            fontFamily: 'Times, serif',
            fontSize: 20,
        });

        textBounds = restartText.getBounds();
        restartText.x -= textBounds.width/2;
        // if(win == true){
        //     var winText = this.add.text(this.game.canvas.width/2, this.game.canvas.height/2 - 200, "You Win!", {
        //         fontFamily: 'Times, serif',
        //         fontSize: 80,
            
        //     });
        //     textBounds = winText.getBounds();
        
        //     winText.x -= textBounds.width/2;
        // }

    
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.nextScene)) {
            this.scene.start("platformerScene");
        }

    }
}
         