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
  const userEmail = req.session.email; // Retrieve the email from the session

  // Fetch the pet owner ID using the userEmail
  connection.query('SELECT id FROM users WHERE email = ?', [userEmail], (error, results) => {
      if (error) {
          console.error('Error fetching user ID:', error);
          res.status(500).send('Error fetching user ID.');
          return;
      }

      if (results.length === 0) {
          console.error('User not found for email:', userEmail);
          res.status(404).send('User not found.');
          return;
      }

      const ownerId = results[0].id;

      // Fetching pets belonging to the user with the given email
      connection.query('SELECT * FROM pet_profile WHERE owner_id = ?', [ownerId], (error, pets) => {
          if (error) {
              console.error('Error fetching pets:', error);
              res.status(500).send('Error fetching pets.');
              return;
          }
          console.log(pets);

          // Assuming you have another variable `days` defined somewhere
          res.render('record_behavior', { pets });
      });
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



//
exports.displayEditPage = (req, res) => {
    const petId = req.query.petId;
    const behaviorId = req.query.behaviorId;
    console.log(behaviorId); // Get behaviorId from query params
    
    // Fetch behavior record by petId and behaviorId
    PetBehavior.getBehaviorRecordById(petId, behaviorId)
        .then((record) => {
            res.render('edit_behavior', { record });
        })
        .catch((error) => {
            console.error('Error fetching behavior record:', error);
            res.status(500).send('Error fetching behavior record.');
        });
  };
  

// Update behavior record
exports.updateBehavior = (req, res) => {
    const { petId, behaviorId, dateTime, description, category } = req.body;
    console.log(behaviorId);
    
    // Update behavior record in the database
    PetBehavior.updateBehaviorRecord(behaviorId, dateTime, description, category)
        .then(() => {
            res.redirect('/feedrbt_view'); // Redirect to view behavior records
        })
        .catch((error) => {
            console.error('Error updating behavior record:', error);
            res.status(500).send('Error updating behavior record.');
        });
  };
  
  // Delete behavior record
  exports.deleteBehavior = (req, res) => {
    const { petId, behaviorId } = req.body;
    
    // Delete behavior record from the database
    PetBehavior.deleteBehaviorRecord(behaviorId)
        .then(() => {
            res.redirect('/feedrbt_view'); // Redirect to view behavior records
        })
        .catch((error) => {
            console.error('Error deleting behavior record:', error);
            res.status(500).send('Error deleting behavior record.');
        });
  };
  
