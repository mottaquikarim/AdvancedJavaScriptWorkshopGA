var fs = require('fs'),
	Q = require('q'),
	api = {};

function _CallbackHandler( cb ) {
	return function( err, data ) {
		if ( err ) {
			throw new Error( err );
		}

		cb( data );
	}
} // _CallbackHandler

function _readFile( fileName, cb ) {
	fs.readFile( fileName, 'utf-8', function( err, data ){
		if ( err ) {
			throw new Error( err );
		}
		if ( typeof cb !== "undefined" ) {
			cb( data );
		}
	});
} // _readFile


function _writeFile( fileName, data, cb ) {
	fs.writeFile( fileName, data, function(err) {
		if ( err ) {
			throw new Error( err );
		}

		if ( typeof cb !== "undefined" ) {
			cb();
		}
	});
} // _writeFile 

api.copyFile = function( fileName, newFileName, onCompleted ) {
	if ( typeof fileName === "undefined" ) {
		throw new Error( 'fileName must be defined!' );
	}

	if ( typeof newFileName === "undefined" ) {
		newFileName = fileName+'.cpy';
	}

	_readFile( fileName, function( data ) {
		_writeFile( newFileName, data, onCompleted );
	});

};

api.readFile = _readFile;
api.writeFile = _writeFile;

api.readFileAsPromise = function readFileAsPromise( fileName ) {
	var deferred = Q.defer();

	fs.readFile( fileName, 'utf-8', function( err, data ){
		if ( err ) {
			deferred.reject( err );
		}

		deferred.resolve( data );

	});

	return deferred.promise;
}

module.exports = api;