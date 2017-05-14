var http = require('http');
var url = require('url');

function onStart(router, x) {
	function start(req, res) {
		var pars = url.parse(req.url).pathname
		router(pars, x, req,res);
		// file.serve(req, res);
	}

	http.createServer(start).listen(8080)
	console.log('Server running on port 8080');
}

exports.onStart = onStart;