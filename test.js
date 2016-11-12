var sqlite = require('sqlite3');

var db = new sqlite.Database('movies');

db.all('SELECT * FROM movies ORDER BY RANDOM() LIMIT 5', function(error, row){
	console.log(row);

});
