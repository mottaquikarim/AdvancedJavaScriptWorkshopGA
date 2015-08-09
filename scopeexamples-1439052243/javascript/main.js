(function() { // protect the lemmings
	var __FOO__ = 5000;

	console.log( __FOO__ );
	var data = 5;

	function num() {
		var data = 2;
		console.log( 'in function foo: ', data );
	}

	console.log( 'in global scope: ', data );
	num();	
})();