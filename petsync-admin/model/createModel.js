
const { promisify } = require('util');
const connection = require('../config');

class CreateModel {
    constructor() {
        this.promiseConnectionQuery = promisify(connection.query).bind(connection);
    }
async uploadFeed(feedData) {
    const query = "INSERT INTO userfeed SET ?";
    try 
    {
        await this.promiseConnectionQuery(query, feedData);
        return true;
    } catch (error) {
        throw new Error('Error uploading feed to database');
    }
}

}

module.exports = new CreateModel();
