const db = require('../config/db');

//Authentication
exports.verifyUsernameAndPassword = async (username, password) => {
  const [rows] = await db.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password] 
  );
  return rows[0]; 
};

//to return user details
exports.getAllUsersDetail = async () => {
  const [rows] = await db.query(`
    SELECT e.Emp_ID, e.Emp_Name, d.Dept_Name, e.Email, e.Casual_Leaves_Granted,
           des.Designation_Name, u.Username, u.role
    FROM Employees e
    JOIN Departments d ON e.Dept_ID = d.Dept_ID
    JOIN Designation des ON e.Designation_ID = des.Designation_ID
    JOIN Users u ON e.Emp_ID = u.Emp_ID
  `);
  return rows;
};

//add_user
exports.addUser = async (employeeData, userData) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const empSql = `
      INSERT INTO Employees (Emp_ID, Emp_Name, Dept_ID, Email, Casual_Leaves_Granted, Designation_ID)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await connection.query(empSql, [
      employeeData.Emp_ID,
      employeeData.Emp_Name,
      employeeData.Dept_ID,
      employeeData.Email,
      employeeData.Casual_Leaves_Granted,
      employeeData.Designation_ID
    ]);

    const userSql = `
      INSERT INTO Users (Username, Password, Emp_ID, role)
      VALUES (?, ?, ?, ?)
    `;
    await connection.query(userSql, [
      userData.Username,
      userData.Password,
      employeeData.Emp_ID,
      userData.role
    ]);

    await connection.commit();
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};