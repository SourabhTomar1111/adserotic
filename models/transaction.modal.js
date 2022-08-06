const connection = require("../config/db2");
const tbl_trans = "tbl_transaction";
const tbl_camp = "campaigns";
const tbl_page = "pages";
const tbl_media = "media";

module.exports = {
  create: async (data) => {
    let [rows] = await connection.query(`INSERT INTO ${tbl_trans} SET ?`, data);
    // console.log(rows)
    if (rows.affectedRows) {
      return true;
    }

    return false;
  },

  list_publisher: async (data) => {
    let [rows] = await connection.query(
      `SELECT   ${tbl_trans}.*,u1.username, u2.username, ${tbl_page}.url,  ${tbl_media}.name, ${tbl_media}.type, ${tbl_camp}.campaign_name, ${tbl_camp}.category FROM   ${tbl_trans} left join users u1 ON   ${tbl_trans}.publisher_User_Id=u1.id left join users u2 ON   ${tbl_trans}.advertiser_user_id	=u2.id join ${tbl_camp} ON   ${tbl_trans}.campaginID=${tbl_camp}.id join ${tbl_page} ON   ${tbl_trans}.publisher_page_id=${tbl_page}.id join  ${tbl_media} ON   ${tbl_trans}.media_id= ${tbl_media}.id WHERE u1.id=? `,
      data.user_id
    );
    // console.log(rows)

    if (rows.length) {
      return rows;
    }

    return false;
  },
  list_advertiser: async (data) => {
    let [rows] = await connection.query(
      `SELECT  ${tbl_trans}.*,u1.username, u2.username, ${tbl_page}.url, ${tbl_media}.name, ${tbl_media}.type, ${tbl_camp}.campaign_name, ${tbl_camp}.category FROM  ${tbl_trans} left join users u1 ON  ${tbl_trans}.advertiser_user_id=u1.id left join users u2 ON  ${tbl_trans}.publisher_User_Id	=u2.id join ${tbl_camp} ON  ${tbl_trans}.campaginID=${tbl_camp}.id join ${tbl_page} ON  ${tbl_trans}.publisher_page_id=${tbl_page}.id join ${tbl_media} ON  ${tbl_trans}.media_id=${tbl_media}.id WHERE u1.id=? `,
      data.user_id
    );
    // console.log(rows)

    if (rows.length) {
      return rows;
    }

    return false;
  },
};
