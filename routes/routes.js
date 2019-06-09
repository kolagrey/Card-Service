let express = require('express');
let router = express.Router();
const registration = require('../controller/registration.controller');
const verify = require('../controller/verify.identity.controller');
const accessInit = require('../controller/access.init.controller');
const card = require('../controller/card.ledger.controller');

// Registration Route(s)
router.post('/register/user', accessInit.validate, registration.addUser);
router.post('/register/business', accessInit.validate, registration.addBusiness);
router.post('/register/business/user', accessInit.validate, registration.addBusinessUser);
router.post('/register/business/pos', accessInit.validate, registration.addBusinessPOS);

// Card Route(s)
router.post('/create/cards', card.create);
router.post('/verify/card', card.verify);
router.post('/activate/card', card.enable);
router.post('/deactivate/card', card.disable);
router.get('/cards', card.get);

// Account Verification Route
router.post('/verify/user', accessInit.trust, verify.identity);
router.post('/verify/business', accessInit.trust, verify.businessIdentity);
router.post('/verify/business/user', accessInit.trust, verify.businessUserIdentity);

router.post('/access/init', accessInit.create);
router.get('/access/log', accessInit.get);

module.exports = router;