const express = require("express");
const router = express.Router();
var sg = require("sendgrid")(
  "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"
);
var helper = require("sendgrid").mail;

const nameReg = new RegExp("^[a-zA-Z ]*$");
const messageReg = new RegExp("^[a-zA-Z.,!? ]*$");
const emailReg = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");

router.route("/mail").post((req, res) => { 
  if (!req.body.name || !nameReg.test(req.body.name))
    res.status(400).send({ message: "Invalid Name Param" });
  if (!req.body.to || !emailReg.test(req.body.to))
    res.status(400).send({ message: "Invalid To Param" });
  if (!req.body.from || !emailReg.test(req.body.from))
    res.status(400).send({ message: "Invalid From Param" });
  if (!req.body.message || !messageReg.test(req.body.message))
    res.status(400).send({ message: "Invalid Message Param" });


  

    res.setHeader("Content-Type", "application/json");
    res.status(200).send({message: "Message Sent"});

});

module.exports = router;

// export default (name,email,message) => {
//   var fromEmail = new helper.Email('Zach-Rauch-Photography.com');
//   var toEmail = new helper.Email('jose56wonton@gmail.com');
//   var subject = `New Photography Contact - ${name}`;
//   var content = new helper.Content('text/plain', `${message}   This message was sent from ${email}`);
//   var mail = new helper.Mail(fromEmail, subject, toEmail, content);

//   var request = sg.emptyRequest({
//     method: 'POST',
//     path: '/v3/mail/send',
//     body: mail.toJSON()
//   });

//   sg.API(request, function (error, response) {
//     if (error) {
//       return error;
//     }
//     return {
//       code: response.statusCode,
//       body: response.body,
//       headers: response.headers
//     }
//   });
// }
