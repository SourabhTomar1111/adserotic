const connection = require("../config/db2");
const tbl_media = "media";

module.exports = {

  list: async (user_id) => {
    let [rows] = await connection.query(
      `SELECT id, name FROM ${tbl_media} WHERE user_id=? `,
      user_id
    );
    
    if (rows.length) {
      return rows;
    }

    return false;
  },


};
