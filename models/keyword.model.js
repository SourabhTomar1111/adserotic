const connection = require('../config/db2');
const tbl_group = 'keywords';

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
        let [rows] = await connection.query('UPDATE group SET name="?" WHERE id= ? ', name, id);
        // console.log(rows);
        if (rows.length) {
            return rows;
        }
        return false;
    },

    list: async () => {
        let [rows] = await connection.query(`SELECT * FROM ${tbl_group} WHERE status= 1 `);
        if (rows.length) {
            return rows;
        }
        return false;
    },

    findOne: async (data) => {
        let [rows] = await connection.query(`SELECT * FROM ${tbl_group} WHERE name=? AND status= 1 `,[ data.name, data.user_id]);
        if (rows.length) {
            return rows;
        }
        return false;
    }
}