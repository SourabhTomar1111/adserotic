var express = require("express");
var router = express.Router();
const connection = require("../config/db2");
const { validationResult } = require("express-validator");
const { getUserData } = require("../models/users.model");
const { isAuthenticated , isPublisher} = require("../middleware/Authentication");
const { cb } = require("../validations/validator");

router.get(
    "/pprofile",
    [isAuthenticated],
    [isPublisher],
    async  function (req, res, next) {
      const uData = await getUserData(req.session.user.id);
      res.render("publisher/index", { 
        page: "pprofile", 
        user: uData[0],
        session: req.session });
    }
  );
  

router.post(
    "/pprofile",
    [isAuthenticated],
     [isPublisher],
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
        res.redirect("/publisherUser/pprofile");
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
            req.flash("info", "pProfile update successfully");
            res.redirect("/publisherUser/pprofile");
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