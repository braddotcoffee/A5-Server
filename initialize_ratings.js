var imdb = require('imdb-api')
	, sqlite = require('sqlite3')
	, deasync = require('deasync');

var db = new sqlite.Database('movies');

var movies = [];

db.each("SELECT * FROM movies", function(err, movie){
	movies.push(movie.title);
}, function(){
	movies.forEach(function(movie){
		imdb.getReq({name:movie}, function(error, data){
			if(data){
				db.run("UPDATE movies SET rating="+data.rating+" WHERE title='"+movie+"'");
			}
		});
	});
});
