var http = require('http')
	, fs   = require('fs')
	, qs   = require("querystring")
	, url  = require('url')
	, imdb = require('imdb-api')
	, HashMap = require('hashmap')
	, deasync = require('deasync')
	, port = 8080

// Add more movies! (For a technical challenge, use a file, or even an API!)
var movies = ['Jaws', 'Jaws 2', 'Jaws 3', 'Doctor Strange', "Star Wars", "The Jungle Book", "Batman vs. Superman", "The Hunger Games",
	"The Godfather", "Citizen Kane", "The Great Gatsby", "Breakfast Club", "Beetlejuice", "Lion King", "Hitchiker's Guide to the Galaxy", "Mulan", "Aladdin", "Tarzan", "Tangled",
	"Frozen", "Lord of the Rings", "Harry Potter", "Star Trek", "Fight Club", "A Beautiful Mind", "Rain Man", "The Departed", "The Bee Movie", "The Big Lebowski", "Guardians of the Galaxy", "Snakes on a Plane", "Pulp Fiction", "The Truman Show", "A Christmas Carol", "Sharknado", "Little Miss Sunshine", "Legends of the Fall", "The Fountain", "500 Days of Summer", "Iron Man"]
movies = movies.sort();
movies = movies.map(function(movie){
	return movie = movie + " ";	
});

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
		case '/README.md':
			sendFile(res, 'README.md', 'text/html');
			break;
		default:
			res.end('404 not found')
	}

})  

server.listen(process.env.PORT || port)
console.log('listening on 8080')
var info;
var hm = new HashMap();
var index = new HashMap();



// subroutines
var html = '';
var count = 0;

function sort(results_sort, results, delta) {
	// Sort Array Based on Values //
	results_sort.sort(function(first, second) {
		if(delta == 1)
		{
			return second[1] - first[1];
		}
		else
		{
			return first[1] - second[1];
		}
	});

	results = results_sort.map(function(subarray) {
		return subarray[0];
	});
	return results;	
}

function firstSort(hashmap, results, delta)
{
	// Make Array out of Dictionary //
	var results_sort = [];
	hashmap.forEach(function(value, key){
		results_sort.push([key, value]);
	});
	return sort(results_sort, results, delta);	
}

function secondSort(hashmap, results, delta)
{
	var results_sort = [];
	results.forEach(function(result) {
		results_sort.push([result, hashmap.get(result)]);
	});
	return sort(results_sort, results, delta);
}
function imdbQuery(query_copy)
{
	imdb.getReq({name:query_copy}, function(error, data) {
		if(error)
		{
			console.error("DATA NOT FOUND",query_copy);
			info = "<li class=results'>" + query_copy+ "</li>";
			info = info + "<li class='info'>No Information Found</li>";
		}
		else
		{
			info = "<li class='results'>" + query_copy + "</li>";
			info = info + 
				"<li class='info'>Director: " + data.director + "</li>" + 
				"<li class='info'>Year: " + data._year_data + "</li>" +
				"<li class='info'>Rating: " + data.rated + "</li>" + 
				"<li class='info'>Runtime: " + data.runtime + "</li>";
		}

	});
	while(info === undefined){
		deasync.runLoopOnce();			
	}
	html = html + info;

}

// You'll be modifying this function
function handleSearch(res, uri) {
	html = '';
	info = undefined;
	hm = new HashMap();
	index = new HashMap();
	var contentType = 'text/html'
	res.writeHead(200, {'Content-type': contentType})

	if(uri.query) {
		// PROCESS THIS QUERY TO FILTER MOVIES ARRAY BASED ON THE USER INPUT
		var query = qs.parse(uri.query);
		var query_copy = query.search;
		console.log(query_copy);
		query = query.search.split(" ");
		query = query.map(function(q){
				return q = q + " ";
		});

		var results = [];
		query.forEach(function(q){
			results.push(movies.map(function(movie) {
				var i = movie.toLowerCase().indexOf(q.toLowerCase());
				if(i > -1)
				{
					if(!index.has(movie))
					{
						index.set(movie, i); 						
					}
					return movie;
				}
			}));
		});
		results = results.toString().split(",");


		results.forEach(function(result)
			{
				if(hm.has(result))
				{
					hm.set(result, hm.get(result)+1);
				}	
				else
				{
					hm.set(result, 1);
				}
			});
		results = firstSort(index, results, -1);
		results = secondSort(hm, results, 1);
		
		count = results.length;


		// Write HTML Results Page //
		var contentType = 'text/html';

		html = html + "<head>";
		// Insert CSS Sheet Here //
		html = html + "<link rel='stylesheet' type='text/css' href='/css/style.css'/>";

		html = html + "</head>";

		html = html + "<body>";
		html = html + "<h1> RESULTS </h1>";
		if (count >= 5)
		{
			html = html + "<a href='/' class='links'>Search Again</a>";
		}
		html = html + "<div class='result-div'>";
		html = html + "<ul class='col'>";

		if(hm.get(results[0]) < query.length)
		{
			//imdbQuery(query_copy);
		}
		if (count <= 0)
		{
			imdbQuery(query_copy);
			completeHTML(res,contentType);
		}
		results.map(function (result){
			var info;

			if(result) {
				imdb.getReq({name:result},function(error, data) {
					if(error)
					{
						info = "<li class=results'>" + result + "</li>";
						info = info + "<li class='info'>No Information Found</li>";
					}
					else
					{
						info = "<li class='results'>" + result + "</li>";
						info = info + 
							"<li class='info'>Director: " + data.director + "</li>" + 
							"<li class='info'>Year: " + data._year_data + "</li>" +
							"<li class='info'>Rating: " + data.rated + "</li>" + 
							"<li class='info'>Runtime: " + data.runtime + "</li>";
					}

				})
				while(info === undefined){
					deasync.runLoopOnce();			
				}
				html = html + info;
			};
		})
		completeHTML(res, contentType);
	}
}

function reqCallback(error, data)
{
	if(error)
	{
		console.error("DATA NOT FOUND",this.result);
		html = html + "<li class=results'>" + this.result + "</li>";
		html = html + "<li class='info'>No Information Found</li>";
		callbackSync(this.res, this.contentType);
	}
	else
	{
		html = html + "<li class='results'>" + this.result + "</li>";
		html = html + 
			"<li class='info'>Director: " + data.director + "</li>" + 
			"<li class='info'>Year: " + data._year_data + "</li>" +
			"<li class='info'>Rating: " + data.rated + "</li>" + 
			"<li class='info'>Runtime: " + data.runtime + "</li>";
		callbackSync(this.res, this.contentType);
	}
}

function completeHTML(res, contentType){
	html = html + "</ul>";
	html = html + "</div>";

	html = html + "<a href='/' class='links'>Search Again</a>";

	html = html + "</body>";
	html = html + "</html>";


	res.writeHead(200, {'Content-type': contentType})
	res.end(html, 'utf-8')
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
	html = html + movies.map(function(d) { return '<li class="searchable"><a href="/search?search='+d+'">'+d+'</a></li>' }).join(' ')
	html = html + '</ul>'
	html = html + "<a href='/README.md' class='links'>README</a>";

	html = html + '</body>'
	html = html + '</html>'

	res.writeHead(200, {'Content-type': contentType})
	res.end(html, 'utf-8')
	html = "";
}

function sendFile(res, filename, contentType) {
	contentType = contentType || 'text/html';

	fs.readFile(filename, function(error, content) {
		res.writeHead(200, {'Content-type': contentType})
		res.end(content, 'utf-8')
	})

}
