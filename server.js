var express = require('express');
var path = require('path');

var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/public')));

app.get('/index', function(req, res) {
  var query = req.query;
  var searchQuery = query.search;
  if (searchQuery === 'jaws') {
    res.send('jaws1, jaws2, jaws3');
  } else if (searchQuery === 'spaces') {
    res.send('spaces1, spaces news');
  } else {
    // Uh oh my server is gonna act irrationally here
    // What should I do?
    res.send('chair, table, tacos, funyuns, apple');
  }
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(port, function() {
  console.log('App is listening on port ' + port);
});
