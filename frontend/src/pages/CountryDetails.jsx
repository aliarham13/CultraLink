import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { 
  FaArrowLeft, 
  FaHeart, 
  FaRegHeart, 
  FaMapMarkerAlt, 
  FaThermometerHalf, 
  FaCloud, 
  FaUtensils, 
  FaCalendarAlt,
  FaYoutube,
  FaGoogle 
} from 'react-icons/fa';
import API from '../api'; 
import AuthContext from '../context/AuthContext';

const CountryDetails = () => {
  const { code } = useParams();
  const { user } = useContext(AuthContext);
  
  // State Management
  const [country, setCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [images, setImages] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [meals, setMeals] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1. Fetch Basic Country Info FIRST (Public API)
        // We need this to get the specific 2-letter code (cca2) for the Holiday API
        const countryRes = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        if (!countryRes.ok) throw new Error("Country not found");
        
        const countryData = await countryRes.json();
        const c = countryData[0];
        setCountry(c);

        // 2. Prepare variables for Backend Calls
        const capital = c.capital ? c.capital[0] : 'London'; 
        const countryName = c.name.common;
        const countryCode2 = c.cca2; // Vital for Nager.Date API

        // 3. Parallel calls to YOUR Backend
        const [weatherRes, imagesRes, holidaysRes, mealsRes] = await Promise.allSettled([
          API.get(`/data/weather/${capital}`),
          API.get(`/data/images/${countryName}`),
          API.get(`/data/holidays/${countryCode2}`), // Using 2-letter code
          API.get(`/data/meals/${countryName}`)
        ]);

        // 4. Set State Safely
        if (weatherRes.status === 'fulfilled') setWeather(weatherRes.value.data);
        if (imagesRes.status === 'fulfilled') setImages(imagesRes.value.data);
        
        if (holidaysRes.status === 'fulfilled') {
          // Nager.Date returns a raw array, let's take the upcoming/recent 5
          setHolidays(Array.isArray(holidaysRes.value.data) ? holidaysRes.value.data.slice(0, 5) : []);
        }

        if (mealsRes.status === 'fulfilled') setMeals(mealsRes.value.data);

        // 5. Check Favorites (if logged in)
        if (user) {
          const favRes = await API.get('/data/favorites');
          const exists = favRes.data.some(f => f.countryCode === code);
          setIsFavorite(exists);
        }

      } catch (error) {
        console.error("Error loading details:", error);
        toast.error("Could not load full details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [code, user]);

  // Handle Favorite Toggle
  const toggleFavorite = async () => {
    if (!user) return toast.error("Please login to save favorites");

    try {
      if (isFavorite) {
        await API.delete(`/data/favorites/${code}`);
        setIsFavorite(false);
        toast.success("Removed from favorites");
      } else {
        await API.post('/data/favorites', {
          countryCode: code,
          countryName: country.name.common,
          flag: country.flags.svg
        });
        setIsFavorite(true);
        toast.success("Added to favorites");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update favorites");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl text-indigo-600 font-bold animate-pulse">Loading Culture Data...</div>;
  if (!country) return <div className="min-h-screen flex items-center justify-center text-xl text-red-500 font-bold">Country data not found.</div>;

  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      
      {/* Back Button */}
      <Link to="/explore" className="inline-flex items-center text-gray-600 hover:text-indigo-600 mb-6 transition font-medium">
        <FaArrowLeft className="mr-2" /> Back to Explore
      </Link>

      {/* Hero Section */}
      <div className="glass-card rounded-3xl p-8 mb-8 relative overflow-hidden shadow-xl border border-white/50">
        <div className="flex flex-col md:flex-row gap-8 items-center z-10 relative">
          <img 
            src={country.flags.svg} 
            alt="Flag" 
            className="w-full md:w-1/3 h-64 object-cover rounded-2xl shadow-lg border border-gray-100"
          />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl font-extrabold text-gray-800 mb-2 tracking-tight">{country.name.common}</h1>
            <h2 className="text-2xl text-indigo-500 font-medium mb-6">{country.region}</h2>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="bg-indigo-50 px-5 py-2 rounded-xl text-indigo-700 font-medium border border-indigo-100">
                Capital: <b className="text-indigo-900">{country.capital?.[0]}</b>
              </div>
              <div className="bg-purple-50 px-5 py-2 rounded-xl text-purple-700 font-medium border border-purple-100">
                Population: <b className="text-purple-900">{country.population.toLocaleString()}</b>
              </div>
            </div>

            <button 
              onClick={toggleFavorite}
              className={`mt-8 px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-md ${isFavorite ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'}`}
            >
              {isFavorite ? <FaHeart /> : <FaRegHeart />} 
              {isFavorite ? 'Saved to Favorites' : 'Add to Favorites'}
            </button>
          </div>
        </div>
      </div>

      {/* Grid Layout for Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        
        {/* Weather Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass-card p-6 rounded-2xl hover:shadow-lg transition duration-300"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaCloud className="text-blue-500" /> Weather in {country.capital?.[0]}
          </h3>
          {weather ? (
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold text-gray-800">{Math.round(weather.main.temp)}°C</div>
                <div className="text-gray-500 capitalize font-medium">{weather.weather[0].description}</div>
                <div className="text-xs text-gray-400 mt-1">Humidity: {weather.main.humidity}%</div>
              </div>
              <img 
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                alt="Weather Icon" 
                className="w-24 h-24 drop-shadow-sm"
              />
            </div>
          ) : (
            <p className="text-gray-400 italic">Weather data currently unavailable.</p>
          )}
        </motion.div>

        {/* Holidays Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass-card p-6 rounded-2xl hover:shadow-lg transition duration-300"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaCalendarAlt className="text-orange-500" /> Holidays (2025)
          </h3>
          <ul className="space-y-3">
            {holidays.length > 0 ? holidays.map((h, i) => (
              <li key={i} className="flex justify-between text-sm border-b border-gray-100 pb-2 last:border-0">
                <span className="font-medium text-gray-700 truncate pr-2" title={h.name}>{h.name}</span>
                <span className="text-gray-400 whitespace-nowrap">{h.date}</span>
              </li>
            )) : (
              <p className="text-gray-400 italic text-sm">No major holidays data available.</p>
            )}
          </ul>
        </motion.div>

        {/* Quick Facts Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="glass-card p-6 rounded-2xl hover:shadow-lg transition duration-300"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaMapMarkerAlt className="text-green-500" /> Quick Facts
          </h3>
          <div className="space-y-3 text-gray-700">
            <p><span className="font-semibold text-gray-900">Subregion:</span> {country.subregion}</p>
            <p><span className="font-semibold text-gray-900">Currency:</span> {Object.values(country.currencies || {}).map(c => `${c.name} (${c.symbol})`).join(', ')}</p>
            <p><span className="font-semibold text-gray-900">Languages:</span> {Object.values(country.languages || {}).join(', ')}</p>
            <a 
              href={country.maps.googleMaps} 
              target="_blank" 
              rel="noreferrer"
              className="inline-block mt-2 text-indigo-600 text-sm font-semibold hover:text-indigo-800 transition"
            >
              View on Google Maps &rarr;
            </a>
          </div>
        </motion.div>
      </div>

      {/* Gallery Section */}
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
         <span className="text-indigo-500">📸</span> Visual Gallery
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {images.length > 0 ? images.map((img) => (
          <div key={img.id} className="h-48 overflow-hidden rounded-xl shadow-md hover:shadow-xl transition duration-300 group">
            <img src={img.urls.regular} alt={img.alt_description} className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700" />
          </div>
        )) : (
          <p className="text-gray-400 col-span-4 bg-gray-50 p-4 rounded-lg text-center">No images available for this region.</p>
        )}
      </div>

      {/* Cuisine Section - WITH SMART FALLBACK */}
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FaUtensils className="text-red-500" /> Traditional Cuisine
      </h3>
      
      {meals.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {meals.slice(0, 4).map((meal) => (
            <div key={meal.idMeal} className="glass-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition group">
              <div className="h-32 overflow-hidden">
                <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-3">
                <p className="font-bold text-gray-800 truncate mb-1" title={meal.strMeal}>{meal.strMeal}</p>
                <a 
                  href={`https://www.google.com/search?q=${meal.strMeal}+recipe`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs text-indigo-500 font-semibold hover:text-indigo-700 flex items-center gap-1"
                >
                  View Recipe <FaArrowLeft className="rotate-180 text-[10px]" />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* SMART FALLBACK: If no API data, show this useful link block */
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-2xl p-8 text-center shadow-sm">
          <p className="text-gray-700 mb-6 text-lg">
            We couldn't find specific recipes in our database for <b className="text-orange-600">{country.name.common}</b>.
            <br className="hidden md:block"/> However, you can discover authentic dishes from the web below.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href={`https://www.google.com/search?q=traditional+food+in+${country.name.common}+recipe`} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-full font-bold hover:bg-gray-50 transition shadow-sm hover:shadow-md hover:text-blue-600"
            >
              <FaGoogle className="text-blue-500" /> Search Google
            </a>
            <a 
              href={`https://www.youtube.com/results?search_query=traditional+food+in+${country.name.common}`} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-full font-bold hover:bg-gray-50 transition shadow-sm hover:shadow-md hover:text-red-600"
            >
              <FaYoutube className="text-red-500" /> Watch on YouTube
            </a>
          </div>
        </div>
      )}

    </div>
  );
};

export default CountryDetails;