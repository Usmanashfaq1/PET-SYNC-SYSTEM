const multer = require("multer");
const connection = require('../../config');

const storage = multer.diskStorage({
    destination: '../upload',
    filename: (req, file, callback) => {
        callback(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
}).single('productPicture')


const handle_add_product = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.send(err.toString());
        }
        var pname = req.body.pname;
        var category = req.body.category;
        var price = req.body.price;
        var stock = req.body.stock;
        var rating = req.body.rating;
        var description = req.body.description;
        const productPicture = req.file.filename;

        // Assuming 'owner_id' is the foreign key column in 'pet_profile'
        var sql = `INSERT INTO products (product_name, category, price, stock, rating, description, productPicture) 
                    VALUES ('${pname}', '${category}', '${price}', '${stock}', '${rating}', '${description}', '${productPicture}')`;
        connection.query(sql, function (err, results) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Database error.' });
            } else {
                res.json(1);
            }
        });
    });
};




handle_order_details = (req, res) => {
    const { customer_name, customer_email, products_list, quantity, amount_paid } = req.query;

    const products = JSON.parse(decodeURIComponent(products_list));

    const productDetails = [];

    products.forEach(product => {
        const escapedProductName = connection.escape(product.price_data.product_data.name);

        const productSql = `SELECT p_id, price FROM products WHERE product_name = ${escapedProductName}`;

        connection.query(productSql, (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Database error.' });
            } else {
                if (results.length > 0) {
                    const { p_id, price } = results[0];
                    productDetails.push({
                        p_id,
                        product_name: product.price_data.product_data.name,
                        quantity: product.quantity,
                        price
                    });

                    if (productDetails.length === products.length) {
                        insertOrderDetails(customer_name, customer_email, amount_paid, productDetails);
                    }
                } else {
                    console.error(`Product '${escapedProductName}' not found.`);
                    res.status(404).json({ error: `Product '${escapedProductName}' not found.` });
                }
            }
        });
    });

    function insertOrderDetails(customer_name, customer_email, amount_paid, productDetails) {
        var orderSql = `INSERT INTO deliveries_order (customer_name, customer_email, amount_paid) 
                        VALUES ('${customer_name}', '${customer_email}', ${amount_paid})`;

        connection.query(orderSql, function (err, results) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Database error.' });
            } else {
                const order_id = results.insertId;

                const productQueries = productDetails.map(product => `(${order_id}, ${product.p_id}, '${product.product_name}', ${product.quantity}, ${product.price})`).join(',');

                const productSql = `INSERT INTO order_products (order_id, product_id, product_name, quantity, price) VALUES ${productQueries}`;

                connection.query(productSql, function (err, results) {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ error: 'Database error.' });
                    } else {
                        res.json({ success: true, message: 'Order details saved successfully.' });
                    }
                });
            }
        });
    }
};




load_admin_products_page = (req, res) => {
    res.render('admin_products');
}



load_admin_page = (req, res) => {
    res.render('admin_dashboard');
}

module.exports = {
    load_admin_page,
    load_admin_products_page,
    handle_add_product,
    handle_order_details,
}