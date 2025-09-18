const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  studentName: {
    type: String,
    required: true
  },
  theoryMarks: {
    maths: { type: Number, min: 0, max: 100, default: 0 },
    chemistry: { type: Number, min: 0, max: 100, default: 0 },
    physics: { type: Number, min: 0, max: 100, default: 0 },
    english: { type: Number, min: 0, max: 100, default: 0 },
    socialStudies: { type: Number, min: 0, max: 100, default: 0 }
  },
  practicalMarks: {
    mathsPractical: { type: Number, min: 0, max: 50, default: 0 },
    chemistryPractical: { type: Number, min: 0, max: 50, default: 0 },
    physicsPractical: { type: Number, min: 0, max: 50, default: 0 },
    englishPractical: { type: Number, min: 0, max: 50, default: 0 },
    socialStudiesPractical: { type: Number, min: 0, max: 50, default: 0 }
  },
  totalTheory: {
    type: Number,
    default: 0
  },
  totalPractical: {
    type: Number,
    default: 0
  },
  grandTotal: {
    type: Number,
    default: 0
  },
  percentage: {
    type: Number,
    default: 0
  },
  grade: {
    type: String,
    default: 'F'
  }
}, {
  timestamps: true
});

// Calculate totals and percentage before saving
marksSchema.pre('save', function(next) {
  const theoryMarks = this.theoryMarks;
  const practicalMarks = this.practicalMarks;
  
  // Calculate theory total
  this.totalTheory = Object.values(theoryMarks).reduce((sum, mark) => sum + mark, 0);
  
  // Calculate practical total
  this.totalPractical = Object.values(practicalMarks).reduce((sum, mark) => sum + mark, 0);
  
  // Calculate grand total (theory out of 500 + practical out of 250 = 750 total)
  this.grandTotal = this.totalTheory + this.totalPractical;
  
  // Calculate percentage (out of 750 total marks)
  this.percentage = (this.grandTotal / 7.5).toFixed(2);
  
  // Calculate grade
  if (this.percentage >= 90) this.grade = 'A+';
  else if (this.percentage >= 80) this.grade = 'A';
  else if (this.percentage >= 70) this.grade = 'B+';
  else if (this.percentage >= 60) this.grade = 'B';
  else if (this.percentage >= 50) this.grade = 'C';
  else if (this.percentage >= 40) this.grade = 'D';
  else this.grade = 'F';
  
  next();
});

module.exports = mongoose.model('Marks', marksSchema);
