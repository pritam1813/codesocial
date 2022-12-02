module.exports.profile = function(req, res){
    return res.render('Users', {
        title : 'User123'
    });
};

module.exports.edit = function(req, res){
    return res.end('<h1>Edit your profile</h1>');
};

module.exports.default = function(req,res){
    return res.end('profile');
};

module.exports.signup = function(req, res){
    return res.render('SignUp', {
        title: 'Codesocial | SignUp'
    });
};

module.exports.login = function(req, res){
    return res.render('Login', {
        title: 'Codesocial | Login'
    });
};

//Getting Sign Up data
module.exports.create = function(req,res){
    
};

//Validating Sign In data
module.exports.create_session = function(req,res){

};