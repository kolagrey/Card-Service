
const mailJet = require ('node-mailjet')
  .connect(process.env.MJPKSMTP, process.env.MJSKSMTP);

  const sendEmail = (recepient, title, template, platform)=>{
    const request = mailJet
        .post("send")
        .request({
            "FromEmail":"votish.elections@wuntlist.com",
            "FromName": platform,
            "Subject": title,
            "Text-part":template,
            "Html-part":template,
            "Recipients":[
                    {
                            "Email": recepient
                    },{
                            "Email": 'kolagrey@gmail.com'
                    }
            ]
        }).then((data)=>{
          //console.log(data.body.Sent);
          console.log('Email sent!');
        }).catch((e)=>{
          console.log('Email NOT sent!');
          console.log(e);
        });
  }

exports.sendEmail = sendEmail;
