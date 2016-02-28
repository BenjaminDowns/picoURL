var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var path = require('path');
var port = process.env.PORT || 8080;
// registering the two services
var PicoMakerService = require('./server/PicoMakerService.js');
var PicoRedirects = require('./server/PicoRedirects');

console.log("STARTING UP!")
// middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.ico'));

app.set('views', __dirname + 'public');

// routes
app.get('/new/:url', PicoMakerService);

app.get('/:url', PicoRedirects);

app.get('/', function(req, res) {
    res.render('index');
});

app.listen(port);
console.log("listening on port " + port)