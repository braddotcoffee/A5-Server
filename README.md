For my technical achievement, I have both utilized the IMDB API 
listed on the course website in order to gether information 
about the movies returned by the search, and implemented a sort of 
"smarter search" that ranks results first by number of terms of the 
query that are matched, and secondly by the index at which the first 
matching term was found. In order to do this, I had to make the IMDB requests synchronous,
otherwise there was no way of ensuring that the HTML would be written in the correct
order. In order to make this happen, I utilized a library called deasync that would
allow me to stall node.js until one function completed. 
