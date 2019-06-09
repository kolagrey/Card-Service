const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: {
        type: String,
        lowercase: true,
        index: true,
        require: true,
        unique: true
    },
    mobile: {
      type: String,
      require: true,
      index: true,
      unique: true
    },
    security: {
        is_active: {
            type: Boolean,
            default: true
        },
        level: { type: Number, default: 3},
        accesskey: String,
        accesscode: String
    },
    validated: {
        email: {
            type: Boolean,
            default: false
        },
        mobile: {
            type: Boolean,
            default: false
        }
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('SecurityLedger', schema, 'security_ledger');