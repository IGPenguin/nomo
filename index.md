---
layout: default
---
<meta name="twitter:card" content="summary" />
<meta name="twitter:site" content="{{ page.title }}" />
<meta name="twitter:title" content="{{ page.title }}" />
<meta name="twitter:image" content="{{ page.title_image }}" />

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="js/random_quote.js"></script>

<center>

<h2>💬&nbsp;&nbsp;Welcome to the Hmm!</h2>
<h4 id = "id_subtitle" >Keep learning, you still have X cards left.</h4>
<p style="margin:24px;"></p>


<div class="card">
<h1 id = "id_emoji"/><h2 id = "id_title"/>
<h4 id = "id_text"/>
<br>
<h5 id = "id_topic"/>
</div>

<p style="margin:28px;"></p>

<button type = "button" id = "button_previous" onClick="previousItem();">⏪&nbsp;&nbsp;Back</button>&nbsp;
<button type = "button" id = "button" onClick="window.location.reload();">♻️&nbsp;&nbsp;Randomize</button>&nbsp;
<button type = "button" id = "button_next" onClick="nextItem();">Next&nbsp;&nbsp;⏩</button>&nbsp;
<p style="margin:10px;"></p>

<button type = "button" id = "button_tweet" onClick="generateTweet();">🦆&nbsp;&nbsp;Tweet!</button>&nbsp;
<button type = "button" id = "button_report" onClick="reportIssue();">⚠️&nbsp;&nbsp;Misleading.</button>
</center>
