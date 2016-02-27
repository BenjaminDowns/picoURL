var app = require('../app.js')
var random = require("random-js")();

module.exports = function (req, res) {
    var appPath = "http://www.picoURL.herokuapp.com/"
    var counter = 4;
    var url = req.params.url;
    var picoURL = random.string(counter);
    picoURLunique = false
    
    while (picoURLunique === false) {
        // query database looking for picoURL; if found, then generate a new one
        
        picoURL = random.string(counter+1);
        picoURLunique = true;
    }
    
    res.send({ original: url,
    picoURL: appPath + picoURL
    })
    // insert key into database
    
    
    // res.send JSON with the original url and the picoURL
    
};