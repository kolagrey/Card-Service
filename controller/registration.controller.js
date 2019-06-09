const Profile = require('../model/profile.model');
const BusinessProfile = require('../model/business.profile.model');
const BusinessUserProfile = require('../model/business.user.profile.model');
const BusinessAccount = require('../model/business.account.model');
const SecurityLedger = require('../model/security.ledger.model');
const sr = require('./server.response.controller');
const passwordEncrypt = require('../library/password.encrypt.library');
const generateIdentifier = require('../library/generate.identifier.library');
const generatePIN = require('../library/generate.pin.library');
const adapter = require('../library/adapter.library');
const successResponse = require('./registration.success.response');


const registration = {

  // Add a new user 
  addUser: (req, res) => {
    const today = new Date();
    const payload = req.body;
    payload.password = generatePIN();
    payload.identifier = generateIdentifier();
    isValidPayload = adapter.isValidPayload(payload);
    if (!isValidPayload) {
      sr.serverResponse(res, {}, false);
    } else {
      const encryptedPassword = passwordEncrypt.saltHashPassword(payload.password);
      const newUser = Profile({
        'personal': {
          'identifier': payload.identifier,
          'firstname': payload.firstname,
          'lastname': payload.lastname,
          'email': payload.email,
          'mobile': payload.mobile
        },
        'created_on': today
      });
      newUser.save().then(
        (newUserData) => {
          const securityLedger = new SecurityLedger({
            'email': payload.email,
            'mobile': payload.mobile,
            'security': {
              'accesscode': encryptedPassword.salt,
              'accesskey': encryptedPassword.hash
            }
          });
          securityLedger.save().then((newEntry) => {
            successResponse.user(res, payload);
          }, (err) => {
            sr.serverResponse(res, {}, false);
          });
        }, (err) => {
          sr.serverResponse(res, {}, false);
        });
    }
  },

  // Add a new business 
  addBusiness: (req, res) => {
    const today = new Date();
    const payload = req.body;
    payload.password = generatePIN();
    payload.identifier = generateIdentifier();
    isValidPayload = adapter.isValidBusinessPayload(payload);
    if (!isValidPayload) {
      sr.serverResponse(res, {}, false);
    } else {
      const encryptedPassword = passwordEncrypt.saltHashPassword(payload.password);
      const newUser = BusinessProfile({
        'organisation': {
          'code': payload.code,
          'id': payload.identifier,
          'name': payload.organisation
        },
        'personal': {
          'identifier': payload.identifier,
          'organisation': payload.organisation,
          'contact_name': payload.contact_name,
          'email': payload.email,
          'mobile': payload.mobile
        },
        'created_on': today
      });
      newUser.save().then(
        (newUserData) => {
          const securityLedger = new SecurityLedger({
            'email': payload.email,
            'mobile': payload.mobile,
            'security': {
              'level': 1,
              'accesscode': encryptedPassword.salt,
              'accesskey': encryptedPassword.hash
            }
          });
          securityLedger.save().then((newEntry) => {
            successResponse.business(res, payload);
          }, (err) => {
            sr.serverResponse(res, {}, false);
          });
        }, (err) => {
          sr.serverResponse(res, {}, false);
        });
    }
  },

  // Add a new business user - by Business Account Admin
  addBusinessUser: (req, res) => {
    const today = new Date();
    const payload = req.body;
    payload.password = generatePIN();
    payload.identifier = generateIdentifier();
    isValidPayload = adapter.isValidBusinessUserPayload(payload);
    if (!isValidPayload) {
      sr.serverResponse(res, {}, false);
    } else {
      const encryptedPassword = passwordEncrypt.saltHashPassword(payload.password);
      const newUser = BusinessUserProfile({
        'organisation': payload.organisation,
        'personal': {
          'identifier': payload.identifier,
          'firstname': payload.firstname,
          'lastname': payload.lastname,
          'email': payload.email,
          'mobile': payload.mobile
        },
        'created_on': today
      });
      newUser.save().then(
        (newUserData) => {
          const securityLedger = new SecurityLedger({
            'email': payload.email,
            'mobile': payload.mobile,
            'security': {
              'level': 2,
              'accesscode': encryptedPassword.salt,
              'accesskey': encryptedPassword.hash
            }
          });
          securityLedger.save().then((newEntry) => {
            successResponse.businessUser(res, payload);
          }, (err) => {
            console.log('SECURITY LEDGER ERROR',err);
            sr.serverResponse(res, {}, false);
          });
        }, (err) => {
          sr.serverResponse(res, {}, false);
        });
    }
  },

  // Add a new business POS - by Business Account Admin
  addBusinessPOS: (req, res) => {
    const payload = req.body;
    payload.business.identifier = generateIdentifier();
    const newAccount = BusinessAccount({
        owner: payload.owner,
        business: payload.business,
        location: payload.location
    });
    newAccount.save().then(doc => {
        if (doc) {
          BusinessProfile.findOneAndUpdate({
            'organisation.id': payload.owner
          },{
            '$push': {
              accounts: payload.business.identifier 
            }
          },(err, updatedDoc) => {
            sr.serverResponse(res, doc, true);
          });
        } else {
            sr.serverResponse(res, {}, false);
        }
    }, err => {
        sr.serverResponse(res, {}, false);
    });
  }

}

module.exports = registration;