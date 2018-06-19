"use strict";

var express = require("express");
var cors = require('cors');
var app = express();
var bodyParser = require("body-parser");
var cred = require('../env.js');
app.use(cors());
app.use(bodyParser());
// Our handler function is passed a request and response object

app.use('/', require('./routes/mailer'));

var port = cred.PORT || 3000;
app.listen(port, function () {
  return console.log('Mailer listening on ' + port);
});
exports.app = app;