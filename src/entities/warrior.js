export default class Warrior {
	createAnimations(game) {
		game.anims.create({
			key: 'attack',
			frames: game.anims.generateFrameNumbers('warrior-attack', { start: 0, end: 12 }),
			frameRate: 10,
			repeat: -1
		});
		game.anims.create({
			key: 'idle',
			frames: game.anims.generateFrameNumbers('warrior-idle', { start: 0, end: 5 }),
			frameRate: 10,
			repeat: -1,
			yoyo: true
		});
		game.anims.create({
			key: 'run',
			frames: game.anims.generateFrameNumbers('warrior-run', { start: 0, end: 2 }),
			frameRate: 10,
			repeat: -1
		});
		game.anims.create({
			key: 'jump',
			frames: game.anims.generateFrameNumbers('warrior-jump', { start: 0, end: 2 }),
			frameRate: 10,
			repeat: -1
		});
	}
}