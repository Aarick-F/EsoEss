const db = require("../models");

module.exports = function(app) {

  app.post("/api/case", function(req, res) {
    // console.log(req.body)
    db.Case.create({
      disaster_type: req.body.disasterType,
      location_type: req.body.locationType,
      geolocation: req.body.currentLocation,
      items_needed: req.body.items,
      number_affected: req.body.numberAffected,
      demographic: req.body.demographic
    })
    .then(function(dbCase) {
      // console.log("New Post: ", dbCase)
      res.json(dbCase);
      });
  });

  app.get("/api/helpcenter", function(req, res) {
    db.Case.findAll({})
    .then(function(dbCase) {
      res.json(dbCase);
    });
  });
}