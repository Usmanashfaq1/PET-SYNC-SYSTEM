
const path = require('path');
const fs = require('fs');
const connection = require('../../config');

handle_add_to_wishlist = (req, res) => {
    var item_id = req.query.item_id;
    var email = req.query.email_e;

    var checkCartSql = `SELECT * FROM wishlist WHERE item_id = '${item_id}' AND email = '${email}'`;
    connection.query(checkCartSql, function (checkCartErr, checkCartResults) {
        if (checkCartErr) {
            console.error(checkCartErr);
            res.status(500).json({ error: 'Database error.' });
        } else {
            if (checkCartResults.length > 0) {
                res.json(-1);
            } else {
                var insertCartSql = `INSERT INTO wishlist (item_id, email) VALUES ('${item_id}','${email}')`;
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

const handle_wishlist_item_number = (req, res) => {
    var email = req.query.email_e;

    var checkCartSql = `SELECT COUNT(*) AS total FROM wishlist WHERE email = '${email}'`;
    connection.query(checkCartSql, function (checkCartErr, checkCartResults) {
        if (checkCartErr) {
            console.error(checkCartErr);
            res.status(500).json({ error: 'Database error.' });
        } else {
            const total = checkCartResults[0].total;
            res.json({total });
        }
    });
}



const handle_get_wishlist_items = (req, res) => {
    var email = req.query.email_e;
    var sql = `SELECT wishlist.item_id, products.price, products.product_name, products.category, products.productPicture, products.description 
               FROM wishlist 
               INNER JOIN products ON wishlist.item_id = products.p_id 
               WHERE wishlist.email = '${email}'`;

    connection.query(sql, function (err, results) {
        if (err) {
            console.error('Error retrieving cart items:', err);
            res.status(500).json({ error: 'Database error.' });
        } else {
            const itemsWithFileContent = results.map(item => {
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
};





const handle_remove_from_wishlist = (req, res) => {
    const pid = req.params.id;

    const sql = 'DELETE FROM wishlist WHERE item_id = ?';
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

// handle_check_added_to_cart = (req, res) => {
//     var item_id = req.query.item_id;
//     var email = req.query.email_e;

//     console.log("Received request to check item_id:", item_id, "for email:", email);

//     var checkCartSql = `SELECT * FROM cart WHERE item_id = '${item_id}' AND email = '${email}'`;

//     console.log("Executing SQL query:", checkCartSql);

//     connection.query(checkCartSql, function (checkCartErr, checkCartResults) {
//         if (checkCartErr) {
//             console.error("Error executing SQL query:", checkCartErr);
//             res.status(500).json({ error: 'Database error.' });
//         } else {
//             console.log("Received results:", checkCartResults);
//             if (checkCartResults.length > 0) {
//                 res.json(1);
//             } else {
//                 res.json(-1);
//             }
//         }
//     });
// }





load_wishlist_page  = (req, res) => {
    res.render('wishlist');
}

module.exports= {
    load_wishlist_page,
    handle_add_to_wishlist,
    handle_wishlist_item_number,
    handle_get_wishlist_items,
    handle_remove_from_wishlist
}