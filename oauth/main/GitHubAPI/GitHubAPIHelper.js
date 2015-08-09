var Routes 	= {},
	Request = require('request'),
	API_URL = 'https://api.github.com/';

function _checkSession( sessionVal, reply ) {
	if ( typeof sessionVal === "undefined" ) {
		reply.send(JSON.stringify({success:false}));
		return false;
	}
	return true;
} // _checkSession

Routes.foo = function foo( req, reply ) {
	var isSession = _checkSession( req.session.githubAccessToken, reply );

	if ( !isSession ) return;

	reply.send('Hello from foo! ' + req.session.githubAccessToken);
}

Routes.me = function me( req, reply ) {
	var isSession = _checkSession( req.session.githubAccessToken, reply );

	if ( !isSession ) return;

	Request.get({
		url: API_URL + 'user',
		headers: {
			'User-Agent': 'kommentPress-0',
			 'Authorization': 'token '+ req.session.githubAccessToken
		}
	}, function( err, httpResp, body ){
		reply.send( body );
	});
}

module.exports = Routes;