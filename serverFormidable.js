var formidable = require('formidable');
var http = require('http');
var sys = require('util');
var fs = require('fs');

http.createServer(function(req, res){
	if (req.url == '/upload' && req.method.toLowerCase() == 'post')
	{
		console.log("Receiving upload");
		var form = new formidable.IncomingForm();
        var serialno = "unknown";
        var Fichiers = []; 		
        form.uploadDir = "/home/eldecog/nodejs/upload";
		form.keepExtensions = true;

        form.on('file', function(field, file){
            Fichiers.push(file.path);
        });

		form.parse(req, function(err, fields, files)
		{
			res.writeHead(200,{'content-type':'text/plain'});
			res.write('received upload : \n\n');
			res.end(sys.inspect({fields:fields, files:files}));
			console.log({fields:fields, files:files});
            serialno = fields['serialno'];
            for (var i = 0, len = Fichiers.length; i<len; i++)
                fs.rename (Fichiers[i], form.uploadDir + "/" + Date.now() + "_" + i + "_"+ serialno+ ".dat");
		}
		);
		return;
	}
	else if (req.url == '/upload')
	{
		console.log("BAD way to upload");
		res.writeHead(200,{'content-type':'text/plain'});
		res.end('Vous arrivez sur cette page de la mauvaise façon. Contactez un administrateur : info@flod.aero Merci.');
		return;
	}
	
	res.writeHead(200,{'content-type':'text/html'});
	res.end(
	'<form action="/upload" enctype="multipart/form-data" '+
	'method="post">'+
	'<input type="text" name="title"><br/>'+
	'<input type="file" name="upload" multiple="multiple"/><br/>'+
	'<input type="submit" value="Upload"/>'+
	'</form>'
	);
	console.log('loading homepage');
}
).listen(8888);
