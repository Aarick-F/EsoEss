$(document).ready(() => {
  // console.log("test");

  $(document).on("click", "#submit", function(event){
    event.preventDefault();
    //geolocation============================
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
        // console.log("Latitude:  " + position.coords.latitude)
        // console.log("Longitude:  " + position.coords.longitude)
        var currentLocation = [];
        currentLocation.push(position.coords.latitude, position.coords.longitude)
        // console.log("current Location(Lat/Lng): ", currentLocation)
        var locationType = $("#locationType").val();
        // console.log("locationType: "+ locationType);
        var disaster_type = $("#disaster_type").val();
        // console.log("disaster_type:  " + disaster_type);
        var items_needed = $("#items-needed").val();
        // console.log("Items Needed: " + items_needed);
        var quantity_affected = $("#quantity_affected").val().trim();
        // console.log("Qty: " + quantity_affected);

        var demographic = $("#demographic").val();
        // console.log("Demographic: " + demographic);

        var newCase = {
          disaster_type: disaster_type,
          locationType: locationType,
          currentLocation: currentLocation,
          items_needed: items_needed,
          quantity_affected: quantity_affected,
          demographic: demographic
        }

        $.post({
          url: "/api/case", 
          data: JSON.stringify(newCase),
          contentType: 'application/json',
          method: 'POST'})
          .then(function(data) {     
         console.log("Data: "+ JSON.stringify(data))
          
      });
        // console.log("New Case: "+ JSON.stringify(newCase));
      for (const key of Object.keys(newCase)) {
        console.log(key+": ", newCase[key]);
      }

        
      });
    }else{
      console.log("Geolocation Not Found")
    }
    
  })
});