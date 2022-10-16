import Phaser from 'phaser'

export default class Boot_Loader extends Phaser.Scene {
	constructor() {
		super({
			key: "bootloader"
		})
	}

	handleLoaderEvent() {
		this.load.on('progress', function (value) {
			percentText.setText(parseInt(value * 100) + '%');
			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			progressBar.fillRect(250, 280, 300 * value, 30);
		});
		
		this.load.on('fileprogress', function (file) {
			assetText.setText('Loading asset: ' + file.key);
		});
		this.load.on('complete', function () {
			progressBar.destroy();
			progressBox.destroy();
			loadingText.destroy();
			percentText.destroy();
			assetText.destroy();
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
		this.load.tilemapTiledJSON('level_1', 'tilemaps/map1.json');
	}

	renderProgressBar() {
		let width = this.cameras.main.width;
		let height = this.cameras.main.height;
		
		this.progressBar = this.add.graphics();
		this.progressBox = this.add.graphics();
		this.progressBox.fillStyle(0x222222, 0.8);
		this.progressBox.fillRect(240, 270, 320, 50);

		let loadingText = this.make.text({
			x: width / 2,
			y: height / 2 - 50,
			text: 'Loading...',
			style: {
				font: '20px monospace',
				fill: '#ffffff'
			}
		});
		loadingText.setOrigin(0.5, 0.5);
		
		let percentText = this.make.text({
			x: width / 2,
			y: height / 2 - 5,
			text: '0%',
			style: {
				font: '18px monospace',
				fill: '#ffffff'
			}
		});
		percentText.setOrigin(0.5, 0.5);
		
		let assetText = this.make.text({
			x: width / 2,
			y: height / 2 + 50,
			text: '',
			style: {
				font: '18px monospace',
				fill: '#ffffff'
			}
		});
		assetText.setOrigin(0.5, 0.5);
	}

	preload() {
		this.renderProgressBar();
		this.loadCoreAssets();
	}

	create() {
		this.logo = this.add.image(400, 300, 'logo');
		setTimeout(() => {
			this.scene.start('Level_1')
		}, 2000)
	}
}