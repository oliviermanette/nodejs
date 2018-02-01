var express = require('express');
var formidable = require('formidable');
var app = express();
const sqlite3 = require('sqlite3').verbose();
var sys = require('util');
var fs = require('fs');

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
    
    let db = new sqlite3.Database('../untitled/db/ptms.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        //console.log('Connected to the PTMS database.');
    });
    let sql = "update Montres set status='started', LastActif='" + Date.now() +
        "', IP='" + req.connection.remoteAddress +
        "' where codeID='" + req.params.serialno + "'";
    db.run(sql);
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        //console.log('Close the database connection.');
    });
	res.end(
	'Bonjour '+ req.params.serialno
	);
});

app.post('/upload', function(req, res)
{
    console.log("Receiving upload");
    var form = new formidable.IncomingForm();
    var serialno = "unknown";
    var Fichiers = [];
    form.uploadDir = "upload";
    form.keepExtensions = true;

    form.on('file', function (field, file) {
        Fichiers.push(file.path);
    });

    form.parse(req, function (err, fields, files) {
        res.writeHead(200, { 'content-type': 'text/plain' });
        serialno = fields['serialno'];
        res.end('thank you for your upload');
        //res.end(sys.inspect({ fields: fields, files: files }));
        //console.log({ fields: fields, files: files });
        serialno = fields['serialno'];
        for (var i = 0, len = Fichiers.length; i < len; i++) {
            fs.rename(Fichiers[i], form.uploadDir + "/" + Date.now() + "_" + i + "_" + serialno + ".dat");
            console.log('rename :' + Fichiers[i] + ' to ' + form.uploadDir + "/" + Date.now() + "_" + i + "_" + serialno + ".dat");
        }
            
    }
    );
});

app.get('/watch/recording/:serialno', function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    console.log('start recording ...' + req.params.serialno);
    let db = new sqlite3.Database('../untitled/db/ptms.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        //console.log('Connected to the PTMS database.');
    });
    let sql = "update Montres set status='recording', LastActif='" + Date.now() +
        "', IP='" + req.connection.remoteAddress +
        "' where codeID='" + req.params.serialno + "'";
    db.run(sql);
    db.close((err) => {
        if (err) {
            return console.error(err.message);
            console.log("ERROR : couldn't find " + req.params.serialno);
        }
        //console.log('Close the database connection.');
    });
    res.end(
        'OK ' + req.params.serialno + '!'
    );

});

app.get('/watch/canistop/:serialno', function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('please wait ' + req.params.serialno);
    console.log('pause requested by ' + req.params.serialno);
    let db = new sqlite3.Database('../untitled/db/ptms.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        //console.log('Connected to the PTMS database.');
    });
    let sql = "update Montres set status='canistop', LastActif='" + Date.now() +
        "', IP='" + req.connection.remoteAddress +
        "' where codeID='" + req.params.serialno + "'";
    db.run(sql);
    db.close((err) => {
        if (err) {
            return console.error(err.message);
            console.log("ERROR : couldn't find " + req.params.serialno);
        }
        //console.log('Close the database connection.');
    });
});

app.get('/watch/okstop/:serialno', function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('please wait ' + req.params.serialno);
    console.log('pause requested by ' + req.params.serialno);
    let db = new sqlite3.Database('../untitled/db/ptms.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        //console.log('Connected to the PTMS database.');
    });
    let sql = "update Montres set status='stopped', LastActif='" + Date.now() +
        "', IP='" + req.connection.remoteAddress +
        "' where codeID='" + req.params.serialno + "'";
    db.run(sql);
    db.close((err) => {
        if (err) {
            return console.error(err.message);
            console.log("ERROR : couldn't find " + req.params.serialno);
        }
        //console.log('Close the database connection.');
    });
});

app.get('/watch/arrecording/:serialno', function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('please wait ' + req.params.serialno);
    console.log('pause requested by ' + req.params.serialno);
    let db = new sqlite3.Database('../untitled/db/ptms.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        //console.log('Connected to the PTMS database.');
    });
    let sql = "update Montres set status='arrecording', LastActif='" + Date.now() +
        "', IP='" + req.connection.remoteAddress +
        "' where codeID='" + req.params.serialno + "'";
    db.run(sql);
    db.close((err) => {
        if (err) {
            return console.error(err.message);
            console.log("ERROR : couldn't find " + req.params.serialno);
        }
        //console.log('Close the database connection.');
    });
});

app.get('/watch/msgread/:serialno', function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('please wait ' + req.params.serialno);
    console.log('pause requested by ' + req.params.serialno);
    let db = new sqlite3.Database('../untitled/db/ptms.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        //console.log('Connected to the PTMS database.');
    });
    let sql = "update Montres set status='msgread', LastActif='" + Date.now() +
        "', IP='" + req.connection.remoteAddress +
        "' where codeID='" + req.params.serialno + "'";
    db.run(sql);
    db.close((err) => {
        if (err) {
            return console.error(err.message);
            console.log("ERROR : couldn't find " + req.params.serialno);
        }
        //console.log('Close the database connection.');
    });
});


app.get('/watch/whatsup/:serialno', function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    let db = new sqlite3.Database('../untitled/db/ptms.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        //console.log('Connected to the PTMS database.');
    });
    let sql = 'SELECT status FROM Montres WHERE codeID=?';
    let param = req.params.serialno;
    db.get(sql, [param] ,  (err, row) => {
        if (err)
            return console.error(err.message);

       // res.end(row.status);        
        return row
            ? res.end(row.status)
            : res.end('I love you too!');
        
    });
    
});
// ... Tout le code de gestion des routes (app.get) se trouve au-dessus

app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send(' Vous arrivez sur cette page par la mauvaise méthode.\n Veuillez contacter un administrateur : info@flod.aero \n Merci !');
    console.log('404...\n');
});


app.listen(8080);