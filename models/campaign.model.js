const connection = require("../config/db2");
const tbl_group = "campaigns";
const tbl_group1 = "pages";

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
      `SELECT * FROM ${tbl_group} WHERE user_id=?  ORDER BY id desc`,
      user_id
    );

    if (rows.length) {
      return rows;
    }

    return false;
  },

  findOne: async (data) => {
    let [rows] = await connection.query(
      `SELECT * FROM ${tbl_group} WHERE id=? AND user_id=? `,
      [data.id, data.user_id]
    );

    if (rows.length) {
      return rows;
    }

    return false;
  },
  findOne1: async (data) => {
    let [rows] = await connection.query(`SELECT * FROM ${tbl_group}  `);

    if (rows.length) {
      return rows;
    }

    return false;
  },

  delete: async (id) => {
    let [rows] = await connection.query(
      `DELETE FROM ${tbl_group} WHERE id= ?`,
      id
    );

    if (rows.affectedRows) {
      return true;
    }
    return false;
  },
  list1: async () => {
    let [rows] = await connection.query(`SELECT * FROM ${tbl_group1}  `);
    // console.log(rows)
    if (rows.length) {
      return rows;
    }
    return false;
  },
  getUserPagesDT1: async (data) => {
    let [rows] = await connection.query(`SELECT url FROM ${tbl_group1} `);
    console.log(rows);

    if (rows.length) {
      return rows;
    }
    return false;
  },
};
// "start": "node ./bin/www",
