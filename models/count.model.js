const connection = require("../config/db2");
const tbl_count = "count_tbl";


module.exports = {
  createCount: async (data) => {
    let [rows] = await connection.query(`INSERT INTO ${tbl_count} SET ?`, data);
    // console.log(rows)
    if (rows.affectedRows) {
      return true;
    }

    return false;
  },
}
