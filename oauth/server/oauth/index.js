var express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    app = express();

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

// routes

var _routes = {};

_routes.foo = function foo( req, res ) {
    res.send('Hello, Wrold!');
};

app.get('/foo', _routes.foo);

module.exports = app;
