// server/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
// Import Routes
const authRoutes = require('./routes/authRoutes'); // <--- ADDED
const dataRoutes = require('./routes/dataRoutes'); // <--- ADDED

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Use Routes
app.use('/api/auth', authRoutes); // <--- UNCOMMENT/ADDED
app.use('/api/data', dataRoutes); // <--- UNCOMMENT/ADDED

app.get('/', (req, res) => {
  res.send('CulturaLink API is running...');
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
})
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch(err => {
  console.error("❌ MongoDB Connection Error:", err.message);
  // Add this to see the FULL error details in Render logs
  console.error(err); 
});