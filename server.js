var express = require('express');
const cors = require('cors');

var app = express();
var server = require('http').createServer(app);
app.use(cors());
app.use(express.json());

var first_try = require('./knx.js')
app.get('/', function(req, res) {

    res.send('Hello World!');

});

app.get('/startandstopchenillard', function(req, res) {
    //res.send('test');
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

app.get('/connect', function(req, res) {
    first_try.API_connect();
    //res.sendStatus(200);
    res.send("done");
});


var list_socket = [];

// Chargement de socket.io
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {

    socket.emit('message', 'Vous êtes bien connecté !');

    // Quand le serveur reçoit un signal de type "message" du client
    socket.on('message', function (message) {
        console.log('Un client me parle ! Il me dit : ' + message);
    });
});

function emit_io (s){
  io.sockets.emit(s);
  console.log("jesuisla",s);
}



server.listen(80, function(){
    console.log('listening on *:80');
});
