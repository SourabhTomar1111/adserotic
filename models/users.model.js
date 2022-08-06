const connection = require("../config/db2");
// const db2P = db2.promise();

module.exports = {
  usernameExists: async (username) => {
    let [rows] = await connection.query(
      "SELECT id,username FROM users WHERE username=? ",
      username
    );

    // console.log(rows);
    if (rows.length) {
      return rows.length;
    }

    return false;
  },
  emailExists: async (email) => {
    let [rows] = await connection.query(
      "SELECT id, email FROM users WHERE email=? ",
      email
    );

    // console.log(rows);
    if (rows.length) {
      return rows.length;
    }

    return false;
  },
  getUserData: async (id) => {
    let [rows] = await connection.query("SELECT * FROM users WHERE id=? ", id);

    if (rows.length) {
      return rows;
    }

    return false;
  },

  updateUserData: async (id) => {
    let [rows] = await connection.query("SELECT * FROM users WHERE id=? ", id);

    if (rows.length) {
      return rows;
    }

    return false;
  },

  findone : async(data) => {
    let [rows] = await connection.query("SELECT email FROM users WHERE email=?", data.email)
    if (rows.length) {
      return true;
    }

    return false;
  },

  findone1 : async(data) => {
    console.log(data)
    let [rows] = await connection.query("SELECT email, verification_code FROM users WHERE email=? And verification_code=?", [data.email, data.verification_code])

    if (rows.length) {
      return rows;
    }

    return false;
  },
  }

