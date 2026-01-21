import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CountryCard = ({ country, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }} // Staggered animation
      className="glass-card rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full group"
    >
      {/* Flag Image with Zoom Effect */}
      <div className="h-40 overflow-hidden relative">
        <img 
          src={country.flags.svg} 
          alt={`${country.name.common} flag`} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
      </div>

      {/* Card Content */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-1 truncate">{country.name.common}</h3>
          <p className="text-sm text-gray-500 font-medium mb-4 uppercase tracking-wider">{country.region}</p>
          
          <div className="space-y-2 text-sm text-gray-600 mb-6">
            <div className="flex justify-between">
              <span>Capital:</span>
              <span className="font-semibold text-gray-800 text-right truncate pl-2">{country.capital?.[0] || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span>Population:</span>
              <span className="font-semibold text-gray-800">{country.population.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <Link 
          to={`/country/${country.cca3}`} 
          className="w-full block text-center bg-indigo-50 text-indigo-600 font-bold py-2.5 rounded-lg hover:bg-indigo-600 hover:text-white transition-all duration-300"
        >
          Explore Culture
        </Link>
      </div>
    </motion.div>
  );
};

export default CountryCard;