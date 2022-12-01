module.exports.home = function(req, res){
    //return res.end('<h1>Express Home controller</h1>');
    return res.render('../views/Home', {title : 'Codesocial'});
};

module.exports.profile = function(req, res){
    return res.end('This is profile page');
};