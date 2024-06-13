var burgerCount = 0; 
class Platformer extends Phaser.Scene {
    constructor() {
        super("platformerScene");
    }

    init() {
        // variables and settings
        this.ACCELERATION = 400;
        this.DRAG = 500;    
        this.physics.world.gravity.y = 1500;
        this.JUMP_VELOCITY = -600;
        this.PARTICLE_VELOCITY = 50;
        this.SCALE = 3.0;
        burgerCount = 0; 
    }

    preload(){
        //load sprites
        this.load.scenePlugin('AnimatedTiles', './lib/AnimatedTiles.js', 'animatedTiles', 'animatedTiles');
        this.load.setPath("./assets/");
        this.load.audio("getCoin", "jingles_STEEL16.ogg");
        this.load.audio("winner", "jingles_STEEL15.ogg");
        this.load.audio("jump", "phaseJump1.ogg");
        this.load.audio("hit", "zapThreeToneDown.ogg");
        this.load.image("burgerIcon", "tile_0090.png");

    }

    create() {
        //reset number of burgers collected 
        this.burgerCount = 0; 

        // Create a new tilemap game object which uses 18x18 pixel tiles, and is
        // 45 tiles wide and 25 tiles tall.
        this.map = this.add.tilemap("platformer-level-1", 18, 18, 45, 20);

        // Add a tileset to the map
        // First parameter: name we gave the tileset in Tiled
        // Second parameter: key for the tilesheet (from this.load.image in Load.js)
        this.tileset = this.map.addTilesetImage("tilemap_packed", "tilemap_tiles");

        this.backgroundLayer = this.map.createLayer("Background", this.tileset, 0, 0);

        // Create a layer
        this.groundLayer = this.map.createLayer("Ground-n-Platforms", this.tileset, 0, 0);

        // Make it collidable
        this.groundLayer.setCollisionByProperty({
            collides: true
        });

        this.animatedTiles.init(this.map);


        // Add burgers createFromObjects here
        this.burgers = this.map.createFromObjects("Collectables", {
            name: "burger",
            key: "tilemap_sheet",
            frame: 90
        });

        // Add spikes createFromObjects here
        this.spikes = this.map.createFromObjects("Hazards", {
            name: "spike",
            key: "tilemap_sheet",
            frame: 105
        });

        // Add candles createFromObjects here 
        this.candles = this.map.createFromObjects("Win Condition", {
            name: "candle",
            key: "tilemap_sheet",
            frame: 81
        });


        // Arcade Physics 
        this.physics.world.enable(this.burgers, Phaser.Physics.Arcade.STATIC_BODY);
        this.burgerGroup = this.add.group(this.burgers);

        this.physics.world.enable(this.spikes, Phaser.Physics.Arcade.STATIC_BODY);
        this.spikeGroup = this.add.group(this.spikes);

        this.physics.world.enable(this.candles, Phaser.Physics.Arcade.STATIC_BODY);
        this.candleGroup = this.add.group(this.candles);

        // set up player avatar
        my.sprite.player = this.physics.add.sprite(30, 250, "platformer_characters", "tile_0000.png");
        my.sprite.player.setCollideWorldBounds(true);

        my.sprite.burgerIcon = this.add.sprite(10,200, "burgerIcon");
        my.sprite.burgerIcon.setScrollFactor(0, 0);

        // Enable collision handling
        this.physics.add.collider(my.sprite.player, this.groundLayer);

        // Handle collision detection with burger
        this.physics.add.overlap(my.sprite.player, this.burgerGroup, (obj1, obj2) => {
            obj2.destroy(); // remove burger on overlap
            this.sound.play("getCoin", {
                volume: 1 
            });
            burgerCount++;
            console.log(burgerCount);
        });

        // Handle collision detection with spikes
        this.physics.add.overlap(my.sprite.player, this.spikeGroup, (obj1, obj2) => {
            obj2.destroy(); // remove coin on overlap
            this.sound.play("hit", {
                volume: 1 
            });
            this.scene.restart();
        });

        // Handle collision detection with candles
        this.physics.add.overlap(my.sprite.player, this.candleGroup, (obj1, obj2) => {
            if(burgerCount == 28){
                obj2.destroy(); // remove candle on overlap
                this.sound.play("winner", {
                    volume: 1 
                });
                this.scene.start("win");
            }
        });

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        this.rKey = this.input.keyboard.addKey('R');

        this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
        this.physics.world.debugGraphic.clear()
        // debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', () => {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this);

        // movement vfx

        my.vfx.walking = this.add.particles(0, 0, "kenny-particles", {
            frame: ['smoke_03.png', 'smoke_09.png'],
            // TODO: Try: add random: true
            scale: {start: 0.03, end: 0.1},
            // TODO: Try: maxAliveParticles: 8,
            lifespan: 350,
            // TODO: Try: gravityY: -400,
            alpha: {start: 1, end: 0.1}, 
        });

        my.vfx.walking.stop();

        //camera code
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(my.sprite.player, true, 0.1, 0.009); // (target, [,roundPixels][,lerpX][,lerpY])
        this.cameras.main.setDeadzone(50, 50);
        this.cameras.main.setZoom(this.SCALE);

    }

    update() {
        if(cursors.left.isDown) {
            my.sprite.player.setAccelerationX(-this.ACCELERATION);
            my.sprite.player.resetFlip();
            my.sprite.player.anims.play('walk', true);

            my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth/2-10, my.sprite.player.displayHeight/2-5, false);

            my.vfx.walking.setParticleSpeed(this.PARTICLE_VELOCITY, 0);


            // Only play smoke effect if touching the ground

            if (my.sprite.player.body.blocked.down) {

                my.vfx.walking.start();

            }

        } else if(cursors.right.isDown) {
            my.sprite.player.setAccelerationX(this.ACCELERATION);
            my.sprite.player.setFlip(true, false);
            my.sprite.player.anims.play('walk', true);
            my.vfx.walking.startFollow(my.sprite.player, my.sprite.player.displayWidth/2-10, my.sprite.player.displayHeight/2-5, false);

            my.vfx.walking.setParticleSpeed(this.PARTICLE_VELOCITY, 0);


            // Only play smoke effect if touching the ground

            if (my.sprite.player.body.blocked.down) {

                my.vfx.walking.start();

            }

        } else {
            // Set acceleration to 0 and have DRAG take over
            my.sprite.player.setAccelerationX(0);
            my.sprite.player.setDragX(this.DRAG);
            my.sprite.player.anims.play('idle');
            // have the vfx stop playing
            my.vfx.walking.stop();
        }

        // player jump
        // note that we need body.blocked rather than body.touching b/c the former applies to tilemap tiles and the latter to the "ground"
        if(!my.sprite.player.body.blocked.down) {
            my.sprite.player.anims.play('jump');
        }
        if(my.sprite.player.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            my.sprite.player.body.setVelocityY(this.JUMP_VELOCITY);
            this.sound.play("jump", {
                volume: 1 
            });
        }
        if(my.sprite.player.y >= 400){
            this.sound.play("hit", {
                volume: 1 
            });
            this.scene.restart();
        }
        if(Phaser.Input.Keyboard.JustDown(this.rKey)) {
            this.scene.restart();
        }
    }
}