const db = require('../config');

const Report = {};

Report.create = (report, result) => {
    db.query('INSERT INTO reports SET ?', report, (err, res) => {
        if (err) {
            console.error("Error reporting user: ", err);
            result(err, null);
            return;
        }

        console.log("User reported successfully: ", { id: res.insertId, ...report });
        result(null, { id: res.insertId, ...report });
    });
};

module.exports = Report;
