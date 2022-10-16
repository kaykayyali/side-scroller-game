import Phaser from 'phaser'
import Level_1 from 'Scenes/level_1.js'
import BootLoader from 'Scenes/bootloader.js'
	
const config = {
	type: Phaser.CANVAS,
	width: 800,
	height: 600,
	backgroundColor: '#000000',
	parent: 'phaser',

	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 10 }
		}
	},
	scene: [BootLoader, Level_1],
}
	
export default config
