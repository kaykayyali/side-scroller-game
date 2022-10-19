import Phaser from "phaser";
import Humanoid from "PhaserClasses/Humanoid";

export default class User extends Humanoid {
	constructor(scene, texture, x, y){
		// Classes shouldn't be used to set scene specific content. 
		// Use an entity for that
		super(scene, texture, x, y);
	}

	// update() {

	// }

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