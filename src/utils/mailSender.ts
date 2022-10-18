require('dotenv').config();
const nodemailer = require('nodemailer');

export async function wrappedSendMail(
	email: string,
	attachment: string | number,
	mailOptions: { from: string; to: any; subject: string; html: string }
) {
	return new Promise((resolve, reject) => {
		const mail = nodemailer.createTransport({
			// eslint-disable-next-line no-undef
			host: process.env.SMTP_HOST,
			// eslint-disable-next-line no-undef
			port: process.env.SMTP_PORT,
			secure: true,
			auth: {
				// eslint-disable-next-line no-undef
				user: process.env.SMTP_USER,
				// eslint-disable-next-line no-undef
				pass: process.env.SMTP_PASSWORD,
			},
		});

		mail.sendMail(mailOptions, async function (error: any, info: unknown) {
			if (error) {
				reject(error);
			} else {
				resolve(info);
			}
		});
	});
}
