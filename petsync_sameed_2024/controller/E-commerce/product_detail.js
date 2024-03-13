const connection = require('../../config');
const path = require('path');
const fs = require('fs');


handle_get_product_detail_with_id = (req, res) =>
{
    var id = req.query.id;

    const sql = 'select * FROM products WHERE p_id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting product:', err);
      res.status(500).json({ error: 'Database error.' });
    }
    const fileContents = [];

    result.forEach(row => {
      const fileName = row.productPicture;

      if (fileName) {

        const uploadDirectory = path.join(__dirname, '..','..', 'upload');
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
}




module.exports = {
    handle_get_product_detail_with_id,
}