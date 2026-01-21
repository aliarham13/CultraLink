import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGlobeAmericas, FaUtensils, FaCloudSun, FaPlane } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="pb-20 overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 text-center">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30">
           {/* Decorative Blobs */}
           <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
           <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
           <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight"
        >
          Discover the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">World</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Your all-in-one platform to explore cultures, cuisines, weather, and holidays from over 250+ countries. 
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/explore" className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-300 transform hover:-translate-y-1">
            Start Exploring
          </Link>
          <Link to="/register" className="bg-white text-indigo-600 border border-indigo-100 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition shadow-sm hover:shadow-md transform hover:-translate-y-1">
            Join Community
          </Link>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<FaGlobeAmericas className="text-4xl text-blue-500" />}
            title="Detailed Country Info"
            desc="Get essential stats like population, capital, languages, and currency for any nation."
            delay={0.2}
          />
          <FeatureCard 
            icon={<FaUtensils className="text-4xl text-orange-500" />}
            title="Traditional Cuisine"
            desc="Discover mouth-watering local recipes and famous dishes from specific regions."
            delay={0.4}
          />
          <FeatureCard 
            icon={<FaCloudSun className="text-4xl text-yellow-500" />}
            title="Live Weather"
            desc="Check the current weather conditions in capital cities before you plan your trip."
            delay={0.6}
          />
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="container mx-auto px-4 mt-16">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for your next adventure?</h2>
            <p className="text-indigo-100 mb-8 max-w-xl mx-auto">Create your personal travel wishlist and save your favorite destinations today.</p>
            <Link to="/explore" className="inline-block bg-white text-indigo-700 font-bold px-8 py-3 rounded-full hover:bg-indigo-50 transition transform hover:scale-105">
              Explore Now
            </Link>
          </div>
          <FaPlane className="absolute bottom-[-20px] left-10 text-9xl text-white opacity-10 transform -rotate-12" />
          <FaGlobeAmericas className="absolute top-[-20px] right-10 text-9xl text-white opacity-10" />
        </div>
      </section>
    </div>
  );
};

// Helper Component for Features
const FeatureCard = ({ icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-shadow"
  >
    <div className="bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{desc}</p>
  </motion.div>
);

export default Home;