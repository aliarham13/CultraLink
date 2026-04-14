// server/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

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

// Grab Render's port, or default to 10000
const PORT = process.env.PORT || 10000;

// The '0.0.0.0' is the magic key. It tells Node to listen to the outside internet, not just localhost.
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is actively listening on port ${PORT}`);
});

