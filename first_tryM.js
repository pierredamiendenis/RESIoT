var knx = require('knx');


var chenillard_run = false;
var chenillard_order = "endroit";

var connection = new knx.Connection( {
    // ip address and port of the KNX router or interface
    ipAddr: '192.168.0.6', ipPort: 3671,
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
        console.log('Connected');
        // WRITE an arbitrary boolean request to a DPT1 group address

        // you also WRITE to an explicit datapoint type, eg. DPT9.001 is temperature Celcius
        //connection.write("2/1/0", 22.5, "DPT9.001");
        // you can also issue a READ request and pass a callback to capture the response
        connection.read("0/2/1", (src, responsevalue) => { console.log("res " + responsevalue); console.log("src" + src) });
      },
      // get notified for all KNX events:
      event: function(evt, src, dest, value) { 
        //console.log("je suis dans le event" + "event: %s, src: %j, dest: %j, value: %j", evt, src, dest, value);

        //console.log("dest : " + dest);

        if(dest == "0/3/1"){
          //console.log("run chenillard" + chenillard_run)

          if(chenillard_run == false){
            start_chenillard(1200);
            chenillard_run = true;
          } else {
            clearInterval(intervalle);
            chenillard_run = false;
          }


        }

        if(dest == "0/3/2"){

          change_order();
          
        }

        if(dest == "0/3/3"){

          clearInterval(intervalle);

          console.log(chenillard_run);

          changespeed().then(function(value){
            start_chenillard(value);
          });
            
        }

        if(dest == "0/3/4"){

          disconnect();
          
        }

      },
      // get notified on connection errors
      error: function(connstatus) {
        console.log("**** ERROR: %j", connstatus);
      }
    }
  });

  
  var indice_chenillard;
  let intervalle;

  function start_chenillard (sp){

    console.log("speed : " + sp);

    if(indice_chenillard==undefined){
      indice_chenillard=1;
    }

    intervalle = setInterval(() => {

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
      
    }, sp);


  }


  function change_order(){

    if(chenillard_order=="endroit"){
      chenillard_order="envers";
    } else {
      chenillard_order="endroit";
    }
  }

  function disconnect(){
    connection.Disconnect();
  }

module.exports = { 
  API_startandstop : function(){start_chenillard(1200); },
  API_changespeed : function(){changespeed(); start_chenillard(speed);},
  API_changeorder : function(){change_order();},
  API_disconnect : function(){disconnect();}

}
  
  var tabspeed = [1200,1000,800,600];
  var indice_tabspeed = 0;
  var speed;

  function changespeed(){

    return new Promise((resolve,reject) => {

      console.log("indice speed : " + indice_tabspeed);

      speed = tabspeed[indice_tabspeed];
  
      if(indice_tabspeed==3){
        indice_tabspeed=0;
      }else{
        indice_tabspeed++;
      }

      resolve(speed);

    });

  }








  
  