const { getLocalDate } = require("../helpers/common");
const transaction = require("../models/transaction.modal");

module.exports.paypall = async function (
  price,
  transaction_Id,
  create_time,
  update_time,
  status,
  price,
  publisher_Id,
  Advertiser_User_Id,
  publisher_User_Id,
  campaginID,
  mediaId
) {
  let data = {
    price: price,
    status: status,
    transaction_id: transaction_Id,
    date: getLocalDate,
    createtime: create_time,
    updatetime: update_time,
    publisher_page_id: publisher_Id,
    advertiser_user_id: Advertiser_User_Id,
    publisher_User_Id: publisher_User_Id,
    campaginID: campaginID,
    media_id: mediaId,
  };

  const inserted = await transaction.create(data);
  if (inserted) {
    console.log("info", "Payment successfully");
  } else {
    console.log("warning", "Failed in added");
  }
};

// count()
