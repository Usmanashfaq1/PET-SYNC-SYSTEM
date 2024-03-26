const util = require('util');
const connection = require('../../config');
const query = util.promisify(connection.query).bind(connection);
exports.getAllVets = async (req, res) => {
    try {
        //fetch all vets with their feedback data
        const rows = await query(`
            SELECT vet.*, 
                   IFNULL(SUM(feedback.satisfied_count - feedback.dissatisfied_count) / NULLIF(SUM(feedback.total_count), 0), 0) AS rating
            FROM vet
            LEFT JOIN feedback ON vet.email = feedback.vet_email
            GROUP BY vet.id
        `);
        res.render('viewVets', { vets: rows });
    } catch (err) {
        //log error
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};
