const connection = require("../config/db2");
const tbl_lable = "labels";

module.exports = {
  create: async (data) => {
    let [rows] = await connection.query(`INSERT INTO ${tbl_lable} SET ?`, data);
    // console.log(rows)
    if (rows.affectedRows) {
      return true;
    }

    return false;
  },

  update: async (id, name) => {
    let [rows] = await connection.query(
      'UPDATE group SET name="?" WHERE id= ? ',
      name,
      id
    );

    // console.log(rows);
    if (rows.length) {
      return rows;
    }

    return false;
  },

  list: async (user_id) => {
    let [rows] = await connection.query(
      `SELECT id, title FROM ${tbl_lable} WHERE user_id=? `,
      user_id
    );

    if (rows.length) {
      return rows;
    }

    return false;
  },

  findOne: async (data) => {
    let [rows] = await connection.query(
      `SELECT id, title FROM ${tbl_lable} WHERE name=? AND user_id=? `,
      [data.name, data.user_id]
    );

    if (rows.length) {
      return rows;
    }

    return false;
  },
};
