const express = require('express');
const http = require('http');
const cors = require('cors');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();




const app = express();

// Enable CORS for requests from React frontend
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(cookieParser());


// API Routes
app.use('/lms/api', authRoutes);



// 404 Handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

// Start Server
const PORT = process.env.PORT || 3001;
http.createServer(app).listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
