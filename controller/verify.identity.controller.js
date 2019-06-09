const Profile = require('../model/profile.model');
const BusinessProfile = require('../model/business.profile.model');
const BusinessUserProfile = require('../model/business.user.profile.model');
const accessInit = require('./access.init.controller');
module.exports = {
    identity: (req, res) => {
        if(!req.headers.email) {
            res.json({
                result: {
                    exist: 1,
                    error: true
                }
            });
        }
        Profile.findOne({
            '$or': [{'personal.email': req.headers.email}, {'personal.mobile': req.headers.mobile}]
        }, (err, doc) => {
            if (err) {
                res.json({
                    result: {
                        exist: true,
                        error: true
                    }
                });
            } else {
                if (doc) {
                    res.json({
                        result: {
                            exist: true,
                            error: false
                        }
                    });
                } else {
                    accessInit.local().then(token=>{
                        res.json({
                            result: {
                                exist: false,
                                error: false,
                                token
                            }
                        }); 
                    });
                }
            }
        });
    },
    businessIdentity: (req, res) => {
        if(!req.headers.email) {
            res.json({
                result: {
                    exist: 1,
                    error: true
                }
            });
        }
        BusinessProfile.findOne({
            '$or': [{'personal.email': req.headers.email}, {'personal.mobile': req.headers.mobile}]
        }, (err, doc) => {
            if (err) {
                res.json({
                    result: {
                        exist: true,
                        error: true
                    }
                });
            } else {
                if (doc) {
                    res.json({
                        result: {
                            exist: true,
                            error: false
                        }
                    });
                } else {
                    accessInit.local().then(token=>{
                        res.json({
                            result: {
                                exist: false,
                                error: false,
                                token
                            }
                        }); 
                    });
                }
            }
        });
    },
    businessUserIdentity: (req, res) => {
        if(!req.headers.email) {
            res.json({
                result: {
                    exist: true,
                    error: true
                }
            });
        }
        BusinessUserProfile.findOne({
            '$or': [{'personal.email': req.headers.email}, {'personal.mobile': req.headers.mobile}]
        }, (err, doc) => {
            if (err) {
                res.json({
                    result: {
                        exist: true,
                        error: true
                    }
                });
            } else {
                if (doc) {
                    res.json({
                        result: {
                            exist: true,
                            error: false
                        }
                    });
                } else {
                    accessInit.local().then(token=>{
                        res.json({
                            result: {
                                exist: false,
                                error: false,
                                token
                            }
                        }); 
                    });
                }
            }
        });
    },
}