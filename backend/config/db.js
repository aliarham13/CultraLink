const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // We pass the URI and a 5-second timeout to prevent infinite hanging
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000 
    });
    console.log(`✅ MongoDB Connected via db.js: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Error in db.js: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;