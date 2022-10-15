var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
var controls;

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
}

function create ()
{
    // Third input is equal to the width of the game world while the fourth input is the height
    this.cameras.main.setBounds(0, 0, 1000, 600);
    this.physics.world.setBounds(0, 0, 1000, 600);


    this.add.image(400, 300, 'sky');
    this.add.image(800, 300, 'sky');
    this.add.image(1200, 300, 'sky');

    platforms = this.physics.add.staticGroup();
    platforms.create(70, 590, 'ground').setScale(1/10).refreshBody();


    player = this.physics.add.sprite(15, 450, 'dude');

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

    this.physics.add.collider(player, platforms);
    cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.startFollow(player, true, 0.10 , 0.10);

    const health_bar_text = this.add.text(20, 30, 'Health:', { font: "25px Arial Black", fill: "#333333" });;

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

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(base_movement * -gravity_multiplier);
    }


}