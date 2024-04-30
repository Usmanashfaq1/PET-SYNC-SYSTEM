const path = require('path');
const fs = require('fs');
const connection = require('../../config');

const handle_get_products = (req, res) => {
  const sql = `
  SELECT p.*, COUNT(pr.product_id) AS reviewCount 
  FROM products p 
  LEFT JOIN product_review pr ON p.p_id = pr.product_id 
  GROUP BY p.p_id
  
  `;

  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching pet profiles:', err);
      res.status(500).json({ error: 'An error occurred while fetching pet products' });
      return;
    }

    const fileContents = [];

    result.forEach(row => {
      const fileName = row.productPicture;

      if (fileName) {
        const uploadDirectory = path.join(__dirname, '..', '..', 'upload');
        const filePath = path.join(uploadDirectory, fileName);

        try {
          const content = fs.readFileSync(filePath, { encoding: 'base64' });
          const rowWithFileContent = { ...row, productPicture: content };
          fileContents.push(rowWithFileContent);
        } catch (err) {
          console.error('Error reading file:', err);
        }
      }
    });

    res.json(fileContents);
  });
};


load_products_page = (req, res) => {
  res.render('E-commerce');
}

Load_shop_page = (req, res) => {
  res.render('product');
}

module.exports = {
  handle_get_products,
  load_products_page,
  Load_shop_page
}

