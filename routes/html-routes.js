const db = require("../models");

module.exports = function(app) {
  // USER ROUTES
  app.get("/", (req, res) => {
    res.render("home");
  });

  app.get("/help", (req, res) => {
    res.render("form");
  });
  
  app.get("/view", (req, res) => {
    db.Case.findAll({}).then(function(dbCase) {
      console.log("DB: ", dbCase);
      res.render("view", {cases: dbCase});
    });
  });

  // ADMIN ROUTES
  app.get("/view/admin", (req, res) => {
    db.Case.findAll({}).then(function(dbCase) {
      console.log("DB: ", dbCase);
      res.render("viewAdmin", {cases: dbCase});
    });
  });

  app.get("/admin", (req, res) => {
    res.render("homeAdmin");
  });
}