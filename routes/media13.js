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
        if(Array.isArray(request.files.filesfld)) {
            arr = request.files.filesfld;
        }
        else {
            arr = new Array(1);
            arr[0] = request.files.filesfld;
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

//for static banner router 
router.post('/static_banner', function(req, res, next){
    // res.json(req.files);
    var images = new Array();
    if(req.files) {
        var arr;
        if(Array.isArray(req.files.banner)) {
            arr = req.files.banner;
        }
        else {
            arr = new Array(1);
            arr[0] = req.files.banner;
        }
        for(var i = 0; i < arr.length; i++) {
            var file = arr[i];
            if(file.mimetype.substring(0,5).toLowerCase() == "image") {
                let prefixImg = Date.now();
                images[i] = "/" + prefixImg +"_" + file.name;
                $newName = prefixImg + "_" + file.name;
                file.mv("./public/static_banner" + images[i], function (err) {
                    if(err) {
                        console.log(err);
                    }

                    $ext = '';
                    if(file.name){
                        $name = file.name;
                        $ext =  $name.split('.')[1];
                    }

                    //insert into database
                    let data = {
                        "title": req.files.banner.name,
                        "name": $newName,
                        "extension": $ext,
                        "size": req.files.banner.size,
                        "type": 1, //for media type static_banner
                        "user_id": 3, //for userid get it from session req.session.user.id
                      }
                    
                    
                      db.query('INSERT INTO media SET ?', data, function (error, results, fields) {
                        if (error) {
                          res.send({
                            "code": 400,
                            "type": "error",
                            "failed": "Uploading failed",
                            "message": error
                          })
                        } else {
                          res.send({
                            "code": 200,
                            "type": "success",
                            "message": "Media added"
                          });
                        }
                    });
                });
            }
        }
    }    
});

//for overlay banner router 
router.post('/overlay_banner', function(req, res, next){
    // res.json(req.files);
    var images = new Array();
    if(req.files) {
        var arr;
        if(Array.isArray(req.files.banner)) {
            arr = req.files.banner;
        }
        else {
            arr = new Array(1);
            arr[0] = req.files.banner;
        }
        for(var i = 0; i < arr.length; i++) {
            var file = arr[i];
            if(file.mimetype.substring(0,5).toLowerCase() == "image") {
                let prefixImg = Date.now();
                images[i] = "/" + prefixImg +"_" + file.name;
                $newName = prefixImg + "_" + file.name;
                file.mv("./public/overlay_banner" + images[i], function (err) {
                    if(err) {
                        console.log(err);
                    }

                    $ext = '';
                    if(file.name){
                        $name = file.name;
                        $ext =  $name.split('.')[1];
                    }

                    //insert into database
                    let data = {
                        "title": req.files.banner.name,
                        "name": $newName,
                        "extension": $ext,
                        "size": req.files.banner.size,
                        "type": 2, //for media type overlay_banner
                        "user_id": 3, //for userid get it from session req.session.user.id
                      }
                    
                    
                      db.query('INSERT INTO media SET ?', data, function (error, results, fields) {
                        if (error) {
                          res.send({
                            "code": 400,
                            "type": "error",
                            "failed": "Uploading failed",
                            "message": error
                          })
                        } else {
                          res.send({
                            "code": 200,
                            "type": "success",
                            "message": "Media added"
                          });
                        }
                    });
                });
            }
        }
    }    
});

//for video banner router 
router.post('/video_banner', function(req, res, next){
    // res.json(req.files);
    var images = new Array();
    if(req.files) {
        var arr;
        if(Array.isArray(req.files.banner)) {
            arr = req.files.banner;
        }
        else {
            arr = new Array(1);
            arr[0] = req.files.banner;
        }
        console.log(arr);
        for(var i = 0; i < arr.length; i++) {
            var file = arr[i];
            if(file.mimetype.substring(0,5).toLowerCase() == "image") {
                let prefixImg = Date.now();
                images[i] = "/" + prefixImg +"_" + file.name;
                $newName = prefixImg + "_" + file.name;
                console.log(file);
                file.mv("./public/video_banner" + images[i], function (err) {
                    if(err) {
                        console.log(err);
                    }

                    $ext = '';
                    if(file.name){
                        $name = file.name;
                        $ext =  $name.split('.')[1];
                    }

                    //insert into database
                    let data = {
                        "title": req.files.banner.name,
                        "name": $newName,
                        "extension": $ext,
                        "size": req.files.banner.size,
                        "type": 3, //for media type video_banner
                        "user_id": 3, //for userid get it from session req.session.user.id
                      }
                    
                    
                      db.query('INSERT INTO media SET ?', data, function (error, results, fields) {
                        if (error) {
                          res.send({
                            "code": 400,
                            "type": "error",
                            "failed": "Uploading failed",
                            "message": error
                          })
                        } else {
                          res.send({
                            "code": 200,
                            "type": "success",
                            "message": "Media added"
                          });
                        }
                    });
                });
            }
        }
    }    
});

//for video stream router 
router.post('/video_stream', function(req, res, next){
    // res.json(req.files);
    var images = new Array();
    if(req.files) {
        var arr;
        if(Array.isArray(req.files.banner)) {
            arr = req.files.banner;
        }
        else {
            arr = new Array(1);
            arr[0] = req.files.banner;
        }
        for(var i = 0; i < arr.length; i++) {
            var file = arr[i];
            if(file.mimetype.substring(0,5).toLowerCase() == "image") {
                let prefixImg = Date.now();
                images[i] = "/" + prefixImg +"_" + file.name;
                $newName = prefixImg + "_" + file.name;
                file.mv("./public/video_stream" + images[i], function (err) {
                    if(err) {
                        console.log(err);
                    }

                    $ext = '';
                    if(file.name){
                        $name = file.name;
                        $ext =  $name.split('.')[1];
                    }

                    //insert into database
                    let data = {
                        "title": req.files.banner.name,
                        "name": $newName,
                        "extension": $ext,
                        "size": req.files.banner.size,
                        "type": 4, //for media type video_stream
                        "user_id": 3, //for userid get it from session req.session.user.id
                      }
                    
                    
                      db.query('INSERT INTO media SET ?', data, function (error, results, fields) {
                        if (error) {
                          res.send({
                            "code": 400,
                            "type": "error",
                            "failed": "Uploading failed",
                            "message": error
                          })
                        } else {
                          res.send({
                            "code": 200,
                            "type": "success",
                            "message": "Media added"
                          });
                        }
                    });
                });
            }
        }
    }    
});

module.exports =  router;