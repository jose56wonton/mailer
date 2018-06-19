const express = require("express");
const router = express.Router();
const sendgrid  = require('../utils/sendgrid');
var cred = require('../../env.js');
const messageReg = new RegExp("^[a-zA-Z.,!? ]*$");
const emailReg = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");

router.route("/:apikey").post((req, res) => {   

  if(req.params.apikey !== cred.JOSHUA_WOOTONN_API_KEY )
    return res.status(403).send({message: "Invalid Api Key"});
  
  const {to,from,message,subject} = req.body;
  if (!to || !emailReg.test(to))
    return res.status(400).send({ message: "Invalid To" });
  if (!from || !emailReg.test(from))
    return res.status(400).send({ message: "Invalid From" });
  if (!message )
    return res.status(400).send({ message: "Invalid Message" });
  if( !subject )
    return res.status(400).send({message: "Invalid Subject"})
  
  
  sendgrid(to,from,subject,message)
  .then(function (response) {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send({message: "Message Sent"});
  })
  .catch(function (error) {
    return res.status(400).send({message: "Message Error",error: error.response})
  });
    

});
router.route("/").get((req, res) => res.status(200).send({message: "This is the Mailer api using sendgrid. Post with api key as a param, and a to,from,message, and subject in the body."}))

module.exports = router;
