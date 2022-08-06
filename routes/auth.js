const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const { check, body, validationResult } = require("express-validator");
const { cb } = require("../validations/validator");

// db.query('SELECT 1', function (error, results, fields) {
//     if (error) throw error;
//     // connected!
//     console.log(results);
//   });

//get all routes
router.post(
  "/publisher_A",
  [
    // validateUsername,
    check("company_name")
      .not()
      .isEmpty()
      .withMessage("Company name is required"),
    check("p_password").not().isEmpty().withMessage("Password is required"),
    check("p_c_password")
      .not()
      .isEmpty()
      .withMessage("Confirm password is required"),
    check("firstname").not().isEmpty().withMessage("Firstname is required"),
    check("lastname").not().isEmpty().withMessage("Lastname is required"),
    // validateEmail,
    check("c_email").not().isEmpty().withMessage("Confirm email is required"),
    check("nationality").not().isEmpty().withMessage("Nationality is required"),
    check("country").not().isEmpty().withMessage("Country is required"),
    check("currency").not().isEmpty().withMessage("Currency is required"),
  ],
  async function (req, res, next) {
    // console.log(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let err_msg = "";
      console.log(errors.mapped().email);

      if (errors.mapped().email) {
        err_msg = errors.mapped().email.msg;
      }
      if (errors.mapped().username) {
        err_msg = errors.mapped().username.msg;
      }

      // req.flash('warning', JSON.stringify(errors));
      req.flash("warning", err_msg);
      res.redirect("/register");
      res.end();
      return;
    }

    // //everthing is ok here
    // const result = await db.query(
    //     `INSERT INTO users
    //     (username, firstname, lastname, email, password, country, nationality, currency, skype_id, company_name, user_type, status)
    //     VALUES
    //     (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    //     [
    //       req.body.username,
    //       req.body.firstname,
    //       req.body.lastname,
    //       req.body.email,
    //       req.body.password,
    //       req.body.country,
    //       req.body.nationality,
    //       req.body.currency,
    //       req.body.skype,
    //       req.body.company_name,
    //       2,
    //       1
    //     ]
    //   );

    const saltRounds = 10;
    const password = req.body.password;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    let users = {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: encryptedPassword,
      verfication_code: 1,
      user_type: 2, //for publisher
      country: req.body.country,
      nationality: req.body.nationality,
      currency: req.body.currency,
      skype_id: req.body.skype,
      company_name: req.body.company_name,
      status: 1,
    };

    db.query(
      "INSERT INTO users SET ?",
      users,
      function (error, results, fields) {
        if (error) {
          // res.send({
          //   "code": 400,
          //   "failed": "error occurred",
          //   "error": error
          // })
          req.flash("error", "Error occurred. : " + error);
          res.redirect("/register");
        } else {
          // res.send({
          //   "code": 200,
          //   "success": "user registered sucessfully"
          // });
          req.flash(
            "info",
            "You are registered successfully with us. Now you can login !"
          );
          res.redirect("/login");
        }
      }
    );
  }
);

//get all routes
router.post(
  "/advertiser_A",
  [
    // validateUsername,
    check("company_name")
      .not()
      .isEmpty()
      .withMessage("Company name is required"),
    check("a_password").not().isEmpty().withMessage("Password is required"),
    check("a_c_password")
      .not()
      .isEmpty()
      .withMessage("Confirm password is required"),
    check("firstname").not().isEmpty().withMessage("Firstname is required"),
    check("lastname").not().isEmpty().withMessage("Lastname is required"),
    // validateEmail,
    check("c_email").not().isEmpty().withMessage("Confirm email is required"),
    check("nationality").not().isEmpty().withMessage("Nationality is required"),
    check("country").not().isEmpty().withMessage("Country is required"),
    check("currency").not().isEmpty().withMessage("Currency is required"),
  ],
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("warning", "Validation errors");
      res.redirect("/register");
      res.end();
      return;
    }

    // //everthing is ok here
    // const result = await db.query(
    //   `INSERT INTO users
    //       (username, firstname, lastname, email, password, country, nationality, currency, skype_id, company_name, user_type, status)
    //       VALUES
    //       (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    //   [
    //     req.body.username,
    //     req.body.firstname,
    //     req.body.lastname,
    //     req.body.email,
    //     req.body.password,
    //     req.body.country,
    //     req.body.nationality,
    //     req.body.currency,
    //     req.body.skype,
    //     req.body.company_name,
    //     3,
    //     1
    //   ]
    // );

    // req.flash('info', 'You are registered successfully with us. Now you can login !');
    // res.redirect('/login');

    const saltRounds = 10;
    const password = req.body.password;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    let users = {
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: encryptedPassword,
      user_type: 3, //for advertiser
      country: req.body.country,
      nationality: req.body.nationality,
      currency: req.body.currency,
      skype_id: req.body.skype,
      company_name: req.body.company_name,
      status: 1,
    };

    db.query(
      "INSERT INTO users SET ?",
      users,
      function (error, results, fields) {
        if (error) {
          // res.send({
          //   "code": 400,
          //   "failed": "error occurred",
          //   "error": error
          // })
          req.flash("error", "Error occurred. : " + error);
          res.redirect("/register");
        } else {
          // res.send({
          //   "code": 200,
          //   "success": "user registered sucessfully"
          // });
          req.flash(
            "info",
            "You are registered successfully with us. Now you can login !"
          );
          res.redirect("/login");
        }
      }
    );
  }
);

// router.post('/login',
// [
//     check('email', 'Email length should be 10 to 30 characters')
//                     .isEmail().isLength({ min: 10, max: 30 }),
//     check('password', 'Password length should be 8 to 10 characters')
//                     .isLength({ min: 8, max: 10 })
// ],
// function(req, res, next){
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//     //   return res.status(400).json({ errors: errors.array() });

//         res.json(errors)

//     }

//     res.send(body);

//     //everthing is ok here
//     // const result = await db.query(
//     //     `INSERT INTO users
//     //     (username, firstname, lastname, email, password, country, nationality, currency, skype_id, company_name, user_type, status)
//     //     VALUES
//     //     (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//     //     [
//     //       req.body.username,
//     //       req.body.firstname,
//     //       req.body.lastname,
//     //       req.body.email,
//     //       req.body.password,
//     //       req.body.country,
//     //       req.body.nationality,
//     //       req.body.currency,
//     //       req.body.skype,
//     //       req.body.company_name,
//     //       3,
//     //       1
//     //     ]
//     //   );

//     //   if (result.affectedRows) {
//     //     message = 'Programming language created successfully';
//     //   }

//     // req.flash('info', 'You are loggedin successfully!');
//     // res.redirect('/');
// })

router.post(
  "/login",
  [
    check("email", "Email is required")
      .isEmail()
      .isLength({ min: 10, max: 30 }),
    check("password", "Password is required").isLength({ min: 4, max: 30 }),
  ],
  async function (req, res, next) {
    // res.send(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash("warning", "Validation errors");
      res.redirect("/login");
      return;
    }

    // const sql = `SELECT * FROM users WHERE email='${req.body.email}' AND password= '${req.body.password}' LIMIT 1`;
    const email = req.body.email;
    // const status = 1
    db.query(
      "SELECT * FROM users WHERE email=? ",
      [email],
      async (error, results, fields) => {
        if (error) {
          req.flash("error", "Error in db." + error);
          res.redirect("/login");
        }

        if (results.length > 0) {
          const password = req.body.password;
          const comparison = await bcrypt.compare(
            password,
            results[0].password
          );
          if (results[0].status === 0) {
            req.flash("warning", "You are block by admin");
            res.redirect("/login");
          } else {
            if (comparison) {
              //Login successful redirect to dashboard

              //create user session
              session = req.session;
              session.loggedIn = true;
              session.user = {
                id: results[0].id,
                firstname: results[0].firstname,
                lastname: results[0].lastname,
                username: results[0].username,
                user_role: results[0].user_type,
                email: results[0].email,
                currency: results[0].currency,
              };

              // console.log(req.session)

              req.flash("success", "Login successfully redirecting");

              if (results[0].user_type == 2) {
                res.redirect("/publisher/dashboard");
              } else if (results[0].user_type == 3) {
                res.redirect("/advertiser/dashboard");
              } else {
                res.redirect("/");
              }
            } else {
              //password not matched
              req.flash("warning", "Invalid Password");
              res.redirect("/login");
            }
          }
        } else {
          req.flash("warning", "Invalid Email");
          res.redirect(
            "/login" //email not exists in db
          );
          res.end();
        }
      }
    );
  }
);

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.end();
  res.redirect("/");
});

router.post(
  "/test",
  [
    // validateUsername,
    check("company_name")
      .not()
      .isEmpty()
      .withMessage("Company name is required"),
    check("p_password").not().isEmpty().withMessage("Password is required"),
    check("p_c_password")
      .not()
      .isEmpty()
      .withMessage("Confirm password is required"),
    check("firstname").not().isEmpty().withMessage("Firstname is required"),
    check("lastname").not().isEmpty().withMessage("Lastname is required"),
    // validateEmail,
    check("c_email").not().isEmpty().withMessage("Confirm email is required"),
    check("nationality").not().isEmpty().withMessage("Nationality is required"),
    check("country").not().isEmpty().withMessage("Country is required"),
    check("currency").not().isEmpty().withMessage("Currency is required"),
    // check('firstname').not().isEmpty().trim().escape(),
    // check('lastname').not().isEmpty().trim().escape(),
  ],
  async function (req, res, next) {
    // console.log(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let err_msg = "";
      if (errors.mapped()) {
        err_msg = errors.mapped();
      }
      res.json({ code: 400, error: errors });
    } else {
      //everything is ok here

      res.json({ code: 200, message: "everthing is ok here" });
    }
  }
);

/****************************************************/

//get all routes
router.post(
  "/publisher",
  [
    cb.validateUsername,
    cb.validateCompanyName,
    cb.validatePassword,
    cb.validateCPassword,
    cb.validateFirstname,
    cb.validateLastname,
    cb.validateEmail,
    cb.validateCemail,
    cb.validateNationality,
    cb.validateCountry,
    cb.validateCurrency,
  ],
  async function (req, res, next) {
    // console.log(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let err_msg = "";
      if (errors.mapped()) {
        err_msg = errors.mapped();
      }
      res.json({ code: 400, error: errors });
      res.end();
      return;
    } else {
      const saltRounds = 10;
      const password = req.body.p_password;
      const encryptedPassword = await bcrypt.hash(password, saltRounds);
      let users = {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: encryptedPassword,
        user_type: 2, //for publisher
        country: req.body.country,
        nationality: req.body.nationality,
        currency: req.body.currency,
        skype_id: req.body.skype,
        company_name: req.body.company_name,
        status: 1,
      };

      db.query(
        "INSERT INTO users SET ?",
        users,
        function (error, results, fields) {
          if (error) {
            res.json({ code: 400, error: error });
            res.end();
            return;
          } else {
            res.json({
              code: 200,
              message: "You are registered successfully. Now you can login!",
              redirect: "/login",
            });
            res.end();
            return;
          }
        }
      );
    }
  }
);

//get all routes
router.post(
  "/advertiser",
  [
    cb.validateUsername,
    cb.validateCompanyName,
    cb.validateADVPassword,
    cb.validateADVCPassword,
    cb.validateFirstname,
    cb.validateLastname,
    cb.validateEmail,
    cb.validateCemail,
    cb.validateNationality,
    cb.validateCountry,
    cb.validateCurrency,
  ],
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let err_msg = "";
      if (errors.mapped()) {
        err_msg = errors.mapped();
      }
      res.json({ code: 400, error: errors });
      res.end();
      return;
    } else {
      const saltRounds = 10;
      const password = req.body.a_password;
      const encryptedPassword = await bcrypt.hash(password, saltRounds);
      let users = {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: encryptedPassword,
        user_type: 3, //for advertiser
        country: req.body.country,
        nationality: req.body.nationality,
        currency: req.body.currency,
        skype_id: req.body.skype,
        company_name: req.body.company_name,
        status: 1,
      };

      db.query(
        "INSERT INTO users SET ?",
        users,
        function (error, results, fields) {
          if (error) {
            res.json({ code: 400, error: error });
            res.end();
            return;
          } else {
            res.json({
              code: 200,
              message: "You are registered successfully. Now you can login!",
              redirect: "/login",
            });
            res.end();
            return;
          }
        }
      );
    }
  }
);

module.exports = router;
