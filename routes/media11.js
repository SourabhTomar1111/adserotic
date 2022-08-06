const express = require('express');
const router = express.Router();
const db =  require('../config/db');
const { check, validationResult } = require('express-validator');
const slug = require('slug');

router.post('/addtest', function(req, res, next){

    res.json(req.body);
});

router.get('/add', function(req, res, next){
    res.send('custom routes');
});

router.get('/', function(req, res, next){
    res.render('tt');
});

router.post("/upload", function(request, response) {
    var images = new Array();
    if(request.files) {
        var arr;
        if(Array.isArray(request.files.banner)) {
            arr = request.files.banner;
        }
        else {
            arr = new Array(1);
            arr[0] = request.files.banner;
        }
        for(var i = 0; i < arr.length; i++) {
            var file = arr[i];
            if(file.mimetype.substring(0,5).toLowerCase() == "image") {
                images[i] = "/" + file.name;
                file.mv("./public/static" + images[i], function (err) {
                    if(err) {
                        console.log(err);
                    }
                });
            }
        }
    }
    // give the server a second to write the files
    setTimeout(function(){response.json(images);}, 1000);
});

module.exports =  router;