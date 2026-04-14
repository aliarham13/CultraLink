const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // SECURITY CHECK: Print the last 15 characters to prove Render sees it
    const uri = process.env.MONGO_URI;
    console.log(`🔍 Checking URI in Render... Ends with: ${uri ? uri.slice(-15) : 'UNDEFINED!'}`);

    const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
        family: 4
    });
    console.log(`✅ MongoDB Connected via db.js: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Error in db.js: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;