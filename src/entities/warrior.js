export default class Warrior {
	constructor(game){
		if (typeof (game) === null) {
			throw new Error("New Entity needs reference to game");
		}
		this.game = game;
	}
	createAnimations() {
		console.log(this)
		this.game.anims.create({
			key: 'attack',
			frames: this.game.anims.generateFrameNumbers('warrior-attack', { start: 0, end: 12 }),
			frameRate: 10,
			repeat: -1
		});
		this.game.anims.create({
			key: 'idle',
			frames: this.game.anims.generateFrameNumbers('warrior-idle', { start: 0, end: 5 }),
			frameRate: 10,
			repeat: -1,
			yoyo: true
		});
		this.game.anims.create({
			key: 'run',
			frames: this.game.anims.generateFrameNumbers('warrior-run', { start: 0, end: 2 }),
			frameRate: 10,
			repeat: -1
		});
		this.game.anims.create({
			key: 'jump',
			frames: this.game.anims.generateFrameNumbers('warrior-jump', { start: 0, end: 2 }),
			frameRate: 10,
			repeat: -1
		});
	}
	runStart() {

	}
	runStop(){

	}

	create() {
		
	}

	update() {

	}
}