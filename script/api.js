$(document).ready(function(){
    
    $('.button-search').click(function() {
        var inputText = $('#search-input').val();
        var queryURL = "https://data.seattle.gov/resource/j9km-ydkc.json?name=" + inputText;
        var results = $('.container');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
        }
        else{
            alert("Geolocation is not allowed")}

        function successFunction(position) {
                let currentLat = position.coords.latitude;
                let currentLon = position.coords.longitude;

        
        $.ajax({
            url:queryURL,
            method:"GET"
        }).then(function(response){
            var responseString = JSON.stringify(response);
            results.text(responseString);
            console.log(response);
            parkLat = response[0].ypos;
            parkLon = response[0].xpos;
            console.log(parkLat);
            console.log(parkLon);
   
        var radlat1 = Math.PI * currentLat/180;
		var radlat2 = Math.PI * parkLat/180;
		var theta = currentLon-parkLon;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		
        console.log(dist);

        });
    }
    function errorFunction(error){
        switch(error.code) {
            case error.PERMISSION_DENIED:
              alert("User denied the request for Geolocation.")
              break;
            case error.POSITION_UNAVAILABLE:
              alert("Location information is unavailable.")
              break;
            case error.TIMEOUT:
              alert("The request to get user location timed out.")
              break;
            case error.UNKNOWN_ERROR:
              alert("An unknown error occurred.")
              break;
          }
    }

    });
  });



