import { useState, useEffect } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import CountryCard from '../components/CountryCard';

const Explore = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  
  // NEW: State to control how many countries are shown
  const [visibleCount, setVisibleCount] = useState(24);

  // Fetch all countries on load
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        // Using ?fields to fetch only what we need (prevents 400 Error)
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,cca3,region,capital,population');
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Sort by name A-Z
        const sorted = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setCountries(sorted);
        setFilteredCountries(sorted);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Filter logic (runs whenever search or region changes)
  useEffect(() => {
    let result = countries;

    if (search) {
      result = result.filter(c => 
        c.name.common.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (region) {
      result = result.filter(c => c.region === region);
    }

    setFilteredCountries(result);
    setVisibleCount(24); // RESET to top when filtering
  }, [search, region, countries]);

  // Handler for Load More
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 24);
  };

  return (
    <div className="container mx-auto px-4 pb-20 pt-8">
      {/* Header Section */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">World</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Discover detailed cultural information, weather, foods, and images from over 250 countries.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-card p-4 rounded-2xl mb-12 flex flex-col md:flex-row gap-4 items-center max-w-4xl mx-auto shadow-lg">
        {/* Search Input */}
        <div className="relative flex-grow w-full">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search for a country..." 
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Region Dropdown */}
        <div className="relative w-full md:w-64">
          <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <select 
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer transition-all"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="">All Regions</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </div>

      {/* Grid Content */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-indigo-600"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {/* NEW: Slice based on visibleCount */}
            {filteredCountries.slice(0, visibleCount).map((country, index) => (
               <CountryCard key={country.cca3} country={country} index={index} />
            ))}
          </div>
          
          {/* Empty State */}
          {filteredCountries.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-gray-400">No countries found.</h3>
            </div>
          )}

          {/* NEW: Load More Button */}
          {visibleCount < filteredCountries.length && (
            <div className="text-center mt-12">
              <button 
                onClick={handleLoadMore}
                className="bg-white border border-indigo-100 text-indigo-600 font-bold px-8 py-3 rounded-full shadow-md hover:bg-indigo-50 hover:shadow-lg transition-all transform hover:-translate-y-1"
              >
                Load More Countries
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Explore;