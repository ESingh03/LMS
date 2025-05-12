const userModel = require('../models/userModel');

exports.getAllUsersDetail = async (req, res) => {
  try {
    const users = await userModel.getAllUsersDetail();
    console.log(users);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { Emp_ID, Emp_Name, Dept_ID, Email, Casual_Leaves_Granted, Designation_ID, Username, Password, role } = req.body;

    const employeeData = { Emp_ID, Emp_Name, Dept_ID, Email, Casual_Leaves_Granted, Designation_ID };
    const userData = { Username, Password, role };

    await userModel.addUser(employeeData, userData);

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

  