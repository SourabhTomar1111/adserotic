const express = require("express");
const fs = require('fs');
const router = express.Router();
const db = require("../config/db");
const db2 = require("../config/db2");
const { check, validationResult } = require("express-validator");
const slug = require("slug");

//get all media
router.get("/getAll", function (req, res, next) {
  db.query(
    "SELECT id, title, name, extension, size FROM media ",
    (error, results, fields) => {
      if (error) {
        data = {
          status: 400,
          message: "Error db not responding.",
        };
        //   data = {...data, op};
        //email not exists in db
        res.json(data);
        res.end();
      }

      //all is well
      if (results.length > 0) {
        data = {
          status: 200,
          message: "Fetched...",
          data: results,
        };
        // data = {...data, op};
        res.json(data);
        res.end();
      } else {
        data = {
          status: 400,
          message: "No Record to Display.",
        };
        // data = {...data, op};
        //email not exists in db
        res.json(data);
        res.end();
      }
    }
  );
});

router.post("/addtest", function (req, res, next) {
  res.json(req.body);
});

router.get("/add", function (req, res, next) {
  res.send("custom routes");
});

router.get("/", function (req, res, next) {
  res.render("tt");
});

router.post("/upload", function (request, response) {
  var images = new Array();
  if (request.files) {
    var arr;
    if (Array.isArray(request.files.filesfld)) {
      arr = request.files.filesfld;
    } else {
      arr = new Array(1);
      arr[0] = request.files.filesfld;
    }
    for (var i = 0; i < arr.length; i++) {
      var file = arr[i];
      if (file.mimetype.substring(0, 5).toLowerCase() == "image") {
        images[i] = "/" + file.name;
        file.mv("./public/static" + images[i], function (err) {
          if (err) {
            console.log(err);
          }
        });
      }
    }
  }
  // give the server a second to write the files
  setTimeout(function () {
    response.json(images);
  }, 1000);
});

//for static banner router
router.post("/static_banner", function (req, res, next) {
  // res.json(req.files);
  var images = new Array();
  if (req.files) {
    var arr;
    if (Array.isArray(req.files.banner)) {
      arr = req.files.banner;
    } else {
      arr = new Array(1);
      arr[0] = req.files.banner;
    }
    for (var i = 0; i < arr.length; i++) {
      var file = arr[i];
      if (file.mimetype.substring(0, 5).toLowerCase() == "image") {
        let prefixImg = Date.now();
        images[i] = "/" + prefixImg + "_" + file.name;
        $newName = prefixImg + "_" + file.name;
        file.mv("./public/static_banner" + images[i], function (err) {
          if (err) {
            console.log(err);
          }

          $ext = "";
          if (file.name) {
            $name = file.name;
            $nm_arr = $name.split(".");
            $ext = $nm_arr[$nm_arr.length-1]; //return extension
          }

          //insert into database
          let data = {
            title: req.files.banner.name,
            name: $newName,
            extension: $ext,
            size: req.files.banner.size,
            type: 1, //for media type static_banner
            user_id: req.session.user.id,
            mimetype: file.mimetype
            // "user_id": 3, //for userid get it from session req.session.user.id
          };

          db.query(
            "INSERT INTO media SET ?",
            data,
            function (error, results, fields) {
              if (error) {
                res.send({
                  code: 400,
                  type: "error",
                  failed: "Uploading failed",
                  message: error,
                });
              } else {
                res.send({
                  code: 200,
                  type: "success",
                  message: "Media added",
                });
              }
            }
          );
        });
      }
    }
  }
});

//for overlay banner router
router.post("/overlay_banner", function (req, res, next) {
  // res.json(req.files);
  var images = new Array();
  if (req.files) {
    var arr;
    if (Array.isArray(req.files.banner)) {
      arr = req.files.banner;
    } else {
      arr = new Array(1);
      arr[0] = req.files.banner;
    }
    for (var i = 0; i < arr.length; i++) {
      var file = arr[i];
      if (file.mimetype.substring(0, 5).toLowerCase() == "image") {
        let prefixImg = Date.now();
        images[i] = "/" + prefixImg + "_" + file.name;
        $newName = prefixImg + "_" + file.name;
        file.mv("./public/overlay_banner" + images[i], function (err) {
          if (err) {
            console.log(err);
          }

          $ext = "";
          if (file.name) {
            $name = file.name;
            $nm_arr = $name.split(".");
            $ext = $nm_arr[$nm_arr.length-1]; //return extension
          }

          //insert into database
          let data = {
            title: req.files.banner.name,
            name: $newName,
            extension: $ext,
            size: req.files.banner.size,
            type: 2, //for media type overlay_banner
            user_id: req.session.user.id,
            mimetype: file.mimetype
            // "user_id": 3, //for userid get it from session req.session.user.id
          };

          db.query(
            "INSERT INTO media SET ?",
            data,
            function (error, results, fields) {
              if (error) {
                res.send({
                  code: 400,
                  type: "error",
                  failed: "Uploading failed",
                  message: error,
                });
              } else {
                res.send({
                  code: 200,
                  type: "success",
                  message: "Media added",
                });
              }
            }
          );
        });
      }
    }
  }
});

//for video banner router
router.post("/video_banner", function (req, res, next) {
  // res.json(req.files);
  var images = new Array();
  if (req.files) {
    var arr;
    if (Array.isArray(req.files.banner)) {
      arr = req.files.banner;
    } else {
      arr = new Array(1);
      arr[0] = req.files.banner;
    }
    // console.log(arr);
    for (var i = 0; i < arr.length; i++) {
      var file = arr[i];
      if (file.mimetype.substring(0, 5).toLowerCase() == "video") {
        let prefixImg = Date.now();
        images[i] = "/" + prefixImg + "_" + file.name;
        $newName = prefixImg + "_" + file.name;
        // console.log(file);
        file.mv("./public/video_banner" + images[i], function (err) {
          if (err) {
            console.log(err);
          }

          $ext = "";
          if (file.name) {
            $name = file.name;
            $nm_arr = $name.split(".");
            $ext = $nm_arr[$nm_arr.length-1]; //return extension
          }

          //insert into database
          let data = {
            title: req.files.banner.name,
            name: $newName,
            extension: $ext,
            size: req.files.banner.size,
            type: 3, //for media type video_banner
            user_id: req.session.user.id,
            mimetype: file.mimetype
            // "user_id": 3, //for userid get it from session req.session.user.id
          };

          db.query(
            "INSERT INTO media SET ?",
            data,
            function (error, results, fields) {
              if (error) {
                res.send({
                  code: 400,
                  type: "error",
                  failed: "Uploading failed",
                  message: error,
                });
              } else {
                res.send({
                  code: 200,
                  type: "success",
                  message: "Media added",
                });
              }
            }
          );
        });
      }
    }
  }
});

//for video stream router
router.post("/video_stream", function (req, res, next) {
  // res.json(req.files);
  var images = new Array();
  if (req.files) {
    var arr;
    if (Array.isArray(req.files.banner)) {
      arr = req.files.banner;
    } else {
      arr = new Array(1);
      arr[0] = req.files.banner;
    }
    for (var i = 0; i < arr.length; i++) {
      var file = arr[i];
      if (file.mimetype.substring(0, 5).toLowerCase() == "video") {
        let prefixImg = Date.now();
        images[i] = "/" + prefixImg + "_" + file.name;
        $newName = prefixImg + "_" + file.name;
        file.mv("./public/video_stream" + images[i], function (err) {
          if (err) {
            console.log(err);
          }

          $ext = "";
          if (file.name) {
            $name = file.name;
            $nm_arr = $name.split(".");
            $ext = $nm_arr[$nm_arr.length-1]; //return extension
          }

          //insert into database
          let data = {
            title: req.files.banner.name,
            name: $newName,
            extension: $ext,
            size: req.files.banner.size,
            type: 4, //for media type video_stream
            user_id: req.session.user.id,
            mimetype: file.mimetype
            // "user_id": 3, //for userid get it from session req.session.user.id
          };

          db.query(
            "INSERT INTO media SET ?",
            data,
            function (error, results, fields) {
              if (error) {
                res.send({
                  code: 400,
                  type: "error",
                  failed: "Uploading failed",
                  message: error,
                });
              } else {
                res.send({
                  code: 200,
                  type: "success",
                  message: "Media added",
                });
              }
            }
          );
        });
      }
    }
  }
});

router.get("/getAllStaticBanner", function (req, res, next) {
  let currentUserID = req.session.user.id;
  // let currentUserID = 3;
  let type = 1; // for overlay_banner
  db.query(
    "SELECT id, title, name, extension, size FROM media WHERE user_id=? and type=? ",
    [currentUserID, type],
    (error, results, fields) => {
      if (error) {
        data = {
          status: 400,
          message: "Error db not responding.",
        };
        //   data = {...data, op};
        //email not exists in db
        res.json(data);
        res.end();
        return;
      }

      //all is well
      if (results.length > 0) {
        data = {
          code: 200,
          status: "success",
          message: "Fetched...",
          data: results,
        };
        // data = {...data, op};
        res.json(data);
        res.end();
        return;
      } else {
        data = {
          status: 400,
          message: "No Record to Display.",
          data: [],
        };
        // data = {...data, op};
        //email not exists in db
        res.json(data);
        res.end();
        return;
      }
    }
  );
});
router.get("/getAllOverlayBanner", function (req, res, next) {
  let currentUserID = req.session.user.id;
  // let currentUserID = 3;
  let type = 2; // for overlay_banner
  db.query(
    "SELECT id, title, name, extension, size FROM media WHERE user_id=? and type=? ",
    [currentUserID, type],
    (error, results, fields) => {
      if (error) {
        data = {
          status: 400,
          message: "Error db not responding.",
        };
        //   data = {...data, op};
        //email not exists in db
        res.json(data);
        res.end();
        return;
      }

      //all is well
      if (results.length > 0) {
        data = {
          code: 200,
          status: "success",
          message: "Fetched...",
          data: results,
        };
        // data = {...data, op};
        res.json(data);
        res.end();
        return;
      } else {
        data = {
          status: 400,
          message: "No Record to Display.",
          data: [],
        };
        // data = {...data, op};
        //email not exists in db
        res.json(data);
        res.end();
        return;
      }
    }
  );
});
router.get("/getAllVideoBanner", function (req, res, next) {
  let currentUserID = req.session.user.id;
  // let currentUserID = 3;
  let type = 3; // for overlay_banner
  db.query(
    "SELECT id, title, name, extension, size FROM media WHERE user_id=? AND type=? ",
    [currentUserID, type],
    (error, results, fields) => {
      if (error) {
        data = {
          status: 400,
          message: "Error db not responding.",
        };
        //   data = {...data, op};
        //email not exists in db
        res.json(data);
        res.end();
        return;
      }

      //all is well
      if (results.length > 0) {
        data = {
          code: 200,
          status: "success",
          message: "Fetched...",
          data: results,
        };
        // data = {...data, op};
        res.json(data);
        res.end();
        return;
      } else {
        data = {
          status: 400,
          message: "No Record to Display.",
          data: [],
        };
        // data = {...data, op};
        //email not exists in db
        res.json(data);
        res.end();
        return;
      }
    }
  );
});
router.get("/getAllVideoStream", function (req, res, next) {
  let currentUserID = req.session.user.id;
  // let currentUserID = 3;
  let type = 4; // for overlay_banner
  db.query(
    "SELECT id, title, name, extension, size FROM media WHERE user_id=? AND type=? ",
    [currentUserID, type],
    (error, results, fields) => {
      if (error) {
        data = {
          status: 400,
          message: "Error db not responding.",
        };
        //   data = {...data, op};
        //email not exists in db
        res.json(data);
        res.end();
        return;
      }

      //all is well
      if (results.length > 0) {
        data = {
          code: 200,
          status: "success",
          message: "Fetched...",
          data: results,
        };
        // data = {...data, op};
        res.json(data);
        res.end();
        return;
      } else {
        data = {
          status: 400,
          message: "No Record to Display.",
          data: [],
        };
        // data = {...data, op};
        //email not exists in db
        res.json(data);
        res.end();
        return;
      }
    }
  );
});
router.get("/getAllRejected", function (req, res, next) {
  let currentUserID = req.session.user.id;
  // let currentUserID = 3;
  let status = 3; // for overlay_banner
  db.query(
    "SELECT id, title, name, extension, size FROM media WHERE user_id=? and status=? ",
    [currentUserID, status],
    (error, results, fields) => {
      if (error) {
        data = {
          status: 400,
          message: "Error db not responding.",
        };
        //   data = {...data, op};
        //email not exists in db
        res.json(data);
        res.end();
        return;
      }

      //all is well
      if (results.length > 0) {
        data = {
          code: 200,
          status: "success",
          message: "Fetched...",
          data: results,
        };
        // data = {...data, op};
        res.json(data);
        res.end();
        return;
      } else {
        data = {
          status: 400,
          message: "No Record to Display.",
          data: [],
        };
        // data = {...data, op};
        //email not exists in db
        res.json(data);
        res.end();
        return;
      }
    }
  );
});

router.delete("/delete", async function (req, res) {
  
  if (req.body.id) {
    let id = req.body.id;
    let [rows] = await db2.query(
      "SELECT * FROM media WHERE id=? ",
      id
    );

    if (rows.length) {
        //check for file exists
        let dirPath = '';
        let type = rows[0].type;
       switch(type){
          case 1:
          dirPath='public/static_banner';
          break;
          case 2:
          dirPath='public/overlay_banner';
          break;
          case 3:
          dirPath='public/video_banner';
          break;
          case 4:
          dirPath='public/video_stream';
          break;
        }
        // console.log(dirPath);
        let pathToFile = dirPath + '/' +rows[0].name;
        let f_found = false;
        let f_delete = false;
        
        //check for file exists or not
        fs.access(pathToFile, fs.F_OK, (err) => {
          if (err) {
            // console.error('Exists:',err)
            // return
          }else{        
            //file exists
            f_found = true;
            // console.log('file exists');
            fs.unlink(pathToFile, function(err) {
              if (err) {
                // console.error(err)
              } else {
                f_delete = true;
              }
            })
          }


        })

        //delete from db
        let [data] = await db2.query("DELETE FROM `media` WHERE id=? ", id );
        
        if (data.affectedRows) {
          let data1 = {
            code: 200,
            message: "Deleted successfully.",
            file_found: f_found,
            file_delete: f_delete,
          };
          res.json(data1);
          return;

        }
    }
    res.json(rows);
  }
});

router.post("/show", async function (req, res) {
  let pathToFile = '';
  let viewHTML = '';
  if (req.body.id) {
    let id = req.body.id;
    let [rows] = await db2.query(
      "SELECT * FROM media WHERE id=? ",
      id
    );

    if (rows.length) {
         //check for file exists
         let dirPath = '';         
         let type = rows[0].type;
        switch(type){
           case 1:
           dirPath='/public/static_banner';
           pathToFile = dirPath + '/' +rows[0].name;
           viewHTML='<div class="view-holder"><img class="" src="'+pathToFile+'" width="100%" /></div>';

           break;
           case 2:
           dirPath='/public/overlay_banner';
           pathToFile = dirPath + '/' +rows[0].name;
           viewHTML='<div class="view-holder"><img class="" src="'+pathToFile+'" width="100%"/></div>';
           break;
           case 3:
           dirPath='/public/video_banner';
           pathToFile = dirPath + '/' +rows[0].name;
          //  viewHTML='<div class="view-holder"><video width="320" height="240" controls muted><source src="'+pathToFile+'" type="'+rows[0].mimetype+'"></video></div>';
           viewHTML='<div class="view-holder"><object data="'+pathToFile+'" width="360" height="250"> <param name="src" value="'+pathToFile+'" /><embed type="'+rows[0].mimetype+'" src="'+pathToFile+'" width="360" height="250"></embed> </object></div>';
           break;
           case 4:
           dirPath='/public/video_stream';
           pathToFile = dirPath + '/' +rows[0].name;
           viewHTML='<div class="view-holder"><video width="320" height="240" controls muted><source src="'+pathToFile+'" type="'+rows[0].mimetype+'"></video></div>';
           break;
         }
         // console.log(dirPath);
         
    }
  }
  let output = {
    code: 200,
    data: viewHTML
  }
  res.json(output);
});

module.exports = router;
