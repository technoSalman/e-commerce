const sequelize = require('../config/db.config');
const { DataTypes, Sequelize } = require('sequelize');


const User = sequelize.define('User',{
    id:{
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});


module.exports = User;
