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

Routes.REDIRECT_TO = null;

Routes.authenticate = function authenticate( req, reply ) {
	req.session.state = new Date().getTime();

	reply.redirect( _generateAuthorizeUrl( req.session.state ) );
}; // authenticate

Routes.redirect = function redirect( req, reply ) {
	if ( req.query.state != req.session.state ) {
		reply.send('Error: states do not match');
		return;
	}
	else {
		Request.post({
			url: config.ACCESS_TOKEN_URL,
			form: {
				client_id		: config.clientId,
				client_secret	: config.clientSecret,
				code			: req.query.code,
				state 			: req.query.state,		
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

			req.session.githubAccessToken = returnObjs.access_token;
			
			reply.redirect( Routes.REDIRECT_TO );
		});
	} // if state DOES match
	
}; // redirect

Routes.root = function root( req, reply ) {
	if ( typeof req.session.githubAccessToken === "undefined" ) {
		reply.redirect( '/authenticate' );
	}
	else {
		reply.redirect( Routes.REDIRECT_TO );
	}
}

Routes.isloggedin = function isloggedin( req, reply ) {
	if ( typeof req.session.githubAccessToken === "undefined" ) {
		reply.send( JSON.stringify({success: false}) );
	}
	else {
		reply.send( JSON.stringify({success: true}) );
	}
}


module.exports = Routes;
