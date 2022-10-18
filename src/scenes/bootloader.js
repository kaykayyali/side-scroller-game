import Phaser from 'phaser'

export default class Boot_Loader extends Phaser.Scene {
	constructor() {
		super({
			key: "bootloader"
		})
	}

	handleLoaderEvent() {
		this.load.on('progress', (value) => {
			this.percentText.setText(parseInt(value * 100) + '%');
			this.progressBar.clear();
			this.progressBar.fillStyle(0xffffff, 1);
			this.progressBar.fillRect(250, 280, 300 * value, 30);
		});
		
		this.load.on('fileprogress', (file) => {
			this.assetText.setText('Loading asset: ' + file.key);
		});
		this.load.on('complete', () => {
			this.progressBar.destroy();
			this.progressBox.destroy();
			this.loadingText.destroy();
			this.percentText.destroy();
			this.assetText.destroy();
		});
	}

	loadCoreAssets() {
		// This shouldn't be used for all maps. Just for loading shared assets like the players, and enemies
		this.load.image('logo', 'images/logo-example.png');
		this.load.spritesheet('dude', 
			'sprites/dude.png',
			{
				frameWidth: 32,
				frameHeight: 48
			}
		);
		this.load.spritesheet('warrior-attack', 
			'sprites/warrior/attack.png',
			{
				frameWidth: 90,
				frameHeight: 98
			}
		);
		this.load.spritesheet('warrior-idle', 
			'sprites/warrior/idle_v2.png',
			{
				frameWidth: 90,
				frameHeight: 90
			}
		);
		this.load.spritesheet('warrior-run', 
			'sprites/warrior/run.png',
			{
				frameWidth: 90,
				frameHeight: 98
			}
		);
		this.load.spritesheet('warrior-jump', 
			'sprites/warrior/jump.png',
			{
				frameWidth: 90,
				frameHeight: 98
			}
		);
		this.load.tilemapTiledJSON('level_1', 'tilemaps/level_1.json');
		this.load.image('stonelands_tileset', 'tilemaps/Stonelands_tileset_NES.png');
		this.load.audio('8bit_theme_loop', ['audio/8-bit-adventure-looped.mp3']);
		this.load.audio('8bit_jump', ['audio/8-bit-jump.mp3']);
		this.load.spritesheet('cube', 'sprites/cube.png', {
			frameWidth: 60,
			frameHeight: 60
		});

		for (var i = 0; i < 250; i++) {
			// This is just to make it take long enough to debug the loader
			this.load.image('logo'+i, 'images/logo-example.png');
		}
	}

	renderProgressBar() {
		let width = this.cameras.main.width;
		let height = this.cameras.main.height;
		
		this.progressBar = this.add.graphics();
		this.progressBox = this.add.graphics();
		this.progressBox.fillStyle(0x222222, 0.8);
		this.progressBox.fillRect(240, 270, 320, 50);

		this.loadingText = this.make.text({
			x: width / 2,
			y: height / 2 - 50,
			text: 'Loading...',
			style: {
				font: '20px monospace',
				fill: '#ffffff'
			}
		});
		this.loadingText.setOrigin(0.5, 0.5);
		
		this.percentText = this.make.text({
			x: width / 2,
			y: height / 2 - 5,
			text: '0%',
			style: {
				font: '18px monospace',
				fill: '#ffffff'
			}
		});
		this.percentText.setOrigin(0.5, 0.5);
		
		this.assetText = this.make.text({
			x: width / 2,
			y: height / 2 + 50,
			text: '',
			style: {
				font: '18px monospace',
				fill: '#ffffff'
			}
		});
		this.assetText.setOrigin(0.5, 0.5);
		this.handleLoaderEvent();
	}

	preload() {
		this.renderProgressBar();
		this.loadCoreAssets();
	}

	create() {
		this.logo = this.add.image(400, 300, 'logo');
		this.logo.setScale(1)
		this.tweens.add({
			targets: [this.logo],
			ease: 'Expo.easeIn',
			duration: 2000,
			alpha: 0,
			onComplete: () => {
			  // Handle completion
			  this.scene.start('level_1')
			}
		});
	}
}