// c medv 2014
var fs = require('fs'),
	express = require('express'),
	bodyParser = require('body-parser'),
	app = express();

var comments = [{author: 'misha', message: 'chat room activate'}];

app.use('/', express.static(__dirname));
app.use(bodyParser());

app.get('/data', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(comments));
});

app.post('/data', function(req, res) {
	comments.push(req.body);
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(comments));
});

app.listen(8080);

console.log('listening to port 8080');