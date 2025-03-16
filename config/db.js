const mongoose = require('mongoose');

require('dotenv').config();

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, // Shorten timeout
        socketTimeoutMS: 45000, // Increase socket timeout
        bufferCommands: false, // Prevent buffering errors
      });
      console.log("✅ MongoDB Connected Successfully!");
    } catch (error) {
      console.error("❌ MongoDB Connection Error:", error.message);
      process.exit(1); // Exit the app if MongoDB connection fails
    }
  };
  
  module.exports = connectDB;