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
        organisation: {
            type: String,
            default: ''
        },
        contact_name: {
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
        },
        about: {
            type: String,
            default: ''
        }
    },
    primary_location: {
        address: String,
        area: String,
        lga: String,
        state: String,
        country: String
    },
    public: {
        twitter: {
            type: String,
            default: ''
        },
        facebook: {
            type: String,
            default: ''
        },
        instagram: {
            type: String,
            default: ''
        }
    },
    accounts: [String],
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

module.exports = mongoose.model('BusinessProfile', schema, 'organisations');