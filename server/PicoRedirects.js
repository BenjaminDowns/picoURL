var db = 'mongodb://localhost:27017/picoURL';
var mongo = require('mongodb').MongoClient;
var domain = 'localhost:8080/'

module.exports = function (req, res) {
   
    var url = req.params.url.toString()
    picoURL = domain + url
    
    function connect() {
        mongo.connect(db, function (err, db) {
            if (err) throw err
            getURL(db, function (doc) {
                if (doc == null) {
                    res.send({ error: "No shortened URL found."})
                } else {
                res.redirect('http://' + doc.original)
                }
                db.close()
            })
        }); // end of mongo connect
    }

    function getURL(db, callback) {
        db.collection('shortened')
            .findOne({ 'picoURL': picoURL }
            // ,{ original: 1 } use projection later
                , function (err, doc) {
                    if (err) throw err
                    callback(doc)
                });
    }

    if (!url || url == 'favicon.ico') {
        return null;
    } else {
        connect()
    }
    
};