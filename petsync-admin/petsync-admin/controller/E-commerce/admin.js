const multer = require("multer");
const connection = require('../../config');

const storage = multer.diskStorage({
    destination: './upload',
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
            return;
        }

        var pname = req.body.pname;
        var category = req.body.category;
        var price = req.body.price;
        var stock = req.body.stock;
        var rating = req.body.rating;
        var description = req.body.description;
        const productPicture = req.file.filename;

        var checkQuery = `SELECT * FROM products WHERE product_name = '${pname}'`;
        connection.query(checkQuery, function (checkErr, checkResults) {
            if (checkErr) {
                console.error(checkErr);
                res.status(500).json({ error: 'Database error.' });
                return;
            }

            if (checkResults.length > 0) {
                res.json(-1);
            } else {
                var insertQuery = `INSERT INTO products (product_name, category, price, stock, rating, description, productPicture) 
                                    VALUES ('${pname}', '${category}', '${price}', '${stock}', '${rating}', '${description}', '${productPicture}')`;
                connection.query(insertQuery, function (insertErr, insertResults) {
                    if (insertErr) {
                        console.error(insertErr);
                        res.status(500).json({ error: 'Database error.' });
                        return;
                    }
                    res.json(1);
                });
            }
        });
    });
};



load_admin_products_page = (req, res) => {
    res.render('admin_products');
}



load_admin_page = (req, res) => {
    res.render('E-commerce');
}

module.exports = {
    load_admin_page,
    load_admin_products_page,
    handle_add_product,
}