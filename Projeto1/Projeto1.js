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

var array_objects = [car];

console.log(array_objects);

var count_click =0;

var gl = null; // WebGL context

var shaderProgram = null;



//Buffer for objects created and car separated
var objectVertexPositionBuffer = null;
	
var objectVertexNormalBuffer = null;



//----------------------------------------------------------------------------
//
// The WebGL code
//

//----------------------------------------------------------------------------
//
//  Rendering
//



function init_car(){

	car.set_normals(computeVertexNormals(car.get_vertices()));
	drawObjects();
}





function initBuffersObjects(polygon) {	

		
	objectVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, objectVertexPositionBuffer);	
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(polygon.get_vertices()), gl.STATIC_DRAW);
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

	initBuffersObjects(polygon);

	// Material properties
	
	gl.uniform3fv( gl.getUniformLocation(shaderProgram, "k_ambient"), 
		flatten(polygon.get_kAmbi()) );
    
    gl.uniform3fv( gl.getUniformLocation(shaderProgram, "k_diffuse"),
        flatten(polygon.get_kDiff()) );
    
    gl.uniform3fv( gl.getUniformLocation(shaderProgram, "k_specular"),
        flatten(polygon.get_kSpec()) );

	gl.uniform1f( gl.getUniformLocation(shaderProgram, "shininess"), 
		polygon.get_nPhong() );


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
	

	gl.drawArrays(primitiveType, 0, objectVertexPositionBuffer.numItems); 
		
		


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


var lastTime = 0;

function animate() {
	
	var timeNow = new Date().getTime();
	
	if( lastTime != 0 ) {
		
		var elapsed = timeNow - lastTime;
		
		// Global rotation
		
		

		// For every model --- Local rotations
		
		for(var i = 1; i < array_objects.length; i++ )
	    {
			if( array_objects[i].get_rotXXOn() ) {

				array_objects[i].set_rotAngleXX(array_objects[i].get_rotXXDir() * array_objects[i].get_rotXXSpeed() * (90 * elapsed) / 1000.0);
			}
		}
		
		// Rotating the light sources
	
		for(var i = 0; i < lightSources.length; i++ )
	    {
			if( lightSources[i].isRotYYOn() ) {

				var angle = lightSources[i].getRotAngleYY() + lightSources[i].getRotationSpeed() * (90 * elapsed) / 1000.0;
		
				lightSources[i].setRotAngleYY( angle );
			}
		}
}
	
	lastTime = timeNow;
}



function move_objects(){
	var i;

	
	
	for(i = 1; i < array_objects.length;i++ ){
		if(array_objects[i].get_tz() >= 3){
			console.log(array_objects[i].get_tx());
			console.log(array_objects[0].get_tx());	
			array_objects.splice(i,1);
			
		}
	} 

	for(i = 1; i < array_objects.length;i++ ){

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
		
		tracks_ocupied.push(p.get_track());

		array_objects.push(p);

	}

}

//Create specific obstacle
function create_polygon(){
	var object_type = Math.round((Math.random()*3));

	var polygon;

	var track = Math.round(((Math.random()*4)-2));

	var pNormals=[];

	switch(object_type){
		case 0:
			polygon = new Cube(track);
			polygon.set_normals(computeVertexNormals(polygon.get_vertices()));
	
		break;
		case 1:
			polygon = new Piramid(track);
			polygon.set_normals(computeVertexNormals(polygon.get_vertices()));

		break;
		case 2:
			polygon = new Cube(track);
			polygon.set_normals(computeVertexNormals(polygon.get_vertices()));
		break;
		case 3:
			polygon = new Sphere(track);
			
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
	
	polygon.set_tz(-25);
	return polygon;

}



//*function handle_objects(){
	
//	requestAnimFrame(handle_objects);
	
//	objects();

//	move_objects();

	
//}
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
			drawObjects();

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
	
	   

	outputInfos();

	//handle_objects();

	setInterval(objects,3000);

	setInterval(move_objects, 100);
	setInterval(animate, 1);
}


