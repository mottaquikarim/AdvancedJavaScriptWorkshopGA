var express 		= require('express'),
	http 			= require('http'),
	app 			= express(),
	APP_PORT 		= 3000,
	STATIC_PATH 	= 'static',
	STATIC_ROUTE	= '/app';

app.set('port', APP_PORT);

var staticapp = require('./static');
app.use( staticapp( STATIC_PATH, STATIC_ROUTE ) );

var githuboauthapp = require('./GitHubOAuth');
app.use( githuboauthapp( STATIC_ROUTE ) );

var githubapiapp = require('./GitHubAPI');
app.use( githubapiapp() );

http.createServer( app )
.listen( 
	app.get('port'),
	function() {
		console.log('Server started! Listening on: ' + app.get('port') );
	}
);