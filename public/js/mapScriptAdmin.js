// MAP SCRIPT FOR AMIN HOLDS ADDITION LOGIC FOR UPDATING CASES TO SOLVED

var delay = 100;
var infowindow = new google.maps.InfoWindow();
var latlng = new google.maps.LatLng(21.0, 78.0);
var mapOptions = {
  zoom: 13,
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

$.ajax({
  url: "/api/view",
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

// On Click, case update handler
$(document).on("click",".solved", function(event){
  event.preventDefault();
  var id = $(this).attr("data-id");
  var status =$(this).attr("data-status");
  console.log(status)
  var newStatus = status === "false"? 1:0
  
  console.log(newStatus)
  console.log("This ID: "+ id);
  $.ajax({
    url:`/api/solved/${id}`,
    method:"PUT",
    data:{
      case_status:newStatus
    }
  })
  .then(function(res){
    console.log("Res: "+res)
    location.reload();
  });
});








  