const sequelize = require('../config/db.config');
const { DataTypes } = require('sequelize');

const Product = sequelize.define('Products', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category:{
        type: DataTypes.ENUM,
        values: ['Books','Electronics','Clothing & Shoes','Grocery','Arts'],
        allowNull: true,
    },
    ratings: {
        type: DataTypes.ENUM,
        values: ['1','2','3','4','5'],
        allowNull: true
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});


module.exports = Product;