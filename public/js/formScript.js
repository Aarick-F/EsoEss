$(document).ready(() => {
  
  const demographics = ["Adults", "Children", "Elderly", "Pets"];
  const supplies = ["Water", "Water Purifier", "Dehumidifier", "Food", "Baby Food",
                   "Medicine", "Hygiene Products", "Clothing", "Mosquito Net",
                   "Cleaning Supplies", "Batteries", "Tarps", "Fuel",
                   "Small Generators", "Industrial Generators",
                    "Construction Materials"];

  let selectedDemo = [];
  let selectedSupplies = [];
  let currentLocation = [];
  let locationString, demographicString, suppliesString
      locationType, disasterType, numberAffected;
  
  demographics.forEach(demo => {
    let button = $("<button class='button is-medium formButton demo' value='" + 
                   demo + "'>" + demo + "</button>");
    
    $("#demoButtons").append(button);
  });
  
  supplies.forEach(item => {
    let button = $("<button class='button is-medium formButton item' value='" +
                  item + "'>" + item + "</button>");
    
    $("#supplyButtons").append(button);
  });
  
  // DEMOGRAPHIC INPUT LISTENER
  $(document).on("click", ".demo", function(e) {
    e.preventDefault();
    if($(this).hasClass("selected")) {
      $(this).removeClass("selected");
      let index = selectedDemo.indexOf($(this).val());
      selectedDemo.splice(index, 1);
    } else {
      $(this).addClass("selected");
      selectedDemo.push($(this).val());
    }
    console.log(selectedDemo);
  });
  
  // SUPPLIES INPUT LISTENER
  $(document).on("click", ".item", function(e) {
    e.preventDefault();
    if($(this).hasClass("selected")) {
      $(this).removeClass("selected");
      let index = selectedSupplies.indexOf($(this).val());
      selectedSupplies.splice(index, 1);
    } else {
      $(this).addClass("selected");
      selectedSupplies.push($(this).val());
    }
    console.log(selectedSupplies);
  });

  // ON SUBMIT
  $(document).on("click", "#submitTwo", function(e) {
    e.preventDefault();

    // if(navigator.geolocation) {
      // navigator.geolocation.getCurrentPosition(position => {
        $.getJSON('https://geoip-db.com/json/geoip.php?jsonp=?')
    .done(function (location) {
      console.log("****: ", location);
        // Get Geolocation
        // currentLocation.push(position.coords.latitude);
        // currentLocation.push(position.coords.longitude);
        // locationString = makeString(currentLocation);
        var currentLocation = location.city + "," + location.country_name;
        // Grab field information
        demographicString = makeString(selectedDemo);
        suppliesString = makeString(selectedSupplies);
        locationType = $("#locationType").val();
        disasterType = $("#disasterType").val();
        numberAffected = $("#numberAffected").val();

        // Create case object
        let newCase = new Case(currentLocation,  locationType, disasterType,
                      suppliesString, demographicString, numberAffected);

        // Post to Database Route
        $.post({
          url: "/api/case",
          data: JSON.stringify(newCase),
          contentType: "application/json",
          method: "POST"
        })
        .then(data => {
          console.log("data: ", data);
        });
      });

    })
    // } else {
    //   // If user refuses to give us their location
    //   locationString = "No Location Provided";
    //   console.log(locationString);
    // }
  // });

  // Case object constructor
  class Case {
    constructor(currentLocation, locationType, disasterType,
      items, demographic, numberAffected) {
      this.currentLocation = currentLocation;
      this.locationType = locationType;
      this.disasterType = disasterType;
      this.items = items;
      this.demographic = demographic;
      this.numberAffected = numberAffected;
    }
  }

  // Helper Function
  makeString = (arr) => {
    let str = "";
    arr.forEach(item => {
      str += item + ","
    });
    return str.slice(0, -1);
  }
  
});