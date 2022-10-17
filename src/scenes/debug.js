import Phaser from 'phaser'

export default class Debug extends Phaser.Scene {
	constructor() {
		super({
			key: "debug"
		})
	}

	preload() {

	}

	create() {
		// Making buttons tutorial
		// https://phaser.io/examples/v3/view/input/zones/basic-input-zone
		// The names for the scenes are defined in the "constructor" function
		// You can find them in the scene's module
		this.redSquare = this.add
			.rectangle(100, 100, 50, 50, 0xff0000)
			.setName("level_1")
			.setInteractive();
	
		this.blueSquare = this.add
			.rectangle(150, 150, 50, 50, 0x0000ff)
			.setName("level_2")
			.setInteractive();

		this.greenSquare = this.add
			.rectangle(200, 200, 50, 50, 0x00820B)
			.setName("level_3")
			.setInteractive();

		    this.input.on('gameobjectdown', (pointer, gameObject) => {
				let sceneName = gameObject.name
				console.log(`Starting ${sceneName}`)
				this.scene.start(sceneName)
	
			});
	}

	Update() {

	}
}