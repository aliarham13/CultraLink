import { Link } from 'react-router-dom';
import { FaGlobeAmericas, FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-12 pb-8 mt-auto">
      <div className="container mx-auto px-4">
        
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold mb-4 text-indigo-400">
              <FaGlobeAmericas />
              <span>CulturaLink</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Explore the world's cultures, cuisines, and weather from the comfort of your home. Your gateway to global knowledge.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-indigo-400 transition">Home</Link></li>
              <li><Link to="/explore" className="hover:text-indigo-400 transition">Explore Countries</Link></li>
              <li><Link to="/favorites" className="hover:text-indigo-400 transition">My Wishlist</Link></li>
              <li><Link to="/login" className="hover:text-indigo-400 transition">Login / Register</Link></li>
            </ul>
          </div>

          {/* Resources (Dummy Links) */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-indigo-400 transition">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">API Documentation</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Terms of Service</a></li>
            </ul>
          </div>

          {/* Social / Contact - Dummys */ }
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Connect</h3>
            <div className="flex gap-4 mb-4">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition">
                <FaGithub className="text-xl" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition">
                <FaLinkedin className="text-xl" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-500 transition">
                <FaTwitter className="text-xl" />
              </a>
            </div>
            <p className="text-gray-500 text-sm">Email: hello@culturalink.com</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} CulturaLink. All rights reserved.</p>
          <div className="flex items-center gap-1 mt-2 md:mt-0">
            <span>Made with</span>
            <FaHeart className="text-red-500 animate-pulse" />
            <span>by Ali Arham Mujahid</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;