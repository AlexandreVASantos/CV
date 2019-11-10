class Polygon{
	#tx = 0.0;
	#ty = 0.0;
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

	set_tz(tz){
		this.#tz += tz;
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
	#vertices=[
		
		0.3, -0.3, -1, 
		-0.3, -0.3, -1, 
		-0.3, -0.5, -1, 

		0.3, -0.3, -1, 
		-0.3, -0.5, -1,
		0.3, -0.5, -1, 

		0.3, -0.3, -2, 
		-0.3, -0.3, -2,
		-0.3, -0.3, -1,

		0.3, -0.3, -2, 
		-0.3, -0.3, -1,
		0.3, -0.3, -1, 

		0.3, -0.3, -2, 
		0.3, -0.3, -1, 
		0.3, -0.5, -2, 

		0.3, -0.3, -1, 
		0.3, -0.5, -1, 
		0.3, -0.5, -2, 

		-0.3, -0.3, -2, 
		-0.3, -0.5, -2, 
		-0.3, -0.3, -1, 

		-0.3, -0.5, -2, 
		-0.3, -0.5, -1, 
		-0.3, -0.3, -1, 

		-0.3, -0.5, -2, 
		0.3, -0.5, -2,
		0.3, -0.5, -1,

		0.3, -0.5, -1, 
		-0.3, -0.5, -1,  
		-0.3, -0.5, -2, 

		-0.3, -0.3, -2, 
		0.3, -0.3, -2,
		0.3, -0.5, -2,

		0.3, -0.5, -2,
		-0.3, -0.5, -2, 
		-0.3, -0.3, -2, 

		-0.2, -0.1, -1.2, 
		-0.2, -0.3, -1.2,
		0.2, -0.3, -1.2, 

		0.2, -0.3, -1.2, 
		0.2, -0.1, -1.2, 
		-0.2, -0.1, -1.2,


		-0.2, -0.1, -1.6,
		-0.2, -0.1, -1.2,
		0.2, -0.1, -1.2, 

		0.2, -0.1, -1.2, 
		0.2, -0.1, -1.6, 
		-0.2, -0.1, -1.6, 

		0.2, -0.1, -1.6, 
		0.2, -0.1, -1.2,
		0.2, -0.3, -1.2, 

		0.2, -0.3, -1.2, 
		0.2, -0.3, -1.6, 
		0.2, -0.1, -1.6, 

		-0.2, -0.1, -1.6, 
		-0.2, -0.3, -1.6, 
		-0.2, -0.3, -1.2, 

		-0.2, -0.3, -1.2, 
		-0.2, -0.1, -1.2, 
		-0.2, -0.1, -1.6, 

		-0.2, -0.3, -1.2, 
		-0.2, -0.3, -1.6, 
		0.2, -0.3, -1.6, 

		0.2, -0.3, -1.6, 
		0.2, -0.3, -1.2, 
		-0.2, -0.3, -1.2, 

		-0.2, -0.1, -1.6, 
		0.2, -0.1, -1.6, 
		0.2, -0.3, -1.6, 

		0.2, -0.3, -1.6, 
		-0.2, -0.3, -1.6, 
		-0.2, -0.1, -1.6,

	];
	

	constructor(){
		super(0.75, 0.75, 0.75, 0);
		super.set_ty(-0.5);
	}

	get_vertices(){
		return this.#vertices;
	}

	
}




class Cube extends Polygon{
	#vertices=[

		// FRONT FACE
		 
		-0.25, -0.25,  0.25,
		 
		 0.25, -0.25,  0.25,
		 
		 0.25,  0.25,  0.25,

		 
		 0.25,  0.25,  0.25,
		 
		-0.25,  0.25,  0.25,
		 
		-0.25, -0.25,  0.25,
		
		// TOP FACE
		
		-0.25,  0.25,  0.25,
		 
		 0.25,  0.25,  0.25,
		 
		 0.25,  0.25, -0.25,

		 
		 0.25,  0.25, -0.25,
		 
		-0.25,  0.25, -0.25,
		 
		-0.25,  0.25,  0.25,
		
		// BOTTOM FACE 
		
		-0.25, -0.25, -0.25,
		 
		 0.25, -0.25, -0.25,
		 
		 0.25, -0.25,  0.25,

		 
		 0.25, -0.25,  0.25,
		 
		-0.25, -0.25,  0.25,
		 
		-0.25, -0.25, -0.25,
		
		// LEFT FACE 
		
		-0.25,  0.25,  0.25,
		 
		-0.25, -0.25, -0.25,

		-0.25, -0.25,  0.25,
		 
		 
		-0.25,  0.25,  0.25,
		 
		-0.25,  0.25, -0.25,
		 
		-0.25, -0.25, -0.25,
		
		// RIGHT FACE 
		
		 0.25,  0.25, -0.25,
		 
		 0.25, -0.25,  0.25,

		 0.25, -0.25, -0.25,
		 
		 
		 0.25,  0.25, -0.25,
		 
		 0.25,  0.25,  0.25,
		 
		 0.25, -0.25,  0.25,
		
		// BACK FACE 
		
		-0.25,  0.25, -0.25,
		 
		 0.25, -0.25, -0.25,

		-0.25, -0.25, -0.25,
		 
		 
		-0.25,  0.25, -0.25,
		 
		 0.25,  0.25, -0.25,
		 
		 0.25, -0.25, -0.25,			 
	];

		// And their colour

	

	constructor(s,track){
		super(s, track);
	}

	get_vertices(){
		return this.#vertices;
	}

	

}


class Piramid extends Polygon{
	#vertices=[

		-0.25, 0.0, -0.25, 
		-0.25, 0.0, 0.25, 
		0.0, 0.25, 0.0, 

		-0.25, 0.0, 0.25, 
		0.25, 0.0, 0.25, 
		0.0, 0.25, 0.0, 

		0.25, 0.0, 0.25, 
		0.25, 0.0, -0.25, 
		0.0, 0.25, 0.0, 

		0.25, 0.0, -0.25,
		-0.25, 0.0, -0.25,
		0.0, 0.25, 0.0, 

		-0.25, 0.0, 0.25, 
		0.25, 0.0, -0.25, 
		0.25, 0.0, 0.25, 

		0.25, 0.0, -0.25, 
		-0.25, 0.0, 0.25,
		-0.25, 0.0, -0.25, 


	];

	constructor(s,track){
		super(s,track);
	}

	get_vertices(){
		return this.#vertices;
	}

	
}


class Sphere extends Cube{
	#normals;
	#vertices;
	constructor(s,track){
		super(s,track);
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