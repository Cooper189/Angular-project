var static = require('node-static');
var file = new static.Server('.');

function rout(path, y, x, z) {
	console.log('check',path);
	if(typeof(y[path]) === 'function' && path !== '/news.json') {
		y[path]();
		file.serve(x, z);
	}else if(path === '/news.json'){
		y[path](x, z);
	}else{
		file.serve(x, z);
	}
}

exports.rout = rout;