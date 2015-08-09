module.exports = function( staticPath, serverPath ) {
	var express 	= require('express'),
		serveStatic = require('serve-static'),
		app 		= express();

	if ( typeof staticPath === "undefined" ) {
		staticPath = 'static';
	}

	if ( typeof serverPath === "undefined" ) {
		serverPath = '/app';
	}

	app.use(
		serverPath,
		serveStatic(staticPath, {'index': ['index.html']})
	);

	return app;
}