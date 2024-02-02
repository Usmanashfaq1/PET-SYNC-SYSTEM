const path = require('path');
const multer = require("multer");

const multer_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '..', 'upload');
        console.log('Script Directory:', __dirname);
        console.log('Destination Folder:', uploadDir);
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: multer_storage });

// Middleware for handling file upload
const handle_add_product_middleware = (req, res, next) => {
    upload.single('productPicture')(req, res, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'File upload failed.' });
      }
        else{
            console.log('pic added');
        }
    });
  };
  

// Controller function for handling the form submission
const handle_add_product = (req, res) => {
    console.log('i am in api');
    alert("efds");
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

    conn.query(sql, function (err, results) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Database error.' });
        } else {
            res.json(1);
        }
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
    handle_add_product_middleware,
    handle_add_product,
}