'use strict';

var express = require("express");
var router = express.Router();
var sendgrid = require('../utils/sendgrid');
var cred = require('../../env.js');
var messageReg = new RegExp("^[a-zA-Z.,!? ]*$");
var emailReg = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");

router.route("/:apikey").post(function (req, res) {

  if (req.params.apikey !== cred.JOSHUA_WOOTONN_API_KEY) return res.status(403).send({ message: "Invalid Api Key" });

  var _req$body = req.body,
      to = _req$body.to,
      from = _req$body.from,
      message = _req$body.message,
      subject = _req$body.subject;

  if (!to || !emailReg.test(to)) return res.status(400).send({ message: "Invalid To" });
  if (!from || !emailReg.test(from)) return res.status(400).send({ message: "Invalid From" });
  if (!message) return res.status(400).send({ message: "Invalid Message" });
  if (!subject) return res.status(400).send({ message: "Invalid Subject" });

  sendgrid(to, from, subject, message).then(function (response) {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send({ message: "Message Sent" });
  }).catch(function (error) {
    return res.status(400).send({ message: "Message Error", error: error.response });
  });
});
router.route("/").get(function (req, res) {
  return res.status(200).send({ message: "This is the Mailer api using sendgrid. Post with api key as a param, and a to,from,message, and subject in the body." });
});

module.exports = router;