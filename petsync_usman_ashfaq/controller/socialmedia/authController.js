exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.redirect('/error'); // Redirect to error page if session cannot be destroyed
        }

        console.log("Session destroyed successfully.");
        res.redirect('/'); // Redirect to login page after successful logout
    });
};




exports.logout123 = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.redirect('/error'); // Redirect to error page if session cannot be destroyed
        }

        console.log("Session destroyed successfully.");
        res.redirect('/'); // Redirect to login page after successful logout
    });
};
