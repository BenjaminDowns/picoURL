var app = require('../app.js')
var random = require("random-js")();
var db = 'mongodb://localhost:27017/picoURL'
var mongo = require('mongodb').MongoClient
// mongo.connect(url)

module.exports = function (req, res) {
    var appPath = "http://www.picoURL.herokuapp.com/"
    var counter = 4;
    var url = req.params.url;
    var picoURL = random.string(counter);
    picoURLunique = false
    
   
    mongo.connect(db, function (err, db) {
         if (err) {
          return err
         } else {
          db.collection('shortened')
            .find({
                original: 'htt://www.google.com'
            })
            .toArray(function (err, documents) {
                if (err) throw err
                result = documents
                if (documents.length < 1) {
                  console.log('here')
                  db.close();
                  res.send({ original: url,
                            picoURL: appPath + picoURL
                           })
                    }
                    else {
                        res.send({result: result, message: 'found this one'})
                    }
                })  
          } // end else
                // picoURLunique = true;
    })// end mongodb call
       
        // query database looking for picoURL; if found, then generate a new one
    //     while (picoURLunique === false) {
    //     picoURL = random.string(counter+1);
    //     picoURLunique = true;
    // }
    // insert key into database
    
    // res.send JSON with the original url and the picoURL
    

    
};