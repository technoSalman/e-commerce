import { OTP } from '../model/otpModel.js';

export const saveOtp = async (userId: any, otp: number) => {
	// eslint-disable-next-line no-useless-catch
	try {
		const savedOtp = await OTP.create({ user_id: userId, otp: otp });
		if (savedOtp) {
			return savedOtp;
		}
	} catch (error) {
		console.log('Error in saveOtp service ', error);
		throw error;
	}
};

//take otp and id from controller as parameter and do the following:
//1. find latest otp with that id
//2. compare it with input otp
export const matchOtp = async (otpEntered: any, getUserId: any) => {
	try {
		const latestOtpObj = await OTP.findOne({
			where: { user_id: getUserId },
			order: [['createdAt', 'DESC']],
		});
		const latestOtp = latestOtpObj.otp;
		if (latestOtp == otpEntered) {
			return true;
		}
		if (latestOtp != otpEntered) {
			return false;
		}
	} catch (error) {
		console.log('Error in matchOtp service ', error);
		throw error;
	}
};

export const getUserIdByOtp = async (otp: any) => {
	try {
		const user = await OTP.findOne({ where: { otp: otp } });
		if (user) {
			const userId = user.user_id;
			return userId;
		}
	} catch (error) {
		console.log('Error in getUserIdByOtp service ', error);
		throw error;
	}
};

export const deleteOtpService = async (userId: any) => {
	try {
		// eslint-disable-next-line no-unused-vars
		const deletedOtp = OTP.destroy({ where: { user_id: userId } });
	} catch (error) {
		console.log('OTP deletion failed...');
		throw error;
	}
};
