const connection = require("../config/db2");
const tbl_group = "groups";

module.exports = {
  create: async (data) => {
    let [rows] = await connection.query(`INSERT INTO ${tbl_group} SET ?`, data);

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
      `SELECT id, name FROM ${tbl_group} WHERE user_id=? `,
      user_id
    );

    if (rows.length) {
      return rows;
    }

    return false;
  },

  findOne: async (data) => {
    let [rows] = await connection.query(
      `SELECT id, name FROM ${tbl_group} WHERE name=? AND user_id=? `,
      [data.name, data.user_id]
    );

    if (rows.length) {
      return rows;
    }

    return false;
  },
};
