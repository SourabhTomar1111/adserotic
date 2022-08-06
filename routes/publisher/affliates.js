const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const {
  isAuthenticated,
  isPublisher,
} = require("../../middleware/Authentication");

const pageModel = require('../../models/page.model');

router.get(
  "/affiliate/refferal",
  [isAuthenticated],
  [isPublisher],
  function (req, res, next) {
    res.render("publisher/index", { page: "refferal_program", session: req.session });
  }
);

router.get(
  "/affiliate/stats",
  [isAuthenticated],
  [isPublisher],
  function (req, res, next) {
    res.render("publisher/index", { page: "refferal_statics", session: req.session });
  }
);


module.exports = router;
