import { User } from '../model/userModel';
import bcrypt from 'bcrypt';

export const getUserByEmail = async (email: any) => {
	try {
		const oldUser = await User.findOne({ where: { email: email } });
		if (oldUser) {
			return oldUser;
		} else {
			return false;
		}
	} catch (error) {
		console.log('Error in getUserByEmail service ', error);
		throw error;
	}
};

export const getUserEmail = async (userId: any) => {
	try {
		const user = await User.findOne({ where: { id: userId } });
		const email = user.dataValues.email;
		if (email) {
			return email;
		} else {
			return false;
		}
	} catch (error) {
		console.log('Error in getUserEmail service ', error);
		throw error;
	}
};

export const getUserId = async (email: any) => {
	try {
		const user = await User.findOne({ where: { email: email } });
		const userId = user.dataValues.id;
		if (userId) {
			return userId;
		}
	} catch (error) {
		console.log('Error in getUserId service ', error);
		throw error;
	}
};

export const signupUser = async (email: any, password: any) => {
	try {
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);
		const newUser = await User.create({
			email: email,
			password: hashedPassword,
		});
		return newUser;
	} catch (error) {
		console.log('Error in signupUser service ', error);
		throw error;
	}
};

export const loginUserService = async (email: any, password: any | Buffer) => {
	try {
		const user = await User.findOne({ where: { email: email } });
		if (user && (await bcrypt.compare(password, user.password))) {
			return user;
		}
	} catch (error) {
		console.log('Error in loginUser service ', error);
		throw error;
	}
};

export const updatePassword = async (email: any, password: any | Buffer) => {
	// eslint-disable-next-line no-useless-catch
	try {
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);
		const updatedUser = await User.update(
			{ password: hashedPassword },
			{ where: { email: email } }
		);
		if (updatedUser) {
			return updatedUser;
		}
	} catch (error) {
		throw error;
	}
};
