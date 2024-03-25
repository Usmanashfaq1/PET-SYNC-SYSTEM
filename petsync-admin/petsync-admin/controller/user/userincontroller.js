const userModel = require('../../model/userModels/userModel');

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        console.log('Received login request for email:', email);
        
        const user = await userModel.getUserByEmail(email);
        console.log('User found:', user);

        if (user && user.password === password) {
            req.session.email = user.email;
            req.session.name = user.fname;
        
            console.log('Login successful for user:', user.email);
            return res.redirect(`/admin_dashboard?email=${user.email}&name=${user.fname}`);
        } else {
            console.log('Login failed for user:', email);
            res.json(-1); // Login failed
        }
    } catch (error) {
        console.error('Error occurred during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function displayPage(req, res) {
    try {
        // Check if session exists
        if (req.session.email && req.session.name) {
            // If session exists, redirect to user dashboard
            console.log('Session found for user:', req.session.email);
            res.redirect('/admin_dashboard');
        } else {
            // If session doesn't exist, render login page
            console.log('Session not found. Rendering login page.');
            return res.render('login_user', { msg: null });
        }
    } catch (error) {
        console.error('Error occurred during displayPage:', error);
        return res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    loginUser,
    displayPage
};
