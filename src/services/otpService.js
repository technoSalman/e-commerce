const OTP = require('../model/otpModel.js');

const saveOtp = async(userId, otp) => {
    // eslint-disable-next-line no-useless-catch
    try{
        const savedOtp = await OTP.create({ user_id: userId, otp: otp });
        if(savedOtp){
            return savedOtp;
        }
    }
    catch(error){
        console.log('Error in saveOtp service ', error);
        throw error;
    }
};


const matchOtp = async(otpEntered) => {
    try{
        const otpInDb = await OTP.findOne({ where: { otp: otpEntered }});
        if(otpInDb){
            return otpInDb;
        }
    }
    catch(error){
        console.log('Error in matchOtp service ',error);
        throw error;
    }
};

const getUserIdByOtp = async(otp) => {
    try{
        const user = await OTP.findOne({where: {otp: otp}});
        if(user){
            const userId = user.user_id;
            return userId;
        }
    }
    catch(error){
        console.log('Error in getUserIdByOtp service ', error);
        throw error;
    }
};

const deleteOtp = async(verifyOtp) => {
    try{
        const otp = verifyOtp.dataValues.otp;
        // eslint-disable-next-line no-unused-vars
        const deletedOtp = OTP.destroy({where:{ otp: otp}});
    }
    catch(error){
        console.log('OTP deletion failed...');  
        throw error;
    }
};

module.exports = {
    matchOtp,
    saveOtp,
    getUserIdByOtp,
    deleteOtp
};