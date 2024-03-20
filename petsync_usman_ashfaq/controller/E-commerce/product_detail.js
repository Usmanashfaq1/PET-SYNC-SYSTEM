const connection = require('../../config');
const path = require('path');
const fs = require('fs');
handle_get_product_detail_with_id = (req, res) => {
  const id = req.query.id;

  const sql = `
      SELECT products.*, IFNULL(cart.quantity, 0) AS currentItemQuantityInCart
      FROM products
      LEFT JOIN (
          SELECT item_id, quantity 
          FROM cart 
          WHERE email = ?
      ) cart ON products.p_id = cart.item_id
      WHERE products.p_id = ?
  `;

  connection.query(sql, [req.query.email_e, id], (err, result) => {
      if (err) {
          console.error('Error retrieving product details:', err);
          return res.status(500).json({ error: 'Database error.' });
      }

      const fileContents = [];

      result.forEach(row => {
          const fileName = row.productPicture;

          if (fileName) {
              const uploadDirectory = path.join(__dirname, '..', '..', 'upload');
              const filePath = path.join(uploadDirectory, fileName);

              try {
                  const content = fs.readFileSync(filePath, { encoding: 'base64' });
                  // Push each row with its respective content into the result array
                  const rowWithFileContent = { ...row, productPicture: content };
                  fileContents.push(rowWithFileContent);
              } catch (err) {
                  console.error('Error reading file:', err);
              }
          }
      });

      // Return the fileContents array containing product details
      res.json(fileContents);
  });
}





module.exports = {
    handle_get_product_detail_with_id,
}