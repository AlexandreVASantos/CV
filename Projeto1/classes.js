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
	#kAmbi=[Math.random(),Math.random(),Math.random()];
	#kDiff=[Math.random(),Math.random(),Math.random()];
	#kSpec=[Math.random(),Math.random(),Math.random()];
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

	set_kAmbi(number){
		this.#kAmbi  = [number,number,number];
	}


	set_kDiff(number){
		this.#kDiff = [number,number,number];
	}


	set_kSpec(number){
		this.#kSpec = [number,number,number];
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
	#vertices = [
            // Front face
            -1.0, -1.0,  1.0,
             1.0, -1.0,  1.0,
             1.0,  1.0,  1.0,
            -1.0,  1.0,  1.0,

            // Back face
            -1.0, -1.0, -1.0,
            -1.0,  1.0, -1.0,
             1.0,  1.0, -1.0,
             1.0, -1.0, -1.0,

            // Top face
            -1.0,  1.0, -1.0,
            -1.0,  1.0,  1.0,
             1.0,  1.0,  1.0,
             1.0,  1.0, -1.0,

            // Bottom face
            -1.0, -1.0, -1.0,
             1.0, -1.0, -1.0,
             1.0, -1.0,  1.0,
            -1.0, -1.0,  1.0,

            // Right face
             1.0, -1.0, -1.0,
             1.0,  1.0, -1.0,
             1.0,  1.0,  1.0,
             1.0, -1.0,  1.0,

            // Left face
            -1.0, -1.0, -1.0,
            -1.0, -1.0,  1.0,
            -1.0,  1.0,  1.0,
            -1.0,  1.0, -1.0
	];

	
// Vertex indices defining the triangles
    #cubeVertexIndices = [

            0, 1, 2,      0, 2, 3,    // Front face

            4, 5, 6,      4, 6, 7,    // Back face

            8, 9, 10,     8, 10, 11,  // Top face

            12, 13, 14,   12, 14, 15, // Bottom face

            16, 17, 18,   16, 18, 19, // Right face

            20, 21, 22,   20, 22, 23  // Left face
        ];

	constructor(track){
		super(0.2, track);
	}

	get_vertices(){
		return this.#vertices;
	}


	get_index_vertex(){
		return this.#cubeVertexIndices;
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
		super(0.25,track);
		this.#normals = this.#vertices;
		midPointRefinement( this.#vertices, 5 );
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


class Scenario extends Polygon{
	#vertices = [
			6,0,1,
			6,100,1,
			7,0,-50,
			-6,0,1,
			-7,0,-50,
			-6,100,1,
	];

	constructor(track){
		super(0.2,track);
		super.set_kSpec(0);
		super.set_kAmbi(0);
		super.set_kDiff(0);
		
		
	}

	get_vertices(){
		return this.#vertices;
	}


}

class Road extends Polygon{
	#vertices = [
			6,0,1,
			-7,0,-50,
			-6,0,1,
			7,0,-50,
			-7,0,-50,
			6,0,1,
	];

	constructor(track){
		super(0.2,track);
		super.set_kSpec(1);
		super.set_kAmbi(1);
		super.set_kDiff(1);
		
		
		
	}

	get_vertices(){
		return this.#vertices;
	}


}

