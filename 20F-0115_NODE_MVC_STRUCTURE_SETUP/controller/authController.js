exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/'); // Redirect to login page if session cannot be destroyed
        }
        
        res.redirect('/login'); // Redirect to login page after successful logout
    });
};
