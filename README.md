<!DOCTYPE HTML>
<html>
<head>
<title>README</title>
<link rel='stylesheet' type='text/css' href='/css/style.css'>
</head>
<body>
<h1>README</h1>
<p>

For A4 I have built upon my submission for A3 in order to create a self-expanding movie database. The idea is this - any time that a person searches for a movie,
it first searches an SQLite database in an attempt to find the movie. If it does not find a perfect match, then it will search IMDb via the API and stores the data
found. This data persists on the database, which will allow the search to (ideally) go faster the next time that the search is made. The "manage" page allows for manually
altering this database, adding entries and removing them at will. All of the database entries are clickable to search for more information about that movie, and related movies
on either the manage page or the search page. </p>

<p>

In order to properly manage callbacks of multi-level requests (database then IMDb) I utilized a library called Async that allows for two callbacks in certain scenarios -
such as a callback on each iteration of a map, and a callback after ALL iterations have completed. 

</p>

<div class="links-div">
<a href="/README.md" class="links">README</a>|<a href="/" class="links">Search</a>|<a href="/manage/" class="links">Manage</a>
</div>
</body>

</html>
