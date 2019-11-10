//////////////////////////////////////////////////////////////////////////////
//
//  Projeto.js 
//
//  
//
//  References: www.learningwebgl.com + E. Angel examples
//
//  J. Madeira - October 2015
//
//////////////////////////////////////////////////////////////////////////////




////
// vertices array
// color computed from light source
// normal vectors
//






//----------------------------------------------------------------------------
//
// Global Variables
//

var car = new Car();



var array_objects = []

var count_click =0;

var gl = null; // WebGL context

var shaderProgram = null;



//Buffer for objects created and car separated
var objectVertexPositionBuffer = null;
	
var objectVertexNormalBuffer = null;

var carVertexNormalBuffer = null;

var carVertexPositionBuffer = null;

// The GLOBAL transformation parameters

var globalAngleYY = 0.0;

var globalTz = 0.0;

// The local transformation parameters

// The translation vector



// NEW - GLOBAL Animation controls

var globalRotationYY_ON = 1;

var globalRotationYY_DIR = 1;

var globalRotationYY_SPEED = 1;

// NEW - Local Animation controls

var rotationXX_ON = 0;

var rotationXX_DIR = 0;

var rotationXX_SPEED = 0;
 
var rotationYY_ON = 0;

var rotationYY_DIR = 1;

var rotationYY_SPEED = 1;
 
var rotationZZ_ON = 0;

var rotationZZ_DIR = 1;

var rotationZZ_SPEED = 1;
 
// To allow choosing the way of drawing the model triangles

var primitiveType = null;
 
// To allow choosing the projection type

var projectionType = 0;
 
// For storing the vertices defining the triangles


//----------------------------------------------------------------------------
//
// The WebGL code
//

//----------------------------------------------------------------------------
//
//  Rendering
//



function init_car(){

	var carNormals = [];

	computeVertexNormals(car.get_vertices(), carNormals);

	car.set_normals(carNormals);

}



// Handling the Vertex and the Color Buffers

function initBuffersCar() {	
	
	// Coordinates
		
	carVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, carVertexPositionBuffer);	
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(car.get_vertices()), gl.STATIC_DRAW);
	//gl.bufferData(gl.ARRAY_BUFFER, 0, gl.STATIC_DRAW);
	carVertexPositionBuffer.itemSize = 3;
	carVertexPositionBuffer.numItems = car.get_vertices().length / 3;
	
	// Associating to the vertex shader
	
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 
			carVertexPositionBuffer.itemSize, 
			gl.FLOAT, false, 0, 0);


	// Vertex Normal Vectors
		
	carVertexNormalBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, carVertexNormalBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(car.get_normals()), gl.STATIC_DRAW);
	carVertexNormalBuffer.itemSize = 3;
	carVertexNormalBuffer.numItems = car.get_normals().length / 3;			

	// Associating to the vertex shader
	
	gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, 
			carVertexNormalBuffer.itemSize, 
			gl.FLOAT, false, 0, 0);	


}


function initBuffersObjects(polygon) {	

		
	objectVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, objectVertexPositionBuffer);	
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(polygon.get_vertices()), gl.STATIC_DRAW);
	//gl.bufferData(gl.ARRAY_BUFFER, 0, gl.STATIC_DRAW);
	objectVertexPositionBuffer.itemSize = 3;
	objectVertexPositionBuffer.numItems = polygon.get_vertices().length / 3;
	
	// Associating to the vertex shader
	
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 
			objectVertexPositionBuffer.itemSize, 
			gl.FLOAT, false, 0, 0);


	// Vertex Normal Vectors
		
	objectVertexNormalBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, objectVertexNormalBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(polygon.get_normals()), gl.STATIC_DRAW);
	objectVertexNormalBuffer.itemSize = 3;
	objectVertexNormalBuffer.numItems = polygon.get_normals().length / 3;			

	// Associating to the vertex shader
	
	gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, 
			objectVertexNormalBuffer.itemSize, 
			gl.FLOAT, false, 0, 0);	


	
}

//----------------------------------------------------------------------------

//  Drawing the model

function drawModel( polygon,
					mvMatrix,
					primitiveType ) {

	t = polygon.get_translation()

	s = polygon.get_scale();

	angle = polygon.get_angle();

    // Pay attention to transformation order !!
    
	mvMatrix = mult( mvMatrix, translationMatrix( t[0], t[1], t[2] ) );
						 
	mvMatrix = mult( mvMatrix, rotationZZMatrix( angle[2] ) );
	
	mvMatrix = mult( mvMatrix, rotationYYMatrix( angle[1] ) );
	
	mvMatrix = mult( mvMatrix, rotationXXMatrix( angle[0] ) );
	
	mvMatrix = mult( mvMatrix, scalingMatrix( s[0], s[1], s[2] ) );
						 
	// Passing the Model View Matrix to apply the current transformation
	
	var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
	
	gl.uniformMatrix4fv(mvUniform, false, new Float32Array(flatten(mvMatrix)));

	initBuffersObjects();

	// Material properties
	
	gl.uniform3fv( gl.getUniformLocation(shaderProgram, "k_ambient"), 
		flatten(polygon.get_kAmbi()) );
    
    gl.uniform3fv( gl.getUniformLocation(shaderProgram, "k_diffuse"),
        flatten(polygon.get_kDiff()) );
    
    gl.uniform3fv( gl.getUniformLocation(shaderProgram, "k_specular"),
        flatten(polygon.get_kSpec()) );

	gl.uniform1f( gl.getUniformLocation(shaderProgram, "shininess"), 
		polygon.get_nPhong() );



	
	// Drawing the contents of the vertex buffer
	
	// primitiveType allows drawing as filled triangles / wireframe / vertices
	
	if( primitiveType == gl.LINE_LOOP ) {
		
		// To simulate wireframe drawing!
		
		// No faces are defined! There are no hidden lines!
		
		// Taking the vertices 3 by 3 and drawing a LINE_LOOP
		
		var i;
		
		for( i = 0; i < objectVertexPositionBuffer.numItems / 3; i++ ) {
		
			gl.drawArrays( primitiveType, 3 * i, 3 ); 
		}
	}	
	else {
				
		gl.drawArrays(primitiveType, 0, objectVertexPositionBuffer.numItems); 
		
	}	


}

//needs
function drawModelCar(car,
					mvMatrix,
					primitiveType ) {

    // Pay attention to transformation order !!
	
    var scale = car.get_scale();

	var angle = car.get_angle();

	var t = car.get_translation();
	


	mvMatrix = mult( mvMatrix, translationMatrix( t[0], t[1], t[2] ) );
						 
	mvMatrix = mult( mvMatrix, rotationZZMatrix( angle[2] ) );
	
	mvMatrix = mult( mvMatrix, rotationYYMatrix( angle[1] ) );
	
	mvMatrix = mult( mvMatrix, rotationXXMatrix( angle[0] ) );
	
	mvMatrix = mult( mvMatrix, scalingMatrix( scale[0], scale[1], scale[2] ) );
						 
	// Passing the Model View Matrix to apply the current transformation
	console.log("ainda esta aqui");
	var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
	
	gl.uniformMatrix4fv(mvUniform, false, new Float32Array(flatten(mvMatrix)));

	initBuffersCar(car);

	gl.uniform3fv( gl.getUniformLocation(shaderProgram, "k_ambient"), 
		flatten(car.get_kAmbi()) );
    
    gl.uniform3fv( gl.getUniformLocation(shaderProgram, "k_diffuse"),
        flatten(car.get_kDiff()) );
    
    gl.uniform3fv( gl.getUniformLocation(shaderProgram, "k_specular"),
        flatten(car.get_kSpec()) );

	gl.uniform1f( gl.getUniformLocation(shaderProgram, "shininess"), 
		car.get_nPhong() );

	console.log("ainda esta aqui2");

	 // Light Sources
	
	var numLights = lightSources.length;
	
	gl.uniform1i( gl.getUniformLocation(shaderProgram, "numLights"), 
		numLights );

	//Light Sources
	
	for(var i = 0; i < lightSources.length; i++ )
	{
		gl.uniform1i( gl.getUniformLocation(shaderProgram, "allLights[" + String(i) + "].isOn"),
			lightSources[i].isOn );
    
		gl.uniform4fv( gl.getUniformLocation(shaderProgram, "allLights[" + String(i) + "].position"),
			flatten(lightSources[i].getPosition()) );
    
		gl.uniform3fv( gl.getUniformLocation(shaderProgram, "allLights[" + String(i) + "].intensities"),
			flatten(lightSources[i].getIntensity()) );
    }
	// Drawing the contents of the vertex buffer
	
	// primitiveType allows drawing as filled triangles / wireframe / vertices
	
	if( primitiveType == gl.LINE_LOOP ) {
		
		// To simulate wireframe drawing!
		
		// No faces are defined! There are no hidden lines!
		
		// Taking the vertices 3 by 3 and drawing a LINE_LOOP
		
		var i;
		
		for( i = 0; i < carVertexPositionBuffer.numItems / 3; i++ ) {
		
			gl.drawArrays( primitiveType, 3 * i, 3 ); 
		}
	}	
	else {
				
		gl.drawArrays(primitiveType, 0, carVertexPositionBuffer.numItems); 
		
	}	

}

//----------------------------------------------------------------------------


//  Drawing the 3D scene

function drawCar(object) {
	
	var pMatrix;
	
	var mvMatrix = mat4();
	
	// Clearing the frame-buffer and the depth-buffer
	
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// A standard view volume.
	
	// Viewer is at (0,0,0)
	
	// Ensure that the model is "inside" the view volume
	
	pMatrix = perspective( 45, 1, 0.03, 15 );
	
	// Global transformation !!
	
	globalTz = -2.4;
	
	// Passing the Projection Matrix to apply the current projection
	
	var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	
	gl.uniformMatrix4fv(pUniform, false, new Float32Array(flatten(pMatrix)));
	
	// GLOBAL TRANSFORMATION FOR THE WHOLE SCENE
	
	mvMatrix = translationMatrix( 0, 0, globalTz );
	
	// Instantianting the current model

	drawModelCar( car,
	           mvMatrix,
	           primitiveType );
}


//  Drawing the 3D scene

function drawObjects() {

	
	
	var pMatrix;
	
	var mvMatrix = mat4();
	
	// Clearing the frame-buffer and the depth-buffer
	
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	
	// A standard view volume.
	
	// Viewer is at (0,0,0)
	
	// Ensure that the model is "inside" the view volume
	
	pMatrix = perspective( 45, 1, 0.03, 15 );
	
	// Global transformation !!
	
	globalTz = -2.4;

	
	
	// Passing the Projection Matrix to apply the current projection
	
	var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	
	gl.uniformMatrix4fv(pUniform, false, new Float32Array(flatten(pMatrix)));
	
	// GLOBAL TRANSFORMATION FOR THE WHOLE SCENE
	
	mvMatrix = translationMatrix( 0, 0, globalTz );
	
	// Instantianting the current model

	for(i = 0; i < array_objects.length;i++ ){
			
		drawModel( array_objects[i],
		           mvMatrix,
		           primitiveType );
			
	}




}


function move_objects(){
	var i;

	
	
	for(i = 0; i < array_objects.length;i++ ){
		if(array_objects[i].get_tz() >= 2){
			array_objects.splice(i,1);
			
		}
	} 

	for(i = 0; i < array_objects.length;i++ ){
		array_objects[i].set_tz(0.5); 

		
	}

	drawObjects();
		

}


//Creates obstacles
function objects(){

	var n_tracks_ocupied = Math.round((Math.random()*4));
	var i;
	var tracks_ocupied = [];



	for(i=1;i<=n_tracks_ocupied;i++){
		var p = create_polygon();
		while(tracks_ocupied.includes(p.get_track())){		//so that objects do not overlap each other
			var p = create_polygon();
		}
		

		array_objects.push(p);

	}

}

//Create specific obstacle
function create_polygon(){
	var object_type = Math.round((Math.random()*2));

	var polygon;

	var scale= Math.random();

	var track = Math.round(((Math.random()*4) -2));


	switch(object_type){
		case 0:
			polygon = new Cube(scale,track);
		break;
		case 1:
			polygon = new Piramid(scale, track);
		break;
		case 2:
			polygon = new Cube(scale,track);
		break;

	}


	var move = 0;
	switch(polygon.get_track()){
		case -2:
			move = -1;
		break;
		case -1:
			move = -0.5;
		break;
		case 0:
		break;
		case 1:
			move = 0.5;
		break;
		case 2:
			move = 1;
		break;


	}

	polygon.set_tx(move);

	polygon.set_tz(-50);
	return polygon;

}



function handle_objects(){
	
	requestAnimFrame(handle_objects);
	
	objects();

	move_objects();

}

//----------------------------------------------------------------------------
//
//  User Interaction
//

function outputInfos(){
    
}

//----------------------------------------------------------------------------

function setEventListeners(){
	
    document.addEventListener("keypress", function(event){
				
			var key = event.keyCode; // ASCII
			
			switch(key){
				case 97:
					if (count_click > -2){
						car.set_tx(-0.5);
						//angleZZ-=5;
						count_click--;	
					} 

				break;
				case 100:
					if (count_click < 2){
						car.set_tx(0.5);
						//angleZZ+=5;
						count_click++;	
					} 
				break;
				
			}
			drawCar();

		});     
}

//----------------------------------------------------------------------------
//
// WebGL Initialization
//

function initWebGL( canvas ) {
	try {
		
		// Create the WebGL context
		
		// Some browsers still need "experimental-webgl"
		
		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

		

		
		// DEFAULT: The viewport occupies the whole canvas 
		
		// DEFAULT: The viewport background color is WHITE
		
		// NEW - Drawing the triangles defining the model
		
		primitiveType = gl.TRIANGLES;
		
		// DEFAULT: Face culling is DISABLED
		
		// Enable FACE CULLING
		
		gl.enable( gl.CULL_FACE );
		
		// DEFAULT: The BACK FACE is culled!!
		
		// The next instruction is not needed...
		
		gl.cullFace( gl.BACK );
        
	} catch (e) {
	}
	if (!gl) {
		alert("Could not initialise WebGL, sorry! :-(");
	}        
}

//----------------------------------------------------------------------------

function runWebGL() {
	
	var canvas = document.getElementById("my-canvas");
	
	initWebGL( canvas );

	shaderProgram = initShaders( gl );

	init_car();
	
	setEventListeners();
	
	drawCar(car);		   

	outputInfos();

	//handle_objects();
}


