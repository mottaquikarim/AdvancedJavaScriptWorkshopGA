// CommonJS specification
// http://mottaquikarim.github.io/AdvancedJavaScriptWorkshopGA/one.html
var MathAPI = require('./num');

console.log( MathAPI.getPI() );
console.log( MathAPI.getCircumference(1) );
console.log( MathAPI.getArea( 1 ) );

var fs = require('fs');

fs.readFile('package.json', 'utf-8', function(err, data){
	if ( err ) {
		throw new Error( err );
	}

	console.log( data );

	// do stuff to data here
});

fs.writeFile('myNewFile.txt', 'Hello, Wrold!', function(err, data){
	if ( err ) {
		throw new Error( err );
	}

	console.log('Successfully wrote file! ', data);

	// do more stuff here
});

function write( copy, fn ) {
	fs.writeFile(fn+'.cpy', copy, function(err){
		if ( err ) {
			throw new Error( err );
		}

		console.log('copied ' + fn + ' to ' + fn +'.cpy' );
	})
}

fs.readFile('package.json', 'utf-8', function(err, data){
	if ( err ) {
		throw new Error( err );
	}

	write( data, 'package.json' );

});