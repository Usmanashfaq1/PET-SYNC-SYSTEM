const connection = require('../config');


class editProfileModel {
    
    enterInfo(req, res) {
        console.log(req.file);
        console.log(req.body);
    
        connection.query('SELECT * FROM userinfo WHERE id=?', req.session.num, (error, userInfoResult) => {
            if (error) throw error;
            var userInfo = {
                "profilepic": (!req.file) ? userInfoResult[0].profilepic : req.file.filename,
                "fullname": (req.body.fullName == '') ? userInfoResult[0].fullname : req.body.fullName,
                "birthdate": (req.body.DOB == '') ? userInfoResult[0].birthdate : req.body.DOB,
                "bio": (req.body.Bio == '') ? userInfoResult[0].bio : req.body.Bio,
                "note": (req.body.note == '') ? userInfoResult[0].note : req.body.note,
                "location": (req.body.location == '') ? userInfoResult[0].location : req.body.location
            };
    
            var sqlQuery1 = "UPDATE userinfo SET profilepic=?, fullname=?, birthdate=?, bio=?, note=?, location=? WHERE id=?";
            var values = [userInfo.profilepic, userInfo.fullname, userInfo.birthdate, userInfo.bio, userInfo.note, userInfo.location, req.session.num];
    
            connection.query(sqlQuery1, values, (error, result) => {
                if (error) throw error;
                let userInfoQuery = "SELECT * FROM userinfo WHERE id='" + req.session.num + "'";
                connection.query(userInfoQuery, (error, userInfoResult) => {
                    if (error) throw error;
                    console.log(userInfoResult[0]);
                    return res.render('userSetting', { msg: "Saved successfully!", userInfo: userInfoResult[0] });
                });
            });
        });
    }
    
}

module.exports = editProfileModel;