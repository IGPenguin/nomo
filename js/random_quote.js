var tweet;

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "data/quotes_v2.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
});

function processData(allText) {
  var allTextLines = allText.split(/\r\n|\n/);
  var headers = allTextLines[0].split(';');
  var lines = [];

  for (var i=1; i<allTextLines.length; i++) {
      var data = allTextLines[i].split(';');
      if (data.length == headers.length) {

          var tarr = [];
          for (var j=0; j<headers.length; j++) {
              tarr.push(headers[j]+":"+data[j]);
          }
        lines.push(tarr);
    }
}
    var quoteCount = lines.length;
    var quoteIndex = generateRandomInteger(quoteCount);
    var selectedLine = String(lines[quoteIndex]);

    var selectedTopicWithKey = String(selectedLine.split(",")[1]);
    var selectedTopic = String(selectedTopicWithKey.split(":")[1]);

    var selectedTitleWithKey = String(selectedLine.split(",")[3]);
    var selectedTitle = String(selectedTitleWithKey.split(":")[1]);

    var selectedTextWithKey = String(selectedLine.split(",")[4]);
    var selectedText = String(selectedTextWithKey.split(":")[1]);

    var selectedEmojiWithKey = String(selectedLine.split(",")[2]);
    var selectedEmoji = String(selectedEmojiWithKey.split(":")[1]);

    //function updateHtmlComponents
    document.getElementById('id_emoji').innerHTML = selectedEmoji;
    document.getElementById('id_title').innerHTML = selectedTitle;
    document.getElementById('id_text').innerHTML = selectedText;
    document.getElementById('id_topic').innerHTML = "- " + selectedTopic;

    tweet = String(selectedEmoji + " " + selectedTitle + "\n\n" + selectedText).replaceAll("<br>","\n");
}

function generateTweet(){
  var url = "http://twitter.com/intent/tweet?url=https://intergalacticpenguin.github.io/stashboard&text=";
  //window.open("https://www.w3schools.com");
  window.open(url+encodeURIComponent(tweet));
}

function generateRandomInteger(max) {
    return Math.floor(Math.random() * max);
}
