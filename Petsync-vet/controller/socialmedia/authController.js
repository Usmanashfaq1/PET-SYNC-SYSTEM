exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/error'); // Redirect to login page if session cannot be destroyed
        }

        
        
        res.redirect('/'); // Redirect to login page after successful logout
    });
};
