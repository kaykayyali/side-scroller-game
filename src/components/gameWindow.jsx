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
			gravity: { y: 10 }
		}
	},
	scene: [BootLoader, Level_1, Level_2, Level_3, Debugger],
}
	
export default config
