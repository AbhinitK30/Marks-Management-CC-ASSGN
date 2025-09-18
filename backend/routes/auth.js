const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const Marks = require('../models/Marks');
const config = require('../config');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      return res.status(400).json({ 
        message: 'User with this email or username already exists' 
      });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password
    });

    await user.save();

    // Create initial random marks for the new user so dashboard has data on first login
    const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const initialTheory = {
      maths: randomBetween(60, 100),
      chemistry: randomBetween(60, 100),
      physics: randomBetween(60, 100),
      english: randomBetween(60, 100),
      socialStudies: randomBetween(60, 100)
    };
    const initialPractical = {
      mathsPractical: randomBetween(30, 50),
      chemistryPractical: randomBetween(30, 50),
      physicsPractical: randomBetween(30, 50),
      englishPractical: randomBetween(30, 50),
      socialStudiesPractical: randomBetween(30, 50)
    };
    await new Marks({
      studentId: user._id,
      studentName: user.username,
      theoryMarks: initialTheory,
      practicalMarks: initialPractical
    }).save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      config.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      config.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    res.json({
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        role: req.user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
