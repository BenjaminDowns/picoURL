var db = 'mongodb://localhost:27017/picoURL';
var mongo = require('mongodb').MongoClient;

module.exports = function (req, res) {

    var url = req.params.url.toString()

    function connect() {
        mongo.connect(db, function (err, db) {
            if (err) throw err
            getURL(db, function (doc) {
                res.redirect(doc.original)
                db.close()

            })
        }); // end of mongo connect
    }

    function getURL(db, callback) {
        console.log(req.url)
        db.collection('shortened')
            .findOne({ 'picoURL': url }
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
    
    // res.send('hello from the bottom line of the redirects module');
};