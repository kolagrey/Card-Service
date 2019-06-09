const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
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
    gender: {
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
    dob: {
      month: Number,
      year: Number
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
  location: {
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

module.exports = mongoose.model('Profile', schema, 'people');