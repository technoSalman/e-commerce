const User = require('../model/userModel');
const bcrypt = require('bcrypt');

const getUserByEmail = async(email) => {
    try{
        const oldUser = await User.findOne({where: {email: email}});
        return oldUser;
    }
    catch(error){
        console.log('Error in getUserByEmail service ', error);
        throw error;
    }
};

const getUserEmail = async(userId) => {
    try{
        const user = await User.findOne({ where: { id: userId } });
        const email = user.dataValues.email;
        if(email){
            return email;
        }
        else{
            return 0;
        }
    }
    catch(error){
        console.log('Error in getUserEmail service ', error);
        throw error;
    }
};

const getUserId = async(email) => {
    try{
        const user = await User.findOne({where: {email: email}});
        const userId = user.dataValues.id;
        if(userId){
            return userId;
        }
    }
    catch(error){
        console.log('Error in getUserId service ', error);
        throw error;
    }
};

const signupUser = async(email, password) => {
    try{    
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({ email: email, password: hashedPassword });
        return newUser;
    }
    catch(error){
        console.log('Error in signupUser service ', error);
        throw error;
    }
};


const loginUser = async(email, password) => {
    try{
        const user = await User.findOne( {where: {email: email}});
        if(user && await (bcrypt.compare(password, user.password))){
            return user;
        }
    }
    catch(error){
        console.log('Error in loginUser service ', error);
        throw error;
    }
};


const updatePassword = async(email, password) => {
    // eslint-disable-next-line no-useless-catch
    try{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const updatedUser = await User.update(
            { password: hashedPassword },
            { where: { email: email } }
        );
        if(updatedUser){
            return updatedUser;
        }
    }
    catch(error){
        throw error;
    }
};


module.exports = {
    signupUser,
    loginUser,
    getUserByEmail,
    updatePassword,
    getUserEmail,
    getUserId
};
