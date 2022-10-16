var config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    backgroundColor: '#9adaea',
    parent: 'phaser',

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 10 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.setBaseURL('http://localhost:3000/');
    this.load.image('sky', 'images/sky.png');
    this.load.image('ground', 'images/ground.png');
    this.load.spritesheet('dude', 
        'sprites/dude.png',
        {
            frameWidth: 32,
            frameHeight: 48
        }
    );
    this.load.tilemapTiledJSON('map1', 'tilemaps/map1.json');
    this.load.image('grass', 'tilemaps/BasicGreen.png');
}

function create ()
{
    // Third input is equal to the width of the game world while the fourth input is the height
    this.cameras.main.setBounds(0, 0, 1000, 600);
    this.physics.world.setBounds(0, 0, 1000, 600);
    player = this.physics.add.sprite(15, 450, 'dude');

    var map1 = this.make.tilemap({ key: 'map1' });
    var primaryTileset = map1.addTilesetImage('BasicGreen', 'grass');
    var groundLayer = map1.createLayer('ground', primaryTileset, 0, 0);
    groundLayer.setCollisionByExclusion(-1, true); 
    cursors = this.input.keyboard.createCursorKeys();

    // platforms = this.physics.add.staticGroup();
    // platforms.create(70, 590, 'ground').setScale(1/10).refreshBody();

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(1000)

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.physics.add.collider(player, groundLayer);

    cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.startFollow(player, true, 0.10 , 0.10);

    health_bar_text = this.add.text(20, 30, 'Health:', { font: "25px Arial Black", fill: "#000000" });;
    health_bar_text.setScrollFactor(0);
    health_bar_outline = this.add.rectangle(175, 44, 100, 20, 0x000000);
    
    health_bar_outline.setScrollFactor(0);
    health_bar = this.add.rectangle(175, 44, 93, 14, 0x00FF00);
    health_bar.setScrollFactor(0);
}

function update (time, delta)
{

    var base_movement = 100;
    var movement_multiplier = 1.5;
    var gravity_multiplier = 4.5;

    if (cursors.left.isDown)
    {
        player.setVelocityX(base_movement * -movement_multiplier);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(base_movement * movement_multiplier);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.onFloor())
    {
        player.setVelocityY(base_movement * -gravity_multiplier);
    }
}