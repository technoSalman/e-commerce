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
exports.deleteOtpService = exports.getUserIdByOtp = exports.matchOtp = exports.saveOtp = void 0;
const otpModel_js_1 = require("../model/otpModel.js");
const saveOtp = (userId, otp) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line no-useless-catch
    try {
        const savedOtp = yield otpModel_js_1.OTP.create({ user_id: userId, otp: otp });
        if (savedOtp) {
            return savedOtp;
        }
    }
    catch (error) {
        console.log('Error in saveOtp service ', error);
        throw error;
    }
});
exports.saveOtp = saveOtp;
//take otp and id from controller as parameter and do the following:
//1. find latest otp with that id
//2. compare it with input otp
const matchOtp = (otpEntered, getUserId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const latestOtpObj = yield otpModel_js_1.OTP.findOne({
            where: { user_id: getUserId },
            order: [['createdAt', 'DESC']],
        });
        const latestOtp = latestOtpObj.otp;
        if (latestOtp == otpEntered) {
            return true;
        }
        if (latestOtp != otpEntered) {
            return false;
        }
    }
    catch (error) {
        console.log('Error in matchOtp service ', error);
        throw error;
    }
});
exports.matchOtp = matchOtp;
const getUserIdByOtp = (otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield otpModel_js_1.OTP.findOne({ where: { otp: otp } });
        if (user) {
            const userId = user.user_id;
            return userId;
        }
    }
    catch (error) {
        console.log('Error in getUserIdByOtp service ', error);
        throw error;
    }
});
exports.getUserIdByOtp = getUserIdByOtp;
const deleteOtpService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // eslint-disable-next-line no-unused-vars
        const deletedOtp = otpModel_js_1.OTP.destroy({ where: { user_id: userId } });
    }
    catch (error) {
        console.log('OTP deletion failed...');
        throw error;
    }
});
exports.deleteOtpService = deleteOtpService;
