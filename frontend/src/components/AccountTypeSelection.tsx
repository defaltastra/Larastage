import React from 'react';
import { User, Building2 } from 'lucide-react';

interface AccountTypeSelectionProps {
  onSelect: (type: 'intern' | 'company') => void;
}

export default function AccountTypeSelection({ onSelect }: AccountTypeSelectionProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Bienvenue sur StageOFPPT
          </h2>
          <p className="text-gray-600">
            Choisissez votre type de compte
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => onSelect('intern')}
            className="group relative flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <User className="w-6 h-6 mr-2" />
            <span>Je suis un stagiaire</span>
          </button>
          <button
            onClick={() => onSelect('company')}
            className="group relative flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Building2 className="w-6 h-6 mr-2" />
            <span>Je suis une entreprise</span>
          </button>
        </div>
      </div>
    </div>
  );
} 