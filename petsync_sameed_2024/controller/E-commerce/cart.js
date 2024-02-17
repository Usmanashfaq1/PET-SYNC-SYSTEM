const path = require('path');
const fs = require('fs');
const connection = require('../../config');

handle_add_to_cart = (req, res) => {
    var item_id = req.query.item_id;
    var email = req.query.email;
    var price = req.query.price;
    var quantity = 1;
    var checkCartSql = `SELECT * FROM cart WHERE item_id = '${item_id}' AND email = '${email}'`;
    connection.query(checkCartSql, function (checkCartErr, checkCartResults) {
        if (checkCartErr) {
            console.error(checkCartErr);
            res.status(500).json({ error: 'Database error.' });
        } else {
            if (checkCartResults.length > 0) {
                res.json(-1);
            } else {
                var insertCartSql = `INSERT INTO cart (item_id, price , quantity, email) VALUES ('${item_id}', '${price}' , '${quantity}' ,'${email}')`;
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

    var checkCartSql = `SELECT COUNT(*) AS count, SUM(price) AS total FROM cart WHERE email = '${email}'`;
    connection.query(checkCartSql, function (checkCartErr, checkCartResults) {
        if (checkCartErr) {
            console.error(checkCartErr);
            res.status(500).json({ error: 'Database error.' });
        } else {
            const itemCount = checkCartResults[0].count;
            const total = checkCartResults[0].total;
            res.json({ itemCount, total });
        }
    });
}



const handle_get_cart_items = (req, res) => {
    var email = req.query.email;
    var checkCartSql = `SELECT * FROM cart WHERE email = '${email}'`;
    connection.query(checkCartSql, function (checkCartErr, checkCartResults) {
        if (checkCartErr) {
            console.error(checkCartErr);
            res.status(500).json({ error: 'Database error.' });
        } else {
            const itemIds = checkCartResults.map(item => item.item_id);

            if (itemIds.length === 0) {
                res.json([]);
                return;
            }

            const sql = 'SELECT * FROM products WHERE p_id IN (?)';
            connection.query(sql, [itemIds], (err, detailedResults) => {
                if (err) {
                    console.error('Error retrieving cart items:', err);
                    res.status(500).json({ error: 'Database error.' });
                } else {
                    const itemsWithFileContent = detailedResults.map(item => {
                        const fileName = item.productPicture;
                        if (fileName) {
                            const uploadDirectory = path.join(__dirname, '..', '..', 'upload');
                            const filePath = path.join(uploadDirectory, fileName);
                            try {
                                const content = fs.readFileSync(filePath, { encoding: 'base64' });
                                return { ...item, productPicture: content };
                            } catch (err) {
                                console.error('Error reading file:', err);
                                return item;
                            }
                        } else {
                            return item;
                        }
                    });
                    res.json(itemsWithFileContent);
                }
            });
        }
    });
};





const handle_remove_from_cart = (req, res) => {
    const pid = req.params.id;

    const sql = 'DELETE FROM cart WHERE item_id = ?';
    connection.query(sql, [pid], (err, result) => {
        if (err) {
            console.error('Error deleting product:', err);
            res.status(500).json({ error: 'Database error.' });
        } else {
            if (result.affectedRows > 0) {
                res.json(1); // Send 1 for success
            } else {
                res.json(0); // Send 0 if no rows were affected (item not found)
            }
        }
    });
};



handle_cart_item_number_quantity = (req, res) => {
    var email = req.query.email;
    var item_id = req.query.id;

    console.log(item_id , ' ' , email );
    var updateCartSql = `
    UPDATE cart 
    SET 
        quantity = quantity + 1, 
        price = (SELECT (price / quantity) * (quantity + 1) FROM cart WHERE email = '${email}' AND item_id = '${item_id}')
    WHERE 
        email = '${email}' 
        AND item_id = '${item_id}'
    `;

    connection.query(updateCartSql, function (updateCartErr, updateCartResults) {
        if (updateCartErr) {
            console.error(updateCartErr);
            res.status(500).json({ error: 'Database error.' });
        } else {
            if (updateCartResults.affectedRows > 0) {
                var checkCartSql = `SELECT COUNT(*) AS count, SUM(price) AS total FROM cart WHERE email = '${email}'`;
                connection.query(checkCartSql, function (checkCartErr, checkCartResults) {
                    if (checkCartErr) {
                        console.error(checkCartErr);
                        res.status(500).json({ error: 'Database error.' });
                    } else {
                        const itemCount = checkCartResults[0].count;
                        const total = checkCartResults[0].total;
                        console.log(itemCount , ' ', total );
                        res.json({ itemCount, total });
                    }
                });
            } else {
                res.status(404).json({ error: 'Item not found in the cart.' });
            }
        }
    });
}


load_open_cart_page = (req, res) => {
    res.render('user_cart');
}

module.exports = {
    load_open_cart_page,
    handle_add_to_cart,
    handle_cart_item_number,
    handle_get_cart_items,
    handle_remove_from_cart,
    handle_cart_item_number_quantity
}