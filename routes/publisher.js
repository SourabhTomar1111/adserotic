const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../config/db");
const {
  isAuthenticated,
  isPublisher,
} = require("../middleware/Authentication");
const transaction = require("../models/transaction.modal");
const userdata = require("../models/users.model");
const { check, validationResult } = require("express-validator");
const { cb } = require("../validations/validator");

router.get("/", function (req, res, next) {
  res.send("testing");
  // res.redirect('/publisher/dashboard');
});
// router.get('/dashboard',[isAuthenticated], function(req, res, next){
router.get("/dashboard", [isPublisher], function (req, res, next) {
  res.render("publisher/index", { page: "dashboard", session: req.session });
});

router.get(
  "/change_password",
  [isAuthenticated],
  [isPublisher],
  function (req, res, next) {
    res.render("publisher/index", {
      page: "change_password",
      session: req.session,
    });
  }
);
router.post(
  "/change_password",
  [isAuthenticated],
  [isPublisher],
  [cb.validateOPassword, cb.validateNPassword, cb.validateCOPassword],
  async function (req, res, next) {
    const id = req.session.user.id;
    const passWd = await userdata.getUserData(id);
    const passwordInput = passWd[0].password;
    const password = req.body.olderpassword;
    const isMatch = await bcrypt.compare(password, passwordInput);
    const saltRounds = 10;
    const newpassword = req.body.newpassword;
    const confirmpassword = req.body.confirmpassword;
    const encryptednewpassword = await bcrypt.hash(confirmpassword, saltRounds);
    let str_msg = "";
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let err_msg = "";
      if (errors.mapped()) {
        err_msg = errors.mapped();
      }

      for (let key in err_msg) {
        str_msg += err_msg[key].msg + ", ";
      }
      // str_msg += "is required";

      req.flash("error", str_msg);

      res.redirect("/publisher/change_password");
      res.end();
    } else {
      if (isMatch && newpassword == confirmpassword) {
        db.query(
          `UPDATE users SET password='${encryptednewpassword}' WHERE id='${id}'`,
          function (error, results, fields) {
            if (error) {
              req.flash("error", "Error occurred. : " + error);
              res.redirect("/publisher/change_password");
              res.end();
            } else {
              req.flash("info", "PASSWORD UPDATED SUCCESSFULLY !");
              res.redirect("/publisher/change_password");
              res.end();
            }
          }
        );
      } else {
        req.flash("info", "PASSWORD UPDATE FAILED!");
        res.redirect("/publisher/change_password");
        res.end();
      }
    }
  }
);

router.get(
  "/transaction",
  [isAuthenticated],
  [isPublisher],
  async function (req, res, next) {
    const tbl_transaction = await transaction.list_publisher({
      user_id: req.session.user.id,
    });
    res.render("publisher/index", {
      page: "trasnaction",
      session: req.session,
      tbl_transaction,
    });
  }
);

module.exports = router;
