const express = require("express");
const router = express.Router();
const sendgrid  = require('../utils/sendgrid');

const messageReg = new RegExp("^[a-zA-Z.,!? ]*$");
const emailReg = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");

router.route("/mail/:apikey").post((req, res) => {   


  if(req.params.apikey !== process.env.JOSHUA_WOOTONN_API_KEY)
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
    //  console.log(response.statusCode);
    //  console.log(response.body);
    //  console.log(response.headers);
    res.setHeader("Content-Type", "application/json");
    res.status(200).send({message: "Message Sent"});
  })
  .catch(function (error) {
    // error is an instance of SendGridError
    // The full response is attached to error.response
     //console.log(error.response.statusCode);
     //console.log(error.response);
    return res.status(400).send({message: "Message Error",error: error.response})
  });
    

});

module.exports = router;
