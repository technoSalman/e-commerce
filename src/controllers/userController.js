/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
require('dotenv').config();
const userServices = require('../services/userServices');
const otpService = require('../services/otpService');
const jwt = require('jsonwebtoken');
const wrappedSendMail = require('../utils/mailSender');


const signup = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!(email && password)) {
        return res.status(400).send({
            status: 'FAILED',
            message: 'Email and password are required',

        });
    }
    try {

        const oldUser = await userServices.getUserByEmail(email, password);
        if (oldUser) {
            return res.status(400).send({
                status: 'FAILED',
                message: 'User already exists, Please log in',
            });
        }
        if (!oldUser) {
            const token = jwt.sign({ email, password }, process.env.TOKEN_KEY, {
                expiresIn: '3600s',
            });
    
            const url = `http://localhost:3000/api/v1/user/confirmation/${token}`;
    
            var mailOptions = {
                from: 'mohammad.salman@technocratshorizons.com',
                to: email,
                subject: 'Confirm Email - test.com',
                html: `<p> Please click this link to confirm your email address <br>
                <a href="${url}">${url}</a> </p>`
            };
            const sent = wrappedSendMail(email, token, mailOptions);
            if(sent){
                return res.status(303).send({
                    status: 'SUCCESS',
                    message: 'Please confirm email'
                });
            }
        }       
    }
    catch (error) {
        res.status(500).send({
            status: 'FAILED',
            error,
        });
    }
};

const confirmEmail = async(req,res) => {
    const token = req.query.token;
    const userToken = jwt.decode(token);
    const { email, password } = userToken;

    try{
        const newUser = await userServices.signupUser(email, password);
        if(newUser){
            return res.status(200).send({
                status: 'SUCCESS',
                message: 'User sign up successfully',
            }); 
        }
    }
    catch(error){
        return res.status(500).send({
            status: 'FAILED',
            error,
        });
    }
    // res.redirect('http://localhost:3000/api/v1/user/login')
};


const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!(email && password)) {
        res.status(400).send({
            statcreateTransportus: 'FAILED',
            message: 'Email and password are required',
        });
    }
    try {
        const oldUser = await userServices.getUserByEmail(email, password);
        if (oldUser) {
            const loginUser = await userServices.loginUser(email, password);
            if (loginUser) {
                const { password, ...rest } = loginUser.dataValues;
                // eslint-disable-next-line no-undef
                const token = jwt.sign({ rest }, process.env.TOKEN_KEY, {
                    expiresIn: '3600s',
                });
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
    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: 'FAILED',
            message: error,
        });
    }
};

const forgotPassword = async (req, res) => {
    const email = req.body.email;
    if (!email) {
        return res.status(400).send({
            status: 'FAILED',
            message: 'Email is required to reset password',
        });
    }
    try {
        const verifyByEmail = await userServices.getUserByEmail(email);
        if (verifyByEmail) {
            let otp = Math.floor(1000 + Math.random() * 9000);
            const userId = await userServices.getUserId(email);
            {
                if (userId) {
                    const saveOTP = await otpService.saveOtp(userId, otp);
                    if (saveOTP) {
                        try {
                            var mailOptions = {
                                from: 'mohammad.salman@technocratshorizons.com',
                                to: email,
                                subject: 'Reset password - test.com',
                                html: `<p> You requested for reset password. Kindly use this otp:<br>
                                <b> ${otp}</b><br> to reset`
                            };
                            const sent = wrappedSendMail(email, otp, mailOptions);
                            if (sent) {
                                return res.status(200).send({
                                    status: 'SUCCESS',
                                    message: 'An otp has been sent to your email address.',
                                });
                            }
                            if (!sent) {
                                return res.status(500).send({
                                    status: 'FAILED',
                                    message: 'Couldn\'t send OTP. Please try again',
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
        }
    } catch (error) {
        res.status(500).send({
            status: 'FAILED',
            error,
        });
    }
};


const resetPassword = async (req, res) => {
    const otp = req.body.otp;
    const newPassword = req.body.newPassword;

    const verifyOtp = await otpService.matchOtp(otp);
    if (verifyOtp) {
        const getUserId = await otpService.getUserIdByOtp(otp);
        if(getUserId){
            const getUserEmail = await userServices.getUserEmail(getUserId);
            if(getUserEmail){
                const updatedUser = await userServices.updatePassword(getUserEmail, newPassword);
                
                if (updatedUser) {
                    // eslint-disable-next-line no-unused-vars
                    const deleteOtp = await otpService.deleteOtp(verifyOtp);
                    return res.status(200).send({
                        status: 'SUCCESS',
                        message: 'Your password has been updated, Please log in',
                    });
                }
                if (!updatedUser) {
                    return res.status(500).send({
                        status: 'SUCCESS',
                        message: 'Couldn\'t update password. Please try again!',
                    });
                }
            }
        }
    
    }
    if (!verifyOtp) {
        return res.status(400).send({
            status: 'FAILED',
            message: 'Wrong OTP',
        });
    }
};



module.exports = {
    signup,
    login,
    forgotPassword,
    resetPassword,
    confirmEmail
};


