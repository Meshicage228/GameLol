'use strict'

var entities = [];

const scene = document.querySelector(".scene");

class Entity {
	constructor(target,initPos=new Vector2(),radius=1){
		this.target = target;
		this.position = initPos;
		this.redraw();
		this.velocity = new Vector2();
		this.radius = radius*16;
		this.target.querySelector(".entity-body").style.cssText = "--body-radius:"+this.radius+"px;";
		this.sprite = this.target.querySelector(".character");
	}
	redraw(){
		this.target.style.cssText = "transform:translate("+this.position.x+"px,"+this.position.y+"px);";
		if(this.target)this.target.style.cssText+= "z-index:"+Math.round(this.position.y)+";";
	}
	tick(){
		this.position = Vector2.add(this.position,this.velocity);
		this.velocity = this.velocity.multiplyA(0.75);
		let rl = this.target.querySelector(".led");
		if(rl)
			if(this.getOverlappingEntities.length>0)
				rl.classList.remove("off");
			else
				rl.classList.add("off");
		this.pushOutEntities();
	}
	pushOutEntities(){
		this.getOverlappingEntities.forEach((ent)=>{
			ent.addVelocity(Vector2.vDifference(ent.position,this.position).normalized.multiplyA(-1));
		});
	}
	addVelocity(power = new Vector2()){
		this.velocity = Vector2.add(this.velocity,power);
	}
	get getOverlappingEntities(){
		let overlaps = [];
		entities.forEach((ent)=>{
			if(ent!=this){
				if(Vector2.specialDistance(this.position,ent.position)<=this.radius+ent.radius){
					overlaps.push(ent);
				}
			}
		});
		return overlaps;
	}
}

for(let entel of document.querySelectorAll(".entity")){
	entities.push(new Entity(entel,new Vector2(),1));
}

const entitiesContainer = document.querySelector(".scene > .entities");

for(let i=0;i<1500;i++){
	let sprite = document.createElement("div");
	sprite.classList.add("entity");
	let sp_body = document.createElement("div");
	sp_body.classList.add("entity-body");
	let sp_ch = document.createElement("div");
	sp_ch.classList.add("character");
	let sp_led = document.createElement("div");
	sp_led.classList.add("led");
	sp_led.style.cssText = "--led-color:rgb("+
		Math.round(Math.random()*255)+","+
		Math.round(Math.random()*255)+","+
		Math.round(Math.random()*255)+");";
	sprite.append(sp_body);
	sp_body.append(sp_ch);
	sp_ch.append(sp_led);
	entitiesContainer.append(sprite);
	entities.push(new Entity(sprite,new Vector2(Math.random()*10-5,Math.random()*10-5),1));
}

let player = document.querySelector("#client-this");

let controls = {
	w:false,
	a:false,
	s:false,
	d:false
};

addEventListener("keydown",function(e) {
	if(e.key in controls)
		controls[e.key] = true;
});
addEventListener("keyup",function(e) {
	if(e.key in controls)
		controls[e.key] = false;
});
var playerGO = entities.find((e)=>{return (e.target==player);})
var velocity = new Vector2();
var speed=5;

function calcVel(){
	velocity = new Vector2();
	if(controls["w"]==true)velocity.y-=speed;
	if(controls["a"]==true)velocity.x-=speed;
	if(controls["s"]==true)velocity.y+=speed;
	if(controls["d"]==true)velocity.x+=speed;
	velocity = velocity.normalized;
}
 
function update(){
	calcVel();
	playerGO.addVelocity(velocity.multiplyA(speed));
	entities.forEach((ent)=>{
		ent.tick();
		ent.redraw();
	});
	scene.style.cssText= "transform:translate("+-playerGO.position.x+"px,"+-playerGO.position.y+"px);";
}

setInterval(()=>{update();},50);
