const connection = require("../config/db2");
const tbl_group = "pages";

module.exports = {
  create: async (data) => {
    let [rows] = await connection.query(`INSERT INTO ${tbl_group} SET ?`, data);
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

  list: async (user_id) => {
    let [rows] = await connection.query(
      `SELECT * FROM ${tbl_group} WHERE user_id=? `,
      user_id
    );
    // console.log(rows)
    if (rows.length) {
      return rows;
    }
    return false;
  },
  list1: async (user_id) => {
    let [rows] = await connection.query(`SELECT * FROM ${tbl_group}  `);
    // console.log(rows)
    if (rows.length) {
      return rows;
    }
    return false;
  },

  findOne: async (data) => {
    let [rows] = await connection.query(
      `SELECT * FROM ${tbl_group} WHERE name=? AND user_id=? `,
      [data.name, data.user_id]
    );
    if (rows.length) {
      return rows;
    }
    return false;
  },
  getUserPagesDT: async (data) => {
    let [rows] = await connection.query(
      `SELECT id,url,category,state,price FROM ${tbl_group}  WHERE user_id=? `,
      [data.user_id]
    );
    console.log(rows);

    if (rows.length) {
      return rows;
    }
    return false;
  },
  getUserPages: async (data) => {
    let [rows] = await connection.query(`SELECT url FROM ${tbl_group}  `);
    console.log(rows);

    if (rows.length) {
      return rows;
    }
    return false;
  },
};
