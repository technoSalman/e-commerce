"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const db_config_1 = __importDefault(require("../config/db.config"));
const sequelize_1 = require("sequelize");
exports.Order = db_config_1.default.define('Orders', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    product_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    totalAmount: {
        type: sequelize_1.DataTypes.BIGINT,
    },
});
