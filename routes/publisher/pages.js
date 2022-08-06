const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const {
  isAuthenticated,
  isPublisher,
} = require("../../middleware/Authentication");

const pageModel = require('../../models/page.model');

router.get(
  "/pages/getAll",
  [isAuthenticated],
  [isPublisher],
  async function (req, res, next) {

    results = await pageModel.getUserPagesDT({user_id: req.session.user.id});
   console.log(results)
    //  //all is well 
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
        message: 'Pages not found.',
        data: []
      }
      //email not exists in db 
      res.json(data);
      res.end();
    }
  }
);


router.post('/pages/delete', [check('id', 'ID is required')
  .not().isEmpty()], async function (req, res, next) {

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

    let id = req.body.id;

    let deleted = await pageModel.delete(id);
      if (deleted) {
        res.json({
          "code": 200,
          "status": "success",
          "message": "Page deleted successfully"
        });
        return;
      } else {
       
        res.json({ "code": 400,  "status": "error", "message": "Failed in delete" });
        res.end();
        return;

      }
    

  });



router.get(
  "/pages",
  [isAuthenticated],
  [isPublisher],
  function (req, res, next) {
    res.render("publisher/index", { page: "list_pages", session: req.session });
  }
);

router.get(
  "/pages/add_new",
  [isAuthenticated],
  [isPublisher],
  function (req, res, next) {
    res.render("publisher/index", { page: "add_page", session: req.session });
  }
);

router.post(
  "/pages/add_new",
  [isAuthenticated],
  [isPublisher],
  check("url", "URL is required").notEmpty(),
  check("description", "Description is required").notEmpty(),
  check("category", "Category is required").notEmpty(),
  check("state", "State is required").notEmpty(),
  check("price", "Price is required").notEmpty(),

  
  async function (req, res) {
    let str_msg = '';
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let err_msg = '';
      if (errors.mapped()) {
        err_msg = errors.mapped();
      }
      for (let key in err_msg) {
        str_msg += err_msg[key].msg + ", ";
      }

      req.flash("warning", str_msg);
      res.render("publisher/index", { page: "add_page", session: req.session  });
      res.end();
      return;
    }


    //add to database
    let currentUserID = req.session.user.id;
   
    let pageData = {
      user_id: currentUserID,
      url: req.body.url,
      description: req.body.description,
      category: req.body.category,
      state: req.body.state,
      price : req.body.price
    };

    inserted = await pageModel.create(pageData);

    if (inserted) {
      req.flash("info", "Page added successfully");
      res.redirect("/pages");
    } else {
      req.flash("warning", "Failed in added");
      res.render("publisher/index", { page: "page", session: req.session  });
    }
     
  }
);

module.exports = router;
