const express = require('express');
const User = require('../models/AdminSchema');
const { authMiddleware } = require('./auth');

const router = express.Router();

// Create team members (Only admins can do this)
router.post('/createTeamMember', authMiddleware('admin'), async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = new User({ name, email, password, role: 'team' });
    await user.save();
    res.status(201).json({ message: 'Team member created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/me', authMiddleware(), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,  // assuming `name` is part of the user object
    email: req.user.email,  // assuming `email` is part of the user object
    role: req.user.role,
  });
});


module.exports = router;
