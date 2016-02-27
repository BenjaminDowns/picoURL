module.exports = function (res, req) {
    var url = res.params.url
    function isActiveSite(url) {
        var getRequest = _http.get(options, function (res) {
            return true;
        });
        getRequest.on('error', function (err) {
            return err;
        });
    }
    
    var result = isActiveSite(url)
    console.log(result)
    
    res.send('hello from the service');
};