"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.login = exports.confirmEmail = exports.signup = void 0;
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
require('dotenv').config();
const userServices_1 = require("../services/userServices");
const otpService_1 = require("../services/otpService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const mailSender_1 = require("../utils/mailSender");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    if (!(email && password)) {
        return res.status(400).send({
            status: 'FAILED',
            message: 'Email and password are required',
        });
    }
    try {
        const oldUser = yield (0, userServices_1.getUserByEmail)(email);
        if (oldUser) {
            return res.status(401).send({
                status: 'FAILED',
                message: 'User already exists, Please log in',
            });
        }
        if (!oldUser) {
            const token = jsonwebtoken_1.default.sign({ email, password }, process.env.TOKEN_KEY, {
                expiresIn: '3600s',
            });
            const url = `http://localhost:3000/api/v1/user/confirmation/${token}`;
            var mailOptions = {
                from: 'mohammad.salman@technocratshorizons.com',
                to: email,
                subject: 'Confirm Email - test.com',
                html: `<p> Please click this link to confirm your email address <br>
                <a href="${url}">${url}</a> </p>`,
            };
            const sent = yield (0, mailSender_1.wrappedSendMail)(email, token, mailOptions);
            if (sent) {
                return res.status(303).send({
                    status: 'SUCCESS',
                    message: 'Please confirm email',
                });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'FAILED',
            error,
        });
    }
});
exports.signup = signup;
const confirmEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.query.token;
    const userToken = (0, jwt_decode_1.default)(token);
    const { email, password } = userToken;
    try {
        const newUser = yield (0, userServices_1.signupUser)(email, password);
        if (newUser) {
            return res.status(200).send({
                status: 'SUCCESS',
                message: 'User sign up successfully',
            });
        }
    }
    catch (error) {
        return res.status(500).send({
            status: 'FAILED',
            error,
        });
    }
    // res.redirect('http://localhost:3000/api/v1/user/login')
});
exports.confirmEmail = confirmEmail;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    if (!(email && password)) {
        res.status(400).send({
            statcreateTransportus: 'FAILED',
            message: 'Email and password are required',
        });
    }
    try {
        const oldUser = yield (0, userServices_1.getUserByEmail)(email);
        if (oldUser) {
            const loginUser = yield (0, userServices_1.loginUserService)(email, password);
            if (loginUser) {
                const _a = loginUser.dataValues, { password } = _a, rest = __rest(_a, ["password"]);
                // eslint-disable-next-line no-undef
                const token = jsonwebtoken_1.default.sign({ rest }, process.env.TOKEN_KEY, {
                    expiresIn: '3600s',
                });
                loginUser.token = token;
                return res.status(200).send({
                    message: 'User logged In',
                    token,
                });
            }
            else {
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
    catch (error) {
        console.log(error);
        res.status(400).send({
            status: 'FAILED',
            message: error,
        });
    }
});
exports.login = login;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    if (!email) {
        return res.status(400).send({
            status: 'FAILED',
            message: 'Email is required to reset password',
        });
    }
    try {
        const verifyByEmail = yield (0, userServices_1.getUserByEmail)(email);
        if (verifyByEmail) {
            let otp = Math.floor(1000 + Math.random() * 9000);
            const userId = yield (0, userServices_1.getUserId)(email);
            {
                if (userId) {
                    const saveOTP = yield (0, otpService_1.saveOtp)(userId, otp);
                    if (saveOTP) {
                        try {
                            var mailOptions = {
                                from: 'mohammad.salman@technocratshorizons.com',
                                to: email,
                                subject: 'Reset password - test.com',
                                html: `<p> You requested for reset password. Kindly use this otp:<br>
                                <b> ${otp}</b><br> to reset`,
                            };
                            const sent = yield (0, mailSender_1.wrappedSendMail)(email, otp, mailOptions);
                            if (sent) {
                                return res.status(200).send({
                                    status: 'SUCCESS',
                                    message: 'An otp has been sent to your email address.',
                                });
                            }
                            if (!sent) {
                                return res.status(500).send({
                                    status: 'FAILED',
                                    message: "Couldn't send OTP. Please try again",
                                });
                            }
                        }
                        catch (error) {
                            res.status(500).send({
                                status: 'FAILED',
                                message: error,
                            });
                        }
                    }
                }
            }
        }
    }
    catch (error) {
        res.status(500).send({
            status: 'FAILED',
            error,
        });
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const otp = req.body.otp;
    const newPassword = req.body.newPassword;
    //validation missing
    //use getUserId before verifyOtp get id from that and send it to verifyOtp with otp as arguments.
    const userId = yield (0, otpService_1.getUserIdByOtp)(otp);
    if (userId) {
        const verifyOtp = yield (0, otpService_1.matchOtp)(otp, userId);
        if (verifyOtp) {
            const userEmail = yield (0, userServices_1.getUserEmail)(userId);
            if (userEmail) {
                const updatedUser = yield (0, userServices_1.updatePassword)(userEmail, newPassword);
                if (updatedUser) {
                    // eslint-disable-next-line no-unused-vars
                    const deleteOtp = yield (0, otpService_1.deleteOtpService)(userId);
                    return res.status(200).send({
                        status: 'SUCCESS',
                        message: 'Your password has been updated, Please log in',
                    });
                }
                if (!updatedUser) {
                    return res.status(500).send({
                        status: 'SUCCESS',
                        message: "Couldn't update password. Please try again!",
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
});
exports.resetPassword = resetPassword;
