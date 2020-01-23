$(document).ready(function(){
    $('#search').click(function() {
        var inputText = $('.validate').val();
        var queryURL = "https://data.seattle.gov/resource/j9km-ydkc.json?name=" + inputText;
        var results = $('.results-container');
        
        $.ajax({
            url:queryURL,
            method:"GET"
        }).then(function(response){
            var responseString = JSON.stringify(response);
            results.text(responseString);
            console.log(response);
        });
    });
  });