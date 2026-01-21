// server/controllers/dataController.js
const axios = require('axios');

// @desc    Get Weather for a specific city
// @route   GET /api/data/weather/:city
const getWeather = async (req, res) => {
  const city = req.params.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Weather API Error:', error.message);
    res.status(500).json({ message: 'Failed to fetch weather' });
  }
};

// @desc    Get Images for a country
// @route   GET /api/data/images/:query
const getImages = async (req, res) => {
  const query = req.params.query;
  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=6&orientation=landscape&client_id=${process.env.UNSPLASH_ACCESS_KEY}`;

  try {
    const response = await axios.get(url);
    res.json(response.data.results);
  } catch (error) {
    console.error('Unsplash API Error:', error.message);
    res.json([]); // Return empty array on failure
  }
};

// @desc    Get Holidays (Using Nager.Date - No Key Needed)
// @route   GET /api/data/holidays/:countryCode
const getHolidays = async (req, res) => {
  const { countryCode } = req.params; // Expecting 2-letter code (e.g., PK, US)
  const year = new Date().getFullYear();
  
  // Nager.Date API: Free, No Key
  const url = `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(`Holidays Error for ${countryCode}:`, error.message);
    res.json([]); // Return empty if not supported or failed
  }
};

// @desc    Get Meals (Smarter Mapping)
// @route   GET /api/data/meals/:countryName
const getMeals = async (req, res) => {
  const countryName = req.params.countryName;

  // EXTENSIVE MAPPING: Country Name -> TheMealDB "Area"
  const cuisineMap = {
    'United States': 'American', 'USA': 'American',
    'United Kingdom': 'British', 'UK': 'British',
    'China': 'Chinese',
    'India': 'Indian', 'Pakistan': 'Indian', 'Bangladesh': 'Indian', // Regional grouping
    'Italy': 'Italian',
    'France': 'French',
    'Japan': 'Japanese',
    'Mexico': 'Mexican',
    'Canada': 'Canadian',
    'Russia': 'Russian',
    'Spain': 'Spanish',
    'Thailand': 'Thai',
    'Vietnam': 'Vietnamese',
    'Turkey': 'Turkish',
    'Greece': 'Greek',
    'Ireland': 'Irish',
    'Egypt': 'Egyptian',
    'Kenya': 'Kenyan',
    'Malaysia': 'Malaysian',
    'Morocco': 'Moroccan',
    'Netherlands': 'Dutch',
    'Portugal': 'Portuguese',
    'Croatia': 'Croatian',
    'Philippines': 'Filipino',
    'Tunisia': 'Tunisian',
    'Poland': 'Polish'
  };

  // 1. Try Mapped Name
  let area = cuisineMap[countryName];
  
  // 2. If no map, try the country name itself (e.g., "Jamaican")
  if (!area) area = countryName;

  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;

  try {
    const response = await axios.get(url);
    res.json(response.data.meals || []);
  } catch (error) {
    console.log(`Meals not found for ${area}`);
    res.json([]);
  }
};

module.exports = { getWeather, getImages, getHolidays, getMeals };