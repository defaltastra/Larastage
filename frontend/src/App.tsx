import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import Home from './components/Home';
import InternshipList from './components/InternshipList';
import InternSpace from './components/InternSpace';
import CompanySpace from './components/CompanySpace';
import GuideAndTips from './components/GuideAndTips';

function App() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-blue-600">OFPPT</span>
                <span className="ml-2 text-sm text-gray-500">stage</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link 
                to="/" 
                className={`${location.pathname === '/' ? 'text-blue-600' : 'text-gray-600'} hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium`}
              >
                Accueil
              </Link>
              <Link 
                to="/stages" 
                className={`${location.pathname === '/stages' ? 'text-blue-600' : 'text-gray-600'} hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium`}
              >
                Offres de stage
              </Link>
              
              {/* Resources Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Ressources
                  <ChevronDown size={16} className="ml-1" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <Link
                        to="/guide"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Guide & Conseils
                      </Link>
                      <Link
                        to="/temoignages"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Témoignages
                      </Link>
                      <Link
                        to="/droits-obligations"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Droits et Obligations
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link 
                to="/espace-stagiaire" 
                className={`${location.pathname === '/espace-stagiaire' ? 'text-blue-600' : 'text-gray-600'} hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium`}
              >
                Espace stagiaire
              </Link>
              <Link 
                to="/espace-entreprise" 
                className={`${location.pathname === '/espace-entreprise' ? 'text-blue-600' : 'text-gray-600'} hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium`}
              >
                Espace entreprise
              </Link>
              
              {/* Auth Buttons */}
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium">
                Connexion
              </button>
              <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 text-sm font-medium">
                S'inscrire
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  to="/"
                  className={`${
                    location.pathname === '/'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  } block px-3 py-2 rounded-md text-base font-medium`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Accueil
                </Link>
                <Link
                  to="/stages"
                  className={`${
                    location.pathname === '/stages'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  } block px-3 py-2 rounded-md text-base font-medium`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Offres de stage
                </Link>
                <Link
                  to="/guide"
                  className={`${
                    location.pathname === '/guide'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  } block px-3 py-2 rounded-md text-base font-medium`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Guide & Conseils
                </Link>
                <Link
                  to="/espace-stagiaire"
                  className={`${
                    location.pathname === '/espace-stagiaire'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  } block px-3 py-2 rounded-md text-base font-medium`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Espace stagiaire
                </Link>
                <Link
                  to="/espace-entreprise"
                  className={`${
                    location.pathname === '/espace-entreprise'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  } block px-3 py-2 rounded-md text-base font-medium`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Espace entreprise
                </Link>
                <div className="pt-4 space-y-2">
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium">
                    Connexion
                  </button>
                  <button className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 text-sm font-medium">
                    S'inscrire
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content with top padding to account for fixed navbar */}
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stages" element={<InternshipList />} />
          <Route path="/espace-stagiaire" element={<InternSpace />} />
          <Route path="/espace-entreprise" element={<CompanySpace />} />
          <Route path="/guide" element={<GuideAndTips />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;