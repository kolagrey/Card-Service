const AuthStore = require('nedb');
const generateIdentifier = require('../library/generate.identifier.library');
const authTokenStore = new AuthStore();
// authTokenStore.loadDatabase();

const accessInit = {
    create: (req, res) => {
        const token = generateIdentifier();
        const payload = {
            token,
            created: new Date()
        };
        authTokenStore.insert(payload, (err, doc) => {
            if (err || !doc) {
                res.json({
                    success: false
                })
            } else {
                res.json({
                    success: true,
                    result: doc
                });
            }
        });
    },
    local: () => {
        return new Promise((resolve) => {
            const token = generateIdentifier();
            const payload = {
                token,
                created: new Date()
            };
            authTokenStore.insert(payload, (err, doc) => {
                if (err || !doc) {
                    resolve('error')
                } else {
                    resolve(doc.token);
                }
            });
        });
    },
    validate: (req, res, next) => {
        authTokenStore.findOne({
            token: req.body.token
        }, (err, doc) => {
            if (err || !doc) {
                res.status(401).send({
                    success: false,
                    message: 'Authentication validation failed'
                });
            } else {
                authTokenStore.remove({
                    token: req.body.token
                },(err, doc) => {
                    next();
                });
            }
        })
    },

    trust: (req, res, next) => {
        authTokenStore.findOne({
            token: req.headers.token
        }, (err, doc) => {
            if (err || !doc) {
                res.status(401).send({
                    success: false,
                    message: 'Resource access trust failed'
                });
            } else {
                next();
            }
        })
    },

    get: (req, res) => {
        authTokenStore.find({}, (err, docs) => {
            res.json({result: docs});
        });
    }
}

module.exports = accessInit;