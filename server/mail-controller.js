const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer')

class Mail{

    //Account Recovery
	async sendAccountRecovery(req, res){
        const senderEmail = process.env.NODEMAILER_EMAIL;
        const senderPassword = process.env.NODEMAILER_PASSWORD;

        const { email, magicLink } = req.body;

		const user = await Customer.findOne({ 
			username:email });
		
		if(!user){
			res.send({ ok: false,
				message: "username not found"})
		}

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
			if(!magicLink){
				const user = await Customer.findOneAndUpdate(
					{username:email}, 
					{MagicLink: uuidv4(), MagicLinkExpired: false}, 
					{returnDocument:'after'}
					);
				
				const URL = process.env.DOMAIN + '/sendEmail/';

				const info = await transporter.sendMail({
					from: senderEmail, // sender address
					to: email, // list of receivers
					subject: "Hello ✔", // Subject line
					text: "Hello world? Test1", // plain text body
					html: `<p>Hello friend and welcome back. This is your link to sign in to your account: ${URL}${email}/${user.MagicLink}'</p><p>Needless to remind you not to share this link with anyone 🤫</p>`, // html body
				});
		
				console.log("Message sent: %s", info.messageId);
				res.send({ok: false, message: "Link sent"})
				// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
		
				//
				// NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
				//       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
				//       <https://github.com/forwardemail/preview-email>
				//
			} else if(user.MagicLink == magicLink && !user.MagicLinkExpired){
				const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: "365d" }); //{expiresIn:'365d'}
				//set the variable to expired, and send back the token
				await Customer.findOneAndUpdate(
					{username:email}, 
					{MagicLinkExpired: true}
					)
				res.json({ ok: true, message: "Welcome back", token, email });
				}
        } catch (error) {
            res.send({ok: false, message: error})
        }
    }


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