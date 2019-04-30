var knx = require('knx');

var chenillard_run = false;
var chenillard_order = "endroit";
var connection;

var express = require('express');
const cors = require('cors');

var app = express();
var server = require('http').createServer(app);
app.use(cors());
app.use(express.json());


app.get('/', function(req, res) {

    res.send('Hello World!');

});

app.post('/specificlampe', function(req, res){

  //console.log("conn",connection);

  console.log(req.body.numerolamp, " : " ,req.body.state);

  //var numero_lamp = req.body.numerolamp;

  if(connection == undefined){
    res.send({state:"error"})
  } else {
    change_specific_lamp(req.body.numerolamp, req.body.state);
    res.send({state:"success"})
  }


});


app.post('/specificspeed', function(req, res){

  if(connection == undefined){
    res.send({state:"error"})
  } else {
    console.log(req.body.lampspeed);

    change_specific_speed(req.body.lampspeed);
    res.send({state:"success"})
  }

});

app.post('/specificorder', function(req, res){

  if(connection == undefined){
    res.send({state:"error"})
  } else {
    console.log(req.body.lamporder);

    if(req.body.lamporder == true){

      var sensspecific = true;

    } else {

      var sensspecific = false;


    }

    change_specific_order(sensspecific);
    res.send({state:"success"})
  }

});


app.get('/startandstopchenillard', function(req, res) {
    //res.send('test');
    //console.log("jesuisdansletest");
    //console.log("startabdstop",connection)
    
    if(connection == undefined){
      res.send({state:"error"})
    } else {
      start_and_stop();
      res.send({state:"success"})

    }

});

app.get('/speedchenillard', function(req, res) {

    if(connection == undefined){

      res.send({state:"error"})

    } else{

      res.send({state:"success"})

      changespeed().then(function(value){console.log(value);start_chenillard(value);});

    }
});


app.get('/orderchenillard', function(req, res) {

  if(connection == undefined){

    res.send({state:"error"})

  } else {

    change_order();
    res.send({state:"success"})


  }

});

app.get('/disconnect', function(req, res) {

  if(connection == undefined){

    res.send({state:"error"})

  } else {

    res.send({state:"success"})
    disconnect();

  }


});

app.get('/connect', function(req, res) {
      //console.log("connect get",connection)

      connect(res);
      //res.send({state:"ok"});

});


var list_socket = [];

// Chargement de socket.io
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {

    socket.emit('bien ', 'Vous êtes bien connecté !');

    // Quand le serveur reçoit un signal de type "message" du client
    socket.on('message', function (message) {
        console.log('Un client me parle ! Il me dit : ' + message);
    });
});

function emit_io (s){
  io.sockets.emit('message', s);
}



server.listen(8000, function(){
    console.log('listening on *:80');
});


  function connect(response){

     connection = new knx.Connection( {
        // ip address and port of the KNX router or interface
        ipAddr: '192.168.1.10', ipPort: 3671,
        // in case you need to specify the multicast interface (say if you have more than one)
        //interface: 'eth0',
        // the KNX physical address we'd like to use
        //physAddr: '1.1',
        // set the log level for messsages printed on the console. This can be 'error', 'warn', 'info' (default), 'debug', or 'trace'.
        //loglevel: 'info',
        // do not automatically connect, but use connection.Connect() to establish connection
        //manualConnect: true,
        // use tunneling with multicast (router) - this is NOT supported by all routers! See README-resilience.md
        //forceTunneling: true,
        // wait at least 10 millisec between each datagram
        //minimumDelay: 10,
        // enable this option to suppress the acknowledge flag with outgoing L_Data.req requests. LoxOne needs this
        //suppress_ack_ldatareq: false,
        // define your event handlers here:
        handlers: {
          // wait for connection establishment before sending anything!
          connected: function() {
            //serverREST.API_serverEmit();
            console.log('Connected');
            response.send({state:"ok"});

            // WRITE an arbitrary boolean request to a DPT1 group address

            // you also WRITE to an explicit datapoint type, eg. DPT9.001 is temperature Celcius
            //connection.write("2/1/0", 22.5, "DPT9.001");
            // you can also issue a READ request and pass a callback to capture the response
            //connection.read("0/2/1", (src, responsevalue) => { console.log("res " + responsevalue); console.log("src" + src) });

          },
          // get notified for all KNX events:
          event: function(evt, src, dest, value) {
            var d = new Date();
            //console.log(d + " || event: %s, src: %j, dest: %j, value: %j", evt, src, dest, value);
            //console.log(JSON.stringify(value));
            //console.log(Array.isArray[JSON.parse(JSON.stringify(value)).data]);
            //console.log(typeof(JSON.parse(JSON.stringify(value)).data));

            var destination = dest.substr(-1);

            var va = JSON.stringify(value);
            //console.log("va",va);
            var vjson = JSON.parse(va);

            var allumeoueteint = vjson.data[0];

            var jsontosend = {dst:destination, etat:allumeoueteint};

            //console.log(jsontosend)

            emit_io(JSON.stringify(jsontosend));



            // connection.read("0/2/1", (src, responsevalue) => { console.log("res " + responsevalue); console.log("src" + src) });
            // connection.read("0/2/2", (src, responsevalue) => { console.log("res " + responsevalue); console.log("src" + src) });
            // connection.read("0/2/3", (src, responsevalue) => { console.log("res " + responsevalue); console.log("src" + src) });
            // connection.read("0/2/4", (src, responsevalue) => { console.log("res " + responsevalue); console.log("src" + src) });

            //console.log("dest : " + dest);

            if(dest == "0/3/1"){
              //console.log("run chenillard" + chenillard_run)

              if(chenillard_run == false){
                start_chenillard();
              } else {
                stop_chenillard();
              }


            }

            if(dest == "0/3/2"){

              change_order();

            }

            if(dest == "0/3/3"){

                changespeed().then(function(value){console.log(value);start_chenillard(value)});
            }

            if(dest == "0/3/4"){

              disconnect();

            }

          },
          // get notified on connection errors
          error: function(connstatus) {
            console.log("**** ERROR: %j", connstatus);
            response.send({state:"error"});
            console.log("zefbezbfjzebfyezvhfvhezvfevfhezvfh")
          }
        }
      });

  }


  var indice_chenillard;
  var intervalle;

  function start_and_stop(){
    console.log("chenillard run :",chenillard_run);
    if(chenillard_run == false){
        start_chenillard(speed);
      } else {
        stop_chenillard();
      }
  }

  function start_chenillard (sp){


    console.log("speed : " + sp);


    if(indice_chenillard==undefined){
      indice_chenillard=1;
    }

    if(sp==undefined){
        sp=1200;
        console.log("speed modified : " + sp);
        speed = 1200;
        indice_tabspeed = 1;

      }

      if(chenillard_run==false){

        chenillard_run = true;

        intervalle = setInterval(() => {

            console.log("1");


          switch(indice_chenillard){
            case 1:
              connection.write("0/1/1", 1);
              connection.write("0/1/2", 0);
              connection.write("0/1/3", 0);
              connection.write("0/1/4", 0);

              break;

            case 2:
              connection.write("0/1/1", 0);
              connection.write("0/1/2", 1);
              connection.write("0/1/3", 0);
              connection.write("0/1/4", 0);
              break;

            case 3:
              connection.write("0/1/1", 0);
              connection.write("0/1/2", 0);
              connection.write("0/1/3", 1);
              connection.write("0/1/4", 0);
              break;

            case 4:
              connection.write("0/1/1", 0);
              connection.write("0/1/2", 0);
              connection.write("0/1/3", 0);
              connection.write("0/1/4", 1);
              break;

          }

          //console.log(indice_chenillard);

          if(chenillard_order=="endroit"){

            if(indice_chenillard==4){
              indice_chenillard=1;
            }else{
              indice_chenillard++;
            }

          }else {

            if(indice_chenillard==1){
              indice_chenillard=4;
            }else{

              indice_chenillard--;

            }
          }

        }, speed);

      }



  }


  function stop_chenillard(){
      clearInterval(intervalle);
      chenillard_run = false;

  }


  function change_order(){

    if(connection == undefined){


    } else {

      if(chenillard_order=="endroit"){
        chenillard_order="envers";
      } else {
        chenillard_order="endroit";
      }

    }

  }

  function change_specific_order(specific_order){
    if(connection == undefined){



    } else {

      chenillard_order == specific_order;

    }
  }

  function disconnect(){

    if(connection == undefined){

      console.log("veuillez vous connecter")


    } else {

      stop_chenillard();
      connection.Disconnect();
      connection = null;

    }



  }

  var tabspeed = [1200,1000,800,600];
  var indice_tabspeed = 0;
  var speed;

  function changespeed(){

    if(connection == undefined){
      console.log("veuillez vous connecter")

    } else {

      return new Promise((resolve,reject) => {

        //console.log("indice speed : " + indice_tabspeed);
  
        speed = tabspeed[indice_tabspeed];
  
        if(indice_tabspeed==3){
          indice_tabspeed=0;
        }else{
          indice_tabspeed++;
        }
  
        stop_chenillard();
  
        resolve(speed);
  
      });

    }



  }

  function change_specific_speed(speed_lamp){

    if(connection == undefined){

      console.log("veuillez vous connecter")

    } else {

      stop_chenillard();
      start_chenillard(speed_lamp);

    }



  }



  function change_specific_lamp(id, state_lamp) {

    if(connection == undefined){

      console.log("veuillez vous connecter")

    } else {

      connection.write("0/1/"+id, state_lamp );

    }


  }


  function connection_knx(){
    //créer une fonction de démarrage qui permet de faire un clignotement particulier
  }
