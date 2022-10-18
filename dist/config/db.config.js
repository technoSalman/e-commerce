"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require('mysql2');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('project1', 'root', 'linux', {
    host: 'localhost',
    dialect: 'mysql',
});
exports.default = sequelize;
