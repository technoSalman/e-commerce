// eslint-disable-next-line no-unused-vars
const mysql = require('mysql2');
const { Sequelize} = require('sequelize');

const sequelize = new Sequelize('project1', 'root', 'linux', {
    host: 'localhost',
    dialect: 'mysql'
});   


module.exports = sequelize;