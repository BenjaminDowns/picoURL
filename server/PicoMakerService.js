var app = require('../app.js');
var random = require("random-js")();
var db = 'mongodb://localhost:27017/picoURL';
var mongo = require('mongodb').MongoClient;
// mongo.connect(url)

module.exports = function (req, res) {

    var appPath = "http://www.picoURL.herokuapp.com/";
    var url = req.params.url;
    
    if (!url) {
        return null;
    }
    
    var picoURL = random.string(5);
    var newDoc = {
        original: url,
        picoURL: appPath + picoURL
    };

    // checks to see if the original is in the db already    
    function findOrMakeURL() {
        mongo.connect(db, function (err, db) {
            if (err) {
                return err;
            } else {
                console.log('checking for original')
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
                            console.log('trying to send documents')
                            console.log(documents)
                            res.send(documents);
                            db.close();
                            return false;
                        }
                    }); // end toArray  
            } // end else
        });
    };// END findOrMakeURL

    function saveNewPico(newDoc) {
        console.log('trying to insert new document')
        mongo.connect(db, function (err, db) {
            if (err) throw err
            else {
                db.collection('shortened')
                    .insert(newDoc, function (err, result) {
                        if (err) throw err
                        res.send({
                            original: newDoc.original,
                            picoURL: newDoc.picoURL
                        })
                        db.close()
                    })
            }
        }); // end mongo.connect
    } // end sendNewPico
    
    findOrMakeURL();


} // end module.export