 require("dotenv").config();
const db = require("../models");
var keys= require("../public/js/twitterKeys");
var Twitter = require('twitter');
var request = require("request");

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

  app.get("/api/view", function(req, res) {
    db.Case.findAll({})
    .then(function(dbCase) {
      res.json(dbCase);
    });
  });

  app.put("/api/solved/:id", function(req, res) {
    console.log("Req.Params: "+req.params.id)
    db.Case.update(req.body,
      {
        where: {
          id: req.params.id
        }
      })
    .then(function(dbCase) {
      res.json(dbCase);
    });
  });

  app.get("/", (req, res) => {
    var client = new Twitter(keys.twitter);

    client.get('statuses/user_timeline', { screen_name: "EsoEss_Official"}, function(error, tweets, response) {
      if(error) return console.log(error);
      var tweet =[{
        date: tweets[0].created_at,
        message:tweets[0].text
      },
      {
        date: tweets[1].created_at,
        message:tweets[1].text
      },
      {
        date: tweets[2].created_at,
        message:tweets[2].text
      }]
      // console.log(tweet)
      res.render("home", {tweet});
      
    })    
  });
}