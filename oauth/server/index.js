var express = require('express'),
    http = require('http'),
    app = express(),
    port = 3000;

app.set( 'port', port );

// oauth
var oauth = require('./oauth');
app.use( oauth );

// staticapp
var staticapp = require('./static');
app.use( staticapp );

http.createServer( app ).listen( app.get('port'), function() {
    console.log( 'Express server listening on port ' + app.get('port') );
});
