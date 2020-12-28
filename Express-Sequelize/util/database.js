const Sequelize = require("sequelize");

const sequelize = new Sequelize("nodemysql", "nur", "nurAdmin123#", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
