const crypto = require('crypto');

const genRandomString = (length)=>{
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') 
            .slice(0,length);   
};

const hashPassword = (password, salt)=>{
    const hash = crypto.createHmac('sha512', salt); 
    hash.update(password);
    const hashed = hash.digest('hex');
    return {
        salt,
        hashed
    };
};

const saltHashPassword = (userPassword)=>{
    const salt = genRandomString(16); 
    const passwordData = hashPassword(userPassword, salt);
    return {hash : passwordData.hashed, salt : passwordData.salt};
}

exports.hashPassword = hashPassword;
exports.saltHashPassword = saltHashPassword;
