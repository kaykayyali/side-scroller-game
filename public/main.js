var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#9adaea',

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};

let assets_root = 'static/assets/';

var game = new Phaser.Game(config);

function preload ()
{

    this.load.image('ground', `${assets_root}/Ground.jpg`);

}

function create ()
{
    ground = this.add.image(0, 510, 'ground').setOrigin(0);
    ground2 = this.add.image(320, 510, 'ground').setOrigin(0);
    
    ground.setScale(1/10);
    ground2.setScale(1/10);


}