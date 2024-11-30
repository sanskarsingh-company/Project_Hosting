const express = require('express'); 
const User = require('../models/AdminSchema');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser());

// Login route with setting token in cookie
// Login route with setting token in cookie
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set token in an httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 3600000, // 1 hour
      secure: process.env.NODE_ENV === 'production', // Set secure flag in production
      sameSite: 'strict', // Add SameSite attribute
    });

    res.status(200).json({ message: 'Login successful', role: user.role });
    
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


console.log("Current environment:", process.env.NODE_ENV);
// Register route (only admins can create new admins and team members)
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

const authMiddleware = (roleRequired) => (req, res, next) => {
  const token = req.cookies.token; // Access the token from cookies
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || (roleRequired && decoded.role !== roleRequired)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = decoded; // Store the decoded token (user id and role)
    next();
  });
};


module.exports = { router, authMiddleware };
