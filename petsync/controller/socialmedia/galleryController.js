const profileModel = require('../../model/profileModel');
const GalleryModel=require('../../model/galleryModel');


class GalleryController {
    async displayPage(req, res) {
        try {
            if (req.session.num != null && typeof req.session.num != "undefined")
             {
                console.log("LoggedIn " + req.session.num);
                var name=req.session.username;
                const userInfo = await profileModel.getUserInfo(req.session.num);
                let imageName = userInfo[0].profilepic;
                

                if (typeof imageName == 'object')
                 {
                    imageName = "default_profilepic.png";
                 }

                 
                 const feedResult = await GalleryModel.getUserFeed(req.session.num);
                return res.render('gallery1', { data: userInfo[0], feedResult: feedResult,dpName: imageName, name });
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

module.exports = GalleryController;
