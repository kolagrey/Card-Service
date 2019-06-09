const sr = require('./server.response.controller');
const email = require('../mailer/email.notification.engine');

const successResponse = {
  user: (res, payload) => {
    email.sendWelcomeEmail(payload).then(() => {
      sr.serverResponse(res, {
        id: payload.identifier,
        pin: payload.password
      }, true);

    });
  },
  business: (res, payload) => {
    email.sendBusinessWelcomeEmail(payload).then(() => {
      sr.serverResponse(res, {
        id: payload.identifier,
        pin: payload.password
      }, true);

    });
  },
  businessUser: (res, payload) => {
    email.sendBusinessUserWelcomeEmail(payload).then(() => {
      sr.serverResponse(res, {
        id: payload.identifier,
        pin: payload.password
      }, true);

    });
  }
}

module.exports = successResponse;