const PetBehavior = require('../../model/PetBehavior');
const connection=require('../../config');
const petBehavior = new PetBehavior();

exports.recordBehavior = (req, res) => {
    const { petId, dateTime, description, category } = req.body;
    const petOwnerEmail = req.session.email; 

    // Fetch pet owner email from the query parameter and pass it to saveBehaviorRecord
    petBehavior.saveBehaviorRecord(petId, dateTime, description, category, petOwnerEmail)
        .then((recordId) => {
            console.log('Behavior record saved successfully. Record ID:', recordId);
            res.json({ success: true, recordId });
        })
        .catch((error) => {
            console.error('Error saving behavior record:', error);
            res.status(500).json({ success: false, error: error.message });
        });
};
  


// Function to display the behavior recording page
exports.displayPage = (req, res) => {
    const userEmail = req.session.email; // Retrieve the email from the query string
    
    // Fetching pets belonging to the user with the given email
    connection.query('SELECT * FROM pet_profile JOIN users ON pet_profile.owner_id = users.id WHERE users.email = ?', [userEmail], (error, pets) => {
      if (error) {
        console.error('Error fetching pets:', error);
        res.status(500).send('Error fetching pets.');
        return;
      }
      console.log(pets);
     
      // Assuming you have another variable `days` defined somewhere
      res.render('record_behavior', { pets });
    });
  };


  exports.displayPage_records = (req, res) => {
    //const userEmail = req.query.email;
    const userEmail = req.session.email;
     // Retrieve the email from the query string
    
    // Fetching behavior records associated with the user's email
    connection.query('SELECT * FROM behavior_records WHERE pet_owner_email = ?', [userEmail], (error, behaviorRecords) => {
      if (error) {
        console.error('Error fetching behavior records:', error);
        res.status(500).send('Error fetching behavior records.');
        return;
      }
      console.log(behaviorRecords);
     
      res.render('view_record_behavior', { behaviorRecords });
    });
};
