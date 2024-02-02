const connection = require('../config/sqlConnection');

handle_delete_product = (req, res) => {
    const pid = req.params.id;

    const sql = 'DELETE FROM products WHERE p_id = ?';
    connection.query(sql, [pid], (err, result) => {
        if (err) {
            console.error('Error deleting product:', err);
            res.status(500).json({ error: 'Database error.' }); // Return an error response
        } else {
            res.json(1); // Return a success response
        }
    });
}


load_edit_product_page = (req, res) => {
    res.render('edit_product');
}

module.exports = {
    load_edit_product_page,
    handle_delete_product,
}
