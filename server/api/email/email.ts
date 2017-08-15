import {Router, Response, Request} from 'express';
import * as pg from 'pg';
pg.defaults.ssl = true;

const emailRouter: Router = Router();
export {emailRouter}
const url = require('url');
const https = require('https');


export class CustomEmail {
  fromEmail: string;
  toEmail: string;
  subject: string;
  content: string;
}

emailRouter.post('/', (request: Request, response: Response) => {
  let requestedEmail: CustomEmail = request.body;
  console.log(requestedEmail);
  sendMail(requestedEmail);
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "X-Requested-With");
});

function sendMail(emailRequest : CustomEmail) {

  var options = {
    "method": "POST",
    "hostname": "api.sendgrid.com",
    "port": null,
    "path": "/v3/mail/send",
    "headers": {
      "authorization": "Bearer <<api-key>>",
      "content-type": "application/json"
    }
  };

  var req = https.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });

  req.write(JSON.stringify({ personalizations: [ { to: [ { email: emailRequest.toEmail } ] } ],
                             from: { email: emailRequest.fromEmail },
                             subject: emailRequest.subject,
                             content: [ { type: 'text/plain', value: emailRequest.content } ] }));
  req.end();
}

