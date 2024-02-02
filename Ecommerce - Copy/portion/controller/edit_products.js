const path = require('path');
const fs = require('fs');
const connection = require('../config/sqlConnection');

handle_delete_product = (req, res) => {
    const pid = req.params.id;

    const sql = 'DELETE FROM products WHERE p_id = ?';
    connection.query(sql, [pid], (err, result) => {
        if (err) {
            console.error('Error deleting product:', err);
            res.status(500).json({ error: 'Database error.' }); // Return an error response
        } else {
            res.json(1); // Return a success response
        }
    });
}

handle_get_specific_product = (req, res) => {
    const category = req.params.category;

    const sql = 'select * FROM products WHERE category = ?';
    connection.query(sql, [category], (err, result) => {
        if (err) {
            console.error('Error deleting product:', err);
            res.status(500).json({ error: 'Database error.' }); // Return an error response
        } 
        const fileContents = [];

        // Assuming 'petPicture' is the column name
        result.forEach(row => {
          const fileName = row.productPicture;
    
          // Check if fileName is defined
          if (fileName) {
    
            //const filePath = path.join(__dirname, 'upload', fileName);
            const uploadDirectory = path.join(__dirname, '..', 'upload');
            const filePath = path.join(uploadDirectory, fileName);
    
    
            try {
              // Read the file content in base64
              const content = fs.readFileSync(filePath, { encoding: 'base64' });
    
              // Include all values from the result set along with the file content
              const rowWithFileContent = { ...row, productPicture: content };
              fileContents.push(rowWithFileContent);
            } catch (err) {
              console.error('Error reading file:', err);
            }
          }
        });
    
        // Send the array of result and file contents as a response
        res.json(fileContents);
      });
}


load_edit_product_page = (req, res) => {
    res.render('edit_product');
}

module.exports = {
    load_edit_product_page,
    handle_delete_product,
    handle_get_specific_product,
}

