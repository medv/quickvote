// c medv 2014

var connect = require('connect');
connect().use(connect.static(__dirname)).listen(8080);

console.log('listening to port 8080');