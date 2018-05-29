module.exports = function(sequelize, DataTypes) {
  const Case = sequelize.define("case", {
  geolocation: {
    type: DataTypes.STRING
  },
  disaster_type: {
    type: DataTypes.STRING
  },
  items_needed: {
    type: DataTypes.STRING
  },
  case_status: {
    type: DataTypes.STRING
  },
  time_created: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW 
  }
});
  return Case;
}