var app = require('../app.js');
var random = require("random-js")();
var db = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/picoLink'
var mongo = require('mongodb').MongoClient;


module.exports = function (req, res) {
    var url = req.originalUrl.slice(5)
    var appPath = 'picolink.herokuapp.com/'
    
    console.log(url)
    var encodedURL = encodeURIComponent(url);
   
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var isURL = new RegExp(expression);
       
    if (!isURL.test(encodedURL)) {
        res.send({error: "it appears you did not send a URL"});
        return null;
    }
    
    var picoLink = random.string(5);
    var newDoc = {
        original: url,
        picoLink: appPath + picoLink
    };

    // checks to see if the original is in the db already    
    function findOrMakeURL() {
        mongo.connect(db, function (err, db) {
            if (err) {
                return err;
            } else {
                db.collection('shortened')
                    .find({
                        original: url
                    })
                    .toArray(function (err, documents) {
                        if (err) throw err;
                        if (documents.length < 1) {
                            saveNewPico(newDoc)
                            return true;
                        } else {
                            // send the already-stored urls
                            res.send({
                                original: documents[0].original,
                                picoLink: documents[0].picoLink
                            });
                            db.close();
                            return false;
                        }
                    }); // end toArray  
            } // end else
        });
    };// END findOrMakeURL

    function saveNewPico(newDoc) {
        mongo.connect(db, function (err, db) {
            if (err) throw err
            else {
                db.collection('shortened')
                    .insert(newDoc, function (err, result) {
                        if (err) throw err
                        res.send({
                            original: newDoc.original,
                            picoLink: newDoc.picoLink
                        })
                        db.close()
                    })
            }
        }); // end mongo.connect
    } // end sendNewPico
    
    findOrMakeURL();


} // end module.export