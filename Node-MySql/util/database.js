const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "nur",
  password: "nurAdmin123#",
  database: "nodemysql",
});

module.exports = pool.promise();
