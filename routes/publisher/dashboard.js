const express = require('express')
const router = express.Router();

const {isAuthenticated, isPublisher} = require('../../middleware/Authentication');

router.get('/dashboard',[isAuthenticated], [isPublisher], function(req, res, next){
    res.render("advertiser/index", { page: "page", session: req.session});
});


router.get('/dashboard/statics',[isAuthenticated], [isPublisher], function(req, res, next){
    res.render("advertiser/index", { page: "page", session: req.session});
});

module.exports = router;