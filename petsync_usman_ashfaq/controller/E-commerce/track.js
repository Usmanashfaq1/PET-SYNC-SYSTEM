const connection = require('../../config');


const handle_get_track = (req, res) => {
    var email = req.query.email_e;
    var id = req.query.id;
    var sql = `SELECT  status
               FROM deliveries_order 
               WHERE customer_email = ? AND order_id = ?`;

    connection.query(sql, [email, id], function (err, results) {
        if (err) {
            console.error('Error retrieving orders:', err);
            res.status(500).json({ error: 'Database error.' });
        } else {
            if (results.length > 0) {
                res.json({ status: results[0].status });
            } else {
                res.status(404).json({ error: 'Order not found.' });
            }
        }
    });
};





module.exports = {

    handle_get_track,
}


