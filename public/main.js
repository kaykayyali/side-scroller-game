var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
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
    this.load.tilemapTiledJSON('map1', 'tilemaps/example.json');
    this.load.image('tiles1', 'tilemaps/super-mario.png');
}

function create ()
{
    
    // this.add.image(400, 300, 'sky');
    var map1 = this.make.tilemap({ key: 'map1' });
    var tileset1 = map1.addTilesetImage('SuperMarioBros-World1-1', 'tiles1');
    var layer1 = map1.createLayer('World1', tileset1, 0, 0);
    cursors = this.input.keyboard.createCursorKeys();
    
    player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(10)

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
}

function update (time, delta)
{
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
}