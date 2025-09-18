const express = require('express');
const Marks = require('../models/Marks');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Helper function to generate random marks
const generateRandomMarks = () => {
  const theoryMarks = {
    maths: Math.floor(Math.random() * 41) + 60, // 60-100
    chemistry: Math.floor(Math.random() * 41) + 60,
    physics: Math.floor(Math.random() * 41) + 60,
    english: Math.floor(Math.random() * 41) + 60,
    socialStudies: Math.floor(Math.random() * 41) + 60
  };
  
  const practicalMarks = {
    mathsPractical: Math.floor(Math.random() * 21) + 30, // 30-50
    chemistryPractical: Math.floor(Math.random() * 21) + 30,
    physicsPractical: Math.floor(Math.random() * 21) + 30,
    englishPractical: Math.floor(Math.random() * 21) + 30,
    socialStudiesPractical: Math.floor(Math.random() * 21) + 30
  };
  
  return { theoryMarks, practicalMarks };
};

// Get all marks (for admin) or user's own marks
router.get('/', auth, async (req, res) => {
  try {
    let marks;
    
    if (req.user.role === 'admin') {
      // Admin can see all marks
      marks = await Marks.find().populate('studentId', 'username email');
    } else {
      // Students can only see their own marks
      marks = await Marks.find({ studentId: req.user._id });
      
      // If no marks exist for the user, create random marks
      if (marks.length === 0) {
        const { theoryMarks, practicalMarks } = generateRandomMarks();

        // Create new marks with random data
        const newMarks = new Marks({
          studentId: req.user._id,
          studentName: req.user.username,
          theoryMarks,
          practicalMarks
        });

        await newMarks.save();
        marks = [newMarks];
      }
    }

    res.json(marks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get marks by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const marks = await Marks.findById(req.params.id).populate('studentId', 'username email');
    
    if (!marks) {
      return res.status(404).json({ message: 'Marks not found' });
    }

    // Check if user can access these marks
    if (req.user.role !== 'admin' && marks.studentId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(marks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create or update marks
router.post('/', auth, async (req, res) => {
  try {
    const {
      studentId,
      studentName,
      theoryMarks,
      practicalMarks
    } = req.body;

    // Check if marks already exist for this student
    let marks = await Marks.findOne({ studentId: studentId || req.user._id });

    if (marks) {
      // Update existing marks
      marks.studentName = studentName || marks.studentName;
      marks.theoryMarks = { ...marks.theoryMarks, ...theoryMarks };
      marks.practicalMarks = { ...marks.practicalMarks, ...practicalMarks };
      
      await marks.save();
      res.json({ message: 'Marks updated successfully', marks });
    } else {
      // Generate random marks for new user
      const { theoryMarks: randomTheory, practicalMarks: randomPractical } = generateRandomMarks();

      // Create new marks with random data
      marks = new Marks({
        studentId: studentId || req.user._id,
        studentName: studentName || req.user.username,
        theoryMarks: theoryMarks || randomTheory,
        practicalMarks: practicalMarks || randomPractical
      });

      await marks.save();
      res.status(201).json({ message: 'Marks created successfully with random data', marks });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update marks
router.put('/:id', auth, async (req, res) => {
  try {
    const marks = await Marks.findById(req.params.id);
    
    if (!marks) {
      return res.status(404).json({ message: 'Marks not found' });
    }

    // Check if user can update these marks
    if (req.user.role !== 'admin' && marks.studentId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { studentName, theoryMarks, practicalMarks } = req.body;

    if (studentName) marks.studentName = studentName;
    if (theoryMarks) marks.theoryMarks = { ...marks.theoryMarks, ...theoryMarks };
    if (practicalMarks) marks.practicalMarks = { ...marks.practicalMarks, ...practicalMarks };

    await marks.save();
    res.json({ message: 'Marks updated successfully', marks });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete marks
router.delete('/:id', auth, async (req, res) => {
  try {
    const marks = await Marks.findById(req.params.id);
    
    if (!marks) {
      return res.status(404).json({ message: 'Marks not found' });
    }

    // Only admin can delete marks
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Marks.findByIdAndDelete(req.params.id);
    res.json({ message: 'Marks deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
