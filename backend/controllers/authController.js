const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
  
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
  
    try {
      const user = await userModel.verifyUsernameAndPassword(username, password);
  
      if (!user) {
        console.log("Login failed: user not found");
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      const token = jwt.sign(
        { username: user.username, emp_id: user.emp_id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 3600000
      });
  
      res.json({ message: "Login successful", departmentName: user.departmentName });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

exports.verifyToken = (req, res) => {
  res.json({ valid: true, user: req.user });
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};
