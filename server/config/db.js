const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI must be defined in .env');
    }
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('MongoDB connected');
    return true;
  } catch (error) {
    console.warn('MongoDB unavailable:', error.message);
    console.warn('API will run in demo mode. Auth and checkout need MongoDB.');
    return false;
  }
};

module.exports = connectDB;
