import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGlobeAmericas, FaBars, FaTimes } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu

  const handleLogout = () => {
    logout();
    setIsOpen(false); // Close menu on logout
    navigate('/');
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="glass-nav fixed w-full z-50 top-0 left-0 border-b border-white/20 shadow-sm text-white transition-all duration-300">
      <div className="container mx-auto px-4 py-3">
        
        {/* Top Bar: Logo & Hamburger */}
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold hover:opacity-90 transition">
            <FaGlobeAmericas className="text-2xl" />
            <span className="tracking-wide">CulturaLink</span>
          </Link>

          {/* Desktop Links (Hidden on Mobile) */}
          <div className="hidden md:flex items-center space-x-8 font-medium">
            <Link to="/explore" className="hover:text-indigo-200 transition">Explore</Link>
            
            {user ? (
              <>
                <Link to="/favorites" className="hover:text-indigo-200 transition">My Favorites</Link>
                <div className="flex items-center space-x-4 pl-4 border-l border-white/20">
                  <span className="text-sm font-light opacity-90">Hi, {user.name.split(' ')[0]}</span>
                  <button 
                    onClick={handleLogout}
                    className="bg-white text-indigo-600 px-5 py-2 rounded-full text-sm font-bold hover:bg-indigo-50 transition shadow-md"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="hover:text-indigo-200 transition">Login</Link>
                <Link 
                  to="/register" 
                  className="bg-white text-indigo-600 px-5 py-2 rounded-full text-sm font-bold hover:bg-indigo-50 transition shadow-md"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button (Visible ONLY on Mobile) */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden text-2xl focus:outline-none p-2"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Animated) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-indigo-900/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4 text-center">
              <Link to="/" onClick={toggleMenu} className="text-lg py-2 hover:text-indigo-300 border-b border-white/10">Home</Link>
              <Link to="/explore" onClick={toggleMenu} className="text-lg py-2 hover:text-indigo-300 border-b border-white/10">Explore Countries</Link>
              
              {user ? (
                <>
                  <Link to="/favorites" onClick={toggleMenu} className="text-lg py-2 hover:text-indigo-300 border-b border-white/10">My Favorites</Link>
                  <div className="pt-4 flex flex-col items-center gap-3">
                    <span className="text-indigo-200">Signed in as <b>{user.name}</b></span>
                    <button 
                      onClick={handleLogout}
                      className="w-full bg-red-500/80 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-3 pt-2">
                  <Link 
                    to="/login" 
                    onClick={toggleMenu}
                    className="w-full py-3 rounded-xl border border-white/30 hover:bg-white/10 transition"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    onClick={toggleMenu}
                    className="w-full bg-white text-indigo-900 py-3 rounded-xl font-bold hover:bg-gray-100 transition"
                  >
                    Register Now
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;