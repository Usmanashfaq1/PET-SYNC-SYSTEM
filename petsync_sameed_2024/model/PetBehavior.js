const connection = require('../config');

class PetBehavior {
  constructor() {
    this.connection = connection;
  }

  saveBehaviorRecord(petId, dateTime, description, category, petOwnerEmail) {
    return new Promise((resolve, reject) => {
        // Fetch petname and petPicture from pet_profile using petId
        const fetchQuery = 'SELECT petname, petPicture FROM pet_profile WHERE id = ?';
        this.connection.query(fetchQuery, [petId], (fetchError, fetchResult) => {
            if (fetchError) {
                reject(fetchError);
                return;
            }

            // Extract petname and petPicture from the fetch result
            const { petname, petPicture } = fetchResult[0];

            // Prepare and execute the insert query for behavior_records
            const insertQuery = 'INSERT INTO behavior_records (pet_id, petname, petPicture, date_time, description, category, pet_owner_email) VALUES (?, ?, ?, ?, ?, ?, ?)';
            this.connection.query(insertQuery, [petId, petname, petPicture, dateTime, description, category, petOwnerEmail], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.insertId);
                }
            });
        });
    });
}


  
}

module.exports = PetBehavior;
