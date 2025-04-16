import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AccountTypeSelection from './AccountTypeSelection';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAccountSelection, setShowAccountSelection] = useState(false);
  const navigate = useNavigate();

  const handleAccountSelect = (type: 'intern' | 'company') => {
    setShowAccountSelection(false);
    if (type === 'intern') {
      window.location.href = '/login-stagiaire';
    } else {
      window.location.href = '/login-entreprise';
    }
  };

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-lg fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-bold tracking-wide">
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">Stage</span>
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-transparent bg-clip-text ml-1">Ofppt</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors duration-300 font-medium">
                Accueil
              </Link>
              <Link to="/stages" className="text-gray-700 hover:text-purple-600 transition-colors duration-300 font-medium">
                Offres de stage
              </Link>
              <Link to="/guide" className="text-gray-700 hover:text-purple-600 transition-colors duration-300 font-medium">
                Guide & Conseils
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-purple-600 transition-colors duration-300 font-medium">
                Contact
              </Link>
            </div>
          </div>

          {/* Login Button - Right */}
          <div className="flex items-center">
            <button
              onClick={() => navigate('/login')}
              className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <User size={20} />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ml-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-purple-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link
              to="/stages"
              className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Offres de stage
            </Link>
            <Link
              to="/guide"
              className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Guide & Conseils
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate('/login');
              }}
              className="flex items-center justify-center w-10 h-10 mx-auto bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <User size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Account Type Selection Modal */}
      {showAccountSelection && (
        <AccountTypeSelection onSelect={handleAccountSelect} />
      )}
    </nav>
  );
}
