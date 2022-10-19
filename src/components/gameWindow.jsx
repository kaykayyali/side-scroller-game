import Phaser from 'phaser'
import BootLoader from 'Scenes/bootloader.js'
import Level_1 from 'Scenes/level_1.js'
import Level_2 from 'Scenes/level_2.js'
import Level_3 from 'Scenes/level_3.js'
import Debugger from 'Scenes/debug.js'
	
const config = {
	type: Phaser.CANVAS,
	width: 800,
	height: 600,
	backgroundColor: '#000000',
	parent: 'phaser',

	physics: {
		default: 'arcade',
		arcade: {
			// Turn this on to view phsyics boxes
			// debug: true,
			gravity: { y: 10 }
		}
	},
	// The first scene is the primary. But, you should override the second scene
	// Because the bootloader loads all of the assets
	scene: [BootLoader, Level_1, Level_2, Level_3, Debugger],
}
	
export default config
