var sqlite = require('sqlite3');
var fs = require('fs');
var db = new sqlite.Database('movies');

var filestream = fs.createReadStream('initial_movies.txt');

var data = '';
filestream.on('data', function(c){
	data = data + c;
});

filestream.on('end', function(){
	data = data.split('\n');
	console.log(data);
	
	db.serialize(function(){
		db.run("CREATE TABLE movies (title varchar(100), rating varchar(10))");
		data.forEach(function(d){
			if(d){
				db.run("INSERT INTO movies VALUES ('"+d+"', 'N/A')");
			}
		});

		db.close();
	});
});


