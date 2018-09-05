$(document).ready(function(){

var buttonArray = ['happy', 'sad', 'angry', 'funny', 'depressed', 'joyous', 'excited', 'jubilant', 'frustrated', 'annoyed', 'surprised', 'horrified', 'shocked', 'stunned', 'motivated', 'confused', 'relaxed'];

function makeDefaultButtons(){
    for (let i=0; i<buttonArray.length; i++){
        var btn = $('<button>').attr("value", buttonArray[i]).text(buttonArray[i]);
        btn.addClass("gif-maker");
        $("#buttons-go-here").append(btn);
    }
}

makeDefaultButtons();



// var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag="+searchTerm;


$("#submit").on("click", function(event){
    event.preventDefault();
    var btn = $('<button>').attr("value", $("#newButton").val()).text($("#newButton").val());
    btn.addClass("gif-maker");
    $("#buttons-go-here").append(btn);
    $("#newGif").find('input:text').val("");
})

$(document).on("click", ".gif-maker", function(){
    $("#gifs-go-here").empty();
    var searchTerm = $(this).val();
    console.log(searchTerm);
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=10&q="+searchTerm;
   
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response)
        var data = response.data;
        for (let i=0; i< data.length; i++){
            var div = $("<div class='gif-div'>");
            var img = $("<img src>");
            var stillURL = data[i].images.fixed_height_still.url;
            var animateURL = data[i].images.fixed_height.url;
            var rating = $("<p>").text("Rating: " + data[i].rating);
            img.attr("src", stillURL).attr("data-still", stillURL).attr("data-animate", animateURL);
            div.append(rating, img);
            $("#gifs-go-here").prepend(div);
        }
    });
})

$(document).on("click", "img", function(){
    if ($(this).attr("src") === $(this).attr("data-still")){
        $(this).attr("src", $(this).attr("data-animate"));
    }
    else{
        $(this).attr("src", $(this).attr("data-still"));
    }


})


})//ends document ready function