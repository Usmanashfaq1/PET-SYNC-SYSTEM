

exports.show = async (req, res) => {
    try {
     
      res.render('login_user');
    } catch (error) {
      res.status(500).send('Error Rending Frond page');
    }
  };
  