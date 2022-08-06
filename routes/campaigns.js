const express = require('express')
const router = express.Router()

const {isAuthenticated, isAdvertiser} = require('../middleware/Authentication');

router.get('/', [isAuthenticated], [isAdvertiser], function(req, res, next){
    res.render("advertiser/index", { page: "campaigns", session: req.session});
});

router.get('/add', [isAuthenticated], [isAdvertiser], function(req, res, next){
    res.render("advertiser/index", { page: "add_campaign", session: req.session});
});


router.post('/add', [isAuthenticated], [isAdvertiser], function(req, res, next){

    res.json(req.body);
    // res.render("advertiser/index", { page: "add_campaign", session: req.session});
});

module.exports = router;