require("dotenv").config();
const Sequelize = require("sequelize");

const sequelize = new Sequelize("esoess_db", "root", "pleasework", {
  host: "localhost",
  port: 3306,
  dialect: "mysql"
});

module.exports = sequelize;