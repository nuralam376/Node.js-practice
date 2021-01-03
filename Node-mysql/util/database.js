const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "nur",
  password: "",
  database: "nodemysql",
});

module.exports = pool.promise();
