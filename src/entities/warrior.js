import Phaser from "phaser";
import CONSTANTS from "PhaserClasses/CustomConstants";
import Humanoid from "PhaserClasses/Humanoid";

export default class Warrior extends Humanoid {
	constructor(scene, x, y){
		super (scene, 'warrior', x, y)
		this.setAnimations();
	}
	setAnimations() {
		this.anims.create({
			key: 'idle',
			frames: this.anims.generateFrameNumbers('warrior', { start: 0, end: 5 }),
			frameRate: 10,
			repeat: -1,
			yoyo: true
		});
		this.anims.play('idle');
	}
	updatePhysicsSize(){
		this.setBodySize(30,60)
		this.setOffset(30,30)
		this.setScale(0.5);
	}
	update(time, delta) {
		if (delta > 100) {
			console.warn('[Performance]Large Tick Detected')
		}
		let scene = this.scene
		if (scene.cursors.left.isDown) {
			this.setVelocityX(CONSTANTS.humanoid.baseMovement * -CONSTANTS.physics.movementMultiplier);
		}
		else if (scene.cursors.right.isDown) {
			this.setVelocityX(CONSTANTS.humanoid.baseMovement * CONSTANTS.physics.movementMultiplier);
		}
		else {
			this.setVelocityX(0);
		}
		if (scene.cursors.up.isDown && scene.player.body.onFloor()) {
			scene.sound.play('8bit_jump',{
				volume: 0.2,
				loop: false
			});
			this.setVelocityY(CONSTANTS.humanoid.baseMovement * -CONSTANTS.physics.gravityMultiplier);
		}
	}
	// handleLeft() {

	// }

	// handleRight() {

	// }

	// handleUp() {

	// }

	// handleDown() {

	// }

	// handleAttack() {

	// }

	// handleGuard() {

	// }
}