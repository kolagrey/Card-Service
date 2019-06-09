const mailer = require('./mailer.engine');
const userWelcomeEmail = require('./templates/user.welcome.template');
const businessWelcomeEmail = require('./templates/business.welcome.template');
const businessUserWelcomeEmail = require('./templates/business.user.welcome.template');

const sendWelcomeEmail = (payload) => {
    return new Promise(resolve => {
        //send welcome email
        const welcomePayload = {
            firstname: payload.firstname,
            email: payload.email,
            mobile: payload.mobile,
            pin: payload.password,
            platform: 'Dine Wallet',
            title: `Hello ${payload.firstname}, Welcome to Dine Wallet`
        };
        mailer.sendEmail(welcomePayload.email, welcomePayload.title, userWelcomeEmail(welcomePayload), welcomePayload.platform);
        resolve();
    });
}

const sendBusinessWelcomeEmail = (payload) => {
    return new Promise(resolve => {
        //send welcome email
        const welcomePayload = {
            firstname: payload.contact_name.split(' ')[0],
            organisation: payload.organisation,
            email: payload.email,
            pin: payload.password,
            platform: 'Dine Wallet Console',
            title: `Hello ${payload.contact_name}, Welcome to Dine Wallet Console`
        };
        mailer.sendEmail(welcomePayload.email, welcomePayload.title, businessWelcomeEmail(welcomePayload), welcomePayload.platform);
        resolve();
    });
}

const sendBusinessUserWelcomeEmail = (payload) => {
    return new Promise(resolve => {
        //send welcome email
        const welcomePayload = {
            firstname: payload.firstname,
            organisation: payload.organisation.name,
            email: payload.email,
            pin: payload.password,
            platform: 'Dine Wallet Console',
            title: `Hello ${payload.firstname}, Welcome to Dine Wallet Console`
        };
        mailer.sendEmail(welcomePayload.email, welcomePayload.title, businessUserWelcomeEmail(welcomePayload), welcomePayload.platform);
        resolve();
    });
}

exports.sendWelcomeEmail = sendWelcomeEmail;
exports.sendBusinessWelcomeEmail = sendBusinessWelcomeEmail;
exports.sendBusinessUserWelcomeEmail = sendBusinessUserWelcomeEmail;