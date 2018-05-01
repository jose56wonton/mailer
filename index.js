var express = require("express");
var app = express();
var bodyParser = require("body-parser");
require('dotenv').config();

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.use(bodyParser());
// Our handler function is passed a request and response object
app.get('/',(req, res) => res.send('dunno why you are sending a get request'))
app.use('/',require('./routes/mail'));

var port = process.env.PORT || 3000;
app.listen(port , () => console.log('Example app listening on port ' + port))