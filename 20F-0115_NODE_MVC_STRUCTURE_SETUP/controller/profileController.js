const connection = require('../config');


class profileController{
    displayUserProfile(req,res){
        
        if(req.session.num!=null && typeof req.session.num!="undefined")
        {
            console.log("LoggedIn "+req.session.num);
            var name=req.session.username;
           
            return res.render('userProfileView',{name}); 
        }
        else{ 
            console.log("Not loggedIn "+req.session.num);
            return res.redirect('/login');
        }
    }
    
    
}
module.exports = profileController;

