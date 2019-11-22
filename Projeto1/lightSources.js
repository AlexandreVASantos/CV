//////////////////////////////////////////////////////////////////////////////
//
//  A class for instantiating light sources.
//
//  J. Madeira - Oct. 2015 + November 2017
//
//////////////////////////////////////////////////////////////////////////////

//----------------------------------------------------------------------------
//
//  Constructor
//

function LightSource( ) {
	
	// A new light source is always on
	
	this.isOn = true;
	
	// And is directional
	
	this.position = [ 0.0, 0.0, 1.0, 0.0 ];
	
	// White light
	
	this.intensity = [ 1.0, 1.0, 1.0 ];
	
	// Ambient component
	
	this.ambientIntensity = [ 0.2, 0.2, 0.2 ];
	
	// Animation controls
	
	this.rotXXOn = false;
	
	this.rotYYOn = false;
	
	this.rotZZOn = false;
	
	// Rotation angles	
	
	this.rotAngleXX = 0.0;
	
	this.rotAngleYY = 0.0;
	
	this.rotAngleZZ = 0.0;	
	
	// NEW --- Rotation speed factor - Allow different speeds
	
	this. rotationSpeed = 1.0;
}

//----------------------------------------------------------------------------
//
//  Methods
//

LightSource.prototype.isOff = function() {
	
	return this.isOn == false;
}

LightSource.prototype.switchOn = function() {
	
	this.isOn = true;
}

LightSource.prototype.switchOff = function() {
	
	this.isOn = false;
}

LightSource.prototype.isDirectional = function() {
	
	return this.position[3] == 0.0;
}

LightSource.prototype.getPosition = function() {
	
	return this.position;
}

LightSource.prototype.setPosition = function( x, y, z, w ) {
	
	this.position[0] = x;
	
	this.position[1] = y;
	
	this.position[2] = z;
	
	this.position[3] = w;
}

LightSource.prototype.getIntensity = function() {
	
	return this.intensity;
}

LightSource.prototype.setIntensity = function( r, g, b ) {
	
	this.intensity[0] = r;
	
	this.intensity[1] = g;
	
	this.intensity[2] = b;
}

LightSource.prototype.getAmbIntensity = function() {
	
	return this.ambientIntensity;
}

LightSource.prototype.setAmbIntensity = function( r, g, b ) {
	
	this.ambientIntensity[0] = r;
	
	this.ambientIntensity[1] = g;
	
	this.ambientIntensity[2] = b;
}

LightSource.prototype.isRotYYOn = function() {
	
	return this.rotYYOn;
}

LightSource.prototype.switchRotYYOn = function() {
	
	this.rotYYOn = true;
}

LightSource.prototype.switchRotYYOff = function() {
	
	this.rotYYOn = false;
}

LightSource.prototype.getRotAngleYY = function() {
	
	return this.rotAngleYY;
}

LightSource.prototype.setRotAngleYY = function( angle ) {
	
	this.rotAngleYY = angle;
}

LightSource.prototype.getRotationSpeed = function() {
	
	return this.rotationSpeed;
}

LightSource.prototype.setRotationSpeed = function( s ) {
	
	this.rotationSpeed = s;
}

// COMPLETE THE MISSING METHODS !!


//----------------------------------------------------------------------------
//
//  Instantiating light sources
//

var lightSources = [];

// Light source 0

lightSources.push( new LightSource() );

lightSources[0].setPosition( 1.0, 1.0, 1.0, 1.0 );

lightSources[0].setIntensity( 1.0, 1.0, 1.0 );

lightSources[0].setAmbIntensity( 1, 1, 1 );

// Light source 1

lightSources.push( new LightSource() );

lightSources[1].setPosition( 1.0, 1.0, 1.0, 1.0 );

lightSources[1].setIntensity( 0.0, 0.0, 0.0 );

lightSources[1].setAmbIntensity( 1, 1, 1 );


// Light source 2

lightSources.push( new LightSource() );

lightSources[2].setPosition( 0.0, 0.0, 0.0, 1.0 );

lightSources[2].setIntensity( 1.0, 0.0, 0.0 );

lightSources[2].setAmbIntensity( 1.0, 0.0, 0.0 );



// Light source 3

lightSources.push( new LightSource() );

lightSources[3].setPosition( 0.0, 0.0, 0.0, 1.0 );

lightSources[3].setIntensity( 0.0, 0.0, 1.0 );

lightSources[3].setAmbIntensity( 0.0, 0.0, 1.0 );

lightSources[3].switchRotYYOn();

lightSources[3].setRotationSpeed( 30.0 );



// Light source 4

lightSources.push( new LightSource() );

lightSources[4].setPosition( 0.0, 0.0, 0.0, 1.0 );

lightSources[4].setIntensity( 0.0, 1.0, 0.0 );

lightSources[4].setAmbIntensity( 0.0, 1.0 , 0.0 );

lightSources[4].switchRotYYOn();

lightSources[4].setRotationSpeed( 5.0 );


// Light source 5

lightSources.push( new LightSource() );

lightSources[5].setPosition( 1.0, 0.0, 0.0, 1.0 );

lightSources[5].setIntensity( 1, 1, 1 );

lightSources[5].setAmbIntensity( 1,1,1 );


// Light source 5

lightSources.push( new LightSource() );

lightSources[6].setPosition( -1.0, 0.0, 0.0, 1.0 );

lightSources[6].setIntensity( 0, 0, 0 );

lightSources[6].setAmbIntensity( 0,0,0 );




