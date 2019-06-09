const passwordEncrypt = require('../library/password.encrypt.library');

const generateCardIdentifier = () => {
    return (Math.random() * 999999999999).toFixed(0);
};

const generateCardPIN = () => {
    return (Math.random() * 9999).toFixed(0);
};

module.exports = {
    produce: (volume, value) => {
        const _volume = parseInt(volume);
        const card_value = parseInt(value);
        let identifier = 0;
        let pin = 0;
        let products = [];
        let encryptedCard = {};
        for (i=0; i < _volume; i++) {
            identifier = generateCardIdentifier();
            pin = generateCardPIN();
            encryptedCard = passwordEncrypt.saltHashPassword(`${identifier}${pin}`);
            products.push({
                identifier,
                pin,
                card_value,
                card_hash: encryptedCard.hash,
                card_salt: encryptedCard.salt,
                card_state: true
            })
        }
        return products;
    }
}