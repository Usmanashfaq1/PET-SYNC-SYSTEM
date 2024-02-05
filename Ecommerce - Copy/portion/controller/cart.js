const connection = require('../config/sqlConnection');

handle_add_to_cart = (req, res) => {
    var item_id = req.query.item_id;
    var email = req.query.email;

    var checkCartSql = `SELECT * FROM cart WHERE item_id = '${item_id}' AND email = '${email}'`;
    connection.query(checkCartSql, function (checkCartErr, checkCartResults) {
        if (checkCartErr) {
            console.error(checkCartErr);
            res.status(500).json({ error: 'Database error.' });
        } else {
            if (checkCartResults.length > 0) {
                res.json(-1);
            } else {
                var insertCartSql = `INSERT INTO cart (item_id, email) VALUES ('${item_id}', '${email}')`;
                connection.query(insertCartSql, function (insertCartErr, insertCartResults) {
                    if (insertCartErr) {
                        console.error(insertCartErr);
                        res.status(500).json({ error: 'Database error.' });
                    } else {
                        res.json(1);
                    }
                });
            }
        }
    });
}

const handle_cart_item_number = (req, res) => {
    var email = req.query.email;

    var checkCartSql = `SELECT count(*) AS count FROM cart WHERE email = '${email}'`;
    connection.query(checkCartSql, function (checkCartErr, checkCartResults) {
        if (checkCartErr) {
            console.error(checkCartErr);
            res.status(500).json({ error: 'Database error.' });
        } else {
            const itemCount = checkCartResults[0].count;
            res.json(itemCount);
        }
    });
}


load_open_cart_page = (req, res) => {
    res.render('user_cart');
}

module.exports = {
    load_open_cart_page,
    handle_add_to_cart,
    handle_cart_item_number
}