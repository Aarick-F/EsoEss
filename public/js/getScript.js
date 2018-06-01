var delay = 100;
var infowindow = new google.maps.InfoWindow();
var latlng = new google.maps.LatLng(21.0000, 78.0000);
var mapOptions = {
  zoom: 4,
  center: latlng,
  mapTypeId: google.maps.MapTypeId.ROADMAP
}
var geocoder = new google.maps.Geocoder(); 
var map = new google.maps.Map(document.getElementById("map"), mapOptions);
var bounds = new google.maps.LatLngBounds();

function geocodeAddress(address, next) {
  geocoder.geocode({address:address}, function (results,status)
    { 
       if (status == google.maps.GeocoderStatus.OK) {
        var p = results[0].geometry.location;
        var lat=p.lat();
        var lng=p.lng();
        createMarker(address,lat,lng);
      }
      else {
         if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
          nextAddress--;
          delay++;
        } else {
                      }   
      }
      next();
    }
  );
}
function createMarker(add,lat,lng) {
 var contentString = add;
 var marker = new google.maps.Marker({
   position: new google.maps.LatLng(lat,lng),
   map: map,
         });

google.maps.event.addListener(marker, 'click', function() {
   infowindow.setContent(contentString); 
   infowindow.open(map,marker);
 });

 bounds.extend(marker.position);

}

// I want the locations's to come from my ajax fuction
// how do I do thi...?

//================================================
var nextAddress = 0;
function theNext(location) {
  if (nextAddress < location.length) {
    setTimeout('geocodeAddress("'+location[nextAddress]+'",theNext)', delay);
    nextAddress++;
  } else {
    map.fitBounds(bounds);
  }
}



$.ajax({
    url: '/api/helpcenter',
    method: "GET"
}).then(function (response) {
    var locations = [];
    console.log(response)
    for(var i = 0; i < response.length; i++) {
    //     console.log(response[i].geolocation);
    //     // console.log("======================")
    //     // console.log(pars_location)    
    //     // console.log("======================")
    //     // console.log(response[i])
        
        // console.log(locations)
        locations.push(response[i].geolocation)
        console.log(locations)
        theNext(locations)
    }
})
.catch(function(error) {
    console.log('Error: ', error);
});



