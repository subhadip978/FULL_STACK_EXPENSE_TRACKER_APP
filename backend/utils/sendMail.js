const {createTransport}=require("nodemailer")

exports.sendMail=(id,email)=>{
	//connecting the mail server and holds the configuration of email service provider
	const transporter= createTransport({
		service:'gmail',
		auth:{

			user:process.env.MT_USER,
			pass:process.env.MT_PASS,
		}
	});

	
	//configure mail which we want to send
	const mailOptions={
		from:process.env.EMAIL,
		to:email,
		subject:"RESET PASSWORD",
		html:
		`<h1>RESET YOU PASSWORD</h1>
		<p>Click on the link to reset your password</p>
		<p>${process.env.FRONTEND_URL}/reset/${id}</p>
		<p>The link will expire in 120 seconds</p>
		<p>If you didnot request any password reset ,please ignore tyhis email</p>`
	}



		//send the email
		transporter.sendMail(mailOptions)

}