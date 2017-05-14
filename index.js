var server = require('./server/server');
var routers = require('./server/router');
var hend = require('./server/hendled');

var hendl = {};

hendl["/"] = hend.start;
hendl["/news.json"] = hend.end;

server.onStart(routers.rout, hendl);