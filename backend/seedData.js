require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Marks = require('./models/Marks');
const config = require('./config');

// No predefined data - users will get random marks when they register

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(config.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Marks.deleteMany({});
    console.log('Cleared existing data');

    console.log('\n✅ Database cleared successfully!');
    console.log('\n📊 Database Status:');
    console.log('- No predefined users');
    console.log('- No sample data');
    console.log('- New users will get random marks when they register');
    console.log('\n🎯 How it works:');
    console.log('1. User registers a new account');
    console.log('2. User logs in');
    console.log('3. System automatically generates random marks');
    console.log('4. User can view and edit their marks');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seed function
seedDatabase();
