const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    identifier: {
        type: String,
        lowercase: true,
        index: true,
        require: true,
        unique: true
    },
    pin: {
        type: String,
        required: true,
        index: true,
    },
    card_pin: {
        type: String,
        required: true,
        index: true,
    },
    card_value: {
        type: Number,
        default: 0
    },
    card_hash: {
        type: String,
        required: true,
        index: true
    },
    card_salt: {
        type: String,
        required: true,
        index: true
    },
    card_state: {
        type: Boolean,
        default: false
    }, // true = Active, false = In-Active
    use_state: {
        type: Boolean,
        default: false
    }, // true = Used, false = Not used
    use_date: Date,
    meta: {
        merchant: String,
        merchant_interface: String, // Mobile, Web, API Call
        merchant_url: String,
        user_fullname: String,
        user_mobile: String,
        user_email: String,
        product_name: String,
        note: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CardLedger', schema, 'card_ledger');