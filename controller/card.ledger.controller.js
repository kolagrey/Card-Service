const CardLedger = require('../model/card.ledger.model');
const CardFactory = require('../library/generate.card.library');
const passwordEncrypt = require('../library/password.encrypt.library');

module.exports = {
    create: (req, res) => {
        let products = CardFactory.produce(100, 20000);
        CardLedger.insertMany(products.map(product => {
            return {
                identifier: product.identifier,
                pin: product.pin,
                card_pin: `${product.identifier}${product.pin}`,
                card_value: product.card_value,
                card_hash: product.card_hash,
                card_salt: product.card_salt,
                card_state: product.card_state
            }
        }))
            .then((docs) => {
                res.json({
                    success: true,
                    result: docs
                });
            })
            .catch((err) => {
                res.json({
                    success: true,
                    result: [],
                    error: err
                });
            });
    },

    verify: (req, res) => {
        const payload = req.body;
        CardLedger.findOne({
            card_pin: payload.pin
        }, (err, verifiedResponse) => {
            if (err || !verifiedResponse) {
                res.json({
                    success: false
                })
            } else {
                const encryptedCard = passwordEncrypt.hashPassword(payload.pin, verifiedResponse.card_salt);
                if (encryptedCard.hashed === verifiedResponse.card_hash) {
                    const {card_value, card_pin} = verifiedResponse;
                    res.json({
                        success: true,
                        result: {card_value, card_pin}
                    });
                } else {
                    res.json({
                        success: false
                    })
                }
            }
        });
    },

    enable: (req, res) => {
        const payload = req.body;
        CardLedger.findOneAndUpdate({
            _id: payload.reference
        }, {
                card_status: true
            }, { new: true }, (err, doc) => {
                if (err || !doc) {
                    res.json({
                        success: false
                    });
                }
                res.json({
                    success: true
                });
            });
    },

    disable: (req, res) => {
        const payload = req.body;
        CardLedger.findOneAndUpdate({
            _id: payload.reference
        }, {
                card_status: false
            }, { new: true }, (err, doc) => {
                if (err || !doc) {
                    res.json({
                        success: false
                    });
                }
                res.json({
                    success: true
                });
            });
    },

    get: (req, res) => {
        CardLedger.find({}, (err, docs) => {
            if (err || !docs) {
                res.json({ success: false })
            }
            res.json({ success: true, result: docs });
        })
    }
}