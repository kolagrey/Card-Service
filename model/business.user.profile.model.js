const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    organisation: {
        id: {
            type: String,
            index: true,
            require: true,
        },
        name: {
            type: String,
            require: true
        },
        code: {
            type: String,
            default: ''
        }
    },
    personal: {
        identifier: {
            type: String,
            index: true,
            require: true,
            unique: true
        },
        firstname: {
            type: String,
            default: ''
        },
        lastname: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            lowercase: true,
            require: true,
            index: true,
            unique: true
        },
        mobile: {
            type: String,
            require: true,
            index: true,
            unique: true
        },
        avatar: {
            type: String,
            default: ''
        }
    },
    document_status: {
        type: Number,
        default: 1
    },
    created: {
        type: Date
    },
    last_seen: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('BusinessUserProfile', schema, 'business_people');