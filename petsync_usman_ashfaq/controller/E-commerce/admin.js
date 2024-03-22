const multer = require("multer");
const nodemailer = require('nodemailer');
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





const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'chusmanjutt.129@gmail.com',
    pass: 'vhxp fcjs melv npze',
  },
});


handle_order_details = (req, res) => {
  const { customer_name, customer_email, products_list, quantity, amount_paid } = req.query;

  const products = JSON.parse(decodeURIComponent(products_list));
  const productDetails = [];

  // Use Promise.all to wait for all queries to finish
  Promise.all(products.map(product => {
      const escapedProductName = connection.escape(product.price_data.product_data.name);
      const productSql = `SELECT p_id, price FROM products WHERE product_name = ${escapedProductName}`;

      return new Promise((resolve, reject) => {
        connection.query(productSql, (err, results) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            if (results.length > 0) {
              const { p_id, price } = results[0];
              productDetails.push({
                p_id,
                product_name: product.price_data.product_data.name,
                quantity: product.quantity,
                price
              });
              resolve();
            } else {
              console.error(`Product '${escapedProductName}' not found.`);
              reject(new Error(`Product '${escapedProductName}' not found.`));
            }
          }
        });
      });
    }))
    .then(() => {
      insertOrderDetails(customer_name, customer_email, amount_paid, productDetails, res);
    })
    .catch(err => {
      res.status(500).json({ error: 'Database error.' });
    });
}

function insertOrderDetails(customer_name, customer_email, amount_paid, productDetails, res) {
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
          // Update product stock in the products table
          productDetails.forEach(product => {
            const updateSql = `UPDATE products SET stock = stock - ${product.quantity} WHERE p_id = ${product.p_id}`;
            connection.query(updateSql, function (err, results) {
              if (err) {
                console.error(err);
                res.status(500).json({ error: 'Database error.' });
              }
            });
          });

          // Delete cart entries for the customer
          const deleteCartSql = `DELETE FROM cart WHERE email = '${customer_email}'`;
          connection.query(deleteCartSql, function (err, results) {
            if (err) {
              console.error(err);
              res.status(500).json({ error: 'Database error.' });
            } else {
              // Send email to user
              const mailOptions = {
                from: 'chusmanjutt.129@gmail.com',
                to: customer_email,
                subject: 'Order Confirmation',
                html: `
                  <h2>Thank you for your order!</h2>
                  <p>Your order has been successfully placed. Below are the details:</p>
                  <hr>
                  <h3>Order ID: ${order_id}</h3>
                  <h3>Order Details:</h3>
                  <ul>
                    ${productDetails.map(product => `
                      <li>
                        <strong>Product Name:</strong> ${product.product_name}<br>
                        <strong>Quantity:</strong> ${product.quantity}<br>
                        <strong>Price:</strong> ${product.price}<br>
                      </li>
                    `).join('')}
                  </ul>
                  <hr>
                  <h3>Total Amount Paid: ${amount_paid}</h3>
                  <p>Thank you for shopping with us!</p>
                `
              };
              
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.error(error);
                  res.status(500).json({ error: 'Error sending email.' });
                } else {
                  console.log('Email sent: ' + info.response);
                  // Redirect to order_placed page with order ID
                  res.redirect(`/order_placed?order_id=${order_id}`);
                }
              });
            }
          });
        }
      });
    }
  });
}


load_admin_products_page = (req, res) => {
    res.render('admin_products');
}



load_order_placed_page = (req, res) => {
    res.render('order_placed');
}

load_admin_page = (req, res) => {
    res.render('admin_dashboard');
}

module.exports = {
    load_admin_page,
    load_admin_products_page,
    handle_add_product,
    handle_order_details,
    load_order_placed_page
}