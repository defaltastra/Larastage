import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import Home from './components/Home';
import InternshipList from './components/InternshipList';
import InternSpace from './components/InternSpace';
import GuideAndTips from './components/GuideAndTips';
import InternLogin from './components/InternLogin';
import InternRegister from './components/InternRegister';
import InternshipDetails from './components/InternshipDetails';
function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Create a function to check authentication
  const checkAuth = () => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    return token && user ? JSON.parse(user) : null;
  };

  // State to track user authentication
  const [user, setUser] = useState(checkAuth());

  // Effect to listen for storage changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user' || e.key === 'authToken') {
        const updatedUser = checkAuth();
        setUser(updatedUser);
      }
    };

    // Add event listener for storage changes
    window.addEventListener('storage', handleStorageChange);

    // Create a custom event listener for login/logout
    const handleAuthChange = () => {
      const updatedUser = checkAuth();
      setUser(updatedUser);
    };

    // Add custom event listener
    window.addEventListener('auth-change', handleAuthChange);

    // Cleanup listeners
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, []);

  // Handle logout
  const handleAuthToggle = () => {
    if (user) {
      // Remove authentication data
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      
      // Dispatch custom event to trigger update across components
      window.dispatchEvent(new Event('auth-change'));
      
      // Navigate to home page
      navigate('/');
    }
  };

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

              {/* Conditionally render links based on authentication */}
              {user && (
                <>
                  <Link 
                    to="/espace-stagiaire" 
                    className={`${location.pathname === '/espace-stagiaire' ? 'text-blue-600' : 'text-gray-600'} hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium`}
                  >
                    Espace stagiaire
                  </Link>
                
                </>
              )}

              {/* Auth Buttons */}
              {!user ? (
                <>
                  <Link to="/login-stagiaire">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium">
                      Connexion
                    </button>
                  </Link>
                  <Link to="/register-stagiaire">
                    <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 text-sm font-medium">
                      S'inscrire
                    </button>
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleAuthToggle}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm font-medium"
                >
                  Déconnexion
                </button>
              )}
            </div>

            {/* Mobile menu button and rest of the mobile navigation remains the same */}
            {/* ... (previous mobile navigation code) ... */}
          </div>
        </div>
      </nav>

      {/* Main Content with top padding to account for fixed navbar */}
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stages" element={<InternshipList />} />
          <Route path="/stages-details/:id" element={<InternshipDetails />} />
          <Route path="/login-stagiaire" element={<InternLogin />} />
          <Route path="/register-stagiaire" element={<InternRegister />} />
          <Route path="/espace-stagiaire" element={<InternSpace />} />
          <Route path="/guide" element={<GuideAndTips />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;