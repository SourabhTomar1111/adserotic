const express = require("express");
const bcrypt = require('bcryptjs');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../config/db");
const {
  isAuthenticated,
  isAdvertiser,
} = require("../middleware/Authentication");
const { cb } = require("../validations/validator");
const { getLocalDate } = require("../helpers/common");
const pageModel = require("../models/page.model");
const moment = require('moment')
//required models
const { list } = require("../models/lable.model");
const Group = require("../models/group.model");
const Keyword = require("../models/keyword.model");
const Camp = require("../models/campaign.model");
const camPage = require("../models/page.model");
const transaction = require("../models/transaction.modal");
const media = require('../models/medialibrary.modal')
const userdata = require('../models/users.model')
router.get("/", function (req, res, next) {
  res.redirect("/advertiser/dashboard");
});

// router.get('/dashboard', [isAuthenticated], function(req, res, next){
router.get(
  "/dashboard",
  [isAuthenticated],
  [isAdvertiser],
  function (req, res, next) {
    res.render("advertiser/index", { page: "dashboard", session: req.session });
  }
);

// router.get(
//   "/campaigns",
//   // [isAuthenticated],
//   // [isAdvertiser],
//   async function (req, res, next) {

//     //  campDataPage = await Camp.getUserPagesDT1();

//   //  console.log(campDataPage)
//   //   all is well
//     //  if (campDataPage.length > 0) {
//       const campData = await Camp.list1();
//       // console.log(campDataPage)
//       res.render("advertiser/index", { page: "add_campaigns", session: req.session, campData });
//       // res.json(campData);
//       res.end()

//  }
// );

router.get(
  "/campaigns",
  [isAuthenticated],
  [isAdvertiser],
  async function (req, res) {
   
    const campData = await Camp.list(req.session.user.id);
    res.render("advertiser/index", {
      page: "campaigns",
      session: req.session,
      campData,
    });
  }
);

// router.get(
//   "/campaigns",
//   [isAuthenticated],
//   [isAdvertiser],
//   async function (req, res) {

//    const campData = await Camp.list(req.session.user.id);

//     res.render("advertiser/index", { page: "campaigns", session: req.session, campData});
//   }
// );

// router.get(
//   "/campaigns",
//   [isAuthenticated],
//   [isAdvertiser],
//   // [isPublisher],

//   async function (req, res) {

//    const campDataPage = await Camp.list();

//     res.render("advertiser/index", { page: "campaigns",session: req.session, campDataPage});
//   }
// );

// router.get('/campaigns/add_newd', function(req, res, next){
//     res.render("advertiser/index", { page: "add_campaign", session: req.session});
// });

router.get(
  "/payment_history",
  [isAuthenticated],
  [isAdvertiser],
  function (req, res, next) {
    res.render("advertiser/index", {
      page: "payment_history",
      session: req.session,
    });
  }
);

router.get(
  "/payment",
  [isAuthenticated],
  [isAdvertiser],
  function (req, res, next) {
    res.render("advertiser/index", {
      page: "payment",
      session: req.session,
    });

    res.end();
  }
);

router.get(
  "/successs",
  [isAuthenticated],
  [isAdvertiser],
  function (req, res, next) {
    res.render("advertiser/index", {
      page: "success",
      session: req.session,
    });

    res.end();
  }
);
router.get(
  "/errorr",
  [isAuthenticated],
  [isAdvertiser],
  function (req, res, next) {
    res.render("advertiser/index", {
      page: "errorr",
      session: req.session,
    });

    res.end();
  }
);

router.get(
  "/invoice_report",
  [isAuthenticated],
  [isAdvertiser],
  function (req, res, next) {
    res.render("advertiser/index", {
      page: "invoice_report",
      session: req.session,
    });
  }
);

router.get(
  "/change_password",
  [isAuthenticated],
  [isAdvertiser],
  function (req, res, next) {
    res.render("advertiser/index", {
      page: "change_password",
      session: req.session,
    });
  }
);

router.post(
  "/change_password",
  [isAuthenticated],
  [isAdvertiser],
  [
    cb.validateOPassword,
    cb.validateNPassword,
    cb.validateCOPassword
  ],
async function (req, res, next) {
const id = req.session.user.id;
const passWd = await userdata.getUserData(id)
const passwordInput = passWd[0].password;
const password = req.body.olderpassword;
const isMatch = await bcrypt.compare(password, passwordInput)
const saltRounds = 10;
const newpassword = req.body.newpassword;
const confirmpassword = req.body.confirmpassword;
const encryptednewpassword = await bcrypt.hash(confirmpassword, saltRounds)
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
  res.redirect("/advertiser/change_password");
  res.end();
} else {
if(isMatch && newpassword === confirmpassword)
{
 db.query(`UPDATE users SET password='${encryptednewpassword}' WHERE id='${id}'`, function (error, results, fields) {
    if (error) {
      req.flash('error', 'Error occurred. : ' + error);
      res.redirect("/advertiser/change_password");
      res.end();
    } else {
      req.flash('info', 'PASSWORD UPDATED SUCCESSFULLY !');
      res.redirect("/advertiser/change_password");
      res.end();
    }
  });
}else{
  req.flash('info', 'PASSWORD UPDATE FAILED!');
  res.redirect("/advertiser/change_password");
  res.end();
}
 }
})

router.get(
  "/manage_label",
  [isAuthenticated],
  [isAdvertiser],
  function (req, res, next) {
    res.render("advertiser/index", {
      page: "manage_label",
      session: req.session,
    });
  }
);

router.get(
  "/media_library",
  [isAuthenticated],
  [isAdvertiser],
  function (req, res, next) {
    res.render("advertiser/index", {
      page: "media_library",
      session: req.session,
    });
  }
);

router.get(
  "/refferal_program",
  [isAuthenticated],
  [isAdvertiser],
  function (req, res, next) {
    res.render("advertiser/index", {
      page: "refferal_program",
      session: req.session,
    });
  }
);

router.get(
  "/tracking_tool",
  [isAuthenticated],
  [isAdvertiser],
  function (req, res, next) {
    res.render("advertiser/index", {
      page: "tracking_tool",
      session: req.session,
    });
  }
);

router.get(
  "/transaction",
  [isAuthenticated],
  [isAdvertiser],
  async function (req, res, next) {
    const tbl_transaction = await transaction.list_advertiser({
      user_id: req.session.user.id,
    });

    res.render("advertiser/index", {
      page: "transaction",
      session: req.session,
      tbl_transaction,
    });
  }
);

router.get(
  "/campaign/:id/view",
  [isAuthenticated],
  [isAdvertiser],
  async function (req, res, next) {
    const lblData = await list(req.session.user.id);
    const grpData = await Group.list(req.session.user.id);
    const keyData = await Keyword.list();
     const campData = await Camp.findOne({id: req.params.id, user_id: req.session.user.id})
   
    
    res.render("advertiser/index", {
      page: "view_campaign",
      session: req.session,
      lblData,
      grpData,
      keyData,
      campData: campData[0]
    });
  }
);

router.get(
  "/campaign/:id/edit",
  [isAuthenticated],
  [isAdvertiser],
  async function (req, res, next) {
    const lblData = await list(req.session.user.id);
    const grpData = await Group.list(req.session.user.id);
    const keyData = await Keyword.list();
    const campData = await Camp.findOne({
      id: req.params.id,
      user_id: req.session.user.id,
    });

    res.render("advertiser/index", {
      page: "add_campaign",
      session: req.session,
      lblData,
      grpData,
      keyData,
    });
  }
);

//-----------------------view data--------------------------------

router.get(
  "/payment/:id",
  [isAuthenticated],
  [isAdvertiser],
  async function (req, res, next) {
    const campData = await Camp.findOne({
      id: req.params.id,
      user_id: req.session.user.id,
    });
    const campDataId = await camPage.list1();
    var str;
    var user_id;
    var id;
    var media_id;

    if (campData.length) {
      campData.forEach(function (camp) {
        media_id = camp.media_id
        id = camp.id;
        user_id = camp.user_id;
        str = JSON.parse(camp.audience_exclusion_cookie);
        
      });
    }
    res.render("advertiser/index", {
      page: "payment",
      session: req.session,
      campData: str[0].site_name,
      campDataId,
      user_id,
      media_id,
      id
    });
   
  }
);

router.get(
  "/add_campaign",
  [isAuthenticated],
  [isAdvertiser],
  async function (req, res) {
    const lblData = await list(req.session.user.id);
    const grpData = await Group.list(req.session.user.id);
    const keyData = await Keyword.list();
    const campData = await Camp.list1();
    const mediaLibrary = await media.list(req.session.user.id);
    res.render("advertiser/index", {
      page: "add_campaign",
      session: req.session,
      lblData,
      grpData,
      keyData,
      campData,
      mediaLibrary
    });
  }
);

router.post(
  "/add_campaign",
  [isAuthenticated],
  [isAdvertiser],
  check("camp_name", "Campaign Name is required").notEmpty(),
  check("audience_exclusion_cookie", "Audience_exclusion_cookie  is required").notEmpty(),
  check("retargeting_cookie", "Audience_retargeting_cookie  is required").notEmpty(),
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

      req.flash("warning", str_msg);
      const lblData = await list(req.session.user.id);
      const grpData = await Group.list(req.session.user.id);
      const keyData = await Keyword.list();
      const mediaLibrary = await media.list(req.session.user.id);
      const campData = await Camp.list1();
      res.render("advertiser/index", {
        page: "add_campaign",
        session: req.session,
        lblData,
        grpData,
        keyData,
        campData,
        mediaLibrary
      });
      res.end();
      return;
    }

    let rqData = req.body;

    let data = {
      campaign_name: req.body.camp_name,
      device_type: req.body.device_type,
      ad_format: req.body.ad_format,
      duration: req.body.duration,
      ad_start_at: `${req.body.ad_start_date} ${req.body.ad_start_time_min}:${req.body.ad_start_time_sec}`,
      ad_end_at: `${req.body.ad_end_date} ${req.body.ad_end_time_min}:${req.body.ad_end_time_sec}`,
      frequency_capping: req.body.ad_frequency_capping,
      category: req.body.category,
      gender: req.body.gender,
      audience_exclusion: req.body.audience_exclusion,
      audience_retargeting: req.body.retargeting,
      keyword_targeting: req.body.keywordTarget,
      geo_targeting: req.body.geoTarget,
      os_targeting: req.body.osTarget,
      ad_position: req.body.ad_position,
      browser_targeting: req.body.browserTarget,
      browser_language_targeting: req.body.browserLanguageTarget,
      connection_targeting: req.body.connectionTarget,
      status: 1,
      updated_at: getLocalDate,
      created_at: getLocalDate,
      user_id: req.session.user.id,
    };

    if (typeof rqData.group != "undefined" && rqData.group) {
      data.group_id = req.body.group;
    }

    if (typeof rqData.label != "undefined") {
      data.label_ids = req.body.label;
    }

    if (typeof rqData.media != "undefined") {
      data.media_id = req.body.media;
    }

    if (typeof rqData.tracker != "undefined") {
      data.tracker = req.body.tracker;
    }

    if (typeof rqData.ad_dimension_size != "undefined") {
      data.ad_dimension_size = req.body.ad_dimension_size;
    }

    if (
      typeof rqData.frequency_cap_times != "undefined" &&
      rqData.frequency_cap_times
    ) {
      data.frequency_cap_times = req.body.frequency_cap_times;
    }

    if (
      typeof rqData.frequency_cap_every != "undefined" &&
      rqData.frequency_cap_every
    ) {
      data.frequency_cap_every = req.body.frequency_cap_every;
    }

    if (typeof rqData.frequency_cap_units != "undefined") {
      data.frequency_cap_units = req.body.frequency_cap_units;
    }

    if (
      typeof rqData.audience_exclusion_cookie != "undefined" &&
      rqData.audience_exclusion_cookie != ""
    ) {
      data.audience_exclusion_cookie = req.body.audience_exclusion_cookie;
    }

    if (
      typeof rqData.retargeting_cookie != "undefined" &&
      rqData.retargeting_cookie != ""
    ) {
      data.audience_retargeting_cookie = req.body.retargeting_cookie;
    }

    if (typeof rqData.keyword_select != "undefined") {
      data.keyword_selected = req.body.keyword_select;
    }

    if (typeof rqData.keyword_exclude != "undefined") {
      data.keyword_excluded = req.body.keyword_exclude;
    }

    if (typeof rqData.country != "undefined") {
      data.country = req.body.country;
    }

    if (typeof rqData.state != "undefined") {
      data.state = req.body.state;
    }

    if (typeof rqData.region != "undefined") {
      data.region = req.body.region;
    }

    if (typeof rqData.os != "undefined") {
      data.os = JSON.stringify(req.body.os);
    }

    if (typeof rqData.exchange != "undefined") {
      data.exchange_format = req.body.exchange;
    }

    if (typeof rqData.browser != "undefined") {
      data.browser = JSON.stringify(req.body.browser);
    }

    if (typeof rqData.browser_language_selected != "undefined") {
      data.browser_language_selected = req.body.browser_language_selected;
    }

    if (typeof rqData.connection != "undefined") {
      data.connection_type = req.body.connection;
    }

    //add to db
    const inserted = await Camp.create(data);
    if (inserted) {
      req.flash("info", "Campaign created successfully");
      res.redirect("/advertiser/campaigns");
      res.end();
    } else {
      req.flash("warning", "Failed in added");
      const lblData = await list(req.session.user.id);
      const grpData = await Group.list(req.session.user.id);
      const keyData = await Keyword.list();
      res.render("advertiser/index", {
        page: "add_campaign",
        session: req.session,
        lblData,
        grpData,
        keyData,
      });
    }
  }
);

router.get("*", [isAuthenticated], function (req, res, next) {
  const data = {
    message: "Page Not Found!",
    error: "Resource is not found",
  };
  res.render("error", data);
});


module.exports = router;
