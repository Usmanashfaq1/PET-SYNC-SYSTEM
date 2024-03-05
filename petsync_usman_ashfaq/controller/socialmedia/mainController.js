












const homeModel = require('../../model/homeModel');
const moment = require('moment');

class mainController {
  async displayPage(req, res) {
    try {
      if (req.session.num != null && typeof req.session.num != 'undefined') {
        console.log('User is Logged in Successfully!' + req.session.num);
        var name=req.session.username;
        const followerUsername = req.session.username;
        const feedResult = await homeModel.getFeedData(followerUsername);

        console.log(feedResult);
        console.log('Number of posts:', feedResult.length);

        if (feedResult.length === 0) {
          return res.render('mainView', { moment, feedResult,name });
        }

        for (let i = 0; i < feedResult.length; i++) {
          const fdname = feedResult[i].feedname;
          const userId = req.session.num;

          //const isLikedResult = await homeModel.checkIsLiked(fdname, userId);

          //const R = JSON.stringify(isLikedResult[0]);

          // if (R[R.length - 2] === '1') {
          //   feedResult[i].isliked = 'dislike';
          // } else {
          //   feedResult[i].isliked = 'like';
          // }

          console.log(feedResult[i]);

          if (i === feedResult.length - 1) {
            return res.render('mainView', { moment, feedResult,name });
          }
        }
      } else {
        console.log('Not loggedIn ' + req.session.num);
        return res.redirect('/login');
      }
    } catch (error) {
      console.error(error);
      res.json({ msg: error, data: [] });
    }
  }
}

module.exports = mainController;
