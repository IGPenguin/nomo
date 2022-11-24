//Init
var redrawnTimes = 0;
var seenIDsString = JSON.parse(localStorage.getItem("seenIDs"));
var seenIDs;
var quoteCount;
var quoteIndex;

if (seenIDsString == null){
  seenIDs = [];
} else {
  seenIDs = Array.from(seenIDsString);
}

//Uncomment and change the int for testing ids higher than that
//seenIDs = Array.from(Array(130).keys())

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

//Functions

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
  redraw(getUnseenTopicIndex());
  registerClickListeners();
}

function redraw(index){
  redrawnTimes++;

  quoteIndex = index;
  selectedLine = String(lines[index]);

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

  markAsSeen(quoteIndex);
  setQuest();
  celebrateSeeingItAll();

  var itemsLeft = quoteCount-seenIDs.length;
  document.getElementById('id_subtitle').innerHTML = "Keep learning and discover other " + itemsLeft + " unique cards.";
}

function randomItem(){
  vibrateButtonPress();
  redraw(getUnseenTopicIndex());
}

function previousItem(){
  vibrateButtonPress();
  var previousItemIndex = quoteIndex-1;
  if (previousItemIndex < 0){
    previousItemIndex = quoteCount-1;
  }
  redraw(previousItemIndex);
}

function nextItem(){
  vibrateButtonPress();
  var nextItemIndex = quoteIndex+1;
  if (nextItemIndex > quoteCount-1){
    nextItemIndex = 0;
  }
  redraw(nextItemIndex);
}

function getUnseenTopicIndex() {
  quoteCount = lines.length;
  var max = quoteCount;
    do {
      randomTopicIndex = Math.floor(Math.random() * max);
      if (seenIDs.length >= quoteCount){
        celebrateSeeingItAll();
        break;
      }
    } while (seenIDs.includes(randomTopicIndex));
    return randomTopicIndex;
}

function markAsSeen(seenID){
  if (!seenIDs.includes(seenID)){
    seenIDs.push(seenID);
    localStorage.setItem("seenIDs", JSON.stringify(seenIDs));
    console.log("Already seen IDs: " + seenIDs);
  }
}

function generateTweet(){
  vibrateButtonPress();
  var url = "http://twitter.com/intent/tweet?url=https://igpenguin.github.io/nomo&text=";
  var noTagsTweet=tweet.replace("<b>","").replace("</b>","");
  window.open(url+encodeURIComponent(noTagsTweet));
}

function sayHello(){
  vibrateButtonPress();
  window.open("https://www.linkedin.com/in/intergalacticpenguin/");
}

function setQuest(){
  var questTarget = 4;
  var remainingcards = questTarget-redrawnTimes;
  var questText = "🔴"+"&nbsp;&nbsp;"+"<b>Daily Goal:</b> Inspect and think about " + remainingcards + " more cards."
  if (remainingcards <= 0) {questText = "🟢"+"&nbsp;&nbsp;"+"<b>Great job! </b> You are making the world a better place."}
  document.getElementById('id_quest_text').innerHTML = questText;
}

function vibrateButtonPress(){
  //Vibrate on button press on Android devices
  if (!("vibrate" in window.navigator)){
    console.log("Vibrate not supported!");
    return;
  }
  window.navigator.vibrate([5,20,10]);
}

function celebrateSeeingItAll(){
  if (seenIDs.length >= quoteCount){
    alert("🎉 Wow! You finally know everything.\nReshuffling " + seenIDs.length + " cards. Thanks for your support. ❤️")
    localStorage.setItem("seenIDs", JSON.stringify(""));
    seenIDs = [];
  }
}

function registerClickListeners(){
  //Essential, onTouchEnd event type usage is needed on mobile to enable vibration effects
  //Breaks interactions on loading the page using Dev Tools "mobile preview" followed by switching it off

  var eventType;
  if (!(navigator.userAgentData.mobile)){
    eventType = 'click';
  } else {
    eventType = 'touchend';
  }
  document.getElementById('button_previous').addEventListener(eventType, previousItem);
  document.getElementById('button').addEventListener(eventType, randomItem);
  document.getElementById('button_next').addEventListener(eventType, nextItem);
  document.getElementById('button_hello').addEventListener(eventType, sayHello);
  document.getElementById('button_tweet').addEventListener(eventType, generateTweet);
}
