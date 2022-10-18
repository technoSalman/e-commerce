import sequelize from '../config/db.config';
import { DataTypes } from 'sequelize';

export const Order = sequelize.define('Orders', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	product_id: {
		type: DataTypes.INTEGER,
	},
	user_id: {
		type: DataTypes.INTEGER,
	},
	quantity: {
		type: DataTypes.INTEGER,
	},
	totalAmount: {
		type: DataTypes.BIGINT,
	},
});
