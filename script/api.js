
$(document).ready(function(){
    var queryURL = "https://data.seattle.gov/resource/j9km-ydkc.json?";
    var results = $('.container');
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        
        var i;
        var featuresList = [];
        for (i = 0; i < response.length; i++) {
            featuresList.push(response[i]['feature_desc']);
            }
            featuresList.sort();
            var newfeaturesList = featuresList.filter(function(elem, index, self) {
                return index === self.indexOf(elem);
            });
            newfeaturesList.forEach(element => $("#features-input").append("<option value=\""+element+"\">"+element+"</option>"));
            

    
    
})});




$(document).ready(function(){
    $('.park-search').click(function() {
        var inputText = $('#search-input').val();
        console.log(inputText);
        var queryURL = "https://data.seattle.gov/resource/j9km-ydkc.json?name=" + inputText;
        var results = $('.container');
        
        $.ajax({
            url:queryURL,
            method:"GET"
        }).then(function(response){
            var responseString = JSON.stringify(response);
            results.text(responseString);
        });
    });
    $('.features-search').click(function() {
        var featureText = $('#features-input').val();
        console.log(featureText);
        var queryURL = "https://data.seattle.gov/resource/j9km-ydkc.json?feature_desc=" + featureText;
        var results = $('.container');
        $.ajax({
            url:queryURL,
            method:"GET"
        }).then(function(response){
            var responseString = JSON.stringify(response);
            results.text(responseString);
  });
})});