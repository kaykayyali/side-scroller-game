import Phaser from "phaser";
import CONSTANTS from "PhaserClasses/CustomConstants";

export default class Healthbar extends Phaser.GameObjects.Container{
	//Less Logic
	constructor(scene,x,y,children){
		if (typeof (scene) === null) {
			throw new Error("New Entity needs reference to target scene");
		}
		super(scene,x,y,children);
		// These are made up variables, stored in the game engine so context is easy to manage
		const defaultState = {
	

		};

		// Set default state. Giving them property values like health, armor, and weapons.
		this.setData(defaultState);

		this.renderHealthBar();
	}


	//Logic Here
	renderOutline(){
		this.outline = this.scene.add.rectangle(175, 44, 100, 20, 0xD3D3D3);
		this.outline.setScrollFactor(0);
	}
		
	
	renderInnerBar(){
		this.innerHealth = this.scene.add.rectangle(175, 44, 93, 14, 0x00FF00);
		this.innerHealth.setScrollFactor(0);
	}
	
	renderHealthBar(){
		this.renderOutline();
		this.renderInnerBar();
		console.log(this);
	}
}