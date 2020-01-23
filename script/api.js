$(document).ready(function(){
    $('#search').click(function() {
        var inputText = $('.validate').val();
        var queryURL = "https://data.seattle.gov/resource/j9km-ydkc.json?name=" + inputText;
        var results = $('#results');
        
        $.ajax({
            url:queryURL,
            method:"GET"
        }).then(function(response){
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
            newfeaturesList.forEach(element => $("#parkfeatures").append("<option value=\""+element+"\">"+element+"</option>"));   
})

// $('.park-search').click(function() {
//     var inputText = $('#search-input').val();
//     console.log(inputText);
//     var queryURL = "https://data.seattle.gov/resource/j9km-ydkc.json?name=" + inputText;
//     var results = $('#results');
    
//     $.ajax({
//         url:queryURL,
//         method:"GET"
//     }).then(function(response){
//         var responseString = JSON.stringify(response);
//         results.text(responseString);
//     });
// });
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
  });