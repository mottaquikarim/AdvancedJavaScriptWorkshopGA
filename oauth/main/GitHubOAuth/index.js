module.exports = function() {
	var express 	= require('express'),
		session 	= require('express-session'),
    	bodyParser 	= require('body-parser'),
		app 		= express(),
		Routes 		= require('./GitHubOAuthHelper');

	// session config
	app.use(session({
	    resave: false,
	    saveUninitialized: false,
	    secret: 'l33t',
	    foo: 'bar'
	}));
	app.use(function(req, res, next) {
	    res.locals.session = req.session;
	    next();
	});

	// body parser config
	app.use( bodyParser.json() );
	app.use( bodyParser.urlencoded({
	    extended: true
	}));

	// define app routes
	app.get( '/authenticate', Routes.authenticate );

	return app;
} // export an app
