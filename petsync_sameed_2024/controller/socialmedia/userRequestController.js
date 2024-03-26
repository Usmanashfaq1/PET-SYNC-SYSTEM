const UserRequest = require('../../model/userModels/userRequestModel');

class UserRequestController {
    static async getAllRequests(req, res) {
        try {
            const requests = await UserRequest.getAllRequests();
            res.render('requestsView', { requests });
        } catch (error) {
            console.error('Error fetching requests:', error);
            res.status(500).send('Internal Server Error');
        }
    }

   
        static async createRequest(req, res) {
            const { userEmail, requestText } = req.body;
            try {
                const requestId = await UserRequest.createRequest(userEmail, requestText);
                res.status(201).send(`Request created with ID: ${requestId}`);
            } catch (error) {
                console.error('Error creating request:', error);
                res.status(500).send('Internal Server Error');
            }
        }
        
}

module.exports = UserRequestController;
