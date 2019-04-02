var express = require('express');
var app = express();

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})

// POST method route
app.post('/', function (req, res) {
  console.log('Requete POST')
  res.send('POST request to the homepage');
});

app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});
