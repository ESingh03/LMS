const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');
const deptController =require('../controllers/deptController');
const designationController=require('../controllers/designationController');
//auth
router.post('/login', authController.login);
router.get('/verify-token', authenticateToken, authController.verifyToken);
router.get('/logout', authController.logout);

//users
router.get('/get-user-detail',authenticateToken, userController.getAllUsersDetail);


//department
router.get('/fetch-departments',authenticateToken,deptController.getAllDepartments);

//designation
router.get('/fetch-designations',authenticateToken,designationController.getAllDesignations);

module.exports = router;
