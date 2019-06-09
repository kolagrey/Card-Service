const crypto = require('crypto');

const generateIdentifier = ()=>{
    const now = new Date().getTime().toString();
    const randomValue = crypto.randomBytes(Math.ceil(32/2))
            .toString('hex') 
            .slice(0,32);   
    return randomValue + now;
};


module.exports = generateIdentifier;