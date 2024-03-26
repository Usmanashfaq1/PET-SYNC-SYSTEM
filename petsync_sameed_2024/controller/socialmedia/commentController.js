const connection = require('../../config');
const moments = require('moment');  //Date and Time Manipulation using it for 
class commentController
{
  
    displayFeed (req,res){
        //console.log(req.session.num);
        if(req.session.num!=null && typeof req.session.num!="undefined"){//If user has logged in
                    //console.log(req.params['id']);
            let sqlQuery="SELECT EXISTS(SELECT 1 FROM likeinfo WHERE (feedname = '"+req.params['id']+"' AND likedby = '"+req.session.num+"') LIMIT 1)"
            //console.log(sqlQuery);
            connection.query(sqlQuery,(error,result,field)=>{
                if(error) throw error; 
                result=JSON.stringify(result);
                //console.log(result);
                
                var initialLikedDisliked="like";
                if(result[result.length-3]=='1')
                    initialLikedDisliked="dislike";
                
                //console.log(initialLikedDisliked);
                let sqlQuery1="SELECT * FROM commentinfo WHERE feedname='"+req.params['id']+"' ORDER BY created_at DESC";
                connection.query(sqlQuery1,(error,comments)=>{
                    if(error) throw error;
                  
                    let likeCountQuery="SELECT likes,username,created_at FROM userfeed WHERE feedname='"+req.params['id']+"'";
                    connection.query(likeCountQuery,(error,likeUserCreatedATCount)=>{
                        if(error) throw error;
                        console.log(likeUserCreatedATCount[0]);
                        let feedCreaterQuery="SELECT profilepic FROM userinfo WHERE username='"+likeUserCreatedATCount[0].username+"'";
                        connection.query(feedCreaterQuery,(error,profilePicResult)=>{
                            if(error) throw error;
                            //console.log(profilePicResult[0]);
                            let imageName=profilePicResult[0].profilepic;
                            if(typeof imageName=='object'){ imageName = "default_profilepic.png"; }
                            console.log(imageName);
                            return res.render('showFeedView',{ moment:moments,profilePic:imageName,likeUserCreatedATCount:likeUserCreatedATCount[0],postId:req.params['id'],initialLikedDisliked:initialLikedDisliked,comments:comments});  
                        })
                    })
                });
            });
        }
        else{ 
            console.log("Not loggedIn "+req.session.num);
            return res.redirect('/login');
        }
    };

 //comment feed
    commentFeed(req,res){
        let commentData={
            "feedname":req.params['id'],
            "commenttext":req.body.commentText,
            "commentby":req.session.username,
            "commentto":0
        }
        //console.log(JSON.stringify(commentData));
        let sqlQuery="INSERT INTO commentinfo SET ? ";
        connection.query(sqlQuery,commentData,(error,result)=>{
            if(error) throw error;

            
            // Increment the comment_count in the userfeed table
        let updateQuery = `
        UPDATE userfeed
        SET comment_count = comment_count + 1
        WHERE feedname = '${commentData.feedname}';
        // updating comment count in userfeed table
    `;

    connection.query(updateQuery, (updateError, updateResult) => {
        if (updateError) {
            console.error("Error updating comment count:", updateError);
            // Handle the error as needed
        }

        console.log("Comment added successfully:", commentData);
            console.log(commentData);
            // here reloading the page
            return res.redirect('/showfeed/'+commentData.feedname);
        });
    });
       
    };

    

}
module.exports = commentController;

