import React, { useState } from 'react';
import { User, Building, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AuthDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleOptionClick = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleClick = () => {
    navigate('/register');
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300 group"
      >
        <span className="text-xl">👤</span>
      </button>

      {/* Menu déroulant */}
      <div 
        className={`absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg transform transition-all duration-300 origin-top-right ${
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
        }`}
      >
        <div className="p-4 space-y-4">
          {/* Option Stagiaire */}
          <div 
            onClick={() => handleOptionClick('/register?type=intern')}
            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-indigo-50 transition-colors duration-300 group"
          >
            <div className="p-2 bg-indigo-100 rounded-full transform transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-200">
              <User className="text-indigo-600" size={20} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Stagiaire</h3>
              <p className="text-sm text-gray-500">Inscription pour les étudiants</p>
            </div>
          </div>

          {/* Option Entreprise */}
          <div 
            onClick={() => handleOptionClick('/register?type=company')}
            className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-purple-50 transition-colors duration-300 group"
          >
            <div className="p-2 bg-purple-100 rounded-full transform transition-all duration-300 group-hover:scale-110 group-hover:bg-purple-200">
              <Building className="text-purple-600" size={20} />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Entreprise</h3>
              <p className="text-sm text-gray-500">Inscription pour les entreprises</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 