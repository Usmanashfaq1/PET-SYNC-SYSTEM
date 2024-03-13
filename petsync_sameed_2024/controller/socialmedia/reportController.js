const Report = require('../../model/Report');

exports.reportUser = (req, res) => {
    const { userId } = req.params;
    const { reason } = req.body;

    // Validate input
    if (!reason) {
        return res.status(400).send('Reason for reporting is required');
    }

    // Create report object
    const reportData = {
        reported_user_id: userId,
        reporter_user_id: req.session.num,
        reason: reason
    };

    // Store the report in the database
    Report.create(reportData, (err, report) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reporting user');
        }
        res.status(201).send('User reported successfully');
    });
};
