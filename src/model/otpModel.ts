import sequelize from '../config/db.config';
import { DataTypes } from 'sequelize';
import { User } from './userModel';

export const OTP = sequelize.define('otp', {
	user_id: {
		type: DataTypes.UUID,
	},
	otp: {
		type: DataTypes.INTEGER,
	},
});

User.hasOne(OTP, {
	foreignKey: 'user_id',
});
OTP.belongsTo(User, {
	foreignKey: 'user_id',
});
