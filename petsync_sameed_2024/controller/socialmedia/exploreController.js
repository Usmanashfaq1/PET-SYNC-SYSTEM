const connection = require('../../config');
const moment = require('moment');

class exploreController {
    displayPage(req, res) {
        if (req.session.num && typeof req.session.num !== "undefined") {
            console.log("LoggedIn " + req.session.num);
            const name = req.session.username;

            
const feedQuery = `
SELECT *,
    COALESCE(comment_count, 0) AS comment_count,
    COALESCE(likes, 0) AS like_count
FROM userfeed
ORDER BY (COALESCE(comment_count, 0) + COALESCE(likes, 0)) DESC;`

            connection.query(feedQuery, (error, feedResult) => {
                if (error) {
                    console.error("Error retrieving user feed:", error);
                    return res.status(500).send("An error occurred while retrieving user feed data.");
                }

                console.log(feedResult);

                if (feedResult.length == 0) {
                    // If feedResult is empty, render the main view with an empty feed
                    return res.render('exploreView', { moment: moment, feedResult: feedResult, name: name });
                }

                // Array to store profile pictures for each user
                let profilePics = [];

                // Loop through feedResult to get profile pics
                for (let i = 0; i < feedResult.length; i++) {
                    let fdname = feedResult[i].feedname;
                    let userId = req.session.num;

                    // Query to check if the current user has liked the feed
                    let isLikedQuery = "SELECT EXISTS(SELECT 1 FROM likeinfo WHERE (feedname = '" + fdname + "' AND likedby = '" + userId + "') LIMIT 1)";

                    connection.query(isLikedQuery, (error, isLikedResult) => {
                        if (error) {
                            console.error("Error checking if feed is liked:", error);
                            return res.status(500).send("An error occurred while checking if the feed is liked.");
                        }

                        let R = JSON.stringify(isLikedResult[0]);

                        if (R[R.length - 2] == '1') {
                            feedResult[i].isliked = "dislike";
                        } else {
                            feedResult[i].isliked = "like";
                        }

                        // Query to get the profile picture for the user who created the feed
                        let feedCreaterQuery = "SELECT profilepic FROM userinfo WHERE username = '" + feedResult[i].username + "'";

                        connection.query(feedCreaterQuery, (error, profilePicResult) => {
                            if (error) {
                                console.error("Error retrieving profile picture:", error);
                                return res.status(500).send("An error occurred while retrieving the profile picture.");
                            }

                            // Check if profilePicResult is empty or not
                            let imageName = (profilePicResult.length > 0) ? profilePicResult[0].profilepic : "default_profilepic.png";

                            // Push profile picture to profilePics array
                            profilePics.push(imageName);

                            // Check if all profile pictures have been retrieved
                            if (profilePics.length === feedResult.length) {
                                // Render the view with feedResult and profilePics
                                return res.render('exploreView', { moment: moment, feedResult: feedResult, name: name, profilePics: profilePics });
                            }
                        });
                    });
                }
            });
        } else {
            console.log("Not loggedIn " + req.session.num);
            return res.redirect('/login');
        }
    }
}

module.exports = exploreController;
