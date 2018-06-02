const db = require("../models");

module.exports = function(app) {
  app.get("/", (req, res) => {
    res.render("home");
  });

  app.get("/help", (req, res) => {
    res.render("formFinal");
  });

  app.get("/helpcenter", (req, res) => {
    res.render("helpCenter");
  });
}