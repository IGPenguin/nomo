$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "data/quotes.csv",
        dataType: "csv",
        success: function(data) {processData(data);}
     });
});

function processData(allText) {
    console.log(generateRandomInteger(10))
    alert(generateRandomInteger(10))
}

function generateRandomInteger(max) {
    return Math.floor(Math.random() * max) + 1;
}
