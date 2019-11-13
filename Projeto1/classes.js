class Polygon{
	#tx = 0.0;
	#ty = -1;
	#tz = 0.0;
	#sx;
	#sy;
	#sz;
	#angleZZ = 0.0;
	#angleYY = 0.0;
	#angleXX = 0.0;
	#kAmbi=[];
	#kDiff=[];
	#kSpec=[];
	#nPhong = 100;
	#track;
	#normals=[];
	#rotXXOn = Math.round(Math.random());
	#rotXXDir = Math.round(Math.random());
	#rotXXSpeed = Math.round(Math.random());
	

	constructor(s, track){
		this.#sx = s;
		this.#sy = s;
		this.#sz = s;
		this.#kAmbi = [Math.random(),Math.random(),Math.random()];
		this.#kDiff = [Math.random(),Math.random(),Math.random()];
		this.#kSpec = [Math.random(),Math.random(),Math.random()];
		this.#track = track;

	}


	set_normals(normals){
		this.#normals = normals;
	}

	set_tx(tx){
		this.#tx += tx;
	}

	set_ty(ty){
		this.#ty += ty;
	}

	set_scale(s){
		this.#sx = s;
		this.#sy = s;
		this.#sz = s;
	}

	set_tz(tz){
		this.#tz += tz;
	}

	get_rotXXDir(){
		return this.#rotXXDir;
	}
	
	get_rotXXSpeed(){
		return this.#rotXXSpeed;
	}
	

	get_rotXXOn(){
		if(this.#rotXXOn == 1){
			return true;
		}else{
			return false;
		}
	}

	set_rotAngleXX(angle){
		this.#angleXX += angle;
	}
	
	get_tx(){
		return this.#tx;
	}
	get_tz(){
		return this.#tz;
	}

	get_translation(){
		return[this.#tx, this.#ty, this.#tz];
	}

	get_scale(){
		return [this.#sx,this.#sy,this.#sz];
	}

	get_angle(){
		return [this.#angleXX,this.#angleYY,this.#angleZZ]
	}

	get_track(){
		return this.#track;
	}

	get_normals(){
		return this.#normals;
	}

	get_kAmbi(){
		return this.#kAmbi;
	}


	get_kDiff(){
		return this.#kDiff;
	}


	get_kSpec(){
		return this.#kSpec;
	}


	get_nPhong(){
		return this.#nPhong;
	}
}



class Car extends Polygon{
	#part0=[
		
	];
	
	#part1 = new Cube(0);
	
	#part2 = null;
	#part3 = null;
	#part4 = null;
	#part5 = null;
	constructor(){
		super(0.2, 0);
		super.set_ty(-0.5);
		super.set_tz(0.5);
		
		
	}

	get_vertices(){
		return this.#part0;
	}

	
}




class Cube extends Polygon{
	#vertices=[

		-1.000000, -1.000000, 1.000000, 
		1.000000, 1.000000, 1.000000, 
		-1.000000, 1.000000, 1.000000, 
		-1.000000, -1.000000, 1.000000, 
		1.000000, -1.000000, 1.000000, 
		1.000000, 1.000000, 1.000000, 
		1.000000, -1.000000, 1.000000, 
		1.000000, -1.000000, -1.000000, 
		1.000000, 1.000000, -1.000000, 
		1.000000, -1.000000, 1.000000, 
		1.000000, 1.000000, -1.000000, 
		1.000000, 1.000000, 1.000000, 
		-1.000000, -1.000000, -1.000000, 
		-1.000000, 1.000000, -1.000000, 
		1.000000, 1.000000, -1.000000, 
		-1.000000, -1.000000, -1.000000, 
		1.000000, 1.000000, -1.000000, 
		1.000000, -1.000000, -1.000000, 
		-1.000000, -1.000000, -1.000000, 
		-1.000000, -1.000000, 1.000000, 
		-1.000000, 1.000000, -1.000000, 
		-1.000000, -1.000000, 1.000000, 
		-1.000000, 1.000000, 1.000000, 
		-1.000000, 1.000000, -1.000000, 
		-1.000000, 1.000000, -1.000000, 
		-1.000000, 1.000000, 1.000000, 
		1.000000, 1.000000, -1.000000, 
		-1.000000, 1.000000, 1.000000, 
		1.000000, 1.000000, 1.000000, 
		1.000000, 1.000000, -1.000000, 
		-1.000000, -1.000000, 1.000000, 
		-1.000000, -1.000000, -1.000000, 
		1.000000, -1.000000, -1.000000, 
		-1.000000, -1.000000, 1.000000, 
		1.000000, -1.000000, -1.000000, 
		1.000000, -1.000000, 1.000000, 
		 
	];

	constructor(track){
		super(0.2, track);
	}

	get_vertices(){
		return this.#vertices;
	}

	

}


class Piramid extends Polygon{
	#vertices=[
		-1,-1,-1,
		1,-1,-1,
		-1,-1,1,
		1,-1,-1,
		1,-1,1,
		-1,-1,1,
		-1,-1,1,
		1,-1,1,
		0,1,0,
		1,-1,-1,
		0,1,0,
		1,-1,1,
		1,-1,-1,
		-1,-1,-1,
		0,1,0,
		-1,-1,1,
		0,1,0,
		-1,-1,-1

	];

	constructor(track){
		super(0.2,track);
		
	}

	get_vertices(){
		return this.#vertices;
	}

	
}


class Sphere extends Cube{
	#normals;
	#vertices;
	constructor(track){
		super(0.2,track);
		this.#vertices = super.get_vertices();
		this.#normals = this.#vertices;
		midPointRefinement( this.#vertices, 3 );
		moveToSphericalSurface( this.#vertices );
		this.#normals = computeVertexNormals(this.#vertices);	
		
	}


	
	get_normals(){
		return this.#normals;
	}

	get_vertices(){
		return this.#vertices;
	}


}