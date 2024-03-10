const profileModel = require('../../model/profileModel');
const PostModel=require('../../model/postModel');
const connection = require('../../config');
const moment = require('moment');

class ProfileController {
    async displayPage(req, res) {
        try {
            if (req.session.num != null && typeof req.session.num != "undefined")
             {
                console.log("LoggedIn " + req.session.num);
                var name=req.session.username;
                const userInfo = await profileModel.getUserInfo(req.session.num);
                let imageName = userInfo[0].profilepic;
                let bio=userInfo[0].bio;
                let birthdate=userInfo[0].birthdate;
                let location=userInfo[0].location;
                let note=userInfo[0].note;

                if (typeof imageName == 'object')
                 {
                    imageName = "default_profilepic.png";
                 }

                 if(bio== null)
                 {
                    bio='no bio';
                 }
                 if(birthdate== null)
                 {
                    birthdate='not set';
                 }

                 if(location==null)
                 {
                    location='not set';
                 }
                   
                 if(note==null)
                 {
                    note='not set';
                 }
                 const feedResult = await PostModel.getUserFeed(req.session.num);

if (feedResult) {
    for (let i = 0; i < feedResult.length; i++) {
        const feed = feedResult[i];
        const isLikedQuery = `SELECT EXISTS(SELECT 1 FROM likeinfo WHERE (feedname = '${feed.feedname}' AND likedby = '${req.session.num}') LIMIT 1)`;
        connection.query(isLikedQuery, (error, isLikedResult) => {
            if (error) {
                console.error("Error:", error);
                throw error;
            }
            const R = JSON.stringify(isLikedResult[0]);
            if (R[R.length - 2] === '1') {
                feedResult[i].isliked = "dislike";
            } else {
                feedResult[i].isliked = "like";
            }
            console.log(feedResult[i]);
        });
    }
}

let followQuery="SELECT followers,following FROM followcount WHERE username='"+req.session.username+"'";
connection.query(followQuery,(error,followResult)=>{
    if(error) throw error;
    console.log(followResult);
    return res.render('userProfileView',{data: userInfo[0], feedResult: feedResult,dpName: imageName, name,note,location,birthdate,bio,followResult:followResult[0],moment:moment});
});


              //  return res.render('userProfileView', { data: userInfo[0], feedResult: feedResult,dpName: imageName, name,note,location,birthdate,bio });
            } 
            else 
            {
                console.log("Not loggedIn " + req.session.num);
                return res.redirect('/login');
            }
        } 
        catch (error)
         {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    }

    async enterInfo(req, res) {
        try {
            // Handle entering user info
        } catch (error) {
            console.error(error);
            return res.status(500).send('Internal Server Error');
        }
    }

    
}

module.exports = ProfileController;