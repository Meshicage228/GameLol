class Vector2{
	constructor(x=0,y=0){
		this.x = x;
		this.y = y;
	}
	get magnitude(){
		return Math.sqrt(this.x*this.x+this.y*this.y);
	}
	get normalized(){
		return (this.magnitude!=0)?new Vector2(this.x/this.magnitude,this.y/this.magnitude):new Vector2();
	}
	get zero(){
		return Boolean(this.magnitude==0);
	}
	static distance(a,b){
		return Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y));
	}
	static add(a,b){
		return new Vector2(a.x+b.x,a.y+b.y);
	}
	static multiplyA(v,a){
		return new Vector2(v.x*a,v.y*a);
	}
	add(v){
		return Vector2.add(this,v);
	}
	static specialDistance(a,b){
		return Math.sqrt(((a.x-b.x)/3)**2+(a.y-b.y)**2);
	}
	multiplyA(a){
		return Vector2.multiplyA(this,a);
	}
	multiplyS(a){
		this.x*=a;
		this.y*=a;
	}
	static vDifference(a,b){
		return new Vector2(b.x-a.x,b.y-a.y);
	}
}

class Vector3{
	constructor(x=0,y=0,z=0){
		this.x = x;
		this.y = y;
		this.z = z;
	}
	get magnitude(){
		return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);
	}
	get normalized(){
		return (this.magnitude!=0)?new Vector3(this.x/this.magnitude,this.y/this.magnitude,this.z/this.magnitude):new Vector3();
	}
	get zero(){
		return Boolean(this.magnitude==0);
	}
	static distance(a,b){
		return Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y)+(a.z-b.z)*(a.z-b.z));
	}
	static add(a,b){
		return new Vector3(a.x+b.x,a.y+b.y,a.z+b.z);
	}
	static multiplyA(v,a){
		return new Vector3(v.x*a,v.y*a,v.z*a);
	}
	add(v){
		return Vector3.add(this,v);
	}
	multiplyA(a){
		return Vector3.multiplyA(this,a);
	}
}