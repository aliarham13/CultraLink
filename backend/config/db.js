const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
        family: 4  // <--- THIS IS THE FIX. It forces IPv4.
    });
    console.log(`✅ MongoDB Connected via db.js: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Error in db.js: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;