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

// (req, res, next): This function takes three parameters: req (request), 
// res (response), and next (callback function). In Express middleware,
//  req represents the incoming HTTP request, res represents the outgoing HTTP response,
//   and next is a function that passes control to the next middleware in the stack.


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

