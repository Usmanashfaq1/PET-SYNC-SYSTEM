const path = require('path');
const fs = require('fs');
const connection = require('../../config');

const handle_get_products = (req, res) => {


  const sql = `SELECT * FROM products`;

  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching pet profiles:', err);
      res.status(500).json({ error: 'An error occurred while fetching pet profiles' });
      return;
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


load_products_page = (req, res) => {
  res.render('E-commerce');
}

module.exports = {
  handle_get_products,
  load_products_page,
}

