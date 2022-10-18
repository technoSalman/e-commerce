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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.loginUserService = exports.signupUser = exports.getUserId = exports.getUserEmail = exports.getUserByEmail = void 0;
const userModel_1 = require("../model/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oldUser = yield userModel_1.User.findOne({ where: { email: email } });
        return oldUser;
    }
    catch (error) {
        console.log('Error in getUserByEmail service ', error);
        throw error;
    }
});
exports.getUserByEmail = getUserByEmail;
const getUserEmail = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.User.findOne({ where: { id: userId } });
        const email = user.dataValues.email;
        if (email) {
            return email;
        }
        else {
            return 0;
        }
    }
    catch (error) {
        console.log('Error in getUserEmail service ', error);
        throw error;
    }
});
exports.getUserEmail = getUserEmail;
const getUserId = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.User.findOne({ where: { email: email } });
        const userId = user.dataValues.id;
        if (userId) {
            return userId;
        }
    }
    catch (error) {
        console.log('Error in getUserId service ', error);
        throw error;
    }
});
exports.getUserId = getUserId;
const signupUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield bcrypt_1.default.genSalt();
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const newUser = yield userModel_1.User.create({
            email: email,
            password: hashedPassword,
        });
        return newUser;
    }
    catch (error) {
        console.log('Error in signupUser service ', error);
        throw error;
    }
});
exports.signupUser = signupUser;
const loginUserService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.User.findOne({ where: { email: email } });
        if (user && (yield bcrypt_1.default.compare(password, user.password))) {
            return user;
        }
    }
    catch (error) {
        console.log('Error in loginUser service ', error);
        throw error;
    }
});
exports.loginUserService = loginUserService;
const updatePassword = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line no-useless-catch
    try {
        const salt = yield bcrypt_1.default.genSalt();
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const updatedUser = yield userModel_1.User.update({ password: hashedPassword }, { where: { email: email } });
        if (updatedUser) {
            return updatedUser;
        }
    }
    catch (error) {
        throw error;
    }
});
exports.updatePassword = updatePassword;
