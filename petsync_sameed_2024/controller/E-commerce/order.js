const connection = require('../../config');



const handle_get_order = (req, res) => {
    var email = req.query.email_e;
    var sql = `SELECT order_id, customer_name, customer_email, status, amount_paid, Date
           FROM deliveries_order 
           WHERE customer_email = '${email}'`;

    connection.query(sql, function (err, results) {
        if (err) {
            console.error('Error retrieving orders:', err);
            res.status(500).json({ error: 'Database error.' });
        } else {
            res.json(results);
        }
    });

};

load_order_tracking_page = (req, res) => {
    var oId = req.params.id;
    
    res.render('track', { id: oId });
}










module.exports = {

    handle_get_order,
    load_order_tracking_page
}