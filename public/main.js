var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#9adaea',

    scene: {
        preload: preload,
        create: create
    }
};


var game = new Phaser.Game(config);

function preload ()
{

    this.load.image('ground', 'assets/Ground.jpg');

}

function create ()
{
    ground = this.add.image(0, 400, 'ground').setOrigin(0);
    ground.setScale(1/6);
}