
// const homeModel = require('../../model/homeModel');
// const moment = require('moment');

// class mainController {
//   async displayPage(req, res) {
//     try {
//       if (req.session.num != null && typeof req.session.num != 'undefined') {
//         console.log('User is Logged in Successfully!' + req.session.num);
//         var name=req.session.username;
//         const followerUsername = req.session.username;
//         const feedResult = await homeModel.getFeedData(followerUsername);

//         console.log(feedResult);
//         console.log('Number of posts:', feedResult.length);

//         if (feedResult.length === 0) {
//           return res.render('mainView', { moment, feedResult,name });
//         }

//         for (let i = 0; i < feedResult.length; i++) {
//           const fdname = feedResult[i].feedname;
//           const userId = req.session.num;

//           //const isLikedResult = await homeModel.checkIsLiked(fdname, userId);

//           //const R = JSON.stringify(isLikedResult[0]);

//           // if (R[R.length - 2] === '1') {
//           //   feedResult[i].isliked = 'dislike';
//           // } else {
//           //   feedResult[i].isliked = 'like';
//           // }

//           console.log(feedResult[i]);

//           if (i === feedResult.length - 1) {
//             return res.render('mainView', { moment, feedResult,name });
//           }
//         }
//       } else {
//         console.log('Not loggedIn ' + req.session.num);
//         return res.redirect('/login');
//       }
//     } catch (error) {
//       console.error(error);
//       res.json({ msg: error, data: [] });
//     }
//   }
// }

// module.exports = mainController;















const connection = require('../../config');


const moment = require('moment');
class mainController{
    displayPage (req,res){
        //console.log(req.session.num);
        
        if(req.session.num!=null && typeof req.session.num!="undefined"){//If user has logged in
            console.log("LoggedIn "+req.session.num);
            var name=req.session.username;
            //followinfo.following AS username,userfeed.feedname AS feedname
            let feedQuery="SELECT * FROM userfeed INNER JOIN followinfo "+ 
             " ON userfeed.username = followinfo.following WHERE followinfo.follower= '"+req.session.username+"' ORDER BY created_at DESC"; 
            //WHERE userid!="+req.session.num;
            //console.log(feedQuery);
             connection.query(feedQuery,(error,feedResult)=>{
                if(error) throw error;
                console.log(feedResult);
                if(feedResult.length==0)
                return res.render('mainView',{moment:moment,feedResult:feedResult,name});
                for(let i=0;i<feedResult.length;i++){
                    let fdname=feedResult[i].feedname;
                    let userId=req.session.num;
                    //console.log(req.body)
                    //feedname+="1";
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
                // for(let i=0;i<feedResult.length;i++){
                //     console.log(feedResult[i]);
                // }

             });
        }
        else{  
            console.log("Not loggedIn "+req.session.num);
            return res.redirect('/login');
        }
    }
    /*
    //Yet to be done
    enterInfo (req,res){
        homeModel.enterInfo(req,res);
        //console.log("contMsg=> "+msg);
    } 
    */
}
module.exports =  mainController;

