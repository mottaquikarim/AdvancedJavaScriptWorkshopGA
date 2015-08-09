/*
	kickstarts the application

	when you run index.js,
	it should invoke copy file, find all the markdowns
	and convert to markup

	call configio and regenerate the nav
*/

var CopyAPI = require('./copyfile'),
    config = require('./config'),
	Q = require('q'),
    parentPath = getParentPath(),
    INPUTDIR = config.input,
    OUTPUTDIR = config.output;

var configio = require('./configio');

configio.generateNavList();

/*
CopyAPI.readDirAsPromise( parentPath+'/markdown/' )
.then( handleFilesAsPromises )
.then(function(data){
	console.log( data );
});
*/

function getParentPath() {
    var dirnameAsAr = __dirname.split('/');
    dirnameAsAr.pop();

    return dirnameAsAr.join('/');
}

function handleFilesAsPromises( files ) {
    var transforms = files.map(function(fileName){
	    var fileRoot = fileName.split('.').shift();
        return getTransformedFile( fileRoot );
	});

    return Q.all( transforms );
}

function getTransformedFile( fileRoot ) {
    return CopyAPI.copyFileAfterTransform(
        parentPath+INPUTDIR+fileRoot+'.md',
        parentPath+OUTPUTDIR+fileRoot+'.html'
    );
}
