const express = require("express");
const router = express.Router();
const widgets = require("../../models/widgets.modal");
const db = require("../../config/db2");

router.get("/", function (req, res, next) {
  res.redirect("/visit/widgets");
});

router.get("/widgets", async function (req, res, next) {
  const widget = await widgets.list_widgets();
  res.render("visit/index", {
    page: "widgets",
    session: req.session,
    widget,
  });
});

router.post("/widgets/count", async function (req, res, next) {
  const advertiser = req.body.advertiserData;
  const media = req.body.mediaData;
  const publisher = req.body.publisherData;
  const page = req.body.pageData;

  if (media) {
    for (let i = 0; i < media.length; i++) {
      let id_media = media[i];
      let labelData = {
        media_id: id_media,
        advertiser_user_id: advertiser,
        publisher_User_Id: publisher,
        page_id: page,
        count: 0,
      };
      const widget = await widgets.count({
        publisher_User_Id: publisher,
        advertiser_user_id: advertiser,
        media_id: id_media,
        page_id: page,
      });
      if (widget == false) {
        db.query(`INSERT INTO count_tbl  SET ?`, labelData);
      }else {
        const cou = widget[0].count;
        const data = parseInt(cou) + 1;
        const pub = widget[0].publisher_User_Id;
        const adv = widget[0].advertiser_user_id;
        const med = widget[0].media_id;
        const pag = widget[0].page_id;
        db.query(
          `UPDATE count_tbl SET count='${data}' WHERE publisher_User_Id='${pub}' AND advertiser_user_id='${adv}' AND media_id='${med}' AND page_id='${pag}'`
        );
      }
    }
    res.json({
      code: 200,
      type: "success",
      message: "count added successfully",
    });
    res.end();
    return;
  } else {
    res.end();
  }
});

module.exports = router;
