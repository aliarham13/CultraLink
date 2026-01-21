import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <motion.h1 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-9xl font-extrabold text-indigo-100"
      >
        404
      </motion.h1>
      <div className="absolute">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-8">Looks like you've ventured into unknown territory.</p>
        <Link 
          to="/" 
          className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition shadow-lg"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;