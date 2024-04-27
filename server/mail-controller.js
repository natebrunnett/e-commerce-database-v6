const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer')

class Mail{

    async Send(req,res){
        let {
            email: sender,
            subject: subj,
            message: msg
        } = req.body;

        const senderEmail = process.env.NODEMAILER_EMAIL;
        const senderPassword = process.env.NODEMAILER_PASSWORD;

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            port: 465,
            secure: true,
            auth: {
              // TODO: replace `user` and `pass` values from <https://forwardemail.net>
              user: senderEmail,
              pass: senderPassword,
            },
        });
        // send mail with defined transport object
        try {

				const info = await transporter.sendMail({
					from: sender, // sender address
					to: "nathanieljbrunnett@gmail.com", // list of receivers
					subject: subj, // Subject line
					html: `<p>${msg}</p><br/><p>${sender}</p>`, // html body
				});
		
				res.send({ok: true, message: "Link sent."})
				// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
		
				//
				// NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
				//       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
				//       <https://github.com/forwardemail/preview-email>
				//

            }
            catch(e){
                console.log(e)
                res.send({ok: false, error: e})
            }
    }

}

module.exports = new Mail()