const createModel = require('../model/createModel');
class CreateController {

async uploadFeed(req, res) {
    try {
        let feedData = {
            "userid": req.session.num,
            "username": req.session.username,
            "feedname": req.file.filename,
            "caption": req.body.caption
        };

        await createModel.uploadFeed(feedData);
        res.end("File is uploaded");
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}

}

module.exports = CreateController;