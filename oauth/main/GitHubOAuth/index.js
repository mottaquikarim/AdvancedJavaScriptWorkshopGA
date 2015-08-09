module.exports = function( redirectTo ) {
	var express 	= require('express'),
		session 	= require('express-session'),
    	bodyParser 	= require('body-parser'),
		app 		= express(),
		Routes 		= require('./GitHubOAuthHelper');

	if ( redirectTo === "undefined" ) {
		Routes.REDIRECT_TO = '/';
	}
	else {
		Routes.REDIRECT_TO = redirectTo;
	}

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
	app.get('/', Routes.root )
	app.get( '/authenticate', Routes.authenticate );
	app.get( '/redirect', Routes.redirect );
	app.get( '/isloggedin', Routes.isloggedin );

	// expose instance of our app to real world
	return app;
} // export an app

