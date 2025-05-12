const db = require('../config/db');

//Return department details
exports.getAllDesignations = async () => {
  const [rows] = await db.query(
    'SELECT * FROM Designation;'
  );
  return rows; 
};
