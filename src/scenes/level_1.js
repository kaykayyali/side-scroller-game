import Phaser from 'phaser'
import Warrior from 'Entities/warrior.js'

export default class Level_1 extends Phaser.Scene {
	constructor() {
		super({
			key: "level_1"
		})
	}
	
	create_controls() {
		// Button input reading
		this.cursors = this.input.keyboard.createCursorKeys();
		// Cameras
		this.cameras.main.startFollow(this.player, true, 0.10 , 0.10);
		this.keys = this.input.keyboard.addKeys({
            k: Phaser.Input.Keyboard.KeyCodes.K,
        });
	}

	create_health_bar() {
		this.health_bar_text = this.add.text(20, 30, 'Health:', { font: "25px Arial White", fill: "#D3D3D3" });;
		this.health_bar_text.setScrollFactor(0);
		this.health_bar_outline = this.add.rectangle(175, 44, 100, 20, 0xD3D3D3);
		
		this.health_bar_outline.setScrollFactor(0);
		this.health_bar = this.add.rectangle(175, 44, 93, 14, 0x00FF00);
		this.health_bar.setScrollFactor(0);
	}

	handle_debug() {
		if (this.keys.k.isDown) {
			console.log('Debug Mode Enabled');
			this.scene.start('debug')
		}
	}

	create_map() {
		// Set Current Map
		this.map = this.make.tilemap({ key: 'level_1' });
		
		// Set Tilesets for this map
		this.primaryTileset = this.map.addTilesetImage('Stonelands_tileset_NES', 'stonelands_tileset', 16, 16);

		// Set layers
		this.groundLayer = this.map.createLayer('ground', this.primaryTileset);
		this.enemySpawnLayer = this.map.createFromObjects('spawn map', {
			id: 3
		});
	}

	generateSpawns() {
		this.spawns = this.map.createFromObjects('spawn map', 3, 'cube', 0, true, false, this.spawns, {
			name: 'spawn map',
			key: 'cube'
		});
		this.anims.play('spin', this.spawns);
	}

	create_physics() {
		// physics collisions and tracking should be done here.
		this.groundLayer.setCollisionByExclusion(-1, true);
		this.physics.add.collider(this.player, this.groundLayer);
	}

	create_player() {
		// Player Specific details come in here
		this.player = this.physics.add.sprite(15, 450, 'warrior-idle'); 
		this.player.setScale(1);
		this.player.setBounce(0.2);
		this.player.setCollideWorldBounds(true);
		this.player.body.setGravityY(1000)
	}

	define_animations() {
		this.warrior = new Warrior();
		this.warrior.createAnimations(this);
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

		this.anims.create({
			key: 'spin',
			frames: this.anims.generateFrameNumbers('cube', { start: 1, end: 30 }),
			frameRate: 12,
			repeat: -1,
			yoyo: true
		});
	}

	initialize_audio() {
		// "8bit_theme_loop" comes from the bootloader scene. 
		// It's loaded up front to save time
		this.music = this.sound.play('8bit_theme_loop', {
			volume: 0.3,
			loop: true
		});
	}

	

	preload() {
		// used only for files specific to this map
		// Most Files can be loaded in the bootloader. ./scenes/bootloader.js
	}

	create() {
			
		// Third input is equal to the width of the game world while the fourth input is the height
		let worldHeight = 600;
		let worldWidth = 1600
		this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
		this.physics.world.setBounds(0, 0, worldWidth, worldHeight);

		// This order is important!
		this.initialize_audio();
		this.create_player();
		this.create_map();
		this.create_physics();
		this.create_controls();
		this.define_animations();
		this.generateSpawns();
		this.create_health_bar();
		
	}

	update(time, delta) {
		this.base_movement = 100;
		this.movement_multiplier = 1.5;
		this.gravity_multiplier = 4.0;
		this.handle_debug();
		if (this.cursors.space.isDown) {
			this.player.sprite = 'warrior-attack';
			this.player.anims.play('attack', true);
			return
		}
		if (this.cursors.left.isDown) {
			this.player.setVelocityX(this.base_movement * -this.movement_multiplier);
			this.player.sprite = 'warrior-run'
			// Flips the sprite over
			this.player.toggleFlipX();
			this.player.anims.play('run', true);
		}
		else if (this.cursors.right.isDown) {
			this.player.setVelocityX(this.base_movement * this.movement_multiplier);
			this.player.sprite = 'warrior-run'
			// Sets flip state to default. the sprite I used is based on right
			this.player.resetFlip();
			this.player.anims.play('run', true);
		}
		else if (!this.player.body.onFloor() && this.player.body.velocity.x != 0) {
			// Player is in the air, and they aren't stopped yet
			// So dont change their animation
		}
		else {
			this.player.setVelocityX(0);
			this.player.sprite = 'warrior-idle'
			this.player.anims.play('idle');
		}
	
		if (this.cursors.up.isDown && this.player.body.onFloor()) {
			this.sound.play('8bit_jump',{
				volume: 0.2,
				loop: false
			});
			this.player.sprite = 'warrior-jump';
			this.player.anims.play('jump', true);
			this.player.setVelocityY(this.base_movement * -this.gravity_multiplier);
		}
	}
}