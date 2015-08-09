var express = require('express'),
    serverStatic = require('serve-static'),
    app = express();

app.use('/', serverStatic('static', {'index': ['index.html']}));

module.exports = app;
