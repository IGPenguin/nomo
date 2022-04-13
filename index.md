---
layout: default
---
<meta name="twitter:card" content="summary" />
<meta name="twitter:site" content="{{ page.title }}" />
<meta name="twitter:title" content="{{ page.title }}" />
<meta name="twitter:image" content="{{ page.title_image }}" />

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<br>
<p align="center">
<h2>💬 Welcome to Hmm!</h2>
<small>Your daily dose of soft skill progress.</small>

<br><br><br>

<center>
<div class="card">
<h1 id = "id_emoji"/><h2 id = "id_title"/>
<h4 id = "id_text"/>
<br>
<h5 id = "id_topic"/>
</div>
<h2><br></h2>
<script src="js/random_quote.js"></script>
<button type = "button" id = "button" onClick="window.location.reload();">♻️ Show another!</button>
&emsp;
<button type = "button" id = "button_tweet" onClick="generateTweet();">🦆 Tweet it!</button>
<br><br>
<button type = "button" id = "button_report" onClick="reportIssue();">⚠️ Something is wrong!</button>
</center>
</p>
