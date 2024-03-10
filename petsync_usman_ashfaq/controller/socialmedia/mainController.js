
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
                for(let i=0;i<feedResult.length;i++){
                    let fdname=feedResult[i].feedname;
                    let userId=req.session.num;
                   //checking previous like value if liked or not by user
                    let isLikedQuery="SELECT EXISTS(SELECT 1 FROM likeinfo WHERE (feedname = '"+fdname+"' AND likedby = '"+userId+"') LIMIT 1)"
                    
                    connection.query(isLikedQuery,(error,isLikedResult)=>{
                        if(error) throw error;
                        let R=JSON.stringify(isLikedResult[0]);
                        //console.log(R);
                        if(R[R.length-2]=='1'){
                            feedResult[i].isliked="dislike";
                        }
                        else
                        feedResult[i].isliked="like";
                        console.log(feedResult[i]);
                        
                        if(i==feedResult.length-1){
                            return res.render('mainView',{moment:moment,feedResult:feedResult,name});
                        }
                    });
                }
               
             });
        }
        else{  
            console.log("Not loggedIn "+req.session.num);
            return res.redirect('/login');
        }
    }
   
}
module.exports =  mainController;

