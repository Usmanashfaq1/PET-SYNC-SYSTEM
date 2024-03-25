// controller.js

// Playfair Cipher implementation

// Function to generate the Playfair matrix
function generateMatrix(key) {
    // Remove duplicate letters from the key
    key = key.replace(/[^a-z]/g, ""); // Remove non-alphabetic characters
    key = key.replace(/j/g, "i"); // Replace 'j' with 'i' (since Playfair cipher doesn't use 'j')

    // Generate key matrix
    const alphabet = "abcdefghiklmnopqrstuvwxyz"; // 'j' is removed
    let matrix = key;
    for (let i = 0; i < alphabet.length; i++) {
        if (key.indexOf(alphabet[i]) === -1) {
            matrix += alphabet[i];
        }
    }

    return matrix;
}

// Function to encrypt using Playfair Cipher
function playfairEncrypt(plaintext, key) {
    // Generate the Playfair matrix
    const matrix = generateMatrix(key);

    // Prepare plaintext
    plaintext = plaintext.toLowerCase().replace(/[^a-z]/g, ""); // Remove non-alphabetic characters
    plaintext = plaintext.replace(/j/g, "i"); // Replace 'j' with 'i' (since Playfair cipher doesn't use 'j')
    // Insert 'x' between consecutive identical letters and add 'x' if plaintext length is odd
    let preparedText = plaintext[0];
    for (let i = 1; i < plaintext.length; i++) {
        if (preparedText[preparedText.length - 1] === plaintext[i]) {
            preparedText += 'x' + plaintext[i];
        } else {
            preparedText += plaintext[i];
        }
    }
    if (preparedText.length % 2 !== 0) {
        preparedText += 'x';
    }

    // Encrypt digraphs
    let encryptedText = '';
    for (let i = 0; i < preparedText.length; i += 2) {
        const char1 = preparedText[i];
        const char2 = preparedText[i + 1];
        const row1 = Math.floor(matrix.indexOf(char1) / 5);
        const col1 = matrix.indexOf(char1) % 5;
        const row2 = Math.floor(matrix.indexOf(char2) / 5);
        const col2 = matrix.indexOf(char2) % 5;

        // Handle same row
        if (row1 === row2) {
            encryptedText += matrix[row1 * 5 + (col1 + 1) % 5];
            encryptedText += matrix[row2 * 5 + (col2 + 1) % 5];
        }
        // Handle same column
        else if (col1 === col2) {
            encryptedText += matrix[((row1 + 1) % 5) * 5 + col1];
            encryptedText += matrix[((row2 + 1) % 5) * 5 + col2];
        }
        // Handle rectangle
        else {
            encryptedText += matrix[row1 * 5 + col2];
            encryptedText += matrix[row2 * 5 + col1];
        }
    }

    return encryptedText;
}

// Function to decrypt using Playfair Cipher
function playfairDecrypt(ciphertext, key) {
    // Generate the Playfair matrix
    const matrix = generateMatrix(key);

    // Decrypt digraphs
    let decryptedText = '';
    for (let i = 0; i < ciphertext.length; i += 2) {
        const char1 = ciphertext[i];
        const char2 = ciphertext[i + 1];
        const row1 = Math.floor(matrix.indexOf(char1) / 5);
        const col1 = matrix.indexOf(char1) % 5;
        const row2 = Math.floor(matrix.indexOf(char2) / 5);
        const col2 = matrix.indexOf(char2) % 5;

        // Handle same row
        if (row1 === row2) {
            decryptedText += matrix[row1 * 5 + (col1 + 4) % 5];
            decryptedText += matrix[row2 * 5 + (col2 + 4) % 5];
        }
        // Handle same column
        else if (col1 === col2) {
            decryptedText += matrix[((row1 + 4) % 5) * 5 + col1];
            decryptedText += matrix[((row2 + 4) % 5) * 5 + col2];
        }
        // Handle rectangle
        else {
            decryptedText += matrix[row1 * 5 + col2];
            decryptedText += matrix[row2 * 5 + col1];
        }
    }

    return decryptedText;
}

// Controller function for encryption
exports.encrypt = (req, res) => {
    const { plaintext, key } = req.body;
    const encryptedText = playfairEncrypt(plaintext, key);
    res.json({ encryptedText });
};

// Controller function for decryption
exports.decrypt = (req, res) => {
    const { email, name } = req.body; // Assuming encrypted email and name are sent in the request body

    // Encryption key
    const key = "bro";

    // Decrypt email and name
    const decryptedEmail = playfairDecrypt(email, key);
    const decryptedName = playfairDecrypt(name, key);

    // Check if decryption was successful
    if (decryptedEmail && decryptedName) {
        // Respond with decrypted email and name
        res.json({ decryptedEmail, decryptedName });
    } else {
        res.status(400).json({ error: 'Decryption failed' });
    }
};
