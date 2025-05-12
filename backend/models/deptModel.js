const db = require('../config/db');

//Return department details
exports.getAllDepartments = async () => {
  const [rows] = await db.query(
    'SELECT * FROM Departments;'
  );
  return rows; 
};
