const connection = require("../config/db2");
const tbl_trans = "tbl_transaction";
const tbl_page = "pages";
const tbl_media = "media";
const tbl_count = "count_tbl";
module.exports = {
  list_widgets: async () => {
    let [rows] = await connection.query(
      `SELECT  ${tbl_trans}.campaginID ,${tbl_trans}.publisher_page_id, ${tbl_trans}.advertiser_user_id, ${tbl_trans}.publisher_User_Id, ${tbl_trans}.media_id, ${tbl_trans}.price, ${tbl_media}.type, ${tbl_media}.name, ${tbl_media}.id FROM  ${tbl_trans}  join  ${tbl_media} ON  ${tbl_trans}.media_id= ${tbl_media}.id join  ${tbl_page} ON  ${tbl_trans}.publisher_page_id= ${tbl_page}.id WHERE ${tbl_page}.url = "http://dskl/.com"  `
    );
    // console.log(rows);
    if (rows.length) {
      return rows;
    }

    return false;
  },

  count: async (data) => {
    let [rows] = await connection.query(
      `SELECT count, publisher_User_Id, advertiser_user_id, media_id, page_id from ${tbl_count} where publisher_User_Id = ? AND advertiser_user_id=? AND media_id=? AND page_id=? `,
      [
        data.publisher_User_Id,
        data.advertiser_user_id,
        data.media_id,
        data.page_id,
      ]
    );
    if (rows.length) {
      return rows;
    }

    return false;
  },
};
