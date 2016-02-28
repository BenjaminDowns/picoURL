var db = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/picoLink'
var mongo = require('mongodb').MongoClient;
var domain = 'picolink.herokuapp.com/'

module.exports = function (req, res) {
   
    var url = req.params.url.toString()
    picoLink = domain + url
    
    function connect() {
        mongo.connect(db, function (err, db) {
            if (err) throw err
            getURL(db, function (doc) {
                if (doc == null) {
                    res.send({ error: "No shortened URL found."})
                } else {
                /^https?.*/i.test(doc.original) ? res.redirect(doc.original) : res.redirect('http://' + doc.original)             
                }
                db.close()
            })
        }); // end of mongo connect
    }

    function getURL(db, callback) {
        db.collection('shortened')
            .findOne({ 'picoLink': picoLink }
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