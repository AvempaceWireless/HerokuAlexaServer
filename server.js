'use strict';

var AlexaAppServer = require( 'alexa-app-server' );


var CheckServer = function() {
   console.log("Check server working");
}

var server = new AlexaAppServer( {
	httpsEnabled: false,
	port: process.env.PORT || 80,
	debug: true,
	log: true
	
} );

CheckServer();

server.start();