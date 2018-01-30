var fs = require('fs');
var queryString = require("querystring");

function start(response,postData)
{
	console.log("Le gestionnaire 'start' est appelé");
	fs.readFile( __dirname + '/start.html', function (err, body) 
	{
		if (err) 
		{
			throw err; 
		}
		response.writeHead(200, 
			{
				"Content-Type" : "text/html; charset=utf-8"
			});
		response.write(body);
		response.end();
	});
}

function upload(response,postData)
{
	console.log("Le gestionnaire 'upload' est appelé");
	// return "Vous êtes dans upload";
	response.writeHead(200, 
						{
							"Content-Type" : "text/plain; charset=utf-8"
						});
	response.write("Vous êtes dans upload et vous avez envoyé "+ queryString.parse(postData).text);
	response.end();

}

exports.start = start;
exports.upload = upload;
