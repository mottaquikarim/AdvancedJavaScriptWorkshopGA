var copy = require('./copy'),
	colors = require('colors'),
	program = require('commander'),
	copyArgs = [];

program
  .version('0.0.1')
  .option('-s, --source [file]', 'Source File')
  .option('-d, --destination [file]', 'Destination File')
  .parse(process.argv);
 
console.log('you ordered a pizza with:');
console.log('  - %s source', program.source);
console.log('  - %s destination', program.destination);

copy.copyFile( 
	program.source,
	program.destination,
	function() {
		console.log('Success!'.green)
	} 
);

// process.argv.forEach(function(el,idx){
// 	if ( idx === 0 || idx === 1 ) {
// 		return true;
// 	}

// 	if ( idx === 2 || idx === 3) {
// 		copyArgs.push( el );
// 	}
// });

// copy.copyFile( 
// 	copyArgs[ 0 ], 
// 	copyArgs[ 1 ],
// 	function() {
// 		console.log('Success!'.green)
// 	} 
// );