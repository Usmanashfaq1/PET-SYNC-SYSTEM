const connection = require('../config');
const Model = require('../model/editProfileModel.js');
const editProfileModel = new Model();

class editProfileController{
    displayPage (req,res){
        //console.log(req.session.num);
        if(req.session.num!=null && typeof req.session.num!="undefined"){//If user has logged in
            console.log("LoggedIn "+req.session.num);
            var name=req.session.username;
            let userInfoQuery="SELECT * FROM userinfo WHERE id='"+req.session.num+"'";
                    connection.query(userInfoQuery,(error,userInfoResult)=>{
                        if(error) throw error;
                        console.log(userInfoResult[0]);
                        let bio=userInfoResult[0].bio;
                        let birthdate=userInfoResult[0].birthdate;
                        let location=userInfoResult[0].location;
                        let note=userInfoResult[0].note;
        // here updated user setting controller
                        if (typeof imageName == 'object')
                         {
                            imageName = "default_profilepic.png";
                         }
        
                         if(bio== null)
                         {
                            userInfoResult[0].bio='no bio';
                         }
                         if(birthdate== null)
                         {
                            userInfoResult[0].birthdate='not set';
                         }
        
                         if(location==null)
                         {
                            userInfoResult[0].location='not set';
                         }
                           
                         if(note==null)
                         {
                            userInfoResult[0].note='not set';
                         }

                        return res.render('userSetting',{msg:"null",userInfo:userInfoResult[0]});
                    });
        }
        else{ 
            console.log("Not loggedIn "+req.session.num);
            return res.redirect('/login');
        }
    }
    
    enterInfo (req,res){
        editProfileModel.enterInfo(req,res);
        
    } 
    
}
module.exports = editProfileController;

 

