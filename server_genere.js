var express = require('express');
const cors = require('cors');

var app = express();
var server = require('http').createServer(app);
app.use(cors());
app.use(express.json());

var io = require('socket.io').listen(server);


setInterval(function(){emit_io()}, 1000);

function emit_io (){

  console.log("0");

  var jsontosend = {dst:"4", etat:0};

  io.sockets.emit('message', JSON.stringify(jsontosend));



  var jsontosend = {dst:"1", etat:1};

  io.sockets.emit('message', JSON.stringify(jsontosend));


  console.log("1");


  var jsontosend = {dst:"1", etat:0};

  io.sockets.emit('message', JSON.stringify(jsontosend));



  var jsontosend = {dst:"2", etat:1};


  io.sockets.emit('message', JSON.stringify(jsontosend));


  console.log("2");


  var jsontosend = {dst:"2", etat:0};

  io.sockets.emit('message', JSON.stringify(jsontosend));



  var jsontosend = {dst:"3", etat:1};

  io.sockets.emit('message', JSON.stringify(jsontosend));


  console.log("3");


  var jsontosend = {dst:"3", etat:0};

  io.sockets.emit('message', JSON.stringify(jsontosend));



  var jsontosend = {dst:"4", etat:1};

  io.sockets.emit('message', JSON.stringify(jsontosend));


  console.log("4");




}

function wait(ms)
{
var d = new Date();
var d2 = null;
do { d2 = new Date(); }
while(d2-d < ms);
}


server.listen(80, function(){
    console.log('listening on *:80');

});
