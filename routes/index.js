var express = require("express");
var router = express.Router();
const { dashboardRedirect } = require("../middleware/Authentication");
const db = require("../config/db");
const { check, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const { cb } = require("../validations/validator");
const user = require("../models/users.model");
const bcrypt = require("bcryptjs");
require('dotenv')
// var countryList = require('../rawdata/country.json')
// console.log(countryList);

/* GET Home listing. */
router.get("/", function (req, res, next) {
  res.render("web/index", { page: "home", session: req.session });
});

//================================== about page call ===================================================

router.get("/about", function (req, res, next) {
  res.render("web/index", { page: "about", session: req.session });
});

//================================== publishers page call ===================================================

router.get("/publishers", function (req, res, next) {
  res.render("web/index", { page: "publishers", session: req.session });
});

//================================== advertisers page call ===================================================

router.get("/advertisers", function (req, res, next) {
  res.render("web/index", { page: "advertisers", session: req.session });
});

//================================== faq call ===================================================

router.get("/faq", function (req, res, next) {
  res.render("web/index", { page: "faq", session: req.session });
});

//================================== contact page call ===================================================

router.get("/contact", function (req, res, next) {
  res.render("web/index", { page: "contactus", session: req.session });
});


//================================== nodemailer for sending mail  ==================================
let smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});


//================================== contact api ===================================================


router.post(
  "/contact",
  [cb.validateName, cb.validateMessage, cb.validateEmailValidation],
  async function (req, res, next) {
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
      res.redirect("/contact");
      res.end();
    } else {
      let users = {
        name: req.body.name,
        email: req.body.email,
        user: req.body.user,
        message: req.body.message,
      };

      db.query(
        "INSERT INTO contact_info SET ?",
        users,
        function (error, results, fields) {
          if (error) {
            res.json({ code: 400, error: error });
            res.end();
            return;
          } else {
            res.render("web/index", {
              page: "contactus",
              session: req.session,
            });
            res.end();
            var mailOptions = {
              from:  process.env.NODEMAILER_EMAIL,
              to: req.body.email,
              subject: "contact info by user",
              html: "Your contact info added successfully_" + req.body.name,
            };
            smtpTransport.sendMail(mailOptions, function (error, response) {
              if (error) {
                console.log(error);
                res.end("error");
              } else {
                res.end("sent");
              }
            });
          }
        }
      );
    }
  }
);

//================================== login page call ===================================================

router.get("/login", [dashboardRedirect], function (req, res, next) {
  res.render("web/index", { page: "login", session: req.session });
});


//================================== forgot password api ===================================================


router.get("/forgotpassword", function (req, res, next) {
  res.render("web/index", {
    page: "forgotpassword",
    session: req.session,
  });
});

router.post(
  "/forgotpassword",
  [cb.validateEmailValidation],
  async function (req, res, next) {
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
      req.flash("error", str_msg);
      res.redirect("/forgotpassword");
      res.end();
    } else {
      const email = req.body.email;
      db.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        async function (error, result, fields) {
          if (error) {
            req.flash("error", "Error in db." + error);
            res.redirect("/forgotpassword");
          }
          if (result.length > 0) {
            const rand = Math.floor(Math.random() * 10000 + 54);
            db.query(
              'Update users set verification_code="' +
                rand +
                '" WHERE email="' +
                req.body.email +
                '"'
            );
            var mailOptions = {
              from: process.env.NODEMAILER_EMAIL,
              to: req.body.email,
              subject: "New OTP to reset your account password",
              html:
                "Hello,<br> This is the otp to forget your account password.<br> OTP - " +
                rand,
            };
            smtpTransport.sendMail(mailOptions, function (error, response) {
              if (error) {
                console.log(error);
                res.end("error");
              } else {
                req.flash(
                  "info",
                  "Otp send on your register email id.!"
                );
                res.redirect("/resetpassword");
                return;
              }
            });
          } else {
            req.flash("error", "User Not found with this Email Id");
            res.redirect("/forgotpassword");
            res.end();
            return;
          }
        }
      );
    }
  }
);




//================================== reset password api ===================================================
router.get("/resetpassword", function (req, res, next) {
  res.render("web/index", {
    page: "resetpassword",
    session: req.session,
  });
})


router.post(
  "/resetpassword",
  [cb.validateOtp, cb.validateEmailValidation],
  async function (req, res, next) {
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

      req.flash("error", str_msg);
      res.redirect("/resetpassword");
      res.end();
    } else {
      const email = req.body.email;
      const verification_code = req.body.verification_code;
      db.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        async function (error, result, fields) {
          if (error) {
            req.flash("error", "Error in db." + error);
            res.redirect("/resetpassword");
          } else if (result.length > 0) {
            db.query(
              "SELECT * FROM users WHERE email=? And verification_code = ?",
              [email, verification_code],
              async function (error, result, field) {
                if (error) {
                  req.flash("error", "Error in db." + error);
                  res.redirect("/resetpassword");
                } else if (result.length > 0) {
                  const newpass = Math.floor(Math.random() * 100000000); //'25893968';
                  const password = bcrypt.hashSync(String(newpass), 6);

                  db.query(
                    'Update users set password="' +
                      password +
                      '" WHERE email="' +
                      req.body.email +
                      '"'
                  );
                  var mailOptions = {
                    from: process.env.NODEMAILER_EMAIL,
                    to: req.body.email,
                    subject: "New OTP to reset your account password",
                    html:
                      "Hello,<br> This is the passowrd to login account .<br> PASSWORD - " +
                      newpass,
                  };
                  smtpTransport.sendMail(
                    mailOptions,
                    function (error, response) {
                      if (error) {
                        console.log(error);
                        res.end("error");
                      } else {
                        req.flash(
                          "info",
                          "New password send on your register emaill id, Now you can login!"
                        );
                        res.redirect("/login");
                      }
                    }
                  );
                } else {
                  req.flash("error", "Otp is not match");
                  res.redirect("/resetpassword");
                  res.end();
                }
              }
            );
          } else {
            req.flash("error", "Email is not valid");
            res.redirect("/resetpassword");
            res.end();
          }
        }
      );
    }
  }
);



router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

//===================================== register page call =========================================

router.get("/register", [dashboardRedirect], function (req, res, next) {
  res.render("web/index", { page: "register", session: req.session });
});


router.get("/toast", function (req, res) {
  req.toastr.success("Successfully logged in.", "You're in!");
  res.render("web/index", {
    page: "home",
    session: req.session,
    reqsyt: "lllllllll",
  });
});

module.exports = router;
