module.exports.home = function(req, res){
    return res.end('<h1>Express Home controller</h1>');
};

module.exports.profile = function(req, res){
    return res.end('This is profile page');
};