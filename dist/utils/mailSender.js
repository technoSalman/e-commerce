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
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrappedSendMail = void 0;
require('dotenv').config();
const nodemailer = require('nodemailer');
function wrappedSendMail(email, attachment, mailOptions) {
    return __awaiter(this, void 0, void 0, function* () {
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
            mail.sendMail(mailOptions, function (error, info) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(info);
                    }
                });
            });
        });
    });
}
exports.wrappedSendMail = wrappedSendMail;
