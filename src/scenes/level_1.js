import Phaser from 'phaser'

export default class Level_1 extends Phaser.Scene {
	constructor() {
		super({
			key: "level_one"
		})
	}
	
	create_controls() {
		// Button input reading
		this.cursors = this.input.keyboard.createCursorKeys();
		// Cameras
		this.cameras.main.startFollow(this.player, true, 0.10 , 0.10);
	}

	create_health_bar() {
		this.health_bar_text = this.add.text(20, 30, 'Health:', { font: "25px Arial Black", fill: "#000000" });;
		this.health_bar_text.setScrollFactor(0);
		this.health_bar_outline = this.add.rectangle(175, 44, 100, 20, 0x000000);
		
		this.health_bar_outline.setScrollFactor(0);
		this.health_bar = this.add.rectangle(175, 44, 93, 14, 0x00FF00);
		this.health_bar.setScrollFactor(0);
	}

	create_map() {
		// Set Current Map
		this.map = this.make.tilemap({ key: 'level_1' });
		
		// Set Tilesets for this map
		this.primaryTileset = this.map.addTilesetImage('Stonelands_tileset_NES', 'stonelands_tileset');

		// Set layers
		this.groundLayer = this.map.createLayer('ground', this.primaryTileset, 0, 0);
	}

	create_physics() {
		// physics collisions and tracking should be done here.
		this.groundLayer.setCollisionByExclusion(-1, true);
		this.physics.add.collider(this.player, this.groundLayer);
	}

	create_player() {
		// Player Specific details come in here
		this.player = this.physics.add.sprite(15, 450, 'dude');  
		this.player.setBounce(0.2);
		this.player.setCollideWorldBounds(true);
		this.player.body.setGravityY(1000)
	}

	define_animations() {
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

	

	preload() {
		// "This" will be correct here
		this.load.image('sky', 'images/sky.png');
		this.load.image('ground', 'images/ground.png');
		this.load.spritesheet('dude', 
			'sprites/dude.png',
			{
				frameWidth: 32,
				frameHeight: 48
			}
		);
		this.load.tilemapTiledJSON('level_1', 'tilemaps/level_1.json');
		this.load.image('stonelands_tileset', 'tilemaps/Stonelands_tileset_NES.png');
	}

	create() {
			
		// Third input is equal to the width of the game world while the fourth input is the height
		let worldHeight = 600;
		let worldWidth = 1600
		this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
		this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

		// This order is important!
		this.create_player();
		this.create_map();
		this.create_physics();
		this.create_controls();
		this.define_animations();
		this.create_health_bar();
	}

	update(time, delta) {
		this.base_movement = 100;
		this.movement_multiplier = 1.5;
		this.gravity_multiplier = 4.5;
	
		if (this.cursors.left.isDown) {
			this.player.setVelocityX(this.base_movement * -this.movement_multiplier);
			this.player.anims.play('left', true);
		}
		else if (this.cursors.right.isDown) {
			this.player.setVelocityX(this.base_movement * this.movement_multiplier);
			this.player.anims.play('right', true);
		}
		else {
			this.player.setVelocityX(0);
			this.player.anims.play('turn');
		}
	
		if (this.cursors.up.isDown && this.player.body.onFloor()) {
			this.player.setVelocityY(this.base_movement * -this.gravity_multiplier);
		}
	}
}