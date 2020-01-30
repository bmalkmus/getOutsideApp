let selectParkLat;
let selectParkLong;
let parkCard;
let feat;
let parkP1;
let cardcount = 0


// creates park cards
$('input').on('focus', function() {
    $('label').hide();  
});

$('input').on('focusout', function() {
    if($('#icon_prefix').val().length == 0){
        $('label').show();
    }  
});

// Park Pics
(function($) {
    $.rand = function(arg) {
        if ($.isArray(arg)) {
            return arg[$.rand(arg.length)];
        } else if (typeof arg == "number") {
            return Math.floor(Math.random() * arg);
        } else {
            return 4;  // chosen by fair dice roll
        }
    };
})(jQuery);

var items = ["Assets/flower1.jpg", "Assets/flower2.jpg", "Assets/flower3.jpg", "Assets/flower4.jpg", "Assets/flower5.jpg",];



function createParkResults(parkObject){
    if (cardcount < 5){
    let parkDiv = $('<div>');
    $(parkDiv).addClass("park");
    $(parkDiv).addClass("card blue-grey darken-1");
    parkCard = $('<div>');
    $(parkCard).addClass("card-content white-text");
    $(parkDiv).append(parkCard);
    let parkSpan = $('<span>').text(parkObject.name);
    $(parkSpan).addClass("card-title");
    $(parkCard).append(parkSpan);
    let selectParkLong = $('<p>').text(parkObject.xpos);
    let selectParkLat = $('<p>').text(parkObject.ypos);
    $(selectParkLong).attr('style','display:none');
    $(selectParkLong).attr('class',"selectParkLong");
    $(selectParkLat).attr('style', 'display:none');
    $(selectParkLat).attr('class', "selectParkLat");
    let parkP2 = $('<p>').html('Hours: ' + parkObject.hours);
    $(parkCard).append(parkP2);
    let parkImgDiv = $('<div>');
    $(parkDiv).append(parkImgDiv);
    let parkImg = $('<img>');
    $(parkImg).addClass("imgSmall");
    $(parkImg).attr('src', $.rand(items));
    $(parkImg).attr('id', 'imgSmall');
    $(parkImg).attr('width', '200');
    $(parkImg).attr('height', '100');
    $(parkImg).attr('alt', 'Park Picture');
    $(parkImg).attr('src', $.rand(items));
    $(parkImgDiv).append(parkImg);
    $(parkDiv).append(selectParkLong);
    $(parkDiv).append(selectParkLat);
    
    return parkDiv;
    }
    
}

// Park Images
(function($) {
    $.rand = function(arg) {
        if ($.isArray(arg)) {
            return arg[$.rand(arg.length)];
        } 
        else if (typeof arg == "number") {
            return Math.floor(Math.random() * arg);
        } 
        else {
            return 4;  // chosen by fair dice roll
        }
    };
})

(jQuery);
var items = ["Assets/flower1.jpg", "Assets/flower2.jpg", "Assets/flower3.jpg", "Assets/flower4.jpg", "Assets/flower5.jpg",];

// creates restuarant cards
function createRestResults(restObject){
    let restDiv = $('<div>');
    $(restDiv).addClass("rest");
    $(restDiv).addClass("card light green darken-1");
    let restCard = $('<div>');
    $(restCard).addClass("card-content white-text");
    $(restDiv).append(restCard);
    let restSpan = $('<span>').text(restObject.restaurant.name);
    $(restSpan).addClass("card-title");
    $(restCard).append(restSpan);
    let restP1 = $('<p>').text('Cuisine :  ' + restObject.restaurant.cuisines);
    $(restCard).append(restP1);
    let restImgDiv = $('<div>');
    $(restDiv).append(restImgDiv);
    let restImg = $('<img>');
    $(restImg).addClass("imgSmall");
    $(restImg).attr('id', 'imgSmall');
    $(restImg).attr('width', '200');
    $(restImg).attr('height', '100');
    $(restImg).attr('src',restObject.restaurant.featured_image);
    $(restImg).attr('alt', 'Top Cuisine Picture Unavailable');
    $(restImgDiv).append(restImg);
    let restLink = $('<a>');
    $(restLink).attr('href', restObject.restaurant.url);
    $(restLink).attr('target', "_blank")
    $(restLink).text("Click here for more information on " + restObject.restaurant.name);
    $(restDiv).append(restLink);

    return restDiv;
}


$(document).ready(function(){

    let ClosestList
    var queryURL = "https://data.seattle.gov/resource/j9km-ydkc.json?"

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
    }

    else{
        errorPark();
    }
    // shuffle the parks list
    function shuffle(arr){

        var i = arr.length;
        var j;
        var temp;
        
        while(--i>0){
            j = Math.floor(Math.random()*(i+1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
        return arr;
    }  
    // function that fires if you type in a specific park
    $('#search').click(function() {
        var inputText = $('.validate').val();
        var queryURL = "https://data.seattle.gov/resource/j9km-ydkc.json?name=" + inputText;
        
        $.ajax({
            url:queryURL,
            method:"GET"
        })
        
        .then(function(response){
            $('.results-container').empty();

            $('#results').empty();
            $('#restaurants').empty();
            let searchparkDiv = createParkResults(response[0]);

            $('.results-container').append(searchparkDiv);

            let selectParkLat = response[0].ypos;
                let selectParkLong = response[0].xpos;
                const c = 5;
                var zomatoApiKey = 'f56d7ccb219fb8cce1bdc7e70b526b2f';
    
                var queryURL = "https://developers.zomato.com/api/v2.1/geocode?lat="+selectParkLat+"&lon="+selectParkLong+"&apikey=" + zomatoApiKey+"count="+c;
//     .then(function(response){
        
//         var i;
//         var featuresList = [];
//         for (i = 0; i < response.length; i++) {
//             featuresList.push(response[i]['feature_desc']);
//             }
//             featuresList.sort();
//             var newfeaturesList = featuresList.filter(function(elem, index, self) {
//                 return index === self.indexOf(elem);
//             });
//             newfeaturesList.forEach(element => $("#parkfeatures").append("<option value=\""+element+"\">"+element+"</option>"));   
// })



// $('#parkfeatures').change(function() {
//     var featureText = $('#parkfeatures').val();
//     var queryURL = "https://data.seattle.gov/resource/j9km-ydkc.json?feature_desc=" + featureText;
//     var results = $('.results-container');
//     $.ajax({
//         url:queryURL,
//         method:"GET"
//     }).then(function(response){
//         $('.results-container').empty();
//         $('#results').empty();
//         $('#restaurants').empty();
//         for (i = 0; i < response.length; i ++){
//             let parkDiv = createParkResults(response[i]);
//             $('.results-container').append(parkDiv);
//         }
// });


    
                $.ajax({
                    method: "GET",
                    url:queryURL,
                    headers: { "user-key": zomatoApiKey },
                })

                .then(function(response){
                    $('#restaurants').empty();
                    let closeRests = $('<h5>').text('The Closest Restaurants to the Searched Park');
                    $('#restaurants').append(closeRests);
                

                    for (i = 0; i < 5; i++){
                        let restDiv = createRestResults(response.nearby_restaurants[i]);

                        $('#restaurants').append(restDiv);
                    }
                });
            

        });
    });
     
    // If location is allowed, this function runs
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
    
            $.ajax({
                url:queryURL,
                method:"GET"
            })
        
            .then(function(response){
                let closePark = $('<h5>').text('The Closest Park to your Current Location');
                $('#results').append(closePark);
                feat = new Array();
                for (i = 0; i < response.length; i++){   
                    feat.push(" " + response[i].feature_desc);
                }
                let closestparkDiv = createParkResults(response[0]);
                parkP1 = $('<p>').text('Features: ' + feat);
                parkDist = $('<p>').text('Distance to Park: ' + roundedDist + ' miles')
                $(parkCard).append(parkP1);
                $(parkCard.append(parkDist));
                $('.results-container').append(closestparkDiv);

                let selectParkLat = response[0].ypos;
                let selectParkLong = response[0].xpos;
                const c = 5;
                var zomatoApiKey = 'f56d7ccb219fb8cce1bdc7e70b526b2f';
    
                var queryURL = "https://developers.zomato.com/api/v2.1/geocode?lat="+selectParkLat+"&lon="+selectParkLong+"&apikey=" + zomatoApiKey+"count="+c;

    
                $.ajax({
                    method: "GET",
                    url:queryURL,
                    headers: { "user-key": zomatoApiKey },
                })

                .then(function(response){
                    $('#restaurants').empty();
                    let closeRests = $('<h5>').text('The Closest Restaurants to the Closest Park');
                    $('#restaurants').append(closeRests);
                

                    for (i = 0; i < 5; i++){
                        let restDiv = createRestResults(response.nearby_restaurants[i]);

                        $('#restaurants').append(restDiv);
                    }
                });

            });
        });

  

        $('input').on('focus', function() {
            $('label').hide();  
        });
    
        $('input').on('focusout', function() {
            if($('#icon_prefix').val().length == 0){
                $('label').show();
            }  
            // if user did not select a feature, basic search function is applied
    if($("#parkfeatures option:selected").text() === "No Preference"){
        //     console.log($("#parkfeatures option:selected").text());
        $('.results-container').empty();


        // Function fires when there is a change in the dropdown menus
        $(".dropdown").change(function getResults(){
            cardcount = 0;
            $('#restaurants').empty();
            $('#results').empty();
            $('.results-container').empty();
            top5Park = $('<h5>').text('Random 5 Parks Within Search Criteria');
            clickPrompt = $('<h6>').text('(Click Park for Restuarant Options)');
            $('#results').append(top5Park);
            $('#results').append(clickPrompt);
            var inputText =$('#maxDistance').val();
            console.log(inputText);
            var queryURL = "https://data.seattle.gov/resource/j9km-ydkc.json?"
        
            $.ajax({
                url:queryURL,
                method:"GET"
            })
        
            .then(function(response){
                // Created new variables "FeaturesList" and "CombinedList" to pull additional info from the location based results, 
                let DistanceList =[];
            // features list is used to pull the features to populate the drop down list
                let FeaturesList=[];
            // combined list saves the available parks in an arry with the format {park, feature, park2, feature2}
                let CombinedList=[];
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


                    if (dist > .001 && dist <= inputText){
                        DistanceList.push(response[i].name);
                        FeaturesList.push(response[i].feature_desc);
                        CombinedList.push(response[i].name,  " " +response[i].feature_desc);

    

        // console.log("feature chosen");
        // if a feature is chosen, its compared to the Combined list and prints the park name and feature
            let selectedFeature = $("#parkfeatures option:selected").text();
            for (i = 0; i < Unique.length; i++){
                let inputText = Unique[i];
                let queryURL = "https://data.seattle.gov/resource/j9km-ydkc.json?name=" + inputText;
                let results = $('.results-container');
            $.ajax({
                    url:queryURL,
                    method:"GET"
                })

                .then(function(response){
            for (i=0; i < response.length; i++){
                if (response[i].feature_desc === selectedFeature){
                            
                    let parkDiv = createParkResults(response[i]);
                        if(cardcount < 5){
                            let features = []
                            cardcount++; 
                                let park = response[i].name;
                                console.log(response[i]);
                            for (i = 0; i < CombinedList.length; i+=2){
                                if(CombinedList[i] === park){
                                    features.push(CombinedList[i+1])
                                }
                            }
                            parkP1 = $('<p>').text('Features: ' + features);
                            $(parkCard).append(parkP1);
                            
                        
                        $('.results-container').append(parkDiv);
                    };
                                
                
                        

                    DistanceList.push("No parks within your mile search of current location")
                }
                // filters out like values
                Unique = [...new Set(DistanceList)];
                UniqueFeatures =[...new Set(FeaturesList)];

                shuffle(Unique);
            // The below functions sort the retrieved features and append them to the drop down list
                UniqueFeatures.sort();
                UniqueFeatures.forEach(element => $("#parkfeatures").append("<option value=\""+element+"\">"+element+"</option>"));
    
        // if user did not select a feature, basic search function is applied
                if($("#parkfeatures option:selected").text() === "No Preference"){
                    $('.results-container').empty();

                    $('#restuarants').empty();
            
                    for (i = 0; i < 5; i++){
                        if(Unique[i] !== "Thornton Creek Park #1" || Unique[i] !== "Carkeek Park"){
                            let inputText = Unique[i];
                            let queryURL = "https://data.seattle.gov/resource/j9km-ydkc.json?name=" + inputText;
                    
                            $.ajax({
                                url:queryURL,
                                method:"GET"
                            })
                    
                            .then(function(response){
                                console.log(response);
                                feat = new Array();
                                let parkDiv = createParkResults(response[0]);
                                for (i = 0; i < response.length; i++){   
                                    feat.push(" " + response[i].feature_desc);
                                }
                                if(cardcount <5){
                                    cardcount++
                                    parkP1 = $('<p>').text('Features: ' + feat);
                                    $(parkCard).append(parkP1);
                                    $('.results-container').append(parkDiv);
                                }
                            });
                        }
                    }
                }

                else {
                // if a feature is chosen, its compared to the Combined list and prints the park name and feature
                    let selectedFeature = $("#parkfeatures option:selected").text();
                    for (i = 0; i < Unique.length; i++){
                        let inputText = Unique[i];
                        let queryURL = "https://data.seattle.gov/resource/j9km-ydkc.json?name=" + inputText;
                        $.ajax({
                            url:queryURL,
                            method:"GET"
                        })
                        .then(function(response){
                            for (i=0; i < response.length; i++){
                                if (response[i].feature_desc === selectedFeature){
                                    
                                    let parkDiv = createParkResults(response[i]);
                                    if(cardcount < 5){
                                        let features = []
                                        cardcount++; 
                                        let park = response[i].name;
                                            for (i = 0; i < CombinedList.length; i+=2) {
                                                if(CombinedList[i] === park){
                                                    features.push(CombinedList[i+1])
                                                    
                                                };
                                            }   
                                            
                                            parkP1 = $('<p>').text('Features: ' + features);
                                            $(parkCard).append(parkP1);
                                    
                                
                                            $('.results-container').append(parkDiv);

            


                                    }
                                }
                            }
                        })
                    }
                }
            })
        })

    // This function fires is there is a click on one of the parks to the left
        $(document).on("click",".park",function(){
            $('.park').removeClass('selectedDiv');
            console.log(this);
            $(this).addClass('selectedDiv');
            selectParkLat = $(this).children()[3].textContent
            selectParkLong =$(this).children()[2].textContent
            const c = 5;
            var zomatoApiKey = 'f56d7ccb219fb8cce1bdc7e70b526b2f';
            var queryURL = "https://developers.zomato.com/api/v2.1/geocode?lat="+selectParkLat+"&lon="+selectParkLong+"&apikey=" + zomatoApiKey+"count="+c;

            
            $.ajax({
                method: "GET",
                url:queryURL,
                headers: { "user-key": zomatoApiKey },
            })
            .then(function(response){
                $('#restaurants').empty();
                let closeRests = $('<h5>').text('The Closest Restaurants to the Selected Park');
                $('#restaurants').append(closeRests);

                for (i = 0; i < 5; i++){
                    let restDiv = createRestResults(response.nearby_restaurants[i]);
                    $('#restaurants').append(restDiv);
                }
            });
        });

    }
            

    

    // Function to run if there is an error in the geolocation
    function errorPark(){ 
        
        $('#restaurants').empty();
        $('#results').empty();
        $('.results-container').empty();
        top5Park = $('<h5>').text('Due to error in location, here are 5 random parks in Seattle');
        clickPrompt = $('<h6>').text('(Click Park for Restuarant Options)');
        $('#results').append(top5Park);
        $('#results').append(clickPrompt);
        let DistanceList = [];
        var queryURL = "https://data.seattle.gov/resource/j9km-ydkc.json?"
        
        $.ajax({
            url:queryURL,
            method:"GET"
        })
        .then(function(response){
            for (i = 0; i < response.length; i++){
                DistanceList.push(response[i].name);
                Unique = [...new Set(DistanceList)];
            }
            shuffle(Unique);
                console.log(Unique);
            for (j = 0; j < 5; j++){
                    if(Unique[j] !== "Thornton Creek Park #1" || Unique[i] !== "Carkeek Park"){
                        let inputText = Unique[j];
                        let queryURL = "https://data.seattle.gov/resource/j9km-ydkc.json?name=" + inputText;
                        $.ajax({
                            url:queryURL,
                            method:"GET"
                        })
                        .then(function(response){
                            feat = new Array();
                            let parkDiv = createParkResults(response[0]);
                            for (i = 0; i < response.length; i++){   
                                feat.push(" " + response[i].feature_desc);
                            }
                            parkP1 = $('<p>').text('Features: ' + feat);
                            $(parkCard).append(parkP1);
                            $('.results-container').append(parkDiv);

                        })
                    }
            }
            
        })
    }


// prompts for the different geolocation errors
    function errorFunction(error){
            switch(error.code) {
                case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.")
                errorPark();
                break;
                case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.")
                errorPark();
                break;
                case error.TIMEOUT:
                alert("The request to get user location timed out.")
                errorPark();
                break;
                case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.")
                errorPark();
                break;
            }

            $(document).on("click",".park",function(){
                $('.park').removeClass('selectedDiv');
                console.log(this);
                $(this).addClass('selectedDiv');
                selectParkLat = $(this).children()[3].textContent
                selectParkLong =$(this).children()[2].textContent
                const c = 5;
                var zomatoApiKey = 'f56d7ccb219fb8cce1bdc7e70b526b2f';
                var queryURL = "https://developers.zomato.com/api/v2.1/geocode?lat="+selectParkLat+"&lon="+selectParkLong+"&apikey=" + zomatoApiKey+"count="+c;
            
                
                $.ajax({
                    method: "GET",
                    url:queryURL,
                    headers: { "user-key": zomatoApiKey },
                })
                .then(function(response){
                    $('#restaurants').empty();
                    let closeRests = $('<h5>').text('The Closest Restaurants to the Selected Park');
                    $('#restaurants').append(closeRests);
                    for (i = 0; i < 5; i++){
                        let restDiv = createRestResults(response.nearby_restaurants[i]);
                        $('#restaurants').append(restDiv);
                    }
                });
            });
    }
});


