var express = require("express");
var cors = require('cors');
var app = express();
var bodyParser = require("body-parser");
var cred = require('./env.js');
require('dotenv').config();
app.use(cors());
app.use(bodyParser());
// Our handler function is passed a request and response object

app.use('/mailer',require('./routes/mailer'));

var port = cred.PORT || process.env.PORT || 3000;
app.listen(port , () => console.log('Mailer listening on ' + port))
