const db = require('../config/db');

exports.verifyUsernameAndPassword = async (username, password) => {
  const [rows] = await db.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password] 
  );
  return rows[0]; 
};
