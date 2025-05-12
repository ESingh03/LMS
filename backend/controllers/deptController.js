const deptModel = require('../models/deptModel');

exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await deptModel.getAllDepartments();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


  