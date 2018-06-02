const db = require("../models");

module.exports = function(app) {
  app.get("/", (req, res) => {
    res.render("home");
  });

  app.get("/help", (req, res) => {
    res.render("formFinal");
  });

  // app.get("/helpcenter", (req, res) => {
  //   res.render("helpCenter");
  // });
  app.get("/helpcenter", (req, res) => {
    db.Case.findAll({}).then(function(dbCase) {
      console.log("DB: ", dbCase);
      res.render("helpCenter", {cases: dbCase});
    });
  });
}