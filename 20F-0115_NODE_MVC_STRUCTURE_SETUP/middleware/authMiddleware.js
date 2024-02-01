// authMiddleware.js

exports.isAuthenticated = (req, res, next) => {
    if (req.session && req.session.num) {
        return next(); // User is authenticated, proceed to the next middleware
    } else {
        return res.redirect('/login'); // User is not authenticated, redirect to login page
    }
};
