var express = require('express');
var formidable = require('formidable');
var app = express();

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
	res.end(
	'<form action="/upload" enctype="multipart/form-data" '+
	'method="post">'+
	'<input type="text" name="title"><br/>'+
	'<input type="file" name="upload" multiple="multiple"/><br/>'+
	'<input type="submit" value="Upload"/>'+
	'</form>'
	);
	console.log('loading homepage');
});

app.get('/watch/start/:serialno', function(req, res)
{
	res.setHeader('Content-Type', 'text/html');
	console.log('reçu une information de démarage de ' + req.params.serialno);
	res.end(
	'Bonjour '+ req.params.serialno
	);
}

);



app.listen(8080);