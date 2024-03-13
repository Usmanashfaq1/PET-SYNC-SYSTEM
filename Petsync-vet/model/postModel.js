const { promisify } = require('util');
const connection = require('../config');

class PostModel 
{
    constructor() {
        this.promiseConnectionQuery = promisify(connection.query).bind(connection);
    }

    async getUserInfo(userId) {
        const query = 'SELECT * FROM userinfo WHERE id = ?';
        try {
            const result = await this.promiseConnectionQuery(query, [userId]);
            return result;
        } catch (error) {
            throw new Error('Error fetching user info from database');
        }
    }

    async getUserFeed(userId) {
        const query = 'SELECT * FROM userfeed WHERE userid = ?';
        try {
            const result = await this.promiseConnectionQuery(query, [userId]);
            return result;
        } catch (error) {
            throw new Error('Error fetching user feed from database');
        }
    }

    
}

module.exports = new PostModel();
