/*
	* takes in a file, copies to another
	* optionally, can perform a transformation
	before completing copy
*/

var api = {},
	fs = require('fs'),
	marked = require('marked'),
	Q = require('q');

function _readFile( fileName ) {
	var deferred = Q.defer();

	fs.readFile( 
		fileName, 
		'utf-8', 
		function(err, data){
			if (err) {
				deferred.reject( err ); 
			}

			deferred.resolve( data );
		}
	);

	return deferred.promise;
} // _readFile

function _writeFile( fileName, data ) {
	var deferred = Q.defer();

	fs.writeFile( 
		fileName, 
		data, 
		function(err){
			if (err) {
				deferred.reject( err ); 
			}

			deferred.resolve( 1 );
		}
	);

	return deferred.promise;
} // _writeFile

api.getFileContents = function getFileContents( filename ) {
    return _readFile( filename );
} // getFileContents

api.copyFileAfterTransform = function copyFileAfterTransform( fileName, newFileName ) {
	return _readFile(fileName)
				.then(function( data ){
					var html = marked( data );
					return _writeFile( newFileName, html );
				});
}; // copyFileAfterTransform

api.readDirAsPromise = function readDirAsPromise( path ) {
	var deferred = Q.defer();

	fs.readdir(path, function( err, files ){
		if (err) {
			deferred.reject( err ); 
		}

		deferred.resolve( files );
	});

	return deferred.promise;
}; // readDirAsPromise

module.exports = api;
