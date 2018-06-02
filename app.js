// DEPENDENCIES
// ================================================================
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");

// APP SETUP
// ================================================================
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.engine("handlebars", handlebars({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// DATABASE
// ================================================================
const db = require("./models");

// ROUTES
// ================================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// LISTENER
// ================================================================
db.sequelize.sync({force:true}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});