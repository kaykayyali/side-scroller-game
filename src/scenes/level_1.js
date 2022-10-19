import { Timer } from '@mui/icons-material';
import Phaser from 'phaser'

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
		this.player.setScale(0.75);
		this.player.setBounce(0.2);
		this.player.setCollideWorldBounds(true);
		this.player.body.setGravityY(1000)

		//Player State
		this.player.state ={
			health : 5,
			invincibility: 0
		}

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
		var time;

		// This order is important!
		this.initialize_audio();
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
		this.gravity_multiplier = 4.0;
		this.handle_debug();
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
			this.sound.play('8bit_jump',{
				volume: 0.2,
				loop: false
			})
			this.player.setVelocityY(this.base_movement * -this.gravity_multiplier);
		}



		// WORKING ON HEALTH

		if(this.cursors.down.isDown) {
				this.player.state.health-=1;
		}


		if(this.player.state.health <= 0){
			this.player.visible = false;
		}


	}
}