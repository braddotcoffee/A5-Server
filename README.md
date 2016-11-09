<!DOCTYPE HTML>
<html>
<head>
<title>README</title>
<link rel='stylesheet' type='text/css' href='/css/style.css'>
</head>
<body>
<h1>README</h1>
<p>



For my technical achievement, I have both utilized the IMDB API 
listed on the course website in order to gether information 
about the movies returned by the search, and implemented a sort of 
"smarter search" that ranks results first by number of terms of the 
query that are matched, and secondly by the index at which the first 
matching term was found. In order to do this, I had to make the IMDB requests synchronous,
otherwise there was no way of ensuring that the HTML would be written in the correct
 order. In order to make this happen, I utilized a library called deasync that would
 allow me to stall node.js until one function completed. </p>
 <p>
 Additionally, I have set up the search so that if the movie is not found in my small
 "database" listed, that it will search IMDB for the query. Additionally, if the query
 is only partially found, it will search IMDB as well.</p>

 <a href="/" class="links">Search Again</a>
 </body>

</html>
