module.exports.home = function(req, res){
    //return res.end('<h1>Express Home controller</h1>');
    return res.render("Home", {title : 'Home'});
};

module.exports.profile = function(req, res){
    return res.render("profile", {title : 'Profile'});
};