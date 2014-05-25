// c medv 2014
var fs = require('fs'),
	express = require('express'),
	bodyParser = require('body-parser'),
	app = express();

app.use('/', express.static(__dirname));
app.use(bodyParser());

app.listen(8080);
console.log('listening to port 8080');