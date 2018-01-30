var http = require("http");
var url = require("url");

function start(route,handle)
{
	function onRequest(request, response)
	{
		var pathname = url.parse(request.url).pathname;
		var postData = "";
		request.setEncoding("utf8");
		request.addListener("data", function(postDataChunk)
									{
										postData += postDataChunk;
										console.log("Paquet POST reçu '" + postDataChunk + "'");
									});
		request.addListener("end", 	function()
									{
										route(handle,pathname,response,postData);
									}
									);
		console.log("Requête reçue pour le chemin " + pathname +".");
		
	}

	http.createServer(onRequest).listen(8888);
	console.log("Démarrage du serveur");	
}

exports.demarre = start;