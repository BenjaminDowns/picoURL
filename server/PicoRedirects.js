module.exports = function(req, res) {
    
    var url = req.params.url
    // query database for url as key and redirect to value
    
    
    // res.redirect(result)
    res.send('hello from the redirects module');
};