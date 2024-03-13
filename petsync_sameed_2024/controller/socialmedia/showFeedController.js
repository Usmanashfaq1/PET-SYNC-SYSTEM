const connection = require('../../config');
const moments = require('moment');  
class showFeedController{
  
    likeFeed(req,res){
          
        let val='';
        if(req.params['likeflag']==1)
        val="+1";
        else val="-1"; 
        let sqlQuery="UPDATE userfeed SET likes=likes"+val+" WHERE feedname='"+req.params['id']+"'";
       
        connection.query(sqlQuery,(error,result)=>{
           
            if(error) throw error;
        });
        let likeData={
            feedname:req.params['id'],
            likedby:req.session.num
        }
        if(req.params['likeflag']==1)
        sqlQuery="INSERT INTO likeinfo SET ? ";
        else
        sqlQuery="DELETE FROM likeinfo WHERE (feedname= '"+likeData.feedname+ "' AND likedby= '"+likeData.likedby+"')";
        
        
        connection.query(sqlQuery,likeData,(error,result)=>{
            if(error) throw error;
           
        });  
        
        if(req.params['likeflag']==1)
        console.log("liked Post: "+req.params['id']);
        else
        console.log("disliked Post: "+req.params['id']);
        
  
        return res.status(200).json({ message: "Operation completed successfully" });
    };

 


    uploadFeed(req,res) {
       

        let feedData={
            "userid":req.session.num,
            "feedname":req.file.filename,   
        }
        
        let sql="INSERT INTO userfeed SET ?";
        connection.query(sql,feedData); 
        
        res.end("File is uploaded");
    };

}
module.exports = showFeedController;

