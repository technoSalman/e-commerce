/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
require('dotenv').config();
import {
	getUserByEmail,
	getUserId,
	signupUser,
	loginUserService,
	getUserEmail,
	updatePassword,
} from '../services/userServices';
import {
	saveOtp,
	matchOtp,
	getUserIdByOtp,
	deleteOtpService,
} from '../services/otpService';
import jwt from 'jsonwebtoken';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { wrappedSendMail } from '../utils/mailSender';

export const signup = async (req: any, res: any) => {
	let email = req.body.email;
	let password = req.body.password;
	email = email.trim();
	password = password.trim();
	if (!(email && password)) {
		return res.status(400).send({
			status: 'FAILED',
			message: 'Email and password are required',
		});
	}
	try {
		const oldUser = await getUserByEmail(email);
		if (oldUser) {
			return res.status(401).send({
				status: 'FAILED',
				message: 'User already exists, Please log in.',
			});
		}
		if (!oldUser) {
			const token = jwt.sign(
				{ email, password },
				process.env.TOKEN_KEY as jwt.Secret,
				{
					expiresIn: '3600s',
				}
			);

			const url = `http://localhost:3000/api/v1/user/confirmation/${token}`;

			var mailOptions = {
				from: 'mohammad.salman@technocratshorizons.com',
				to: email,
				subject: 'Confirm Email - test.com',
				html: `<p> Please click this link to confirm your email address <br>
                <a href="${url}">${url}</a> </p>`,
			};
			const sent = await wrappedSendMail(email, token, mailOptions);
			if (sent) {
				return res.status(303).send({
					status: 'SUCCESS',
					message: 'Please confirm email',
				});
			}
		}
	} catch (error) {
		console.log(error);
		res.status(500).send({
			status: 'FAILED',
			error,
		});
	}
};

export const confirmEmail = async (req: any, res: any) => {
	interface token {
		email: string;
		password: string;
	}

	const token = req.query.token;
	const userToken = jwt_decode<token>(token);
	const { email, password } = userToken;

	try {
		const newUser = await signupUser(email, password);
		if (newUser) {
			return res.status(200).send({
				status: 'SUCCESS',
				message: 'User sign up successfully',
			});
		}
	} catch (error) {
		return res.status(500).send({
			status: 'FAILED',
			error,
		});
	}
	// res.redirect('http://localhost:3000/api/v1/user/login')
};

export const login = async (req: any, res: any) => {
	const email = req.body.email;
	const password = req.body.password;

	try {
		if (!(email && password)) {
			res.status(400).send({
				statcreateTransportus: 'FAILED',
				message: 'Email and password are required',
			});
		} else {
			const oldUser = await getUserByEmail(email);
			if (oldUser) {
				const loginUser = await loginUserService(email, password);
				if (loginUser) {
					const { password, ...rest } = loginUser.dataValues;
					// eslint-disable-next-line no-undef
					const token = jwt.sign(
						{ rest },
						process.env.TOKEN_KEY as jwt.Secret,
						{
							expiresIn: '3600s',
						}
					);
					loginUser.token = token;
					return res.status(200).send({
						message: 'User logged In',
						token,
					});
				} else {
					return res.status(403).send({
						message: 'User credential does not match',
					});
				}
			}
			if (!oldUser) {
				return res.status(200).send({
					status: 'FAILED',
					message: 'User does not exist, Please sign up',
				});
			}
		}
	} catch (error) {
		console.log(error);
		res.status(400).send({
			status: 'FAILED',
			message: error,
		});
	}
};

export const forgotPassword = async (req: any, res: any) => {
	let email = req.body.email;
	email = email.trim();
	if (!email) {
		return res.status(400).send({
			status: 'FAILED',
			message: 'Email is required to reset password',
		});
	}
	try {
		const verifyByEmail = await getUserByEmail(email);
		if (verifyByEmail) {
			let otp = Math.floor(1000 + Math.random() * 9000);
			const userId = await getUserId(email);
			{
				if (userId) {
					const saveOTP = await saveOtp(userId, otp);
					if (saveOTP) {
						try {
							var mailOptions = {
								from: 'mohammad.salman@technocratshorizons.com',
								to: email,
								subject: 'Reset password - test.com',
								html: `<p> You requested for reset password. Kindly use this otp:<br>
                                <b> ${otp}</b><br> to reset`,
							};
							const sent = await wrappedSendMail(
								email,
								otp,
								mailOptions
							);
							if (sent) {
								return res.status(200).send({
									status: 'SUCCESS',
									message:
										'An otp has been sent to your email address.',
								});
							}
							if (!sent) {
								return res.status(500).send({
									status: 'FAILED',
									message:
										"Couldn't send OTP. Please try again",
								});
							}
						} catch (error) {
							res.status(500).send({
								status: 'FAILED',
								message: error,
							});
						}
					}
				}
			}
		} else {
			return res.status(400).send({
				status: 'FAILED',
				message: 'User does not exist, Please sign up',
			});
		}
	} catch (error) {
		res.status(500).send({
			status: 'FAILED',
			error,
		});
	}
};

export const resetPassword = async (req: any, res: any) => {
	const otp = req.body.otp;
	const newPassword = req.body.newPassword;
	try {
		if (!(otp && newPassword)) {
			return res.status(400).send({
				status: 'FAILED',
				message: 'Please enter OTP and new password',
			});
		} else {
			const userId = await getUserIdByOtp(otp);
			if (userId) {
				const verifyOtp = await matchOtp(otp, userId);
				if (verifyOtp) {
					const userEmail = await getUserEmail(userId);
					if (userEmail) {
						const updatedUser = await updatePassword(
							userEmail,
							newPassword
						);

						if (updatedUser) {
							// eslint-disable-next-line no-unused-vars
							const deleteOtp = await deleteOtpService(userId);
							return res.status(200).send({
								status: 'SUCCESS',
								message:
									'Your password has been updated, Please log in',
							});
						}
						if (!updatedUser) {
							return res.status(500).send({
								status: 'SUCCESS',
								message:
									"Couldn't update password. Please try again!",
							});
						}
					}
				}
				if (!verifyOtp) {
					return res.status(400).send({
						status: 'FAILED',
						message: 'Wrong OTP',
					});
				}
			}
		}
	} catch (error) {
		res.status(500).send({
			status: 'FAILED',
			error,
		});
	}
};
