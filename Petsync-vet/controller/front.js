

exports.show = async (req, res) => {
    try {
     
      res.render('index');
    } catch (error) {
      res.status(500).send('Error Rending Frond page');
    }
  };
  