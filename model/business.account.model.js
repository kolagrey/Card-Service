const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    owner: {
        type: String,
        index: true,
        require: true
    },
    business: {
        pin: {
            type: String,
            require: true,
            index: true,
            unique: true
        },
        avatar: {
            type: String,
            default: ''
        },
        identifier: {
            type: String,
            index: true,
            require: true,
            unique: true
        },
        name: {
            type: String,
            default: ''
        }
    },
    location: {
        address: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            default: ''
        },
        state: {
            type: String,
            default: ''
        },
        country: {
            type: String,
            default: 'Nigeria'
        }
    },
    device: {
        is_available: { type: Boolean, default: false },
        is_active: { type: Boolean, default: false },
        specification: {
            uuid: { type: String, default: '' },
            model: { type: String, default: '' },
            platform: { type: String, default: '' },
            version: { type: String, default: '' },
            manufacturer: { type: String, default: '' },
            is_virtual: { type: String, default: '' },
            hardware_serial: { type: String, default: '' }
        }
    },
    document_status: {
        type: Number,
        default: 1
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('BusinessAccount', schema, 'business_accounts');