var http = require('http')
	, fs   = require('fs')
	, qs   = require("querystring")
	, url  = require('url')
	, imdb = require('imdb-api')
	, port = 8080

// Add more movies! (For a technical challenge, use a file, or even an API!)
var movies = ['Jaws', 'Jaws 2', 'Jaws 3', 'Doctor Strange', "Star Wars", "The Jungle Book", "Batman vs. Superman", "The Hunger Games",
	"The Godfather", "Citizen Kane", "The Great Gatsby", "Breakfast Club", "Beetlejuice", "Lion King", "Hitchiker's Guide to the Galaxy", "Mulan", "Aladdin", "Tarzan", "Tangled",
	"Frozen", "Lord of the Rings", "Harry Potter", "Star Trek", "Fight Club", "A Beautiful Mind", "Rain Man", "The Departed", "The Bee Movie", "The Big Lebowski"]
movies = movies.sort();

var server = http.createServer (function (req, res) {
	var uri = url.parse(req.url)

	switch( uri.pathname ) {
			// Note the new case handling search
		case '/search':
			handleSearch(res, uri)
			break
			// Note we no longer have an index.html file, but we handle the cases since that's what the browser will request
		case '/':
			sendIndex(res)
			break
		case '/index.html':
			sendIndex(res)
			break
		case '/css/style.css':
			sendFile(res, 'css/style.css', 'text/css')
			break
		case '/js/scripts.js':
			sendFile(res, 'scripts.js', 'text/javascript')
			break
		default:
			res.end('404 not found')
	}

})  

server.listen(process.env.PORT || port)
console.log('listening on 8080')
var info;

imdb.getReq({ name: 'The Toxic Avenger' }, function(err, things) {
    info = things;
	console.log(things);
});
imdb.getReq({ name: 'Frozen' }).then(function(data) { console.log(data) });


// subroutines

// You'll be modifying this function
function handleSearch(res, uri) {
	var contentType = 'text/html'
	res.writeHead(200, {'Content-type': contentType})

	if(uri.query) {
		// PROCESS THIS QUERY TO FILTER MOVIES ARRAY BASED ON THE USER INPUT
		var query = qs.parse(uri.query);
		query = query.search.split(" ");

		var results = [];
		query.forEach(function(q){
			results.push(movies.map(function(movie) {
				if(movie.toLowerCase().indexOf(q.toLowerCase()) > -1)
				{
					return movie;
				}
			}));
		});
		results = results.toString().split(",");
		results = results.filter(function(elem, index, self) {
			return index == self.indexOf(elem);
		});



		// Write HTML Results Page //
		var contentType = 'text/html';
		var html = '';

		html = html + "<head>";
		// Insert CSS Sheet Here //
		html = html + "<link rel='stylesheet' type='text/css' href='/css/style.css'/>";

		html = html + "</head>";

		html = html + "<body>";
		html = html + "<h1> RESULTS </h1>";
		html = html + "<div class='result-div'>";
		html = html + "<ul class='col'>";

		html = html + results.map(function(result){
			var info;
			if(result) {
				info = "<li class='results'>" + result + "</li>";
				imdb.getReq({name:'Frozen'}).then(function(data) {
					console.log(data);
					info = info + //"<li class='info'>Year: " + data._year_data + "</li>" +
						"<li class='info'>Rating: " + data.rated + "</li>" + 
						"<li class='info'>Runtime: " + data.runtime + "</li>";
					console.log(info);
					return info;
				});
			}
			console.log(info);
			return info;
		}).join(" ");
		html = html + "</ul>";
		html = html + "</div>";

		html = html + "<a href='/' class='links'>Search Again</a>";

		html = html + "</body>";
		html = html + "</html>";


		res.writeHead(200, {'Content-type': contentType})
		res.end(html, 'utf-8')
	} else {
		res.end('no query provided')
	}
}

// Note: consider this your "index.html" for this assignment
function sendIndex(res) {
	var contentType = 'text/html'
		, html = ''

	html = html + '<html>'

	html = html + '<head>'
	// You could add a CSS and/or js call here...
	html = html + "<link rel='stylesheet' type='text/css' href='/css/style.css'/>";
	html = html + '</head>'

	html = html + '<body>'
	html = html + "<div class='header'>";
	html = html + '<h1 id="header-text">Movie Search!</h1>'
	html = html + "</div>"

	// Here's where we build the form YOU HAVE STUFF TO CHANGE HERE
	html = html + '<form action="search" method="search" class="search">'
	html = html + '<input type="search" name="search" />'
	html = html + '<button type="search">Search</button>'
	html = html + '</form>'

	html = html + '<ul class="col">'
	// Note: the next line is fairly complex. 
	// You don't need to understand it to complete the assignment,
	// but the `map` function and `join` functions are VERY useful for working
	// with arrays, so I encourage you to tinker with the line below
	// and read up on the functions it uses.
	//
	// For a challenge, try rewriting this function to take the filtered movies list as a parameter, to avoid changing to a page that lists only movies.
	html = html + movies.map(function(d) { return '<li>'+d+'</li>' }).join(' ')
	html = html + '</ul>'

	html = html + '</body>'
	html = html + '</html>'

	res.writeHead(200, {'Content-type': contentType})
	res.end(html, 'utf-8')
}

function sendFile(res, filename, contentType) {
	contentType = contentType || 'text/html'

	fs.readFile(filename, function(error, content) {
		res.writeHead(200, {'Content-type': contentType})
		res.end(content, 'utf-8')
	})

}
