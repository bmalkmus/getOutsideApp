$(document).ready(function(){

let ClosestList
var queryURL = "https://data.seattle.gov/resource/j9km-ydkc.json?"

if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
    }
else{
    alert("Geolocation is not allowed")};

        
        
function successFunction(position) {
    let currentLat = position.coords.latitude;
    let currentLon = position.coords.longitude;
 
    // Upon loading, this is the code to populate some of the information for the closest park from the user computer
    $.ajax({
        url:queryURL,
        method:"GET"
    })
            
    .then(function(response){
        ClosestList = [];
    
        for (i = 0; i < response.length; i++){
            parkLat = response[i].ypos;
            parkLon = response[i].xpos;
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
        
                let parkName =response[i].name;
                let parkResult = {parkName, dist};
                ClosestList.push(parkResult);
        }
                 
                
        filteredList = $.grep(ClosestList, function(v) {
            return v.dist > .0001;

        });
        
        filteredList.sort(function(a,b){
            return a.dist - b.dist
        });

        let longDist = filteredList[0].dist
        let roundedDist = longDist.toFixed(2);

        let inputText = filteredList[0].parkName;
        let queryURL = "https://data.seattle.gov/resource/j9km-ydkc.json?name=" + inputText;
        let results = $('#results-container');
    
        $.ajax({
            url:queryURL,
            method:"GET"
        }).then(function(response){
            console.log(response[0].feature_desc);
             let closetPark = $('<h3>').text('Closest Park to your Current Location: '+inputText);
             let parkFeat = $('<div>')

            let featTitle = $('<h4>').text(("Park Features:"))
             let parkHours = $('<h4>').text('Hours: ' + response[0].hours);
             let parkDist = $('<h4>').text ('Distance to Park: ' + roundedDist + ' miles');
            $(parkFeat).append(featTitle);
             for (i=0; i < response.length; i ++){
                 let singleFeat = $('<p>').text(response[i].feature_desc);
                 console.log (singleFeat);
                 $(parkFeat).append(singleFeat);
             }
            $(results).append(closetPark);
            $(results).append(parkFeat);
            //  console.log(parkFeat);
            $(results).append(parkHours);
            $(results).append(parkDist);



            // var responseString = JSON.stringify(response);
            // results.text(responseString);
        });
    });


    $('#search').click(function() {
        var inputText = $('.validate').val();
        var queryURL = "https://data.seattle.gov/resource/j9km-ydkc.json?name=" + inputText;
        var results = $('#results');
        
        $.ajax({
            url:queryURL,
            method:"GET"
        })
        
        .then(function(response){
            var responseString = JSON.stringify(response);
            results.text(responseString);
        });
    });

    var featuresURL = "https://data.seattle.gov/resource/j9km-ydkc.json?";
    var results = $('#results');
    $.ajax({
        url: featuresURL,
        method: "GET"
    })
    
    .then(function(response){
        
        var i;
        var featuresList = [];
        for (i = 0; i < response.length; i++) {
            featuresList.push(response[i]['feature_desc']);
            }
            featuresList.sort();
            var newfeaturesList = featuresList.filter(function(elem, index, self) {
                return index === self.indexOf(elem);
            });
            newfeaturesList.forEach(element => $("#parkfeatures").append("<option value=\""+element+"\">"+element+"</option>"));   
})

$('#search').click(function() {
    var inputText = $('.validate').val();
    console.log(inputText);
    var queryURL = "https://data.seattle.gov/resource/j9km-ydkc.json?name=" + inputText;
    var results = $('#results-container');
    
    $.ajax({
        url:queryURL,
        method:"GET"
    }).then(function(response){
        var responseString = JSON.stringify(response);
        results.text(responseString);
    });
});


$('#parkfeatures').click(function() {
    var featureText = $('#parkfeatures').val();
    $('#results-container').empty();
    var queryURL = "https://data.seattle.gov/resource/j9km-ydkc.json?feature_desc=" + featureText;
    var results = $('#results-container');
    $.ajax({
        url:queryURL,
        method:"GET"
    }).then(function(response){
        // var responseString = JSON.stringify(response);
        // results.text(responseString);
        for (i = 0; i < response.length; i ++){
            results.append(response[i].name+"<br>")
        }
});
})

$("#maxDistance").change(function(){
    $('#results-container').empty();
    var inputText =$('#maxDistance').val();

    // var results = $('.container');

    
    $.ajax({
        url:queryURL,
        method:"GET"
    })
    
    .then(function(response){
        let DistanceList =[];
        ClosestList = [];
        for (i = 0; i < response.length; i++){
            parkLat = response[i].ypos;
            parkLon = response[i].xpos;
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

        let parkName =response[i].name;
        let parkResult = {parkName, dist};
        ClosestList.push(parkResult);


        if (!dist == NaN || dist <= inputText){

            DistanceList.push(response[i].name);
        }
        }
         filteredList = $.grep(ClosestList, function(v) {
            return v.dist > .0001;

        });

        filteredList.sort(function(a,b){
            return a.dist - b.dist
        });

        console.log(filteredList)



        


        if(DistanceList.length == 0){
            DistanceList.push("No parks within your mile search of current location")
        }
        Unique = [...new Set(DistanceList)];

        Unique.sort();

        for (i = 0; i < Unique.length; i++){
            let parkDiv = $('<div>').text(Unique[i])
            $(parkDiv).addClass("park");

            $('#results-container').append(parkDiv );
        }
       

        
    });

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


// https://developers.zomato.com/api/v2.1/geocode?lat=47.600931&lon=-122.286548&apikey=3bd2eec0a051217d2a66562300ac5619
})