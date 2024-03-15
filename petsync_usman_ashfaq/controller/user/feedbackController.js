const util = require('util');
const connection=require('../../config');

// Controller function for handling feedback submission
const submitFeedback = async (req, res) => {
    const { vet_name, vet_email, feedback } = req.body;

    try {
        // Check if the vet data already exists
        const selectQuery = `SELECT * FROM feedback WHERE vet_email = ?`;
        const selectQueryAsync = util.promisify(connection.query).bind(connection);
        const selectResults = await selectQueryAsync(selectQuery, [vet_email]);

        if (selectResults.length > 0) {
            const existingRow = selectResults[0];
            let satisfiedCount = existingRow.satisfied_count;
            let dissatisfiedCount = existingRow.dissatisfied_count;
            let totalCount = existingRow.total_count + 1;

            if (feedback === 'satisfied') {
                satisfiedCount++;
            } else if (feedback === 'dissatisfied') {
                dissatisfiedCount++;
            }

            // Update the existing row with incremented counts
            const updateQuery = `UPDATE feedback SET satisfied_count = ?, dissatisfied_count = ?, total_count = ? WHERE vet_email = ?`;
            await selectQueryAsync(updateQuery, [satisfiedCount, dissatisfiedCount, totalCount, vet_email]);

            console.log('Existing vet data updated successfully.');
            res.status(200).send('Feedback submitted successfully.');
        } else {
            // If the vet data doesn't exist, insert a new row
            let satisfiedCount = 0;
            let dissatisfiedCount = 0;
            let totalCount = 1;

            if (feedback === 'satisfied') {
                satisfiedCount = 1;
            } else if (feedback === 'dissatisfied') {
                dissatisfiedCount = 1;
            }

            const insertQuery = `INSERT INTO feedback (vet_name, vet_email, feedback, satisfied_count, dissatisfied_count, total_count) VALUES (?, ?, ?, ?, ?, ?)`;
            await selectQueryAsync(insertQuery, [vet_name,  vet_email, feedback, satisfiedCount, dissatisfiedCount, totalCount]);

            console.log('New vet data inserted successfully.');
            res.status(200).send('Feedback submitted successfully.');
        }
    } catch (error) {
        console.error('Error handling feedback submission:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = submitFeedback;
