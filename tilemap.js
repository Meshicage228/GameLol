const tileset = new Map();
const pixelPerTile = 32;
for(let x=0;x<=20;x++){
	let tiledata = new Image();
	let ctx = document.createElement("canvas").getContext("2d");
	tiledata.onload = function(){
		ctx.drawImage(this,pixelPerTile,pixelPerTile);
		tileset.set(x,ctx.getImageData(0,0,pixelPerTile,pixelPerTile));
	}
	tiledata.src = "sprites/DungeonSprites/dungeon_tile_"+String(x).padStart(3,"0")+".png";
}
const tilesPerChunk = 32;
const renderRange = 2;

const worldMapGround = scene.querySelector(".world-map > .tileset.ground");
const worldMapWalls = scene.querySelector(".world-map > .tileset.ground");

for(let x=-renderRange;x<renderRange;x++){
	for(let y=-renderRange;y<renderRange;y++){
		let chunk = document.createElement("canvas");
		chunk.width = pixelPerTile*tilesPerChunk;
		chunk.height = pixelPerTile*tilesPerChunk;
		let ctx = chunk.getContext("2d");
		for(let tx = 0;tx<tilesPerChunk;tx++){
			for(let ty=0;ty<tilesPerChunk;ty++){
				ctx.drawImage(tileset[(Math.round(Math.random()*tileset.size))],tx*pixelPerTile,ty*pixelPerTile);
			}
		}
		worldMapGround.append(chunk);
	}
}