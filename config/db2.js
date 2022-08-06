const mysql2 = require("mysql2/promise");
require('dotenv').config();

// Create the connection pool. The pool-specific settings are the defaults
const connection = mysql2.createPool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
});
module.exports = connection;
