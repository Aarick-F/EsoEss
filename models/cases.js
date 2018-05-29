const Sequelize = require("sequelize");
const sequelize = require("../config/connection.js");

const Case = sequelize.define("case", {
  geolocation: {
    type: Sequelize.STRING
  },
  disaster_type: {
    type: Sequelize.STRING
  },
  items_needed: {
    type: Sequelize.STRING
  },
  case_status: {
    type: Sequelize.STRING
  },
  time_created: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW 
  }
});

Case.sync()
  .then((err) => {
    if(err) {
      console.log(err);
    }
    console.log("Database connected");
  });
module.exports = Case;