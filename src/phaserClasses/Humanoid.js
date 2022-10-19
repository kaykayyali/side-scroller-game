import Phaser from "phaser";
import CONSTANTS from "PhaserClasses/CustomConstants";

export default class Humanoid extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, texture, x, y){
		if (typeof (scene) === null) {
			throw new Error("New Entity needs reference to target scene");
		}
		super(scene, x, y);
		// These are made up variables, stored in the game engine so context is easy to manage
		const defaultState = {
			health: 100,
			armor: 1,
			weaponTier: 1,
			weaponType: 'melee'
		};
		// Add the Class to the Scene system, and ensure it gets a physics body
		scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setTexture(texture);
        this.setPosition(x, y);
		// Set default humanoid state. Giving them property values like health, armor, and weapons.
		this.setData(defaultState);

		// Basic physics setup. Abstracts the need to manage it scene by scene
		this.setBounce(CONSTANTS.humanoid.bounceRate);
		this.body.setGravityY(CONSTANTS.humanoid.gravity)
		this.setCollideWorldBounds(true);
	}
	
	handleTakeDamage(value) {
		// Get input, which should be the value of damage dealt by the attacker
		// Divide it by the armor value
		// Then save the new value
		let damageTaken = value / this.getData('armor');
		let newHealth = this.getData('health') - damageTaken;
		this.setData('health', newHealth);

		// Useful to do certain actions when damage is taken
		this.emit('didTakeDamage', damageTaken);
	}
}