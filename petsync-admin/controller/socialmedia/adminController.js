// controllers/adminController.js
const Report = require('../../model/reporting/reports');
const User = require('../../model/reporting/users');

exports.getAllReports = async (req, res, next) => {
    try {
        const reports = await Report.findAll();
        res.render('reports', { reports });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching reports');
    }
};

exports.processReport = async (req, res, next) => {
    const { reportId, action } = req.params;

    try {
        const report = await Report.findByPk(reportId);

        if (!report) {
            return res.status(404).send('Report not found');
        }

        if (action === 'block') {
            const user = await User.findByPk(report.reportedUserId);

            if (!user) {
                return res.status(404).send('User not found');
            }

            user.isBlocked = true;
            await user.save();

            await report.destroy();

            return res.status(200).send('User blocked successfully');
        } else if (action === 'neglect') {
            await report.destroy();
            return res.status(200).send('Report neglected successfully');
        } else {
            return res.status(400).send('Invalid action');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Error processing report');
    }
};
