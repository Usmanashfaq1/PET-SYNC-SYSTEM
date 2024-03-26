const connection = require('../config');

class PetBehavior {
    constructor() {
        this.connection = connection;
    }

    saveBehaviorRecord(petId, dateTime, description, category, petOwnerEmail) {
        return new Promise((resolve, reject) => {
            console.log(petId);
            // Fetch petname and petPicture from pet_profile using petId
            const fetchQuery = 'SELECT petname, petPicture FROM pet_profile WHERE id = ?';
            this.connection.query(fetchQuery, [petId], (fetchError, fetchResult) => {
                if (fetchError) {
                    reject(fetchError);
                    return;
                }

                if (fetchResult.length === 0) {
                    reject(new Error('Pet not found.'));
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


    static getBehaviorRecordById(petId, behaviorId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM behavior_records WHERE pet_id = ? AND id = ?'; // Modify query to include both petId and behaviorId
            connection.query(query, [petId, behaviorId], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    if (results.length === 0) {
                        reject(new Error('Behavior record not found.'));
                    } else {
                        resolve(results[0]);
                    }
                }
            });
        });
    }
    

    static updateBehaviorRecord(behaviorId, dateTime, description, category) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE behavior_records SET date_time = ?, description = ?, category = ? WHERE  id = ?'; // Include behaviorId in the query
            connection.query(query, [dateTime, description, category, behaviorId], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }
    
    static deleteBehaviorRecord(behaviorId) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM behavior_records WHERE  id = ?'; // Include behaviorId in the query
            connection.query(query, [behaviorId], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }
    
}

module.exports = PetBehavior;
