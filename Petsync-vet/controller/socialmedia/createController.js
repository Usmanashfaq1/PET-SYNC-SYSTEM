const createModel = require('../../model/createModel');
const profileModel = require('../../model/profileModel');

class CreateController {
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
                
                return res.render('create', { data: userInfo[0], dpName: imageName,name,note,location,birthdate,bio });
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

async uploadFeed(req, res) {
    try 
    {
        let feedData = {
            "userid": req.session.num,
            "username": req.session.username,
            "feedname": req.file.filename,
            "caption": req.body.caption
        };

        await createModel.uploadFeed(feedData);
        res.end("File is uploaded");
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}

}

module.exports = CreateController;