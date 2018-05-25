const Sequelize = require("sequelize");
const sequelize = require("../config/connection.js");

const Case = sequelize.define("case", {
  disasterType: {
    type: Sequelize.STRING
  },
  suppliesNeeded: {
    type: Sequelize.STRING
  }
});

Case.sync();
module.exports = Case;