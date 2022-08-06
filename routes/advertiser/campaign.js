const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { create, findOne, list} = require("../../models/campaign.model");

const {
  isAuthenticated,
  isAdvertiser,
  isPublisher,
} = require("../../middleware/Authentication");
const campaignModel = require('../../models/campaign.model');



router.get(
  "/campaigns",
  [isAuthenticated],
  [isAdvertiser],
  async function (req, res) {
    res.json({ data: await list(req.session.user.id), user_id: req.session.user.id });
  }
);


router.get(
  "/campaigns",
  [isAuthenticated],
  [isAdvertiser],
  async function (req, res) {
    res.json({ data: await list(req.session.user.id), user_id: req.session.user.id });
  }
);

router.get(
    "/campaign/:id",
    [isAuthenticated],
    [isAdvertiser],
    async function (req, res) {
      let id = req.params.id;
      res.json({ data: await findOne({ id , user_id: req.session.user.id })});
    }
  );

  
  
  router.post('/campaigns/delete', [check('id', 'ID is required')
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

    let deleted = await campaignModel.delete(id);
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

  /////-------------------------send data------------------------//////
  // router.post('/payment/delete', [check('id', 'ID is required')
  // .not().isEmpty()], async function (req, res, next) {

  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     let err_msg = '';
  //     if (errors.mapped()) {
  //       err_msg = errors.mapped();
  //     }
  //     res.json({ 'code': 400, 'error': errors });
  //     res.end();
  //     return;
  //   }

  //   let id = req.body.id;

  //   let data = await campaignModel.findOne(id);
  //     if (data) {
  //       res.json({
  //         "code": 200,
  //         "status": "success",
  //         "message": "data send successfully"
  //       });
  //       return;
  //     } else {
       
  //       res.json({ "code": 400,  "status": "error", "message": "Send Failed" });
  //       res.end();
  //       return;

  //     }
    

  // });

router.post(
  "/campaigns/create",
  [isAuthenticated],
  [isAdvertiser],
  async function (req, res) {
    let data = {
       name: req.body.name,
       user_id: req.session.user.id,
       status: 1,
    };

    const foundData = await findOne(data);
    if (foundData) {
      res.json({
        status: 200,
        is_new: false,
        msg: "Group created",
        results: foundData,
      });
    } else {
      const insertData = await create(data);
      console.log(insertData.affectedRows);
      if (insertData) {
        res.json({
          status: 200,
          is_new: true,
          msg: "Group created",
          results: foundData,
        });
      } else {
        res.json({
          status: 401,
          is_new: false,
          msg: "Failed to created",
          results: foundData,
        });
      }
    }

    return;
  }
);

module.exports = router;
