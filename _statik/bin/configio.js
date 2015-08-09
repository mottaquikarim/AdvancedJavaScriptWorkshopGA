/*
	takes in a config,
	reads it,
	returns an array of filenames
	generates a nav in same order

	adds a file to config
	regnerates nav 
*/


var api = {},
    CopyAPI = require('./copyfile'),
    config = require('./config'),
    NAVFILE = config.navlist;

api.generateNavList = function generateNavList() {
    CopyAPI.getFileContents( NAVFILE ).then(function(data) {
        data = JSON.parse( data );

        var list = data.nav;

        
    });
};

module.exports = api;
