
  const demographics = ["Adults", "Children", "Elderly", "Pets"];
  const supplies = ["Water", "Water Purifier", "Dehumidifier", "Food", "Baby Food",
                   "Medicine", "Hygiene Products", "Clothing", "Mosquito Net",
                   "Cleaning Supplies", "Batteries", "Tarps", "Fuel",
                   "Small Generators", "Industrial Generators",
                    "Construction Materials"];

  let selectedDemo = [];
  let selectedSupplies = [];
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
      str += item + ", "
    });
    return str.slice(0, -2);
  }
  
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: {lat: 40.731, lng: -73.997}
  });
  var geocoder = new google.maps.Geocoder;
  var infowindow = new google.maps.InfoWindow;
  
  var geoSuccessHandler = function (position) { 
    myMap(position.coords.latitude, position.coords.longitude);
    function myMap(){
      document.getElementById('submitTwo').addEventListener('click', function() {
        $("#formModal").addClass("is-active");
          geocodeLatLng(geocoder, map, infowindow);
      });
    }

    function geocodeLatLng(geocoder, map, infowindow){
      console.log("****"+position.coords.latitude);
      var latlng = {lat: position.coords.latitude, lng: position.coords.longitude};
      geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === 'OK') {
          if (results[0]) {
            console.log("ADDRESS: "+results[0].formatted_address)
            var latLong = results[0].formatted_address
            console.log("a: "+ latLong)
            var currentLocation = latLong
            // Grab field information
            demographicString = makeString(selectedDemo);
            suppliesString = makeString(selectedSupplies);
            locationType = $("#locationType").val();
            disasterType = $("#disasterType").val();
            numberAffected = $("#numberAffected").val();
            // Create case object
            let newCase = new Case(currentLocation,  locationType, disasterType,
                          suppliesString, demographicString, numberAffected);
            console.log(newCase)
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

            map.setZoom(11);
            var marker = new google.maps.Marker({
              position: latlng,
              map: map
            });
            infowindow.setContent(results[0].formatted_address);
            infowindow.open(map, marker);
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });
    }
  };
  navigator.geolocation.getCurrentPosition(geoSuccessHandler);
}

