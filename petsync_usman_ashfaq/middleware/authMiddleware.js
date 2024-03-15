// authMiddleware.js

exports.isAuthenticated = (req, res, next) => {
    if (req.session && req.session.num) {
        console.log("sdfsdf");
        return next(); // User is authenticated, proceed to the next middleware
    } else {
        console.log("sdfsdf");
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


exports.isEcommerceAuthenticated = (req, res, next) => {
    if (req.session && req.session.ecommerce) {
        return next(); // User is authenticated, proceed to the next middleware
    } else {


         return res.redirect('/'); // User is not authenticated, redirect to front page
    }
};

