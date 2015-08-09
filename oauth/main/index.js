var express 	= require('express'),
	http 		= require('http'),
	app 		= express(),
	APP_PORT 	= 3000;

app.set('port', APP_PORT);

var staticapp = require('./static');
app.use( staticapp() );

var githuboauthapp = require('./GitHubOAuth');
app.use( githuboauthapp() );

http.createServer( app )
.listen( 
	app.get('port'),
	function() {
		console.log('Server started! Listening on: ' + app.get('port') );
	}
);