var Routes 		= {},
	Request 	= require('request'),
	config		= require('./configs');

function _generateAuthorizeUrl( state ) {
	var urlbase = config.AUTHORIZE,
		options = {
			client_id	: config.clientId,
			scope		: config.scope,
			state		: state
		};

	return urlbase + '?' + Object.keys( options ).reduce(function(arr, currentOption){
		arr.push( currentOption + '=' + options[ currentOption ] );

		return arr;
	}, []).join('&');
} // _generateAuthorizeUrl

Routes.authenticate = function authenticate( request, reply ) {
	request.session.state = new Date().getTime();

	reply.redirect( _generateAuthorizeUrl( request.session.state ) );
}; // authenticate

Routes.redirect = function redirect( request, reply ) {
	if ( request.query.state != request.session.state ) {
		reply.send('Error: states do not match');
		return;
	}
	else {
		Request.post({
			url: config.ACCESS_TOKEN,
			form: {
				client_id		: config.clientId,
				client_secret	: config.clientSecret+'asdfasdf',
				code			: request.query.code,
				state 			: request.query.state,		
			}
		}, function( err, httpResp, body ) {
			// if we are here, everything is kosher
			var returnObjs = body.split('&').reduce(function(objToPopulate, bodyItem){
				var bodyBits = bodyItem.split('=');
				objToPopulate[ bodyBits[0] ] = bodyBits[1];

				return objToPopulate;
			}, {});

			if ( returnObjs.error ) {
				reply.send( returnObjs.error );
				return;
			}

			request.session.githubAccessToken = returnObjs.access_token;
			
			reply.redirect('/app');
		});
	} // if state DOES match
	
}; // redirect



module.exports = Routes;