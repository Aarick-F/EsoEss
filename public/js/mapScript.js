var delay = 100;
var infowindow = new google.maps.InfoWindow();
var latlng = new google.maps.LatLng(21.0, 78.0);
var mapOptions = {
  zoom: 4,
  center: latlng,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};
var geocoder = new google.maps.Geocoder();
var map = new google.maps.Map(document.querySelector(".map"), mapOptions);
console.log(map)
var bounds = new google.maps.LatLngBounds();

function geocodeAddress(address, next) {
  geocoder.geocode({ address: address }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var p = results[0].geometry.location;
      var lat = p.lat();
      var lng = p.lng();
      createMarker(address, lat, lng);
    } else {
      if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
        nextAddress--;
        delay++;
      } else {
      }
    }
    next();
  });
}
function createMarker(add, lat, lng) {
  var contentString = add;
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    map: map
  });

  google.maps.event.addListener(marker, "click", function() {
    infowindow.setContent(contentString);
    infowindow.open(map, marker);
  });

  bounds.extend(marker.position);
}

var nextAddress = 0;
var locations = [];
function theNext() {
  // var location = $(".sos-location").map(function() {
  // return $(this).data("location");
  // });
  // location.push($(".sos-location").data("location")); 
  if (nextAddress < locations.length) {
    setTimeout(
      'geocodeAddress("' + locations[nextAddress] + '",theNext)',
      delay
    );
    nextAddress++;
  } else {
    map.fitBounds(bounds);
  }
}

// $(document).ready(function() {
// theNext();
// });

$.ajax({
  url: "/api/helpcenter",
  method: "GET"
})
  .then(function(response) {
    for (var i = 0; i < response.length; i++) {
      var location = response[i].geolocation.toString();
      locations.push(location);
    }
    return "next";
  })
  .then(() => {
    theNext();
  })
  .catch(function(error) {
    console.log("Error: ", error);
  });