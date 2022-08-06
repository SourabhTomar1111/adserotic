var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/* GET users listing. */
router.get('/home', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/about', function (req, res, next) {
    res.send('respond with a resource about page');
});
router.get('/publisher', function (req, res, next) {
    res.send('respond with a resource publisher page');
});
router.get('/advertiser', function (req, res, next) {
    res.send('respond with a resource advertiser page');
});
router.get('/faq', function (req, res, next) {
    res.send('respond with a resource faq page');
});
// router.get('/contact-us', function (req, res, next) {
//     res.send('respond with a resource contact-us page');
// });


router.get('/toast',function(req, res){
    req.toastr.error('Invalid credentials.');
    res.render("web/index", { page: "home", session: req.session});
});
module.exports = router;