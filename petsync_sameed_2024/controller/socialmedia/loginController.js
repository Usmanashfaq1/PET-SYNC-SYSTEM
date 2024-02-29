const connection = require('../../config');
const Model = require('../../model/loginModel');
const loginModel = new Model();
class loginController {
    displayPage(req, res) {
        req.session.num = null;
        return res.render('loginView', { msg: null });
    }

    async enterInfo(req, res) {
        try {
            const result = await loginModel.checkUser(req, res);
            if (result.blocked) {
                // Render the login view with the blocked message
                return res.render('loginView', { msg: result.message });
            } else if (result.success) {
                // Redirect to the main page
                return res.redirect(result.redirect);
            } else {
                // Render the login view with the error message
                return res.render('loginView', { msg: result.msg });
            }
        } catch (error) {
            console.error("Error occurred while checking user:", error);
            return res.status(500).send("Internal Server Error");
        }
    }
}

module.exports = loginController;


