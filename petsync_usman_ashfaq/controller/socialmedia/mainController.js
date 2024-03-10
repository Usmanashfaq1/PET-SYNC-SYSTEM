
const connection = require('../../config');


const moment = require('moment');
class mainController{
    displayPage (req,res){
       
        
        if(req.session.num!=null && typeof req.session.num!="undefined"){
            console.log("LoggedIn "+req.session.num);
            var name=req.session.username;
            
            let feedQuery="SELECT * FROM userfeed INNER JOIN followinfo "+ 
             " ON userfeed.username = followinfo.following WHERE followinfo.follower= '"+req.session.username+"' ORDER BY created_at DESC"; 
           
             connection.query(feedQuery,(error,feedResult)=>{
                if(error) throw error;
                console.log(feedResult);
                if(feedResult.length==0)
                return res.render('mainView',{moment:moment,feedResult:feedResult,name});
                
               
             });
        }
        else{  
            console.log("Not loggedIn "+req.session.num);
            return res.redirect('/login');
        }
    }
   
}
module.exports =  mainController;

