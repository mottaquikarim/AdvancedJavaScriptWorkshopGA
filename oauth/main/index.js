var express 	= require('express'),
	http 		= require('http'),
	app 		= express(),
	APP_PORT 	= 3000;

app.set('port', APP_PORT);


app.get('/foo', function( request, reply) {
	reply.send("Hello, Wrold!");
});

http.createServer( app ).listen( app.get('port'), function() {
	console.log('Server started! Listening on: ' + app.get('port') );
});