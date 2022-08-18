var seenIDsString = JSON.parse(localStorage.getItem("seenIDs"));
var seenIDs;
var quoteCount;

if (seenIDsString == null){
  seenIDs = [];
} else {
  seenIDs = Array.from(seenIDsString);
}

//seenIDs = Array.from(Array(102).keys()) //Uncomment and change the int for testing ids higher than that 
console.log("Already seen IDs: " + seenIDs);

var tweet;
var lines;
var randomTopicIndex;

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
  lines = [];

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
  redraw();
}

function redraw(){
  quoteCount = lines.length;
  var quoteIndex = getUnseenTopicIndex(quoteCount);
  selectedLine = String(lines[quoteIndex]);

  var selectedTopicWithKey = String(selectedLine.split(",")[1]);
  selectedTopic = String(selectedTopicWithKey.split(":")[1]);

  var selectedTitleWithKey = String(selectedLine.split(",")[3]);
  var selectedTitle = String(selectedTitleWithKey.split(":")[1]);

  var selectedTextWithKey = String(selectedLine.split(",")[4]);
  var selectedText = String(selectedTextWithKey.split(":")[1]);

  var selectedEmojiWithKey = String(selectedLine.split(",")[2]);
  var selectedEmoji = String(selectedEmojiWithKey.split(":")[1]);

  tweet = String(selectedEmoji + " " + selectedTitle + "\n\n").replaceAll("<br>"," ") + String(selectedText).replaceAll("<br>","\n") + "\n\nLearn more about" + " " + selectedTopic + " at:";

  document.getElementById('id_emoji').innerHTML = selectedEmoji;
  document.getElementById('id_title').innerHTML = selectedTitle;
  document.getElementById('id_text').innerHTML = selectedText;
  document.getElementById('id_topic').innerHTML = "- " + selectedTopic;

  //var picker = document.getElementById('select_topic');
  //picker.innerHTML = selectedTopic + " ▾";
  //picker.add(new Option(selectedTopic));
}

function generateTweet(){
  var url = "http://twitter.com/intent/tweet?url=https://igpenguin.github.io/hmm&text=";
  window.open(url+encodeURIComponent(tweet));
}

function reportIssue(){
  window.open("https://github.com/IGPenguin/hmm/issues");
}

function sameTopic(){
  alert("Function not implemented yet, stay tuned.")
}

function getUnseenTopicIndex(max) {
    do {
      randomTopicIndex = Math.floor(Math.random() * max);
      if (seenIDs.length >= quoteCount){
        alert("Great job! You've seen it all.\nReshuffling list of " + seenIDs.length + " items...")
        localStorage.setItem("seenIDs", JSON.stringify(""));
        seenIDs = [];
        break;
      }
    } while (seenIDs.includes(randomTopicIndex));
    seenIDs.push(randomTopicIndex);
    localStorage.setItem("seenIDs", JSON.stringify(seenIDs));
    return randomTopicIndex;
}
