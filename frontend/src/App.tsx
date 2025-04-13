import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import {
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';

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
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const checkAuth = () => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    return token && user ? JSON.parse(user) : null;
  };

  const [user, setUser] = useState(checkAuth());

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user' || e.key === 'authToken') {
        setUser(checkAuth());
      }
    };

    const handleAuthChange = () => {
      setUser(checkAuth());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('auth-change', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, []);

  const handleAuthToggle = () => {
    if (user) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.dispatchEvent(new Event('auth-change'));
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center text-blue-600 font-bold text-2xl">
              OFPPT<span className="text-sm ml-1 text-gray-500 dark:text-gray-300">stage</span>
            </Link>

            {/* Centered Menu */}
            <div className="hidden lg:flex justify-center flex-1 space-x-4">
              <Link to="/" className={`${location.pathname === '/' ? 'text-blue-600' : 'text-gray-600 dark:text-gray-300'} hover:text-blue-700 px-3 py-2 text-sm font-medium`}>Accueil</Link>
              <Link to="/stages" className={`${location.pathname === '/stages' ? 'text-blue-600' : 'text-gray-600 dark:text-gray-300'} hover:text-blue-700 px-3 py-2 text-sm font-medium`}>Offres de stage</Link>
              <Link to="/guide" className={`${location.pathname === '/guide' ? 'text-blue-600' : 'text-gray-600 dark:text-gray-300'} hover:text-blue-700 px-3 py-2 text-sm font-medium`}>Guide & Conseils</Link>
              <Link to="/contact" className={`text-gray-600 dark:text-gray-300 hover:text-blue-700 px-3 py-2 text-sm font-medium`}>Contact</Link>
            </div>

            {/* Right section */}
            <div className="hidden lg:flex items-center space-x-2">
              <button onClick={toggleDarkMode} className="p-2 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                {isDarkMode ? '☀️ Light' : '🌙 Dark'}
              </button>
              {!user ? (
                <>
                  <Link to="/login-stagiaire">
                    <button className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700">Connexion</button>
                  </Link>
                  <Link to="/register-stagiaire">
                    <button className="bg-gray-100 text-gray-800 px-3 py-2 rounded-md text-sm hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">S'inscrire</button>
                  </Link>
                </>
              ) : (
                <button onClick={handleAuthToggle} className="bg-red-600 text-white px-3 py-2 rounded-md text-sm hover:bg-red-700">Déconnexion</button>
              )}
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 dark:text-gray-300">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="lg:hidden mt-2 space-y-2 bg-white dark:bg-gray-800 rounded-md shadow-md p-4">
              <Link to="/" className="block text-gray-700 dark:text-gray-100 hover:text-blue-600">Accueil</Link>
              <Link to="/stages" className="block text-gray-700 dark:text-gray-100 hover:text-blue-600">Offres de stage</Link>
              <Link to="/guide" className="block text-gray-700 dark:text-gray-100 hover:text-blue-600">Guide & Conseils</Link>
              <Link to="/contact" className="block text-gray-700 dark:text-gray-100 hover:text-blue-600">Contact</Link>
              {!user ? (
                <>
                  <Link to="/login-stagiaire" className="block text-gray-700 dark:text-gray-100 hover:text-blue-600">Connexion</Link>
                  <Link to="/register-stagiaire" className="block text-gray-700 dark:text-gray-100 hover:text-blue-600">S'inscrire</Link>
                </>
              ) : (
                <button onClick={handleAuthToggle} className="block w-full text-left text-red-600 hover:text-red-800">Déconnexion</button>
              )}
              <button onClick={toggleDarkMode} className="block text-left w-full text-sm text-gray-700 dark:text-gray-100">{isDarkMode ? '☀️ Mode Jour' : '🌙 Mode Nuit'}</button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20">
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

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 text-center text-sm text-gray-600 dark:text-gray-300 py-6 mt-10">
        <div className="max-w-7xl mx-auto px-4">© {new Date().getFullYear()} OFPPT Stage. Tous droits réservés.</div>
      </footer>
    </div>
  );
}

export default App;
