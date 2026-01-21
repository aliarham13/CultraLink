import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import CountryDetails from './pages/CountryDetails';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';

import Explore from './pages/Explore'; 


function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-800">
        <Navbar />
        <Toaster position="top-center" reverseOrder={false} />
        <div className="pt-16"> {/* Padding for fixed navbar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/country/:code" element={<CountryDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;