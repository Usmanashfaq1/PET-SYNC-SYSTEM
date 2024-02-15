const multer = require("multer");
const connection = require('../config');

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
}