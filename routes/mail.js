const express = require("express");
const router = express.Router();
var sg = require('sendgrid')("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");
var helper = require('sendgrid').mail;


const nameReg = new RegExp("^[a-zA-Z ]*$");
const messageReg = new RegExp("^[a-zA-Z.,!? ]*$");
const emailReg = new RegExp("^\S+@\S+\.\S+$")

router.route("/mail").post((req, res) => {
  console.log(req.body.name,req.body.email,req.body.message);
  console.log(nameReg.test(req.body.name) ,emailReg.test(req.body.email) ,messageReg.test(req.body.message))
 
  if()
  if(!nameReg.test(req.body.name) || !emailReg.test(req.body.email) || !messageReg.test(req.body.message))
    res.status(500).send({message: !nameReg.test(req.body.name),"asdf":  !emailReg.test(req.body.email),"sadf": !messageReg.test(req.body.message)}); 
  // if (err) {
  //   res.status(500).send({message: "User was created but there was an error retreiving them"});
  // }
  // else{
  //   res.setHeader("Content-Type", "application/json");
  //   res.status(200).send(JSON.stringify(rows2[0]));
  // }
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