const userModel = require('../../model/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const currentUser = req.session.username;
    let users = await userModel.getUsers(currentUser);
    
    // Filter out the current user's information
    users = users.filter(user => user.username !== currentUser);
    
    const name = req.session.username;

    res.render('findUserView', { users, name });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Error fetching users');
  }
};
