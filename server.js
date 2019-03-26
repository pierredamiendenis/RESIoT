var express = require('express');
const cors = require('cors');

var app = express();
var server = require('http').createServer(app);
app.use(cors());
app.use(express.json());

var first_try = require('./save.js')
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
    res.send('test');
    first_try.API_connect();
});






server.listen(80, function(){
    console.log('listening on *:80');
});
