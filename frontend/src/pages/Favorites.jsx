import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTrash, FaArrowRight } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import API from '../api';
import AuthContext from '../context/AuthContext';

const Favorites = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch favorites from backend
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const { data } = await API.get('/data/favorites');
        setFavorites(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load favorites");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchFavorites();
  }, [user]);

  // Handle Remove Logic
  const removeFavorite = async (code) => {
    try {
      await API.delete(`/data/favorites/${code}`);
      setFavorites(favorites.filter(fav => fav.countryCode !== code));
      toast.success("Removed from favorites");
    } catch (error) {
      toast.error("Could not remove country");
    }
  };

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Please Log In</h2>
        <p className="text-gray-500 mb-6">You need to be logged in to view your saved countries.</p>
        <Link to="/login" className="bg-indigo-600 text-white px-6 py-3 rounded-full font-bold hover:bg-indigo-700 transition">
          Go to Login
        </Link>
      </div>
    );
  }

  if (loading) return <div className="pt-24 text-center text-xl font-bold text-indigo-600">Loading your list...</div>;

  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-8 flex items-center gap-3">
        My Travel Wishlist <span className="text-sm bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">{favorites.length}</span>
      </h1>

      {favorites.length === 0 ? (
        <div className="text-center py-20 bg-white/50 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-400 mb-4">No favorites yet.</h3>
          <p className="text-gray-500 mb-8">Start exploring the world and save your top destinations!</p>
          <Link to="/explore" className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
            Start Exploring
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((fav, index) => (
            <motion.div
              key={fav.countryCode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden flex flex-col group relative"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={fav.flag} 
                  alt={fav.countryName} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold shadow-black drop-shadow-md">
                  {fav.countryName}
                </h3>
              </div>
              
              <div className="p-4 flex justify-between items-center bg-white/60 backdrop-blur-sm">
                <Link 
                  to={`/country/${fav.countryCode}`} 
                  className="text-indigo-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                >
                  View Details <FaArrowRight />
                </Link>
                <button 
                  onClick={() => removeFavorite(fav.countryCode)}
                  className="text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition"
                  title="Remove from favorites"
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;