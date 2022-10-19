import { Timer } from '@mui/icons-material';
import Phaser from 'phaser'
import Warrior from 'Entities/warrior.js'
import CustomConstants from "PhaserClasses/CustomConstants";

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
		this.cameras.main.startFollow(this.player, true, 1.0 , 1.00);
		const tweenConfig = {
			targets: this.cameras.main,
			zoom: 2,
			duration: 2000,
			ease: 'Sine.easeIn',
			repeat: 0
		}
		
		this.tweens.add(tweenConfig);
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
		this.groundLayer.setCollisionByExclusion(-1, true);		
	}

	generateSpawns() {
		this.spawns = this.map.createFromObjects('spawn map', 3, 'cube', 0, true, false, this.spawns, {
			name: 'spawn map',
			key: 'cube'
		});
		this.anims.create({
			key: 'spin',
			frames: this.anims.generateFrameNumbers('cube', { start: 1, end: 30 }),
			frameRate: 12,
			repeat: -1,
			yoyo: true
		});
		this.anims.play('spin', this.spawns);
	}

	create_physics() {
		// physics collisions and tracking should be done here.
		this.physics.add.existing(this.player);
		this.physics.add.collider(this.player, this.groundLayer);
		console.log(this.player)
	}

	create_player() {
		// Player Specific details come in here
		this.player = new Warrior(this, 15, 350);
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
		let worldWidth = 2000
		this.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
		this.physics.world.setBounds(0, 0, worldWidth, worldHeight);
		var time;

		// This order is important!
		this.initialize_audio();
		this.create_player();
		this.create_map();
		this.create_physics();
		this.create_controls();
		this.generateSpawns();
		this.create_health_bar();
		
	}

	update(time, delta) {
		this.player.update(time, delta);
		this.handle_debug();
	}
}