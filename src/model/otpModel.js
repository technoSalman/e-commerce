const sequelize = require('../config/db.config');
const { DataTypes } = require('sequelize');
const User = require('./userModel');

const OTP = sequelize.define('otp', {
    user_id: {
        type: DataTypes.UUID,    
    },
    otp: {
        type: DataTypes.INTEGER
    }

});

User.hasOne(OTP, {
    foreignKey: 'user_id'
});
OTP.belongsTo(User, {
    foreignKey: 'user_id'
});



module.exports = OTP;

