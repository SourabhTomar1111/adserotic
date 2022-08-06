var express = require("express");
var router = express.Router();
const connection = require("../config/db2");
const { validationResult } = require("express-validator");
const { getUserData } = require("../models/users.model");
const { isAuthenticated , isAdvertiser} = require("../middleware/Authentication");
const { cb } = require("../validations/validator");

/* GET users listing. */
router.get("/profile", [isAuthenticated], async function (req, res, next) {
  const uData = await getUserData(req.session.user.id);
  res.render("advertiser/index", {
    page: "profile",
    user: uData[0],
    session: req.session,
  });
});


router.post(
  "/profile/",
  [isAuthenticated],
  [
    cb.validateCompanyName,
    cb.validateFirstname,
    cb.validateLastname,
    cb.validateNationality,
    cb.validateCountry,
    cb.validateCurrency,
  ],
  async function (req, res, next) {
    const id = req.session.user.id;
    const {
      firstname,
      lastname,
      country,
      nationality,
      currency,
      skype_id,
      company_name,
    } = req.body;
    let str_msg = '';
    const errors = validationResult(eq);
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
      res.redirect("/user/profile");
      res.end();
    } else {

      if (id) {
        const sql =
          "UPDATE users SET `firstname`=?, `lastname`=?, `country`=?, `nationality`=?, `currency`=?, `skype_id`=?, `company_name`=? WHERE `id`=? ";

        let [rows] = await connection.query(sql, [
          firstname,
          lastname,
          country,
          nationality,
          currency,
          skype_id,
          company_name,
          id,
        ]);

        if (rows.affectedRows) {
          req.flash("info", "Profile update successfully");
          res.redirect("/user/profile");
          res.end();
          
        }
      } else {
        req.flash("error", "Unauthorized user");
        res.end();
      }
    }
  }
);
module.exports = router;

