const displayAccountModel = require("../../model/displayAccountModel");

class DisplayAccountController {
  async displayAccount(req, res) {
    try {
      console.log("Searched for => " + req.params['username']);
      if (req.params['username'] == req.session.username) {
        return res.redirect('/profile');
      } else {
        const userData = await displayAccountModel.getUserData(req.params['username'], req.session.username);
        return res.render('otherUserProfile', userData);
      }
    } catch (error) {
      console.error("Error in displaying account:", error);
      return res.status(500).send("Internal server error");
    }
  }

  
}

module.exports = new DisplayAccountController();
