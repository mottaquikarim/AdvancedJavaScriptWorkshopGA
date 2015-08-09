var copy = require('./copy');

// copy.readFile('package.json', function(data){
// 	copy.writeFile('package.json.1',data, function(){
// 		copy.readFile('package.json.1', function(data){
// 			copy.writeFile('package.json.2', function() {
// 				console.log('done!');
// 			})
// 		})
// 	})
// });

copy.readFileAsPromise( 'package.json' )
.then(function(data){
	console.log(1);
	return copy.readFileAsPromise('package.json');
})
.then(function( data ){
	console.log(2);
	// console.log( data );
	return copy.readFileAsPromise('package.json');
})
.then(function( data ){
	console.log(3);
	// console.log( data );
	return copy.readFileAsPromise('paasdfasdfckage.json');
})
.then(function( data ){
	console.log(4);
	// console.log( data );
	return copy.readFileAsPromise('package.json');
})
.fail(function(err){
	console.log(err)
})

// function handleFarmerCase() {

// }

// getUserType().then(function(data){
// 	if ( data.type === 'farmer' ) {
// 		return handleFarmerCase();
// 	}
// 	else if ( data.type === 'truck' ) {

// 	}
// 	else if () {

// 	}
// });
