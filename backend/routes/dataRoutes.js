// server/routes/dataRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getWeather, getImages, getHolidays, getMeals } = require('../controllers/dataController');
const { getFavorites, addFavorite, removeFavorite } = require('../controllers/favoriteController');

// Public External API Routes
router.get('/weather/:city', getWeather);
router.get('/images/:query', getImages);
router.get('/holidays/:countryCode', getHolidays);
router.get('/meals/:countryName', getMeals);

// Protected Database Routes (Favorites)
router.get('/favorites', protect, getFavorites);
router.post('/favorites', protect, addFavorite);
router.delete('/favorites/:code', protect, removeFavorite);

module.exports = router;