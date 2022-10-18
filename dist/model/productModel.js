"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const db_config_1 = __importDefault(require("../config/db.config"));
const sequelize_1 = require("sequelize");
exports.Product = db_config_1.default.define('Products', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: sequelize_1.DataTypes.ENUM,
        values: ['Books', 'Electronics', 'Clothing & Shoes', 'Grocery', 'Arts'],
        allowNull: true,
    },
    ratings: {
        type: sequelize_1.DataTypes.ENUM,
        values: ['1', '2', '3', '4', '5'],
        allowNull: true,
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
});
