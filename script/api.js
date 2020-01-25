function createParkResults(parkObject){
    let parkDiv = $('<div>');
    $(parkDiv).addClass("park");
    $(parkDiv).addClass("card blue-grey darken-1");
    let parkCard = $('<div>');
    $(parkCard).addClass("card-content white-text");
    $(parkDiv).append(parkCard);
    let parkSpan = $('<span>').text(parkObject.name);
    $(parkSpan).addClass("card-title");
    $(parkCard).append(parkSpan);
    let parkP1 = $('<p>').text('Features: ' + parkObject.feature_desc);
    let parkP2 = $('<p>').text('Hours: ' + parkObject.hours);
    $(parkCard).append(parkP1);
    $(parkCard).append(parkP2);
    let parkImgDiv = $('<div>');
    $(parkDiv).append(parkImgDiv);
    let parkImg = $('<img>');
    $(parkImg).addClass("imgSmall");
    $(parkImg).attr('id', 'imgSmall');
    $(parkImg).attr('width', '200');
    $(parkImg).attr('height', '100');
    $(parkImg).attr('alt', 'Park Picture');
    $(parkImgDiv).append(parkImg);
    
    return parkDiv;
}

$(document).ready(function(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
    }
    else{
        alert("Geolocation is not allowed")}

    var currentLat = 0;
    var currentLon = 0;
    
    $('#search').click(function() {
        var inputText = $('.validate').val();
        var queryURL = "https://data.seattle.gov/resource/j9km-ydkc.json?name=" + inputText;
        var results = $('.results-container');
        
        $.ajax({
            url:queryURL,
            method:"GET"
        })
        
        .then(function(response){
            var responseString = JSON.stringify(response);
            results.text(responseString);
            console.log(response);
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


$('#parkfeatures').click(function() {
    var featureText = $('#parkfeatures').val();
    console.log(featureText);
    var queryURL = "https://data.seattle.gov/resource/j9km-ydkc.json?feature_desc=" + featureText;
    var results = $('#results');
    $.ajax({
        url:queryURL,
        method:"GET"
    }).then(function(response){
        var responseString = JSON.stringify(response);
        results.text(responseString);
});
})

function successFunction(position) {
    currentLat = position.coords.latitude;
    currentLon = position.coords.longitude;

    console.log(position);

$("#maxDistance").change(function(){
    $('#results').empty();
    console.log(this);
    var inputText =$('#maxDistance').val();
    var queryURL = "https://data.seattle.gov/resource/j9km-ydkc.json?"
    
    $.ajax({
        url:queryURL,
        method:"GET"
    })
    
    .then(function(response){
        let DistanceList =[];
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
    
        
        if (!dist == NaN || dist <= inputText){

            DistanceList.push(response[i]);
        }
        }
        if(DistanceList.length == 0){
            DistanceList.push("No parks within your mile search of current location")
        }
        Unique = [...new Set(DistanceList)];

        Unique.sort();
        $('.results-container').empty();

        for (i = 0; i < 5; i++){
            console.log(Unique[i]);
            let parkDiv = createParkResults(response[i]);

            $('.results-container').append(parkDiv );
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

    // event handler for Rest. search

    $(document).on("click", ".park", function(){
        const c = 10;
        var zomatoApiKey = 'f56d7ccb219fb8cce1bdc7e70b526b2f';
        var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_type=city&count=" + c + "&";
        queryURL += 'lat=' + currentLat + '&lon=' + currentLon;

        $.ajax({
            method: "GET",
            url:queryURL,
            headers: { "user-key": zomatoApiKey },
        })
        .then(function(response){
            console.log(response);
            $("#restaurants").text(JSON.stringify(response));
        });
    })
});


  
  
