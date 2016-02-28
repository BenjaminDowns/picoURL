var db = 'mongodb://localhost:27017/picoURL';
var mongo = require('mongodb').MongoClient;

module.exports = function (req, res) {

    var url = req.params.url.toString()
    // var result
    if (!url) {
        return null;
    }

    mongo.connect(db, function (err, db) {
        if (err) throw err
        getURL(db, function () {
            db.close()
            
        })
    }); // end of mongo connect
  
    function getURL(db, callback) {
        db.collection('shortened')
            .findOne({ 'picoURL': url }
            // ,{ original: 1 } use projection later
                , function (err, doc) {
                    if (err) throw err
                    console.log('doc')
                    res.redirect(doc['original'])
                    callback()
                });
    }
        
    // cursor.each(function (err, doc) {
    //     if (doc != null) {
    //         console.log('hello')
    //         console.dir(doc)
    //         res.redirect(doc.original)
    //         callback();
    //     } else {
    //         console.log('sorry, no url found')
    //         res.send(url + ' sorry, no url found')
    //         callback();
    //     }
    // });
    // end of getURL function
    
    
    
    
    // query database for url as key and redirect to value
    
    
    // res.redirect(result)
    // res.send('hello from the bottom line of the redirects module');
};