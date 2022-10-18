"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
require('dotenv').config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// eslint-disable-next-line no-undef
const config = process.env;
const verifyToken = (req, res, next) => {
    const token = req.params.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send('No token found');
    }
    try {
        req.user = jsonwebtoken_1.default.verify(token, config.TOKEN_KEY);
    }
    catch (error) {
        return res.status(401).send('Invalid token');
    }
    next();
};
exports.verifyToken = verifyToken;
