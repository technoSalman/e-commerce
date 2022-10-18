"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTP = void 0;
const db_config_1 = __importDefault(require("../config/db.config"));
const sequelize_1 = require("sequelize");
const userModel_1 = require("./userModel");
exports.OTP = db_config_1.default.define('otp', {
    user_id: {
        type: sequelize_1.DataTypes.UUID,
    },
    otp: {
        type: sequelize_1.DataTypes.INTEGER,
    },
});
userModel_1.User.hasOne(exports.OTP, {
    foreignKey: 'user_id',
});
exports.OTP.belongsTo(userModel_1.User, {
    foreignKey: 'user_id',
});
