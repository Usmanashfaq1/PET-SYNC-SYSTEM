const connection = require('../../config');
const Model = require('../../model/signupModel');
const signupModel = new Model();
class signupController{
    displaySignUpPage (req,res)
    {
        return res.render('signupView',{msg:null});
    }

    UserInfofun (req,res)
    {
        signupModel.UserInfo(req,res);
        res.redirect('/');
    } 
}

module.exports = signupController;

