var file = require('../news');

function start() {
	console.log('state')
}

function end(x, y) {
	y.writeHead(200, {
	'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  });
	var data = JSON.stringify(file)
  y.end(data);
}

exports.start = start;
exports.end = end;