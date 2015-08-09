module.exports = function() {
	var express = require('express'),
		Routes	= require('./GitHubAPIHelper'),
		app		= express();
	
	app.get('/me', Routes.me);

	return app;
} // exports the app