var sg = require("sendgrid")(
  process.env.SENDGRID_API_KEY
);
var helper = require("sendgrid").mail;


const send =  (to,from,subject,message) => {
  var fromEmail = new helper.Email(from);
  var toEmail = new helper.Email(to);
  var subject = subject;
  var content = new helper.Content('text/plain', message);
  var mail = new helper.Mail(fromEmail, subject, toEmail, content);

  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  return sg.API(request);
}
module.exports = send;


