import sequelize from '../config/db.config';
import { DataTypes, Sequelize } from 'sequelize';
import { UUIDV4 } from 'sequelize';

export const User = sequelize.define('User', {
	id: {
		type: DataTypes.UUID,
		defaultValue: UUIDV4,
		allowNull: false,
		primaryKey: true,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});
