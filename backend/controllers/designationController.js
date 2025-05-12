const designationModel = require('../models/designationModel');

exports.getAllDesignations = async (req, res) => {
  try {
    const designation = await designationModel.getAllDesignations();
    res.json(designation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


  