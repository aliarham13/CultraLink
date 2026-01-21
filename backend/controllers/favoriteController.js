// server/controllers/favoriteController.js
const User = require('../models/User');

// @desc    Get user favorites
// @route   GET /api/data/favorites
const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Add a country to favorites
// @route   POST /api/data/favorites
const addFavorite = async (req, res) => {
    // 1. Log what we received (for debugging)
    console.log("Attempting to add favorite:", req.body);
    
    const { countryCode, countryName, flag } = req.body;
  
    try {
      // 2. Find the user
      const user = await User.findById(req.user._id);
  
      if (!user) {
        console.log("User not found in DB");
        return res.status(404).json({ message: 'User not found' });
      }
  
      // 3. FIX: Create the array if it doesn't exist (This fixes the 500 crash)
      if (!Array.isArray(user.favorites)) {
        console.log("Favorites array missing, creating it...");
        user.favorites = [];
      }
  
      // 4. Check for duplicates
      const alreadyExists = user.favorites.find(f => f.countryCode === countryCode);
      if (alreadyExists) {
        return res.status(400).json({ message: 'Country already in favorites' });
      }
  
      // 5. Push and Save
      user.favorites.push({ countryCode, countryName, flag });
      await user.save();
  
      console.log("Success! Favorites count:", user.favorites.length);
      res.status(201).json(user.favorites);
  
    } catch (error) {
      // 6. Log the EXACT error to your terminal so we can see it
      console.error("CRITICAL ERROR adding favorite:", error);
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };

// @desc    Remove a country from favorites
// @route   DELETE /api/data/favorites/:code
const removeFavorite = async (req, res) => {
  const countryCode = req.params.code;

  try {
    const user = await User.findById(req.user._id);
    
    user.favorites = user.favorites.filter(f => f.countryCode !== countryCode);
    await user.save();

    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getFavorites, addFavorite, removeFavorite };