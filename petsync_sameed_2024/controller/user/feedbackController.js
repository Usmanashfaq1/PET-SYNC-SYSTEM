const util = require('util');
const connection = require('../../config');
const submitFeedback = async (req, res) => {
    //destructuring request body
    const { vet_name, vet_email, feedback } = req.body;

    try {
        //check if the vet data already exists
        const selectQuery = `SELECT * FROM feedback WHERE vet_email = ?`;

        //database query function
        const selectQueryAsync = util.promisify(connection.query).bind(connection);
        
        //execution
        const selectResults = await selectQueryAsync(selectQuery, [vet_email]);

        //checking if vet data exists
        if (selectResults.length > 0) {
            //update the existing row
            const existingRow = selectResults[0];
            let satisfiedCount = existingRow.satisfied_count;
            let dissatisfiedCount = existingRow.dissatisfied_count;
            let totalCount = existingRow.total_count + 1;

            //updating counts based on feedback
            if (feedback === 'satisfied') {
                satisfiedCount++;
            } else if (feedback === 'dissatisfied') {
                dissatisfiedCount++;
            }

            //update query
            const updateQuery = `UPDATE feedback SET satisfied_count = ?, dissatisfied_count = ?, total_count = ? WHERE vet_email = ?`;
            await selectQueryAsync(updateQuery, [satisfiedCount, dissatisfiedCount, totalCount, vet_email]);

            console.log('Existing vet data updated successfully.');
            // success response
            res.status(200).send('Feedback submitted successfully.');
        } else {
            //if vet data doesn't exist, insert a new row
            let satisfiedCount = 0;
            let dissatisfiedCount = 0;
            let totalCount = 1;

            //incrementing
            if (feedback === 'satisfied') {
                satisfiedCount = 1;
            } else if (feedback === 'dissatisfied') {
                dissatisfiedCount = 1;
            }

            //insert query to add new row
            const insertQuery = `INSERT INTO feedback (vet_name, vet_email, feedback, satisfied_count, dissatisfied_count, total_count) VALUES (?, ?, ?, ?, ?, ?)`;
            await selectQueryAsync(insertQuery, [vet_name, vet_email, feedback, satisfiedCount, dissatisfiedCount, totalCount]);

            console.log('New vet data inserted successfully.');
            res.status(200).send('Feedback submitted successfully.');
        }
    } catch (error) {
        console.error('Error handling feedback submission:', error);
        //sending internal server error response
        res.status(500).send('Internal Server Error');
    }
};
//exporting controller function
module.exports = submitFeedback;
