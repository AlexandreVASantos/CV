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
	#texture;
	#normals=[];
	#rotXXOn = Math.round(Math.random());
	#rotXXDir = Math.round(Math.random());
	#rotXXSpeed = Math.round(Math.random());

	#textureCoords = [

          // Front face
          0.0, 0.0,0.0,
          0.0, 0.0,1.0,
          0.0, 1.0,0.0,
          0.0, 1.0,1.0,
          1.0, 0.0,0.0,
		  1.0, 0.0,1.0,

          // Back face
		  0.0, 0.0,0.0,
          1.0, 0.0,1.0,
          0.0, 1.0,0.0,
          0.0, 1.0,1.0,
          1.0, 1.0,0.0,
		  1.0, 1.0,1.0,
          // Top face
		  0.0, 0.0,0.0,
          1.0, 0.0,1.0,
          1.0, 1.0,1.0,
          0.0, 1.0,1.0,
          0.0, 1.0,1.0,
		  0.0, 1.0,1.0,

          // Bottom face
	      0.0, 0.0,0.0,
          1.0, 0.0,1.0,
          1.0, 1.0,1.0,
          0.0, 1.0,1.0,
          0.0, 1.0,1.0,
		  0.0, 1.0,1.0,

          // Right face
		  0.0, 0.0,0.0,
          1.0, 0.0,1.0,
          1.0, 1.0,1.0,
          0.0, 1.0,1.0,
          0.0, 1.0,1.0,
		  0.0, 1.0,1.0,

          // Left face
		  0.0, 0.0,0.0,
          1.0, 0.0,1.0,
          1.0, 1.0,1.0,
          0.0, 1.0,1.0,
          0.0, 1.0,1.0,
		  0.0, 1.0,1.0,
	];
	

	constructor(s, track){
		this.#sx = s;
		this.#sy = s;
		this.#sz = s;
		this.#track = track;

	}


	prepare_polygon(texture){
		if(texture == false){
			this.#texture = false;
			this.#kAmbi = [Math.random(),Math.random(),Math.random()];
			this.#kDiff = [Math.random(),Math.random(),Math.random()];
			this.#kSpec = [Math.random(),Math.random(),Math.random()];
		}else{
			this.#texture = true;
		}
	}

	get_texture_coord(){
		return this.#textureCoords;
	}

	textures(){
		return this.#texture;
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

	set_track(number){
		this.#track += number;
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
		//FRONT
		-1,1,3,
		-1,0,3,
		1,1,3,
		1,1,3,
		-1,0,3,
		1,0,3,

		//BACK
		-1,0,-3,
		-1,1,-3,
		1,0,-3,
		-1,1,-3,
		1,1,-3,
		1,0,-3,

		//BOTTOM

		-1,0,3,
		-1,1,-3,
		1,0,-3,
		1,0,-3,
		1,0,3,
		-1,0,3,

		//LEFT

		-1,1,3,
		-1,1,-3,
		-1,0,3,
		-1,0,3,
		-1,1,-3,
		-1,0,-3,

		//RIGHT

		1,1,-3,
		1,1,3,
		1,0,3,
		1,0,3,
		1,0,-3,
		1,1,-3,

		//TOP

		-1,1,3,
		1,1,-3,
		-1,1,-3,
		-1,1,3,
		1,1,3,
		1,1,-3

	];
	
	#part1 = [
		-1,1.5,1,
		-1,1,1,
		1,1.5,1,
		1,1.5,1,
		-1,1,1,
		1,1,1,
		-1,1.5,-1,
		-1,1.5,1,
		1,1.5,-1,
		1,1.5,-1,
		-1,1.5,1,
		1,1.5,1,
		1,1.5,1,
		1,1,1,
		1,1.5,-1,
		1,1.5,-1,
		1,1,1,
		1,1,-1,
		-1,1.5,1,
		-1,1.5,-1,
		-1,1,1,
		-1,1.5,-1,
		-1,1,-1,
		-1,1,1
	];




	#Frontwheels = [];


	#RearWheels = [];
 
	#mirror1 =[
			1,1.5,1,
			1,1,2,
			1,1,1,
			1,1.5,1,
			-1,1,2,
			1,1,2,
			1,1.5,1,
			-1,1.5,1,
			-1,1,2,
			-1,1.5,1,
			-1,1,1,
			-1,1,2
		];


	#mirror2 = [
			1,1.5,-1,
			1,1,-1,
			1,1,-2,
			-1,1.5,-1,
			-1,1,-2,
			-1,1,-1,
			-1,1.5,-1,
			1,2,-1,
			1,1,-2,
			-1,1.5,-1,
			1,1,-2,
			-1,1,-2
	];

	constructor(){
		super(0.15, 0);
		super.set_ty(-0.25);
		super.set_tz(-2);


		
		
	}

	get_vertices(){
		return this.#part0.concat(this.#part1).concat(this.#mirror1).concat(this.#mirror2);
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


class Sphere extends Polygon{
	#normals;
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
		super(0.2,track);
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