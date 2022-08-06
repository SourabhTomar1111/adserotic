const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { check, validationResult } = require('express-validator');
const slug = require('slug');

router.get('/getAll', function (req, res, next) {

  // let currentUserID = 2// get it from session req.session.user.id
  let currentUserID = req.session.user.id;

  // db.query(`SELECT id,title FROM labels WHERE user_id=${currentUserID} ORDER BY id desc`, (error, results, fields) => {
    // db.query('SELECT ROUND(@a:=@a+1,0) sr_num, id,title FROM (select @a:=0) initvars, labels WHERE user_id=? ORDER BY id desc',currentUserID, (error, results, fields) => {
  db.query('SELECT id,title FROM labels WHERE user_id=? ORDER BY id desc',currentUserID, (error, results, fields) => {

    if (error) {
      req.flash('error', 'Error in db.' + error);
      res.redirect('/login');

    }

    //all is well 
    if (results.length > 0) {
      let data = {
        status: 200,
        message: 'Fetched...',
        data: results
      }
      res.json(data);
      res.end();


    } else {

      let data = {
        status: 400,
        message: 'No Label found.',
        data: []
      }
      //email not exists in db 
      res.json(data);
      res.end();
    }
  });
})

router.post('/add_new', check('title', 'Title is required')
  .isLength({ min: 3 }), function (req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      return res.send({
        "code": 400,
        "status": "error",
        "message": "Title must be atleast > 3 length"
      })
    }

    let currentUserID = req.session.user.id;
    const addSlug = slug(req.body.title);
    let labelData = {
      "title": req.body.title,
      "slug": addSlug,
      "status": 1,
      "user_id": currentUserID
    }


    db.query('INSERT INTO labels SET ?', labelData, function (error, results, fields) {
      if (error) {
        res.send({
          "code": 400,
          "status": "error",
          "message": "db error occurred",
        })
      } else {
        res.send({
          "code": 200,
          "status": "success",
          "message": "Lable added successfully."
        });

      }
    });

  })


router.post('/delete', [check('id', 'ID is required')
  .not().isEmpty()], function (req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let err_msg = '';
      if (errors.mapped()) {
        err_msg = errors.mapped();
      }
      res.json({ 'code': 400, 'error': errors });
      res.end();
      return;
    }

    let labelID = req.body.id;

    db.query('DELETE FROM labels WHERE id= ?', labelID, function (error, results, fields) {
      if (error) {
        res.json({ 'code': 400, 'error': error });
        res.end();
        return;
      } else {
        res.json({
          "code": 200,
          "status": "success",
          "message": "Lable deleted successfully"
        });

      }
    });

  })


module.exports = router;