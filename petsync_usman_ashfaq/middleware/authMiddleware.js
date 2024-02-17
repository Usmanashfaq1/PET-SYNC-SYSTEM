// authMiddleware.js

exports.isAuthenticated = (req, res, next) => {
    if (req.session && req.session.num) {
        return next(); // User is authenticated, proceed to the next middleware
    } else {
        return res.redirect('/'); // User is not authenticated, redirect to front page
    }
};


exports.isUserAuthenticated = (req, res, next) => {
    if (req.session && req.session.email) {
        return next(); // User is authenticated, proceed to the next middleware
    } else {
        return res.redirect('/'); // User is not authenticated, redirect to front page
    }
};
