const connection = require('../../config');





handle_send_review = (req, res) => {
    const { rating, opinion, email, product_id } = req.body; // Extracting data from req.body

    const selectNameQuery = "SELECT username FROM users WHERE email = ?";
    connection.query(selectNameQuery, [email], (nameErr, nameResults) => {
        if (nameErr) {
            console.error("Error fetching user's name:", nameErr);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            if (nameResults.length === 0) {
                res.status(400).json({ error: "User with provided email not found" });
                return;
            }

            const userName = nameResults[0].username;

            const now = new Date();
            const date = now.toISOString().slice(0, 10) + ' ' + now.toTimeString().slice(0, 8); // Combine date and time

            const insertReviewQuery = "INSERT INTO product_review (rating, description, date, product_id, email, name) VALUES (?, ?, ?, ?, ?, ?)";
            connection.query(insertReviewQuery, [rating, opinion, date, product_id, email, userName], (insertErr, insertResult) => {
                if (insertErr) {
                    console.error("Error inserting review:", insertErr);
                    res.status(500).json({ error: "Internal Server Error" });
                } else {
                    console.log("Review inserted successfully");
                    res.status(200).json({ message: "Review submitted successfully" });
                }
            });
        }
    });
}




handle_get_reviews = (req, res) => {
    const { product_id } = req.query;

    const sql = "SELECT * FROM product_review WHERE product_id = ? ORDER BY date DESC";
    connection.query(sql, [product_id], (err, results) => {
        if (err) {
            console.error("Error fetching reviews:", err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            console.log("Reviews fetched successfully");

            res.status(200).json({ reviews: results });
        }
    });
};





module.exports  = {
    handle_send_review,
    handle_get_reviews,
}