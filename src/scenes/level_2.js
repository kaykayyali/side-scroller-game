import Phaser from 'phaser'

export default class Level_2 extends Phaser.Scene {
	constructor() {
		super({
			key: "level_2"
		})
	}

	preload() {

	}
	
	create() {
		this.health_bar_text = this.add.text(20, 30, 'Level 2:', { font: "25px Arial White", fill: "#D3D3D3" });;
		this.health_bar_text.setScrollFactor(0);
	}

	Update() {

	}
}