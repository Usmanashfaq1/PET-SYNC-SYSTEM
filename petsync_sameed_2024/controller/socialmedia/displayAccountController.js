const displayAccountModel = require("../../model/displayAccountModel");
const connection = require("../../config");
const util = require('util');

const moment = require('moment');

// Promisify the connection query method
const queryAsync = util.promisify(connection.query).bind(connection);
class DisplayAccountController {
 
  async displayAccount(req, res) {
    try {
        console.log("Searched for => " + req.params['username']);
        if (req.params['username'] == req.session.username) {
            return res.redirect('/profile');
        } else {
            const userData = await displayAccountModel.getUserData(req.params['username'], req.session.username);
            if (userData && userData.feedResult) {
                for (let i = 0; i < userData.feedResult.length; i++) {
                    const feed = userData.feedResult[i];
                    const isLikedQuery = `SELECT EXISTS(SELECT 1 FROM likeinfo WHERE (feedname = '${feed.feedname}' AND likedby = '${req.session.num}') LIMIT 1)`;
                    connection.query(isLikedQuery, (error, isLikedResult) => {
                        if (error) {
                            console.error("Error:", error);
                            throw error;
                        }
                        const R = JSON.stringify(isLikedResult[0]);
                        if (R[R.length - 2] === '1') {
                            userData.feedResult[i].isliked = "dislike";
                        } else {
                            userData.feedResult[i].isliked = "like";
                        }
                        console.log(userData.feedResult[i]);
                    });
                }
            }
            console.log(req.params['username']);
            // Now let's handle following and follow count
            let sqlQuery1 = "SELECT id FROM users WHERE username='" + req.params['username'] + "'";
            connection.query(sqlQuery1, (error, searchId) => {
                if (error) throw error;

                let followQuery = "SELECT EXISTS(SELECT 1 FROM followinfo WHERE (follower = '" + req.session.username + "' AND following = '" + req.params['username'] + "') LIMIT 1)";
                connection.query(followQuery, (error, followResult) => {
                    if (error) throw error;
                    followResult = JSON.stringify(followResult);
                    let initialFollowedUnfollowed = "Follow";
                    if (followResult[followResult.length - 3] == '1')
                        initialFollowedUnfollowed = "Unfollow";

                        let followQuery = "SELECT followers, following FROM followcount WHERE username = ?";
                        connection.query(followQuery, [req.params['username']], (error, followResult) => {
                            if (error) throw error;


                            // Your code to handle the followResult
                        
                        
                        // Combine all data and render once
                        // Combine all data and render once
                        console.log("Data before rendering:", { moment: moment,userData: userData, initialFollowedUnfollowed: initialFollowedUnfollowed, followResult: followResult[0] });
                          return res.render('otherUserProfile', {moment: moment,userData: userData, initialFollowedUnfollowed: initialFollowedUnfollowed, followResult: followResult[0]});

                    });
                });
            });
        }
    } catch (error) {
        console.error("Error in displaying account:", error);
        return res.status(500).send("Internal server error");
    }
}





async  followUser(req, res) {
    try {
        if (req.session.num != null && typeof req.session.num != "undefined") {
            console.log('Flag=> ' + req.body.flag);
            let flag = req.body.flag;
            let followData = {
                follower: req.session.username,
                following: req.body.following
            };

            let sqlQuery = "INSERT INTO followinfo (follower, following) VALUES (?, ?)";
            let sqlValues = [followData.follower, followData.following];
            if (flag == 0) {
                sqlQuery = "DELETE FROM followinfo WHERE follower = ? AND following = ?";
            }

            // Execute follow/unfollow operation in followinfo table
            await queryAsync(sqlQuery, sqlValues);

            // Function to insert record with 0 followers and 0 following
            // (rest of the code remains the same)
            async function insertZeroFollowCount(username) {
                let insertSql = "INSERT INTO followcount (username, followers, following) VALUES (?, 0, 0)";
                await queryAsync(insertSql, [username]);
                console.log("Record inserted successfully for", username);
            }

            // Check if records exist for follower
            let followerResults = await queryAsync("SELECT * FROM followcount WHERE username = ?", [followData.follower]);
            if (followerResults.length === 0) {
                // Insert record with 0 followers and 0 following for follower
                await insertZeroFollowCount(followData.follower);
            } else {
                console.log("Record already exists for follower, continuing to check and insert for following");
            }

            // Check if records exist for following
            let followingResults = await queryAsync("SELECT * FROM followcount WHERE username = ?", [followData.following]);
            if (followingResults.length === 0) {
                // Insert record with 0 followers and 0 following for following
                await insertZeroFollowCount(followData.following);
            } else {
                console.log("Record already exists for following");
            }

            let val = "+1";
            if (flag == 0)
                val = "-1";

            // Update following count for follower
            let followerUpdateSql = `UPDATE followcount SET following = following ${val} WHERE username=?`;
            await queryAsync(followerUpdateSql, [followData.follower]);

            // Update follower count for following
            let followingUpdateSql = `UPDATE followcount SET followers = followers ${val} WHERE username=?`;
            await queryAsync(followingUpdateSql, [followData.following]);

            // Respond with success message or redirect as needed
            res.status(200).send("success");

        } else {
            return res.redirect('/login');
        }
    } catch (error) {
        console.error("Error in followUser function:", error);
        res.status(500).send("Internal Server Error");
    }
}




  
}

module.exports = new DisplayAccountController();
