import { DuoRounded } from '@mui/icons-material';
import Phaser from 'phaser'

export default class Player extends Phaser.Scene {
	constructor() {
		super()
	}
	preload() {
		this.load.spritesheet('dude', 
			'sprites/dude.png',
			{
				frameWidth: 32,
				frameHeight: 48
			}
			
		);
	}
}