

exports.getanimal = async (req, res) => {
  try {
   
    res.render('animal');
  } catch (error) {
    res.status(500).send('Error fetching users');
  }
};
