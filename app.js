var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 8080;
// registering the two services
var PicoMakerService = require('./server/PicoMakerService.js');
var PicoRedirects = require('./server/PicoRedirects');
var url = 'mongodb://localhost:27017/picoURL'

var mongo = require('mongodb').MongoClient
mongo.connect(url)

var mongo = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/learnyoumongo'
var result
mongo.connect(url, function (err, db) {
    if (err) {
        return err
    } else {
        var testAge = parseInt(process.argv[2])
        result = db.collection('parrots')
            .find({
                age: {
                    '$gt': testAge 
                    }
            })
            .toArray(function (err, documents) {
                if (err) throw err
                console.log(documents)
                db.close()
            })
    }
})







// middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + 'public');

// routes
app.get('/new/:url', PicoMakerService);

app.get('/:url', PicoRedirects);

app.get('/', function(req, res) {
    res.render('index');
});

app.listen(port);