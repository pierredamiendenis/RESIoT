var express = require('express');
var app = express();
var server = require('http').createServer(app);

var first_try = require('./save.js')
app.get('/', function(req, res) {

    res.send('Hello World!');
    
});

app.get('/startandstopchenillard', function(req, res) {
    res.send('test');
    //console.log("jesuisdansletest");
    first_try.API_startandstop();
});

app.get('/speedchenillard', function(req, res) {
    res.send('test');
    first_try.API_changespeed();
});

app.get('/orderchenillard', function(req, res) {
    res.send('test');
    first_try.API_changeorder();
});

app.get('/disconnect', function(req, res) {
    res.send('test');
    first_try.API_disconnect();
});


// Partie socket :

var io = require ('socket.io').listen(server);

//Actions lors de la connexion du client :
io.sockets.on('connection', function(socket){
    console.log('Un client est connecté');
    
    //Envoie d'un message au client
    socket.emit('message', 'Vous êtes connecté');
});





server.listen(80, function(){
    console.log('listening on *:80');
});