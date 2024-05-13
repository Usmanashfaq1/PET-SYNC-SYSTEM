const UserRequest = require('../../model/userModels/userRequestModel');

class UserRequestController {
    static async getAllRequests(req, res) {
        try {
            const message = "something is broken!";
            res.render('showmessage', { message });
        } catch (error) {
            console.error('Error showing page:', error);
            res.status(500).send('Internal Server Error');
        }
    }

   
    static async createRequest(req, res) {
        const { userEmail, requestText } = req.body;
        try {
            const requestId = await UserRequest.createRequest(userEmail, requestText);
            const message = "Your request has been delivered to the admin. Kindly be patient!";
            // Send the custom message to the client
           // res.status(201).send(message);
            // Optionally, you can render a page with the message
            res.render('showmessage', { message });
        } catch (error) {
            console.error('Error creating request:', error);
            res.status(500).send('Internal Server Error');
        }
    }
    
        
}

module.exports = UserRequestController;
