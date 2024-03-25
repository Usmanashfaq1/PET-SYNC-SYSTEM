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

   // Method to delete a user request
   static async deleteRequest(req, res) {
    const { requestId } = req.body;
    try {
        const deletedRows = await UserRequest.deleteRequest(requestId);
        res.status(200).send(`${deletedRows} request(s) deleted successfully.`);
    } catch (error) {
        console.error('Error deleting request:', error);
        res.status(500).send('Internal Server Error');
    }
}
        
        
}

module.exports = UserRequestController;
