
const moment = require('moment');

class  mainController {
  async displayPage(req, res) {
    try {
      if (req.session.num != null && typeof req.session.num != 'undefined') 
      {
        console.log('User is Logged in Successfully!' + req.session.num);
        var name=req.session.username;

        
            return res.render('mainView', { name });
       
      } else 
      {
        console.log('User Not logged in !' + req.session.num);
        return res.redirect('/login');
      }
    } catch (error) 
    {
      console.error(error);
      res.json({ msg: error, data: [] });
    }
  }
}

module.exports = mainController;
